import { icon } from './../../ha-frontend/src/common/structs/is-icon';
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
import { CLIMATE_CARD_EDITOR_NAME, CLIMATE_CARD_NAME } from "./const";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import { BetterThermostatUINormalCardConfig } from "./climate-card-config";
import { mdiMinus, mdiPlus, mdiThermometer, mdiThermostat, mdiWindowOpenVariant, mdiDotsVertical, mdiFire, mdiWaterPercent } from "@mdi/js";
import { ShadowStyles } from './style';
import { CLIMATE_HVAC_ACTION_TO_MODE, ClimateEntity, stateColorCss, stateActive, stateControlCircularSliderStyle } from "../shims/ha-frontend-shim";
import setupMushroomLocalize from "mushroom-cards/src/localize";
import setupCustomlocalize from "../localize/localize";
import { getHvacModeColor, getHvacModeIcon } from "./utils";

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
  @state() private _targetTemperature: Partial<Record<"value" | "low" | "high", number>> = {};
  // When the user is actively interacting (dragging) the slider, prevent
  // `willUpdate` from overwriting the in-progress value from the hass state
  // updates. The circular slider fires `value-changing` events while dragging.
  private _isDragging = false;
  @state() private _selectTarget: "value" | "low" | "high" = "low";
  @state() private _presetOpen: boolean = false;
  @property({ type: Boolean }) public window: boolean = false;
  @property({ type: Boolean }) public summer: boolean = false;
  @property({ type: String }) public status: string = "loading";
  @property({ type: String }) public mode: string = "off";
  @property({ type: Number }) public current: number = 0;
  @property({ type: Number }) public current_humidity: number = 0;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./climate-card-editor");
    return document.createElement(CLIMATE_CARD_EDITOR_NAME) as LovelaceCardEditor;
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
      const height = entries[0]?.contentRect.height;
      const smaller = Math.min(width, height);
      //console.log("Size changed:", smaller);
      return smaller < 130
        ? "xs"
        : smaller < 155
          ? "sm"
          : smaller < 200
            ? "md"
            : smaller > 300
              ? "xl"
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

  public getCardSize(): number { return 3; }
  public getGridOptions(): LovelaceGridOptions { return { rows: 3, columns: 6, min_rows: 3 }; }

  public setConfig(config: BetterThermostatUINormalCardConfig): void {
    if (
      !config.entity ||
      !["climate"].includes(config.entity.split(".")[0])
    ) {
      throw new Error(
        "Specify an entity from within the climate domain"
      );
    }
  
    this._config = config;

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
          // Only override local target values from the HA entity when
          // the user is not currently dragging the control. This avoids the
          // UI jumping back to the old value while the user is still
          // interacting with the slider.
          if (!this._isDragging) {
            this._targetTemperature = {
              value: this._stateObj.attributes.temperature,
              low: this._stateObj.attributes.target_temp_low,
              high: this._stateObj.attributes.target_temp_high,
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
    const btn = ev.currentTarget as any;
    const target = btn.target as "value" | "low" | "high";
    const step = btn.step as number;
    const defaultValue = target === "high" ? this._max : this._min;
    let temp = this._targetTemperature[target] ?? defaultValue;
    temp += step;
    temp = Math.min(Math.max(temp, this._min), this._max);
    if (target === "high" && this._targetTemperature.low != null) temp = Math.max(temp, this._targetTemperature.low);
    if (target === "low" && this._targetTemperature.high != null) temp = Math.min(temp, this._targetTemperature.high);
    this._targetTemperature = { ...this._targetTemperature, [target]: temp };
    this._debouncedCallService(target);
  }

  private _handleSelect(ev: Event) { const btn = ev.currentTarget as any; this._selectTarget = btn.target; }

  private _valueChanged(ev: CustomEvent) {
    const value = (ev.detail as any).value;
    if (isNaN(value)) return;
    // User finished dragging — commit value and stop ignoring hass updates.
    this._isDragging = false;
    this._targetTemperature = { ...this._targetTemperature, value };
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

  private get _supportsTargetValue() { return !!this._stateObj?.attributes.temperature; }
  private get _supportsTargetRange() { return this._stateObj?.attributes.target_temp_low != null && this._stateObj?.attributes.target_temp_high != null; }

  protected render() {
    if (!this._config || !this._stateObj) return nothing;
    const stateObj = this._stateObj;
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
    const sliderMode = SLIDER_MODES[(stateObj.state as HvacMode) || "off"] || "full";
    const preventInteractionOnScroll = this._config?.prevent_interaction_on_scroll ?? false;

    const showCurrentAsPrimary = this._config.show_current_as_primary;
    const showSecondary = this._config.show_secondary;

    const currentTemp = stateObj.attributes.current_temperature;

    const window = (stateObj.attributes as any).window_open;


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
      const formatOptions: Intl.NumberFormatOptions = {
        maximumFractionDigits: 1,
      };
      const formatted = this.hass.formatEntityAttributeValue(stateObj, "current_temperature", temperature);
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

      return html`
        ${this.hass.formatEntityAttributeValue(
          stateObj,
          "current_temperature",
          temperature
        )}
      `;
    };

    const renderLabel = () => {
      const window = (stateObj.attributes as any).window_open;
      if (window) {
        return html`<p class="label window-label"><ha-svg-icon .path=${mdiWindowOpenVariant}></ha-svg-icon></p>`;
      }
      if (stateObj.attributes.hvac_action && stateObj.attributes.hvac_action !== "off") {
        return html`<p class="label hvac_action">${this.hass.formatEntityAttributeValue(stateObj, "hvac_action")}</p>`;
      }
      return html`<p class="label hvac_action">${this.hass.formatEntityState(stateObj)}</p>`;
    };

    const primary = () => {
      if (currentTemp != null && showCurrentAsPrimary) return renderCurrent(currentTemp, true);
      if (this._supportsTargetValue && !showCurrentAsPrimary) return renderTarget(this._targetTemperature.value!, true);
      if (this._supportsTargetRange && !showCurrentAsPrimary) {
        return html`<div class="dual"> <button @click=${this._handleSelect} .target=${"low"} class="target-button ${classMap({ selected: this._selectTarget === "low" })}">${renderTarget(this._targetTemperature.low!, true)}</button><button @click=${this._handleSelect} .target=${"high"} class="target-button ${classMap({ selected: this._selectTarget === "high" })}">${renderTarget(this._targetTemperature.high!, true)}</button></div>`;
      }
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
      const humidity = stateObj.attributes.current_humidity;
      if (humidity == null || this._config?.disable_humidity) return nothing;

      return html`
        <p class="label secondary humidity">
          <ha-svg-icon .path=${mdiWaterPercent}></ha-svg-icon>
          ${this.hass.formatEntityAttributeValue(stateObj, "current_humidity")}&nbsp;
        </p>
      `;
    };

    const buttons = (target: "value" | "low" | "high") => html`<div class="bt-buttons"><ha-outlined-icon-button .target=${target as any} .step=${-this._step} @click=${this._handleButton}><ha-svg-icon .path=${mdiMinus}></ha-svg-icon></ha-outlined-icon-button><ha-outlined-icon-button .target=${target as any} .step=${this._step} @click=${this._handleButton}><ha-svg-icon .path=${mdiPlus}></ha-svg-icon></ha-outlined-icon-button></div>`;

    if (this._supportsTargetValue && available) {
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
      if (window) {
        actionColor = "var(--info-color)";
        stateColor = "var(--info-color)";
      } else if ((this._stateObj.attributes as any).preset_mode !== 'none') {
        const pre_color = getHvacModeColor((this._stateObj.attributes as any).preset_mode);
        stateColor = `rgb(${pre_color})`;
        actionColor = `rgb(${pre_color})`;
      };

      if (mode === "off") {
        stateColor = "var(--rgb-grey)";
        actionColor = "var(--rgb-grey)";
      }


      const lowColor = stateColorCss(this._stateObj, active ? "heat" : "off");
      const highColor = stateColorCss(this._stateObj, active ? "cool" : "off");
      const controlMaxWidth = this._resizeController.value
      ? `${this._resizeController.value}px`
      : undefined;
      const name = this._config.name || this._stateObj.attributes.friendly_name || "";

      const iconStyle = {};
      iconStyle["--icon-color"] = `var(--rgb-grey)`;
      iconStyle["--bg-color"] = `rgba(var(--rgb-grey), 0.2)`;

      const buttonModes = ["heat", {
        ...this._stateObj.attributes.preset_modes
      }, "off"]

      return html`
      <ha-card>
        <p class="title">${name}</p>
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
            <div class="info">${renderLabel()}${primary()}${secondary()}${renderHumidity()}</div>
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


        <div class="actions">
          ${!this._config.disable_buttons ? buttons("value") : nothing}


            <div class=${classMap({ 'preset-select': true, open: this._presetOpen })}>
          ${this._stateObj.attributes.preset_modes.map((mode: any) => html`
              <mushroom-button
                style=${styleMap(iconStyle)}
                .mode=${mode}
                .disabled=${!isAvailable(this._stateObj)}
                  @click=${this.triggerModeChange.bind(this, mode)}
                  @longpress=${(e: Event) => { e.stopPropagation(); this._openPresetSelect(true); }}
              >
                <ha-icon .icon=${getHvacModeIcon(mode)}></ha-icon>
              </mushroom-button>
          `)}
        </div>

        <mushroom-button-group .fill=${true} ?rtl=${false}>
          ${(buttonModes).map((mode) => this.renderModeButton(mode))}
        </mushroom-button-group>

          
        </div>
      </ha-card>

    `;
  }

    return html`<div class="container" style=${styleMap({})}>
      <div class="info">${renderLabel()}${primary()}${secondary()}${renderHumidity()}</div>
    </div>`;
  }

  private renderModeButton(mode: HvacMode) {

    if(typeof mode !== "string") {
          mode = this._stateObj.attributes.preset_mode;
          const iconStyle = {};
          const color = getHvacModeColor(mode);
          const selectedMode = (this._stateObj.attributes.preset_mode !== 'none') ? this._stateObj.attributes.preset_mode : mode;
          if (selectedMode === this._stateObj.attributes.preset_mode) {
            iconStyle["--icon-color"] = `rgb(${color})`;
            iconStyle["--bg-color"] = `rgba(${color}, 0.2)`;
          }
          const icon = getHvacModeIcon(this._stateObj.attributes.preset_mode);

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
    }

    const iconStyle = {};
    const color = mode === "off" ? "var(--rgb-grey)" : getHvacModeColor(mode);
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
        @longpress=${(e: Event) => { e.stopPropagation(); this._openPresetSelect(true); }}
      >
        <ha-icon .icon=${getHvacModeIcon(mode)}></ha-icon>
      </mushroom-button>
    `;
  }

  private _openPresetSelect(open = true) {
    console.log("Opening preset select:", open);
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
    // check if mode is in HvacMode
    console.log(this._stateObj);
    if (this._stateObj.attributes.hvac_modes.includes(mode)) {
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