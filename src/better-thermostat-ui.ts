import {
  TemplateResult,
  LitElement,
  html,
  css,
  CSSResult,
  PropertyValueMap,
  svg,
  CSSResultGroup,
  PropertyValues
} from 'lit';
import {
  customElement,
  property,
  query,
  state
} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import {
  mdiWindowOpenVariant,
  mdiSunThermometer,
  mdiPlus,
  mdiMinus,
  mdiDotsVertical,
  mdiCalendarSync,
  mdiAutorenew,
  mdiFire,
  mdiSnowflake,
  mdiPower,
  mdiFan,
  mdiWaterPercent,
  mdiLeaf,
  mdiThermometer,
  mdiHeatWave
} from "@mdi/js";

import {
  HassEntity
} from "home-assistant-js-websocket";
import {
  CARD_VERSION
} from './const';
import {
  localize
} from './localize/localize';
import {
  actionHandler,
  ActionHandlerEvent,
  ClimateEntity,
  computeRTL,
  computeStateDisplay,
  fireEvent,
  formatNumber,
  handleAction,
  hasAction,
  HomeAssistant,
  HvacMode,
  isActive,
  isAvailable,
  LovelaceCard,
  LovelaceCardEditor,
} from "./ha";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Draggable } from 'gsap/Draggable';
import { ClimateCardConfig } from './climate-card-config';
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(Draggable);
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
  summer: mdiSunThermometer,
  temperature:  mdiThermometer,
  humidity: mdiWaterPercent
};

interface RegisterCardParams {
  type: string;
  name: string;
  description: string;
}
export function registerCustomCard(params: RegisterCardParams) {
  const windowWithCards = window as unknown as Window & {
      customCards: unknown[];
  };
  windowWithCards.customCards = windowWithCards.customCards || [];
  windowWithCards.customCards.push({
      ...params,
      preview: true,
  });
}

