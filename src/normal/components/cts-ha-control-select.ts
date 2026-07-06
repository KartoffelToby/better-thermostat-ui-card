import type { CSSResultGroup, TemplateResult } from "lit";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";
import { fireEvent } from "mushroom-cards/src/ha";
import "./cts-ha-svg-icon";

export interface ControlSelectOption {
  value: string;
  label?: string;
  /** mdi icon path; rendered as an internal cts-ha-svg-icon. */
  path?: string;
  /** pre-rendered icon template (alternative to \`path\`). */
  icon?: TemplateResult;
  disabled?: boolean;
}

@customElement("cts-ha-control-select")
export class HaControlSelect extends LitElement {
  @property({ attribute: false }) public options?: ControlSelectOption[];

  @property() public value?: string;

  @property({ type: Boolean, reflect: true }) public vertical = false;

  @property({ type: Boolean }) public disabled = false;

  @property({ attribute: "hide-option-label", type: Boolean })
  public hideOptionLabel = false;

  @property() public label?: string;

  private _handleOptionClick(ev: Event) {
    if (this.disabled) {
      return;
    }
    const value = (ev.currentTarget as HTMLElement & { value: string }).value;
    if (value !== this.value) {
      fireEvent(this, "value-changed", { value });
    }
  }

  private _handleKeydown(ev: KeyboardEvent) {
    if (this.disabled || !this.options?.length) {
      return;
    }
    const index = this.options.findIndex((o) => o.value === this.value);
    let next = index;
    if (ev.key === "ArrowRight" || ev.key === "ArrowDown") {
      next = index === -1 ? 0 : Math.min(index + 1, this.options.length - 1);
    } else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") {
      next = index === -1 ? 0 : Math.max(index - 1, 0);
    } else {
      return;
    }
    ev.preventDefault();
    const value = this.options[next].value;
    if (value !== this.value) {
      fireEvent(this, "value-changed", { value });
    }
  }

  private _renderOption(option: ControlSelectOption) {
    const selected = this.value === option.value;
    return html`
      <div
        class="option ${classMap({ selected })}"
        role="radio"
        aria-checked=${selected ? "true" : "false"}
        aria-label=${ifDefined(option.label)}
        title=${ifDefined(this.hideOptionLabel ? option.label : undefined)}
        .value=${option.value}
        @click=${this._handleOptionClick}
      >
        <div class="content">
          ${option.path
            ? html`<cts-ha-svg-icon .path=${option.path}></cts-ha-svg-icon>`
            : (option.icon ?? nothing)}
          ${!this.hideOptionLabel && option.label
            ? html`<span>${option.label}</span>`
            : nothing}
        </div>
      </div>
    `;
  }

  protected render() {
    return html`
      <div
        class="container"
        role="radiogroup"
        aria-label=${ifDefined(this.label)}
        tabindex=${this.disabled ? -1 : 0}
        @keydown=${this._handleKeydown}
        ?disabled=${this.disabled}
      >
        ${this.options
          ? repeat(
              this.options,
              (option) => option.value,
              (option) => this._renderOption(option),
            )
          : nothing}
      </div>
    `;
  }

  static styles: CSSResultGroup = css`
    :host {
      display: block;
      --control-select-color: var(--primary-color);
      --control-select-focused-opacity: 0.2;
      --control-select-selected-opacity: 1;
      --control-select-background: var(--disabled-color);
      --control-select-background-opacity: 0.2;
      --control-select-thickness: 40px;
      --control-select-border-radius: 10px;
      --control-select-padding: 4px;
      --control-select-button-border-radius: calc(
        var(--control-select-border-radius) - var(--control-select-padding)
      );
      --mdc-icon-size: 20px;
      height: var(--control-select-thickness);
      width: 100%;
      font-style: normal;
      font-weight: var(--ha-font-weight-medium, 500);
      color: var(--primary-text-color);
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      border-radius: var(--control-select-border-radius);
    }
    :host([vertical]) {
      width: var(--control-select-thickness);
      height: auto;
    }
    .container {
      position: relative;
      height: 100%;
      width: 100%;
      transform: translateZ(0);
      display: flex;
      flex-direction: row;
      padding: var(--control-select-padding);
      box-sizing: border-box;
      outline: none;
      transition: box-shadow 180ms ease-in-out;
    }
    .container::before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: var(--control-select-background);
      opacity: var(--control-select-background-opacity);
      border-radius: var(--control-select-border-radius);
    }
    .container > *:not(:last-child) {
      margin-right: var(--control-select-padding);
      margin-inline-end: var(--control-select-padding);
      margin-inline-start: initial;
      direction: var(--direction);
    }
    .container[disabled] {
      --control-select-color: var(--disabled-color);
      --control-select-focused-opacity: 0;
      color: var(--disabled-color);
    }
    .container[disabled] .option {
      cursor: not-allowed;
    }
    .option {
      cursor: pointer;
      position: relative;
      flex: 1;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--control-select-button-border-radius);
      z-index: 0;
      outline: none;
      transition: box-shadow 180ms ease-in-out;
    }
    .option:focus-visible {
      box-shadow: 0 0 0 2px var(--control-select-color);
    }
    .option::before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: var(--control-select-color);
      opacity: 0;
      border-radius: var(--control-select-button-border-radius);
      transition:
        background-color ease-in-out 180ms,
        opacity ease-in-out 80ms;
    }
    .option:hover::before {
      opacity: var(--control-select-focused-opacity);
    }
    .option.selected {
      color: white;
    }
    .option.selected::before {
      opacity: var(--control-select-selected-opacity);
    }
    .option .content {
      position: relative;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      padding: 2px;
      width: 100%;
      box-sizing: border-box;
    }
    .option .content > *:not(:last-child) {
      margin-bottom: 4px;
    }
    .option .content span {
      display: block;
      width: 100%;
      -webkit-hyphens: auto;
      hyphens: auto;
    }
    :host([vertical]) .container {
      flex-direction: column;
    }
    :host([vertical]) .container > *:not(:last-child) {
      margin-right: initial;
      margin-inline-end: initial;
      margin-bottom: var(--control-select-padding);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "cts-ha-control-select": HaControlSelect;
  }
}
