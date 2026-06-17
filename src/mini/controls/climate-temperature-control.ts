import { html, LitElement, nothing, TemplateResult, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  ClimateEntity,
  computeRTL,
  HomeAssistant,
  isAvailable,
  UNIT_F,
} from "mushroom-cards/src/ha";
import { ensureElementLoaded } from "../../utils/ensure-element-loaded";

export const isTemperatureControlVisible = (entity: ClimateEntity) =>
  "temperature" in entity.attributes ||
  ("target_temp_low" in entity.attributes &&
    "target_temp_high" in entity.attributes);

@customElement("mushroom-climate-temperature-control")
export class ClimateTemperatureControl extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) public entity!: ClimateEntity;

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
    const supportsValue = "temperature" in this.entity.attributes;
    const supportsRange =
      "target_temp_low" in this.entity.attributes &&
      "target_temp_high" in this.entity.attributes;
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

    const modeStyle = (mode: "heat" | "cool") => ({
      "--bg-color": `rgba(var(--rgb-state-climate-${mode}), 0.05)`,
      "--icon-color": `rgb(var(--rgb-state-climate-${mode}))`,
      "--text-color": `rgb(var(--rgb-state-climate-${mode}))`,
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
      (async () => {
        if (!customElements.get("mushroom-button"))
          await import("mushroom-cards/src/shared/button");
      })(),
      (async () => {
        if (!customElements.get("mushroom-button-group"))
          await import("mushroom-cards/src/shared/button-group");
      })(),
      (async () => {
        if (!customElements.get("mushroom-input-number"))
          await import("mushroom-cards/src/shared/input-number");
      })(),
    ]);
  }
}
