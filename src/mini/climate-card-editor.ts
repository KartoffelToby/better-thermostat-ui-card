import { css, CSSResultGroup, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import { fireEvent, LovelaceCardEditor } from "mushroom-cards/src/ha";
import { computeActionsFormSchema } from "mushroom-cards/src/shared/config/actions-config";
import { APPEARANCE_FORM_SCHEMA } from "mushroom-cards/src/shared/config/appearance-config";
import { MushroomBaseElement } from "mushroom-cards/src/utils/base-element";
import { GENERIC_LABELS } from "mushroom-cards/src/utils/form/generic-fields";
import { HaFormSchema } from "mushroom-cards/src/utils/form/ha-form";
import { loadHaComponents } from "mushroom-cards/src/utils/loader";
import { BetterThermostatUISmallCardConfig } from "./climate-card-config";
import { CLIMATE_CARD_EDITOR_NAME, CLIMATE_ENTITY_DOMAINS } from "./const";
import { isBtEntity } from "../shared/bt";
import { createChainedLocalize } from "../shared/localize";
import {
  CLIMATE_LABELS,
  computeColorLabel,
  computeColorsSchema,
  computeDisplaySection,
  computeFeaturesSection,
  computeInteractionSection,
  computeSensorsSection,
  computeWarningsSection,
} from "../shared/editor-schema";

const computeSchema = memoizeOne(
  (isBt: boolean, hvacModes?: string, presetModes?: string): HaFormSchema[] => [
    {
      name: "entity",
      selector: { entity: { domain: CLIMATE_ENTITY_DOMAINS } },
    },
    { name: "name", selector: { text: {} } },
    {
      name: "icon",
      selector: { icon: {} },
      context: { icon_entity: "entity" },
    },
    ...APPEARANCE_FORM_SCHEMA,
    ...(!isBt ? [computeSensorsSection()] : []),
    computeDisplaySection([
      { name: "show_temperature_control" },
      { name: "collapsible_controls" },
    ]),
    computeColorsSchema(hvacModes, presetModes),
    computeInteractionSection(),
    computeFeaturesSection(),
    // Warnings rely on BT-only attributes (batteries, errors, degraded_mode)
    ...(isBt ? [computeWarningsSection(true)] : []),
    ...computeActionsFormSchema(),
  ],
);

@customElement(CLIMATE_CARD_EDITOR_NAME)
export class ClimateCardEditor
  extends MushroomBaseElement
  implements LovelaceCardEditor
{
  @state() private _config?: BetterThermostatUISmallCardConfig;

  static get styles(): CSSResultGroup {
    const base = super.styles;
    return [
      ...(Array.isArray(base) ? base : [base]),
      css`
        :host {
          display: block;
          padding-bottom: 16px;
        }
        ha-alert {
          display: block;
          margin-bottom: 16px;
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
  }

  private get _stateObj() {
    return this._config?.entity
      ? this.hass?.states[this._config.entity]
      : undefined;
  }

  private _computeLabel = (schema: HaFormSchema) => {
    const localize = createChainedLocalize(this.hass!);
    if (schema.name === "colors") {
      return localize("editor.card.climate.section_colors");
    }
    const colorLabel = computeColorLabel(
      this.hass!,
      this._stateObj,
      schema.name,
      localize,
    );
    if (colorLabel !== undefined) return colorLabel;
    if (GENERIC_LABELS.includes(schema.name)) {
      return localize(`editor.card.generic.${schema.name}`);
    }
    if (CLIMATE_LABELS.includes(schema.name)) {
      return localize(`editor.card.climate.${schema.name}`);
    }
    return this.hass!.localize(
      `ui.panel.lovelace.editor.card.generic.${schema.name}`,
    );
  };

  private _computeHelper = (schema: HaFormSchema) =>
    schema.name === "colors"
      ? createChainedLocalize(this.hass!)(
          "editor.card.climate.section_colors_helper",
        )
      : undefined;

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    // Non Better Thermostat entities don't provide window/humidity data via
    // attributes — offer external sensor pickers instead and hide BT-only
    // options. An unresolvable entity is treated as non-BT so typos or
    // unloaded entities don't accidentally show the BT-only form.
    const stateObj = this._stateObj;
    const isBt = stateObj ? isBtEntity(stateObj) : false;
    const entityMissing = !stateObj && !!this._config.entity;
    const schema = computeSchema(
      isBt,
      stateObj ? (stateObj.attributes.hvac_modes ?? []).join(",") : undefined,
      // Only offer colors for the presets the TRV actually exposes.
      stateObj ? (stateObj.attributes.preset_modes ?? []).join(",") : undefined,
    );

    return html`
      ${entityMissing
        ? html`
            <ha-alert alert-type="warning">
              ${this.hass.localize(
                "ui.panel.lovelace.warning.entity_not_found",
                { entity: this._config.entity },
              )}
            </ha-alert>
          `
        : nothing}
      ${stateObj && !isBt
        ? html`
            <ha-alert alert-type="info">
              ${createChainedLocalize(this.hass)(
                "editor.card.climate.not_bt_info",
              )}
            </ha-alert>
          `
        : nothing}
      <ha-form
        .hass=${this.hass}
        .data=${{ low_battery_threshold: 10, ...this._config }}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    const value = { ...(ev.detail.value as BetterThermostatUISmallCardConfig) };
    // ha-form emits colors: {} (or empty-string entries) when pickers are
    // cleared — don't persist that noise in the YAML.
    if (value.colors) {
      const colors = Object.fromEntries(
        Object.entries(value.colors).filter(([, v]) => v),
      );
      if (Object.keys(colors).length === 0) {
        delete value.colors;
      } else {
        value.colors = colors;
      }
    }
    fireEvent(this, "config-changed", { config: value });
  }
}
