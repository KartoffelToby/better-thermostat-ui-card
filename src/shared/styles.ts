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

// Smooth timed transitions for state changes + an appearance animation for the
// card and its elements. Scoped to color/background/box-shadow/opacity so we
// never transition transform/layout (which would fight slider interactions).
export const btAnimationsStyle = css`
  @keyframes bt-fade-in {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :host,
  ha-card {
    animation: bt-fade-in 300ms ease-out both;
  }

  .info,
  .label,
  .state,
  .primary-state,
  .target-button,
  .label-container,
  .buttons,
  .bt-buttons,
  .actions,
  ha-big-number,
  ha-control-circular-slider,
  cts-hui-card-features {
    transition:
      color 200ms ease,
      background-color 200ms ease,
      box-shadow 200ms ease,
      opacity 200ms ease;
  }

  @media (prefers-reduced-motion: reduce) {
    :host,
    ha-card {
      animation: none;
    }
    .info,
    .label,
    .state,
    .primary-state,
    .target-button,
    .label-container,
    .buttons,
    .bt-buttons,
    .actions,
    ha-big-number,
    ha-control-circular-slider,
    cts-hui-card-features {
      transition: none;
    }
  }
`;
