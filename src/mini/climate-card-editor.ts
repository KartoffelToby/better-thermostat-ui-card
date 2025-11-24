import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import { assert } from "superstruct";
import { fireEvent, LocalizeFunc, LovelaceCardEditor } from "mushroom-cards/src/ha";
import setupMushroomLocalize from "mushroom-cards/src/localize";
import setupCustomlocalize from "../localize/localize";
import { computeActionsFormSchema } from "mushroom-cards/src/shared/config/actions-config";
import { APPEARANCE_FORM_SCHEMA } from "mushroom-cards/src/shared/config/appearance-config";
import { MushroomBaseElement } from "mushroom-cards/src/utils/base-element";
import { GENERIC_LABELS } from "mushroom-cards/src/utils/form/generic-fields";
import { HaFormSchema } from "mushroom-cards/src/utils/form/ha-form";
import { loadHaComponents } from "mushroom-cards/src/utils/loader";
import {
  BetterThermostatUISmallCardConfig,
  climateCardConfigStruct,
  HVAC_MODES,
} from "./climate-card-config";
import { CLIMATE_CARD_EDITOR_NAME, CLIMATE_ENTITY_DOMAINS } from "./const";

const CLIMATE_LABELS = ["hvac_modes", "show_temperature_control", "disable_eco", "disable_humidity"] as string[];

// Augment Home Assistant DOM events to include config-changed for this editor
declare global {
  interface HASSDomEvents {
    "config-changed": {
      config: BetterThermostatUISmallCardConfig;
    };
  }
}
export {};

const computeSchema = memoizeOne((localize: LocalizeFunc): HaFormSchema[] => [
  { name: "entity", selector: { entity: { domain: CLIMATE_ENTITY_DOMAINS } } },
  { name: "name", selector: { text: {} } },
  { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
  ...APPEARANCE_FORM_SCHEMA,
  {
    type: "grid",
    name: "",
    schema: [
      { name: "show_temperature_control", selector: { boolean: {} } },
      { name: "collapsible_controls", selector: { boolean: {} } },
      { name: "disable_eco", selector: { boolean: {} } },
      { name: "disable_humidity", selector: { boolean: {} } },
    ],
  },
  ...computeActionsFormSchema(),
]);

@customElement(CLIMATE_CARD_EDITOR_NAME)
export class ClimateCardEditor
  extends MushroomBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: BetterThermostatUISmallCardConfig;

  connectedCallback() {
    super.connectedCallback();
    void loadHaComponents();
  }

  public setConfig(config: BetterThermostatUISmallCardConfig): void {
    assert(config, climateCardConfigStruct);
    this._config = config;
  }

  private _computeLabel = (schema: HaFormSchema) => {
    const customLocalize = setupCustomlocalize(this.hass as any);
    const mushroomLocalize = setupMushroomLocalize(this.hass!);

    const localize = (key: string) => {
      const custom = customLocalize(key);
      if (custom && custom !== key) return custom;
      return mushroomLocalize(key);
    };

    if (GENERIC_LABELS.includes(schema.name)) {
      return localize(`editor.card.generic.${schema.name}`);
    }
    if (CLIMATE_LABELS.includes(schema.name)) {
      return localize(`editor.card.climate.${schema.name}`);
    }
    return this.hass!.localize(
      `ui.panel.lovelace.editor.card.generic.${schema.name}`
    );
  };

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    const schema = computeSchema(this.hass!.localize);

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }
}
