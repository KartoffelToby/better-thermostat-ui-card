import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LovelaceCardEditor } from "mushroom-cards/src/ha";
import setupMushroomLocalize from "mushroom-cards/src/localize";
import setupCustomlocalize from "../localize/localize";
import { GENERIC_LABELS } from "mushroom-cards/src/utils/form/generic-fields";
import { MushroomBaseElement } from "mushroom-cards/src/utils/base-element";
import { HaFormSchema } from "mushroom-cards/src/utils/form/ha-form";
import { BetterThermostatUINormalCardConfig, betterThermostatUINormalCardConfigStruct } from "./climate-card-config";
import { CLIMATE_CARD_EDITOR_NAME, CLIMATE_ENTITY_DOMAINS } from "./const";

const SCHEMA: HaFormSchema[] = [
  { name: "entity", selector: { entity: { domain: CLIMATE_ENTITY_DOMAINS } } },
  { name: "name", selector: { text: {} } },
  { name: "show_current_as_primary", selector: { boolean: {} } },
  { name: "show_secondary", selector: { boolean: {} } },
  { name: "disable_buttons", selector: { boolean: {} } },
  { name: "disable_menu", selector: { boolean: {} } },
  { name: "prevent_interaction_on_scroll", selector: { boolean: {} } },
  { name: "disable_eco", selector: { boolean: {} } },
  { name: "disable_humidity", selector: { boolean: {} } },
];

@customElement(CLIMATE_CARD_EDITOR_NAME)
export class NormalClimateCardEditor extends MushroomBaseElement implements LovelaceCardEditor {
  @state() private _config?: BetterThermostatUINormalCardConfig;

  public setConfig(config: BetterThermostatUINormalCardConfig): void {
    this._config = betterThermostatUINormalCardConfigStruct.create(config);
  }

  protected render() {
    if (!this.hass) return html``;
    const customLocalize = setupCustomlocalize(this.hass as any);
    const mushroomLocalize = setupMushroomLocalize(this.hass!);
    const localize = (key: string) => {
      const custom = customLocalize(key);
      if (custom && custom !== key) return custom;
      const mush = mushroomLocalize(key);
      if (mush && mush !== key) return mush;
      return this.hass!.localize(key);
    };

    return html`
      <ha-form
        .hass=${this.hass as any}
        .data=${this._config as any}
        .schema=${SCHEMA as any}
        .computeLabel=${(schema: HaFormSchema) => {
          if (schema.name === "entity") {
            // Use the same localize chain to ensure the generic translation
            return localize("ui.panel.lovelace.editor.card.generic.entity") || schema.name;
          }
          if (GENERIC_LABELS.includes(schema.name)) {
            return localize(`editor.card.generic.${schema.name}`) || schema.name;
          }
          return localize(`editor.card.climate.${schema.name}`) || schema.name;
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