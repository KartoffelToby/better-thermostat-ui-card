import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./hui-card-feature";
import { HomeAssistant } from "mushroom-cards/src/ha";
import type {
  LovelaceCardFeatureConfig,
  LovelaceCardFeatureContext,
  LovelaceCardFeaturePosition,
} from "./types";

@customElement("cts-hui-card-features")
export class HuiCardFeatures extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @property({ attribute: false }) public context?: LovelaceCardFeatureContext;

  @property({ attribute: false }) public color?: string;

  @property({ attribute: false }) public features?: LovelaceCardFeatureConfig[];

  @property({ attribute: false })
  public position?: LovelaceCardFeaturePosition;

  protected render() {
    if (!this.features?.length) {
      return nothing;
    }
    return html`
      ${this.features.map(
        (feature) => html`
          <cts-hui-card-feature
            .hass=${this.hass}
            .context=${this.context}
            .color=${this.color}
            .feature=${feature}
            .position=${this.position}
          ></cts-hui-card-feature>
        `
      )}
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      box-sizing: border-box;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "cts-hui-card-features": HuiCardFeatures;
  }
}
