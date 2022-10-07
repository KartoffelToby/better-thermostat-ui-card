/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    LitElement,
    html,
    TemplateResult,
    css,
    PropertyValues,
    CSSResultGroup,
    svg
} from 'lit';
import {
    customElement,
    property,
    query,
    state
} from "lit/decorators";
import {
    classMap
} from "lit/directives/class-map";
import {
    HomeAssistant,
    hasConfigOrEntityChanged,
    LovelaceCardEditor,
    fireEvent,
    applyThemesOnElement,
    UNIT_F,
    FrontendLocaleData,
    NumberFormat
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers

import {
    mdiAutorenew,
    mdiCalendarSync,
    mdiDotsVertical,
    mdiFan,
    mdiFire,
    mdiPower,
    mdiSnowflake,
    mdiWaterPercent,
    mdiWindowOpenVariant,
    mdiSunThermometer,
    mdiLeaf
} from "@mdi/js";
import {
    HassEntity
} from "home-assistant-js-websocket";

import './editor';

import type {
    BetterThermostatUiCardConfig
} from './types';
import {
    CARD_VERSION
} from './const';
import {
    localize
} from './localize/localize';

import './round-slider';

const UNAVAILABLE = "unavailable";
const UNKNOWN = "unknown";
const modeIcons: {
    [mode in any]: string
} = {
    auto: mdiCalendarSync,
    heat_cool: mdiAutorenew,
    heat: mdiFire,
    cool: mdiSnowflake,
    off: mdiPower,
    fan_only: mdiFan,
    dry: mdiWaterPercent,
    window_open: mdiWindowOpenVariant,
    eco: mdiLeaf, 
    summer: mdiSunThermometer
};

/* eslint no-console: 0 */
console.info(
    `%c  BetterThermostatUI-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'better-thermostat-ui-card',
    name: 'Better Thermostat UI Card',
    preview: true,
    description: 'A template custom card for you to create something awesome',
});

// TODO Name your custom element
@customElement('better-thermostat-ui-card')
export class BetterThermostatUiCard extends LitElement {
    public static async getConfigElement(): Promise < LovelaceCardEditor > {
        return document.createElement('better-thermostat-ui-card-editor');
    }

    public static getStubConfig(
        hass: HomeAssistant,
    ): Record<string, unknown> {
        const foundEntities = Object.keys(hass.states).filter(eid => {
            return eid.split('.')[0] === 'climate';
        });

        return {};
    }

    @property({
        attribute: false
    }) public hass ? : HomeAssistant;


    @state() private _config ? : BetterThermostatUiCardConfig;
    @state() private _setTemp ? : number | number[];

    @query("ha-card") private _card ? : any;

    public getCardSize(): number {
        return 7;
    }
    public setConfig(config: BetterThermostatUiCardConfig): void {
        if (!config.entity || config.entity.split(".")[0] !== "climate") {
            throw new Error("Specify an entity from within the climate domain");
        }

        this._config = config;
    }

    protected render(): TemplateResult {
        if (!this.hass || !this._config) {
            return html ``;
        }
        const stateObj = this.hass.states[this._config.entity] as any;

        if (!stateObj) {
            return html `
            <hui-warning>
              Not found: ${this._config.entity}
            </hui-warning>
          `;
        }

        const mode = stateObj.state in modeIcons ? stateObj.state : "unknown-mode";
        const name =
            this._config!.name ||
            this.computeStateName(this.hass!.states[this._config!.entity]);
        const targetTemp =
            stateObj.attributes.temperature !== null &&
            Number.isFinite(Number(stateObj.attributes.temperature)) ?
            stateObj.attributes.temperature :
            stateObj.attributes.min_temp;

        const slider =
            stateObj.state === UNAVAILABLE ?
            html ` <bt-round-slider disabled="true"></bt-round-slider> ` :
            html `
                <bt-round-slider id="round_slider"
                  .value=${targetTemp}
                  .current=${stateObj.attributes.current_temperature}
                  .high=${stateObj.attributes.target_temp_high}
                  .min=${stateObj.attributes.min_temp}
                  .max=${stateObj.attributes.max_temp}
                  .step=${this._stepSize}
                  handleSize="13"
                  @value-changing=${this._dragEvent}
                  @value-changed=${this._setTemperature}
                ></bt-round-slider>
              `;

        const setValues = svg `
            <!--<div class="indicator"></div>-->
            <svg viewBox="0 0 40 20">
              <text
                x="50%"
                dx="1"
                y="60%"
                text-anchor="middle"
                style="font-size: 8px;"
              >
              ${
                stateObj.state === UNAVAILABLE
                  ? this.hass.localize("state.default.unavailable")
                  : this._setTemp === undefined || this._setTemp === null
                  ? ""
                  : Array.isArray(this._setTemp)
                  ? this._stepSize === 1
                    ? svg`
                        ${this.formatNumber(this._setTemp[0], this.hass.locale, {
                          maximumFractionDigits: 0,
                        })} -
                        ${this.formatNumber(this._setTemp[1], this.hass.locale, {
                          maximumFractionDigits: 0,
                        })}
                        `
                    : svg`
                        ${this.formatNumber(this._setTemp[0], this.hass.locale, {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })} -
                        ${this.formatNumber(this._setTemp[1], this.hass.locale, {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })}
                        `
                  : this._stepSize === 1
                  ? svg`
                        ${this.formatNumber(this._setTemp, this.hass.locale, {
                          maximumFractionDigits: 0,
                        })}
                        `
                  : svg`
                        ${this.formatNumber(this._setTemp, this.hass.locale, {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })}
                      `
              }
              <tspan dx="-1" dy="-3.5" style="font-size: 3px;">
              ${this.hass.config.unit_system.temperature}
            </tspan>
              </text>
            </svg>
          `;

        const currentTemperature = svg `
          <svg id="set-values">
            <g>
              <text text-anchor="middle" dy="-22">${localize(`common.current`)}</text>
              <text text-anchor="middle" class="set-value">
              ${
                stateObj.attributes.current_temperature !== null &&
                !isNaN(stateObj.attributes.current_temperature)
                  ? svg`${this.formatNumber(
                      stateObj.attributes.current_temperature,
                      this.hass.locale
                    )}
              <tspan dx="-1" dy="-4.5" style="font-size: 10px;">
                ${this.hass.config.unit_system.temperature}
              </tspan>`
                  : ""
              }
              </text>
              <!--<text
                dy="22"
                text-anchor="middle"
                id="set-mode"
              >
                ${
                  stateObj.attributes.hvac_action
                    ? this.hass!.localize(
                        `state_attributes.climate.hvac_action.${stateObj.attributes.hvac_action}`
                      )
                    : this.hass!.localize(
                        `component.climate.state._.${stateObj.state}`
                      )
                }
              </text>-->
            </g>
          </svg>
        `;

        setTimeout(() => this._rescale_svg(), 100);

        return html `
          <ha-card
            class=${classMap({
              [mode]: true,
            })}
          >
            <ha-icon-button
              class="more-info"
              .label=${this.hass!.localize(
                "ui.panel.lovelace.cards.show_more_info"
              )}
              .path=${mdiDotsVertical}
              @click=${this._handleMoreInfo}
              tabindex="0"
            ></ha-icon-button>
            <div class="content">
              <div id="controls">
                <div id="slider" class="${stateObj.attributes.window_open ? 'window': ''}">
                  <div id="title">${name}</div><div id="bt_status">
                  ${
                    stateObj.attributes.window_open &&
                    stateObj.attributes.window_open !== "none" &&
                    stateObj.state !== UNAVAILABLE
                      ? this._renderStatusIcon("window_open"): this._renderOffStatusIcon("window_open")}
                  ${
                    stateObj.attributes.saved_temperature &&
                    stateObj.attributes.saved_temperature !== "none" &&
                    stateObj.state !== UNAVAILABLE
                      ? this._renderStatusIcon("eco"): this._renderOffStatusIcon("eco")}
                  ${
                    !stateObj.attributes.call_for_heat &&
                    stateObj.attributes.call_for_heat !== "none" &&
                    stateObj.state !== UNAVAILABLE
                      ? this._renderStatusIcon("summer"): this._renderOffStatusIcon("summer")}
                  </div>
                  ${slider}
                  <div id="slider-center">
                    <div id="temperature">${setValues}</div>
                  </div>
                </div>
              </div>
              <div id="info" .title=${name}>
                <div id="modes">
                  ${(stateObj.attributes.hvac_modes || [])
                    .concat()
                    .sort(this.compareClimateHvacModes)
                    .map((modeItem) => this._renderIcon(modeItem, mode))}
                </div>
              </div>
              <div id="current-infos">
                ${currentTemperature}
              </div>
            </div>
          </ha-card>
        `;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if(changedProps) return true;
        return true //this.hasConfigOrEntityChanged(this, changedProps);
    }

    protected updated(changedProps: PropertyValues): void {
        super.updated(changedProps);

        if (
            !this._config ||
            !this.hass ||
            (!changedProps.has("hass") && !changedProps.has("_config"))
        ) {
            return;
        }

        const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
        const oldConfig = changedProps.get("_config") as |
            BetterThermostatUiCardConfig |
            undefined;

        if (
            !oldHass ||
            !oldConfig ||
            oldHass.themes !== this.hass.themes ||
            oldConfig.theme !== this._config.theme
        ) {
            applyThemesOnElement(this, this.hass.themes, this._config.theme);
        }

        const stateObj = this.hass.states[this._config.entity];
        if (!stateObj) {
            return;
        }

        if (!oldHass || oldHass.states[this._config.entity] !== stateObj) {
            this._rescale_svg();
        }
    }

    public willUpdate(changedProps: PropertyValues) {
        if (!this.hass || !this._config || !changedProps.has("hass")) {
            return;
        }

        const stateObj = this.hass.states[this._config.entity];
        if (!stateObj) {
            return;
        }

        const oldHass = changedProps.get("hass") as HomeAssistant | undefined;

        if (!oldHass || oldHass.states[this._config.entity] !== stateObj) {
            this._setTemp = this._getSetTemp(stateObj);
        }
    }

    private _rescale_svg() {
        // Set the viewbox of the SVG containing the set temperature to perfectly
        // fit the text
        // That way it will auto-scale correctly
        // This is not done to the SVG containing the current temperature, because
        // it should not be centered on the text, but only on the value
        const card = this._card;
        if (card) {
            card.updateComplete.then(() => {
                const svgRoot = this.shadowRoot!.querySelector("#set-values") !;
                const box = svgRoot.querySelector("g") !.getBBox() !;
                svgRoot.setAttribute(
                    "viewBox",
                    `${box.x} ${box!.y} ${box.width} ${box.height}`
                );
                svgRoot.setAttribute("width", `${box.width}`);
                svgRoot.setAttribute("height", `${box.height}`);
            });
        }
    }

    private get _stepSize(): number {
        const stateObj = this.hass!.states[this._config!.entity] as any;

        if (stateObj.attributes.target_temp_step) {
            return stateObj.attributes.target_temp_step;
        }
        return this.hass!.config.unit_system.temperature === UNIT_F ? 1 : 0.5;
    }

    private _getSetTemp(
        stateObj: HassEntity
    ): undefined | number | [number, number] {
        if (stateObj.state === UNAVAILABLE) {
            return undefined;
        }

        if (
            stateObj.attributes.target_temp_low &&
            stateObj.attributes.target_temp_high
        ) {
            return [
                stateObj.attributes.target_temp_low,
                stateObj.attributes.target_temp_high,
            ];
        }

        return stateObj.attributes.temperature;
    }

    private _dragEvent(e): void {
        const stateObj = this.hass!.states[this._config!.entity] as any;

        if (e.detail.low) {
            this._setTemp = [e.detail.low, stateObj.attributes.target_temp_high];
        } else if (e.detail.high) {
            this._setTemp = [stateObj.attributes.target_temp_low, e.detail.high];
        } else {
            this._setTemp = e.detail.value;
        }
    }

    private _setTemperature(e): void {
        const stateObj = this.hass!.states[this._config!.entity] as any;

        if (e.detail.low) {
            this.hass!.callService("climate", "set_temperature", {
                entity_id: this._config!.entity,
                target_temp_low: e.detail.low,
                target_temp_high: stateObj.attributes.target_temp_high,
            });
        } else if (e.detail.high) {
            this.hass!.callService("climate", "set_temperature", {
                entity_id: this._config!.entity,
                target_temp_low: stateObj.attributes.target_temp_low,
                target_temp_high: e.detail.high,
            });
        } else {
            this.hass!.callService("climate", "set_temperature", {
                entity_id: this._config!.entity,
                temperature: e.detail.value,
            });
        }
    }

    private _getExtraStatus() {
        const stateObj = this.hass!.states[this._config!.entity] as any;
        const activeExtraModes = {
            window_open: stateObj.attributes.window_open,
            night_mode: stateObj.attributes.night_mode,
            summer: stateObj.attributes.summer
        }
        const asArray = Object.entries(activeExtraModes);
        const filtered = asArray.filter(([, value]) => value === true);
        return Object.keys(Object.fromEntries(filtered));
    }

    private _renderStatusIcon(type:string): TemplateResult {
        if (!modeIcons[type]) {
            return html ``;
        }
        return html `
          <ha-svg-icon
            class="status-icon ${type}"
            tabindex="0"
            .path=${modeIcons[type]}
            .title=${localize(`extra_states.${type}`)}
          >
          </ha-svg-icon>
        `;
    }

    private _renderOffStatusIcon(type:string): TemplateResult {
      if (!modeIcons[type]) {
          return html ``;
      }
      return html `
        <ha-svg-icon
          class="status-icon-off ${type}"
          tabindex="0"
          .path=${modeIcons[type]}
          .title=${localize(`extra_states.${type}`)}
        >
        </ha-svg-icon>
      `;
  }

    private _renderIcon(mode: string, currentMode: string): TemplateResult {
        if (!modeIcons[mode]) {
            return html ``;
        }
        return html `
          <ha-icon-button
            class=${classMap({ "selected-icon": currentMode === mode })}
            .mode=${mode}
            @click=${this._handleAction}
            tabindex="0"
            .path=${modeIcons[mode]}
            .label=${this.hass!.localize(`component.climate.state._.${mode}`)}
          >
          </ha-icon-button>
        `;
    }

    private _handleMoreInfo() {
        fireEvent(this, "hass-more-info", {
            entityId: this._config!.entity,
        });
    }

    private _handleAction(e: MouseEvent): void {
        this.hass!.callService("climate", "set_hvac_mode", {
            entity_id: this._config!.entity,
            hvac_mode: (e.currentTarget as any).mode,
        });
    }

    private hasConfigChanged(element: any, changedProps: PropertyValues): boolean {
        if (changedProps.has("_config")) {
          return true;
        }
      
        const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
        if (!oldHass) {
          return true;
        }
      
        if (
          oldHass.connected !== element.hass!.connected ||
          oldHass.themes !== element.hass!.themes ||
          oldHass.locale !== element.hass!.locale ||
          oldHass.localize !== element.hass.localize ||
          oldHass.config.state !== element.hass.config.state
        ) {
          return true;
        }
        return false;
      }

      private hasConfigOrEntityChanged(
        element: any,
        changedProps: PropertyValues
      ): boolean {
        if (this.hasConfigChanged(element, changedProps)) {
          return true;
        }
      
        const oldHass = changedProps.get("hass") as HomeAssistant;
      
        return (
          oldHass.states[element._config!.entity] !==
          element.hass!.states[element._config!.entity]
        );
      }

    private compareClimateHvacModes(mode1: any, mode2: any) {
        const hvacModeOrdering: { [key in any]: number } = {
            auto: 1,
            heat_cool: 2,
            heat: 3,
            cool: 4,
            dry: 5,
            fan_only: 6,
            off: 7,
        };
        return  hvacModeOrdering[mode1] - hvacModeOrdering[mode2];
    }

    private computeObjectId(entityId: string): string {
        return entityId.substr(entityId.indexOf(".") + 1);
    }


    private computeStateName(stateObj: HassEntity): string {
        return stateObj.attributes.friendly_name === undefined ?
            this.computeObjectId(stateObj.entity_id).replace(/_/g, " ") :
            stateObj.attributes.friendly_name || "";
    }

    private numberFormatToLocale(
        localeOptions: FrontendLocaleData
    ): string | string[] | undefined {
        switch (localeOptions.number_format) {
            case NumberFormat.comma_decimal:
                return ["en-US", "en"]; // Use United States with fallback to English formatting 1,234,567.89
            case NumberFormat.decimal_comma:
                return ["de", "es", "it"]; // Use German with fallback to Spanish then Italian formatting 1.234.567,89
            case NumberFormat.space_comma:
                return ["fr", "sv", "cs"]; // Use French with fallback to Swedish and Czech formatting 1 234 567,89
            case NumberFormat.system:
                return undefined;
            default:
                return localeOptions.language;
        }
    };
    private getDefaultFormatOptions(
        num: string | number,
        options?: Intl.NumberFormatOptions
    ): Intl.NumberFormatOptions {
        const defaultOptions: Intl.NumberFormatOptions = {
            maximumFractionDigits: 2,
            ...options,
        };

        if (typeof num !== "string") {
            return defaultOptions;
        }

        // Keep decimal trailing zeros if they are present in a string numeric value
        if (
            !options ||
            (!options.minimumFractionDigits && !options.maximumFractionDigits)
        ) {
            const digits = num.indexOf(".") > -1 ? num.split(".")[1].length : 0;
            defaultOptions.minimumFractionDigits = digits;
            defaultOptions.maximumFractionDigits = digits;
        }

        return defaultOptions;
    };

    private round(value: number, precision = 2): number {
        return Math.round(value * 10 ** precision) / 10 ** precision;
    }

    private formatNumber(
        num: string | number,
        localeOptions?: any,
        options?: Intl.NumberFormatOptions
    ): string {
        const locale = localeOptions ?
            this.numberFormatToLocale(localeOptions) :
            undefined;

        // Polyfill for Number.isNaN, which is more reliable than the global isNaN()
        Number.isNaN =
            Number.isNaN ||
            function isNaN(input) {
                return typeof input === "number" && isNaN(input);
            };

        if (
            localeOptions?.number_format !== NumberFormat.none &&
            !Number.isNaN(Number(num)) &&
            Intl
        ) {
            try {
                return new Intl.NumberFormat(
                    locale,
                    this.getDefaultFormatOptions(num, options)
                ).format(Number(num));
            } catch (err) {
                // Don't fail when using "TEST" language
                // eslint-disable-next-line no-console
                console.error(err);
                return new Intl.NumberFormat(
                    undefined,
                    this.getDefaultFormatOptions(num, options)
                ).format(Number(num));
            }
        }
        if (typeof num === "string") {
            return num;
        }
        return `${this.round(num, options?.maximumFractionDigits).toString()}${
          options?.style === "currency" ? ` ${options.currency}` : ""
        }`;
    };


    static get styles(): CSSResultGroup {
        return css `
          :host {
            display: block;
          }
          ha-card {
            height: 100%;
            position: relative;
            overflow: hidden;
            --name-font-size: 1.2rem;
            --brightness-font-size: 1.2rem;
            --rail-border-color: transparent;
          }
          .indicator {
            position: absolute;
            width: 50%;
            height: 50%;
            background-color: var(--label-badge-red);
            border-radius: 50%;
            content: " ";
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: -1;
            filter: blur(45px);
            opacity: 0.8;
          }
          #bt_status {
            padding: 0 0 0.8em 0;
            display: flex;
            flex-flow: row;
            justify-content: center;
            gap: 1.2em;
            min-height: 30px;
          }
          ha-svg-icon.status-icon.window_open {
            color: #1d9187 !important;
          }
          ha-svg-icon.status-icon.eco {
            color: #6cff71 !important;
          }
          ha-svg-icon.status-icon.summer {
            color: #ff6046 !important;
          }
          ha-svg-icon.status-icon-off {
            color: #7a7a7a6e !important;
          }
          .auto,
          .heat_cool {
            --mode-color: var(--state-climate-auto-color);
          }
          .cool {
            --mode-color: var(--state-climate-cool-color);
          }
          .heat {
            --mode-color: var(--label-badge-red);
          }
          .manual {
            --mode-color: var(--state-climate-manual-color);
          }
          .off {
            --mode-color: var(--state-climate-off-color);
          }
          .fan_only {
            --mode-color: var(--state-climate-fan_only-color);
          }
          .eco {
            --mode-color: var(--state-climate-eco-color);
          }
          .dry {
            --mode-color: var(--state-climate-dry-color);
          }
          .idle {
            --mode-color: var(--state-climate-idle-color);
          }
          .unknown-mode {
            --mode-color: var(--state-unknown-color);
          }
          .more-info {
            position: absolute;
            cursor: pointer;
            top: 0;
            right: 0;
            border-radius: 100%;
            color: var(--secondary-text-color);
            z-index: 1;
          }
          .content {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          #controls {
            display: flex;
            justify-content: center;
            padding: 16px;
            position: relative;
          }
          #slider {
            height: 100%;
            width: 100%;
            position: relative;
            max-width: 250px;
            min-width: 100px;
          }
          #title {
            text-align: center;
            font-weight: 600;
            font-size: 1em;
            padding-bottom: 1em;
            margin-top: -0.5em;
          }
          bt-round-slider {
            --round-slider-path-color: var(--slider-track-color);
            --round-slider-bar-color: var(--mode-color);
            position: relative;
          }
          .window bt-round-slider {
            --round-slider-bar-color: #00bcd461 !important;
          }

          #slider-center {
            position: absolute;
            box-sizing: border-box;
            border-radius: 100%;
            left: 50%;
            top: 50%;
            text-align: center;
            overflow-wrap: break-word;
            pointer-events: none;
            height: 100%;
            width: 100%;
            transform: translate(-50%, -35%);
          }
          #temperature {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 100%;
            top: 50%;
            left: 50%;
          }
          #current-infos {
            display: flex;
            flex-flow: row;
            justify-content: center;
            gap: 1.2em;
            padding-bottom: 1em;
            font-size: 16px;
          }
          #set-values {
          }
          #set-mode {
            fill: var(--secondary-text-color);
            font-size: 16px;
          }
          #info {
            display: flex-vertical;
            justify-content: center;
            text-align: center;
            margin-top: -45px;
            font-size: var(--name-font-size);
          }
          #modes > * {
            color: var(--disabled-text-color);
            cursor: pointer;
            display: inline-block;
          }
          #modes .selected-icon {
            color: var(--mode-color);
          }
          text {
            fill: var(--primary-text-color);
          }
        `;
    }
}
