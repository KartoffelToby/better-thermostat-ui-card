import { css, ReactiveController, ReactiveControllerHost } from "lit";

type PresetOverlayHost = ReactiveControllerHost & Element;

// Manages the fullscreen preset-select overlay: open state, closing on a
// pointerdown outside the overlay or on Escape, and listener cleanup when
// the card is removed from the DOM.
export class PresetOverlayController implements ReactiveController {
  private _host: PresetOverlayHost;

  private _open = false;

  constructor(host: PresetOverlayHost) {
    this._host = host;
    host.addController(this);
  }

  get open(): boolean {
    return this._open;
  }

  setOpen(open: boolean): void {
    this._open = open;
    if (open) {
      this._addListeners();
    } else {
      this._removeListeners();
    }
    this._host.requestUpdate();
  }

  hostConnected(): void {
    if (this._open) {
      this._addListeners();
    }
  }

  hostDisconnected(): void {
    this._removeListeners();
    this._open = false;
    // Without this, a card detached while open re-attaches with the stale
    // `open` class until an unrelated re-render.
    this._host.requestUpdate();
  }

  private _addListeners(): void {
    window.addEventListener("pointerdown", this._onDocumentPointerDown);
    window.addEventListener("keydown", this._onDocumentKeyDown);
  }

  private _removeListeners(): void {
    window.removeEventListener("pointerdown", this._onDocumentPointerDown);
    window.removeEventListener("keydown", this._onDocumentKeyDown);
  }

  private _onDocumentPointerDown = (ev: Event): void => {
    const path = ev.composedPath();
    const presetEl = this._host.shadowRoot?.querySelector(".preset-select");
    if (!presetEl) return;
    if (!path.includes(presetEl)) {
      this.setOpen(false);
    }
  };

  private _onDocumentKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key === "Escape") {
      this.setOpen(false);
    }
  };
}

// Structural skeleton of the overlay; each card layers its own spacing,
// background alpha and alignment on top.
export const presetOverlayStyle = css`
  .preset-select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    flex-direction: row;
    max-height: 0%;
    overflow: hidden;
    transition:
      max-height 300ms ease-in-out,
      padding 300ms ease-in-out;
    z-index: -1;
    box-sizing: border-box;
    visibility: collapse;
    backface-visibility: hidden;
  }
  .preset-select.open {
    max-height: 100%;
    z-index: 10;
    visibility: visible;
    backface-visibility: visible;
  }
`;
