// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
    LitElement,
    html,
    css,
    svg,
    TemplateResult,
    SVGTemplateResult,
    PropertyValues,
    CSSResultGroup,
  } from "lit";
  import { customElement, property, state } from "lit/decorators.js";
  @customElement('bt-round-slider')
  class RoundSlider extends LitElement {
    @property({ type: Number }) public value: number | undefined;
    @property({ type: Number }) public current: number | undefined;
    @property({ type: Number }) public high: number | undefined;
    @property({ type: Number }) public low: number | undefined;
    @property({ type: Number }) public min = 0;
    @property({ type: Number }) public max = 100;
    @property({ type: Number }) public step = 1;
    @property({ type: Number }) public startAngle = 135;
    @property({ type: Number }) public arcLength = 270;
    @property({ type: Number }) public handleSize = 6;
    @property({ type: Number }) public handleZoom = 1.5;
    @property({ type: Boolean }) public readonly = false;
    @property({ type: Boolean }) public disabled = false;
    @property({ type: Boolean, reflect: true }) public dragging = false;
    @property({ type: Boolean }) public rtl = false;
    @property() public valueLabel: string | undefined;
    @property() public lowLabel: string | undefined;
    @property() public highLabel: string | undefined;
  
    @state() private _scale = 1;
  
    private _reverseOrder?: boolean;
    private _rotation?: {
      handle: HTMLElement;
      min: number;
      max: number;
      start: string;
      type: string;
      cooldown: number;
    };
  
    constructor() {
      super();
      this.dragEnd = this.dragEnd.bind(this);
      this.drag = this.drag.bind(this);
      this._keyStep = this._keyStep.bind(this);
    }
  
    connectedCallback() {
      super.connectedCallback();
      document.addEventListener("mouseup", this.dragEnd);
      document.addEventListener("touchend", this.dragEnd, {
        passive: false,
      });
      document.addEventListener("mousemove", this.drag);
      document.addEventListener("touchmove", this.drag, {
        passive: false,
      });
      document.addEventListener("keydown", this._keyStep);
    }
  
    disconnectedCallback() {
      super.disconnectedCallback();
      document.removeEventListener("mouseup", this.dragEnd);
      document.removeEventListener("touchend", this.dragEnd);
      document.removeEventListener("mousemove", this.drag);
      document.removeEventListener("touchmove", this.drag);
      document.removeEventListener("keydown", this._keyStep);
    }
  
    private get _start(): number {
      return (this.startAngle * Math.PI) / 180;
    }
  
    private get _len(): number {
      // Things get weird if length is more than a complete turn
      return Math.min((this.arcLength * Math.PI) / 180, 2 * Math.PI - 0.01);
    }
  
    private get _end(): number {
      return this._start + this._len;
    }
  
    private get _showHandle(): boolean {
      // If handle is shown
      if (this.readonly) return false;
      if (this.value == null && (this.high == null || this.low == null))
        return false;
      return true;
    }
  
    private _angleInside(angle: number): boolean {
      // Check if an angle is on the arc
      let a =
        ((this.startAngle + this.arcLength / 2 - angle + 180 + 360) % 360) - 180;
      return a < this.arcLength / 2 && a > -this.arcLength / 2;
    }
  
    private _angle2xy(angle: number): { x: number; y: number } {
      if (this.rtl) return { x: -Math.cos(angle), y: Math.sin(angle) };
      return { x: Math.cos(angle), y: Math.sin(angle) };
    }
  
    private _xy2angle(x: number, y: number): number {
      if (this.rtl) x = -x;
      return (Math.atan2(y, x) - this._start + 2 * Math.PI) % (2 * Math.PI);
    }
  
    private _value2angle(value: number): number {
      value = Math.min(this.max, Math.max(this.min, value));
      const fraction = (value - this.min) / (this.max - this.min);
      return this._start + fraction * this._len;
    }

    private _value2percent(value: number): number {    
      return ((value - this.min) / (this.max - this.min)) * 100;
    }

    private _value2bar(value: number): number {
      return -(((value - this.min) / (this.max - this.min)) * 590) - 590;
    }
  
    private _angle2value(angle: number): number {
      return (
        Math.round(
          ((angle / this._len) * (this.max - this.min) + this.min) / this.step
        ) * this.step
      );
    }
  
    private get _boundaries() {
      // Get the maximum extents of the bar arc
      const start = this._angle2xy(this._start);
      const end = this._angle2xy(this._end);
  
      let up = 1;
      if (!this._angleInside(270)) up = Math.max(-start.y, -end.y);
  
      let down = 1;
      if (!this._angleInside(90)) down = Math.max(start.y, end.y);
  
      let left = 1;
      if (!this._angleInside(180)) left = Math.max(-start.x, -end.x);
  
      let right = 1;
      if (!this._angleInside(0)) right = Math.max(start.x, end.x);
  
      return {
        up,
        down,
        left,
        right,
        height: up + down,
        width: left + right,
      };
    }
  
    private _mouse2value(ev: TouchEvent | MouseEvent) {
      const mouseX = ev.type.startsWith("touch")
        ? (ev as TouchEvent).touches[0].clientX
        : (ev as MouseEvent).clientX;
      const mouseY = ev.type.startsWith("touch")
        ? (ev as TouchEvent).touches[0].clientY
        : (ev as MouseEvent).clientY;
  
      const rect:any = this?.shadowRoot?.querySelector("svg")?.getBoundingClientRect();
      if (rect === null) return;
      const boundaries = this._boundaries;
      const x =
        mouseX - (rect?.left + (boundaries.left * rect.width) / boundaries.width);
      const y =
        mouseY - (rect.top + (boundaries.up * rect.height) / boundaries.height);
  
      const angle = this._xy2angle(x, y);
      const pos = this._angle2value(angle);
      return pos;
    }
  
    dragStart(ev: TouchEvent | MouseEvent | FocusEvent): void {
      if (!this._showHandle || this.disabled) return;
      let handle:any = ev.target as HTMLElement;
      let cooldown:any = undefined;
  
      // Avoid double events mouseDown->focus
      if (this?._rotation && this?._rotation.type !== "focus") return;
  
      // If the bar was touched, find the nearest handle and drag from that
      if (handle.classList.contains("shadowpath")) {
        if (ev.type === "touchstart")
          cooldown = window.setTimeout(() => {
            if (this?._rotation) this?._rotation?.cooldown = undefined;
          }, 200);
        if (this.low == null) {
          handle = this?.shadowRoot?.querySelector("#value");
        } else {
          const mouse:any = this._mouse2value(ev as TouchEvent | MouseEvent);
          if (Math.abs(mouse - this.low) < Math.abs(mouse - this?.high)) {
            handle = this?.shadowRoot?.querySelector("#low");
          } else {
            handle = this?.shadowRoot?.querySelector("#high");
          }
        }
      }
  
      // If an invisible handle was clicked, switch to the visible counterpart
      if (handle.classList.contains("overflow"))
        handle = handle.nextElementSibling as HTMLElement;
  
      if (!handle.classList.contains("handle")) return;
      handle.setAttribute(
        "stroke-width",
        String(2 * this.handleSize * this.handleZoom * this._scale)
      );
  
      const min:any = handle.id === "high" ? this.low : this.min;
      const max:any = handle.id === "low" ? this.high : this.max;
      this._rotation = {
        handle,
        min,
        max,
        start: this[handle.id],
        type: ev.type,
        cooldown,
      };
      this.dragging = true;
    }
  
    private _cleanupRotation(): void {
      const handle = this._rotation.handle;
      handle.setAttribute(
        "stroke-width",
        String(2 * this.handleSize * this._scale)
      );
  
      this._rotation = undefined;
      this.dragging = false;
  
      handle.blur();
    }
  
    dragEnd(_ev: MouseEvent | TouchEvent | FocusEvent): void {
      if (!this._showHandle || this.disabled) return;
      if (!this._rotation) return;
  
      const handle = this._rotation.handle;
      this._cleanupRotation();
  
      let event = new CustomEvent("value-changed", {
        detail: {
          [handle.id]: this[handle.id],
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
  
      // This makes the low handle render over the high handle if they both are
      // close to the top end.  Otherwise if would be unclickable, and the high
      // handle locked by the low.  Calcualtion is done in the dragEnd handler to
      // avoid "z fighting" while dragging.
      if (this.low && this.low >= 0.99 * this.max) this._reverseOrder = true;
      else this._reverseOrder = false;
    }
  
    drag(ev: TouchEvent | MouseEvent): void {
      if (!this._showHandle || this.disabled) return;
      if (!this._rotation) return;
      if (this._rotation.cooldown) {
        window.clearTimeout(this._rotation.cooldown);
        this._cleanupRotation();
        return;
      }
      if (this._rotation.type === "focus") return;
  
      ev.preventDefault();
  
      const pos = this._mouse2value(ev);
  
      this._dragpos(pos);
    }
  
    private _dragpos(pos: number): void {
      if (pos < this._rotation.min || pos > this._rotation.max) return;
  
      const handle = this._rotation.handle;
      this[handle.id] = pos;
  
      let event = new CustomEvent("value-changing", {
        detail: {
          [handle.id]: pos,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  
    private _keyStep(ev: KeyboardEvent): void {
      if (!this._showHandle || this.disabled) return;
      if (!this._rotation) return;
      const handle = this._rotation.handle;
      if (ev.key === "ArrowLeft" || ev.key === "ArrowDown") {
        ev.preventDefault();
        if (this.rtl) this._dragpos(this[handle.id] + this.step);
        else this._dragpos(this[handle.id] - this.step);
      }
      if (ev.key === "ArrowRight" || ev.key === "ArrowUp") {
        ev.preventDefault();
        if (this.rtl) this._dragpos(this[handle.id] - this.step);
        else this._dragpos(this[handle.id] + this.step);
      }
      if (ev.key === "Home") {
        ev.preventDefault();
        this._dragpos(this.min);
      }
      if (ev.key === "End") {
        ev.preventDefault();
        this._dragpos(this.max);
      }
    }
  
    protected updated(changedProperties: PropertyValues) {
      // Adjust margin in the bar slider stroke width is greater than the handle size
      if (this.shadowRoot.querySelector(".slider")) {
        const styles = window.getComputedStyle(
          this.shadowRoot.querySelector(".slider")
        );
        if (styles && styles["strokeWidth"]) {
          const stroke = parseFloat(styles["strokeWidth"]);
          if (stroke > this.handleSize * this.handleZoom) {
            const view = this._boundaries;
            const margin = `
            ${(stroke / 2) * Math.abs(view.up)}px
            ${(stroke / 2) * Math.abs(view.right)}px
            ${(stroke / 2) * Math.abs(view.down)}px
            ${(stroke / 2) * Math.abs(view.left)}px`;
            this.shadowRoot.querySelector("svg").style.margin = margin;
          }
        }
      }
  
      // Workaround for vector-effect not working in IE and pre-Chromium Edge
      // That's also why the _scale property exists
      if (
        this.shadowRoot.querySelector("svg") &&
        this.shadowRoot.querySelector("svg").style.vectorEffect === undefined
      ) {
        if (changedProperties.has("_scale") && this._scale != 1) {
          this.shadowRoot
            .querySelector("svg")
            .querySelectorAll("path")
            .forEach((e) => {
              if (e.getAttribute("stroke-width")) return;
              const orig = parseFloat(
                getComputedStyle(e).getPropertyValue("stroke-width")
              );
              e.style.strokeWidth = `${orig * this._scale}px`;
            });
        }
        const rect = this.shadowRoot.querySelector("svg").getBoundingClientRect();
        const scale = Math.max(rect.width, rect.height);
        this._scale = 2 / scale;
      }
    }
  
    _renderArc(start: number, end: number) {
      const diff = end - start;
      const startXY = this._angle2xy(start);
      const endXY = this._angle2xy(end + 0.001); // Safari doesn't like arcs with no length
      return `
        M ${startXY.x} ${startXY.y}
        A 1 1,
          0,
          ${diff > Math.PI ? "1" : "0"} ${this.rtl ? "0" : "1"},
          ${endXY.x} ${endXY.y}
      `;
    }
  
    private _renderHandle(id: string): SVGTemplateResult {
      const theta = this._value2angle(this[id]);
      const pos = this._angle2xy(theta);
      const label =
        {
          value: this.valueLabel,
          low: this.lowLabel,
          high: this.highLabel,
        }[id] || "";
  
      if (id === "current") {
        return svg`
            <g class="current current-handle" style="offset-path: path('${this._renderArc(this._start, this._end).replace(/(\r\n|\n|\r)/gm, "")}'); offset-distance: ${this._value2percent(this[id])}%;">
              <path
                id=${id}
                d="
                M 0 0
                L 0.001 0.001
                "
                class="current-handle"
                vector-effect="non-scaling-stroke"
                stroke-width="11"
                tabindex="1"
                role="slider"
                aria-valuenow=${this[id]}
                aria-disabled="true"
                aria-label=${this.current || ""}
                />
            </g>
            `;
      } else {
        // Two handles are drawn. One visible, and one invisible that's twice as
        // big. Makes it easier to click.
        return svg`
            <g class="${id} handle ${this.dragging ? 'drag': ''}" style="offset-path: path('${this._renderArc(this._start, this._end).replace(/(\r\n|\n|\r)/gm, "")}'); offset-distance: ${this._value2percent(this[id])}%;">
            <path
                id=${id}
                class="overflow"
                d="
                M 0 0
                L 0.001 0.001
                "
                vector-effect="non-scaling-stroke"
                stroke="rgba(0,0,0,0)"
                stroke-width="${4 * this.handleSize * this._scale}"
                />
            <path
                id=${id}
                class="handle"
                d="
                M 0 0
                L 0.001 0.001
                "
                vector-effect="non-scaling-stroke"
                stroke-width="${2 * this.handleSize * this._scale}"
                tabindex="0"
                @focus=${this.dragStart}
                @blur=${this.dragEnd}
                role="slider"
                aria-valuemin=${this.min}
                aria-valuemax=${this.max}
                aria-valuenow=${this[id]}
                aria-disabled=${this.disabled}
                aria-label=${label || ""}
                />
            </g>
            `;
      }
    }
  
    protected render(): TemplateResult {
      const view = this._boundaries;
      return html`
        <svg
          @mousedown=${this.dragStart}
          @touchstart=${this.dragStart}
          xmln="http://www.w3.org/2000/svg"
          viewBox="${-view.left} ${-view.up} ${view.width} ${view.height}"
          ?disabled=${this.disabled}
          focusable="false"
        >
          <g class="slider">
            <path
              class="path"
              d=${this._renderArc(this._start, this._end)}
              vector-effect="non-scaling-stroke"
            />
            <path
              class="bar ${this.dragging ? 'drag': ''}"
              style="stroke-dashoffset: ${this._value2bar(this.value)};"
              vector-effect="non-scaling-stroke"
              d=${this._renderArc(
                this._value2angle(this.low != null ? this.low : this.min),
                this._value2angle(this.high != null ? this.high : this.max)
              )}
            />
            <path
              class="shadowpath"
              d=${this._renderArc(this._start, this._end)}
              vector-effect="non-scaling-stroke"
              stroke="rgba(0,0,0,0)"
              stroke-width="${3 * this.handleSize * this._scale}"
              stroke-linecap="butt"
            />
          </g>
  
          <g class="handles">
            ${this._showHandle
              ? this.low != null
                ? this._reverseOrder
                  ? svg`${this._renderHandle("high")} ${this._renderHandle(
                      "low"
                    )}`
                  : svg`${this._renderHandle("low")} ${this._renderHandle(
                      "high"
                    )}`
                : svg`${this._renderHandle("value")}${this._renderHandle("current")}`
              : ``}
          </g>
        </svg>
      `;
    }
  
    static get styles(): CSSResultGroup {
      return css`
        :host {
          display: inline-block;
          width: 100%;
        }
        svg {
          overflow: visible;
          display: block;
        }
        path {
          transition: stroke 1s ease-out, stroke-width 200ms ease-out;
        }
        .current-handle {
            pointer-events: none;
            z-index: 90;
            stroke: var(--round-slider-path-color, lightgray);
            transition: offset-distance 15s ease-in-out
        }
        .handle {
          transition: offset-distance 600ms ease-in-out, stroke 1.6s ease-in-out;
          transition-delay: 0;
        }
        .handle.drag {
          transition: none;
        }
        .slider {
          fill: none;
          stroke-width: var(--round-slider-path-width, 3);
          stroke-linecap: var(--round-slider-linecap, round);
        }
        .path {
          stroke: var(--round-slider-path-color, lightgray);
        }
        .bar {
          stroke: var(--round-slider-bar-color, deepskyblue);
          transition: stroke-dashoffset 600ms ease-in-out, stroke 1.6s ease-in-out;
          transform: rotate(360deg);
          stroke-dasharray: 590;
          stroke-dashoffset: 590;
        }
        .bar.drag {
          transition: none;
        }
        svg[disabled] .bar {
          stroke: var(--round-slider-disabled-bar-color, darkgray);
        }
        g.handles {
          stroke: var(
            --round-slider-handle-color,
            var(--round-slider-bar-color, deepskyblue)
          );
          stroke-linecap: round;
          cursor: var(--round-slider-handle-cursor, pointer);
        }
        g.low.handle {
          stroke: var(--round-slider-low-handle-color);
        }
        g.high.handle {
          stroke: var(--round-slider-high-handle-color);
        }
        svg[disabled] g.handles {
          stroke: var(--round-slider-disabled-bar-color, darkgray);
        }
        .handle:focus {
          outline: unset;
        }
      `;
    }
  }
 // customElements.define("round-slider", RoundSlider);
 export default RoundSlider;
