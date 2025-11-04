/*!
 * Teletext.js v3.0
 * Author: Kasperi Koski
 * License: MIT
 *
 * =====================================================
 *  USAGE:
 *  1. Include teletext.css and teletext.js
 *  2. Add <div id="teletext"></div> to your HTML
 *  3. Optionally include config.js to override defaults
 *  4. Call Teletext.init(pages [, options]);
 *
 *  Example:
 *  const pages = {
 *    100: { title: "Home", headline: "Welcome",
 *           content: "Use [yellow]keys[/yellow] to navigate." },
 *    200: { title: "Weather", headline: "Today",
 *           content: ["Page 1 text", "Page 2 text"] }
 *  };
 *  Teletext.init(pages, { aspectRatio: 16/9, border: { width: 2, color: "#0f0" } });
 * =====================================================
 */

class Teletext {
  /**
   * ============================================================
   * DEFAULT CONFIGURATION — Teletext.js v1.0
   * ============================================================
   * 
   * All parameters define the visual and behavioral defaults of
   * the Teletext system. Each property can be overridden:
   *  1. Globally via `config.js`
   *  2. Per-instance via `Teletext.init(pages, options)`
   *
   * The configuration is grouped into the following categories:
   *   - Core Behavior
   *   - Layout and Aspect Ratio
   *   - Font and Text System
   *   - Header Bar Customization
   *   - Title Alignment and Margins
   * ============================================================
   */
  static config = {

   /* ============================================================
    * CORE SETTINGS
    * ============================================================ */

    /** HTML container element ID for rendering the Teletext interface */
    containerId: "teletext",

    /** Optional remote JSON endpoint for Teletext page data */
    fetchUrl: null, // e.g. '/api/pages' or 'https://example.com/teletext.json'

    /** The first page loaded when Teletext starts */
    defaultPage: 100,

    /** Enables keyboard navigation (numbers, arrows, backspace) */
    enableKeyboard: true,

    /** Defines the default text color for all normal text */
    baseTextColor: "#ffffff",

    /** Whether to display the mobile device notice */
    showMobileNotice: true,

    /** Screen aspect ratio (width / height), e.g. 4/3 or 16/9 */
    aspectRatio: 4 / 3,

    /** Default container width */
    containerWidth: "100%",

    /** CSS display mode ("block", "inline-block", etc.) */
    containerDisplay: "block",

    /** Horizontal alignment of the Teletext container ("left", "center", or "right") */
    containerAlign: "center",

    /** Maximum width of the Teletext area */
    maxWidth: "800px",

    /** Native pixel width used for scaling calculations */
    nativeWidth: 800,

    /** Whether links should be underlined in content */
    linkUnderline: false,

    /** Blink interval in milliseconds */
    blinkRate: 1000,


    /* ============================================================
    * LINE ELEMENT CONFIGURATION
    * ------------------------------------------------------------
    * Controls the appearance of the [line] markup tag.
    * ============================================================ */
    line: {
      /** Default line thickness */
      thickness: "0.3em",
      /** Line color */
      color: "#fff",
      /** Line style: solid | dashed | dotted | double */
      style: "solid",
      /** Vertical spacing above the line */
      marginTop: "0.5em",
      /** Vertical spacing below the line */
      marginBottom: "0.5em"
    },


    /* ============================================================
    * DEFAULT BLOCK BACKGROUND
    * ------------------------------------------------------------
    * Defines the background color for [block] elements that do
    * not specify their own color.
    * ============================================================ */
    defaultBlockBackground: "blue",


    /* ============================================================
    * FONT SYSTEM — GLOBAL TYPOGRAPHY CONTROL
    * ============================================================ */

    /** Base font size (reference in px, affects scaling) */
    baseSize: 22,

    /** Main body text size (relative to base font size) */
    contentFontSize: "1em",

    /** Font sizes for heading levels (inside content area) */
    headerFontSizes: {
      h1: "1.9em",
      h2: "1.7em",
      h3: "1.6em",
      h4: "1.5em",
      h5: "1.4em",
      h6: "1.3em"
    },

    /** Font colors for heading levels (inside content area) */
    headerFontColors: {
      h1: "yellow",
      h2: "yellow",
      h3: "yellow",
      h4: "yellow",
      h5: "yellow",
      h6: "yellow"
    },


    /* ============================================================
    * FRAME / BORDER CONFIGURATION
    * ============================================================ */
    border: {
      /** Whether the outer frame is visible */
      enabled: false,
      /** Frame thickness in pixels */
      width: 4,
      /** Border color (CSS color value) */
      color: "#cccccc",
      /** Border style: solid | dashed | double | none */
      style: "solid",
      /** Optional corner radius in pixels */
      radius: 6,
      /** Enables soft glowing shadow effect */
      glow: false,
      /** Glow color if glow = true */
      glowColor: "rgba(220, 220, 220, 0.6)"
    },


    /* ============================================================
    * MOBILE NOTICE
    * ============================================================ */

    /** Message displayed on mobile devices */
    mobileNotice:
      "This interactive teletext interface works best on a computer. On mobile, navigation may be limited.",


    /* ============================================================
    * HEADER BAR (TOP INFO ROW)
    * ============================================================ */

    /** Background theme for the header bar */
    headerBackground: "blue",

    /** Outer margins for the header bar */
    headerMarginTop: "1em",
    headerMarginBottom: "1em",
    headerMarginLeft: "1em",
    headerMarginRight: "1em",


    /* ------------------------------
    * Page number settings
    * ------------------------------ */

    /** Font size for the page number */
    pageNumberSize: "1em",
    /** Font weight for the page number */
    pageNumberWeight: "normal",
    /** Color for the page number text */
    pageNumberColor: "#fff",


    /* ------------------------------
    * Header title settings
    * ------------------------------ */

    /** Color for the header title text */
    titleColor: "#fff",
    /** Font weight for the header title text */
    titleWeight: "normal",
    /** Font size for the header title */
    titleSize: "1em",
    /** Horizontal alignment for the title text */
    titleAlign: "left",
    /** Inner margins around the title text */
    titleMarginLeft: "1em",
    titleMarginRight: "1em",


    /* ------------------------------
    * Subpage counter settings
    * ------------------------------ */

    /** Font size for the subpage number (e.g. "1/4") */
    subpageNumberSize: "1em",
    /** Font weight for the subpage number */
    subpageNumberWeight: "normal",
    /** Color for the subpage number text */
    subpageNumberColor: "#fff",


    /* ============================================================
    * DATETIME SETTINGS — HEADER BAR CLOCK & DATE
    * ============================================================ */
    datetime: {
      /** Master toggle for datetime display */
      enabled: true,
      /** Horizontal position ("left" or "right") */
      position: "right",
      /** Locale used for date and time formatting */
      locale: "en-US",
      /** Whether to show current time */
      showClock: true,
      /** Whether to show the date */
      showDate: false,
      /** Whether to show weekday name */
      showWeekday: true,
      /** Time format (e.g. "HH:MM:SS") */
      timeFormat: "HH:MM:SS",
      /** Date format (e.g. "DD.MM.YYYY") */
      dateFormat: "DD.MM.YYYY",
      /** Weekday name format ("short" or "long") */
      weekdayFormat: "short",
      /** Text color */
      color: "#ffffff",
      /** Font weight */
      fontWeight: "normal",
      /** Font size */
      size: "1em",
      /** Left margin spacing */
      marginLeft: "0.5em",
      /** Right margin spacing */
      marginRight: "0.5em"
    },


    /* ============================================================
    * CONTENT AREA SETTINGS
    * ============================================================ */

    /** Left padding inside the content area */
    contentPaddingLeft: "1em",

    /** Right padding inside the content area */
    contentPaddingRight: "1em",

    /** Vertical line height for content text */
    contentLineHeight: "1.2",


    /* ============================================================
    * VISUAL EFFECTS (optional)
    * ============================================================ */

    /** Enables subtle CRT flicker animation */
    enableFlicker: true,

    /** Speed of the flicker animation (e.g. "4s", "6s") */
    flickerSpeed: "4s",

    /** Corner radius of the Teletext screen */
    screenRadius: "0.5em",


    /* ============================================================
    * FOOTER TEXT (BOTTOM INFORMATION ROW)
    * ============================================================ */
    /** Whether to display the footer hint text */
    showFooterText: true,
    /** The text displayed in the footer */
    footerText: "Use Arrow keys or numbers (100–999). [↑/↓] changes subpages.",
    /** Footer placement: "inside" (default) or "below" */
    footerPosition: "below",


    /* ============================================================
    * BUTTON PANEL (ON-SCREEN CONTROLS)
    * ============================================================ */
    buttons: {
      /** Show or hide the on-screen control buttons */
      enabled: true,
      /** Display numeric keypad (0–9) */
      showNumeric: true,
      /** Optional container ID for buttons */
      containerId: "teletext-controls",
      /** Button position: "below", "left", "right", or "custom" */
      position: "custom",
      /** Button background color */
      buttonBg: "#000",
      /** Button text color */
      buttonFg: "#0f0",
      /** CSS border definition for buttons */
      buttonBorder: "3px solid #0f0",
      /** Corner radius for buttons */
      buttonBorderRadius: "8px",
      /** Hover background color */
      buttonHoverBg: "#0f0",
      /** Hover text color */
      buttonHoverFg: "#000",
      /** Font family used for buttons */
      fontFamily: "'European Teletext', monospace",
      /** Button font size */
      buttonFontSize: "1em",
      /** Internal padding for buttons */
      buttonPadding: "0.6em 1.2em",
      /** Gap between adjacent buttons */
      buttonGap: "1em"
    }
  };

