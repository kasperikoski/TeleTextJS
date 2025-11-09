/*!
 * config.js — Teletext.js v1.0 User Configuration
 * Author: Kasperi Koski
 * License: MIT
 *
 * ============================================================
 * OVERVIEW:
 * This file lets you **override Teletext.js default settings**
 * by defining them as global configuration values **before**
 * loading the main teletext.js script.
 *
 * All parameters are optional — if any setting is omitted,
 * Teletext.js will automatically fall back to its internal
 * built-in defaults.
 *
 * These same configuration values can also be reused when
 * initializing Teletext within a page or app to ensure
 * consistent appearance and behavior.
 *
 * Example:
 *   window.TeletextConfig = {
 *     baseSize: 18,
 *     headerBackground: "bg-transparent"
 *   };
 * ============================================================
 */

window.TeletextConfig = {

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

  /** Screen aspect ratio (width / height), e.g. 4/3 or 18/9 */
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
  showFooterText: false,
  /** The text displayed in the footer */
  footerText: "Use Arrow keys or numbers (100–899). [↑/↓] changes subpages.",
  /** Footer text color */
  footerTextColor: "white",
  /** Footer placement: "inside" (default) or "below" */
  footerPosition: "inside",


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
     * Visual theme of the button panel.
     * Supported values: "dark" | "light"
     * Automatically applies class: .ttx-theme-dark or .ttx-theme-light
     */
    theme: "dark",

    /** Button background color */
    buttonBg: "#111",

    /** Button text color */
    buttonFg: "#f8f8f8",

    /** CSS border definition for buttons */
    buttonBorder: "1px solid #333",

    /** Corner radius for buttons */
    buttonBorderRadius: "6px",

    /** Hover background color */
    buttonHoverBg: "#1a1a1a",

    /** Hover text color */
    buttonHoverFg: "#f8f8f8",

    /** Font family used for all buttons */
    fontFamily: "'European Teletext', monospace",

    /** Base font size for buttons */
    buttonFontSize: "0.8em",

    /** Outer margin around the entire button container */
    buttonContainerMargin: "0.8em 0 0 0",

    /** Internal padding for button content */
    buttonPadding: "0.3em 0.8em",

    /** Spacing between adjacent buttons */
    buttonGap: "0.4em",
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
      "transparent", "#ff0000", "#00ff00", "#ffff00",
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
