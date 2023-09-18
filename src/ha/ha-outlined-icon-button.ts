import { css } from "lit";
import { customElement } from "lit/decorators.js";
import { IconButton } from "@material/web/iconbutton/internal/icon-button";
import { styles as outlinedStyles } from "@material/web/iconbutton/internal/outlined-styles.css";
import { styles as sharedStyles } from "@material/web/iconbutton/internal/shared-styles.css";

@customElement("bt-ha-outlined-icon-button")
export class BTHaOutlinedIconButton extends IconButton {
  protected override getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      outlined: true,
    };
  }

  static override styles = [
    sharedStyles,
    outlinedStyles,
    css`
      :host {
        --ha-icon-display: block;
        --md-sys-color-on-surface: var(--secondary-text-color);
        --md-sys-color-on-surface-variant: var(--secondary-text-color);
        --md-sys-color-on-surface-rgb: var(--rgb-secondary-text-color);
        --md-sys-color-outline: var(--secondary-text-color);
      }
      :host([no-ripple]) .outlined {
        --md-ripple-focus-opacity: 0;
        --md-ripple-hover-opacity: 0;
        --md-ripple-pressed-opacity: 0;
      }
      .outlined {
        /* Fix md-outlined-icon-button padding and margin for iOS */
        padding: 0;
        margin: 0;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "bt-ha-outlined-icon-button": BTHaOutlinedIconButton;
  }
}