  /** Runtime state */
  static state = {
    current: 100,
    pages: {},
    subpages: [],
    subIndex: 0,
    numInput: '',
  };

  /**
   * ============================================================
   * Initialize the Teletext system.
   * ------------------------------------------------------------
   * This method sets up the Teletext environment, renders the
   * initial layout, applies dynamic styles, and binds optional
   * interaction modules (keyboard + control buttons).
   *
   * Execution order:
   *  1. Merge configuration sources (defaults ← config.js ← options)
   *  2. Validate and store container reference
   *  3. Render layout structure
   *  4. Apply dynamic visual configuration
   *  5. Load initial page or fetch remote pages
   *  6. Bind event handlers (resize, keyboard)
   *  7. Initialize optional button interface
   *
   * @param {Object} pages - Object containing Teletext pages (id → page data)
   * @param {Object} options - Optional configuration overrides
   * ============================================================
   */
  static init(pages = {}, options = {}) {

    // ============================================================
    // 1. MERGE CONFIGURATION SOURCES
    // ------------------------------------------------------------
    // Combine Teletext.js defaults with optional global config.js
    // and inline init() options, in this order of precedence:
    //    defaults ← config.js ← options
    // ============================================================
    const merged = JSON.parse(JSON.stringify(this.config)); // clone defaults
    if (window.TeletextConfig && typeof window.TeletextConfig === "object") {
      this.mergeDeep(merged, window.TeletextConfig);
    }
    if (options && typeof options === "object") {
      this.mergeDeep(merged, options);
    }
    this.config = merged;

    // ============================================================
    // 2. SETUP RUNTIME STATE
    // ============================================================
    this.state.pages = pages;
    this.state.current = this.config.defaultPage;

    // Locate container element
    this.container = document.getElementById(this.config.containerId);
    if (!this.container) {
      console.error("Teletext: container not found.");
      return;
    }

    // Ensure Teletext wrapper class exists
    this.container.classList.add("ttx-wrapper");

    // ============================================================
    // 3. RENDER LAYOUT STRUCTURE
    // ============================================================
    this.renderLayout();

    // ============================================================
    // 4. APPLY DYNAMIC STYLES
    // ============================================================
    this.applyDynamicStyle();

    // ============================================================
    // 5. LOAD INITIAL PAGE OR FETCH REMOTE DATA
    // ============================================================
    if (this.config.fetchUrl) this.fetchPages();
    else this.loadPage(this.state.current);

    // ============================================================
    // 6. BIND EVENT HANDLERS
    // ============================================================
    if (this.config.enableKeyboard) this.bindKeyboard();

    // Maintain correct scaling on load and resize
    window.addEventListener("resize", () => this.adjustAspect());
    window.addEventListener("load", () => this.adjustAspect());
    this.adjustAspect();

    // ============================================================
    // 7. OPTIONAL CONTROL BUTTONS
    // ============================================================
    if (typeof TeletextButtons !== "undefined") {
      TeletextButtons.init(this);
    }
  }

  /** Apply dynamic styling for [line] elements */
  static applyLineStyle() {
    const line = this.config.line || {};
    this.container.style.setProperty("--ttx-line-thickness", line.thickness || "2px");
    this.container.style.setProperty("--ttx-line-color", line.color || "#fff");
    this.container.style.setProperty("--ttx-line-style", line.style || "solid");
    this.container.style.setProperty("--ttx-line-mt", line.marginTop || "0.5em");
    this.container.style.setProperty("--ttx-line-mb", line.marginBottom || "0.5em");
  }

