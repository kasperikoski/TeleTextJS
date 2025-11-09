/*!
 * Teletext.js v1.0
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
 *    100: { title: "Home",
 *           content: "Use [yellow]keys[/yellow] to navigate." },
 *    200: { title: "Weather",
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

   /* ------------------------------
    * Touch navigation sensitivity
    * ------------------------------ */

    touch: {
      /** Minimum swipe distance (% of width) to trigger navigation */
      threshold: 8,
      /** Swipe distance (% of width) for ±10 page jump */
      medium: 25,
      /** Swipe distance (% of width) for ±100 page jump */
      long: 60
    },

    /** HTML container element ID for rendering the Teletext interface */
    containerId: "teletext",

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

    /** Whether the header title is visible (per page or subpage) */
    showTitle: true,
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
    screenRadius: "0.2em",


   /* ============================================================
    * FOOTER TEXT (BOTTOM INFORMATION ROW)
    * ============================================================ */
    /** Whether to display the footer hint text */
    showFooterText: true,
    /** The text displayed in the footer */
    footerText: "Use Arrow keys or numbers (100–999). [↑/↓] changes subpages.",
    /** Footer text color */
    footerTextColor: "#ffffff",
    /** Footer placement: "inside" (default) or "below" */
    footerPosition: "below",


   /* ============================================================
    * BUTTON PANEL (ON-SCREEN CONTROLS)
    * ------------------------------------------------------------
    * Configures the on-screen navigation interface (TeletextButtons)
    * including appearance, layout, and optional numeric keypad.
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

      /** 
       * Optional theme variant for button visuals
       * Supported values: "dark" | "light"
       * (Applies class .ttx-theme-dark or .ttx-theme-light)
       */
      theme: "dark",

      /** Button background color */
      buttonBg: "#000",
      /** Button text color */
      buttonFg: "#00eaff",
      /** CSS border definition for buttons */
      buttonBorder: "2px solid #00ffff",
      /** Corner radius for buttons */
      buttonBorderRadius: "8px",
      /** Hover background color */
      buttonHoverBg: "#00ffff",
      /** Hover text color */
      buttonHoverFg: "#000",
      /** Font family used for buttons */
      fontFamily: "'European Teletext', monospace",
      /** Button font size */
      buttonFontSize: "1em",
      /** Internal padding for buttons */
      buttonPadding: "0.6em 1.2em",
      /** Gap between adjacent buttons */
      buttonGap: "1em",
    },

    /**
     * ============================================================
     * TeletextJS Component Configuration — BLOCK ELEMENT
     * ------------------------------------------------------------
     * Default visual configuration for the <ttx-block> web component.
     * These values override the CSS :root fallbacks and define how
     * blocks appear throughout the system.
     *
     * Supported parameters:
     *  - background     → Background color or gradient
     *  - color          → Text color
     *  - padding        → Uniform inner spacing
     *  - paddingTop/Right/Bottom/Left → Per-side inner spacing
     *  - margin         → Uniform outer spacing
     *  - marginTop/Right/Bottom/Left  → Per-side outer spacing
     *  - fontSize       → Text size
     *  - lineHeight     → Line spacing ratio
     *  - radius         → Corner rounding
     *  - border         → Border definition (optional)
     *  - shadow         → Box shadow (optional)
     * ============================================================
     */
    block: {
      background: "blue",
      color: "#fff",

      /* Unified shorthands */
      padding: "0.5em",
      margin: "0.25em 0",

      /* Optional per-side overrides */
      paddingTop: "0.25em",
      paddingRight: "0.5em",
      paddingBottom: "0.25em",
      paddingLeft: "0.5em",

      marginTop: "0.25em",
      marginRight: "0",
      marginBottom: "0.25em",
      marginLeft: "0",

      /* Typography & shape */
      fontSize: "1em",
      lineHeight: "1.25",
      radius: "0px",
      border: "none",
      shadow: "none"
    },


    /**
     * ============================================================
     * TeletextJS Component Configuration — MOSAIC ELEMENT
     * ------------------------------------------------------------
     * Default visual configuration for the <ttx-mosaic> component.
     * These values override :root fallbacks via CSS variables.
     *
     * Supported parameters:
     *  - background, color, border, radius, shadow
     *  - padding / paddingTop/Right/Bottom/Left
     *  - margin  / marginTop/Right/Bottom/Left
     *  - gap          → grid gap between cells
     *  - cellSize     → optional hint for sizing cells
     *  - palette      → array of CSS colors (indexes 0–7)
     * ============================================================
     */
    mosaic: {
      background: "transparent",
      color: "inherit",

      padding: "0",
      margin: "0",

      paddingTop: "0",
      paddingRight: "0",
      paddingBottom: "0",
      paddingLeft: "0",

      marginTop: "0",
      marginRight: "0",
      marginBottom: "0",
      marginLeft: "0",

      border: "none",
      radius: "0",
      shadow: "none",

      gap: "0",
      cellSize: "auto",

      palette: [
        "transparent", "#ff0066", "#00ff00", "#ffff00",
        "#0000ff", "#ff00ff", "#00ffff", "#ffffff"
      ],
    },

    /**
     * ============================================================
     * TeletextJS Component Configuration — BLINK ELEMENT
     * ------------------------------------------------------------
     * Default configuration for the <ttx-blink> web component.
     * Controls blink speed and color, synchronized with global
     * TeletextConfig.blinkRate when available.
     *
     * Supported parameters:
     *  - speed    → Blink animation duration (e.g. "1s", "750ms")
     *  - color    → Text color (CSS color)
     * ============================================================
     */
    blink: {
      speed: "1s",
      color: "inherit"
    },

    /**
     * ============================================================
     * TeletextJS Component Configuration — TITLE ELEMENT
     * ------------------------------------------------------------
     * Default visual configuration for the <ttx-title> component.
     * These values override :root fallbacks via CSS variables.
     *
     * Supported parameters:
     *  - color, background, align, font, size, weight
     *  - margin / padding (and per-side variants)
     *  - shadow, border, radius
     * ============================================================
     */
    title: {
      color: "cyan",                                // Text color
      background: "transparent",                    // Background color
      align: "center",                              // left | center | right
      font: "'European Teletext', monospace",       // Default font
      size: "3em",                                  // Font size
      weight: "bold",                               // Font weight
      margin: "0 0",                                // Shorthand margin
      padding: "0",                                 // Shorthand padding
      shadow: "none",                               // Text shadow
      border: "none",                               // Optional border
      radius: "0",                                  // Rounded corners
      offset: "-0.175em"                             // vertical font offset compensation
    },
  };


  /** 
   * Holds all runtime state variables for the Teletext engine.
   * ------------------------------------------------------------
   * Tracks the currently active page, its subpages, and navigation state
   * during user interaction. This object is mutable and updated dynamically
   * as pages are loaded or navigated.
   *
   * @property {number} current   - Currently active page number.
   * @property {Object} pages     - Registry of all loaded Teletext pages.
   * @property {string[]} subpages - Array of subpage contents for the current page.
   * @property {number} subIndex  - Index of the currently visible subpage.
   * @property {string} numInput  - Buffer for numeric page input (e.g. "2", "20", "200").
   */
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
   *  1. Load config.js if not already loaded (automatically)
   *  2. Merge configuration sources (defaults ← config.js ← options)
   *  3. Validate and store container reference
   *  4. Render layout structure
   *  5. Apply dynamic visual configuration
   *  6. Load initial page
   *  7. Bind event handlers (resize, keyboard)
   *  8. Initialize optional button interface
   *
   * @param {Object} pages - Object containing Teletext pages (id → page data)
   * @param {Object} options - Optional configuration overrides
   * ============================================================
   */
  static init(pages = {}, options = {}) {

    // Start logging the initialization process with style
    console.log("%c[Teletext v1.0] Initializing...", "color: #FF5733; font-weight: bold;");

    // ============================================================
    // 1. LOAD CONFIG (if not loaded already)
    // ------------------------------------------------------------
    // Check if config.js is already loaded in the global scope.
    // If not, load it dynamically.
    // ============================================================
    console.log("%c1. Loading config.js...", "color: #33D4FF;");

    if (typeof window.TeletextConfig === "undefined") {
      // Load the external config.js if not already loaded
      const script = document.createElement("script");
      script.src = "js/config.js";  // Path to your config.js file
      script.defer = true;
      script.onload = () => {
        console.log("%c[Teletext] External config loaded successfully.", "color: #28A745;");
        this.startInitialization(pages, options);  // Start initialization once config.js is loaded
      };
      script.onerror = (err) => {
        console.warn("%c[Teletext] External config not found (js/config.js missing).", "color: #FFDC00;");
        this.startInitialization(pages, options);  // Proceed with fallback if config.js is missing
      };
      document.head.appendChild(script);
    } else {
      // If config.js is already loaded, continue initialization
      this.startInitialization(pages, options);
    }
  }


  /**
   * Starts the Teletext system initialization process.
   * ------------------------------------------------------------
   * Loads configuration, registers components, and triggers the
   * first page render once all resources are ready. This method
   * ensures that the Teletext interface, navigation handlers, and
   * datetime updates are properly initialized in sequence.
   *
   * Typically invoked automatically by `Teletext.init()` after
   * DOMContentLoaded.
   */
  static startInitialization(pages, options) {
    // ============================================================
    // 1. LOAD WEB COMPONENTS
    // ------------------------------------------------------------
    // Load all Teletext components before continuing initialization.
    // ============================================================
    this.loadComponents().then(() => {
      this.applyConfig();
      console.log("%c[Teletext] Components and config initialized.", "color: #33D4FF;");

      // ============================================================
      // 2. MERGE CONFIGURATION SOURCES
      // ------------------------------------------------------------
      // Combine defaults with config.js settings and any inline options
      // Defaults ← config.js ← options
      // ============================================================
      console.log("%c2. Merging configuration sources...", "color: #33FF57;");

      const merged = JSON.parse(JSON.stringify(this.config));  // clone defaults
      if (window.TeletextConfig && typeof window.TeletextConfig === "object") {
        this.mergeDeep(merged, window.TeletextConfig);
      }
      if (options && typeof options === "object") {
        this.mergeDeep(merged, options);
      }
      this.config = merged;

      // ============================================================
      // 3. SETUP RUNTIME STATE
      // ============================================================
      console.log("%c3. Setting up runtime state...", "color: #FF5733;");

      this.state.pages = pages;
      this.state.current = this.config.defaultPage;

      // Locate container element
      this.container = document.getElementById(this.config.containerId);
      if (!this.container) {
        console.error("%cError: Teletext container not found!", "color: #FF0000; font-weight: bold;");
        return;
      }

      // Ensure Teletext wrapper class exists
      this.container.classList.add("ttx-wrapper");

      // ============================================================
      // 4. RENDER LAYOUT STRUCTURE
      // ============================================================
      console.log("%c4. Rendering layout structure...", "color: #33B5FF;");
      this.renderLayout();

      // ============================================================
      // 5. APPLY DYNAMIC STYLES
      // ============================================================
      console.log("%c5. Applying dynamic styles...", "color: #FF8C00;");
      this.applyDynamicStyle();

      // ============================================================
      // 6. LOAD INITIAL PAGE
      // ============================================================
      console.log("%c6. Loading initial page or fetching remote data...", "color: #FF57A5;");
      this.loadPage(this.state.current);
      
      // ============================================================
      // 7. BIND EVENT HANDLERS
      // ============================================================
      console.log("%c7. Binding event handlers...", "color: #9B59B6;");
      if (this.config.enableKeyboard) this.bindKeyboard();
      this.bindTouchNavigation();
      

      // Maintain correct scaling on load and resize
      window.addEventListener("resize", () => this.adjustAspect());
      window.addEventListener("load", () => this.adjustAspect());
      this.adjustAspect();

      // ============================================================
      // 8. OPTIONAL CONTROL BUTTONS
      // ============================================================
      console.log("%c8. Initializing optional control buttons...", "color: #E67E22;");
      if (typeof TeletextButtons !== "undefined") {
        TeletextButtons.init(this);
      }
      
    });

    console.log("%c[Teletext v1.0] Initialization complete!", "color: #2ECC71; font-weight: bold;");
  }


  /**
   * Dynamically loads all core Teletext component scripts.
   * ------------------------------------------------------------
   * Asynchronously appends required JavaScript modules (e.g., Block, Mosaic, Blink, Title)
   * to the document head and resolves once all have finished loading or failed gracefully.
   * Ensures that dependent visual and interactive features are registered before rendering.
   *
   * @returns {Promise<void>} Resolves when all component scripts have been loaded or errored.
   */
  static loadComponents() {
    return new Promise((resolve) => {
      try {
        const components = ["Block.js", "Mosaic.js", "Blink.js", "Title.js"];
        console.log(`%c[Teletext] Attempting to load components: ${components.join(", ")}`, "color: #66ccff;");
        if (components.length === 0) return resolve();

        let loaded = 0;
        components.forEach(file => {
          const script = document.createElement("script");
          script.src = `js/components/${file}`;
          script.defer = true;
          script.onload = () => {
            console.log(`%c[Teletext] Component loaded: ${file}`, "color: #a0ff33;");
            if (++loaded === components.length) resolve();
          };
          script.onerror = (err) => {
            console.warn(`[Teletext] Failed to load component: ${file}`, err);
            if (++loaded === components.length) resolve();
          };
          document.head.appendChild(script);
        });
      } catch (e) {
        console.error("[Teletext] Component loading failed:", e);
        resolve();
      }
    });
  }


  /**
   * Reads TeletextConfig (if available)
   * and applies its settings as CSS variables.
   *
   * Example:
   * window.TeletextConfig = {
   *   block: { background: "black", color: "lime" }
   * }
   * → sets:
   *   --ttx-block-background: black;
   *   --ttx-block-color: lime;
   */
  static applyConfig() {
    const cfg = (typeof window !== "undefined" && window.TeletextConfig && typeof window.TeletextConfig === "object")
      ? window.TeletextConfig
      : {};

    const root = document.documentElement;

    // Guard clause: if no valid config, exit gracefully
    if (!cfg || Object.keys(cfg).length === 0) {
      console.warn("[Teletext] No configuration found or empty config.js — skipping applyConfig().");
      return;
    }

    for (const [section, values] of Object.entries(cfg)) {
      if (!values || typeof values !== "object") continue;
      for (const [key, value] of Object.entries(values)) {
        root.style.setProperty(`--ttx-${section}-${key}`, value);
      }
    }
    console.log("%c[Teletext] Configuration applied successfully.", "color: #33D4FF;");
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
  }


  /**
   * Applies all dynamic and configurable CSS styles to the Teletext container.
   * ------------------------------------------------------------
   * This method constructs and injects runtime styles based on the merged
   * Teletext configuration (`this.config`). It handles layout geometry,
   * typography, header and border customization, and visual parameters
   * for all built-in Teletext components (Block, Mosaic, Blink, Title).
   *
   * Key responsibilities:
   *  - Sets layout and container alignment (center, left, right)
   *  - Applies border, background, and glow effects
   *  - Defines CSS variables for font sizes, colors, spacing, and animation rates
   *  - Configures component-specific variables for Block, Mosaic, Blink, and Title
   *  - Syncs global CSS custom properties for responsive styling
   *
   * This function is executed once during initialization but can be re-run
   * when configuration changes dynamically at runtime.
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

    {
      const cfgH = (typeof window !== "undefined" && window.TeletextConfig) || {};
      const headerBg = (cfgH.headerBackground ?? c.headerBackground ?? "#0000ff");
      document.documentElement.style.setProperty("--ttx-header-bg", headerBg);
    }

    // === Base text color variable ===
    this.container.style.setProperty("--ttx-base-text-color", c.baseTextColor || "#ffffff");

    // === Apply line style ===
    const line = this.config.line || {};
    this.container.style.setProperty("--ttx-line-thickness", line.thickness || "2px");
    this.container.style.setProperty("--ttx-line-color", line.color || "#fff");
    this.container.style.setProperty("--ttx-line-style", line.style || "solid");
    this.container.style.setProperty("--ttx-line-mt", line.marginTop || "0.5em");
    this.container.style.setProperty("--ttx-line-mb", line.marginBottom || "0.5em");

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

    /**
     * ============================================================
     * Apply Teletext configuration to CSS variables
     * ------------------------------------------------------------
     * Applies visual settings from merged configuration to
     * CSS custom properties, making them available for
     * web components.
     * ============================================================
     */
    {
      const root = document.documentElement;
      const b = c.block || {};

      // background & text color
      if (b.background != null)
        root.style.setProperty("--ttx-block-background", String(b.background));

      if (b.color != null)
        root.style.setProperty("--ttx-block-color", String(b.color));

      // unified padding shorthand
      if (b.padding != null)
        root.style.setProperty("--ttx-block-padding", String(b.padding));

      // per-side paddings
      if (b.paddingTop != null)
        root.style.setProperty("--ttx-block-padding-top", String(b.paddingTop));
      if (b.paddingRight != null)
        root.style.setProperty("--ttx-block-padding-right", String(b.paddingRight));
      if (b.paddingBottom != null)
        root.style.setProperty("--ttx-block-padding-bottom", String(b.paddingBottom));
      if (b.paddingLeft != null)
        root.style.setProperty("--ttx-block-padding-left", String(b.paddingLeft));

      // unified margin shorthand
      if (b.margin != null)
        root.style.setProperty("--ttx-block-margin", String(b.margin));

      // per-side margins
      if (b.marginTop != null)
        root.style.setProperty("--ttx-block-margin-top", String(b.marginTop));
      if (b.marginRight != null)
        root.style.setProperty("--ttx-block-margin-right", String(b.marginRight));
      if (b.marginBottom != null)
        root.style.setProperty("--ttx-block-margin-bottom", String(b.marginBottom));
      if (b.marginLeft != null)
        root.style.setProperty("--ttx-block-margin-left", String(b.marginLeft));

      // typography & shape
      if (b.fontSize != null)
        root.style.setProperty("--ttx-block-fontSize", String(b.fontSize));

      if (b.lineHeight != null)
        root.style.setProperty("--ttx-block-lineHeight", String(b.lineHeight));

      if (b.radius != null)
        root.style.setProperty("--ttx-block-radius", String(b.radius));

      if (b.border != null)
        root.style.setProperty("--ttx-block-border", String(b.border));

      if (b.shadow != null)
        root.style.setProperty("--ttx-block-shadow", String(b.shadow));


      // ============================================================
      // Mosaic component (ttx-mosaic)
      // ============================================================
      const m = c.mosaic || {};

      if (m.background != null) root.style.setProperty("--ttx-mosaic-background", String(m.background));
      if (m.color != null)      root.style.setProperty("--ttx-mosaic-color", String(m.color));
      if (m.border != null)     root.style.setProperty("--ttx-mosaic-border", String(m.border));
      if (m.radius != null)     root.style.setProperty("--ttx-mosaic-radius", String(m.radius));
      if (m.shadow != null)     root.style.setProperty("--ttx-mosaic-shadow", String(m.shadow));

      if (m.padding != null)         root.style.setProperty("--ttx-mosaic-padding", String(m.padding));
      if (m.paddingTop != null)      root.style.setProperty("--ttx-mosaic-padding-top", String(m.paddingTop));
      if (m.paddingRight != null)    root.style.setProperty("--ttx-mosaic-padding-right", String(m.paddingRight));
      if (m.paddingBottom != null)   root.style.setProperty("--ttx-mosaic-padding-bottom", String(m.paddingBottom));
      if (m.paddingLeft != null)     root.style.setProperty("--ttx-mosaic-padding-left", String(m.paddingLeft));

      if (m.margin != null)          root.style.setProperty("--ttx-mosaic-margin", String(m.margin));
      if (m.marginTop != null)       root.style.setProperty("--ttx-mosaic-margin-top", String(m.marginTop));
      if (m.marginRight != null)     root.style.setProperty("--ttx-mosaic-margin-right", String(m.marginRight));
      if (m.marginBottom != null)    root.style.setProperty("--ttx-mosaic-margin-bottom", String(m.marginBottom));
      if (m.marginLeft != null)      root.style.setProperty("--ttx-mosaic-margin-left", String(m.marginLeft));

      if (m.gap != null)             root.style.setProperty("--ttx-mosaic-gap", String(m.gap));
      if (m.cellSize != null)        root.style.setProperty("--ttx-mosaic-cell-size", String(m.cellSize));

      if (Array.isArray(m.palette)) {
        root.setAttribute("data-ttx-mosaic-palette", JSON.stringify(m.palette));
      }


      // ============================================================
      // Blink component (ttx-blink)
      // ============================================================
      const blink = c.blink || {};
      if (blink.speed != null)
        root.style.setProperty("--ttx-blink-speed", String(blink.speed));
      if (blink.color != null)
        root.style.setProperty("--ttx-blink-color", String(blink.color));

      // ============================================================
      // Title component (ttx-title)
      // ============================================================
      const t = c.title || {};
      if (t.color != null) root.style.setProperty("--ttx-title-color", String(t.color));
      if (t.background != null) root.style.setProperty("--ttx-title-background", String(t.background));
      if (t.align != null) root.style.setProperty("--ttx-title-align", String(t.align));
      if (t.font != null) root.style.setProperty("--ttx-title-font", String(t.font));
      if (t.size != null) root.style.setProperty("--ttx-title-size", String(t.size));
      if (t.weight != null) root.style.setProperty("--ttx-title-weight", String(t.weight));
      if (t.margin != null) root.style.setProperty("--ttx-title-margin", String(t.margin));
      if (t.padding != null) root.style.setProperty("--ttx-title-padding", String(t.padding));
      if (t.shadow != null) root.style.setProperty("--ttx-title-shadow", String(t.shadow));
      if (t.border != null) root.style.setProperty("--ttx-title-border", String(t.border));
      if (t.radius != null) root.style.setProperty("--ttx-title-radius", String(t.radius));
    }

  }

  /**
   * Applies all header-related visual and layout styles.
   * ------------------------------------------------------------
   * Updates the header bar’s typography, colors, alignment, and spacing
   * based on the merged configuration object or a provided source.
   * This method synchronizes CSS custom properties for both page and
   * subpage identifiers, the title area, and optional flicker effects.
   *
   * Additionally handles:
   *  - Dynamic margin and alignment values from global `TeletextConfig`
   *  - Screen flicker and rounded-corner visual effects
   *  - Footer text rendering and placement (inside or below the screen)
   *
   * @param {HTMLElement} header - Header element reference to apply styles to.
   * @param {Object} [source=this.config] - Optional configuration object to override defaults.
   */
  static applyHeaderStyle(header, source = this.config) {
    if (!header) return;
    const c = source;

    // Font sizes
    header.style.setProperty("--ttx-page-number-size", c.pageNumberSize || "1em");
    header.style.setProperty("--ttx-title-size", c.titleSize || "1em");
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

    // === Footer styling & placement (moved from renderLayout) ===
    const footer = this.footer || this.container.querySelector('#ttx-footer');
    if (footer) {
      // Apply footer text color variable
      document.documentElement.style.setProperty('--ttx-footer-text-color', this.config.footerTextColor);

      // Footer text and visibility
      if (this.isMobile() && this.config.showMobileNotice) {
        footer.textContent = this.config.mobileNotice || '';
      } else if (this.config.showFooterText) {
        footer.textContent = this.config.footerText || '';
      } else {
        footer.textContent = '';
      }

      // Footer position handling
      const screen = this.container.querySelector('.ttx-screen');

      if (this.config.footerPosition === 'below') {
        // Ensure footer is placed below the Teletext screen
        if (footer.parentElement === screen) {
          footer.remove();
        }
        if (this.container.nextSibling !== footer) {
          this.container.insertAdjacentElement('afterend', footer);
        }
        footer.classList.add('outside');
        footer.classList.remove('inside');
      } else {
        // Ensure footer is placed inside the Teletext screen
        if (screen && footer.parentElement !== screen) {
          footer.remove();
          screen.appendChild(footer);
        }
        footer.classList.add('inside');
        footer.classList.remove('outside');
      }
    }

    // Optional tip for developers
    // console.debug("[Teletext] Header style applied:", c);
  }


  /**
   * Adjusts the Teletext screen’s aspect ratio and scaling.
   * ------------------------------------------------------------
   * Calculates and applies proportional dimensions based on the configured
   * native width and aspect ratio, ensuring the Teletext display remains
   * visually consistent across varying container sizes.
   *
   * Updates key CSS variables controlling the virtual screen’s width,
   * height, and scale factor for responsive rendering.
   *
   * @example
   * // Maintains 4:3 ratio on resize
   * Teletext.adjustAspect();
   *
   * @returns {void}
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


  /**
   * Loads and renders a Teletext page by its numeric identifier.
   * ------------------------------------------------------------
   * Handles full page initialization including content parsing,
   * subpage processing, header resets, and visual overrides.
   * This method is the main entry point for changing pages
   * via user navigation or programmatic calls.
   *
   * Responsibilities:
   *  - Validates and wraps the page number (100–999)
   *  - Clears and reinitializes runtime state for subpages
   *  - Parses `content` arrays and extracts subpage settings
   *  - Applies per-page header styles and color overrides
   *  - Initializes datetime display for the new page
   *  - Delegates final subpage rendering to `updateDisplay()`
   *
   * If the requested page number does not exist in the registry,
   * this method falls back to `showNotFound()`.
   *
   * @param {number} num - Three-digit Teletext page number to load (e.g., 100, 200, 301).
   * @returns {void}
   */
  static loadPage(num) {

    // --- ELEMENT REFERENCES ---
    const header = this.container.querySelector(".ttx-header");
    const numEl = this.container.querySelector("#page-number");
    const titleEl = this.container.querySelector("#page-title");
    const subEl = this.container.querySelector("#subpage-number");

    // --- Reset header to base config before applying any new page settings ---
    if (header) {
      // Reset header background to global or default
      header.style.setProperty('--ttx-header-bg', String(this.config.headerBackground || '#000'));

      // Reset font sizes and colors
      header.style.setProperty('--ttx-page-number-size', String(this.config.pageNumberSize || '1em'));
      header.style.setProperty('--ttx-title-size', String(this.config.titleSize || '1em'));
      header.style.setProperty('--ttx-subpage-number-size', String(this.config.subpageNumberSize || '1em'));

      const pnColor  = this.config.pageNumberColor      || '#fff';
      const tColor   = this.config.titleColor           || '#fff';
      const spnColor = this.config.subpageNumberColor   || '#fff';

      numEl.style.color   = pnColor;
      titleEl.style.color = tColor;
      subEl.style.color   = spnColor;
    }

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
      this.state.subpages = page.content.map(sub =>
        typeof sub === "string" ? sub : String(sub.text || "")
      );

      this.state.subpageSettings = page.content.map(sub => {
        if (typeof sub !== "object") return {};
        const { text, ...settings } = sub;
        return settings;
      });
    } else {
      this.state.subpages = [ String(page.content ?? "") ];
      this.state.subpageSettings = [{}];
    }

    // --- HEADER STYLE OVERRIDES ---
    if (header) {
      // 1. Header background variable (page-level override via CSS var)
      const bg = (page.headerBackground ?? this.config.headerBackground);
      if (bg) {
        // Page-specific setting applied only within this header's scope
        header.style.setProperty("--ttx-header-bg", bg);
      } else {
        // No page-specific value → fallback to global (config.js / global)
        header.style.removeProperty("--ttx-header-bg");
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

    const raw = this.state.subpages[this.state.subIndex];
    this.contentArea.innerHTML = Teletext.parseMarkup(raw);

    // --- PAGE-SPECIFIC [line] OVERRIDES ---
    if (page.line) {
      const l = { ...this.config.line, ...page.line };
      this.container.style.setProperty("--ttx-line-thickness", l.thickness);
      this.container.style.setProperty("--ttx-line-color", l.color);
      this.container.style.setProperty("--ttx-line-style", l.style);
    }

    this.updateDisplay(page);
  }


  /**
   * Renders the currently active subpage with resolved visual settings.
   * ------------------------------------------------------------
   * Rebuilds the header, content, and datetime area for the
   * active subpage, applying all hierarchical overrides in order:
   *   subpage → page → global configuration.
   *
   * Responsibilities:
   *  - Updates page and subpage number indicators
   *  - Applies effective header background, colors, and font sizes
   *  - Controls title visibility via `showTitle` (sub/page/config)
   *  - Parses and renders Teletext markup content
   *  - Merges datetime settings from config, page, and subpage
   *
   * Called automatically after every subpage navigation or when
   * the parent page is reloaded.
   *
   * @param {Object|null} page - Optional page object; defaults to the current active page.
   * @returns {void}
   */
  static updateDisplay(page = null) {
    if (!page) page = this.state.pages[this.state.current];
    if (!page) return;

    const numEl   = this.container.querySelector('#page-number');
    const titleEl = this.container.querySelector('#page-title');
    const subEl   = this.container.querySelector('#subpage-number');
    const header  = this.container.querySelector('.ttx-header');

    // --- Update header counters ---
    numEl.textContent = this.state.current.toString().padStart(3, '0');
    titleEl.textContent = page.title || '';
    subEl.textContent = `${this.state.subIndex + 1}/${this.state.subpages.length}`;

    const raw = this.state.subpages[this.state.subIndex];
    const sub = (this.state.subpageSettings && this.state.subpageSettings[this.state.subIndex]) || {};
    const cfg = this.config || {};

    // --- Resolve effective values (sub → page → config) ---
    const headerBackground     = sub.headerBackground     ?? page.headerBackground     ?? cfg.headerBackground;
    const pageNumberColor      = sub.pageNumberColor      ?? page.pageNumberColor      ?? cfg.pageNumberColor      ?? "#fff";
    const subpageNumberColor   = sub.subpageNumberColor   ?? page.subpageNumberColor   ?? cfg.subpageNumberColor   ?? "#fff";
    const titleColor           = sub.titleColor           ?? page.titleColor           ?? cfg.titleColor           ?? "#fff";
    const pageNumberSize       = sub.pageNumberSize       ?? page.pageNumberSize       ?? cfg.pageNumberSize       ?? "1em";
    const subpageNumberSize    = sub.subpageNumberSize    ?? page.subpageNumberSize    ?? cfg.subpageNumberSize    ?? "1em";
    const titleSize            = sub.titleSize            ?? page.titleSize            ?? cfg.titleSize            ?? "1em";

    // --- Apply header background and colors deterministically ---
    if (header) {
      if (headerBackground !== undefined) {
        header.style.setProperty('--ttx-header-bg', String(headerBackground));
      } else {
        header.style.removeProperty('--ttx-header-bg');
      }

      header.style.setProperty('--ttx-page-number-size', String(pageNumberSize));
      header.style.setProperty('--ttx-subpage-number-size', String(subpageNumberSize));
      header.style.setProperty('--ttx-title-size', String(titleSize));
    }

    numEl.style.color   = pageNumberColor;
    subEl.style.color   = subpageNumberColor;
    titleEl.style.color = titleColor;

    // --- Header title visibility ---
    const showTitle = 
      (sub && sub.showTitle !== undefined) ? sub.showTitle :
      (page && page.showTitle !== undefined) ? page.showTitle :
      this.config.showTitle;

    titleEl.style.visibility = showTitle ? "visible" : "hidden";

    // --- Render main content ---
    this.contentArea.innerHTML = Teletext.parseMarkup(raw);

    // --- Resolve datetime (deep merge with fallback) ---
    const datetime = {
      ...(cfg.datetime || {}),
      ...(page.datetime || {}),
      ...(sub.datetime || {})
    };

    this.initDatetime({ ...page, datetime });
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
   * Parses lightweight Teletext-style markup into renderable HTML.
   * ------------------------------------------------------------
   * A minimal, dependency-free text parser that converts custom
   * inline tags (e.g., colors, links, or other Teletext markup)
   * into semantic HTML elements. The parser is designed to be
   * extensible and tolerant — unknown tags are safely ignored,
   * relying on CSS for presentation and fallback behavior.
   *
   * @param {string} [input=""] - The raw Teletext markup string.
   * @returns {string} The parsed HTML output safe for rendering.
   */
  static parseMarkup(input = "") {
    if (typeof input !== "string") return "";

    let out = input;

    // Internal page links: [link]123[/link]
    out = out.replace(/\[link\](\d{3})\[\/link\]/gi, (_, num) =>
      `<a href="#" class="ttx-link" onclick="Teletext.loadPage(${num})">${num}</a>`
    );

    // Color tags
    out = out.replace(/\[([a-z0-9-]+)\]([\s\S]*?)\[\/\1\]/gi, (m, tag, content) => {
      // Tag may be "yellow" or "bg-yellow"
      const cls = tag.startsWith("bg-") ? `ttx-${tag}` : `ttx-${tag}`;
      return `<span class="${cls}">${content}</span>`;
    });

    return out;
  }


  /* ============================================================
   * DATETIME HANDLING — CLOCK & DATE MANAGEMENT
   * ============================================================ */

  
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


  /* ============================================================
   * NAVIGATION & INPUT HANDLING — KEYBOARD CONTROLS
   * ============================================================ */


  /**
   * Binds keyboard input to Teletext navigation and page selection.
   * ------------------------------------------------------------
   * Enables classic Teletext-style numeric page entry and directional
   * navigation using arrow keys. Supports live preview while typing
   * (e.g. "1--", "10-") and instant loading once a 3-digit code is entered.
   *
   * Responsibilities:
   *  - Prevents default browser scrolling when arrow keys are used
   *  - Handles numeric input for direct page access (100–999)
   *  - Navigates pages with ← / → keys
   *  - Switches subpages with ↑ / ↓ keys
   *  - Clears input buffer with Backspace or Escape
   *
   * This method should be called once during initialization.
   *
   * @returns {void}
   */
  static bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      // Prevent page scrolling when using arrow keys inside Teletext
      const teletextFocused =
        document.activeElement === document.body || this.container.contains(document.activeElement);
      if (teletextFocused && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      
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


  /**  
   * Advances to the next available subpage, if one exists.  
   * Updates display to reflect the newly active subpage.  
   * @returns {void}  
   */
  static nextSubpage() {
    if (this.state.subIndex < this.state.subpages.length - 1) {
      this.state.subIndex++;
      this.updateDisplay();
    }
  }


  /**  
   * Returns to the previous subpage, if one exists.  
   * Updates display to reflect the newly active subpage.  
   * @returns {void}  
   */
  static prevSubpage() {
    if (this.state.subIndex > 0) {
      this.state.subIndex--;
      this.updateDisplay();
    }
  }

  /**
   * ============================================================
   * Touch Navigation Handler with Visual Indicators
   * ------------------------------------------------------------
   * Enables gesture-based navigation for Teletext pages and subpages.
   * - Horizontal swipes: navigate between pages (±1, ±10, ±100 depending on swipe distance)
   * - Vertical swipes: move between subpages (▲ / ▼)
   * - Displays temporary on-screen indicators (numeric or symbolic)
   * - Provides optional haptic feedback for tactile confirmation
   * - Prevents native scrolling within the Teletext viewport
   * - Automatically recalibrates sensitivity on resize/orientation change
   *
   * Styled via `.ttx-swipe-indicator` in teletext.css
   * ============================================================
   */
  static bindTouchNavigation() {
    const el = document.querySelector(".ttx-wrapper");
    if (!el) return;

    let startX = 0, startY = 0, endX = 0, endY = 0;

    // --- Internal helper: display short-lived visual indicator ---
    const showSwipeIndicator = (label) => {
      const indicator = document.createElement("div");
      indicator.className = "ttx-swipe-indicator";
      indicator.textContent = label.toString();
      el.appendChild(indicator);
      setTimeout(() => indicator.remove(), 500);
    };

    // --- Resolve dynamic thresholds based on container width ---
    let width = el.clientWidth || window.innerWidth;
    const touchCfg = (this.config && this.config.touch) || {};

    // Convert percentage thresholds to pixels
    let threshold = width * ((parseFloat(touchCfg.threshold ?? 8)) / 100);
    let medium    = width * ((parseFloat(touchCfg.medium ?? 25)) / 100);
    let long      = width * ((parseFloat(touchCfg.long ?? 60)) / 100);

    // --- Recalculate thresholds on resize/orientation change ---
    window.addEventListener("resize", () => {
      width = el.clientWidth || window.innerWidth;
      threshold = width * ((parseFloat(touchCfg.threshold ?? 8)) / 100);
      medium    = width * ((parseFloat(touchCfg.medium ?? 25)) / 100);
      long      = width * ((parseFloat(touchCfg.long ?? 60)) / 100);
    });

    // --- Prevent native scroll inside Teletext window ---
    el.addEventListener("touchmove", e => e.preventDefault(), { passive: false });

    // --- Start position tracking ---
    el.addEventListener("touchstart", e => {
      if (e.touches.length > 1) return; // Ignore multi-touch
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
    }, { passive: true });

    // --- End position: detect swipe direction and magnitude ---
    el.addEventListener("touchend", e => {
      if (e.touches.length > 1) return; // Ignore multi-touch
      const t = e.changedTouches[0];
      endX = t.clientX;
      endY = t.clientY;

      const dx = endX - startX;
      const dy = endY - startY;

      // Ignore very small movements
      if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;

      // === Horizontal swipe → page navigation ===
      if (Math.abs(dx) > Math.abs(dy)) {
        const distance = Math.abs(dx);
        let step = 1;
        if (distance > long) step = 100;
        else if (distance > medium) step = 10;

        const direction = dx < 0 ? +1 : -1;
        this.loadPage(this.state.current + direction * step);
        showSwipeIndicator(direction * step);

        // Optional haptic feedback
        if (navigator.vibrate) {
          if (step >= 100) navigator.vibrate(60);
          else if (step >= 10) navigator.vibrate(40);
          else navigator.vibrate(20);
        }
      }

      // === Vertical swipe → subpage navigation ===
      else {
        if (dy < -threshold) {
          this.nextSubpage();
          showSwipeIndicator("▲");
        } else if (dy > threshold) {
          this.prevSubpage();
          showSwipeIndicator("▼");
        }
      }
    }, { passive: true });
  }


  /* ============================================================
   * UTILITIES & HELPER FUNCTIONS
   * ============================================================ */


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

  /**
   * Detects whether the current user is on a mobile device.
   * ------------------------------------------------------------
   * Uses the user agent string to determine if the environment
   * matches common mobile platforms.
   *
   * @returns {boolean} True if the user agent indicates a mobile device, otherwise false.
   */
  static isMobile() {
    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  }

}


/* ============================================================
 * TeletextButtons / API
 * ------------------------------------------------------------
 * Unified control interface for Teletext.js.
 * Provides both:
 *   - On-screen buttons (visual interface)
 *   - Global API methods for external control
 * ============================================================ */
class TeletextButtons {
  static debug = true; // Enable to show console logs for all button actions
  static ttx = null;  // reference to main Teletext instance

  /**
   * Initialize on-screen controls and register global API.
   * @param {Object} ttx - Main Teletext instance.
   */
  static init(ttx) {
    this.ttx = ttx;

    const cfg = ttx.config.buttons;
    if (!cfg || !cfg.enabled) return;

    // --- Create or locate container ---
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

    container.classList.add("ttx-buttons");
    if (cfg.theme) container.classList.add(`ttx-theme-${cfg.theme}`);

    if (!cfg.containerId) {
      const parent = ttx.container.parentNode;
      switch (cfg.position) {
        case "left":  parent.insertBefore(container, ttx.container); break;
        case "right": parent.insertBefore(container, ttx.container.nextSibling); break;
        default:      parent.appendChild(container);
      }
    }

    // --- Apply style variables ---
    for (const [k, v] of Object.entries({
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
      "--ttx-button-container-margin": cfg.buttonContainerMargin,
    })) {
      if (v) container.style.setProperty(k, v);
    }

    // --- Layout markup ---
    container.innerHTML = `
      <div class="ttx-controls">
        <button class="ttx-btn prev"></button>
        <button class="ttx-btn next"></button>
      </div>
      <div class="ttx-subcontrols">
        <button class="ttx-btn up">Subpage ↑</button>
        <button class="ttx-btn down">Subpage ↓</button>
      </div>
      <div class="ttx-keypad"></div>
    `;

    // --- Build numeric keypad ---
    const keypad = container.querySelector(".ttx-keypad");
    if (cfg.showNumeric !== false) {
      for (let i = 1; i <= 9; i++) this.#createNumButton(keypad, i);
      this.#createNumButton(keypad, 0);
    }

    // --- Button bindings ---
    container.querySelector(".prev").addEventListener("click", () => this.prevPage());
    container.querySelector(".next").addEventListener("click", () => this.nextPage());
    container.querySelector(".up").addEventListener("click", () => this.prevSubpage());
    container.querySelector(".down").addEventListener("click", () => this.nextSubpage());

    // --- Observer to update labels dynamically ---
    const observer = new MutationObserver(() => this.update());
    observer.observe(ttx.container.querySelector("#page-number"), { childList: true });

    this.update();
    console.log("%c[TeletextButtons/API] Control interface ready.", "color:#33D4FF;");
  }

  /* ------------------------------------------------------------
   * NUMERIC KEYPAD
   * ------------------------------------------------------------ */
  static #createNumButton(keypad, digit) {
    const btn = document.createElement("button");
    btn.className = "ttx-btn num";
    btn.textContent = digit.toString();
    btn.addEventListener("click", () => this.inputDigit(digit));
    keypad.appendChild(btn);
  }

  /* ------------------------------------------------------------
   * API METHODS (also used internally by buttons)
   * ------------------------------------------------------------ */

  /** Input a single numeric digit (0–9). */
  static inputDigit(digit) {
    const ttx = this.ttx;
    if (!ttx || !/^[0-9]$/.test(String(digit))) return;

    ttx.state.numInput += String(digit);
    const el = ttx.container.querySelector("#page-number");
    if (el) el.textContent = ttx.state.numInput.padEnd(3, "-");

    if (TeletextButtons.debug) {
      console.log(`[TeletextButtons] Digit ${digit} input → buffer = "${ttx.state.numInput}"`);
    }

    if (ttx.state.numInput.length === 3) {
      const target = parseInt(ttx.state.numInput);

      if (TeletextButtons.debug)
        console.log(`[TeletextButtons] Navigating to page ${target}`);

      ttx.loadPage(target);

      const result = target;
      ttx.state.numInput = "";
      this.update();
      return result;
    }

    // Return buffer so console shows useful info
    return ttx.state.numInput;
  }

  /** Go to next page. */
  static nextPage() {
    this.ttx.loadPage(this.wrap(this.ttx.state.current + 1));
    this.update();
  }

  /** Go to previous page. */
  static prevPage() {
    this.ttx.loadPage(this.wrap(this.ttx.state.current - 1));
    this.update();
  }

  /** Jump forward 100 pages. */
  static jumpForward100() {
    this.ttx.loadPage(this.wrap(this.ttx.state.current + 100));
    this.update();
  }

  /** Jump back 100 pages. */
  static jumpBack100() {
    this.ttx.loadPage(this.wrap(this.ttx.state.current - 100));
    this.update();
  }

  /** Go to next subpage. */
  static nextSubpage() {
    const ttx = this.ttx;
    if (ttx.state.subIndex < (ttx.state.subpages.length - 1)) {
      ttx.state.subIndex++;
      ttx.updateDisplay();
      this.update();
    }
  }

  /** Go to previous subpage. */
  static prevSubpage() {
    const ttx = this.ttx;
    if (ttx.state.subIndex > 0) {
      ttx.state.subIndex--;
      ttx.updateDisplay();
      this.update();
    }
  }

  /** Return current Teletext state. */
  static getState() {
    const ttx = this.ttx;
    return {
      page: ttx.state.current,
      subpage: ttx.state.subIndex + 1,
      totalSubpages: ttx.state.subpages.length
    };
  }

  /** Wraps page numbers between 100–899. */
  static wrap(n) {
    if (n < 100) return 899;
    if (n > 899) return 100;
    return n;
  }

  /** Update button labels and subpage states. */
  static update() {
    const ttx = this.ttx;
    if (!ttx) return;
    const container = document.querySelector(".ttx-buttons");
    if (!container) return;

    const prev = this.wrap(ttx.state.current - 1);
    const next = this.wrap(ttx.state.current + 1);
    container.querySelector(".prev").textContent = `← ${prev}`;
    container.querySelector(".next").textContent = `${next} →`;

    const upBtn = container.querySelector(".up");
    const downBtn = container.querySelector(".down");
    const total = ttx.state.subpages.length;
    const index = ttx.state.subIndex;

    upBtn.disabled = total <= 1 || index === 0;
    downBtn.disabled = total <= 1 || index === total - 1;
  }
}
