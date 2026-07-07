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
import type { StyleInfo } from "lit/directives/style-map.js";
import {
  actionHandler,
  ActionHandlerEvent,
  computeRTL,
  handleAction,
  hasAction,
  HomeAssistant,
  HvacMode,
  isActive,
  isAvailable,
  LovelaceCard,
  LovelaceCardEditor,
} from "mushroom-cards/src/ha";
import { ensureElementLoaded } from "../shared/ensure-element-loaded";
import { computeAppearance } from "mushroom-cards/src/utils/appearance";
import { MushroomBaseCard } from "mushroom-cards/src/utils/base-card";
import { cardStyle } from "mushroom-cards/src/utils/card-styles";
import { registerCustomCard } from "mushroom-cards/src/utils/custom-cards";
import { computeEntityPicture } from "mushroom-cards/src/utils/info";
import { BetterThermostatUISmallCardConfig } from "./climate-card-config";
import { CLIMATE_CARD_EDITOR_NAME, CLIMATE_CARD_NAME } from "./const";
import "./controls/climate-hvac-modes-control";
import { isHvacModesVisible } from "./controls/climate-hvac-modes-control";
import "./controls/climate-temperature-control";
import { isTemperatureControlVisible } from "./controls/climate-temperature-control";
import { BtClimateEntity, setClimateMode } from "../shared/climate";
import {
  climateActionColor,
  climateColor,
  climateColorDefaultStyles,
  climateColorOverrides,
  getHvacActionIcon,
  getHvacModeIcon,
} from "../shared/climate-colors";
import { alphaColor } from "../shared/color";
import { findBtStubEntity, formatHumidity, isWindowOpen } from "../shared/bt";
import {
  getErrorEntityId,
  getLowBattery,
  isDegraded,
  LowBatteryEntity,
} from "../shared/bt-status";
import { localize } from "../shared/localize";
import { shouldUpdateForHass } from "../shared/has-changed";
import {
  PresetOverlayController,
  presetOverlayStyle,
} from "../shared/preset-overlay";
import { btStateColorsStyle, btAnimationsStyle } from "../shared/styles";