  /** 
   * Apply inline dynamic styles for container, header and text system.
   * Runs after layout is rendered so all DOM nodes exist.
   * Applies every font-related variable unconditionally.
   */
  static applyDynamicStyle() {
    const c = this.config;

    // === Border (frame) style ===
    let borderStyle = "";
    if (c.border?.enabled) {
      const b = c.border;
      borderStyle = `
        border: ${b.width || 0}px ${b.style || "solid"} ${b.color || "#0f0"};
        border-radius: ${b.radius || 0}px;
        ${b.glow ? `box-shadow: 0 0 ${Math.max(4, b.width * 2)}px ${b.glowColor || b.color};` : ""}
      `;
    }

    // === Base container style ===
    this.container.style.cssText = `
      position: relative;
      background: black;
      ${borderStyle}
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      padding: 0.8em 1.2em;
      box-sizing: border-box;
    `;

    // === Configurable layout overrides ===
    this.container.style.width = c.containerWidth || "100%";
    this.container.style.maxWidth = c.maxWidth || "800px";
    this.container.style.height = "auto";
    this.container.style.display = c.containerDisplay || "flex";

    // === Content area styling variables ===
    const cfgC = (typeof window !== "undefined" && window.TeletextConfig) || {};
    document.documentElement.style.setProperty("--ttx-content-padding-left", cfgC.contentPaddingLeft || c.contentPaddingLeft || "1em");
    document.documentElement.style.setProperty("--ttx-content-padding-right", cfgC.contentPaddingRight || c.contentPaddingRight || "1em");
    document.documentElement.style.setProperty("--ttx-content-line-height", cfgC.contentLineHeight || c.contentLineHeight || "1.2");


    // === Horizontal alignment ===
    switch ((c.containerAlign || "center").toLowerCase()) {
      case "left":
        this.container.style.margin = "0 auto 0 0";   // align left
        break;
      case "right":
        this.container.style.margin = "0 0 0 auto";   // align right
        break;
      default:
        this.container.style.margin = "0 auto";       // center (default)
    }

    // === Blink rate variable ===
    const blinkMs = Number(c.blinkRate) || 1000; // fallback if invalid
    this.container.style.setProperty("--ttx-blink-rate", `${blinkMs}ms`);

    // === Font variables (apply globally) ===
    this.container.style.setProperty("--ttx-base-size", `${c.baseSize}px`);
    this.container.style.setProperty("--ttx-content-size", c.contentFontSize);
    this.container.style.setProperty("--ttx-title-size", c.titleSize);

    // Apply per-heading sizes (h1–h6)
    for (const [tag, size] of Object.entries(c.headerFontSizes)) {
      this.container.style.setProperty(`--ttx-${tag}-size`, size);
    }

    // Apply per-heading colors (h1–h6)
    for (const [tag, color] of Object.entries(c.headerFontColors || {})) {
      this.container.style.setProperty(`--ttx-${tag}-color`, color);
    }

    // === Header-specific variables ===
    const header = this.container.querySelector(".ttx-header");
    if (header) this.applyHeaderStyle(header);

    // Safely retrieve header margin configuration from global TeletextConfig (if available)
    const cfgH = (typeof window !== "undefined" && window.TeletextConfig) || {};

    // Apply header element margins (top, left, right)
    header.style.marginTop = cfgH.headerMarginTop || c.headerMarginTop || "1.0em";
    header.style.marginLeft = cfgH.headerMarginLeft || c.headerMarginLeft || "1em";
    header.style.marginRight = cfgH.headerMarginRight || c.headerMarginRight || "1em";

    // === Base text color variable ===
    this.container.style.setProperty("--ttx-base-text-color", c.baseTextColor || "#ffffff");

    // === Default block background ===
    let blockBg = c.defaultBlockBackground || "rgba(0,0,255,0.6)";
    if (!blockBg.startsWith("#") && !blockBg.startsWith("rgb") && !blockBg.includes("(")) {
      // If user specified a Teletext color name, map it to class variable
      blockBg = `var(--ttx-bg-${blockBg}, ${blockBg})`;
    }
    this.container.style.setProperty("--ttx-block-default-bg", blockBg);

    /** Apply the set line style */
    this.applyLineStyle();

    /** Toggle link underline class based on config.linkUnderline */
    if (this.config.linkUnderline) {
      this.container.classList.remove("ttx-links-no-underline");
      this.container.classList.add("ttx-links-underline");
    } else {
      this.container.classList.remove("ttx-links-underline");
      this.container.classList.add("ttx-links-no-underline");
    }

    /** Apply container max width as CSS variable */
    this.container.style.setProperty("--ttx-max-width", this.config.maxWidth || "800px");
  }

  /** Apply all header-related CSS properties (shared by layout and dynamic style) */
  static applyHeaderStyle(header, source = this.config) {
    if (!header) return;
    const c = source;

    // Header background color class
    if (c.headerBackground) {
      const bgClass = this.resolveBackgroundClass(
        c.headerBackground,
        this.config.headerBackground,
        "#0000ff"
      );
      header.classList.add(bgClass);

      /** Apply direct color if no predefined class exists */
      if (!bgClass.startsWith("bg-")) {
        header.style.setProperty("background", bgClass, "important");
      }
    }

    // Font sizes
    header.style.setProperty("--ttx-page-number-size", c.pageNumberSize || "1em");
    header.style.setProperty("--ttx-title-size", c.titleSize || "2em");
    header.style.setProperty("--ttx-subpage-number-size", c.subpageNumberSize || "1em");

    // Font weights
    header.style.setProperty("--ttx-page-number-weight", c.pageNumberWeight || "normal");
    header.style.setProperty("--ttx-title-weight", c.titleWeight || "normal");
    header.style.setProperty("--ttx-subpage-number-weight", c.subpageNumberWeight || "normal");

    // Colors
    header.style.setProperty("--ttx-page-number-color", c.pageNumberColor || "#fff");
    header.style.setProperty("--ttx-title-color", c.titleColor || "#fff");
    header.style.setProperty("--ttx-subpage-number-color", c.subpageNumberColor || "#fff");

    // Title alignment and margins
    header.style.setProperty("--ttx-title-align", c.titleAlign);
    header.style.setProperty("--ttx-title-ml", c.titleMarginLeft);
    header.style.setProperty("--ttx-title-mr", c.titleMarginRight);

    // Safely retrieve header margin configuration from global TeletextConfig (if available)
    const cfgH = (typeof window !== "undefined" && window.TeletextConfig) || {};

    // Define CSS custom properties for header margins
    document.documentElement.style.setProperty("--ttx-header-margin-top", cfgH.headerMarginTop || c.headerMarginTop || "1em");
    document.documentElement.style.setProperty("--ttx-header-margin-right", cfgH.headerMarginRight || c.headerMarginRight || "1em");
    document.documentElement.style.setProperty("--ttx-header-margin-bottom", cfgH.headerMarginBottom || c.headerMarginBottom || "1em");
    document.documentElement.style.setProperty("--ttx-header-margin-left", cfgH.headerMarginLeft || c.headerMarginLeft || "1em");


    // === Visual effects (screen glass effect)===
    if (c.enableFlicker || (window.TeletextConfig && window.TeletextConfig.enableFlicker)) {
      const cfgV = (typeof window !== "undefined" && window.TeletextConfig) || {};
      document.documentElement.style.setProperty("--ttx-flicker-speed", cfgV.flickerSpeed || c.flickerSpeed || "4s");
      document.documentElement.style.setProperty("--ttx-screen-radius", cfgV.screenRadius || c.screenRadius || "0.5em");
    } else {
      // Disable animation if flicker not enabled
      document.documentElement.style.setProperty("--ttx-flicker-speed", "0s");
    }

    // Optional tip for developers
    // console.debug("[Teletext] Header style applied:", c);
  }

