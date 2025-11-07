/**
 * ============================================================
 * <ttx-title> Web Component
 * ------------------------------------------------------------
 * A freely positionable heading/title element for TeletextJS.
 * Designed to display large, stylized text overlays above
 * teletext content while maintaining scaling and responsiveness.
 *
 * Key features:
 *  - Absolute positioning within the Teletext screen
 *  - Fully themeable via CSS custom properties
 *  - Attribute-driven overrides (position, color, size, etc.)
 *  - Safe with scaling (uses --ttx-scale variable when available)
 *  - Non-interactive (pointer-events disabled)
 *  - Basic ARIA role for accessibility
 * ============================================================
 */
class TitleElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host {
          position: absolute;
          display: inline-flex;
          justify-content: center;
          align-items: center;

          /* Layering and visibility */
          z-index: var(--ttx-title-zIndex, 1000);
          pointer-events: none;
          white-space: nowrap;

          /* Positioning (percentages relative to Teletext screen) */
          top: var(--ttx-title-top, 10%);
          left: var(--ttx-title-left, 50%);
          transform: translateX(-50%) translateY(var(--ttx-title-offset, 0em));

          /* Typography */
          color: var(--ttx-title-color, yellow);
          font-family: var(--ttx-title-font, "PixelFont", monospace);
          font-size: calc(var(--ttx-title-size, 2em) * var(--ttx-scale, 1));
          font-weight: var(--ttx-title-weight, bold);
          line-height: var(--ttx-title-lineHeight, 1);
          text-align: var(--ttx-title-align, center);
          text-shadow: var(--ttx-title-shadow, none);

          /* Optional background / border */
          background: var(--ttx-title-background, transparent);
          border: var(--ttx-title-border, none);
          border-radius: var(--ttx-title-radius, 0);
          box-sizing: border-box;

          /* Spacing */
          margin: var(--ttx-title-margin, 0);
          padding: var(--ttx-title-padding, 0);
        }

        ::slotted(*) {
          margin: 0;
          white-space: normal;
        }
      </style>
      <slot></slot>
    `;
  }

  connectedCallback() {
    // Accessibility defaults
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "heading");
      this.setAttribute("aria-level", "1");
    }

    // Default positioning if missing
    if (!this.hasAttribute("left")) this.style.setProperty("--ttx-title-left", "50%");
    if (!this.hasAttribute("top")) this.style.setProperty("--ttx-title-top", "10%");
  }

  /**
   * Maps supported HTML attributes to corresponding CSS variables.
   * Allows flexible configuration via HTML attributes.
   */
  static #ATTR_TO_VAR = {
    "top": "top",
    "left": "left",
    "color": "color",
    "size": "size",
    "font": "font",
    "weight": "weight",
    "align": "align",
    "z": "zIndex",
    "shadow": "shadow",
    "background": "background",
    "border": "border",
    "radius": "radius",
    "margin": "margin",
    "padding": "padding",
    "offset": "offset"
  };

  static get observedAttributes() {
    return Object.keys(this.#ATTR_TO_VAR);
  }

  attributeChangedCallback(name, oldValue, value) {
    const varSuffix = TitleElement.#ATTR_TO_VAR[name.toLowerCase()];
    if (varSuffix) {
      const cssVar = `--ttx-title-${varSuffix}`;
      if (value == null) this.style.removeProperty(cssVar);
      else this.style.setProperty(cssVar, String(value));
    }
  }

  // Ergonomic property reflection
  get top() { return this.getAttribute("top"); }
  set top(v) { this.#setOrRemove("top", v); }

  get left() { return this.getAttribute("left"); }
  set left(v) { this.#setOrRemove("left", v); }

  get color() { return this.getAttribute("color"); }
  set color(v) { this.#setOrRemove("color", v); }

  get size() { return this.getAttribute("size"); }
  set size(v) { this.#setOrRemove("size", v); }

  get z() { return this.getAttribute("z"); }
  set z(v) { this.#setOrRemove("z", v); }

  get font() { return this.getAttribute("font"); }
  set font(v) { this.#setOrRemove("font", v); }

  #setOrRemove(attr, v) {
    if (v == null || v === false) this.removeAttribute(attr);
    else this.setAttribute(attr, String(v));
  }
}

// Guard against duplicate registration
if (!customElements.get("ttx-title")) {
  customElements.define("ttx-title", TitleElement);
}
