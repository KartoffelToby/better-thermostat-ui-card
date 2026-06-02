import {
  css,
  CSSResultGroup,
  html,
  nothing,
  PropertyValues,
  TemplateResult,
} from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  actionHandler,
  ActionHandlerEvent,
  ClimateEntity,
  computeRTL,
  formatNumber,
  handleAction,
  hasAction,
  HomeAssistant,
  HvacMode,
  isActive,
  isAvailable,
  LovelaceCard,
  LovelaceCardEditor,
} from "mushroom-cards/src/ha";
import { ensureElementLoaded } from "../utils/ensure-element-loaded";
import { computeAppearance } from "mushroom-cards/src/utils/appearance";
import { MushroomBaseCard } from "mushroom-cards/src/utils/base-card";
import { cardStyle } from "mushroom-cards/src/utils/card-styles";
import { registerCustomCard } from "mushroom-cards/src/utils/custom-cards";
import { computeEntityPicture } from "mushroom-cards/src/utils/info";
import { BetterThermostatUISmallCardConfig } from "./climate-card-config";
import {
  CLIMATE_CARD_EDITOR_NAME,
  CLIMATE_CARD_NAME,
  CLIMATE_ENTITY_DOMAINS,
} from "./const";
import "./controls/climate-hvac-modes-control";
import { isHvacModesVisible } from "./controls/climate-hvac-modes-control";
import "./controls/climate-temperature-control";
import { isTemperatureControlVisible } from "./controls/climate-temperature-control";
import {
  getHvacActionColor,
  getHvacActionIcon,
  getHvacModeColor,
  getHvacModeIcon,
} from "./utils";
import { localize } from "../localize/localize";

type ClimateCardControl = "temperature_control" | "hvac_mode_control";

interface BatteryState {
  battery: string;
}

const CONTROLS_ICONS: Record<ClimateCardControl, string> = {
  temperature_control: "mdi:thermometer",
  hvac_mode_control: "mdi:thermostat",
};

registerCustomCard({
  type: CLIMATE_CARD_NAME,
  name: "Better Thermostat Mini Climate Card",
  description: "Card for climate entity",
});