  /**
   * Updates or hides the datetime display according to
   * the merged configuration for the current page.
   * This method safely starts or stops the update loop
   * and hides the element when disabled.
   *
   * @param {Object} page - The currently loaded page definition.
   */
  static initDatetime(page) {
    const dtConfig = this.getDatetimeConfig(page);
    const el = this.container.querySelector("#ttx-datetime");
    if (!el) return;

    // Always stop previous timer
    clearInterval(this._dtInterval);

    // Hide entirely if disabled
    if (!dtConfig.enabled) {
      el.textContent = "";
      el.style.display = "none";
      return;
    }

    // Apply style immediately
    el.style.display = "inline";
    el.style.color = dtConfig.color || "#fff";
    el.style.fontSize = dtConfig.size || "1em";
    el.style.fontWeight = dtConfig.fontWeight || "normal";
    el.style.marginLeft = dtConfig.marginLeft || "0.5em";
    el.style.marginRight = dtConfig.marginRight || "0.5em";

    // Positioning logic (left or right)
    const header = this.container.querySelector(".ttx-header");
    const pageNum = this.container.querySelector("#page-number");
    const subNum = this.container.querySelector("#subpage-number");
    if (dtConfig.position === "left" && pageNum && header) {
      header.insertBefore(el, pageNum.nextSibling);
    } else if (dtConfig.position === "right" && subNum && header) {
      header.insertBefore(el, subNum);
    }

    // If nothing is visible, hide again
    if (!dtConfig.showClock && !dtConfig.showDate && !dtConfig.showWeekday) {
      el.textContent = "";
      el.style.display = "none";
      return;
    }

    // === Generate text ===
    const fmtTime = (d) => {
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      const ss = d.getSeconds().toString().padStart(2, "0");
      return dtConfig.timeFormat === "HH:MM:SS" ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
    };

    const fmtDate = (d) => {
      const dd = d.getDate().toString().padStart(2, "0");
      const mm = (d.getMonth() + 1).toString().padStart(2, "0");
      const yyyy = d.getFullYear();
      switch (dtConfig.dateFormat) {
        case "MM.DD.YYYY": return `${mm}.${dd}.${yyyy}`;
        case "DD.MM.YYYY": return `${dd}.${mm}.${yyyy}`;
        case "MM.DD":      return `${mm}.${dd}`;
        case "DD.MM":      return `${dd}.${mm}`;
        default:           return `${dd}.${mm}.${yyyy}`;
      }
    };

    const fmtWeekday = (d) => {
      if (!dtConfig.showWeekday) return "";
      const fmt = dtConfig.weekdayFormat === "long" ? "long" : "short";
      return new Intl.DateTimeFormat(dtConfig.locale || "en-US", { weekday: fmt }).format(d);
    };

    const update = () => {
      const now = new Date();
      const parts = [];
      if (dtConfig.showWeekday) parts.push(fmtWeekday(now));
      if (dtConfig.showDate) parts.push(fmtDate(now));
      if (dtConfig.showClock) parts.push(fmtTime(now));
      el.textContent = parts.join(" ").replace(/\s+/g, " ").trim();
    };

    // Start live update
    update();
    this._dtInterval = setInterval(update, 1000);
  }


  /** 
   * Adjust wrapper scaling while maintaining aspect ratio.
   * Scales the entire Teletext screen (not font size) so
   * that it always fits horizontally within its container.
   */
  static adjustAspect() {
    const wrapper = this.container; // .ttx-wrapper
    const screen = wrapper.querySelector('.ttx-screen');
    if (!wrapper || !screen) return;

    const aspect = this.config.aspectRatio || (4 / 3);
    const baseWidth = this.config.nativeWidth || 800;

    // Update CSS variables
    wrapper.style.setProperty("--ttx-aspect", aspect);
    screen.style.setProperty("--ttx-native-width", `${baseWidth}px`);
    screen.style.setProperty("--ttx-native-height", `${baseWidth / aspect}px`);

    const availableWidth = wrapper.clientWidth;
    const scale = availableWidth / baseWidth;
    screen.style.setProperty("--ttx-scale", scale);
  }

  /** Fetch pages from remote source */
  static async fetchPages() {
    try {
      const res = await fetch(this.config.fetchUrl);
      if (!res.ok) throw new Error('HTTP error');
      this.state.pages = await res.json();
      this.loadPage(this.state.current);
    } catch (e) {
      this.contentArea.textContent = 'Error loading pages.';
      console.error(e);
    }
  }

