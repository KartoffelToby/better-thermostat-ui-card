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
import "mushroom-cards/src/shared/badge-icon";
import "mushroom-cards/src/shared/card";
import "mushroom-cards/src/shared/shape-avatar";
import "mushroom-cards/src/shared/shape-icon";
import "mushroom-cards/src/shared/state-info";
import "mushroom-cards/src/shared/state-item";
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
} from "./utils";
import { localize } from "../localize/localize";

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
    return {
      type: `custom:${CLIMATE_CARD_NAME}`,
      entity: climates[0],
    };
  }

  @state() private _activeControl?: ClimateCardControl;

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

  _onControlTap(ctrl, e): void {
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
    const window = stateObj.attributes.window_open;
    let stateDisplay = this.hass.formatEntityState(stateObj);
    if (stateObj.attributes.hvac_action && stateObj.attributes.hvac_action !== "off") {
      stateDisplay = this.hass.formatEntityAttributeValue(stateObj, "hvac_action");
    }
    if (stateObj.attributes.current_temperature !== null) {
      const temperature = this.hass.formatEntityAttributeValue(
        stateObj,
        "current_temperature"
      );
      const windowOpen = localize({
        hass: this.hass,
        string: "extra_states.window_open",
      });
      let humidity = "";
      if (stateObj.attributes.current_humidity && !this._config.disable_humidity) {
        humidity = ` ⸱ ${this.hass.formatEntityAttributeValue(
          stateObj,
          "current_humidity"
        )}`;
      }
      stateDisplay += ` ⸱ ${window ? ` (${windowOpen}) ` : ""} ${temperature}${humidity}`;
    }
    const rtl = computeRTL(this.hass);

    const isControlVisible =
      (!this._config.collapsible_controls || isActive(stateObj)) &&
      this._controls.length;

    return html`
      <ha-card
        class=${classMap({ "fill-container": appearance.fill_container })}
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
            ${this.renderStateInfo(stateObj, appearance, name, stateDisplay)};
          </mushroom-state-item>
          ${isControlVisible
            ? html`
                <div class="actions" ?rtl=${rtl}>
                  ${this.renderActiveControl(stateObj)}
                  ${this.renderOtherControls()}
                </div>
              `
            : nothing}
        </mushroom-card>
      </ha-card>
    `;
  }

  protected renderIcon(stateObj: ClimateEntity, icon?: string): TemplateResult {
    const available = isAvailable(stateObj);
    const window = stateObj.attributes.window_open;
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
    } else {
      return this.renderActionBadge(entity);
    }
  }

  renderActionBadge(entity: ClimateEntity) {
    const hvac_action = entity.attributes.hvac_action;
    if (!hvac_action || hvac_action == "off") return nothing;

    const color = getHvacActionColor(hvac_action);
    let icon = getHvacActionIcon(hvac_action);
    const window = entity.attributes.window_open;
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

  private toggleEco(e: CustomEvent) {
    e.stopPropagation();
    const stateObj = this._stateObj;
    if (!stateObj) return;
    const isEco = (stateObj.attributes as any).eco_mode === true;
    this.hass.callService("better_thermostat", "set_eco_mode", {
      entity_id: stateObj.entity_id,
      enable: !isEco,
    });
  }

  private renderEcoButton(entity: ClimateEntity) {
    if (this._config?.disable_eco) return nothing;
    const presetModes = entity.attributes.preset_modes || [];
    const hasEco = presetModes.includes("eco") || (entity.attributes as any).eco_mode !== undefined;
    const isEco = (entity.attributes as any).eco_mode === true;
    
    if (!hasEco && !isEco) return nothing;

    const iconStyle = {};
    const color = "165, 214, 167";
    if (isEco) {
      iconStyle["--icon-color"] = `rgb(${color})`;
      iconStyle["--bg-color"] = `rgba(${color}, 0.2)`;
    }

    return html`
      <mushroom-button
        style=${styleMap(iconStyle)}
        .disabled=${!isAvailable(entity)}
        @click=${this.toggleEco}
      >
        <ha-icon icon="mdi:leaf"></ha-icon>
      </mushroom-button>
    `;
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
          ${this.renderEcoButton(entity)}
        `;
      case "hvac_mode_control":
        return html`
          <mushroom-climate-hvac-modes-control
            .hass=${this.hass}
            .entity=${entity}
            .modes=${hvac_modes}
            .fill=${appearance.layout !== "horizontal"}
            .disableEco=${this._config?.disable_eco}
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
        mushroom-state-item {
          cursor: pointer;
        }
        mushroom-climate-temperature-control,
        mushroom-climate-hvac-modes-control {
          flex: 1;
        }
      `,
    ];
  }
}