@customElement(CLIMATE_CARD_NAME)
export class BetterThermostatUISmallCard
  extends MushroomBaseCard<BetterThermostatUISmallCardConfig, ClimateEntity>
  implements LovelaceCard
{
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./climate-card-editor");
    return document.createElement(
      CLIMATE_CARD_EDITOR_NAME
    ) as LovelaceCardEditor;
  }

  public static async getStubConfig(
    hass: HomeAssistant
  ): Promise<BetterThermostatUISmallCardConfig> {
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

  @state() private _activeControl?: ClimateCardControl;
  @state() private _presetOpen: boolean = false;

  private get _controls(): ClimateCardControl[] {
    if (!this._config || !this._stateObj) return [];

    const stateObj = this._stateObj;
    const controls: ClimateCardControl[] = [];
    if (
      isTemperatureControlVisible(stateObj) &&
      this._config.show_temperature_control
    ) {
      controls.push("temperature_control");
    }
    if (isHvacModesVisible(stateObj, ["heat", "off"])) {
      controls.push("hvac_mode_control");
    }
    return controls;
  }

  protected get hasControls(): boolean {
    return this._controls.length > 0;
  }

  _onControlTap(ctrl: ClimateCardControl, e: Event): void {
    e.stopPropagation();
    this._activeControl = ctrl;
  }

  setConfig(config: BetterThermostatUISmallCardConfig): void {
    super.setConfig({
      tap_action: {
        action: "toggle",
      },
      hold_action: {
        action: "more-info",
      },
      ...config,
    });
    this.updateActiveControl();
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (this.hass && changedProperties.has("hass")) {
      this.updateActiveControl();
    }
  }

  updateActiveControl() {
    const isActiveControlSupported = this._activeControl
      ? this._controls.includes(this._activeControl)
      : false;
    this._activeControl = isActiveControlSupported
      ? this._activeControl
      : this._controls[0];
  }

  private _handleAction(ev: ActionHandlerEvent) {
    handleAction(this, this.hass!, this._config!, ev.detail.action!);
  }

  protected render() {
    if (!this.hass || !this._config || !this._config.entity) {
      return nothing;
    }

    const stateObj = this._stateObj;

    if (!stateObj) {
      return this.renderNotFound(this._config);
    }

    const name = this._config.name || stateObj.attributes.friendly_name || "";
    const icon = this._config.icon;
    const appearance = computeAppearance(this._config);
    const picture = computeEntityPicture(stateObj, appearance.icon_type);
    const window = (stateObj.attributes as any).window_open;
    let stateDisplay = this.hass.formatEntityState(stateObj);
    if (stateObj.attributes.hvac_action && stateObj.attributes.hvac_action !== "off") {
      stateDisplay = this.hass.formatEntityAttributeValue(stateObj, "hvac_action");
    }
    if (stateObj.attributes.current_temperature != null) {
      const temperature = this.hass.formatEntityAttributeValue(
        stateObj,
        "current_temperature"
      );
      const windowOpen = localize({
        hass: this.hass as any,
        string: "extra_states.window_open",
      });
      let humidity = "";
      if (stateObj.attributes.current_humidity && !this._config.disable_humidity) {
        humidity = ` ⸱ ${this.hass.formatEntityAttributeValue(
          stateObj,
          "current_humidity"
        )}`;
      }
      stateDisplay += ` ⸱ ${window ? `(${windowOpen}) ` : ""}${temperature}${humidity}`;
    }
    const rtl = computeRTL(this.hass);

    const isControlVisible =
      (!this._config.collapsible_controls || isActive(stateObj)) &&
      this._controls.length;

    const hvac_action:any = stateObj.attributes.hvac_action || "off";

    const color = getHvacActionColor(hvac_action);
    let actionStyle: any = {};
    actionStyle["--action-color"] = `rgba(${color}, 0.6)`;

    const preset = (this._stateObj.attributes as any).preset_mode;
    if (preset !== undefined && preset !== "none") {
      const pre_color = getHvacModeColor(preset);
      actionStyle["--action-color"] = `rgba(${pre_color}, 0.6)`;
      actionStyle["--rgb-state-climate-heat"] = pre_color;
    }

    if ((this._stateObj.attributes as any).window_open) {
        actionStyle["--action-color"] = `var(--info-color)`;
    }
    if (hvac_action === "off") {
      actionStyle["--action-color"] = `rgba(0, 0, 0, 0)`;
    }
    const iconStyle = {};
    iconStyle["--icon-color"] = `var(--rgb-grey)`;
    iconStyle["--bg-color"] = `rgba(var(--rgb-grey), 0.2)`;
    return html`
      <ha-card
        class=${classMap({ "fill-container": appearance.fill_container })}
        style=${styleMap(actionStyle)}
      >
        <mushroom-card .appearance=${appearance} ?rtl=${rtl}>
          <mushroom-state-item
            ?rtl=${rtl}
            .appearance=${appearance}
            @action=${this._handleAction}
            .actionHandler=${actionHandler({
              hasHold: hasAction(this._config.hold_action),
              hasDoubleClick: hasAction(this._config.double_tap_action),
            })}
          >
            ${picture
              ? this.renderPicture(picture)
              : this.renderIcon(stateObj, icon)}
            ${this.renderBadge(stateObj)}
            ${this.renderStateInfo(stateObj, appearance, name, stateDisplay)}
          </mushroom-state-item>
          ${isControlVisible
            ? html`
                <div class="actions" ?rtl=${rtl}>
                  ${this.renderActiveControl(stateObj)}
                  ${this.renderOtherControls()}
                </div>
              `
            : nothing}

  
              <div class=${classMap({ 'preset-select': true, open: this._presetOpen })}>
            ${(stateObj.attributes.preset_modes ?? []).map((mode: any) => html`
                <mushroom-button
                  style=${styleMap(iconStyle)}
                  .mode=${mode}
                  .disabled=${!isAvailable(stateObj)}
                    @click=${this.triggerModeChange.bind(this, mode)}
                    .actionHandler=${actionHandler({ hasHold: true })}
                    @action=${(e: ActionHandlerEvent) => { if (e.detail.action === "hold") { e.stopPropagation(); this._openPresetSelect(true); } }}
                >
                  <ha-icon .icon=${getHvacModeIcon(mode)}></ha-icon>
                </mushroom-button>
            `)}
          </div>
        </mushroom-card>
      </ha-card>
    `;
  }

  protected async firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    // Ensure shared mushroom components are loaded only once
    
    await Promise.all([
      (async () => {
        if (!customElements.get("mushroom-badge-icon"))
          await import("mushroom-cards/src/shared/badge-icon");
      })(),
      (async () => {
        if (!customElements.get("mushroom-card"))
          await import("mushroom-cards/src/shared/card");
      })(),
      (async () => {
        if (!customElements.get("mushroom-shape-avatar"))
          await import("mushroom-cards/src/shared/shape-avatar");
      })(),
      (async () => {
        if (!customElements.get("mushroom-shape-icon"))
          await import("mushroom-cards/src/shared/shape-icon");
      })(),
      (async () => {
        if (!customElements.get("mushroom-state-info"))
          await import("mushroom-cards/src/shared/state-info");
      })(),
      (async () => {
        if (!customElements.get("mushroom-state-item"))
          await import("mushroom-cards/src/shared/state-item");
      })(),
      (async () => {
        if (!customElements.get("mushroom-button"))
          await import("mushroom-cards/src/shared/button");
      })(),
    ]);
    
  }

  disconnectedCallback() {
    window.removeEventListener("pointerdown", this._onDocumentPointerDown as EventListener, { passive: true } as any);
    this._presetOpen = false;
    super.disconnectedCallback();
  }

  connectedCallback() {
    super.connectedCallback();
    if (this._presetOpen) {
      window.addEventListener("pointerdown", this._onDocumentPointerDown as EventListener, { passive: true } as any);
    }
  }

  protected renderIcon(stateObj: ClimateEntity, icon?: string): TemplateResult {
    const available = isAvailable(stateObj);
    const window = (stateObj.attributes as any).window_open;
    const eco = (stateObj.attributes as any).eco_mode === true;
    const color = getHvacModeColor(stateObj.state as HvacMode);
    const iconStyle = {};
    iconStyle["--icon-color"] = `rgb(${color})`;
    iconStyle["--shape-color"] = `rgba(${color}, 0.2)`;

    if (window) {
      iconStyle["--icon-color"] = `var(--info-color)`;
      iconStyle["--shape-color"] = `rgba(0,0,0, 0.1)`;
    } else if (eco) {
      iconStyle["--icon-color"] = `rgb(165, 214, 167)`;
      iconStyle["--shape-color"] = `rgba(165, 214, 167, 0.2)`;
    }

    return html`
      <mushroom-shape-icon
        slot="icon"
        .disabled=${!available}
        style=${styleMap(iconStyle)}
      >
        <ha-state-icon
          .hass=${this.hass}
          .stateObj=${stateObj}
          .icon=${icon}
        ></ha-state-icon>
      </mushroom-shape-icon>
    `;
  }

  protected renderBadge(entity: ClimateEntity) {
    const unavailable = !isAvailable(entity);
    if (unavailable) {
      return super.renderBadge(entity);
    }

    const lowBattery = this._getLowBattery(entity);
    const errorEntityId = this._getErrorEntityId(entity);
    const degradedMode = !this._config?.disable_degraded_warning && (entity.attributes as any)?.degraded_mode === true;
    if (degradedMode) {
      return html`
        <mushroom-badge-icon
          slot="badge"
          .icon=${"mdi:alert"}
          title=${localize({ hass: this.hass as any, string: "extra_states.degraded_mode" })}
          @click=${(ev: Event) => { ev.stopPropagation(); ev.preventDefault(); this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: entity.entity_id }, bubbles: true, composed: true })); }}
          style=${styleMap({
            "--main-color": "var(--warning-color)",
            "--icon-color": "black",
          })}
        ></mushroom-badge-icon>
      `;
    }
    if (errorEntityId) {
      return html`
        <mushroom-badge-icon
          slot="badge"
          .icon=${"mdi:wifi-strength-off-outline"}
          title=${localize({ hass: this.hass as any, string: "extra_states.connection_lost", search: "{name}", replace: errorEntityId })}
          @click=${(ev: Event) => this._handleErrorClick(ev, errorEntityId)}
          style=${styleMap({
            "--main-color": "var(--error-color)",
          })}
        ></mushroom-badge-icon>
      `;
    }

    if (lowBattery) {
      return html`
        <mushroom-badge-icon
          slot="badge"
          .icon=${"mdi:battery-alert"}
          title=${localize({ hass: this.hass as any, string: "extra_states.low_battery", search: "{name}", replace: lowBattery.name })}
          @click=${(ev: Event) => this._handleLowBatteryClick(ev, lowBattery)}
          style=${styleMap({
            "--main-color": "var(--error-color)",
          })}
        ></mushroom-badge-icon>
      `;
    }

    return this.renderActionBadge(entity);
  }

  private _getLowBattery(entity: ClimateEntity) {
    if (this._config?.disable_battery_warning) return undefined;

    const batteriesRaw = (entity.attributes as any)?.batteries;
    if (batteriesRaw === undefined) return undefined;

    try {
      const showLowBatteryWarningWhenPercentageLowerThan = this._config?.low_battery_threshold ?? 10;
      const batteries = Object.entries(
        JSON.parse(batteriesRaw) as Record<string, BatteryState>
      );
      const parsedBatteries = batteries.map((data) => ({
        name: data[0],
        battery:
          data[1].battery === "on"
            ? showLowBatteryWarningWhenPercentageLowerThan - 1
            : data[1].battery === "off"
              ? 100
              : parseFloat(data[1].battery),
      }));
      return parsedBatteries.find(
        (battery) =>
          battery.battery < showLowBatteryWarningWhenPercentageLowerThan
      );
    } catch (error) {
      return undefined;
    }
  }

  private _getErrorEntityId(entity: ClimateEntity) {
    if (this._config?.disable_connection_lost_warning) return undefined;

    const errorsRaw = (entity.attributes as any)?.errors;
    if (errorsRaw === undefined) return undefined;

    try {
      const errors = JSON.parse(errorsRaw);
      if (!Array.isArray(errors) || errors.length === 0) return undefined;

      const first = errors[0];
      if (typeof first === "string") return first;
      if (typeof first === "object" && first !== null) {
        return first.entity_id || first.entity || first.name;
      }

      return undefined;
    } catch (error) {
      return undefined;
    }
  }

  private _handleErrorClick(ev: Event, entityId: string) {
    ev.stopPropagation();
    ev.preventDefault();
    if (!entityId) return;

    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleLowBatteryClick(
    ev: Event,
    lowBattery: { name: string; battery: number }
  ) {
    ev.stopPropagation();
    ev.preventDefault();

    const entityId = lowBattery?.name;
    if (!entityId) return;

    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId },
        bubbles: true,
        composed: true,
      })
    );
  }

  renderActionBadge(entity: ClimateEntity) {
    const hvac_action = entity.attributes.hvac_action;
    const window = (entity.attributes as any).window_open;

    if (!hvac_action || hvac_action == "off" && !window) return nothing;

    const color = getHvacActionColor(hvac_action);
    let icon = getHvacActionIcon(hvac_action);
    if (window) {
      icon = "mdi:window-open-variant";
    }

    if (!icon) return nothing;

    return html`
      <mushroom-badge-icon
        slot="badge"
        .icon=${icon}
        style=${styleMap({
          "--main-color": `rgb(${color})`,
        })}
      ></mushroom-badge-icon>
    `;
  }

  private renderOtherControls(): TemplateResult | null {
    const otherControls = this._controls.filter(
      (control) => control != this._activeControl
    );

    return html`
      ${otherControls.map(
        (ctrl) => html`
          <mushroom-button @click=${(e) => this._onControlTap(ctrl, e)}>
            <ha-icon .icon=${CONTROLS_ICONS[ctrl]}></ha-icon>
          </mushroom-button>
        `
      )}
    `;
  }

  private renderPresetFeature(entity: ClimateEntity) {
          const presetMode = entity.attributes.preset_mode;
          const mode = (presetMode != null && presetMode !== 'none') ? presetMode : "none";
          const iconStyle = {};
          const color = getHvacModeColor(mode as HvacMode);
          const selectedMode = (presetMode != null && presetMode !== 'none') ? presetMode : mode;
          if (presetMode != null && presetMode !== 'none') {
            iconStyle["--icon-color"] = `rgb(${color})`;
            iconStyle["--bg-color"] = `rgba(${color}, 0.2)`;
          }
          const icon = getHvacModeIcon(mode as HvacMode);

          const presets = (entity.attributes.preset_modes?.filter(p => p != "none") || [] as HvacMode[]);
          if (presets.length === 1) {
            return html`
                <mushroom-button
                  style=${styleMap(iconStyle)}
                  .mode=${selectedMode}
                  .actionHandler=${actionHandler({ hasHold: true })}
                  @click=${this.triggerModeChange.bind(this, presets[0])}
                  @action=${(e: ActionHandlerEvent) => { if (e.detail.action === 'hold') { e.stopPropagation(); this._openPresetSelect(true); } }}
                >
                  <ha-icon .icon=${getHvacModeIcon(presets[0] as HvacMode)}></ha-icon>
                </mushroom-button>
                `;
          }  else if (presets.length > 1)  {
            return html`
              <mushroom-button
                style=${styleMap(iconStyle)}
                .mode=${selectedMode}
                .actionHandler=${actionHandler({ hasHold: true })}
                @click=${(e: Event) => { e.stopPropagation(); this._openPresetSelect(true); }}
                @action=${(e: ActionHandlerEvent) => { if (e.detail.action === 'hold') { e.stopPropagation(); this._openPresetSelect(true); } }}
              >
                <ha-icon .icon=${icon}></ha-icon>
              </mushroom-button>
            `;
          } else {
            return nothing;
          }
  }

  private _openPresetSelect(open = true) {
    this._presetOpen = open;
    if (open) {
      window.addEventListener("pointerdown", this._onDocumentPointerDown as EventListener, { passive: true } as any);
    } else {
      window.removeEventListener("pointerdown", this._onDocumentPointerDown as EventListener, { passive: true } as any);
    }
  }

  private _onDocumentPointerDown = (ev: Event) => {
    const path = (ev as any).composedPath?.() ?? [];
    const presetEl = this.shadowRoot?.querySelector('.preset-select');
    if (!presetEl) return;
    // If the click is outside the preset-select element, close the menu
    if (!path.includes(presetEl as EventTarget)) {
      this._openPresetSelect(false);
    }
  };

  private triggerModeChange(mode: any) {
    const stateObj = this._stateObj;
    if (!stateObj) return;
    if (stateObj.attributes.hvac_modes?.includes(mode)) {
      this.hass.callService("climate", "set_hvac_mode", {
        entity_id: stateObj.entity_id,
        hvac_mode: mode,
      });
      this._openPresetSelect(false);
      return;
    } else if (stateObj?.attributes.preset_modes && stateObj.attributes.preset_modes.includes(mode)) {
      if (mode === stateObj.attributes.preset_mode) mode = "none";
      this.hass.callService("climate", "set_preset_mode", {
        entity_id: stateObj.entity_id,
        preset_mode: mode,
      });
      this._openPresetSelect(false);
      return;
    }
  }

  private renderActiveControl(entity: ClimateEntity) {
    const hvac_modes: HvacMode[] = ["heat", "off"];
    const appearance = computeAppearance(this._config!);

    switch (this._activeControl) {
      case "temperature_control":
        return html`
          <mushroom-climate-temperature-control
            .hass=${this.hass}
            .entity=${entity}
            .fill=${appearance.layout !== "horizontal"}
          ></mushroom-climate-temperature-control>
          ${this.renderPresetFeature(entity)}
        `;
      case "hvac_mode_control":
        return html`
          <mushroom-climate-hvac-modes-control
            .hass=${this.hass}
            .entity=${entity}
            .modes=${hvac_modes}
            .fill=${appearance.layout !== "horizontal"}
            .disableEco=${this._config?.disable_eco}
            .feature=${this.renderPresetFeature(entity)}
          ></mushroom-climate-hvac-modes-control>
        `;
      default:
        return nothing;
    }
  }

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      cardStyle,
      css`
        :host {
          --rgb-state-climate-heat: 244, 99, 108;

          --bt-state-window: var(--info-color);
          --bt-state-eco: 165, 214, 167;
          --bt-state-away: 176, 190, 197;
          --bt-state-boost: 239, 83, 80;
          --bt-state-sleep: 63, 81, 181;
          --bt-state-comfort: 121, 85, 72;
          --bt-state-activity: 230, 74, 25;
          --bt-state-home: 76, 175, 80;
        }
        :host>* {
          overflow: hidden;
        }
        :host>*::before {
            display: block;
            content: "";
            position: absolute;
            right: -10%;
            bottom: -10%;
            background: radial-gradient(100% 60% at 50% 90%, var(--action-color, transparent) 0%, transparent 100%);
            opacity: 0.3;
            pointer-events: none;
            transform: translate(-50%, -20%);
            left: 50% !important;
            z-index: 0;
            top: 50% !important;
            width: 100%;
            height: 100%;
        }
        mushroom-state-item {
          cursor: pointer;
        }
        mushroom-climate-temperature-control,
        mushroom-climate-hvac-modes-control {
          flex: 1;
        }
        .preset-select {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          gap: 15px;
          flex-direction: row;
          max-height: 0%;
          overflow: hidden;
          transition: max-height 300ms ease-in-out, padding 300ms ease-in-out;
          z-index: -1;
          padding: 0 1em 0em 1em;
          box-sizing: border-box;
          background-color: rgba(var(--rgb-card-background-color), 0.3);
        }
        .preset-select.open {
          max-height: 100%;
          z-index: 10;
        }
      `,
    ];
  }
}