  /**
   * @method renderLayout
   * @description
   * Creates the base Teletext HTML layout inside the configured container element.
   * This includes the screen wrapper, header, content area, and footer.
   *
   * The method ensures that:
   * - The header is styled immediately after rendering (before loading a page).
   * - The default page number displayed in the header reflects `this.config.defaultPage`.
   * - The footer is correctly positioned based on `this.config.footerPosition`.
   * - Mobile and custom footer text options are applied dynamically.
   *
   * This method is typically called once during initialization, right before
   * the first page is loaded.
   */
  static renderLayout() {
    // Determine the initial page number (use the current state or config default)
    const initialPage = Math.min(999, Math.max(0, Number(this.state.current || this.config.defaultPage) || 100));
    const initialPageStr = String(initialPage).padStart(3, "0");

    // Inject the base Teletext markup
    this.container.innerHTML = `
      <div id="ttx-screen" class="ttx-screen">
        <div class="ttx-header">
          <span id="page-number">${initialPageStr}</span>
          <span id="ttx-datetime"></span>
          <span id="page-title"></span>
          <span id="subpage-number"></span>
        </div>
        <div id="content" class="ttx-content"></div>
        <div id="ttx-footer" class="ttx-footer"></div>
      </div>
    `;

    // Cache key elements for later reference
    this.contentArea = this.container.querySelector("#content");
    this.footer = this.container.querySelector("#ttx-footer");

    // Apply header styles immediately after creation
    const header = this.container.querySelector(".ttx-header");
    if (header) this.applyHeaderStyle(header);

    // === Footer Text Handling ===
    if (this.isMobile() && this.config.showMobileNotice) {
      this.footer.textContent = this.config.mobileNotice;
    } else if (this.config.showFooterText) {
      // Use user-defined footer text or an empty fallback
      this.footer.textContent = this.config.footerText || "";
    } else {
      this.footer.textContent = "";
    }

    // === Footer Position Handling ===
    if (this.config.footerPosition === "below") {
      // Move footer below the main Teletext screen
      const wrapper = this.container.closest(".ttx-wrapper") || this.container;
      if (wrapper && this.footer.parentElement === this.container.querySelector(".ttx-screen")) {
        this.footer.remove();
        wrapper.insertAdjacentElement("afterend", this.footer);
      }
    } else {
      // Ensure footer is placed back inside the Teletext screen if needed
      const screen = this.container.querySelector(".ttx-screen");
      if (screen && this.footer.parentElement !== screen) {
        this.footer.remove();
        screen.appendChild(this.footer);
      }
    }

    // Toggle `.outside` class based on footer position
    if (this.config.footerPosition === "below") {
      this.footer.classList.add("outside");
    } else {
      this.footer.classList.remove("outside");
    }
  }

  /** Detect if user is on mobile */
  static isMobile() {
    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  }

  /**
   * Resolves a safe, valid background color for the Teletext header.
   *
   * Priority order:
   *   1. value (from config.js)
   *   2. init() fallback (from Teletext.init configuration)
   *   3. final fallback = #0000ff (pure blue)
   *
   * Behavior:
   *   - Accepts only exact "transparent" or "none" for transparency.
   *   - Validates all other color strings using the browser's CSS parser.
   *   - If invalid, falls back to the next available source.
   *   - Guarantees that the header background is never lost (never "none").
   *
   * @param {string} value - The header background color from config.js or page settings.
   * @param {string} initFallback - The fallback color defined during Teletext.init().
   * @param {string} [finalFallback="#0000ff"] - The ultimate fallback color (default: blue).
   * @returns {string} - A valid CSS color string or "bg-transparent" for transparency.
   */
  static resolveBackgroundClass(value, initFallback, finalFallback = "#0000ff") {
    // 1. No value provided → fallback
    if (!value) return initFallback || finalFallback;

    const clean = value.trim().toLowerCase();

    // 2. Accept only exact "transparent" or "none"
    if (clean === "transparent" || clean === "none") {
      return "bg-transparent";
    }

    // 3. Check if this is a valid CSS color using the browser’s own parser
    const test = document.createElement("div");
    test.style.color = clean;
    const isValid = !!test.style.color;

    if (isValid) {
      // Browser recognizes it as a valid color
      return clean;
    }

    // 4. Second-level fallback (init fallback)
    if (initFallback) {
      const fbClean = initFallback.trim().toLowerCase();
      const test2 = document.createElement("div");
      test2.style.color = fbClean;
      if (test2.style.color) {
        return fbClean;
      }
    }

    // 5. Final fallback (guaranteed safe)
    return finalFallback;
  }


  /**
   * ============================================================
   * DATETIME CONFIGURATION HELPERS
   * ============================================================
   * These static utility methods manage how per-page datetime
   * settings are resolved and merged with global defaults.
   * They ensure that any overrides defined in a page object are
   * correctly applied without mutating the base configuration.
   */

  /**
   * Extracts relevant datetime-related properties from a page object.
   * This allows defining quick inline overrides such as `showDate: false`
   * directly within the page configuration.
   *
   * @param {Object} page - The current page definition.
   * @returns {Object} - A filtered object containing recognized datetime keys.
   */
  static _extractDatetimeProps(page = {}) {
    const allowed = {
      // visibility
      showClock: "showClock",
      showDate: "showDate",
      showWeekday: "showWeekday",

      // formats
      timeFormat: "timeFormat",
      dateFormat: "dateFormat",
      weekdayFormat: "weekdayFormat",

      // style
      color: "color",
      fontWeight: "fontWeight",
      size: "size",
      marginLeft: "marginLeft",
      marginRight: "marginRight",

      // placement & global toggle
      position: "position",
      enabled: "enabled",
    };

    const extracted = {};
    for (const [key, mapped] of Object.entries(allowed)) {
      if (page[key] !== undefined) extracted[mapped] = page[key];
    }
    return extracted;
  }

  /**
   * Normalizes and merges the effective datetime configuration
   * for the currently active page. The resulting object represents
   * the final runtime settings for datetime rendering.
   *
   * Precedence order:
   *   1. Global defaults from `config.datetime`
   *   2. Flat per-page properties (e.g. `showDate`, `color`)
   *   3. Nested `datetime` object within the page
   *
   * @param {Object} page - The active page definition.
   * @returns {Object} - The computed datetime configuration for the page.
   */
  static _resolveDatetimeConfig(page = {}) {
    // Clone the global datetime config as the base
    const base = { ...(this.config.datetime || {}) };

    // Merge sources according to priority
    const flatOverrides = this._extractDatetimeProps(page);
    const nestedOverrides = page.datetime ? { ...page.datetime } : {};

    const effective = { ...base, ...flatOverrides, ...nestedOverrides };

    // Apply safe defaults
    if (effective.enabled === undefined) effective.enabled = true;
    if (effective.showClock === undefined) effective.showClock = true;

    return effective;
  }

  /**
   * Public helper to obtain a fully merged datetime configuration
   * for a given page. Designed to be called from `loadPage()` before
   * initializing the datetime renderer.
   *
   * @param {Object} page - The page definition currently being loaded.
   * @returns {Object} - A ready-to-use datetime config object.
   */
  static getDatetimeConfig(page = {}) {
    return this._resolveDatetimeConfig(page);
  }

