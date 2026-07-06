import type { PropertyValues } from "lit";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import "../components/cts-ha-control-select";
import type { ControlSelectOption } from "../components/cts-ha-control-select";
import {
  BtClimateEntity,
  ClimateEntityFeature,
  UNAVAILABLE,
  supportsFeature,
} from "../../shared/climate";
import { HomeAssistant } from "mushroom-cards/src/ha";
import {
  climateStateColor,
  getHvacModeIcon,
} from "../../shared/climate-colors";
import { filterModes } from "./types";
import type {
  ClimatePresetModesCardFeatureConfig,
  LovelaceCardFeature,
  LovelaceCardFeatureContext,
} from "./types";

export const supportsClimatePresetModesCardFeature = (
  hass: HomeAssistant,
  context: LovelaceCardFeatureContext,
): boolean => {
  const stateObj = context.entity_id
    ? hass.states[context.entity_id]
    : undefined;
  if (!stateObj) {
    return false;
  }
  return (
    stateObj.entity_id.startsWith("climate.") &&
    supportsFeature(stateObj, ClimateEntityFeature.PRESET_MODE)
  );
};

@customElement("cts-hui-climate-preset-modes-card-feature")
export class HuiClimatePresetModesCardFeature
  extends LitElement
  implements LovelaceCardFeature
{
  @property({ attribute: false }) public hass?: HomeAssistant;

  @property({ attribute: false }) public context?: LovelaceCardFeatureContext;

  @property({ attribute: false }) public color?: string;

  @state() private _config?: ClimatePresetModesCardFeatureConfig;

  @state() private _currentPresetMode?: string;

  static getStubConfig(): ClimatePresetModesCardFeatureConfig {
    return { type: "climate-preset-modes" };
  }

  public setConfig(config: ClimatePresetModesCardFeatureConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = config;
  }

  private get _stateObj(): BtClimateEntity | undefined {
    if (!this.hass || !this.context?.entity_id) {
      return undefined;
    }
    return this.hass.states[this.context.entity_id] as
      | BtClimateEntity
      | undefined;
  }

  protected willUpdate(changedProps: PropertyValues): void {
    if (
      (changedProps.has("hass") || changedProps.has("context")) &&
      this._stateObj
    ) {
      const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
      const oldStateObj = this.context?.entity_id
        ? (oldHass?.states[this.context.entity_id] as
            | BtClimateEntity
            | undefined)
        : undefined;
      if (oldStateObj !== this._stateObj) {
        this._currentPresetMode = this._stateObj.attributes.preset_mode;
      }
    }
  }

  private _valueChanged(ev: CustomEvent) {
    const mode = (ev.detail as { value: string }).value;
    const stateObj = this._stateObj;
    if (!stateObj || !this.hass || mode === stateObj.attributes.preset_mode) {
      return;
    }
    const previous = this._currentPresetMode;
    this._currentPresetMode = mode; // optimistic update
    this.hass
      .callService("climate", "set_preset_mode", {
        entity_id: stateObj.entity_id,
        preset_mode: mode,
      })
      .catch(() => {
        this._currentPresetMode = previous;
      });
  }

  protected render() {
    if (
      !this._config ||
      !this.hass ||
      !this.context ||
      !this._stateObj ||
      !supportsClimatePresetModesCardFeature(this.hass, this.context)
    ) {
      return nothing;
    }

    const stateObj = this._stateObj;

    const options: ControlSelectOption[] = filterModes(
      stateObj.attributes.preset_modes,
      this._config.preset_modes,
    ).map((mode) => ({
      value: mode,
      label: this.hass!.formatEntityAttributeValue(
        stateObj,
        "preset_mode",
        mode,
      ),
      icon: html`<ha-icon .icon=${getHvacModeIcon(mode)}></ha-icon>`,
    }));

    return html`
      <cts-ha-control-select
        .options=${options}
        .value=${this._currentPresetMode}
        @value-changed=${this._valueChanged}
        ?hide-option-label=${this._config.style === "icons"}
        .label=${this.hass.localize("ui.card.climate.preset_mode")}
        style=${styleMap({
          "--control-select-color": climateStateColor(stateObj),
        })}
        .disabled=${stateObj.state === UNAVAILABLE}
      ></cts-ha-control-select>
    `;
  }

  static styles = css`
    :host {
      display: block;
      --control-select-color: var(--feature-color, var(--state-icon-color));
      --control-select-padding: 0;
      --control-select-thickness: 40px;
      --control-select-border-radius: 12px;
      --control-select-button-border-radius: 10px;
      --mdc-icon-size: 20px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "cts-hui-climate-preset-modes-card-feature": HuiClimatePresetModesCardFeature;
  }
}
