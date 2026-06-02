import { html, LitElement, TemplateResult, nothing, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  ClimateEntity,
  compareClimateHvacModes,
  computeRTL,
  HomeAssistant,
  HvacMode,
  isAvailable,
} from "mushroom-cards/src/ha";
import { ensureElementLoaded } from "../../utils/ensure-element-loaded";
import { getHvacModeColor, getHvacModeIcon } from "../utils";

export const isHvacModesVisible = (entity: ClimateEntity, modes?: HvacMode[]) =>
  modes === undefined
    ? (entity.attributes.hvac_modes || []).length > 0
    : (entity.attributes.hvac_modes || []).some((mode) =>
        modes.includes(mode)
      );

@customElement("mushroom-climate-hvac-modes-control")
export class ClimateHvacModesControl extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) public entity!: ClimateEntity;

  @property({ attribute: false }) public modes!: HvacMode[];

  @property() public fill: boolean = false;

  @property({ type: Boolean, attribute: "disable-eco" })
  public disableEco: boolean = false;

  @property({ attribute: false })
  public feature?: TemplateResult;

  private callService(e: CustomEvent) {
    e.stopPropagation();
    const mode = (e.currentTarget! as any).mode as HvacMode;
    this.hass.callService("climate", "set_hvac_mode", {
      entity_id: this.entity!.entity_id,
      hvac_mode: mode,
    });
  }

  private toggleEco(e: CustomEvent) {
    e.stopPropagation();
    // Prefer the preset-based flow introduced in better_thermostat >= 1.8.0.
    // Toggle the 'eco' preset if available, otherwise fall back to legacy flag.
    const presetMode = (this.entity.attributes as any).preset_mode;
    const hasEcoPreset = (this.entity.attributes as any).preset_modes?.includes("eco");
    const isEco = presetMode === "eco" || (this.entity.attributes as any).eco_mode === true;

    if (hasEcoPreset) {
      const newMode = isEco ? "none" : "eco";
      this.hass.callService("climate", "set_preset_mode", {
        entity_id: this.entity!.entity_id,
        preset_mode: newMode,
      });
    } else {
      // Fallback for older integrations: toggle the legacy attribute via integration service
      this.hass.callService("better_thermostat", "set_eco_mode", {
        entity_id: this.entity!.entity_id,
        enable: !isEco,
      });
    }
  }

  private renderEcoButton() {
    const isEco = (this.entity.attributes as any).eco_mode === true;
    const iconStyle = {};
    if (isEco) {
      iconStyle["--icon-color"] = `rgb(var(--bt-state-eco))`;
      iconStyle["--bg-color"] = `rgba(var(--bt-state-eco), 0.2)`;
    }

    return html`
      <mushroom-button
        style=${styleMap(iconStyle)}
        .disabled=${!isAvailable(this.entity)}
        @click=${this.toggleEco}
      >
        <ha-icon icon="mdi:leaf"></ha-icon>
      </mushroom-button>
    `;
  }

  protected render(): TemplateResult {
    const rtl = computeRTL(this.hass);

    const modes = (this.entity.attributes.hvac_modes ?? [])
      .filter((mode) => (this.modes ?? []).includes(mode))
      .sort(compareClimateHvacModes);

    const presetModes = this.entity.attributes.preset_modes || [];
    const hasEco = (presetModes.includes("eco") || (this.entity.attributes as any).eco_mode === true) && !this.disableEco;

    return html`
      <mushroom-button-group .fill=${this.fill} ?rtl=${rtl}>
        ${modes.map((mode) => {
          if (mode === "off" && hasEco) {
            return html`${this.feature ?? this.renderEcoButton()}${this.renderModeButton(mode)}`;
          }
          return this.renderModeButton(mode);
        })}
        ${hasEco && !modes.includes("off") ? (this.feature ?? this.renderEcoButton()) : nothing}
      </mushroom-button-group>
    `;
  }

  private renderModeButton(mode: HvacMode) {
    const iconStyle = {};
    const color = mode === "off" ? "var(--rgb-grey)" : getHvacModeColor(mode);
    if (mode === this.entity.state) {
      iconStyle["--icon-color"] = `rgb(${color})`;
      iconStyle["--bg-color"] = `rgba(${color}, 0.2)`;
    }

    return html`
      <mushroom-button
        style=${styleMap(iconStyle)}
        .mode=${mode}
        .disabled=${!isAvailable(this.entity)}
        @click=${this.callService}
      >
        <ha-icon .icon=${getHvacModeIcon(mode)}></ha-icon>
      </mushroom-button>
    `;
  }

  protected async firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    await Promise.all([
      ensureElementLoaded("mushroom-button", "mushroom-cards/src/shared/button"),
      ensureElementLoaded("mushroom-button-group", "mushroom-cards/src/shared/button-group"),
    ]);
    this.requestUpdate();
  }
}
