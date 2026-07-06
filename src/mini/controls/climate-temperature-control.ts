import { html, LitElement, nothing, TemplateResult, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  computeRTL,
  HomeAssistant,
  isAvailable,
  UNIT_F,
} from "mushroom-cards/src/ha";
import { ensureElementLoaded } from "../../shared/ensure-element-loaded";
import {
  BtClimateEntity,
  ClimateEntityFeature,
  supportsFeature,
} from "../../shared/climate";
import { alphaColor } from "../../shared/color";

// HA core's guard: the feature bit AND a non-null value — key presence alone
// is not enough (integrations report temperature: null in fan_only/dry).
export const isTemperatureControlVisible = (entity: BtClimateEntity) =>
  (supportsFeature(entity, ClimateEntityFeature.TARGET_TEMPERATURE) &&
    entity.attributes.temperature != null) ||
  (supportsFeature(entity, ClimateEntityFeature.TARGET_TEMPERATURE_RANGE) &&
    entity.attributes.target_temp_low != null &&
    entity.attributes.target_temp_high != null);

@customElement("mushroom-climate-temperature-control")
export class ClimateTemperatureControl extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) public entity!: BtClimateEntity;

  @property() public fill: boolean = false;

  private get _stepSize(): number {
    if (this.entity.attributes.target_temp_step) {
      return this.entity.attributes.target_temp_step;
    }
    return this.hass!.config.unit_system.temperature === UNIT_F ? 1 : 0.5;
  }

  onValueChange(e: CustomEvent<{ value: number }>): void {
    const value = e.detail.value;
    this.hass!.callService("climate", "set_temperature", {
      entity_id: this.entity.entity_id,
      temperature: value,
    });
  }

  onLowValueChange(e: CustomEvent<{ value: number }>): void {
    const value = e.detail.value;
    this.hass!.callService("climate", "set_temperature", {
      entity_id: this.entity.entity_id,
      target_temp_low: value,
      target_temp_high: this.entity.attributes.target_temp_high,
    });
  }

  onHighValueChange(e: CustomEvent<{ value: number }>): void {
    const value = e.detail.value;
    this.hass!.callService("climate", "set_temperature", {
      entity_id: this.entity.entity_id,
      target_temp_low: this.entity.attributes.target_temp_low,
      target_temp_high: value,
    });
  }

  protected render(): TemplateResult {
    const rtl = computeRTL(this.hass);

    const available = isAvailable(this.entity);

    const min = this.entity.attributes.min_temp ?? 0;
    const max = this.entity.attributes.max_temp ?? 100;
    const supportsValue =
      supportsFeature(this.entity, ClimateEntityFeature.TARGET_TEMPERATURE) &&
      this.entity.attributes.temperature != null;
    const supportsRange =
      supportsFeature(
        this.entity,
        ClimateEntityFeature.TARGET_TEMPERATURE_RANGE,
      ) &&
      this.entity.attributes.target_temp_low != null &&
      this.entity.attributes.target_temp_high != null;
    const value = this.entity.attributes.temperature ?? min;
    const low = this.entity.attributes.target_temp_low ?? min;
    const high = this.entity.attributes.target_temp_high ?? max;

    const formatOptions: Intl.NumberFormatOptions =
      this._stepSize === 1
        ? {
            maximumFractionDigits: 0,
          }
        : {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          };

    // Reads the inherited --bt-color-* layer: the mini card recolors
    // --bt-color-heat to the active preset instead of reassigning triplets.
    const modeStyle = (mode: "heat" | "cool") => ({
      "--bg-color": alphaColor(`var(--bt-color-${mode})`, 0.05),
      "--icon-color": `var(--bt-color-${mode})`,
      "--text-color": `var(--bt-color-${mode})`,
    });

    return html`
      <mushroom-button-group .fill=${this.fill} ?rtl=${rtl}>
        ${supportsValue
          ? html`
              <mushroom-input-number
                .locale=${this.hass.locale}
                .value=${value}
                .step=${this._stepSize}
                .min=${min}
                .max=${max}
                .disabled=${!available}
                .formatOptions=${formatOptions}
                @change=${this.onValueChange}
              ></mushroom-input-number>
            `
          : nothing}
        ${supportsRange
          ? html`
              <mushroom-input-number
                style=${styleMap(modeStyle("heat"))}
                .locale=${this.hass.locale}
                .value=${low}
                .step=${this._stepSize}
                .min=${min}
                .max=${max}
                .disabled=${!available}
                .formatOptions=${formatOptions}
                @change=${this.onLowValueChange}
              ></mushroom-input-number
              ><mushroom-input-number
                style=${styleMap(modeStyle("cool"))}
                .locale=${this.hass.locale}
                .value=${high}
                .step=${this._stepSize}
                .min=${min}
                .max=${max}
                .disabled=${!available}
                .formatOptions=${formatOptions}
                @change=${this.onHighValueChange}
              ></mushroom-input-number>
            `
          : nothing}
      </mushroom-button-group>
    `;
  }

  protected async firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    await Promise.all([
      ensureElementLoaded(
        "mushroom-button",
        () => import("mushroom-cards/src/shared/button"),
      ),
      ensureElementLoaded(
        "mushroom-button-group",
        () => import("mushroom-cards/src/shared/button-group"),
      ),
      ensureElementLoaded(
        "mushroom-input-number",
        () => import("mushroom-cards/src/shared/input-number"),
      ),
    ]);
  }
}