  /**
   * Load a Teletext page by number.
   * ------------------------------------------------------------
   * This method handles all per-page customization logic and
   * runtime rendering updates. It processes headline markup,
   * manages subpages, applies header and color overrides, and
   * initializes the datetime display based on both global and
   * page-level settings.
   *
   * Supported per-page properties include:
   *  - title
   *  - headerBackground
   *  - titleAlign, titleMarginLeft, titleMarginRight
   *  - pageNumberColor, titleColor, subpageNumberColor
   *  - font sizes (pageNumberSize, titleSize, subpageNumberSize)
   *  - datetime overrides (showClock, showDate, etc.)
   *  - any CSS variable defined in global configuration
   *
   * Missing properties automatically fall back to global defaults
   * defined in `Teletext.config`.
   *
   * @param {number} num - The 3-digit Teletext page number.
   */
  static loadPage(num) {
    // --- Validate and wrap page number ---
    if (num < 100) num = 999;
    if (num > 999) num = 100;
    this.state.current = num;
    this.state.subpages = [];
    this.state.subIndex = 0;

    const page = this.state.pages[num];
    if (!page) return this.showNotFound(num);

    // --- SUBPAGE PROCESSING ---
    if (Array.isArray(page.content)) {
      this.state.subpages = page.content.map(txt => this.parseMarkup(txt));
    } else {
      this.state.subpages = [this.parseMarkup(page.content)];
    }

    // --- ELEMENT REFERENCES ---
    const header = this.container.querySelector(".ttx-header");
    const numEl = this.container.querySelector("#page-number");
    const titleEl = this.container.querySelector("#page-title");
    const subEl = this.container.querySelector("#subpage-number");

    // --- HEADER STYLE OVERRIDES ---
    if (header) {
      // 1. Header background theme
      const bg = page.headerBackground || this.config.headerBackground;
      if (bg) {
        header.classList.forEach(cls => {
          if (cls.startsWith("ttx-bg-")) header.classList.remove(cls);
        });
        header.classList.add(this.resolveBackgroundClass(bg));
      }

      // 2. Font sizes (may differ per page)
      header.style.setProperty("--ttx-page-number-size", page.pageNumberSize || this.config.pageNumberSize);
      header.style.setProperty("--ttx-title-size", page.titleSize || this.config.titleSize);
      header.style.setProperty("--ttx-subpage-number-size", page.subpageNumberSize || this.config.subpageNumberSize);

      // 3. Title alignment and margins
      const align = page.titleAlign || this.config.titleAlign;
      const ml = page.titleMarginLeft || this.config.titleMarginLeft;
      const mr = page.titleMarginRight || this.config.titleMarginRight;
      header.style.setProperty("--ttx-title-align", align);
      header.style.setProperty("--ttx-title-ml", ml);
      header.style.setProperty("--ttx-title-mr", mr);

      // 4. Optional color overrides
      const pageNumColor = page.pageNumberColor || this.config.pageNumberColor || "#fff";
      const titleColor = page.titleColor || this.config.titleColor || "#0ff";
      const subColor = page.subpageNumberColor || this.config.subpageNumberColor || "#ff0";

      header.style.setProperty("--ttx-page-number-color", pageNumColor);
      header.style.setProperty("--ttx-title-color", titleColor);
      header.style.setProperty("--ttx-subpage-number-color", subColor);

      numEl.style.color = pageNumColor;
      titleEl.style.color = titleColor;
      subEl.style.color = subColor;
    }

    // --- DATETIME INITIALIZATION ---
    this.initDatetime(page);

    // --- APPLY CONTENT ---
    numEl.textContent = this.state.current.toString().padStart(3, "0");
    titleEl.textContent = page.title || "";
    subEl.textContent = `${this.state.subIndex + 1}/${this.state.subpages.length}`;

    const content = this.container.querySelector(".ttx-content");
    this.contentArea.innerHTML = this.state.subpages[this.state.subIndex];

    // --- PAGE-SPECIFIC [line] OVERRIDES ---
    if (page.line) {
      const l = { ...this.config.line, ...page.line };
      this.container.style.setProperty("--ttx-line-thickness", l.thickness);
      this.container.style.setProperty("--ttx-line-color", l.color);
      this.container.style.setProperty("--ttx-line-style", l.style);
    }
  }

  /**
   * Renders a clean empty page when a requested page number
   * does not exist in the current Teletext dataset.
   *
   * No error messages or fallback text are displayed.
   * The page number remains visible, while the title,
   * subpage indicator, and content area are cleared.
   *
   * @param {number} num - The requested page number.
   */
  static showNotFound(num) {
    // --- Element references ---
    const numEl = this.container.querySelector("#page-number");
    const titleEl = this.container.querySelector("#page-title");
    const subEl = this.container.querySelector("#subpage-number");
    const content = this.container.querySelector(".ttx-content");

    // --- Reset header state ---
    if (numEl) numEl.textContent = num.toString().padStart(3, "0");
    if (titleEl) titleEl.textContent = "";
    if (subEl) subEl.textContent = ""; // hide subpage indicator
    if (content) content.innerHTML = "";

    // --- Clear datetime updates to avoid flicker ---
    clearInterval(this._dtInterval);
    const dt = this.container.querySelector("#ttx-datetime");
    if (dt) dt.style.display = "none";

    // --- Optional: clear footer text if needed ---
    const footer = this.container.querySelector(".ttx-footer");
    if (footer) footer.textContent = "";

    // --- Ensure page visually resets to a neutral state ---
    const header = this.container.querySelector(".ttx-header");
    if (header) {
      header.style.setProperty("--ttx-title-color", "#fff");
      header.style.setProperty("--ttx-subpage-number-color", "#fff");
    }
  }

