import { css, CSSResultGroup, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import { LovelaceCardEditor } from "mushroom-cards/src/ha";
import { GENERIC_LABELS } from "mushroom-cards/src/utils/form/generic-fields";
import { MushroomBaseElement } from "mushroom-cards/src/utils/base-element";
import { HaFormSchema } from "mushroom-cards/src/utils/form/ha-form";
import { loadHaComponents } from "mushroom-cards/src/utils/loader";
import { BetterThermostatUINormalCardConfig } from "./climate-card-config";
import { CLIMATE_CARD_EDITOR_NAME, CLIMATE_ENTITY_DOMAINS } from "./const";
import { isBtEntity } from "../shared/bt";
import { createChainedLocalize } from "../shared/localize";
import {
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
    ...(!isBt ? [computeSensorsSection()] : []),
    computeDisplaySection([
      { name: "show_current_as_primary" },
      { name: "show_secondary" },
    ]),
    computeColorsSchema(hvacModes, presetModes),
    computeInteractionSection(),
    computeFeaturesSection(),
    // Warnings rely on BT-only attributes (batteries, errors, degraded_mode)
    ...(isBt ? [computeWarningsSection(true)] : []),
  ],
);

@customElement(CLIMATE_CARD_EDITOR_NAME)
export class NormalClimateCardEditor
  extends MushroomBaseElement
  implements LovelaceCardEditor
{
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

  public setConfig(config: BetterThermostatUINormalCardConfig): void {
    this._config = config;
  }

  protected render() {
    if (!this.hass) return html``;
    const localize = createChainedLocalize(this.hass);

    // Non Better Thermostat entities don't provide window/humidity data via
    // attributes — offer external sensor pickers instead and hide BT-only
    // options. Without a resolvable entity, fall back to the full BT form.
    const stateObj = this._config?.entity
      ? this.hass.states[this._config.entity]
      : undefined;
    const isBt = !stateObj || isBtEntity(stateObj);
    const schema = computeSchema(
      isBt,
      stateObj ? (stateObj.attributes.hvac_modes ?? []).join(",") : undefined,
      // Only offer colors for the presets the TRV actually exposes.
      stateObj ? (stateObj.attributes.preset_modes ?? []).join(",") : undefined,
    );

    return html`
      ${!isBt
        ? html`
            <ha-alert alert-type="info">
              ${localize("editor.card.climate.not_bt_info")}
            </ha-alert>
          `
        : ""}
      <ha-form
        .hass=${this.hass}
        .data=${{
          ...this._config,
          low_battery_threshold: this._config?.low_battery_threshold ?? 10,
        }}
        .schema=${schema}
        .computeLabel=${(schema: HaFormSchema) => {
          if (schema.name === "entity") {
            // Use the same localize chain to ensure the generic translation
            return (
              localize("ui.panel.lovelace.editor.card.generic.entity") ||
              schema.name
            );
          }
          if (schema.name === "colors") {
            return (
              localize("editor.card.climate.section_colors") || schema.name
            );
          }
          const colorLabel = computeColorLabel(
            this.hass!,
            stateObj,
            schema.name,
            localize,
          );
          if (colorLabel !== undefined) return colorLabel;
          if (GENERIC_LABELS.includes(schema.name)) {
            return (
              localize(`editor.card.generic.${schema.name}`) || schema.name
            );
          }
          return localize(`editor.card.climate.${schema.name}`) || schema.name;
        }}
        .computeHelper=${(schema: HaFormSchema) =>
          schema.name === "colors"
            ? localize("editor.card.climate.section_colors_helper")
            : undefined}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent) {
    ev.stopPropagation();
    const value = {
      ...(ev.detail.value as BetterThermostatUINormalCardConfig),
    };
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
    this._config = value;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
