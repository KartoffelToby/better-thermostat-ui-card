import type { PropertyValues } from "lit";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createCardFeatureElement } from "./create-card-feature-element";
import { HomeAssistant } from "mushroom-cards/src/ha";
import type {
  LovelaceCardFeature,
  LovelaceCardFeatureConfig,
  LovelaceCardFeatureContext,
  LovelaceCardFeaturePosition,
} from "./types";

@customElement("cts-hui-card-feature")
export class HuiCardFeature extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @property({ attribute: false }) public context?: LovelaceCardFeatureContext;

  @property({ attribute: false }) public color?: string;

  @property({ attribute: false }) public feature?: LovelaceCardFeatureConfig;

  @property({ attribute: false }) public position?: LovelaceCardFeaturePosition;

  private _element?: LovelaceCardFeature;

  private _getFeatureElement(feature: LovelaceCardFeatureConfig) {
    if (this._element) {
      return this._element;
    }
    this._element = createCardFeatureElement(feature);
    return this._element;
  }

  protected willUpdate(changedProps: PropertyValues): void {
    if (changedProps.has("feature")) {
      this._element = undefined;
      if (this.feature) {
        const el = this._getFeatureElement(this.feature);
        try {
          el?.setConfig(this.feature);
        } catch (_err) {
          this._element = undefined;
        }
      }
    }
  }

  protected render() {
    if (!this.feature || !this._element) {
      return nothing;
    }
    const el = this._element;
    el.hass = this.hass;
    el.context = this.context;
    el.color = this.color;
    (el as any).position = this.position;
    if (this.context?.entity_id && this.hass) {
      (el as any).stateObj = this.hass.states[this.context.entity_id];
    }
    return html`${el}`;
  }

  static styles = css`
    :host {
      display: block;
      pointer-events: auto;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "cts-hui-card-feature": HuiCardFeature;
  }
}
