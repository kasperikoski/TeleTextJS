/**
 * ============================================================
 * <ttx-blink> Web Component
 * ------------------------------------------------------------
 * A fully encapsulated blinking text element for TeletextJS.
 * Emulates the classic <blink> tag using modern CSS animation.
 *
 * Key features:
 *  - True inline behavior (renders via inner <span>)
 *  - Shadow DOM encapsulation for style isolation
 *  - Themed via CSS custom properties
 *  - Attribute-driven control for color, speed, and state
 *  - Accessibility support (ARIA roles, labels, keyboard focus)
 *  - Safe whitespace cleanup and reactivity
 * ============================================================
 */

class BlinkElement extends HTMLElement {
  constructor() {
    super();

    // Attach isolated Shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Create style and <span> wrapper for true inline rendering
    shadow.innerHTML = `
			<style>
				:host {
					display: inline;
					vertical-align: baseline;
					line-height: inherit;
					font: inherit;
					color: inherit;
					white-space: normal;
					padding: 0;
					margin: 0;
					border: none;
					background: none;
				}
				span.ttx-blink {
					display: inline;
					color: var(--ttx-blink-color, inherit);
					animation: ttx-blink var(--ttx-blink-speed, 1s) step-start infinite;
					animation-play-state: var(--ttx-blink-state, running);
				}
				@keyframes ttx-blink { 50% { visibility: hidden; } }
				::slotted(*) { margin: 0; padding: 0; }
			</style>
			<span class="ttx-blink"><slot></slot></span>
		`;
  }

  connectedCallback() {
    // Default accessibility role if not explicitly defined	
    if (!this.hasAttribute("role")) {
        this.setAttribute("role", "text");
    }
  }

  /**
   * ============================================================
   * Attribute → CSS variable mapping
   * ------------------------------------------------------------
   * Supports kebab-case or compressed names:
   *   - color → --ttx-blink-color
   *   - speed → --ttx-blink-speed
   *   - state → --ttx-blink-state (running | paused)
   * ============================================================
   */
  static #ATTR_TO_VAR = {
    "color": "color",
    "speed": "speed",
    "state": "state"
  };

  static get observedAttributes() {
    return [
      ...Object.keys(this.#ATTR_TO_VAR),
      "role",
      "aria-label",
      "tabindex"
    ];
  }

  attributeChangedCallback(name, _old, value) {
    const key = name.toLowerCase();

    // Accessibility passthrough
    if (key === "role" || key === "aria-label" || key === "tabindex") {
      return; // handled automatically by browser attribute reflection
    }

    // Visual attribute handling
    const varSuffix = BlinkElement.#ATTR_TO_VAR[key];
    if (varSuffix) {
      const cssVar = `--ttx-blink-${varSuffix}`;
      if (value == null) {
        this.style.removeProperty(cssVar);
      } else {
        // Automatically append "s" to numeric speed values
        const formattedValue = (key === "speed" && !isNaN(value))
          ? `${value}s`
          : value;
        this.style.setProperty(cssVar, String(formattedValue));
      }
    }
  }

  // ============================================================
  // Property reflection (for JS API parity with attributes)
  // ============================================================

  get color() { return this.getAttribute("color"); }
  set color(v) { this.#setOrRemove("color", v); }

  get speed() { return this.getAttribute("speed"); }
  set speed(v) { this.#setOrRemove("speed", v); }

  get state() { return this.getAttribute("state"); }
  set state(v) { this.#setOrRemove("state", v); }

  get role() { return this.getAttribute("role"); }
  set role(v) { this.#setOrRemove("role", v); }

  get ariaLabel() { return this.getAttribute("aria-label"); }
  set ariaLabel(v) { this.#setOrRemove("aria-label", v); }

  get tabIndex() { return this.getAttribute("tabindex"); }
  set tabIndex(v) { this.#setOrRemove("tabindex", v); }

  #setOrRemove(attr, v) {
    if (v == null || v === false) this.removeAttribute(attr);
    else this.setAttribute(attr, String(v));
  }
}

// Prevent duplicate registration (e.g., HMR/dev mode)
if (!customElements.get("ttx-blink")) {
  customElements.define("ttx-blink", BlinkElement);
}
