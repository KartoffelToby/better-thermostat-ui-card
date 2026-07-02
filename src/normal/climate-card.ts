import { CSSResultGroup, html, nothing, PropertyValues } from "lit";
import { ResizeController } from "@lit-labs/observers/resize-controller";

import {
  ActionHandlerEvent,
  HvacMode,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  isActive,
  isAvailable,
  formatNumber,
  fireEvent,
} from "mushroom-cards/src/ha";
import { LovelaceGridOptions } from "mushroom-cards/src/ha";
import { MushroomBaseElement } from "mushroom-cards/src/utils/base-element";
import { registerCustomCard } from "mushroom-cards/src/utils/custom-cards";
import { CLIMATE_CARD_EDITOR_NAME, CLIMATE_CARD_NAME, CLIMATE_ENTITY_DOMAINS } from "./const";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import { BetterThermostatUINormalCardConfig } from "./climate-card-config";
import { mdiMinus, mdiPlus, mdiThermometer, mdiThermostat, mdiWindowOpenVariant, mdiDotsVertical, mdiFire, mdiWaterPercent, mdiBattery10, mdiAlert, mdiBatteryAlert, mdiWifiStrengthOffOutline, mdiWhiteBalanceSunny } from "@mdi/js";
import { ShadowStyles } from './style';
import { CLIMATE_HVAC_ACTION_TO_MODE, ClimateEntity, stateColorCss, stateActive, stateControlCircularSliderStyle } from "../shims/ha-frontend-shim";
import setupMushroomLocalize from "mushroom-cards/src/localize";
import setupCustomlocalize from "../localize/localize";
import { getHvacModeColor, getHvacModeIcon } from "./utils";
import { formatHumidity, isWindowOpen } from "../utils/bt";
import "./features/hui-card-features";
import type { LovelaceCardFeatureContext } from "./features/types";

const UNAVAILABLE = "unavailable";

interface BatteryState {
  battery: string;
}

const SLIDER_MODES: Record<HvacMode, string> = {
  auto: "full",
  cool: "end",
  dry: "full",
  fan_only: "full",
  heat: "start",
  heat_cool: "full",
  off: "full",
};