  /**
   * Safely escape raw HTML so that user-supplied <tags> render as text.
   * This MUST run before bracket-markup parsing so that literal HTML like
   * "<br>" näkyy kirjaimellisesti eikä muutu tägiksi.
   *
   * @param {string} s - Raw input string that may contain HTML.
   * @returns {string} - Escaped string (&, <, > converted to entities).
   */
  static escapeHTML(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /**
   * Parses inline Teletext-style bracket markup into HTML.
   * ------------------------------------------------------------
   * UNIVERSAL COLOR SYSTEM:
   *  - Any text color class `.ttx-colorName` (e.g., `.ttx-red`)
   *    and background color class `.ttx-bg-colorName` can be
   *    used via bracket tags:
   *      [red]text[/red]           → <span class="ttx-red">text</span>
   *      [bg-red]text[/bg-red]     → <span class="ttx-bg-red">text</span>
   *      [red-bg]text[/red-bg]     → <span class="ttx-bg-red">text</span>
   *
   * BLOCKS:
   *  - [block]...[/block]                      → default block background
   *  - [block-color]...[/block-color]          → prefer `.ttx-bg-color` if defined,
   *                                             otherwise FALL BACK to default via:
   *                                             style="background-color: var(--ttx-color, var(--ttx-block-default-bg))"
   *    Text color inside a block is controlled separately with inline tags, e.g.:
   *      [block-red][yellow]Text[/yellow][/block-red]
   *
   * STRUCTURAL TAGS:
   *  - [h1]...[/h1], [h2]...[/h2], … [h6]...[/h6]
   *  - [center]...[/center]
   *  - [line]
   *
   * IMPORTANT:
   *  - Raw HTML is escaped first so literal "<br>" renders as text.
   *
   * @param {string} text - The raw text containing Teletext markup.
   * @returns {string} - The HTML string with fully parsed color/structural tags.
   */
  static parseMarkup(text) {
    if (!text) return "";

    // 0) Escape raw HTML so literal <br> etc. render as text
    text = this.escapeHTML(text);

    // 1) Structural tags (headers, center, line)
    let parsed = text
      .replace(/\[h1\]\s*([\s\S]*?)\s*\[\/h1\]/gi, '<h1>$1</h1>')
      .replace(/\[h2\]\s*([\s\S]*?)\s*\[\/h2\]/gi, '<h2>$1</h2>')
      .replace(/\[h3\]\s*([\s\S]*?)\s*\[\/h3\]/gi, '<h3>$1</h3>')
      .replace(/\[h4\]\s*([\s\S]*?)\s*\[\/h4\]/gi, '<h4>$1</h4>')
      .replace(/\[h5\]\s*([\s\S]*?)\s*\[\/h5\]/gi, '<h5>$1</h5>')
      .replace(/\[h6\]\s*([\s\S]*?)\s*\[\/h6\]/gi, '<h6>$1</h6>')
      .replace(/\[center\]\s*([\s\S]*?)\s*\[\/center\]/gi, '<span class="ttx-center">$1</span>')
      .replace(/\[line\]/gi, '<hr class="ttx-line">');

    // 2) BLOCKS — optional single background color token (no whitelist, no helpers)
    //
    //    Forms:
    //      [block]...[/block]
    //      [block-color]...[/block-color]
    //
    //    Behavior:
    //      • Always output `<div class="ttx-block ...">`.
    //      • If a color token is present, also add `ttx-bg-<color>` class
    //        (so existing CSS rules still apply when present),
    //        AND inline: style="background-color: var(--ttx-<color>, var(--ttx-block-default-bg))"
    //        This guarantees fallback to default if the color is unknown/not defined.
    parsed = parsed.replace(
      /\[block(?:-([a-z0-9\-]+))?\](.*?)\[\/block(?:-[a-z0-9\-]+)?\]/gis,
      (m, color, inner) => {
        const colorToken = (color || "").trim();
        if (!colorToken) {
          // Plain block → default background (handled by CSS)
          return `<div class="ttx-block">${inner}</div>`;
        }
        // Colored block → prefer `.ttx-bg-${colorToken}` when present,
        // but ALWAYS inline a safe fallback to default bg via CSS var:
        //   var(--ttx-${colorToken}, var(--ttx-block-default-bg))
        // This keeps behavior correct without whitelists or extra helpers.
        const cls = `ttx-block ttx-bg-${colorToken}`;
        const style = `background-color: var(--ttx-${colorToken}, var(--ttx-block-default-bg));`;
        return `<div class="${cls}" style="${style}">${inner}</div>`;
      }
    );

    // 3) Simple blink tag
    parsed = parsed.replace(/\[blink\]([\s\S]*?)\[\/blink\]/gi, '<span class="ttx-blink">$1</span>');

    // 4) Links [link]123[/link]
    parsed = parsed.replace(
      /\[link\](\d{3})\[\/link\]/gi,
      (match, num) => `<a href="#" class="page-link" onclick="Teletext.loadPage(${num});return false;">${num}</a>`
    );

    // 5) UNIVERSAL INLINE COLORS: [red]…[/red], [bg-red]…[/bg-red], [red-bg]…[/red-bg]
    parsed = parsed.replace(
      /\[([a-z0-9\-]+)\]([\s\S]*?)\[\/\1\]/gi,
      (match, tag, inner) => {
        const isBg = tag.startsWith("bg-") || tag.endsWith("-bg");
        const colorName = tag.replace(/^bg-/, "").replace(/-bg$/, "");
        const cssClass = isBg ? `ttx-bg-${colorName}` : `ttx-${colorName}`;
        return `<span class="${cssClass}">${inner}</span>`;
      }
    );

    // 6) Cleanup stray <br>s around blocks and long <br> runs
    parsed = parsed
      .replace(/<\/div>\s*(<br\s*\/?>)+/gi, "</div>")
      .replace(/(<br\s*\/?>\s*){2,}/gi, "<br>");

    return parsed;
  }

  /** Render current subpage */
  static updateDisplay(page = null) {
    if (!page) page = this.state.pages[this.state.current];
    if (!page) return;
    const numEl = this.container.querySelector('#page-number');
    const titleEl = this.container.querySelector('#page-title');
    const subEl = this.container.querySelector('#subpage-number');
    numEl.textContent = this.state.current.toString().padStart(3, '0');
    titleEl.textContent = page.title || '';
    subEl.textContent = `${this.state.subIndex + 1}/${this.state.subpages.length}`;
    this.contentArea.innerHTML = this.state.subpages[this.state.subIndex];
  }

  /** Bind keyboard controls */
  static bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key >= '0' && e.key <= '9') {
        this.state.numInput += e.key;

        // When three digits have been entered, navigate to that page immediately
        if (this.state.numInput.length === 3) {
          const target = parseInt(this.state.numInput);
          this.loadPage(target);
          this.state.numInput = ''; // Clear input after navigation

          // Display the final 3-digit page number instantly (no "---" flicker)
          this.container.querySelector('#page-number').textContent =
            target.toString().padStart(3, '0');
          return; // Prevent further updates below
        }

        // While typing (1 or 2 digits), show progress as placeholders (e.g. "1--", "10-")
        this.container.querySelector('#page-number').textContent =
          this.state.numInput.padEnd(3, '-');
      } else if (e.key === 'ArrowRight') this.loadPage(this.state.current + 1);
      else if (e.key === 'ArrowLeft') this.loadPage(this.state.current - 1);
      else if (e.key === 'ArrowUp') this.nextSubpage();
      else if (e.key === 'ArrowDown') this.prevSubpage();
      else if (e.key === 'Backspace' || e.key === 'Escape') {
        this.state.numInput = '';
        this.updateDisplay();
      }
    });
  }

  /** Navigate to next/previous subpage */
  static nextSubpage() {
    if (this.state.subIndex < this.state.subpages.length - 1) {
      this.state.subIndex++;
      this.updateDisplay();
    }
  }
  static prevSubpage() {
    if (this.state.subIndex > 0) {
      this.state.subIndex--;
      this.updateDisplay();
    }
  }

  /** Deep merge helper for nested configuration objects */
  static mergeDeep(target, source) {
    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        if (!target[key] || typeof target[key] !== "object") {
          target[key] = {};
        }
        this.mergeDeep(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }
}


