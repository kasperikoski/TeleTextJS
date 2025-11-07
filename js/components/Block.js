/**
 * ============================================================
 * <ttx-block> Web Component
 * ------------------------------------------------------------
 * A self-contained visual block element for TeletextJS.
 * Reads its styling from CSS variables defined globally
 * or through TeletextConfig.block.
 *
 * Key features:
 *  - Shadow DOM encapsulation for style isolation
 *  - Fully themable via CSS custom properties
 *  - Safe against inherited white-space settings (pre-wrap)
 *  - Attribute-driven overrides (background, color, padding, etc.)
 * ============================================================
 */
class BlockElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host {
          display: flow-root;
          white-space: normal;

          /* Background & border */
          background: var(--ttx-block-background, blue);
          color: var(--ttx-block-color, white);
          border: var(--ttx-block-border, none);
          border-radius: var(--ttx-block-radius, 3px);
          box-shadow: var(--ttx-block-shadow, none);
          box-sizing: border-box;

          /* Typography */
          font-size: var(--ttx-block-fontSize, 1em);
          line-height: var(--ttx-block-lineHeight, 1.2);

          /* Padding (4-way support) */
          padding-top: var(--ttx-block-padding-top, 0.25em);
          padding-right: var(--ttx-block-padding-right, 0.5em);
          padding-bottom: var(--ttx-block-padding-bottom, 0.25em);
          padding-left: var(--ttx-block-padding-left, 0.5em);

          /* Margin (4-way support) */
          margin-top: var(--ttx-block-margin-top, 0.25em);
          margin-right: var(--ttx-block-margin-right, 0);
          margin-bottom: var(--ttx-block-margin-bottom, 0.25em);
          margin-left: var(--ttx-block-margin-left, 0);
        }

        ::slotted(*) {
          margin: 0;
          white-space: normal !important;
        }

        ::slotted(a.ttx-link) {
          color: cyan;
          text-decoration: none;
        }

        ::slotted(text) {
          white-space: normal !important;
        }
      </style>
      <slot></slot>
    `;
  }

  connectedCallback() {
    // Apply font as soon as element is connected
    const font = this.getAttribute("font") || "var(--ttx-title-font)";
    this.style.fontFamily = font;

    // Ensure any bare text nodes are wrapped in <span> for consistent rendering,
    // without moving element nodes (e.g. <a>, <b>, <ttx-*>)
    const textNodes = Array.from(this.childNodes).filter(
      node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
    );

    if (textNodes.length > 0) {
      textNodes.forEach(node => {
        const wrapper = document.createElement('span');
        wrapper.style.whiteSpace = 'normal';
        node.parentNode.insertBefore(wrapper, node);
        wrapper.appendChild(node);
      });
    }

    // Trim only one leading or trailing space around this element
    if (this.previousSibling && this.previousSibling.nodeType === Node.TEXT_NODE) {
      this.previousSibling.textContent = this.previousSibling.textContent.replace(/ $/, '');
    }
    if (this.nextSibling && this.nextSibling.nodeType === Node.TEXT_NODE) {
      this.nextSibling.textContent = this.nextSibling.textContent.replace(/^ /, '');
    }

    // Default accessibility role
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "heading");
    }
  }

  /**
   * Attribute → CSS variable mapping.
   * Supports both kebab-case and "compressed" aliases:
   *   - font-size  / fontsize    → --ttx-block-fontSize
   *   - line-height / lineheight → --ttx-block-lineHeight
   */
  static #ATTR_TO_VAR = {
    // color & background
    "background": "background",
    "color": "color",

    // padding (4-way)
    "padding": "padding",
    "padding-top": "padding-top",
    "padding-right": "padding-right",
    "padding-bottom": "padding-bottom",
    "padding-left": "padding-left",

    // margin (4-way)
    "margin": "margin",
    "margin-top": "margin-top",
    "margin-right": "margin-right",
    "margin-bottom": "margin-bottom",
    "margin-left": "margin-left",

    // typography & shape
    "font-size": "fontSize",
    "fontsize": "fontSize",
    "line-height": "lineHeight",
    "lineheight": "lineHeight",
    "radius": "radius",
    "border": "border",
    "shadow": "shadow",
  };

  static get observedAttributes() {
    return [
      ...Object.keys(this.#ATTR_TO_VAR),
      // Accessibility pass-through
      "role",
      "aria-label",
      "tabindex",
    ];
  }

  attributeChangedCallback(name, oldValue, value) {
    // a11y pass-throughs — only update if value actually changed
    if (name === "role") {
      if (this.getAttribute("role") !== value) {
        super.setAttribute?.("role", value ?? "");
      }
      return;
    }
    if (name === "aria-label") {
      if (this.getAttribute("aria-label") !== value) {
        super.setAttribute?.("aria-label", value ?? "");
      }
      return;
    }
    if (name === "tabindex") {
      if (this.getAttribute("tabindex") !== value) {
        super.setAttribute?.("tabindex", value ?? "");
      }
      return;
    }

    // visual tokens
    const key = name.toLowerCase();
    const varSuffix = BlockElement.#ATTR_TO_VAR[key];
    if (varSuffix) {
      const cssVar = `--ttx-block-${varSuffix}`;
      if (value == null) {
        this.style.removeProperty(cssVar);
      } else {
        this.style.setProperty(cssVar, String(value));
      }
    }
  }

  // -------- Optional property reflection (ergonomic JS API) --------
  get background() { return this.getAttribute("background"); }
  set background(v) { this.#setOrRemove("background", v); }

  get color() { return this.getAttribute("color"); }
  set color(v) { this.#setOrRemove("color", v); }

  get padding() { return this.getAttribute("padding"); }
  set padding(v) { this.#setOrRemove("padding", v); }

  get fontSize() { return this.getAttribute("font-size") ?? this.getAttribute("fontsize"); }
  set fontSize(v) {
    if (v == null) this.removeAttribute("font-size");
    else this.setAttribute("font-size", v);
  }

  get lineHeight() { return this.getAttribute("line-height") ?? this.getAttribute("lineheight"); }
  set lineHeight(v) {
    if (v == null) this.removeAttribute("line-height");
    else this.setAttribute("line-height", v);
  }

  get radius() { return this.getAttribute("radius"); }
  set radius(v) { this.#setOrRemove("radius", v); }

  get margin() { return this.getAttribute("margin"); }
  set margin(v) { this.#setOrRemove("margin", v); }

  get border() { return this.getAttribute("border"); }
  set border(v) { this.#setOrRemove("border", v); }

  get shadow() { return this.getAttribute("shadow"); }
  set shadow(v) { this.#setOrRemove("shadow", v); }

  #setOrRemove(attr, v) {
    if (v == null || v === false) this.removeAttribute(attr);
    else this.setAttribute(attr, String(v));
  }
}

// Guard against double registration (useful with HMR/dev servers)
if (!customElements.get("ttx-block")) {
  customElements.define("ttx-block", BlockElement);
}