/* eslint no-console: 0 */
console.info(
  `%c  BetterThermostatUI-CARD \n%c  version: ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

registerCustomCard({
  type: "better-thermostat-ui-card",
  name: "Better Thermostat Climate Card",
  description: "Card for climate entity",
});

@customElement('better-thermostat-ui-card')
export class BetterThermostatUi extends LitElement implements LovelaceCard {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./better-thermostat-ui-card-editor");
    return document.createElement("better-thermostat-ui-card-editor") as LovelaceCardEditor;
  }

  public static async getStubConfig(hass: HomeAssistant): Promise<any> {
      const entities = Object.keys(hass.states);
      const climates = entities.filter((e) => ["climate"].includes(e.split(".")[0]));
      const bt_climate:any = climates.filter((e) => hass.states[e].attributes?.call_for_heat);
      return {
          type: "custom:better-thermostat-ui-card",
          entity: bt_climate[0] || climates[0]
      };
  }

  @property({
      attribute: false
  }) public hass! : HomeAssistant;
  @property({ type: Number }) public value: number = 0;
  @property({ type: Number }) public current: number = 0;
  @property({ type: Number }) public humidity: number = 0;
  @property({ type: Number }) public min = 0;
  @property({ type: Number }) public max = 35;
  @property({ type: Number }) public step = 1;
  @property({ type: Boolean }) public window: boolean = false;
  @property({ type: Boolean }) public summer: boolean = false;
  @property({ type: String }) public status: string = "loading";
  @property({ type: String }) public mode: string = "off";
  @property({ type: Boolean, reflect: true }) public dragging = false;

  private _init: Boolean = true;
  private _firstRender: Boolean = true;
  private _ignore: Boolean = false;
  private _hasWindow: Boolean = false;
  private _hasSummer: Boolean = false;
  private _timeout: any;
  private _oldValueMin: number = 0;
  private _oldValueMax: number = 0;
  private stateObj: any | undefined;
  private _display_bottom: number = 0;
  private _display_top: number = 0;
  private modes: any = [];

  @state() private _config?: ClimateCardConfig;

  setConfig(config: ClimateCardConfig): void {
    this._config = {
        tap_action: {
            action: "toggle",
        },
        hold_action: {
            action: "more-info",
        },
        ...config,
    };
  }

  getCardSize(): number | Promise<number> {
    return 1;
  }

  public static styles: CSSResultGroup = css `
      :host {
          display: block;
      }

      .unavailable {
          opacity: 0.3;
      }

      .unavailable #bar, .unavailable .main-value, .unavailable #value,.unavailable #current, .unavailable .current-info,
      .unknown #bar, .unknown .main-value, .unknown #value,.unknown #current, .unknown .current-info {
        display: none;
      }

      .more-info {
        position: absolute;
        cursor: pointer;
        top: 0px;
        right: 0px;
        inset-inline-end: 0px;
        inset-inline-start: initial;
        border-radius: 100%;
        color: var(--secondary-text-color);
        z-index: 1;
        direction: var(--direction);
    }
      .container {
          position: relative;
          width: 100%;
          height: 100%;
      }
      .content {
        margin: 1.5em;
        margin-top: -1em;
        margin-bottom: 1em;
      }
      .name {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 20px;
        padding-top: 1em;
    }
      svg {
        height: auto;
        margin: auto;
        display: block;
        width: 100%;
        
        transform: scale(1.5);
        -webkit-backface-visibility: hidden;
        max-width: 345px;
      }
      
      path {
        stroke-linecap: round;
        stroke-width: 1;
      }

      text {
        fill: var(--primary-text-color);
      }

      .window_open {
        --mode-color: var(--energy-grid-consumption-color)
      }

      .summer {
        --mode-color: var(--state-not_home-color)
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

      #modes {
        display: flex;
        width: auto;
        justify-content: center;
        margin-top: 1em;
      }

      #modes > * {
        color: var(--disabled-text-color);
        cursor: pointer;
        display: inline-block;
      }
      #modes .selected-icon {
        color: var(--mode-color);
      }
      
      #shadowpath {
        stroke: #e7e7e8;
      }

      #value {
        fill: var(--mode-color);
        r: 5;
        z-index: 9999 !important;
        transition: r 0.3s ease-in-out, fill 0.6s ease-in-out;
      }

      #value,#current {
        filter: drop-shadow(0px 0px 1px #000);
      }

      #value:hover, #value:active, #value:focus, #value.active {
        r: 8 !important;
      }

      #current {
        pointer-events: none;
        fill: var(--label-badge-grey);
      }
      
      .status {
        transition: fill 0.6s ease-in-out, filter 0.6s ease-in-out;
        filter: none;
      }
      .status.active {
        fill: var(--error-color);
        filter: drop-shadow(0px 0px 6px var(--error-color));
      }

      #bar {
        stroke: var(--mode-color);
        stroke-dasharray: 176;
        stroke-dashoffset: 0;
        transition: stroke-dashoffset 5.1s ease-in-out 0s, stroke 0.6s ease-in-out;
      }

      #bar.drag {
        transition: none !important;
      }
      #c-minus,#c-plus {
        cursor: pointer;
      }
      .control {
        cursor: pointer;
        pointer-events: none;
      }
      ha-icon-button {
        transition: color 0.6s ease-in-out;
      }
      .eco ha-icon-button[title="heat"], .window_open ha-icon-button[title="heat"], .summer ha-icon-button[title="heat"] {
        --mode-color: var(--disabled-text-color);
      }
      .summer,.window {
        transition: fill 0.3s ease;
        fill: var(--disabled-text-color);
      }
      line {
        stroke: var(--disabled-text-color);
      }
      .summer.active {
        fill: var(--state-not_home-color);
      }
      .window.active {
        fill: var(--energy-grid-consumption-color);
      }
  `;

  private _percent2bar(percent: number): number {
    return 176 - (176 / 100 * percent);
  }

  private _value2percent(value: number): number {
    return ((value - this.min) / (this.max - this.min)) * 100;
  }

  private _percent2value(percent: number): number {
    return (percent / 100) * (this.max - this.min) + this.min;
  }

  private _updateValue(value: number) {
    const _newValue = Math.round(value / this.step) * this.step;
    if(this.value === _newValue) return;
    this.value = _newValue
    this._updateDisplay();
    this._vibrate(2);
  }

  private _updateDragger(value:boolean) {
    this.dragging = value;
  }


  private _liveSnapPont(that: this,point: gsap.Point2D) {
    const DEG = 180 / Math.PI;
    const path:any = that?.shadowRoot?.querySelector("#shadowpath");
    const pathLength = path?.getTotalLength() || 0;
    function pointModifier(point: gsap.Point2D) {
      const p = closestPoint(path, pathLength, point);
      that._updateValue(that._percent2value(p.percent));
      return p.point;
    }
    
    function closestPoint(pathNode: { getPointAtLength: (arg0: number) => any; }, pathLength: any, point: { x: any; y: any; }) {
      
      let precision = 8,
          best,
          bestLength: any,
          bestDistance = Infinity;
    
      // linear scan for coarse approximation
      for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
        if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
          best = scan, bestLength = scanLength, bestDistance = scanDistance;
        }
      }  
      
      // binary search for precise estimate
      precision /= 2;
      while (precision > 0.5) {
        let before,
            after,
            beforeLength,
            afterLength,
            beforeDistance,
            afterDistance;
        if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
          best = before, bestLength = beforeLength, bestDistance = beforeDistance;
        } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
          best = after, bestLength = afterLength, bestDistance = afterDistance;
        } else {
          precision /= 2;
        }
      }
    
      let len2 = bestLength + (bestLength === pathLength ? -0.1 : 0.1);
      let rotation = getRotation(best, pathNode.getPointAtLength(len2));
      let percent = Math.round(bestLength / pathLength  * 100);
        
      return {
        point: best,
        rotation: rotation * DEG,
        percent: percent,
      };
    
      function distance2(p: { x: number; y: number; }) {
        let dx = p.x - point.x,
            dy = p.y - point.y;
        return dx * dx + dy * dy;
      }
    }
    
    function getRotation(p1: { x: number; y: number; }, p2: { x: number; y: number; }) {
      let dx = p2.x - p1.x;
      let dy = p2.y - p1.y;
      return Math.atan2(dy, dx);
    }
    return pointModifier(point);
  }

  private _vibrate(delay:number) {
    try {
      navigator.vibrate(delay);
    } catch(e){}
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    const that = this;
    const valueHandler: any = this?.shadowRoot?.querySelector(".value-handler");
    const currentHandler: any = this?.shadowRoot?.querySelector(".current-handler")
    this?.shadowRoot?.querySelector("#c-minus")?.addEventListener("click", () => {
      clearTimeout(that._timeout);
      if (that._oldValueMin === 0) that._oldValueMin = that.value;
      that._ignore = true;
      let _temp = that.value;
      _temp = _temp - that.step;
      if (_temp < that.min) _temp = that.min;
      that.value = _temp;
      that._updateDisplay();
      that._timeout = setTimeout((that) => {
        that._ignore = false;
        that._setTemperature();
        that.requestUpdate("value", that._oldValueMin);
        that._oldValueMin = 0;
      }, 600,that);
    });
    this?.shadowRoot?.querySelector("#c-plus")?.addEventListener("click", () => {
      clearTimeout(that._timeout);
      if (that._oldValueMax === 0) that._oldValueMax = that.value;
      that._ignore = true;
      let _temp = that.value;
      _temp = _temp + that.step;
      if (_temp > that.max) _temp = that.max;
      that.value = _temp;
      that._updateDisplay();
      that._timeout = setTimeout((that) => {
        that._ignore = false;
        that._setTemperature();
        that.requestUpdate("value", that._oldValueMax);
        that._oldValueMax = 0;
      }, 600, that);
    });
    Draggable.create(valueHandler, {
      type: "x,y",
      edgeResistance: 1,
      liveSnap: {
        points: (point) => this._liveSnapPont(that,point)
      },
      onRelease: () => {
          that._updateDragger(false);
          valueHandler.blur();
          valueHandler.classList.remove("active");
          let event = new CustomEvent("value-changed", {
            detail: {
              value: this.value,
            },
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);
          this._setTemperature();
      },
      onPress: () => {
        that._vibrate(30);
        valueHandler.classList.add("active");
        valueHandler.focus();
      },
      onDragStart: function () {
        that._updateDragger(true);
      }
    });
    gsap.to(valueHandler, {
      duration: 0, 
      repeat: 0,
      repeatDelay: 0,
      yoyo: false,
      ease: "power1.inOut",
      // @ts-ignore
      motionPath:{
        path: this?.shadowRoot?.querySelector('#shadowpath'),
        autoRotate: false,
        fromCurrent: true,
        useRadians: true,
        curviness: 2,
        start: (this._value2percent(this.value) / 100) || 0,
        end: (this._value2percent(this.value) / 100) || 0
      }
    });
    gsap.to(currentHandler, {
      duration: 0, 
      repeat: 0,
      repeatDelay: 0,
      yoyo: false,
      ease: "power1.inOut",
      // @ts-ignore
      motionPath:{
        path: this?.shadowRoot?.querySelector("#shadowpath"),
        autoRotate: false,
        fromCurrent: true,
        useRadians: true,
        curviness: 2,
        start: (this._value2percent(this.current) / 100) || 0,
        end: (this._value2percent(this.current) / 100) || 0
      }
    });
    this._init = false;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has("_config") !== undefined) {
      if(changedProps.get("_config") !== undefined) {
        this._hasSummer = false;
        this._hasWindow = false;
        this.humidity = 0;
      }
    }
    if (changedProps.get("hass") !== undefined) {
      this._init = false;
    }
    return true;
  }

  protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    if(this._ignore || this._init || this.dragging) return;
    const valueHandler: any = this?.shadowRoot?.querySelector(".value-handler");
    const currentHandler: any = this?.shadowRoot?.querySelector(".current-handler")
    if (changedProperties.has("value")) {
      gsap.to(valueHandler, {
        duration: (this._firstRender) ? 0 : 5, 
        repeat: 0,
        repeatDelay: 0,
        yoyo: false,
        ease: "power1.inOut",
        // @ts-ignore
        motionPath:{
          path: this?.shadowRoot?.querySelector('#shadowpath'),
          autoRotate: false,
          fromCurrent: true,
          useRadians: true,
          curviness: 2,
          immediateRender: true,
          start: (this._value2percent(changedProperties.get("value")) / 100) || 0,
          end: (this._value2percent(this.value) / 100) || 0
        }
      });
    }
    if (changedProperties.has("current")) {
      gsap.to(currentHandler, {
        duration: (this._firstRender) ? 0 : 25,
        repeat: 0,
        repeatDelay: 0,
        yoyo: false,
        ease: "power1.inOut",
        // @ts-ignore
        motionPath:{
          path: this?.shadowRoot?.querySelector("#shadowpath"),
          autoRotate: false,
          fromCurrent: true,
          useRadians: true,
          curviness: 2,
          start: (this._value2percent(changedProperties.get("current")) / 100) || 0,
          end: (this._value2percent(this.current) / 100) || 0
        }
      });
    }
    this._firstRender = false;
  }

  public willUpdate(changedProps: PropertyValues) {
      if (!this.hass || !this._config || (!changedProps.has("hass") && !changedProps.has("_config"))) {
          return;
      }

      const entity_id:any = this._config.entity;

      const stateObj = this.hass.states[entity_id] as ClimateEntity;
      if (!stateObj) {
          return;
      }
      const oldHass = changedProps.get("hass") as HomeAssistant | undefined;

      if (!oldHass || oldHass.states[entity_id] !== stateObj) {
        if (!this._config || !this.hass || !this._config.entity) return;
  
        this.stateObj = stateObj;
        const attributes = this.stateObj.attributes;
        const stateMode = this.stateObj.state;
  
        this.mode = stateMode || "off";

        if (attributes.hvac_modes) {
          this.modes = Object.values(attributes.hvac_modes);
        }
  
        if (attributes.temperature) {
          this.value = attributes.temperature;
        }
        if (attributes.target_temp_step) {
          this.step = attributes.target_temp_step;
        }
        if (attributes.min_temp) {
          this.min = attributes.min_temp;
        }
        if (attributes.max_temp) {
          this.max = attributes.max_temp;
        }
        if (attributes.current_temperature) {
          this.current = attributes.current_temperature;
        }
        if (attributes?.humidity !== undefined) {
          this.humidity = parseFloat(attributes.humidity);
        }
        if (attributes?.window_open !== undefined) {
          this._hasWindow = true;
          this.window = attributes.window_open;
        }
        if (attributes?.call_for_heat !== undefined) {
          this._hasSummer = true;
          this.summer = !attributes.call_for_heat
        }
        this._updateDisplay();
      }
  }

  private _updateDisplay() {
    if(this?._config?.set_current_as_main) {
      this._display_bottom = this.value;
      this._display_top = this.current;
    } else {
      this._display_bottom = this.current;
      this._display_top = this.value;
    }
  }

  private _handleAction(e: MouseEvent): void {
    if ((e.currentTarget as any).mode === "eco") {
        const saved_temp = this?.stateObj?.attributes?.saved_temperature || null;
        if (saved_temp === null) {
          this.hass!.callService("better_thermostat", "set_temp_target_temperature", {
              entity_id: this._config!.entity,
              temperature: this._config?.eco_temperature || 18,
          });
        } else {
          this.hass!.callService("better_thermostat", "restore_saved_target_temperature", {
              entity_id: this._config!.entity,
          });
        }
    } else {
      this.hass!.callService("climate", "set_hvac_mode", {
        entity_id: this._config!.entity,
        hvac_mode: (e.currentTarget as any).mode,
      });
    }
  }

  private _setTemperature(): void {
      this.hass!.callService("climate", "set_temperature", {
          entity_id: this._config!.entity,
          temperature: this.value,
      });
  }

  private _renderIcon(mode: string, currentMode: string): TemplateResult {
    if (!modeIcons[mode]) {
        return html ``;
    }
    const localizeMode = this.hass!.localize(`component.climate.state._.${mode}`) || localize({ hass: this.hass, string: `extra_states.${mode}` });
    return html `
      <ha-icon-button
        title="${currentMode === mode ? mode : ''}"
        class=${classMap({ "selected-icon": currentMode === mode })}
        .mode=${mode}
        @click=${this._handleAction}
        tabindex="0"
        .path=${modeIcons[mode]}
        .label=${localizeMode}
      >
      </ha-icon-button>
    `;
  }

  private _handleMoreInfo() {
    fireEvent(this, "hass-more-info", {
        entityId: this._config!.entity,
    });
  }

  public render: () => TemplateResult = (): TemplateResult => {
    return html `
    <ha-card class=${classMap({
      [this.mode]: true,
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
      <div class="name">${this._config?.name}</div>
      <div class="content ${this.window ? 'window_open': ''} ${this.summer ? 'summer': ''} ${(this?.stateObj?.attributes?.saved_temperature && this?.stateObj?.attributes?.saved_temperature !== null) ? 'eco' : ''}">
            <svg id="main" viewbox="0 0 125 100">
              <g transform="translate(57.5,37) scale(0.35)">
                ${(this._hasWindow && !this._config?.disable_window) ? svg`
                  <path title="${localize({ hass: this.hass, string: `extra_states.window_open` })}" class="window ${this.window ? 'active': ''}" fill="none" transform="${(this._hasSummer && !this._config?.disable_summer) ? 'translate(-31.25,0)' :''}" id="window" d=${mdiWindowOpenVariant} />
                `: ``}
                ${(this._hasSummer && !this._config?.disable_summer) ? svg`
                  <path class="summer ${this.summer ? 'active': ''}" fill="none" transform="${(this._hasWindow && !this._config?.disable_window) ? 'translate(31.25,0)' :''}" id="summer" d=${mdiSunThermometer} />
                `: ``}
              </g>
              <path id="shadowpath" d="M 30 90 A 40 40 0 1 1 95 90" fill='none' />
              <path shape-rendering="optimizeQuality" id="bar" fill='none' style="stroke-dashoffset: ${this._percent2bar(this._value2percent(this.value))};"  class="${this.dragging ? 'drag': ''}" d="M 30 90 A 40 40 0 1 1 95 90" />
              <circle id="value" class="value-handler" cx="0" cy="0" r="5"/>
              <circle id="current" class="current-handler" cx="0" cy="0" r="3"/>
              <text class="main-value" x="62.5" y="60%" dominant-baseline="middle" text-anchor="middle" style="font-size:17px;">
                ${svg`${formatNumber(
                  this._display_top,
                  this.hass.locale,
                  { minimumFractionDigits: 1, maximumFractionDigits: 1 }
                )}`}
                <tspan dx="2" dy="-5.5" style="font-size: 5px;">
                  ${svg`
                    ${this.hass.config.unit_system.temperature}
                  `}
                </tspan>
              </text>
              ${(this?.stateObj?.state === UNAVAILABLE || this?.stateObj?.state === UNKNOWN) ? svg`
              <text x="62.5" y="63%" dominant-baseline="middle" text-anchor="middle" style="font-size:8px;">${this.hass!.localize(
                "state.default.unavailable"
              )}</text>
              ` : ''}
              <line x1="35" y1="72" x2="90" y2="72" stroke="#e7e7e8" stroke-width="0.5" />
              <g class="current-info" transform="translate(62.5,80)">
                ${(this.humidity === 0) ? svg`
                    <text x="-5%" y="0%" dominant-baseline="middle" text-anchor="middle" style="font-size:8px;">
                    ${svg`${formatNumber(
                      this.current,
                      this.hass.locale,
                      { minimumFractionDigits: 1, maximumFractionDigits: 1 }
                    )}`}
                    <tspan dx="1" dy="-2" style="font-size: 3px;">
                      ${svg`
                        ${this.hass.config.unit_system.temperature}
                      `}
                    </tspan>
                  </text>
                  <path class="status ${(this.stateObj.attributes.hvac_action === 'heating' && this.mode !== 'off') ? 'active': ''}"  transform="translate(5,-4) scale(0.25)" fill="#9d9d9d"  d="${mdiHeatWave}" />
                `: svg `
                  <text x="-12.25%" y="0%" dominant-baseline="middle" text-anchor="middle" style="font-size:8px;">
                    ${svg`${formatNumber(
                      this._display_bottom,
                      this.hass.locale,
                      { minimumFractionDigits: 1, maximumFractionDigits: 1 }
                    )}`}
                    <tspan dx="1" dy="-2" style="font-size: 3px;">
                      ${svg`
                        ${this.hass.config.unit_system.temperature}
                      `}
                    </tspan>
                  </text>
                  <text x="12.25%" y="0%" dominant-baseline="middle" text-anchor="middle" style="font-size:8px;">
                    ${svg`${formatNumber(
                      this.humidity,
                      this.hass.locale,
                      { minimumFractionDigits: 1, maximumFractionDigits: 1 }
                    )}`}
                    <tspan dx="1" dy="-2" style="font-size: 3px;">
                    %
                    </tspan>
                  </text>
                  <path class="status ${(this.stateObj.attributes.hvac_action === 'heating' && this.mode !== 'off') ? 'active': ''}"  transform="translate(-3,-3.5) scale(0.25)" fill="#9d9d9d"  d=${mdiHeatWave} />
                `}

              </g>
                </svg>
                <div id="modes">
                ${this?._hasSummer ? svg`
                  ${this?._config?.disable_heat ? html `` : this._renderIcon("heat", this.mode)}
                  ${this?._config?.disable_eco ? html `` :
                    this?.stateObj?.attributes?.saved_temperature &&
                    this?.stateObj?.attributes?.saved_temperature !== "none" &&
                    this?.stateObj?.state !== UNAVAILABLE
                      ? this._renderIcon("eco","eco"): this._renderIcon("eco", "none")}
                  ${this?._config?.disable_off ? html `` : this._renderIcon("off", this.mode)}
                `:
                svg`
                  ${this.modes.map((mode) => {
                    if(this._config?.disable_heat && mode === "heat") return html ``;
                    if(this._config?.disable_eco && mode === "eco") return html ``;
                    if(this._config?.disable_off && mode === "off") return html ``;
                    return this._renderIcon(mode, this.mode);
                  })}
                `}

              </div>
      </div>
  </ha-card>
  `;
  };
}

/*
              <!--<g transform="translate(62.5,80)">  
                <circle id="c-minus" cx="-20" cy="0" r="5" fill="#e7e7e8" />
                <path  class="control" transform="translate(-24,-4) scale(0.35)" d=${mdiMinus} />
                <circle id="c-plus" cx="20" cy="0" r="5" fill="#e7e7e8" />
                <path  class="control" transform="translate(16,-4) scale(0.35)" d=${mdiPlus} />
              </g>-->
*/