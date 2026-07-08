import { CSSResultGroup, html, nothing, PropertyValues } from "lit";
import { ResizeController } from "@lit-labs/observers/resize-controller.js";

import {
  HvacMode,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  isAvailable,
  formatNumber,
  fireEvent,
} from "mushroom-cards/src/ha";
import { LovelaceGridOptions } from "mushroom-cards/src/ha";
import { MushroomBaseElement } from "mushroom-cards/src/utils/base-element";
import { registerCustomCard } from "mushroom-cards/src/utils/custom-cards";
import { CLIMATE_CARD_EDITOR_NAME, CLIMATE_CARD_NAME } from "./const";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type { StyleInfo } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import { BetterThermostatUINormalCardConfig } from "./climate-card-config";
import {
  mdiMinus,
  mdiPlus,
  mdiThermometer,
  mdiThermostat,
  mdiWindowOpenVariant,
  mdiDotsVertical,
  mdiWaterPercent,
  mdiAlert,
  mdiBatteryAlert,
  mdiWifiStrengthOffOutline,
  mdiWhiteBalanceSunny,
} from "@mdi/js";
import { ShadowStyles } from "./style";
import {
  BtClimateEntity,
  ClimateEntityFeature,
  UNAVAILABLE,
  setClimateMode,
  supportsFeature,
} from "../shared/climate";
import { stateActive } from "../shared/state-color";
import {
  CLIMATE_HVAC_ACTION_TO_MODE,
  climateColor,
  climateColorDefaultStyles,
  climateColorOverrides,
  climateStateColor,
  getHvacModeIcon,
} from "../shared/climate-colors";
import { alphaColor } from "../shared/color";
import { findBtStubEntity, formatHumidity, isWindowOpen } from "../shared/bt";
import {
  getErrorEntityId,
  getLowBattery,
  isDegraded,
} from "../shared/bt-status";
import { shouldUpdateForHass } from "../shared/has-changed";
import { createChainedLocalize } from "../shared/localize";
import {
  PresetOverlayController,
  presetOverlayStyle,
} from "../shared/preset-overlay";
import { btStateColorsStyle, btAnimationsStyle } from "../shared/styles";
import "./features/hui-card-features";
import type { LovelaceCardFeatureContext } from "./features/types";

const SLIDER_MODES: Record<HvacMode, string> = {
  auto: "full",
  cool: "end",
  dry: "full",
  fan_only: "full",
  heat: "start",
  heat_cool: "full",
  off: "full",
};

// While the user interacts, incoming hass updates must not clobber the local
// setpoint: the debounced service call fires after 1000 ms and Better
// Thermostat's round-trip (service → TRV ack → state update) can take a
// couple of seconds more. Could be released early on the entity's next state
// echo, but a fixed window is simpler and safe.
const INTERACTION_HOLDOFF_MS = 3000;

function simpleDebounce<T extends (...args: any[]) => void>(
  fn: T,
  timeout = 300,
) {
  let handle: number | undefined;
  return (...args: Parameters<T>) => {
    if (handle) clearTimeout(handle);
    handle = window.setTimeout(() => fn(...args), timeout);
  };
}

registerCustomCard({
  type: CLIMATE_CARD_NAME,
  name: "Better Thermostat Climate Card",
  description: "Large climate control card.",
});

