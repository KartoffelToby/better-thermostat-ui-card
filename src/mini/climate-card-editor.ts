import { css, CSSResultGroup, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import { fireEvent, LovelaceCardEditor } from "mushroom-cards/src/ha";
import setupMushroomLocalize from "mushroom-cards/src/localize";
import setupCustomlocalize from "../localize/localize";
import { computeActionsFormSchema } from "mushroom-cards/src/shared/config/actions-config";
import { APPEARANCE_FORM_SCHEMA } from "mushroom-cards/src/shared/config/appearance-config";
import { MushroomBaseElement } from "mushroom-cards/src/utils/base-element";
import { GENERIC_LABELS } from "mushroom-cards/src/utils/form/generic-fields";
import { HaFormSchema } from "mushroom-cards/src/utils/form/ha-form";
import { loadHaComponents } from "mushroom-cards/src/utils/loader";
import { BetterThermostatUISmallCardConfig } from "./climate-card-config";
import { CLIMATE_CARD_EDITOR_NAME, CLIMATE_ENTITY_DOMAINS } from "./const";
import { mdiEye, mdiGestureTap, mdiTune, mdiAlert } from "@mdi/js";

const CLIMATE_LABELS = [
  "show_temperature_control", "collapsible_controls",
  "show_current_as_primary", "show_secondary",
  "disable_buttons", "disable_menu", "prevent_interaction_on_scroll",
  "disable_eco", "disable_humidity",
  "disable_battery_warning", "disable_connection_lost_warning", "disable_degraded_warning",
  "debug_battery", "debug_connection", "debug_degraded",
  "low_battery_threshold",
  "section_display", "section_interaction", "section_features", "section_warnings",
] as string[];

const computeSchema = memoizeOne((): HaFormSchema[] => [
  { name: "entity", selector: { entity: { domain: CLIMATE_ENTITY_DOMAINS } } },
  { name: "name", selector: { text: {} } },
  { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
  ...APPEARANCE_FORM_SCHEMA,
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
          { name: "show_temperature_control", selector: { boolean: {} } },
          { name: "collapsible_controls", selector: { boolean: {} } },
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
          { name: "debug_battery", selector: { boolean: {} } },
          { name: "debug_connection", selector: { boolean: {} } },
          { name: "debug_degraded", selector: { boolean: {} } },
        ],
      },
      { name: "low_battery_threshold", default: 10, selector: { number: { min: 0, max: 100, step: 1, mode: "box", unit_of_measurement: "%" } } },
    ],
  } as any,
  ...computeActionsFormSchema(),
]);

@customElement(CLIMATE_CARD_EDITOR_NAME)
export class ClimateCardEditor
  extends MushroomBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: BetterThermostatUISmallCardConfig;

  private _localizeCustom?: ReturnType<typeof setupCustomlocalize>;
  private _localizeMushroom?: ReturnType<typeof setupMushroomLocalize>;

  static get styles(): CSSResultGroup {
    const base = super.styles;
    return [
      ...(Array.isArray(base) ? base : [base]),
      css`
        :host {
          display: block;
          padding-bottom: 16px;
        }
      `,
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    void loadHaComponents();
  }

  public setConfig(config: BetterThermostatUISmallCardConfig): void {
    this._config = config;
    // Reset cached localize functions when config changes (hass may differ)
    this._localizeCustom = undefined;
    this._localizeMushroom = undefined;
  }

  private _computeLabel = (schema: HaFormSchema) => {
    if (GENERIC_LABELS.includes(schema.name)) {
      return this._localize(`editor.card.generic.${schema.name}`);
    }
    if (CLIMATE_LABELS.includes(schema.name)) {
      return this._localize(`editor.card.climate.${schema.name}`);
    }
    return this.hass!.localize(
      `ui.panel.lovelace.editor.card.generic.${schema.name}`
    );
  };

  private _localize(key: string): string {
    if (!this._localizeCustom || !this._localizeMushroom) {
      this._localizeCustom = setupCustomlocalize(this.hass as any);
      this._localizeMushroom = setupMushroomLocalize(this.hass!);
    }
    const custom = this._localizeCustom(key);
    if (custom && custom !== key) return custom;
    const mush = this._localizeMushroom(key);
    if (mush && mush !== key) return mush;
    return this.hass!.localize(key);
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    const schema = computeSchema();

    return html`
      <ha-form
        .hass=${this.hass as any}
        .data=${{ low_battery_threshold: 10, ...this._config } as any}
        .schema=${schema as any}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    fireEvent(this as any, "config-changed" as any, { config: ev.detail.value });
  }
}
