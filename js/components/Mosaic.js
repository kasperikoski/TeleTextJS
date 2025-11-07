/**
 * ============================================================
 * <ttx-mosaic> Web Component
 * ------------------------------------------------------------
 * Teletext-style mosaic grid for pixel-art / color blocks.
 * Renders a grid of square “cells” from a compact data string.
 *
 * Data formats supported (whitespace ignored):
 *  - Digits 0–7 → Teletext 8-color palette
 *  - "."       → transparent
 *
 * Key features:
 *  - Shadow DOM encapsulation
 *  - Themable via CSS custom properties (--ttx-mosaic-*)
 *  - Attribute-driven overrides (cols, rows, data, palette, etc.)
 *  - 4-way padding & margin (like <ttx-block>)
 * ============================================================
 */
class MosaicElement extends HTMLElement {
  // Default Teletext 8-color palette
  // NOTE: "black" (index 0) intentionally uses transparent
  // so CRT glow and background effects show through.
  static DEFAULT_PALETTE = [
    "transparent",  // 0 black (actually transparent to reveal CRT background)
    "#ff0000",    // 1 red
    "#00ff00",    // 2 green
    "#ffff00",    // 3 yellow
    "#0000ff",    // 4 blue
    "#ff00ff",    // 5 magenta
    "#00ffff",    // 6 cyan
    "#ffffff",    // 7 white
  ];

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host {
          display: block;

          /* Forces GPU acceleration */
          transform: translateZ(0);

          /* Optimizes rendering for transformations */
          will-change: transform;
          
          background: var(--ttx-mosaic-background, transparent);
          color: var(--ttx-mosaic-color, inherit);
          border: var(--ttx-mosaic-border, none);
          border-radius: var(--ttx-mosaic-radius, 0);
          box-shadow: var(--ttx-mosaic-shadow, none);
          box-sizing: border-box;

          /* Padding (4-way support) */
          padding-top: var(--ttx-mosaic-padding-top, var(--ttx-mosaic-padding, 0));
          padding-right: var(--ttx-mosaic-padding-right, var(--ttx-mosaic-padding, 0));
          padding-bottom: var(--ttx-mosaic-padding-bottom, var(--ttx-mosaic-padding, 0));
          padding-left: var(--ttx-mosaic-padding-left, var(--ttx-mosaic-padding, 0));

          /* Prevents extra whitespace from being rendered before the mosaic grid */
          font-size: 0;
        }

        :host([hidden]) {
          display: none !important;
        }

        .grid {
          display: grid;
          gap: var(--ttx-mosaic-gap, 0);
        }