@customElement(CLIMATE_CARD_NAME)
export class BetterThermostatUINormalCard
  extends MushroomBaseElement
  implements LovelaceCard
{
  @property({ type: Boolean }) public preview = false;
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Boolean, attribute: "prevent-interaction-on-scroll" })
  public preventInteractionOnScroll = false;
  @state() private _config?: BetterThermostatUINormalCardConfig;
  @state() private _stateObj?: BtClimateEntity;
  @state() private _featureContext?: LovelaceCardFeatureContext;
  @state() private _targetTemperature: Partial<
    Record<"value" | "low" | "high", number>
  > = {};
  // When the user is actively interacting (dragging) the slider, prevent
  // `willUpdate` from overwriting the in-progress value from the hass state
  // updates. The circular slider fires `value-changing` events while dragging.
  private _isDragging = false;
  private _lastInteraction = 0;
  private _holdoffResyncTimer?: number;
  @state() private _selectTarget: "value" | "low" | "high" = "low";
  private _presetOverlay = new PresetOverlayController(this);

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./climate-card-editor");
    return document.createElement(
      CLIMATE_CARD_EDITOR_NAME,
    ) as LovelaceCardEditor;
  }

  public static async getStubConfig(
    hass: HomeAssistant,
  ): Promise<BetterThermostatUINormalCardConfig> {
    return {
      type: `custom:${CLIMATE_CARD_NAME}`,
      entity: findBtStubEntity(hass),
    };
  }

  // Measures the dial container's height so render() can cap the wrapper to
  // it. Retargeted from the host to the actual `.container` element in
  // updated() — the host only reports its own resize.
  private _resizeController = new ResizeController(this, {
    callback: (entries) => entries[0]?.contentRect.height,
  });

  private _sizeController = new ResizeController(this, {
    callback: (entries) => {
      const width = entries[0]?.contentRect.width;
      if (!width) return "lg";
      return width < 130
        ? "xs"
        : width < 190
          ? "sm"
          : width < 250
            ? "md"
            : "lg";
    },
  });

  private _observedWrapper?: Element;
  private _observedContainer?: Element;

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    // The observed elements can appear late (entity absent at first render)
    // or be recreated after a `nothing` render — (re)target the resize
    // observers whenever the rendered element changes.
    const wrapper = this.shadowRoot?.querySelector(".bt-wrapper");
    if (wrapper && wrapper !== this._observedWrapper) {
      this._sizeController.unobserve(this._observedWrapper ?? this);
      this._sizeController.observe(wrapper);
      this._observedWrapper = wrapper;
    }
    const container = this.shadowRoot?.querySelector("ha-card > .container");
    if (container && container !== this._observedContainer) {
      this._resizeController.unobserve(this._observedContainer ?? this);
      this._resizeController.observe(container);
      this._observedContainer = container;
    }
  }

  // hass is replaced on every state tick of ANY entity — only re-render for
  // changes the card actually displays.
  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.size === 1 && changed.has("hass")) {
      const oldHass = changed.get("hass") as HomeAssistant | undefined;
      return shouldUpdateForHass(oldHass, this.hass, [
        this._config?.entity,
        this._config?.window_sensor,
        this._config?.humidity_sensor,
      ]);
    }
    return true;
  }

  public getCardSize(): number {
    return 5;
  }
  public getGridOptions(): LovelaceGridOptions {
    const columns = 12;
    let rows = 5;
    let min_rows = 4;
    const min_columns = 6;
    // Like the HA core thermostat card: reserve extra rows for features so
    // they don't eat into the dial's space.
    if (this._config?.features?.length) {
      const featureHeight = Math.ceil((this._config.features.length * 2) / 3);
      rows += featureHeight;
      min_rows += featureHeight;
    }
    return {
      rows,
      columns,
      min_rows,
      min_columns,
    };
  }

  public setConfig(config: BetterThermostatUINormalCardConfig): void {
    if (!config.entity || !["climate"].includes(config.entity.split(".")[0])) {
      throw new Error("Specify an entity from within the climate domain");
    }

    this._config = {
      disable_buttons: true,
      ...config,
    };
  }

  private _handleMoreInfo() {
    // Dispatch the event on this element so the local more-info mixin
    // listener catches it. Also, ensure the entity id gets passed to the
    // more-info dialog.
    fireEvent(this, "hass-more-info", {
      entityId: this._config?.entity ?? null,
    });
  }

  protected willUpdate(changed: PropertyValues) {
    if (changed.has("hass") || changed.has("_config")) {
      if (this._config?.entity) {
        this._stateObj = this.hass.states[
          this._config.entity
        ] as BtClimateEntity;
        if (this._stateObj) {
          if (
            !this._featureContext ||
            this._featureContext.entity_id !== this._stateObj.entity_id
          ) {
            this._featureContext = { entity_id: this._stateObj.entity_id };
          }
          // Only override local target values from the HA entity when
          // the user is not currently dragging the control. This avoids the
          // UI jumping back to the old value while the user is still
          // interacting with the slider.
          if (
            !this._isDragging &&
            Date.now() - this._lastInteraction > INTERACTION_HOLDOFF_MS
          ) {
            // Don't invent setpoints from min/max: integrations may report
            // null or missing temperatures (e.g. daikin_onecta in
            // fan_only/dry) — the dial then falls back to a readonly
            // current-temperature display instead.
            this._targetTemperature = {
              value: this._stateObj.attributes.temperature ?? undefined,
              low: this._stateObj.attributes.target_temp_low ?? undefined,
              high: this._stateObj.attributes.target_temp_high ?? undefined,
            };
          }
        }
      }
    }
  }

  private get _step() {
    if (!this._stateObj) return 1;
    return (
      this._stateObj.attributes.target_temp_step ||
      (this.hass.config.unit_system.temperature === "°F" ? 1 : 0.5)
    );
  }
  private get _min() {
    return this._stateObj?.attributes.min_temp ?? 0;
  }
  private get _max() {
    return this._stateObj?.attributes.max_temp ?? 100;
  }

  // Snap a value to the configured step aligned to min, and clamp to [min, max].
  // The circular slider can produce values that are step-aligned to 0 but not
  // to min (e.g. min=44.6, step=0.5 -> 44.5), which HA rejects as out of range.
  private _snap(value: number): number {
    const min = this._min;
    const max = this._max;
    const step = this._step;
    if (!step || step <= 0) return Math.min(Math.max(value, min), max);
    let snapped = min + Math.round((value - min) / step) * step;
    const digits = Math.max(
      step.toString().split(".")?.[1]?.length ?? 0,
      min.toString().split(".")?.[1]?.length ?? 0,
      max.toString().split(".")?.[1]?.length ?? 0,
    );
    snapped = parseFloat(snapped.toFixed(digits));
    return Math.min(Math.max(snapped, min), max);
  }

  private _callService(type: string) {
    if (!this._stateObj) return;
    if (type === "high" || type === "low") {
      this.hass.callService("climate", "set_temperature", {
        entity_id: this._stateObj.entity_id,
        target_temp_low: this._targetTemperature.low,
        target_temp_high: this._targetTemperature.high,
      });
    } else {
      this.hass.callService("climate", "set_temperature", {
        entity_id: this._stateObj.entity_id,
        temperature: this._targetTemperature.value,
      });
    }
  }

  private _debouncedCallService = simpleDebounce(
    (target: "value" | "low" | "high") => this._callService(target),
    1000,
  );

  // Re-sync _targetTemperature from the entity once the interaction holdoff
  // has expired. Without this, an entity echo arriving inside the holdoff
  // (e.g. BT clamping the requested setpoint) would be dropped for good:
  // shouldUpdate() filters unrelated hass ticks, so no later update is
  // guaranteed to re-run the willUpdate sync.
  private _scheduleHoldoffResync() {
    window.clearTimeout(this._holdoffResyncTimer);
    const remaining = Math.max(
      INTERACTION_HOLDOFF_MS - (Date.now() - this._lastInteraction),
      0,
    );
    this._holdoffResyncTimer = window.setTimeout(() => {
      if (this._isDragging) return;
      if (Date.now() - this._lastInteraction <= INTERACTION_HOLDOFF_MS) {
        // A newer interaction happened meanwhile — wait for its holdoff.
        this._scheduleHoldoffResync();
        return;
      }
      const attributes = this._stateObj?.attributes;
      if (!attributes) return;
      this._targetTemperature = {
        value: attributes.temperature ?? undefined,
        low: attributes.target_temp_low ?? undefined,
        high: attributes.target_temp_high ?? undefined,
      };
    }, remaining + 50);
  }

  disconnectedCallback() {
    window.clearTimeout(this._holdoffResyncTimer);
    super.disconnectedCallback();
  }

  private _handleButton(ev: Event) {
    this._lastInteraction = Date.now();
    const btn = ev.currentTarget as HTMLElement & {
      target: "value" | "low" | "high";
      step: number;
    };
    const target = btn.target;
    const step = btn.step;
    const defaultValue = target === "high" ? this._max : this._min;
    let temp = this._targetTemperature[target] ?? defaultValue;
    temp += step;
    temp = this._snap(temp);
    if (target === "high" && this._targetTemperature.low != null)
      temp = Math.max(temp, this._snap(this._targetTemperature.low));
    if (target === "low" && this._targetTemperature.high != null)
      temp = Math.min(temp, this._snap(this._targetTemperature.high));
    this._targetTemperature = { ...this._targetTemperature, [target]: temp };
    this._debouncedCallService(target);
    this._scheduleHoldoffResync();
  }

  private _handleSelect(ev: Event) {
    const btn = ev.currentTarget as HTMLElement & { target: "low" | "high" };
    this._selectTarget = btn.target;
  }

  private _valueChanged(ev: CustomEvent<{ value: number }>) {
    const value = ev.detail.value;
    if (isNaN(value)) return;
    // User finished dragging — commit value and stop ignoring hass updates.
    this._isDragging = false;
    this._lastInteraction = Date.now();
    const snapped = this._snap(value);
    this._targetTemperature = { ...this._targetTemperature, value: snapped };
    this._callService("value");
    this._scheduleHoldoffResync();
  }
  private _valueChanging(ev: CustomEvent<{ value: number }>) {
    const value = ev.detail.value;
    if (isNaN(value)) return;
    // User is actively dragging; set flag so willUpdate doesn't reset
    // _targetTemperature from hass state updates while the user drags.
    this._isDragging = true;
    this._targetTemperature = { ...this._targetTemperature, value };
  }
  private _lowChanged(ev: CustomEvent<{ value: number }>) {
    const value = ev.detail.value;
    if (isNaN(value)) return;
    this._isDragging = false;
    this._lastInteraction = Date.now();
    const snapped = this._snap(value);
    this._targetTemperature = { ...this._targetTemperature, low: snapped };
    this._callService("low");
    this._scheduleHoldoffResync();
  }
  private _lowChanging(ev: CustomEvent<{ value: number }>) {
    const value = ev.detail.value;
    if (isNaN(value)) return;
    this._isDragging = true;
    this._targetTemperature = { ...this._targetTemperature, low: value };
  }
  private _highChanged(ev: CustomEvent<{ value: number }>) {
    const value = ev.detail.value;
    if (isNaN(value)) return;
    this._isDragging = false;
    this._lastInteraction = Date.now();
    const snapped = this._snap(value);
    this._targetTemperature = { ...this._targetTemperature, high: snapped };
    this._callService("high");
    this._scheduleHoldoffResync();
  }
  private _highChanging(ev: CustomEvent<{ value: number }>) {
    const value = ev.detail.value;
    if (isNaN(value)) return;
    this._isDragging = true;
    this._targetTemperature = { ...this._targetTemperature, high: value };
  }

  // HA core's 3-way guard: the feature bit AND a non-null value. Checking the
  // local _targetTemperature (not the raw attribute) keeps the dial stable
  // mid-drag, same as core's ha-state-control-climate-temperature.
  private get _supportsTargetValue() {
    return (
      this._stateObj != null &&
      supportsFeature(
        this._stateObj,
        ClimateEntityFeature.TARGET_TEMPERATURE,
      ) &&
      this._targetTemperature.value != null
    );
  }
  private get _supportsTargetRange() {
    return (
      this._stateObj != null &&
      supportsFeature(
        this._stateObj,
        ClimateEntityFeature.TARGET_TEMPERATURE_RANGE,
      ) &&
      this._targetTemperature.low != null &&
      this._targetTemperature.high != null
    );
  }

  protected render() {
    if (!this._config || !this._stateObj) return nothing;
    const stateObj = this._stateObj;
    const localize = createChainedLocalize(this.hass);
    this.preventInteractionOnScroll = Boolean(
      this._config.prevent_interaction_on_scroll,
    );

    const windowOpen = isWindowOpen(this.hass, stateObj, this._config);
    // Show the current temperature as the big number when configured, or when
    // there is no adjustable setpoint (readonly dial fallback, like HA core's
    // thermostat card) — the state text is then shown by _renderLabel() only.
    const showCurrentAsBig =
      stateObj.attributes.current_temperature != null &&
      (this._config.show_current_as_primary ||
        (!this._supportsTargetValue && !this._supportsTargetRange));

    const action = stateObj.attributes.hvac_action;
    const active = stateActive(stateObj);

    const containerSizeClass = this._sizeController.value
      ? ` ${this._sizeController.value}`
      : "";
    let actionColor: string | undefined;
    if (action && action !== "idle" && action !== "off" && active) {
      actionColor = climateColor(CLIMATE_HVAC_ACTION_TO_MODE[action] ?? "off");
    }
    // The dial follows the same --bt-color-* layer as the mode buttons, so
    // the `colors:` config and themes recolor both consistently.
    let stateColor: string | undefined = climateStateColor(stateObj);
    const preset_mode = stateObj.attributes.preset_mode;
    if (windowOpen) {
      actionColor = "var(--info-color)";
      stateColor = "var(--info-color)";
    } else if (preset_mode != null && preset_mode !== "none") {
      const presetColor = climateColor(preset_mode);
      stateColor = presetColor;
      actionColor = presetColor;
    }

    const summer = stateObj.attributes.call_for_heat === false;
    if (stateObj.state === "off") {
      // Off dial is genuinely grey — but window-open and summer win so the
      // shine matches the label instead of being clobbered to grey.
      if (summer) {
        stateColor = "var(--bt-color-summer)";
        actionColor = "var(--bt-color-summer)";
      } else if (!windowOpen) {
        stateColor = "var(--bt-color-grey)";
        actionColor = "var(--bt-color-grey)";
      }
    }

    const lowColor = active ? climateColor("heat") : climateColor("off");
    const highColor = active ? climateColor("cool") : climateColor("off");
    // Cap the dial to the available container height (like the HA core
    // thermostat card), so it shrinks instead of being cut off.
    const controlMaxWidth = this._resizeController.value
      ? `${Math.min(this._resizeController.value, 320)}px`
      : undefined;
    const name = this._config.name || stateObj.attributes.friendly_name || "";

    return html`
      <ha-card style=${styleMap(climateColorOverrides(this._config.colors))}>
        <p class="title">${name}</p>
        <div class="container">
          <div
            class="bt-wrapper container${containerSizeClass}"
            style=${styleMap({
              "--low-color": lowColor,
              "--high-color": highColor,
              "--state-color": stateColor ?? "var(--primary-text-color)",
              "--action-color": actionColor ?? "",
              maxWidth: controlMaxWidth,
            })}
          >
            ${this._renderCircularSlider(active)}
            <div class="info">
              ${this._renderLabel(windowOpen)}${this._renderPrimary(
                showCurrentAsBig,
              )}${this._renderSecondary(
                showCurrentAsBig,
              )}${this._renderHumidity()}
            </div>
            ${!this._config.disable_buttons &&
            (this._supportsTargetValue || this._supportsTargetRange)
              ? this._renderButtons(
                  this._supportsTargetRange ? this._selectTarget : "value",
                )
              : nothing}
          </div>
        </div>
        ${!this._config.disable_menu
          ? html`<ha-icon-button
              class="more-info"
              .label=${localize("ui.panel.lovelace.cards.show_more_info")}
              .path=${mdiDotsVertical}
              @click=${(e: Event) => {
                e.stopPropagation();
                this._handleMoreInfo();
              }}
              tabindex="0"
            ></ha-icon-button>`
          : nothing}
        ${this._renderActionsSection()}
      </ha-card>
    `;
  }

  // Three slider variants, mirroring HA core: dual range, single setpoint,
  // and a readonly current-temperature dial when the entity has no
  // adjustable target (fan_only/dry, or a transient null setpoint).
  private _renderCircularSlider(active: boolean) {
    const stateObj = this._stateObj!;
    let sliderMode =
      SLIDER_MODES[(stateObj.state as HvacMode) || "off"] || "full";
    if (
      sliderMode === "full" &&
      ["off", "auto"].includes(stateObj.state) &&
      !stateObj.attributes.hvac_modes?.includes("heat_cool")
    ) {
      if (stateObj.attributes.hvac_modes?.includes("heat")) {
        sliderMode = "start";
      } else if (stateObj.attributes.hvac_modes?.includes("cool")) {
        sliderMode = "end";
      }
    }

    if (this._supportsTargetRange) {
      return html`
        <ha-control-circular-slider
          .preventInteractionOnScroll=${this.preventInteractionOnScroll}
          .inactive=${!active}
          dual
          .low=${this._targetTemperature.low}
          .high=${this._targetTemperature.high}
          .min=${this._min}
          .max=${this._max}
          .step=${this._step}
          .current=${stateObj.attributes.current_temperature}
          @low-changed=${this._lowChanged}
          @low-changing=${this._lowChanging}
          @high-changed=${this._highChanged}
          @high-changing=${this._highChanging}
        >
        </ha-control-circular-slider>
      `;
    }
    if (this._supportsTargetValue) {
      return html`
        <ha-control-circular-slider
          .preventInteractionOnScroll=${this.preventInteractionOnScroll}
          .inactive=${!active}
          .mode=${sliderMode}
          .value=${this._targetTemperature.value}
          .min=${this._min}
          .max=${this._max}
          .step=${this._step}
          .current=${stateObj.attributes.current_temperature}
          @value-changed=${this._valueChanged}
          @value-changing=${this._valueChanging}
        >
        </ha-control-circular-slider>
      `;
    }
    return html`
      <ha-control-circular-slider
        .preventInteractionOnScroll=${this.preventInteractionOnScroll}
        .inactive=${!active}
        mode="full"
        readonly
        .current=${stateObj.attributes.current_temperature}
        .min=${this._min}
        .max=${this._max}
        .step=${this._step}
        .disabled=${!active}
      >
      </ha-control-circular-slider>
    `;
  }

  private _renderTarget(temperature: number, big = false, hideUnit = false) {
    const digits = this._step.toString().split(".")?.[1]?.length ?? 0;
    const formatOptions: Intl.NumberFormatOptions = {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    };
    const unit = hideUnit ? "" : this.hass.config.unit_system.temperature;
    const formatted = formatNumber(
      temperature,
      this.hass.locale,
      formatOptions,
    );
    if (big) {
      return html`
        <ha-big-number
          .value=${temperature}
          .unit=${this.hass.config.unit_system.temperature}
          .hass=${this.hass}
          .formatOptions=${formatOptions}
        ></ha-big-number>
      `;
    }
    return html`${formatted} ${unit}`;
  }

  private _renderCurrent(temperature: number, big = false) {
    if (big) {
      return html`
        <ha-big-number
          .value=${temperature}
          .unit=${this.hass.config.unit_system.temperature}
          .hass=${this.hass}
        ></ha-big-number>
      `;
    }
    let formatted = this.hass.formatEntityAttributeValue(
      this._stateObj!,
      "current_temperature",
      temperature,
    );
    if (!formatted) {
      formatted = `${temperature} ${this.hass.config.unit_system.temperature}`;
    }
    return html`
      ${formatted}
    `;
  }

  private _renderLabel(windowOpen: boolean) {
    const stateObj = this._stateObj!;
    const lowBatteryEntity = getLowBattery(stateObj, this._config);
    const errorEntityId = getErrorEntityId(stateObj, this._config);
    const degradedMode = isDegraded(stateObj, this._config);

    const warningIcons = html`
      ${degradedMode
        ? html`
            <span
              class="warning degraded-label label"
              title="Degraded Mode"
              style="color: var(--warning-color, #ffc107); cursor: pointer; pointer-events: auto; display: inline-flex !important;"
              @click=${(ev: Event) => {
                ev.stopPropagation();
                this._openMoreInfo(ev, stateObj.entity_id);
              }}
            >
              <ha-svg-icon .path=${mdiAlert}></ha-svg-icon>
            </span>
          `
        : nothing}
      ${errorEntityId
        ? html`
            <span
              class="warning error-label label"
              title="Connection Lost"
              style="color: var(--error-color, #f44336); cursor: pointer; pointer-events: auto; display: inline-flex !important;"
              @click=${(ev: Event) => {
                ev.stopPropagation();
                this._openMoreInfo(ev, errorEntityId!);
              }}
            >
              <ha-svg-icon .path=${mdiWifiStrengthOffOutline}></ha-svg-icon>
            </span>
          `
        : nothing}
      ${lowBatteryEntity
        ? html`
            <span
              class="warning batteries-label label"
              title="Low Battery"
              style="color: var(--error-color, #f44336); cursor: pointer; pointer-events: auto; display: inline-flex !important;"
              @click=${(ev: Event) => {
                ev.stopPropagation();
                this._openMoreInfo(ev, lowBatteryEntity!.name);
              }}
            >
              <ha-svg-icon .path=${mdiBatteryAlert}></ha-svg-icon>
            </span>
          `
        : nothing}
    `;

    const summer = stateObj.attributes.call_for_heat === false;

    if (stateObj.state === UNAVAILABLE) {
      return html`<div class="label-container">
        ${warningIcons}
        <p class="label hvac_action">
          ${this.hass.formatEntityState(stateObj)}
        </p>
      </div>`;
    }
    if (windowOpen) {
      return html`<div class="label-container">
        ${warningIcons}
        <p class="label window-label">
          <ha-svg-icon .path=${mdiWindowOpenVariant}></ha-svg-icon>
        </p>
      </div>`;
    }
    if (summer) {
      return html`<div class="label-container">
        ${warningIcons}
        <p class="label summer-label">
          <ha-svg-icon .path=${mdiWhiteBalanceSunny}></ha-svg-icon>
        </p>
      </div>`;
    }
    if (
      stateObj.attributes.hvac_action &&
      stateObj.attributes.hvac_action !== "off"
    ) {
      return html`<div class="label-container">
        ${warningIcons}
        <p class="label hvac_action">
          ${this.hass.formatEntityAttributeValue(stateObj, "hvac_action")}
        </p>
      </div>`;
    }
    return html`<div class="label-container">
      ${warningIcons}
      <p class="label hvac_action">${this.hass.formatEntityState(stateObj)}</p>
    </div>`;
  }

  private _renderPrimary(showCurrentAsBig: boolean) {
    const stateObj = this._stateObj!;
    if (stateObj.state === UNAVAILABLE) return nothing;
    if (showCurrentAsBig)
      return this._renderCurrent(
        stateObj.attributes.current_temperature!,
        true,
      );
    if (this._supportsTargetValue)
      return this._renderTarget(this._targetTemperature.value!, true);
    if (this._supportsTargetRange) {
      return html`<div class="dual">
        <button
          @click=${this._handleSelect}
          .target=${"low"}
          class="target-button ${classMap({
            selected: this._selectTarget === "low",
          })}"
        >
          ${this._renderTarget(this._targetTemperature.low!, true)}</button
        ><button
          @click=${this._handleSelect}
          .target=${"high"}
          class="target-button ${classMap({
            selected: this._selectTarget === "high",
          })}"
        >
          ${this._renderTarget(this._targetTemperature.high!, true)}
        </button>
      </div>`;
    }
    // No setpoint and no current temperature: _renderLabel() already shows
    // the state text — don't duplicate it here.
    return nothing;
  }

  private _renderSecondary(showCurrentAsBig: boolean) {
    const stateObj = this._stateObj!;
    const config = this._config!;
    const currentTemp = stateObj.attributes.current_temperature;
    if (config.show_secondary === false) return html`<p class="label secondary"></p>`;
    if (currentTemp != null && !showCurrentAsBig) {
      return html`<p class="label secondary">
        <ha-svg-icon .path=${mdiThermometer}></ha-svg-icon>
        ${this._renderCurrent(currentTemp)}
      </p>`;
    }
    // Show the setpoint small only when the current temperature actually
    // occupies the big slot — otherwise _renderPrimary is already showing it.
    if (this._supportsTargetValue && showCurrentAsBig) {
      return html`<p class="label secondary">
        <ha-svg-icon .path=${mdiThermostat}></ha-svg-icon>${this._renderTarget(
          this._targetTemperature.value!,
        )}
      </p>`;
    }
    if (this._supportsTargetRange && showCurrentAsBig) {
      return html`<p class="label secondary">
        <ha-svg-icon .path=${mdiThermostat}></ha-svg-icon
        ><button
          @click=${this._handleSelect}
          .target=${"low"}
          class="target-button ${classMap({
            selected: this._selectTarget === "low",
          })}"
        >
          ${this._renderTarget(this._targetTemperature.low!, false, true)}</button
        ><span>·</span
        ><button
          @click=${this._handleSelect}
          .target=${"high"}
          class="target-button ${classMap({
            selected: this._selectTarget === "high",
          })}"
        >
          ${this._renderTarget(this._targetTemperature.high!, false, true)}
        </button>
      </p>`;
    }
    return html`<p class="label secondary"></p>`;
  }

  private _renderHumidity() {
    const humidityDisplay = formatHumidity(
      this.hass,
      this._stateObj!,
      this._config,
    );
    if (!humidityDisplay) return nothing;

    return html`
      <p class="label secondary humidity">
        <ha-svg-icon .path=${mdiWaterPercent}></ha-svg-icon>
        ${humidityDisplay}&nbsp;
      </p>
    `;
  }

  private _renderButtons(target: "value" | "low" | "high") {
    const unavailable = this._stateObj!.state === UNAVAILABLE;
    return html`<div class="buttons">
      <ha-outlined-icon-button
        .target=${target}
        .step=${-this._step}
        .disabled=${unavailable}
        @click=${this._handleButton}
        ><ha-svg-icon .path=${mdiMinus}></ha-svg-icon></ha-outlined-icon-button
      ><ha-outlined-icon-button
        .target=${target}
        .step=${this._step}
        .disabled=${unavailable}
        @click=${this._handleButton}
        ><ha-svg-icon .path=${mdiPlus}></ha-svg-icon
      ></ha-outlined-icon-button>
    </div>`;
  }

  private _renderActionsSection() {
    const stateObj = this._stateObj!;
    const config = this._config!;
    const iconStyle: StyleInfo = {
      "--icon-color": "var(--bt-color-grey)",
      "--bg-color": alphaColor("var(--bt-color-grey)", 0.2),
    };

    const rawHvacModes: string[] = Array.isArray(stateObj.attributes.hvac_modes)
      ? stateObj.attributes.hvac_modes
      : ["off", "heat", "cool"];
    // Always render the "off" mode last in the button row, regardless of the
    // order the integration reports hvac_modes in.
    const hvacModes: string[] = [
      ...rawHvacModes.filter((mode) => mode !== "off"),
      ...(rawHvacModes.includes("off") ? ["off"] : []),
    ];
    const presetsIndex = Math.max(hvacModes.length - 1, 0);
    const buttonModes: string[] = config.disable_presets
      ? hvacModes
      : [
          ...hvacModes.slice(0, presetsIndex),
          "presets",
          ...hvacModes.slice(presetsIndex),
        ];

    // disable_all_buttons hides the whole row, except the presets button
    // as long as presets aren't disabled themselves.
    const hasPresets =
      (
        stateObj.attributes.preset_modes?.filter((p: string) => p !== "none") ??
        []
      ).length > 0;
    const presetOnly =
      !!config.disable_all_buttons && !config.disable_presets && hasPresets;
    const showActions = !config.disable_all_buttons || presetOnly;
    if (!showActions) return nothing;

    return html`
      <div class="actions">
        <div
          class=${classMap({
            "preset-select": true,
            open: this._presetOverlay.open,
          })}
        >
          ${(stateObj.attributes.preset_modes ?? [])
            .filter((mode: string) => mode !== "none")
            .map(
              (mode: string) => html`
              <mushroom-button
                style=${styleMap(iconStyle)}
                .mode=${mode}
                .disabled=${!isAvailable(stateObj)}
                @click=${this.triggerModeChange.bind(this, mode)}
                @longpress=${(e: Event) => {
                  e.stopPropagation();
                  this._presetOverlay.setOpen(true);
                }}
              >
                <ha-icon .icon=${getHvacModeIcon(mode)}></ha-icon>
              </mushroom-button>
            `,
          )}
        </div>

        ${presetOnly
          ? html`
              <mushroom-button-group .fill=${true} ?rtl=${false}>
                ${this.renderModeButton("presets")}
              </mushroom-button-group>
            `
          : config.features?.length
            ? html`
                <cts-hui-card-features
                  .hass=${this.hass}
                  .context=${this._featureContext}
                  .features=${config.features}
                  color=${climateStateColor(stateObj)}
                ></cts-hui-card-features>
              `
            : html`
                <mushroom-button-group .fill=${true} ?rtl=${false}>
                  ${buttonModes.map((mode) => this.renderModeButton(mode))}
                </mushroom-button-group>
              `}
      </div>
    `;
  }

  private renderModeButton(mode: string) {
    if (!this._stateObj?.attributes) {
      return nothing;
    }

    if (mode === "presets") {
      const presetMode = this._stateObj?.attributes?.preset_mode;
      const iconStyle: StyleInfo = {};
      const selectedMode =
        presetMode != null && presetMode !== "none" ? presetMode : "none";
      const color = climateColor(selectedMode);
      if (presetMode != null && presetMode !== "none") {
        iconStyle["--icon-color"] = color;
        iconStyle["--bg-color"] = alphaColor(color, 0.2);
      }
      const icon = getHvacModeIcon(selectedMode as HvacMode);
      const presets = (this._stateObj?.attributes?.preset_modes?.filter(
        (p) => p != "none",
      ) || []) as HvacMode[];

      if (presets.length === 1) {
        return html`
          <mushroom-button
            style=${styleMap(iconStyle)}
            .mode=${selectedMode}
            @click=${this.triggerModeChange.bind(this, presets[0])}
            @longpress=${(e: Event) => {
              e.stopPropagation();
              this._presetOverlay.setOpen(true);
            }}
          >
            <ha-icon .icon=${getHvacModeIcon(presets[0] as HvacMode)}></ha-icon>
          </mushroom-button>
        `;
      } else if (presets.length > 1) {
        return html`
          <mushroom-button
            style=${styleMap(iconStyle)}
            .mode=${selectedMode}
            .disabled=${!isAvailable(this._stateObj)}
            @click=${(e: Event) => {
              e.stopPropagation();
              this._presetOverlay.setOpen(true);
            }}
          >
            <ha-icon .icon=${icon}></ha-icon>
          </mushroom-button>
        `;
      } else {
        return nothing;
      }
    }

    const iconStyle: StyleInfo = {};
    const color = mode === "off" ? "var(--bt-color-grey)" : climateColor(mode);
    if (mode === this._stateObj.state) {
      iconStyle["--icon-color"] = color;
      iconStyle["--bg-color"] = alphaColor(color, 0.2);
    }

    return html`
      <mushroom-button
        style=${styleMap(iconStyle)}
        .mode=${mode}
        .disabled=${!isAvailable(this._stateObj)}
        @click=${this.triggerModeChange.bind(this, mode)}
      >
        <ha-icon .icon=${getHvacModeIcon(mode as HvacMode)}></ha-icon>
      </mushroom-button>
    `;
  }

  private triggerModeChange(mode: string) {
    if (!this._stateObj) return;
    if (setClimateMode(this.hass, this._stateObj, mode)) {
      this._presetOverlay.setOpen(false);
    }
  }

  private _openMoreInfo(ev: Event, entityId: string) {
    ev.stopPropagation();
    ev.preventDefault();
    if (!entityId) return;
    fireEvent(this, "hass-more-info", {
      entityId,
    });
  }

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      btStateColorsStyle,
      climateColorDefaultStyles,
      presetOverlayStyle,
      btAnimationsStyle,
      ShadowStyles,
    ];
  }
}