/* ============================================================
 * TeletextButtons
 * ------------------------------------------------------------
 * Modular, responsive, and themeable control interface
 * for Teletext.js. Provides on-screen navigation buttons
 * styled in retro teletext aesthetics.
 * ============================================================ */
class TeletextButtons {
  /**
   * Initialize the on-screen navigation panel.
   * @param {Object} ttx - Main Teletext instance.
   */
  static init(ttx) {
    const cfg = ttx.config.buttons;
    if (!cfg || !cfg.enabled) return;

    // Create or find container
    let container;
    if (cfg.containerId) {
      container = document.getElementById(cfg.containerId);
      if (!container) {
        console.warn(`TeletextButtons: containerId "${cfg.containerId}" not found, creating dynamically.`);
        container = document.createElement("div");
        container.id = cfg.containerId;
      }
    } else {
      container = document.createElement("div");
    }

    // Add class
    container.classList.add("ttx-buttons");

    // Custom container placement
    if (!cfg.containerId) {
      const parent = ttx.container.parentNode;
      switch (cfg.position) {
        case "left":  parent.insertBefore(container, ttx.container); break;
        case "right": parent.insertBefore(container, ttx.container.nextSibling); break;
        default:      parent.appendChild(container);
      }
    }

    // Apply custom CSS variables
    const vars = {
      "--ttx-button-bg": cfg.buttonBg,
      "--ttx-button-fg": cfg.buttonFg,
      "--ttx-button-border": cfg.buttonBorder,
      "--ttx-button-radius": cfg.buttonBorderRadius,
      "--ttx-button-hover-bg": cfg.buttonHoverBg,
      "--ttx-button-hover-fg": cfg.buttonHoverFg,
      "--ttx-button-font": cfg.fontFamily,
      "--ttx-button-size": cfg.buttonFontSize,
      "--ttx-button-padding": cfg.buttonPadding,
      "--ttx-button-gap": cfg.buttonGap,
    };
    for (const [k, v] of Object.entries(vars)) {
      if (v) container.style.setProperty(k, v);
    }

    // === Build control layout ===
    container.innerHTML = `
      <div class="ttx-controls">
        <button class="ttx-btn prev page-navigation-button"></button>
        <button class="ttx-btn next page-navigation-button"></button>
      </div>
      <div class="ttx-subcontrols">
        <button class="ttx-btn up">Subpage ↑</button>
        <button class="ttx-btn down">Subpage ↓</button>
      </div>
    `;

    // === Optional numeric keypad ===
    if (cfg.showNumeric !== false) {
      const keypad = document.createElement("div");
      keypad.className = "ttx-keypad";
      for (let i = 1; i <= 9; i++) {
        const btn = document.createElement("button");
        btn.className = "ttx-btn num";
        btn.textContent = i.toString();
        btn.addEventListener("click", () => {
          ttx.state.numInput += i.toString();
          if (ttx.state.numInput.length === 3) {
            const target = parseInt(ttx.state.numInput);
            ttx.loadPage(target);
            ttx.state.numInput = "";
            TeletextButtons.update(ttx, container);
          } else {
            const el = ttx.container.querySelector("#page-number");
            el.textContent = ttx.state.numInput.padEnd(3, "-");
          }
        });
        keypad.appendChild(btn);
      }

      // Add the 0 button last
      const btn0 = document.createElement("button");
      btn0.className = "ttx-btn num";
      btn0.textContent = "0";
      btn0.addEventListener("click", () => {
        ttx.state.numInput += "0";
        if (ttx.state.numInput.length === 3) {
          const target = parseInt(ttx.state.numInput);
          ttx.loadPage(target);
          ttx.state.numInput = "";
          TeletextButtons.update(ttx, container);
        } else {
          const el = ttx.container.querySelector("#page-number");
          el.textContent = ttx.state.numInput.padEnd(3, "-");
        }
      });
      keypad.appendChild(btn0);

      container.appendChild(keypad);
    }

    // Button references
    const btnPrev = container.querySelector(".prev");
    const btnNext = container.querySelector(".next");
    const btnUp   = container.querySelector(".up");
    const btnDown = container.querySelector(".down");

    // Update labels immediately
    this.update(ttx, container);

    // Click handlers for buttons
    btnPrev.addEventListener("click", () => {
      ttx.loadPage(this.wrap(ttx.state.current - 1));
      this.update(ttx, container);
    });
    btnNext.addEventListener("click", () => {
      ttx.loadPage(this.wrap(ttx.state.current + 1));
      this.update(ttx, container);
    });

    btnUp.addEventListener("click", () => {
      ttx.prevSubpage();
      this.update(ttx, container);
    });
    btnDown.addEventListener("click", () => {
      ttx.nextSubpage();
      this.update(ttx, container);
    });

    // Observe header changes to refresh button numbers
    const observer = new MutationObserver(() => this.update(ttx, container));
    observer.observe(ttx.container.querySelector("#page-number"), { childList: true });
  }

  /** Wraps page number between 100–899. */
  static wrap(n) {
    if (n < 100) return 899;
    if (n > 899) return 100;
    return n;
  }

  /**
   * Updates button labels and manages subpage button states.
   * - Updates ← and → page numbers dynamically.
   * - Disables subpage buttons appropriately:
   *     • No subpages → both disabled
   *     • First subpage → Up disabled
   *     • Last subpage → Down disabled
   * @param {Object} ttx - Main Teletext instance.
   * @param {HTMLElement} container - Buttons container.
   */
  static update(ttx, container) {
    const prev = this.wrap(ttx.state.current - 1);
    const next = this.wrap(ttx.state.current + 1);
    container.querySelector(".prev").textContent = `← ${prev}`;
    container.querySelector(".next").textContent = `${next} →`;

    // --- Subpage button logic ---
    const upBtn = container.querySelector(".up");
    const downBtn = container.querySelector(".down");
    const subpages = ttx.state.subpages || [];
    const total = subpages.length;
    const index = ttx.state.subIndex ?? 0;

    // Case 1: No subpages → both disabled
    if (total <= 1) {
      upBtn.disabled = true;
      downBtn.disabled = true;
      return;
    }

    // Case 2: First subpage → disable Up
    upBtn.disabled = index === 0;

    // Case 3: Last subpage → disable Down
    downBtn.disabled = index === total - 1;
  }
}