import { css } from "lit";

export const ShadowStyles = css`
    :host {
      position: relative;
      display: block;
      height: 100%;
      width: 100% !important;
      box-sizing: border-box;
      overflow: visible;
    }
    ha-card {
    position: relative;
      height: 100%;
      width: 100%;
      padding: 0;
      display: flex;
    flex-direction: column;
    justify-content: space-between;
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


    .bt-wrapper.container {
      display: flex;
      width: 100%;
      place-items: center;
      overflow: hidden;
      position: relative;
      max-width: 100%;
      box-sizing: border-box;
      flex: 1;
      align-items: center;
      justify-content: center;
      left: 50%;
      transform: translateX(-50%);
    }

    mushroom-climate-hvac-modes-control {
      justify-content: center !important;
    }

    .container:before {
      content: "";
      display: block;
      padding-top: 100%;
      grid-area: 1 / 1;
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
        flex: 0 0 auto;
    }

    ha-control-circular-slider {
      max-width: 320px !important;
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


    ha-control-circular-slider::after {
        display: block;
        content: "";
        position: absolute;

        right: -10%;
        bottom: -10%;
        background: radial-gradient(50% 50% at 50% 50%, var(--action-color, transparent) 0%, transparent 100%);
        opacity: 0.15;
        pointer-events: none;
        transform: translate(-50%, -50%);
        left: 50% !important;
        top: 50% !important;
        width: 90%;
        height: 100%;
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
        font-size: var(--ha-font-size-m);
        line-height: var(--ha-line-height-normal);
        letter-spacing: .1px;
        gap: 10px;
        --mdc-icon-size: 16px;
    }

    .label {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: var(--ha-line-height-normal);
      letter-spacing: .1px;
      margin: 0;
      color: var(--secondary-text-color);
    }

    .label ha-svg-icon {
            bottom: 5%;
    }

    .label.secondary {
        font-size: var(--ha-font-size-m);
        line-height: var(--ha-line-height-normal);
        --mdc-icon-size: var(--ha-font-size-m);
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
    .bt-wrapper.container ha-big-number {
        font-size: var(--ha-font-size-4xl);
    }

    .bt-wrapper.container.sm ha-big-number {
        font-size: var(--ha-font-size-4xl);
    }


    .bt-wrapper.container.md ha-big-number {
        font-size: 44px;
    }

    .bt-wrapper.container.lg ha-big-number {
        font-size: 57px;
    }

    .bt-wrapper.container.md .info {
      font-size: var(--ha-font-size-m);
    }

    .bt-wrapper.container.lg .info {
      font-size: var(--ha-font-size-l);
    }

    .bt-wrapper.container.md .label {
      font-size: var(--ha-font-size-m);
      --mdc-icon-size: var(--ha-font-size-l);
    }

    .bt-wrapper.container.lg .label {
      font-size: var(--ha-font-size-l);
      --mdc-icon-size: var(--ha-font-size-xl);
    }

    .bt-wrapper.container.md .label.window-label {
      --mdc-icon-size: var(--ha-font-size-2xl);
    }

    .bt-wrapper.container.lg .label.window-label {
      --mdc-icon-size: var(--ha-font-size-4xl);
    }

    .bt-wrapper.container.xl ha-big-number {
      font-size: 70px;
    }

    .bt-wrapper.container.xl .info {
      font-size: var(--ha-font-size-xl);
    }

    .bt-wrapper.container.xl .label {
      font-size: var(--ha-font-size-xl);
      --mdc-icon-size: var(--ha-font-size-2xl);
    }

    .bt-wrapper.container.xl .label.window-label {
      --mdc-icon-size: var(--ha-font-size-5xl);
    }



    .bt-buttons {
      display: flex;
      align-items: center;
      gap: 0;
      justify-content: space-around;
      padding: 1em 0;
      padding-top: 0;
    }

    .actions {
      padding: 0 12px 12px 12px;
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

`;