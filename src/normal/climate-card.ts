import { CSSResultGroup, html, nothing, PropertyValues } from "lit";
import { ResizeController } from "@lit-labs/observers/resize-controller";

import {
  actionHandler,
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
import { mdiMinus, mdiPlus, mdiThermometer, mdiThermostat, mdiWindowOpenVariant, mdiDotsVertical, mdiFire } from "@mdi/js";
import { ShadowStyles } from './style';
import {
  createStateControlCircularSliderController,
  stateControlCircularSliderStyle,
} from "../../ha-frontend/src/state-control/state-control-circular-slider-style";

import { stateColorCss } from "../../ha-frontend/src/common/entity/state_color";
import { stateActive } from "../../ha-frontend/src/common/entity/state_active";
import { CLIMATE_HVAC_ACTION_TO_MODE } from "../../ha-frontend/src/data/climate";
import { ClimateEntity } from "../../ha-frontend/src/data/climate";
import { ResizeController } from "@lit-labs/observers/resize-controller";
import type { ReactiveControllerHost } from "lit";

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
  @state() private _selectTarget: "value" | "low" | "high" = "low";
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

  private createStateControlCircularSliderController = (
  element: ReactiveControllerHost & Element
) =>
  new ResizeController(element, {
    callback: (entries) => {
      const width = entries[0]?.contentRect.width;
      const height = entries[0]?.contentRect.height;
      const smaller = Math.min(width, height);
      console.log("smaller", smaller);
      return smaller < 185
        ? "xs"
        : smaller < 250
          ? "sm"
          : smaller < 320
            ? "md"
            : smaller > 400
              ? "xl"
              : "lg";
    },
  });

  private _sizeController = this.createStateControlCircularSliderController(this);

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
    fireEvent(this, "hass-more-info", {
      entityId: this._config!.entity,
    });
  }

  protected willUpdate(changed: PropertyValues) {
    if (changed.has("hass") || changed.has("_config")) {
      if (this._config?.entity) {
        this._stateObj = this.hass.states[this._config.entity] as ClimateEntity;
        if (this._stateObj) {
          this._targetTemperature = {
            value: this._stateObj.attributes.temperature,
            low: this._stateObj.attributes.target_temp_low,
            high: this._stateObj.attributes.target_temp_high,
          };
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
    this._targetTemperature = { ...this._targetTemperature, value };
    this._callService("value");
  }
  private _valueChanging(ev: CustomEvent) {
    const value = (ev.detail as any).value;
    if (isNaN(value)) return;
    this._targetTemperature = { ...this._targetTemperature, value };
  }

  private get _supportsTargetValue() { return !!this._stateObj?.attributes.temperature; }
  private get _supportsTargetRange() { return this._stateObj?.attributes.target_temp_low != null && this._stateObj?.attributes.target_temp_high != null; }

  protected render() {
    if (!this._config || !this._stateObj) return nothing;
    const stateObj = this._stateObj;
    const active = isActive(stateObj);
    const available = isAvailable(stateObj);
    const sliderMode = SLIDER_MODES[(stateObj.state as HvacMode) || "off"] || "full";
    const preventInteractionOnScroll = this._config?.prevent_interaction_on_scroll ?? false;

    const showCurrentAsPrimary = this._config.show_current_as_primary;
    const showSecondary = this._config.show_secondary;

    const currentTemp = stateObj.attributes.current_temperature;

    const window = stateObj.attributes.window_open;

    console.log("window", stateObj.attributes);

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
            .hass=${this.hass}
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
            .hass=${this.hass}
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
      const window = stateObj.attributes.window_open;
      if (window) {
        return html`<p class="label window-label"><ha-svg-icon .path=${mdiWindowOpenVariant}></ha-svg-icon></p>`;
      }
      return html`<p class="label">${this.hass.formatEntityState(stateObj)}</p>`;
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

    const buttons = (target: "value" | "low" | "high") => html`<div class="bt-buttons"><ha-outlined-icon-button .target=${target} .step=${-this._step} @click=${this._handleButton}><ha-svg-icon .path=${mdiMinus}></ha-svg-icon></ha-outlined-icon-button><ha-outlined-icon-button .target=${target} .step=${this._step} @click=${this._handleButton}><ha-svg-icon .path=${mdiPlus}></ha-svg-icon></ha-outlined-icon-button></div>`;

    if (this._supportsTargetValue && available) {
      const mode = this._stateObj.state;
      const action = this._stateObj.attributes.hvac_action;
      const active = stateActive(this._stateObj);

      const containerSizeClass = this._sizeController.value
        ? ` ${this._sizeController.value}`
        : "";
        console.log("class",containerSizeClass)
      let actionColor: string | undefined;
      if (action && action !== "idle" && action !== "off" && active) {
        actionColor = stateColorCss(
          this._stateObj,
          CLIMATE_HVAC_ACTION_TO_MODE[action]
        );
      }

      let stateColor = stateColorCss(this._stateObj);
      if(window) {
        actionColor = "var(--info-color)";
        stateColor = "var(--info-color)";
      }
      const lowColor = stateColorCss(this._stateObj, active ? "heat" : "off");
      const highColor = stateColorCss(this._stateObj, active ? "cool" : "off");
      const controlMaxWidth = this._resizeController.value
      ? `${this._resizeController.value}px`
      : undefined;
      return html`
      <ha-card>
        <p class="title">${this._stateObj.attributes.friendly_name}</p>
        <div
          class="bt-wrapper container${containerSizeClass}"
          style=${styleMap({
            "--low-color": lowColor,
            "--high-color": highColor,
            "--state-color": stateColor,
            "--action-color": actionColor,
            maxWidth: controlMaxWidth,
          })}
        >
            <ha-control-circular-slider
              .preventInteractionOnScroll=${this.preventInteractionOnScroll}
              .inactive=${!active}
              .mode=${sliderMode}
              .value=${this._targetTemperature.value}
              .min=${this._min}
              .max=${this._max}
              .step=${this._step}
              .current=${this._stateObj.attributes.current_temperature}
              @value-changed=${this._valueChanged}
              @value-changing=${this._valueChanging}
            >
            </ha-control-circular-slider>
            <div class="info">${renderLabel()}${primary()}${secondary()}</div>
          </div>
        ${!this._config.disable_menu ? html`<ha-icon-button
          class="more-info"
          .label=${this.hass!.localize(
            "ui.panel.lovelace.cards.show_more_info"
          )}
          .path=${mdiDotsVertical}
          @click=${this._handleMoreInfo}
          tabindex="0"
        ></ha-icon-button>` : nothing}


        <div class="actions">
          ${!this._config.disable_buttons ? buttons("value") : nothing}
          <mushroom-climate-hvac-modes-control
           style=${styleMap({
            "--icon-color": actionColor,
           })}
            .hass=${this.hass}
            .entity=${this._stateObj}
            .modes=${this._stateObj.attributes.hvac_modes || []}
            .fill=${true}
            .disableEco=${this._config.disable_eco}
          ></mushroom-climate-hvac-modes-control>
        </div>
      </ha-card>

    `;
  }

    return html`<div class="container" style=${styleMap({})}>
      <div class="info">${renderLabel()}${primary()}${secondary()}</div>
    </div>`;
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