type ClimateCardControl = "temperature_control" | "hvac_mode_control";

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
  extends MushroomBaseCard<BetterThermostatUISmallCardConfig, BtClimateEntity>
  implements LovelaceCard
{
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./climate-card-editor");
    return document.createElement(
      CLIMATE_CARD_EDITOR_NAME,
    ) as LovelaceCardEditor;
  }

  public static async getStubConfig(
    hass: HomeAssistant,
  ): Promise<BetterThermostatUISmallCardConfig> {
    return {
      type: `custom:${CLIMATE_CARD_NAME}`,
      entity: findBtStubEntity(hass),
    };
  }

  @state() private _activeControl?: ClimateCardControl;
  private _presetOverlay = new PresetOverlayController(this);

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

  // hass is replaced on every state tick of ANY entity — only re-render for
  // changes the card actually displays.
  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.size === 1 && changed.has("hass")) {
      const oldHass = changed.get("hass") as HomeAssistant | undefined;
      return shouldUpdateForHass(oldHass, this.hass!, [
        this._config?.entity,
        this._config?.window_sensor,
        this._config?.humidity_sensor,
      ]);
    }
    return true;
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
    const window = isWindowOpen(this.hass, stateObj, this._config);
    const summer = stateObj.attributes.call_for_heat === false;
    let stateDisplay = this.hass.formatEntityState(stateObj);
    if (
      stateObj.attributes.hvac_action &&
      stateObj.attributes.hvac_action !== "off"
    ) {
      stateDisplay = this.hass.formatEntityAttributeValue(
        stateObj,
        "hvac_action",
      );
    }
    if (stateObj.attributes.current_temperature != null) {
      let temperature = this.hass.formatEntityAttributeValue(
        stateObj,
        "current_temperature",
      );
      if (!temperature) {
        temperature = `${stateObj.attributes.current_temperature} ${this.hass.config.unit_system.temperature}`;
      }
      const windowOpen = localize({
        hass: this.hass,
        string: "extra_states.window_open",
      });
      const summerLabel =
        localize({
          hass: this.hass,
          string: "extra_states.summer",
        }) || "Summer";
      let humidity = "";
      const humidityDisplay = formatHumidity(this.hass, stateObj, this._config);
      if (humidityDisplay) {
        humidity = ` ⸱ ${humidityDisplay}`;
      }
      stateDisplay += ` ⸱ ${window ? `(${windowOpen}) ` : summer ? `(${summerLabel}) ` : ""}${temperature}${humidity}`;
    }
    const rtl = computeRTL(this.hass);

    const isControlVisible =
      !this._config.disable_all_buttons &&
      (!this._config.collapsible_controls || isActive(stateObj)) &&
      this._controls.length;

    // Whenever the controls row is not shown (disable_all_buttons, or the
    // entity offers no matching controls), presets must still be reachable —
    // like on the normal card — as long as they aren't disabled themselves
    // and the controls aren't collapsed.
    const hasPresets =
      (
        stateObj.attributes.preset_modes?.filter((p: string) => p !== "none") ??
        []
      ).length > 0;
    const isPresetOnlyVisible =
      !isControlVisible &&
      !this._config.disable_presets &&
      hasPresets &&
      (!this._config.collapsible_controls || isActive(stateObj));

    const hvac_action = stateObj.attributes.hvac_action || "off";

    const actionStyle: StyleInfo = {};
    actionStyle["--action-color"] = alphaColor(
      climateActionColor(hvac_action),
      0.6,
    );

    const preset = this._stateObj.attributes.preset_mode;
    if (preset !== undefined && preset !== "none") {
      const presetColor = climateColor(preset);
      actionStyle["--action-color"] = alphaColor(presetColor, 0.6);
      // Recolor the heat-styled temperature input to the active preset
      // (replaces the old --rgb-state-climate-heat triplet reassignment).
      actionStyle["--bt-color-heat"] = presetColor;
    }

    if (window) {
      actionStyle["--action-color"] = `var(--info-color)`;
    } else if (summer) {
      actionStyle["--action-color"] = `var(--bt-color-summer)`;
    } else if (hvac_action === "off") {
      actionStyle["--action-color"] = `rgba(0, 0, 0, 0)`;
    }
    const iconStyle: StyleInfo = {
      "--icon-color": "var(--bt-color-grey)",
      "--bg-color": alphaColor("var(--bt-color-grey)", 0.2),
    };
    return html`
      <ha-card
        class=${classMap({ "fill-container": appearance.fill_container })}
        style=${styleMap({
          ...climateColorOverrides(this._config.colors),
          ...actionStyle,
        })}
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
            : isPresetOnlyVisible
              ? html`
                  <div class="actions" ?rtl=${rtl}>
                    ${this.renderPresetFeature(stateObj)}
                  </div>
                `
              : nothing}

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
                  .actionHandler=${actionHandler({ hasHold: true })}
                  @action=${(e: ActionHandlerEvent) => {
                    e.stopPropagation();
                    if (e.detail.action === "hold") {
                      this._presetOverlay.setOpen(true);
                    } else if (e.detail.action === "tap") {
                      this.triggerModeChange(mode);
                    }
                  }}
                >
                  <ha-icon .icon=${getHvacModeIcon(mode)}></ha-icon>
                </mushroom-button>
              `,
            )}
          </div>
        </mushroom-card>
      </ha-card>
    `;
  }

  protected async firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    // Ensure shared mushroom components are loaded only once
    await Promise.all([
      ensureElementLoaded(
        "mushroom-badge-icon",
        () => import("mushroom-cards/src/shared/badge-icon"),
      ),
      ensureElementLoaded(
        "mushroom-card",
        () => import("mushroom-cards/src/shared/card"),
      ),
      ensureElementLoaded(
        "mushroom-shape-avatar",
        () => import("mushroom-cards/src/shared/shape-avatar"),
      ),
      ensureElementLoaded(
        "mushroom-shape-icon",
        () => import("mushroom-cards/src/shared/shape-icon"),
      ),
      ensureElementLoaded(
        "mushroom-state-info",
        () => import("mushroom-cards/src/shared/state-info"),
      ),
      ensureElementLoaded(
        "mushroom-state-item",
        () => import("mushroom-cards/src/shared/state-item"),
      ),
      ensureElementLoaded(
        "mushroom-button",
        () => import("mushroom-cards/src/shared/button"),
      ),
    ]);
  }

  protected renderIcon(
    stateObj: BtClimateEntity,
    icon?: string,
  ): TemplateResult {
    const available = isAvailable(stateObj);
    const window = isWindowOpen(this.hass, stateObj, this._config);
    const summer = stateObj.attributes.call_for_heat === false;
    const eco = stateObj.attributes.eco_mode === true;
    const hvacAction = stateObj.attributes.hvac_action;
    // On dual (heat/cool) devices the mode color (heat_cool) hides what the
    // device is actually doing — prefer the active action color when set.
    const color =
      hvacAction && hvacAction !== "idle" && hvacAction !== "off"
        ? climateActionColor(hvacAction)
        : climateColor(stateObj.state);
    const iconStyle: StyleInfo = {};
    iconStyle["--icon-color"] = color;
    iconStyle["--shape-color"] = alphaColor(color, 0.2);

    if (window) {
      iconStyle["--icon-color"] = `var(--info-color)`;
      iconStyle["--shape-color"] = `rgba(0,0,0, 0.1)`;
    } else if (summer) {
      iconStyle["--icon-color"] = `var(--bt-color-summer)`;
      iconStyle["--shape-color"] = alphaColor("var(--bt-color-summer)", 0.2);
    } else if (eco) {
      iconStyle["--icon-color"] = `var(--bt-color-eco)`;
      iconStyle["--shape-color"] = alphaColor("var(--bt-color-eco)", 0.2);
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

  protected renderBadge(entity: BtClimateEntity) {
    const unavailable = !isAvailable(entity);
    if (unavailable) {
      return super.renderBadge(entity);
    }

    const lowBattery = getLowBattery(entity, this._config);
    const errorEntityId = getErrorEntityId(entity, this._config);
    const degradedMode = isDegraded(entity, this._config);
    if (degradedMode) {
      return html`
        <mushroom-badge-icon
          slot="badge"
          .icon=${"mdi:alert"}
          title=${localize({
            hass: this.hass,
            string: "extra_states.degraded_mode",
          })}
          @click=${(ev: Event) => {
            ev.stopPropagation();
            ev.preventDefault();
            this.dispatchEvent(
              new CustomEvent("hass-more-info", {
                detail: { entityId: entity.entity_id },
                bubbles: true,
                composed: true,
              }),
            );
          }}
          style=${styleMap({
            "--icon-color": "var(--warning-color, #ffc107)",
            "--main-color": "var(--bt-badge-background)",
            border: "1px solid var(--warning-color, #ffc107)",
            borderRadius: "50%",
          })}
        ></mushroom-badge-icon>
      `;
    }
    if (errorEntityId) {
      return html`
        <mushroom-badge-icon
          slot="badge"
          .icon=${"mdi:wifi-strength-off-outline"}
          title=${localize({
            hass: this.hass,
            string: "extra_states.connection_lost",
            search: "{name}",
            replace:
              this.hass?.states?.[errorEntityId]?.attributes?.friendly_name ??
              errorEntityId,
          })}
          @click=${(ev: Event) => this._handleErrorClick(ev, errorEntityId)}
          style=${styleMap({
            "--icon-color": "var(--error-color, #f44336)",
            "--main-color": "var(--bt-badge-background)",
            border: "1px solid var(--error-color, #f44336)",
            borderRadius: "50%",
          })}
        ></mushroom-badge-icon>
      `;
    }

    if (lowBattery) {
      return html`
        <mushroom-badge-icon
          slot="badge"
          .icon=${"mdi:battery-alert"}
          title=${localize({
            hass: this.hass,
            string: "extra_states.low_battery",
            search: "{name}",
            replace: lowBattery.name,
          })}
          @click=${(ev: Event) => this._handleLowBatteryClick(ev, lowBattery)}
          style=${styleMap({
            "--icon-color": "var(--error-color, #f44336)",
            "--main-color": "var(--bt-badge-background)",
            border: "1px solid var(--error-color, #f44336)",
            borderRadius: "50%",
          })}
        ></mushroom-badge-icon>
      `;
    }

    return this.renderActionBadge(entity);
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
      }),
    );
  }

  private _handleLowBatteryClick(ev: Event, lowBattery: LowBatteryEntity) {
    ev.stopPropagation();
    ev.preventDefault();

    const entityId = lowBattery?.name;
    if (!entityId) return;

    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  renderActionBadge(entity: BtClimateEntity) {
    const hvac_action = entity.attributes.hvac_action;
    const windowOpen = isWindowOpen(this.hass, entity, this._config);
    const summer = entity.attributes.call_for_heat === false;

    // Non BT entities may not report hvac_action at all — still show the
    // badge when the configured window sensor reports open.
    if ((!hvac_action || hvac_action === "off") && !windowOpen && !summer)
      return nothing;

    let icon = getHvacActionIcon(hvac_action || "off");
    if (windowOpen) {
      icon = "mdi:window-open-variant";
    } else if (summer) {
      icon = "mdi:white-balance-sunny";
    }

    if (!icon) return nothing;

    let finalColor = climateActionColor(hvac_action || "off");
    if (summer && !windowOpen) finalColor = "var(--bt-color-summer)";

    return html`
      <mushroom-badge-icon
        slot="badge"
        .icon=${icon}
        style=${styleMap({
          "--icon-color": windowOpen ? `var(--info-color)` : finalColor,
          "--main-color": "var(--bt-badge-background)",
          border: `1px solid ${windowOpen ? `var(--info-color)` : finalColor}`,
          borderRadius: "50%",
        })}
      ></mushroom-badge-icon>
    `;
  }

  private renderOtherControls(): TemplateResult | null {
    const otherControls = this._controls.filter(
      (control) => control != this._activeControl,
    );

    return html`
      ${otherControls.map(
        (ctrl) => html`
          <mushroom-button @click=${(e: Event) => this._onControlTap(ctrl, e)}>
            <ha-icon .icon=${CONTROLS_ICONS[ctrl]}></ha-icon>
          </mushroom-button>
        `,
      )}
    `;
  }

  private renderPresetFeature(entity: BtClimateEntity) {
    if (this._config?.disable_presets) return nothing;
    const presetMode = entity.attributes.preset_mode;
    const mode =
      presetMode != null && presetMode !== "none" ? presetMode : "none";
    const iconStyle: StyleInfo = {};
    const color = climateColor(mode);
    const selectedMode =
      presetMode != null && presetMode !== "none" ? presetMode : mode;
    if (presetMode != null && presetMode !== "none") {
      iconStyle["--icon-color"] = color;
      iconStyle["--bg-color"] = alphaColor(color, 0.2);
    }
    const icon = getHvacModeIcon(mode as HvacMode);

    const presets =
      entity.attributes.preset_modes?.filter((p) => p != "none") ||
      ([] as HvacMode[]);
    if (presets.length === 1) {
      return html`
        <mushroom-button
          style=${styleMap(iconStyle)}
          .mode=${selectedMode}
          .actionHandler=${actionHandler({ hasHold: true })}
          @action=${(e: ActionHandlerEvent) => {
            e.stopPropagation();
            if (e.detail.action === "hold") {
              this._presetOverlay.setOpen(true);
            } else if (e.detail.action === "tap") {
              this.triggerModeChange(presets[0]);
            }
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
          .actionHandler=${actionHandler({ hasHold: true })}
          @action=${(e: ActionHandlerEvent) => {
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

  private triggerModeChange(mode: string) {
    const stateObj = this._stateObj;
    if (!stateObj) return;
    if (setClimateMode(this.hass, stateObj, mode)) {
      this._presetOverlay.setOpen(false);
    }
  }

  private renderActiveControl(entity: BtClimateEntity) {
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
      btStateColorsStyle,
      climateColorDefaultStyles,
      presetOverlayStyle,
      btAnimationsStyle,
      css`
        :host {
          --rgb-state-climate-heat: 244, 99, 108;

          --bt-state-window: var(--info-color);
        }
        :host > * {
          overflow: hidden;
        }
        :host > *::before {
          display: block;
          content: "";
          position: absolute;
          right: -10%;
          bottom: -10%;
          background: radial-gradient(
            100% 60% at 50% 90%,
            var(--action-color, transparent) 0%,
            transparent 100%
          );
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
        /* Base overlay skeleton comes from the shared presetOverlayStyle. */
        .preset-select {
          justify-content: space-evenly;
          gap: 15px;
          padding: 0 1em 0em 1em;
          background-color: rgba(var(--rgb-card-background-color), 0.3);
        }
      `,
    ];
  }
}