        .cell {
          width: 100%;
          aspect-ratio: 1 / 1;
          background: transparent;
        }
      </style>
      <div id="grid" class="grid" aria-hidden="false"></div>
    `;
    this._grid = shadow.querySelector("#grid");
    this._palette = MosaicElement.DEFAULT_PALETTE.slice();
  }

  connectedCallback() {
    // Remove stray text node before component (typical cause of unwanted gaps)
    const prev = this.previousSibling;
    if (prev && prev.nodeType === Node.TEXT_NODE && !prev.textContent.trim()) {
        prev.remove();
    }

    // Trim leading whitespace inside the component (in case data starts on new line)
    if (this.firstChild && this.firstChild.nodeType === Node.TEXT_NODE) {
        this.firstChild.textContent = this.firstChild.textContent.trimStart();
    }

    this.#syncFromAttributes();
    this.render();
  }

  static get observedAttributes() {
    return [
      "cols", "rows", "data", "palette",
      "cell-size", "gap", "background", "color", "border", "radius", "shadow",
      "padding", "padding-top", "padding-right", "padding-bottom", "padding-left",
      "margin", "margin-top", "margin-right", "margin-bottom", "margin-left",
      "role", "aria-label", "tabindex",
    ];
  }

  attributeChangedCallback() {
    this.#syncFromAttributes();
    this.render();
  }

  /** Synchronizes all attributes and CSS variables */
  #syncFromAttributes() {
    const cols = parseInt(this.getAttribute("cols")) || 40;
    const rows = parseInt(this.getAttribute("rows")) || 20;

    // If palette attribute not set, try reading from global config
    const paletteAttr = this.getAttribute("palette");
    const globalPalette = document.documentElement.getAttribute("data-ttx-mosaic-palette");

    if (paletteAttr) {
    try {
        if (paletteAttr.trim().toLowerCase() === "teletext") {
        this._palette = MosaicElement.DEFAULT_PALETTE.slice();
        } else {
        const parsed = JSON.parse(paletteAttr);
        if (Array.isArray(parsed) && parsed.length > 0) {
            this._palette = parsed.map(String);
        }
        }
    } catch {
        this._palette = MosaicElement.DEFAULT_PALETTE.slice();
    }
    } else if (globalPalette) {
    try {
        const parsed = JSON.parse(globalPalette);
        if (Array.isArray(parsed) && parsed.length > 0) {
        this._palette = parsed.map(String);
        } else {
        this._palette = MosaicElement.DEFAULT_PALETTE.slice();
        }
    } catch {
        this._palette = MosaicElement.DEFAULT_PALETTE.slice();
    }
    } else {
    this._palette = MosaicElement.DEFAULT_PALETTE.slice();
    }

    this._cols = Math.max(1, cols);
    this._rows = Math.max(1, rows);
    this._grid.style.gridTemplateColumns = `repeat(${this._cols}, minmax(0, 1fr))`;

    const setVar = (k, v) => (v != null ? this.style.setProperty(k, String(v)) : this.style.removeProperty(k));

    setVar("--ttx-mosaic-cell-size", this.getAttribute("cell-size"));
    setVar("--ttx-mosaic-gap", this.getAttribute("gap"));
    setVar("--ttx-mosaic-background", this.getAttribute("background"));
    setVar("--ttx-mosaic-color", this.getAttribute("color"));
    setVar("--ttx-mosaic-border", this.getAttribute("border"));
    setVar("--ttx-mosaic-radius", this.getAttribute("radius"));
    setVar("--ttx-mosaic-shadow", this.getAttribute("shadow"));

    setVar("--ttx-mosaic-padding", this.getAttribute("padding"));
    setVar("--ttx-mosaic-padding-top", this.getAttribute("padding-top"));
    setVar("--ttx-mosaic-padding-right", this.getAttribute("padding-right"));
    setVar("--ttx-mosaic-padding-bottom", this.getAttribute("padding-bottom"));
    setVar("--ttx-mosaic-padding-left", this.getAttribute("padding-left"));

    setVar("--ttx-mosaic-margin", this.getAttribute("margin"));
    setVar("--ttx-mosaic-margin-top", this.getAttribute("margin-top"));
    setVar("--ttx-mosaic-margin-right", this.getAttribute("margin-right"));
    setVar("--ttx-mosaic-margin-bottom", this.getAttribute("margin-bottom"));
    setVar("--ttx-mosaic-margin-left", this.getAttribute("margin-left"));
  }

  /** Renders the mosaic grid based on current attributes */
  render() {
    // Prefer inner text over data attribute for cleaner HTML
    const content = this.textContent?.trim();
    const raw = (content || this.getAttribute("data") || "")
        .trim()
        .replace(/\s+/g, "");

    const total = this._cols * this._rows;
    const codes = raw.slice(0, total).padEnd(total, "0").split("");

    const frag = document.createDocumentFragment();
    for (let i = 0; i < total; i++) {
      const c = codes[i];
      const cell = document.createElement("div");
      cell.className = "cell";
      if (c === ".") {
        cell.style.background = "transparent";
      } else {
        const n = Number.isFinite(+c) ? +c : 0;
        const color = this._palette[n] ?? "transparent";
        cell.style.background = color;
      }
      frag.appendChild(cell);
    }

    this._grid.innerHTML = "";
    this._grid.appendChild(frag);
  }

  /** Number of columns in the mosaic grid */
  get cols() { return this._cols; }
  set cols(v) { this.setAttribute("cols", v); }

  /** Number of rows in the mosaic grid */
  get rows() { return this._rows; }
  set rows(v) { this.setAttribute("rows", v); }

  /** Data string defining the mosaic pattern */
  get data() { return this.getAttribute("data") || ""; }
  set data(v) { this.setAttribute("data", v); }

  /** Color palette (JSON array or "teletext") */
  get palette() { return this.getAttribute("palette"); }
  set palette(v) { this.setAttribute("palette", typeof v === "string" ? v : JSON.stringify(v)); }
}

if (!customElements.get("ttx-mosaic")) {
  customElements.define("ttx-mosaic", MosaicElement);
}
