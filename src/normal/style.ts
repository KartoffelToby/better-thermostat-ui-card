import { css } from "lit";

export const ShadowStyles = css`
    :host {
      position: relative;
      display: block;
      height: 100%;
      width: 100% !important;
      box-sizing: border-box;
      overflow: visible;
      --bt-state-eco: 165, 214, 167;
      --bt-state-away: 176, 190, 197;
      --bt-state-boost: 239, 83, 80;
      --bt-state-sleep: 63, 81, 181;
      --bt-state-comfort: 121, 85, 72;
      --bt-state-activity: 230, 74, 25;
      --bt-state-home: 76, 175, 80;
      --default-deep-orange: 244, 99, 108 !important;
    }
    ha-card {
      position: relative;
      height: 100%;
      width: 100%;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 1em;
      padding-right: 1em;
      overflow: hidden;
    }

    .title {
      width: 100%;
      font-size: var(--ha-font-size-l);
      line-height: var(--ha-line-height-expanded);
      padding: 8px 30px 8px 30px;
      margin: 0;
      text-align: center;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: none;
    }

    .bt-wrapper {
      --state-climate-heat-color: #f4636c !important;
    }



    mushroom-climate-hvac-modes-control {
      justify-content: center !important;
    }

    .more-info {
      position: absolute;
      cursor: pointer;
      top: 0;
      right: 0;
      inset-inline-end: 0px;
      inset-inline-start: initial;
      border-radius: 100%;
      color: var(--secondary-text-color);
      direction: var(--direction);
    }

    cts-hui-card-features {
      width: 100%;
      flex: none;
      padding: 0 12px 12px 12px;
    }

    ha-control-circular-slider {
      width: 100%;
      --control-circular-slider-color: var(--state-color, var(--disabled-color));
    }

    ha-control-circular-slider {
      --default-deep-orange: 244, 99, 108 !important;
      --control-circular-slider-color: var(--state-color, var(--primary-text-color));
      --control-circular-slider-low-color: var(
        --low-color,
        var(--disabled-color)
      );
      --control-circular-slider-high-color: var(
        --high-color,
        var(--disabled-color)
      );
    }


    hui-climate-preset-modes-card-feature  ha-control-select-menu  .select-anchor  .content {
      display: none;
    }

    ::slotted(mushroom-button-group) {
    display: none;
    }


    ha-control-circular-slider::after {
      display: block;
      content: "";
      position: absolute;
      top: -10%;
      left: -10%;
      right: -10%;
      bottom: -10%;
      background: radial-gradient(
        50% 50% at 50% 50%,
        var(--action-color, transparent) 0%,
        transparent 100%
      );
      opacity: 0.15;
      pointer-events: none;
    }

    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      max-width: 100%;
      box-sizing: border-box;
      flex: 1;
    }

    .container:before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    .container > .bt-wrapper {
      width: 100%;
      position: relative;
      container-type: inline-size;
      container-name: container;
      box-sizing: border-box;
      max-width: 320px !important;
    }

    .info {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      font-size: var(--ha-font-size-l);
      line-height: var(--ha-line-height-normal);
      letter-spacing: 0.1px;
      gap: var(--ha-space-2);
      --mdc-icon-size: 16px;
    }

    .info * {
      margin: 0;
      pointer-events: auto;
    }

    .label {
      width: 100%;
      font-weight: var(--ha-font-weight-medium);
      text-align: center;
      color: var(--action-color, inherit);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: var(--ha-line-height-normal);
      min-height: 1.5em;
      white-space: nowrap;
    }

    .label span {
      white-space: nowrap;
    }

    .label ha-svg-icon {
      bottom: 5%;
    }

    .label.disabled {
      color: var(--secondary-text-color);
    }

    .primary-state {
      font-size: 36px;
    }



    .label-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 6px;
    }

    .label-container .label {
      width: auto !important;
    }


    .label.humidity {
        color: #6fa3d6;
    }

    .buttons {
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      margin: 0 auto;
      gap: var(--ha-space-6, 24px);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
    .buttons > * {
      pointer-events: auto;
    }

    .container.md ha-big-number {
      font-size: 44px;
    }
    .container.md .state {
      font-size: var(--ha-font-size-3xl);
    }
    .container.md .info {
      margin-top: 12px;
      gap: 6px;
    }
    .container.md .buttons {
      display: none;
    }
    .container.md ha-control-circular-slider {
      margin-bottom: -16px;
    }

    .container.sm ha-big-number {
      font-size: var(--ha-font-size-4xl);
    }
    .container.sm .state {
      font-size: var(--ha-font-size-2xl);
    }
    .container.sm .info {
      margin-top: 12px;
      font-size: var(--ha-font-size-m);
      gap: 2px;
      --mdc-icon-size: 14px;
    }
    .container.sm .buttons {
      display: none;
    }
    .container.sm ha-control-circular-slider {
      margin-bottom: -16px;
    }

    .container.xs ha-big-number {
      font-size: var(--ha-font-size-4xl);
    }
    .container.xs .state {
      font-size: var(--ha-font-size-l);
    }
    .container.xs .info {
      margin-top: 12px;
    }
    .container.xs .buttons {
      display: none;
    }
    .container.xs ha-control-circular-slider {
      margin-bottom: -16px;
    }
    .container.xs .label {
      display: none;
    }



    .bt-buttons {
      display: flex;
      align-items: center;
      gap: 24px;
      justify-content: center;
      padding: 1em 0;
      padding-top: 0;
    }

    .actions {
      padding: 0 12px 12px 12px;
      justify-content: center;
      gap: 18px;
    }

    .dual {
        display: flex;
        flex-direction: row;
        gap: 24px;
    }

    .target-button {
        outline: none;
        background: none;
        color: inherit;
        font: inherit;
        border: none;
        opacity: .7;
        padding: 0;
        transition: opacity 180ms ease-in-out, transform 180ms ease-in-out;
        cursor: pointer;
    }

    .target-button.selected {
        opacity: 1;
    }

    .target-button:focus-visible {
        transform: scale(1.1);
    }

    .label.hvac_action {
          color: var(--action-color, inherit) !important;
    }

    .label.window-label {
          color: var(--info-color, inherit);
          --mdc-icon-size: clamp(20px, 15cqmin, 75px);
    }
    
    .label.summer-label {
          color: #ffb300;
          --mdc-icon-size: clamp(20px, 15cqmin, 75px);
    }

    .label.warning {
      --mdc-icon-size: clamp(20px, 15cqmin, 75px);
    }

    .label.secondary:not(.label.humidity) {
          color: var(--action-color, inherit);
          gap: clamp(2px, 1.8cqmin, 8px);
    }



    .preset-select {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      align-content: center;
      z-index: 10;
      gap: 12px;
      flex-direction: row;
      flex-wrap: wrap;
      max-height: 0%;
      overflow: hidden;
      transition: max-height 300ms ease-in-out, padding 300ms ease-in-out;
      z-index: -1;
      box-sizing: border-box;
      background-color: rgba(var(--rgb-card-background-color), 0.6);
      padding: 16px;
    }
    .preset-select.open {
      max-height: 100%;
      z-index: 10;
    }

`;