import { css } from "lit";

// BT preset color RGB triplets, consumed as rgb(var(--bt-state-*)) /
// rgba(var(--bt-state-*), a). Themes may override them.
// Superseded by the --bt-color-* full-color layer in Phase 7.
export const btStateColorsStyle = css`
  :host {
    --bt-state-eco: 165, 214, 167;
    --bt-state-away: 176, 190, 197;
    --bt-state-boost: 239, 83, 80;
    --bt-state-sleep: 63, 81, 181;
    --bt-state-comfort: 121, 85, 72;
    --bt-state-activity: 230, 74, 25;
    --bt-state-home: 76, 175, 80;
  }
`;
