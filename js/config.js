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
  },
};
