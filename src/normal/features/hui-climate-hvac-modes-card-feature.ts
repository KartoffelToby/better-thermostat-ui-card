import type { PropertyValues } from "lit";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import "../components/cts-ha-control-select";
import type { ControlSelectOption } from "../components/cts-ha-control-select";
import { stateColorCss } from "../../shared/state-color";
import { BtClimateEntity, UNAVAILABLE } from "../../shared/climate";
import { compareClimateHvacModes, HomeAssistant } from "mushroom-cards/src/ha";
import { getHvacModeIcon } from "../../shared/climate-colors";
import type {
  ClimateHvacModesCardFeatureConfig,
  LovelaceCardFeature,
  LovelaceCardFeatureContext,
} from "./types";

export const supportsClimateHvacModesCardFeature = (
  hass: HomeAssistant,
  context: LovelaceCardFeatureContext
): boolean => {
  const stateObj = context.entity_id
    ? hass.states[context.entity_id]
    : undefined;
  if (!stateObj) {
    return false;
  }
  return stateObj.entity_id.startsWith("climate.");
};

const filterModes = (modes: string[] | undefined, configured?: string[]) => {
  if (!modes) {
    return [];
  }
  return configured
    ? configured.filter((mode) => modes.includes(mode))
    : modes;
};

@customElement("cts-hui-climate-hvac-modes-card-feature")
export class HuiClimateHvacModesCardFeature
  extends LitElement
  implements LovelaceCardFeature
{
  @property({ attribute: false }) public hass?: HomeAssistant;

  @property({ attribute: false }) public context?: LovelaceCardFeatureContext;

  @property({ attribute: false }) public color?: string;

  @state() private _config?: ClimateHvacModesCardFeatureConfig;

  @state() private _currentHvacMode?: string;

  static getStubConfig(): ClimateHvacModesCardFeatureConfig {
    return { type: "climate-hvac-modes" };
  }

  public setConfig(config: ClimateHvacModesCardFeatureConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = config;
  }

  private get _stateObj(): BtClimateEntity | undefined {
    if (!this.hass || !this.context?.entity_id) {
      return undefined;
    }
    return this.hass.states[this.context.entity_id] as BtClimateEntity | undefined;
  }

  protected willUpdate(changedProps: PropertyValues): void {
    if (
      (changedProps.has("hass") || changedProps.has("context")) &&
      this._stateObj
    ) {
      const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
      const oldStateObj = this.context?.entity_id
        ? (oldHass?.states[this.context.entity_id] as BtClimateEntity | undefined)
        : undefined;
      if (oldStateObj !== this._stateObj) {
        this._currentHvacMode = this._stateObj.state;
      }
    }
  }

  private _valueChanged(ev: CustomEvent) {
    const mode = (ev.detail as { value: string }).value;
    const stateObj = this._stateObj;
    if (!stateObj || !this.hass || mode === stateObj.state) {
      return;
    }
    const previous = this._currentHvacMode;
    this._currentHvacMode = mode; // optimistic update
    this.hass
      .callService("climate", "set_hvac_mode", {
        entity_id: stateObj.entity_id,
        hvac_mode: mode,
      })
      .catch(() => {
        this._currentHvacMode = previous;
      });
  }

  protected render() {
    if (
      !this._config ||
      !this.hass ||
      !this.context ||
      !this._stateObj ||
      !supportsClimateHvacModesCardFeature(this.hass, this.context)
    ) {
      return nothing;
    }

    const stateObj = this._stateObj;

    const orderedModes = (stateObj.attributes.hvac_modes || [])
      .concat()
      .sort(compareClimateHvacModes)
      .reverse();

    const options: ControlSelectOption[] = filterModes(
      orderedModes,
      this._config.hvac_modes
    ).map((mode) => ({
      value: mode,
      label: this.hass!.formatEntityState(stateObj, mode),
      path: getHvacModeIcon(mode).replace("mdi:", ""), // fallback if path doesn't work directly
      icon: html`<ha-icon .icon=${getHvacModeIcon(mode)}></ha-icon>`,
    }));

    return html`
      <cts-ha-control-select
        .options=${options}
        .value=${this._currentHvacMode}
        @value-changed=${this._valueChanged}
        hide-option-label
        .label=${this.hass.localize("ui.card.climate.mode")}
        style=${styleMap({ "--control-select-color": stateColorCss(stateObj) })}
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
    "cts-hui-climate-hvac-modes-card-feature": HuiClimateHvacModesCardFeature;
  }
}