function simpleDebounce<T extends (...args: any[]) => void>(fn: T, timeout = 300) {
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
export class BetterThermostatUINormalCard extends MushroomBaseElement implements LovelaceCard {
  @property({ type: Boolean }) public preview = false;
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Boolean, attribute: "prevent-interaction-on-scroll" })
  public preventInteractionOnScroll = false;
  @state() private _config?: BetterThermostatUINormalCardConfig;
  @state() private _stateObj?: ClimateEntity;
  @state() private _featureContext?: LovelaceCardFeatureContext;
  @state() private _targetTemperature: Partial<Record<"value" | "low" | "high", number>> = {};
  // When the user is actively interacting (dragging) the slider, prevent
  // `willUpdate` from overwriting the in-progress value from the hass state
  // updates. The circular slider fires `value-changing` events while dragging.
  private _isDragging = false;
  private _lastInteraction = 0;
  @state() private _selectTarget: "value" | "low" | "high" = "low";
  @state() private _presetOpen: boolean = false;
  @property({ type: Boolean }) public window: boolean = false;
  @property({ type: Boolean }) public summer: boolean = false;
  @property({ type: String }) public status: string = "loading";
  @property({ type: String }) public mode: string = "off";
  @property({ type: Number }) public current: number = 0;
  @property({ type: Number }) public current_humidity: number = 0;
  private lowBattery: { name: string; battery: number } | undefined;
  private error: any = [];

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./climate-card-editor");
    return document.createElement(CLIMATE_CARD_EDITOR_NAME) as LovelaceCardEditor;
  }

  public static async getStubConfig(
    hass: HomeAssistant
  ): Promise<BetterThermostatUINormalCardConfig> {
    const entities = Object.keys(hass.states);
    const climates = entities.filter((e) =>
      CLIMATE_ENTITY_DOMAINS.includes(e.split(".")[0])
    );
    const btEntity = climates.find(
      (e) => (hass.states[e]?.attributes as any)?.call_for_heat !== undefined
    );
    return {
      type: `custom:${CLIMATE_CARD_NAME}`,
      entity: btEntity ?? climates[0],
    };
  }

  private _resizeController = new ResizeController(this, {
    callback: (entries) => {
      const container = entries[0]?.target.shadowRoot?.querySelector(
        ".container"
      ) as HTMLElement | undefined;
      return container?.clientHeight;
    },
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

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    const wrapper = this.shadowRoot?.querySelector(".bt-wrapper");
    if (wrapper) {
      this._sizeController.unobserve(this);
      this._sizeController.observe(wrapper);
    }
    // Ensure overlay/pointerdown handler is cleaned up when component is removed
    // (no-op; assigned when opening preset select)
  }

  public getCardSize(): number { return 5; }
  public getGridOptions(): LovelaceGridOptions {
    const columns = 12;
    let rows = 5;
    let min_rows = 3;
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
    if (
      !config.entity ||
      !["climate"].includes(config.entity.split(".")[0])
    ) {
      throw new Error(
        "Specify an entity from within the climate domain"
      );
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
    fireEvent(this as any, "hass-more-info" as any, {
      entityId: this._config!.entity ?? null,
    });
  }

  protected willUpdate(changed: PropertyValues) {
    if (changed.has("hass") || changed.has("_config")) {
      if (this._config?.entity) {
        this._stateObj = this.hass.states[this._config.entity] as ClimateEntity;
        if (this._stateObj) {
          if (!this._featureContext || this._featureContext.entity_id !== this._stateObj.entity_id) {
            this._featureContext = { entity_id: this._stateObj.entity_id };
          }
          // Only override local target values from the HA entity when
          // the user is not currently dragging the control. This avoids the
          // UI jumping back to the old value while the user is still
          // interacting with the slider.
          if (!this._isDragging && Date.now() - this._lastInteraction > 3000) {
            const min = this._stateObj.attributes.min_temp ?? 0;
            const max = this._stateObj.attributes.max_temp ?? 100;
            this._targetTemperature = {
              value: this._stateObj.attributes.temperature ?? min,
              low: this._stateObj.attributes.target_temp_low ?? min,
              high: this._stateObj.attributes.target_temp_high ?? max,
            };
          }
        }
      }
    }
  }

  private get _step() {
    if (!this._stateObj) return 1;
    return this._stateObj.attributes.target_temp_step || (this.hass.config.unit_system.temperature === "°F" ? 1 : 0.5);
  }
  private get _min() { return this._stateObj?.attributes.min_temp ?? 0; }
  private get _max() { return this._stateObj?.attributes.max_temp ?? 100; }

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
      max.toString().split(".")?.[1]?.length ?? 0
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

  private _debouncedCallService = simpleDebounce((target: "value" | "low" | "high") => this._callService(target), 1000);

  private _handleButton(ev: Event) {
    this._lastInteraction = Date.now();
    const btn = ev.currentTarget as any;
    const target = btn.target as "value" | "low" | "high";
    const step = btn.step as number;
    const defaultValue = target === "high" ? this._max : this._min;
    let temp = this._targetTemperature[target] ?? defaultValue;
    temp += step;
    temp = this._snap(temp);
    if (target === "high" && this._targetTemperature.low != null) temp = Math.max(temp, this._snap(this._targetTemperature.low));
    if (target === "low" && this._targetTemperature.high != null) temp = Math.min(temp, this._snap(this._targetTemperature.high));
    this._targetTemperature = { ...this._targetTemperature, [target]: temp };
    this._debouncedCallService(target);
  }

  private _handleSelect(ev: Event) { const btn = ev.currentTarget as any; this._selectTarget = btn.target; }

  private _valueChanged(ev: CustomEvent) {
    const value = (ev.detail as any).value;
    if (isNaN(value)) return;
    // User finished dragging — commit value and stop ignoring hass updates.
    this._isDragging = false;
    this._lastInteraction = Date.now();
    const snapped = this._snap(value);
    this._targetTemperature = { ...this._targetTemperature, value: snapped };
    this._callService("value");
  }
  private _valueChanging(ev: CustomEvent) {
    const value = (ev.detail as any).value;
    if (isNaN(value)) return;
    // User is actively dragging; set flag so willUpdate doesn't reset
    // _targetTemperature from hass state updates while the user drags.
    this._isDragging = true;
    this._targetTemperature = { ...this._targetTemperature, value };
  }
  private _lowChanged(ev: CustomEvent) {
    const value = (ev.detail as any).value;
    if (isNaN(value)) return;
    this._isDragging = false;
    this._lastInteraction = Date.now();
    const snapped = this._snap(value);
    this._targetTemperature = { ...this._targetTemperature, low: snapped };
    this._callService("low");
  }
  private _lowChanging(ev: CustomEvent) {
    const value = (ev.detail as any).value;
    if (isNaN(value)) return;
    this._isDragging = true;
    this._targetTemperature = { ...this._targetTemperature, low: value };
  }
  private _highChanged(ev: CustomEvent) {
    const value = (ev.detail as any).value;
    if (isNaN(value)) return;
    this._isDragging = false;
    this._lastInteraction = Date.now();
    const snapped = this._snap(value);
    this._targetTemperature = { ...this._targetTemperature, high: snapped };
    this._callService("high");
  }
  private _highChanging(ev: CustomEvent) {
    const value = (ev.detail as any).value;
    if (isNaN(value)) return;
    this._isDragging = true;
    this._targetTemperature = { ...this._targetTemperature, high: value };
  }

  private get _supportsTargetValue() { return this._stateObj != null && "temperature" in this._stateObj.attributes; }
  private get _supportsTargetRange() { return this._stateObj != null && "target_temp_low" in this._stateObj.attributes && "target_temp_high" in this._stateObj.attributes; }

  protected render() {
    if (!this._config || !this._stateObj) return nothing;
    const stateObj = this._stateObj;
    const config = this._config;
    const customLocalize = setupCustomlocalize(this.hass as any);
    const mushroomLocalize = setupMushroomLocalize(this.hass!);
    const localize = (key: string) => {
      const custom = customLocalize(key);
      if (custom && custom !== key) return custom;
      const mush = mushroomLocalize(key);
      if (mush && mush !== key) return mush;
      return this.hass!.localize(key);
    };
    const active = isActive(stateObj);
    const available = isAvailable(stateObj);
    let sliderMode = SLIDER_MODES[(stateObj.state as HvacMode) || "off"] || "full";
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
    this.preventInteractionOnScroll = Boolean(this._config?.prevent_interaction_on_scroll);

    const showCurrentAsPrimary = this._config.show_current_as_primary;
    const showSecondary = this._config.show_secondary;

    const currentTemp = stateObj.attributes.current_temperature;

    const window = isWindowOpen(this.hass, stateObj, this._config);


    const renderTarget = (temperature: number, big = false, hideUnit = false) => {
      const digits = this._step.toString().split(".")?.[1]?.length ?? 0;
      const formatOptions: Intl.NumberFormatOptions = { maximumFractionDigits: digits, minimumFractionDigits: digits };
      const unit = hideUnit ? "" : this.hass.config.unit_system.temperature;
      const formatted = formatNumber(temperature, this.hass.locale, formatOptions);
      if (big) {
        return html`
          <ha-big-number
            .value=${temperature}
            .unit=${this.hass.config.unit_system.temperature}
              .hass=${this.hass as any}
            .formatOptions=${formatOptions}
          ></ha-big-number>
        `;
      }
      return html`${formatted} ${unit}`;
    };

    const renderCurrent = (temperature: number, big = false) => {
      const formatted = this.hass.formatEntityAttributeValue(stateObj, "current_temperature", temperature);
      if (big) {
        return html`
          <ha-big-number
            .value=${temperature}
            .unit=${this.hass.config.unit_system.temperature}
            .hass=${this.hass as any}
          ></ha-big-number>
        `;
      }

      return html`
        ${this.hass.formatEntityAttributeValue(
          stateObj,
          "current_temperature",
          temperature
        )}
      `;
    };

    const renderLabel = () => {

      // --- Low battery detection ---
      let lowBatteryEntity: { name: string; battery: number } | undefined;
      if (this._config?.debug_battery) {
        lowBatteryEntity = { name: "Debug Sensor", battery: 5 };
        this.lowBattery = lowBatteryEntity;
      } else if ((stateObj.attributes as any)?.batteries !== undefined && !this?._config?.disable_battery_warning) {
        try {
          const showLowBatteryWarningWhenPercentageLowerThan = this._config?.low_battery_threshold ?? 10;
          const batteries = Object.entries(JSON.parse((stateObj.attributes as any).batteries) as Record<string, BatteryState>);
          const parsedBatteries = batteries.map((data) => ({ "name": data[0], "battery": data[1].battery === "on" ? showLowBatteryWarningWhenPercentageLowerThan - 1 : data[1].battery === "off" ? 100 : parseFloat(data[1].battery) }));
          const lowBatteries = parsedBatteries.filter((entity) => entity.battery < showLowBatteryWarningWhenPercentageLowerThan);
          lowBatteryEntity = lowBatteries[0];
          this.lowBattery = lowBatteryEntity;
        } catch (_e) {
          this.lowBattery = undefined;
        }
      } else {
        this.lowBattery = undefined;
      }

      // --- Connection error detection ---
      let errorEntityId: string | undefined;
      if (this._config?.debug_connection) {
        errorEntityId = "Debug Sensor";
        this.error = "Debug Sensor";
      } else if ((stateObj.attributes as any)?.errors !== undefined && !this?._config?.disable_connection_lost_warning) {
        try {
          const errors = JSON.parse((stateObj.attributes as any).errors);
          if (Array.isArray(errors) && errors.length > 0) {
            const first = errors[0];
            this.error = first;
            if (typeof first === "string") {
              errorEntityId = first;
            } else if (typeof first === "object" && first !== null) {
              errorEntityId = first.entity_id || first.entity || first.name;
            }
          } else {
            this.error = [];
          }
        } catch (_e) {
          this.error = [];
        }
      } else {
        this.error = [];
      }

      // --- Build warning icons ---
      const degradedMode = this?._config?.debug_degraded || (!this?._config?.disable_degraded_warning && (stateObj.attributes as any)?.degraded_mode === true);
      const warningIcons = html`
        ${degradedMode ? html`
          <span class="warning degraded-label label" title="Degraded Mode" style="color: var(--warning-color, #ffc107); cursor: pointer; pointer-events: auto; display: inline-flex !important;" @click=${(ev: Event) => { ev.stopPropagation(); this._openMoreInfo(ev, stateObj.entity_id); }}>
            <ha-svg-icon .path=${mdiAlert}></ha-svg-icon>
          </span>
        ` : nothing}
        ${errorEntityId ? html`
          <span class="warning error-label label" title="Connection Lost" style="color: var(--error-color, #f44336); cursor: pointer; pointer-events: auto; display: inline-flex !important;" @click=${(ev: Event) => { ev.stopPropagation(); this._openMoreInfo(ev, errorEntityId!); }}>
            <ha-svg-icon .path=${mdiWifiStrengthOffOutline}></ha-svg-icon>
          </span>
        ` : nothing}
        ${lowBatteryEntity ? html`
          <span class="warning batteries-label label" title="Low Battery" style="color: var(--error-color, #f44336); cursor: pointer; pointer-events: auto; display: inline-flex !important;" @click=${(ev: Event) => { ev.stopPropagation(); this._openMoreInfo(ev, lowBatteryEntity!.name); }}>
            <ha-svg-icon .path=${mdiBatteryAlert}></ha-svg-icon>
          </span>
        ` : nothing}
      `;

      const window = isWindowOpen(this.hass, stateObj, this._config);
      const summer = (stateObj.attributes as any).call_for_heat === false;

      if (stateObj.state === UNAVAILABLE) {
        return html`<div class="label-container">${warningIcons}<p class="label hvac_action">${this.hass.formatEntityState(stateObj)}</p></div>`;
      }
      if (window) {
        return html`<div class="label-container">${warningIcons}<p class="label window-label"><ha-svg-icon .path=${mdiWindowOpenVariant}></ha-svg-icon></p></div>`;
      }
      if (summer) {
        return html`<div class="label-container">${warningIcons}<p class="label summer-label"><ha-svg-icon .path=${mdiWhiteBalanceSunny}></ha-svg-icon></p></div>`;
      }
      if (stateObj.attributes.hvac_action && stateObj.attributes.hvac_action !== "off") {
        return html`<div class="label-container">${warningIcons}<p class="label hvac_action">${this.hass.formatEntityAttributeValue(stateObj, "hvac_action")}</p></div>`;
      }
      return html`<div class="label-container">${warningIcons}<p class="label hvac_action">${this.hass.formatEntityState(stateObj)}</p></div>`;
    };

    const primary = () => {
      if (currentTemp != null && showCurrentAsPrimary) return renderCurrent(currentTemp, true);
      if (this._supportsTargetValue && !showCurrentAsPrimary) return renderTarget(this._targetTemperature.value!, true);
      if (this._supportsTargetRange && !showCurrentAsPrimary) {
        return html`<div class="dual"> <button @click=${this._handleSelect} .target=${"low"} class="target-button ${classMap({ selected: this._selectTarget === "low" })}">${renderTarget(this._targetTemperature.low!, true)}</button><button @click=${this._handleSelect} .target=${"high"} class="target-button ${classMap({ selected: this._selectTarget === "high" })}">${renderTarget(this._targetTemperature.high!, true)}</button></div>`;
      }
      // No target temperature supported (e.g. fan_only/dry mode) — show
      // current temperature as the primary display if available.
      if (currentTemp != null) return renderCurrent(currentTemp, true);
      return html`<p class="primary-state">${this.hass.formatEntityState(stateObj)}</p>`;
    };

    const secondary = () => {
      if (!showSecondary) return html`<p class="label secondary"></p>`;
      if (currentTemp != null && !showCurrentAsPrimary) {
        return html`<p class="label secondary"><ha-svg-icon .path=${mdiThermometer}></ha-svg-icon> ${renderCurrent(currentTemp)}</p>`;
      }
      if (this._supportsTargetValue && showCurrentAsPrimary) {
        return html`<p class="label secondary"><ha-svg-icon .path=${mdiThermostat}></ha-svg-icon>${renderTarget(this._targetTemperature.value!)}</p>`;
      }
      if (this._supportsTargetRange && showCurrentAsPrimary) {
        return html`<p class="label secondary"><ha-svg-icon .path=${mdiThermostat}></ha-svg-icon><button @click=${this._handleSelect} .target=${"low"} class="target-button ${classMap({ selected: this._selectTarget === "low" })}">${renderTarget(this._targetTemperature.low!, false, true)}</button><span>·</span><button @click=${this._handleSelect} .target=${"high"} class="target-button ${classMap({ selected: this._selectTarget === "high" })}">${renderTarget(this._targetTemperature.high!, false, true)}</button></p>`;
      }
      return html`<p class="label secondary"></p>`;
    };

    const renderHumidity = () => {
      const humidityDisplay = formatHumidity(this.hass, stateObj, this._config);
      if (!humidityDisplay) return nothing;

      return html`
        <p class="label secondary humidity">
          <ha-svg-icon .path=${mdiWaterPercent}></ha-svg-icon>
          ${humidityDisplay}&nbsp;
        </p>
      `;
    };

    const buttons = (target: "value" | "low" | "high") => html`<div class="buttons"><ha-outlined-icon-button .target=${target as any} .step=${-this._step} @click=${this._handleButton}><ha-svg-icon .path=${mdiMinus}></ha-svg-icon></ha-outlined-icon-button><ha-outlined-icon-button .target=${target as any} .step=${this._step} @click=${this._handleButton}><ha-svg-icon .path=${mdiPlus}></ha-svg-icon></ha-outlined-icon-button></div>`;

    const actionsSection = () => {
      const iconStyle = {};
      iconStyle["--icon-color"] = `var(--rgb-grey)`;
      iconStyle["--bg-color"] = `rgba(var(--rgb-grey), 0.2)`;

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
        (stateObj.attributes.preset_modes?.filter((p: string) => p !== "none") ?? [])
          .length > 0;
      const presetOnly =
        !!config.disable_all_buttons &&
        !config.disable_presets &&
        hasPresets;
      const showActions = !config.disable_all_buttons || presetOnly;
      if (!showActions) return nothing;

      return html`
        <div class="actions">
          <div class=${classMap({ 'preset-select': true, open: this._presetOpen })}>
            ${(stateObj.attributes.preset_modes ?? []).map((mode: any) => html`
              <mushroom-button
                style=${styleMap(iconStyle)}
                .mode=${mode}
                .disabled=${!isAvailable(stateObj)}
                  @click=${this.triggerModeChange.bind(this, mode)}
                  @longpress=${(e: Event) => { e.stopPropagation(); this._openPresetSelect(true); }}
              >
                <ha-icon .icon=${getHvacModeIcon(mode)}></ha-icon>
              </mushroom-button>
            `)}
          </div>

          ${presetOnly ? html`
            <mushroom-button-group .fill=${true} ?rtl=${false}>
              ${this.renderModeButton("presets")}
            </mushroom-button-group>
          ` : config.features?.length ? html`
            <cts-hui-card-features
              .hass=${this.hass}
              .context=${this._featureContext}
              .features=${config.features}
              color=${stateColorCss(stateObj)}
            ></cts-hui-card-features>
          ` : html`
            <mushroom-button-group .fill=${true} ?rtl=${false}>
              ${buttonModes.map((mode) => this.renderModeButton(mode))}
            </mushroom-button-group>
          `}
        </div>
      `;
    };

    if ((this._supportsTargetValue || this._supportsTargetRange) && available) {
      const mode = this._stateObj.state;
      const action = this._stateObj.attributes.hvac_action;
      const active = stateActive(this._stateObj);

      const containerSizeClass = this._sizeController.value
        ? ` ${this._sizeController.value}`
        : "";
      let actionColor: string | undefined;
      if (action && action !== "idle" && action !== "off" && active) {
        actionColor = stateColorCss(
          this._stateObj,
          CLIMATE_HVAC_ACTION_TO_MODE[action]
        );
      }
      let stateColor = stateColorCss(this._stateObj);
      const preset_mode = (this._stateObj.attributes as any).preset_mode;
      if (window) {
        actionColor = "var(--info-color)";
        stateColor = "var(--info-color)";
      } else if (preset_mode != null && preset_mode !== 'none') {
        const pre_color = getHvacModeColor(preset_mode);
        stateColor = `rgb(${pre_color})`;
        actionColor = `rgb(${pre_color})`;
      }

      if (mode === "off") {
        stateColor = "var(--rgb-grey)";
        actionColor = "var(--rgb-grey)";
      }


      const lowColor = stateColorCss(this._stateObj, active ? "heat" : "off");
      const highColor = stateColorCss(this._stateObj, active ? "cool" : "off");
      // Cap the dial to the available container height (like the HA core
      // thermostat card), so it shrinks instead of being cut off.
      const controlMaxWidth = this._resizeController.value
      ? `${Math.min(this._resizeController.value, 320)}px`
      : undefined;
      const name = this._config.name || this._stateObj.attributes.friendly_name || "";

      const circularSlider = this._supportsTargetRange
        ? html`
            <ha-control-circular-slider
              .preventInteractionOnScroll=${this.preventInteractionOnScroll}
              .inactive=${!active}
              dual
              .low=${this._targetTemperature.low}
              .high=${this._targetTemperature.high}
              .min=${this._min}
              .max=${this._max}
              .step=${this._step}
              .current=${this._stateObj.attributes.current_temperature}
              @low-changed=${this._lowChanged}
              @low-changing=${this._lowChanging}
              @high-changed=${this._highChanged}
              @high-changing=${this._highChanging}
            >
            </ha-control-circular-slider>
          `
        : html`
            <ha-control-circular-slider
              .preventInteractionOnScroll=${this.preventInteractionOnScroll}
              .inactive=${!active}
              .mode=${sliderMode as any}
              .value=${this._targetTemperature.value}
              .min=${this._min}
              .max=${this._max}
              .step=${this._step}
              .current=${this._stateObj.attributes.current_temperature}
              @value-changed=${this._valueChanged}
              @value-changing=${this._valueChanging}
            >
            </ha-control-circular-slider>
          `;



      return html`
      <ha-card>
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
            ${circularSlider}
            <div class="info">${renderLabel()}${primary()}${secondary()}${renderHumidity()}</div>
            ${!this._config.disable_buttons ? buttons(this._supportsTargetRange ? this._selectTarget : "value") : nothing}
          </div>
        </div>
        ${!this._config.disable_menu ? html`<ha-icon-button
          class="more-info"
          .label=${localize("ui.panel.lovelace.cards.show_more_info")}
          .path=${mdiDotsVertical}
          @click=${(e: Event) => {
            e.stopPropagation();
            this._handleMoreInfo();
          }}
          tabindex="0"
        ></ha-icon-button>` : nothing}


        ${actionsSection()}
      </ha-card>

    `;
  }

    // Fallback: entity does not support target temperature (e.g. fan_only/dry
    // mode where the integration drops the `temperature` attribute), or entity
    // is unavailable. Render the full card layout — title, color vars, wrapper,
    // menu, actions — but without the circular slider and +/- buttons, since
    // there is no setpoint to adjust. Show current temperature as primary.
    {
      const active = stateActive(this._stateObj);
      const containerSizeClass = this._sizeController.value
        ? ` ${this._sizeController.value}`
        : "";
      let stateColor = stateColorCss(this._stateObj);
      let actionColor: string | undefined;
      const action = this._stateObj?.attributes.hvac_action;
      if (action && action !== "idle" && action !== "off" && active) {
        actionColor = stateColorCss(this._stateObj, CLIMATE_HVAC_ACTION_TO_MODE[action]);
      }
      if (window) {
        actionColor = "var(--info-color)";
        stateColor = "var(--info-color)";
      }
      if (this._stateObj?.state === "off") {
        stateColor = "var(--rgb-grey)";
        actionColor = "var(--rgb-grey)";
      }
      const name = this._config.name || this._stateObj?.attributes.friendly_name || "";
      const controlMaxWidth = this._resizeController.value
        ? `${Math.min(this._resizeController.value, 320)}px`
        : undefined;

      return html`
      <ha-card>
        <p class="title">${name}</p>
        <div class="container">
          <div
            class="bt-wrapper container${containerSizeClass}"
            style=${styleMap({
              "--state-color": stateColor ?? "var(--primary-text-color)",
              "--action-color": actionColor ?? "",
              maxWidth: controlMaxWidth,
            })}
          >
            <div class="info">${renderLabel()}${primary()}${secondary()}${renderHumidity()}</div>
          </div>
        </div>
        ${!this._config.disable_menu ? html`<ha-icon-button
          class="more-info"
          .label=${localize("ui.panel.lovelace.cards.show_more_info")}
          .path=${mdiDotsVertical}
          @click=${(e: Event) => {
            e.stopPropagation();
            this._handleMoreInfo();
          }}
          tabindex="0"
        ></ha-icon-button>` : nothing}

        ${available ? actionsSection() : nothing}
      </ha-card>`;
    }
  }

  private renderModeButton(mode: string) {
    if (!this._stateObj?.attributes) {
      return nothing;
    }

    if(mode === "presets") {
          const presetMode = this._stateObj?.attributes?.preset_mode;
          const iconStyle = {};
          const selectedMode = (presetMode != null && presetMode !== 'none') ? presetMode : "none";
          const color = getHvacModeColor(selectedMode as HvacMode);
          if (presetMode != null && presetMode !== 'none') {
            iconStyle["--icon-color"] = `rgb(${color})`;
            iconStyle["--bg-color"] = `rgba(${color}, 0.2)`;
          }
          const icon = getHvacModeIcon(selectedMode as HvacMode);
          const presets = (this._stateObj?.attributes?.preset_modes?.filter(p => p != "none") || []) as HvacMode[];


          if (presets.length === 1) {
            return html`
                <mushroom-button
                  style=${styleMap(iconStyle)}
                  .mode=${selectedMode}
                    @click=${this.triggerModeChange.bind(this, presets[0])}
                    @longpress=${(e: Event) => { e.stopPropagation(); this._openPresetSelect(true); }}
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
              @click=${(e: Event) => { e.stopPropagation(); this._openPresetSelect(true); }}
            >
              <ha-icon .icon=${icon}></ha-icon>
            </mushroom-button>
          `;
          } else {
            return nothing;
          }
    }

    const iconStyle = {};
    const color = mode === "off" ? "var(--rgb-grey)" : getHvacModeColor(mode as HvacMode);
    if (mode === this._stateObj.state) {
      iconStyle["--icon-color"] = `rgb(${color})`;
      iconStyle["--bg-color"] = `rgba(${color}, 0.2)`;
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

  private _openPresetSelect(open = true) {
    this._presetOpen = open;
    if (open) {
      window.addEventListener("pointerdown", this._onDocumentPointerDown);
    } else {
      window.removeEventListener("pointerdown", this._onDocumentPointerDown);
    }
  }

  private _onDocumentPointerDown = (ev: PointerEvent) => {
    const path = ev.composedPath();
    const presetEl = this.shadowRoot?.querySelector('.preset-select');
    if (!presetEl) return;
    // If the click is outside the preset-select element, close the menu
    if (!path.includes(presetEl as EventTarget)) {
      this._openPresetSelect(false);
    }
  };

  private triggerModeChange(mode: any) {
    if (Array.isArray(this._stateObj?.attributes?.hvac_modes) && this._stateObj.attributes.hvac_modes.includes(mode)) {
      this.hass.callService("climate", "set_hvac_mode", {
        entity_id: this._stateObj?.entity_id,
        hvac_mode: mode,
      });
      this._openPresetSelect(false);
      return;
    } else if (this._stateObj?.attributes.preset_modes && this._stateObj.attributes.preset_modes.includes(mode)) {
      if (mode === this._stateObj.attributes.preset_mode) mode = "none";
      this.hass.callService("climate", "set_preset_mode", {
        entity_id: this._stateObj?.entity_id,
        preset_mode: mode,
      });
      this._openPresetSelect(false);
      return;
    }
  }

  private _openMoreInfo(ev: Event, entityId: string) {
    ev.stopPropagation();
    ev.preventDefault();
    if (!entityId) return;
    fireEvent(this as any, "hass-more-info" as any, {
      entityId,
    });
  }

  disconnectedCallback() {
    window.removeEventListener("pointerdown", this._onDocumentPointerDown);
    super.disconnectedCallback();
  }

  private _handleAction(_ev: ActionHandlerEvent) { /* placeholder for future actions */ }

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      ShadowStyles,
      stateControlCircularSliderStyle,
    ];
  }
}