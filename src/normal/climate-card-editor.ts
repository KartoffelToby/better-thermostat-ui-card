import { css, CSSResultGroup, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LovelaceCardEditor } from "mushroom-cards/src/ha";
import setupMushroomLocalize from "mushroom-cards/src/localize";
import setupCustomlocalize from "../localize/localize";
import { GENERIC_LABELS } from "mushroom-cards/src/utils/form/generic-fields";
import { MushroomBaseElement } from "mushroom-cards/src/utils/base-element";
import { HaFormSchema } from "mushroom-cards/src/utils/form/ha-form";
import { BetterThermostatUINormalCardConfig } from "./climate-card-config";
import { CLIMATE_CARD_EDITOR_NAME, CLIMATE_ENTITY_DOMAINS } from "./const";
import { mdiEye, mdiGestureTap, mdiTune, mdiAlert } from "@mdi/js";

const CLIMATE_LABELS = [
  "show_current_as_primary", "show_secondary",
  "disable_buttons", "disable_menu", "prevent_interaction_on_scroll",
  "disable_eco", "disable_humidity",
  "disable_battery_warning", "disable_connection_lost_warning", "disable_degraded_warning",
  "low_battery_threshold",
  "section_display", "section_interaction", "section_features", "section_warnings",
] as string[];

const SCHEMA: HaFormSchema[] = [
  { name: "entity", selector: { entity: { domain: CLIMATE_ENTITY_DOMAINS } } },
  { name: "name", selector: { text: {} } },
  {
    name: "section_display",
    type: "expandable",
    flatten: true,
    expanded: true,
    iconPath: mdiEye,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_current_as_primary", selector: { boolean: {} } },
          { name: "show_secondary", selector: { boolean: {} } },
        ],
      },
    ],
  } as any,
  {
    name: "section_interaction",
    type: "expandable",
    flatten: true,
    iconPath: mdiGestureTap,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          { name: "disable_buttons", selector: { boolean: {} } },
          { name: "disable_menu", selector: { boolean: {} } },
          { name: "prevent_interaction_on_scroll", selector: { boolean: {} } },
        ],
      },
    ],
  } as any,
  {
    name: "section_features",
    type: "expandable",
    flatten: true,
    iconPath: mdiTune,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          { name: "disable_eco", selector: { boolean: {} } },
          { name: "disable_humidity", selector: { boolean: {} } },
        ],
      },
    ],
  } as any,
  {
    name: "section_warnings",
    type: "expandable",
    flatten: true,
    iconPath: mdiAlert,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          { name: "disable_battery_warning", selector: { boolean: {} } },
          { name: "disable_connection_lost_warning", selector: { boolean: {} } },
          { name: "disable_degraded_warning", selector: { boolean: {} } },
        ],
      },
      { name: "low_battery_threshold", default: 10, selector: { number: { min: 0, max: 100, step: 1, mode: "box", unit_of_measurement: "%" } } },
    ],
  } as any,
];

@customElement(CLIMATE_CARD_EDITOR_NAME)
export class NormalClimateCardEditor extends MushroomBaseElement implements LovelaceCardEditor {
  @state() private _config?: BetterThermostatUINormalCardConfig;

  static get styles(): CSSResultGroup {
    const base = super.styles;
    const baseArray = Array.isArray(base) ? base : base ? [base] : [];
    return [
      ...baseArray,
      css`
        :host {
          display: block;
          padding-bottom: 16px;
        }
      `,
    ];
  }

  public setConfig(config: BetterThermostatUINormalCardConfig): void {
    this._config = config;
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
        .data=${{ ...this._config, low_battery_threshold: this._config?.low_battery_threshold ?? 10 } as any}
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