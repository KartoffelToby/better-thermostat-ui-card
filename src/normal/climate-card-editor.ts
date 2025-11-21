import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LovelaceCardEditor } from "mushroom-cards/src/ha";
import setupCustomlocalize from "../localize/localize";
import { MushroomBaseElement } from "mushroom-cards/src/utils/base-element";
import { HaFormSchema } from "mushroom-cards/src/utils/form/ha-form";
import { BetterThermostatUINormalCardConfig, betterThermostatUINormalCardConfigStruct } from "./climate-card-config";
import { CLIMATE_CARD_EDITOR_NAME, CLIMATE_ENTITY_DOMAINS } from "./const";

const SCHEMA: HaFormSchema[] = [
  { name: "entity", selector: { entity: { domain: CLIMATE_ENTITY_DOMAINS } } },
  { name: "show_current_as_primary", selector: { boolean: {} } },
  { name: "show_secondary", selector: { boolean: {} } },
  { name: "disable_buttons", selector: { boolean: {} } },
  { name: "disable_menu", selector: { boolean: {} } },
  { name: "prevent_interaction_on_scroll", selector: { boolean: {} } },
  { name: "disable_eco", selector: { boolean: {} } },
];

@customElement(CLIMATE_CARD_EDITOR_NAME)
export class NormalClimateCardEditor extends MushroomBaseElement implements LovelaceCardEditor {
  @state() private _config?: BetterThermostatUINormalCardConfig;

  public setConfig(config: BetterThermostatUINormalCardConfig): void {
    this._config = betterThermostatUINormalCardConfigStruct.create(config);
  }

  protected render() {
    if (!this.hass) return html``;
    const customLocalize = setupCustomlocalize(this.hass);

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${(schema: HaFormSchema) => {
          if (schema.name === "entity") {
            return this.hass!.localize(
              "ui.panel.lovelace.editor.card.generic.entity"
            );
          }
          return customLocalize(`editor.card.climate.${schema.name}`) || schema.name;
        }}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent) {
    ev.stopPropagation();
    const value = ev.detail.value as BetterThermostatUINormalCardConfig;
    this._config = value;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: value } })
    );
  }
}