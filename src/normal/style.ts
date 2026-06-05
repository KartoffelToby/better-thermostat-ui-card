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

    .bt-wrapper.container {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      position: relative !important;
      max-width: 100%;
      box-sizing: border-box;
      flex: 1 1 0%;
      min-height: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    mushroom-climate-hvac-modes-control {
      justify-content: center !important;
    }

    .control-content {
      position: relative;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      aspect-ratio: 1 / 1;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      place-items: center;
      container-type: size;
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

    hui-card-features {
      width: 100%;
      flex: none;
      padding: 0 12px 12px 12px;
    }

    ha-control-circular-slider {
        grid-area: 1 / 1;
        width: 100% !important;
        height: 100% !important;
        max-width: 100%;
        max-height: 100%;
        min-width: 0 !important;
        position: relative;
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

        right: -10%;
        bottom: -10%;
        background: radial-gradient(50% 50% at 50% 50%, var(--action-color, transparent) 0%, transparent 100%);
        opacity: 0.3;
        pointer-events: none;
        transform: translate(-50%, -50%);
        left: 50% !important;
        top: 45% !important;
        width: 85%;
        height: 85%;
        z-index: -5;
    }



    .info {
        grid-area: 1 / 1;
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
        font-size: clamp(10px, 5.5cqmin, 28px);
        line-height: var(--ha-line-height-normal);
        letter-spacing: .1px;
        gap: clamp(4px, 2.2cqmin, 20px);
        --mdc-icon-size: clamp(12px, 6.5cqmin, 32px);
        height: 100%;
        width: 100%;
    }

    .label-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .label {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: var(--ha-line-height-normal);
      letter-spacing: .1px;
      margin: 0;
      color: var(--secondary-text-color);
      font-weight: 600;
    }

    .primary-state {
      font-size: clamp(20px, 12cqmin, 60px);
      margin: 0;
      font-weight: 500;
    }

    .label ha-svg-icon {
            bottom: 5%;
    }

    .label.secondary {
        font-size: clamp(9px, 5cqmin, 24px);
        line-height: var(--ha-line-height-normal);
        --mdc-icon-size: clamp(10px, 5cqmin, 24px);
    }

    .label.humidity {
        color: #6fa3d6;
        gap: clamp(2px, 1.8cqmin, 8px);
    }

    .buttons {
        width: 100%;
        gap: 24px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding-bottom: 12px;
    }
    /* merged duplicate .bt-wrapper.container rules */
    /* Sizing defaults */
    /* Responsive Text Scaling using Container Queries */
    .bt-wrapper.container ha-big-number {
      font-size: clamp(26px, 24cqmin, 120px);
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