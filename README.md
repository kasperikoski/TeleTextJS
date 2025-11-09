# Table of Contents

1. **Overview**  
   1.1 [System Components](#11-system-components)  
   1.2 [Lightweight Markup Support](#12-lightweight-markup-support)  
   1.3 [Typical Page Definition](#13-typical-page-definition)

2. **Installation and Setup**  
   [Minimal Example](#minimal-example)

3. **Pages, Navigation, and Usage**  
   3.1 [Defining Pages](#31-defining-pages)  
   3.2 [Initializing and Displaying Pages](#32-initializing-and-displaying-pages)  
   3.3 [Navigation and Controls](#33-navigation-and-controls)  
   3.4 [Subpages](#34-subpages)  
   3.5 [Inline Formatting, Color Tags, and Links](#35-inline-formatting-color-tags-and-links)  
   3.6 [Built-in Components](#36-built-in-components)  
   3.7 [Page Layout and Structure](#37-page-layout-and-structure)  
   3.8 [Example Page Set](#38-example-page-set)  
   3.9 [Summary](#39-summary)

4. **Configuration and Override Hierarchy**  
   4.1 [Configuration Priority](#41-configuration-priority)  
   4.2 [How Configuration Is Applied](#42-how-configuration-is-applied)  
   4.3 [Commonly Used Settings](#43-commonly-used-settings)
   4.4 [CSS Integration](#44-css-integration)  
   4.5 [Component Defaults](#45-component-defaults)

5. **Complete Configuration Reference**  
   5.1 [Core Settings](#51-core-settings)  
   5.2 [Line Element Settings](#52-line-element-settings)  
   5.3 [Font and Typography](#53-font-and-typography)  
   5.4 [Frame and Border](#54-frame-and-border)  
   5.5 [Mobile Notice](#55-mobile-notice)  
   5.6 [Header Bar](#56-header-bar)  
   5.7 [Datetime (Header Clock & Date)](#57-datetime-header-clock--date)  
   5.8 [Content Area](#58-content-area)  
   5.9 [Visual Effects](#59-visual-effects)  
   5.10 [Footer](#510-footer)  
   5.11 [Button Panel](#511-button-panel)  
   5.12 [Component Settings](#512-component-settings)  
   &nbsp;&nbsp;&nbsp;&nbsp;• [Block Component (`<ttx-block>`)](#block-component-ttx-block)  
   &nbsp;&nbsp;&nbsp;&nbsp;• [Mosaic Component (`<ttx-mosaic>`)](#mosaic-component-ttx-mosaic)  
   &nbsp;&nbsp;&nbsp;&nbsp;• [Blink Component (`<ttx-blink>`)](#blink-component-ttx-blink)  
   &nbsp;&nbsp;&nbsp;&nbsp;• [Title Component (`<ttx-title>`)](#title-component-ttx-title)

6. **Appearance and CSS**  
   6.1 [Structural Overview](#61-structural-overview)  
   6.2 [CSS Variable System](#62-css-variable-system)  
   6.3 [Font System](#63-font-system)  
   6.4 [Aspect Ratio and Scaling](#64-aspect-ratio-and-scaling)  
   6.5 [Header and Footer Styling](#65-header-and-footer-styling)  
   6.6 [Content Area](#66-content-area)  
   6.7 [Color Classes](#67-color-classes)  
   6.8 [Frame and Effects](#68-frame-and-effects)  
   6.9 [Customizing `teletext.css`](#69-customizing-teletextcss)  
   6.10 [Summary](#610-summary)

7. **Dynamic Styling and Scaling**  
   7.1 [Automatic Scaling Logic](#71-automatic-scaling-logic)  
   7.2 [Responsive CSS Variable Updates](#72-responsive-css-variable-updates)  
   7.3 [Aspect Ratio Enforcement](#73-aspect-ratio-enforcement)  
   7.4 [Header, Footer, and Content Synchronization](#74-header-footer-and-content-synchronization)  
   7.5 [Live Re-rendering and Transitions](#75-live-re-rendering-and-transitions)  
   7.6 [Custom Control Over Scaling](#76-custom-control-over-scaling)  
   7.7 [Summary](#77-summary)

8. **Accessibility and Performance**  
   8.1 [Accessibility Features](#81-accessibility-features)  
   8.2 [Reduced Motion and Visual Comfort](#82-reduced-motion-and-visual-comfort)  
   8.3 [Mobile Optimization](#83-mobile-optimization)


---



# 1. Overview

**TeletextJS** is a lightweight browser-based teletext environment that renders numbered pages (e.g., 100, 200…) and optional subpages from a single JavaScript object. Each page typically provides a **title** and **content** that can be either a string (one page) or an array (multiple subpages).  

At a minimum, you only need to include the core stylesheet and script in your page. Once loaded, TeletextJS automatically mounts itself into a target container (by default, an element with id="teletext") and renders a complete teletext interface — including a header, content region, and footer — faithfully emulating the layout and look of classic broadcast teletext screens. 

**System components at a glance**

* **Core:** `TeletextJS` (logic/UI) and `teletext.css` (visual style and grid). The CSS scopes styles under a dedicated wrapper and uses the “European Teletext” pixel font to achieve the retro look. 
* **Optional configuration:** `config.js`, which the core loads automatically if present. Settings from `config.js` are merged with built-in defaults and any `Teletext.init(pages, options)` overrides (precedence: defaults ← config.js ← options).  
* **Built-in web components:** **Block**, **Mosaic**, and **Blink** are loaded automatically by the core and are available directly in page content as `<ttx-block>`, `<ttx-mosaic>`, and `<ttx-blink>`. These provide styled blocks, pixel-style mosaics, and blinking text, and their defaults can be tuned via `config.js`.  

**Lightweight markup support**

* Inline color and utility tags such as `[yellow]…[/yellow]` are parsed into `<span>` elements with `ttx-*` classes, allowing you to theme text purely via CSS (e.g., `.ttx-yellow`, `.ttx-bg-yellow`). The parser is permissive and defers resolution to CSS, so unknown tags fail gracefully.  

**Typical page definition (conceptual)**

```js
const pages = {
  100: { title: "Home", content: "Use [yellow]keys[/yellow] to navigate." },
  200: { title: "Weather", content: ["Subpage 1 text", "Subpage 2 text"] }
};
```

Pages are addressed by their 3-digit number; when `content` is an array, TeletextJS exposes subpages and navigation between them.  

> The next section will cover installation and first-run usage (including the two required includes for `teletext.css` and `teletext.js`). 

# 2. Installation and Setup

To use **TeletextJS**, you only need to include **two files** on your site: the stylesheet and the main script. These handle all rendering, layout, and component loading automatically.

```html
<link rel="stylesheet" href="assets/css/teletext.css">
<script src="js/teletext.js" defer></script>
```

That’s all you need — **`config.js` does not need to be loaded manually.**
If a `config.js` file exists in the same directory, `teletext.js` will detect and load it automatically during initialization. This allows you to keep your configuration separate from the core script without extra imports.

---

### Minimal Example

Below is a fully working minimal HTML page that demonstrates how to initialize TeletextJS and render your first page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Teletext Example</title>
    <link rel="stylesheet" href="assets/css/teletext.css">
    <script src="js/teletext.js" defer></script>
  </head>
  <body>
    <!-- Teletext container -->
    <div id="teletext"></div>

    <script>
      // Define your teletext pages
      const pages = {
        100: {
          title: "Home",
          content: "Use the [yellow]numeric keys[/yellow] or buttons to navigate."
        }
      };

      // Initialize TeletextJS with your pages
      Teletext.init(pages, {
        defaultPage: 100,   // This is optional
        aspectRatio: "4:3"  // This is optional
      });
    </script>
  </body>
</html>
```

When you open this page in a browser, TeletextJS automatically:

1. Builds the teletext screen inside the `#teletext` container.
2. Loads any available configuration from `config.js`.
3. Renders your defined pages and navigation interface.
4. Registers all built-in components (`Block`, `Mosaic`, and `Blink`) for use within your page content.

You can now begin creating additional pages, subpages, and stylized content.

# 3. Pages, Navigation, and Usage

TeletextJS organizes content into **pages** that resemble the structure and interaction of classic teletext systems. Each page is defined as an object with a **title** and **content** field. The system automatically manages navigation between pages and subpages, as well as rendering inline formatting and built-in components.

---

## 3.1 Defining Pages

In TeletextJS, every teletext page is defined as an object identified by its three-digit number (e.g. `100`, `200`, `486`). Each page always consists of at least one **subpage**, stored within its `content` array. Even if a page appears to have only a single screen of text, it is still technically a one-element subpage list. In other words, all displayed content in TeletextJS is rendered as a subpage — pages serve only as containers that group their subpages together.

---

### Page Structure

A basic example of a page definition of page 100 with a total of 2 subpages:

```js
const pages = {

  /* PAGE 100 -------------------------------------------------- */
  100: {
    title: "TeletextJS",
    subpageNumberColor: "#fff",
    content: [
      // Here starts subpage 1
      {
        // These settings are overwriting settings for subpage 1
        headerBackground: "transparent",
        showTitle: false,
        // Note: datetime is an object containing its own settings
        datetime: {
          enabled: false
        },
        text: `
TeletextJS is a [yellow]JavaScript-based[/yellow] renderer  
that recreates the authentic look of [cyan]classic Teletext[/cyan].

<ttx-block align="center">
Navigate with your keyboard or touch gestures. Even [link]links[/link] are interactive!
</ttx-block>

  [link]100[/link] Home            [link]200[/link] Features  
  [link]300[/link] News            [link]400[/link] Weather  
  [link]500[/link] Extras

<ttx-title top="3%" size="4em">TELETEXT</ttx-title>`
      },
      // Here starts subpage 2
      {
        // These settings are overwriting settings for subpage 2
        datetime: {
          enabled: true
        },
        text: `
This is a [yellow]second[/yellow] subpage.  
Each subpage can have its own colors, layout, and header configuration,  
while inheriting defaults from higher levels in the hierarchy.

Swipe left or right to change subpages, or scroll vertically for more content.`
      }
    ]
  }

};
```

---

### Configuration Hierarchy

All available configuration options in TeletextJS — such as typography, color schemes, layout rules, or behavioral flags —
can be defined **globally**, **per site**, **per page**, or **per subpage**.

The system automatically resolves which value to use by following a clear hierarchical order:

1. **Subpage level** — individual subpage settings have the highest priority.
2. **Page level** — if not defined on the subpage, the setting is taken from its parent page (e.g. page `200`).
3. **Initialization level** — if the page does not specify the setting, the value from `Teletext.init()` parameters is used.
4. **Global configuration** — if still undefined, the engine reads from the user’s `config.js` file.
5. **Internal defaults** — as a final fallback, the built-in defaults inside `teletext.js` are applied.

This cascading structure ensures maximum flexibility:
every page and subpage can override only what is necessary, while the rest of the system remains consistent.

---

### General Principles

* Any available TeletextJS setting can be defined at any level in the hierarchy.
* Subpages inherit all properties from their parent page unless explicitly overridden.
* Pages inherit from global initialization and configuration settings.
* The complete list of configurable properties can be found and documented in **`config.js`**.

---

### Minimal Example

```js
const pages = {
  300: {
    title: "News",
    content: [
      { text: "No news available. See [link]301[/link] for updates." },
      { text: "A cheerful dog just helped deliver the morning newspaper!" }
    ]
  }
};
```


### Extended Example

```js
const pages = {

/* ============================================================
   PAGE 100 — FRONT PAGE
   ============================================================ */
100: {
  title: "Front Page",
  headerBackground: "blue",
  subpageNumberColor: "yellow",
  datetime: { enabled: false },

  content: [
    { text: "Welcome to TeletextJS! Explore the pages below." },
    { text: "Second intro screen. Try [link]200[/link] or [link]300[/link]." },
    { headerBackground: "black", text: "Dark variant subpage." }
  ]
},


/* ============================================================
   PAGE 200 — NEWS
   ============================================================ */
200: {
  title: "News",
  headerBackground: "red",
  datetime: { enabled: true, position: "right" },

  content: [
    { text: "Breaking: Teletext returns in full glory." },
    { headerBackground: "darkred", text: "Second news screen, extra red theme." },
    { datetime: { enabled: false }, text: "Silent page without datetime." },
    { showTitle: false, text: "Minimal mode, no title bar." }
  ]
},


/* ============================================================
   PAGE 300 — SPORTS
   ============================================================ */
300: {
  title: "Sports",
  headerBackground: "green",
  datetime: { enabled: true, showDate: true },

  content: [
    { text: "Local team wins championship!" },
    { headerBackground: "darkgreen", text: "Weather delay at football finals." },
    { datetime: { showWeekday: false }, text: "Golf tournament continues tomorrow." }
  ]
},


/* ============================================================
   PAGE 400 — WEATHER
   ============================================================ */
400: {
  title: "Weather",
  headerBackground: "cyan",
  datetime: { enabled: true, position: "left" },

  content: [
    { text: "Helsinki +2°C, Tampere 0°C, Oulu -3°C." },
    { headerBackground: "blue", text: "Snow showers expected in Lapland." },
    { datetime: { showDate: false }, text: "Weekend looks clear and cold." },
    { text: "Winds moderate from southwest." },
    { text: "End of forecast." }
  ]
},


/* ============================================================
   PAGE 700 — EXTRAS
   ============================================================ */
700: {
  title: "Extras",
  headerBackground: "magenta",
  datetime: { enabled: false },
  showTitle: true,

  content: [
    { text: "Teletext extras and fun facts!" },
    { headerBackground: "purple", text: "Experimental layout with new style." },
    { datetime: { enabled: true, position: "right" }, text: "Clock visible only here." },
    { showTitle: false, text: "Hidden title bar test." },
    { text: "End of extras." },
    { text: "Return to [link]100[/link]." }
  ]
}
};
```

---

## 3.2 Initializing and Displaying Pages

Once your pages are defined, initialize TeletextJS with:

```js
Teletext.init(pages, {
  defaultPage: 100, // This is optional
  aspectRatio: 4/3  // This is optional
});
```

This command renders the default page (`100` in this example) and activates navigation controls.

---

### 3.3 Navigation and Controls

TeletextJS provides an integrated control system that allows users to navigate pages using both physical input and on-screen elements. Navigation methods include keyboard input, virtual buttons, and touch gestures. On supported devices, subtle haptic feedback (vibration) enhances the experience by providing tactile confirmation of navigation steps.

---

### Keyboard Navigation

Keyboard navigation is automatically active on desktop devices when `enableKeyboard: true` is set in configuration.

| Key            | Action                       |
| -------------- | ---------------------------- |
| `0–9`          | Input digits for page number |
| `Enter`        | Load the entered page        |
| `←` / `→`      | Move between subpages        |
| `Home` / `End` | Jump to first or last page   |
| `Backspace`    | Clear numeric input          |

The system buffers numeric input until three digits are entered (for example, pressing `1`, `0`, `0` loads page 100).

---

### On-Screen Controls

When `buttons.enabled: true` is active, TeletextJS displays an interactive control panel below or beside the teletext screen. This panel functions as a **virtual remote control** and mirrors the behavior of the physical numeric keypad and arrow keys.

Example configuration:

```js
buttons: {
  enabled: true,
  showNumeric: true,
  position: "bottom-right",
  theme: "dark"
}
```

The control interface consists of three main sections:

* **Page Controls:** Previous (`←`) and next (`→`) page buttons
* **Subpage Controls:** Up (`↑`) and down (`↓`) buttons for changing subpages
* **Numeric Keypad:** Buttons 0–9 for entering page numbers directly

All buttons are fully interactive with mouse or touch input.
Each action updates the displayed page or subpage immediately, and the interface dynamically reflects the current navigation state (for example, disabling subpage arrows when only one subpage exists).

---

### Touch Navigation

Touch navigation is automatically enabled on mobile and tablet devices. Swiping within the teletext screen changes pages or subpages according to gesture direction and distance.

| Gesture     | Action                      |
| ----------- | --------------------------- |
| Swipe right | Next page (+1 / +10 / +100) |
| Swipe left  | Previous page               |
| Swipe up    | Next subpage                |
| Swipe down  | Previous subpage            |

Swipe sensitivity adapts to screen width and can be customized via `touch.threshold`, `touch.medium`, and `touch.long` in configuration.

---

### API Integration

TeletextJS includes a fully scriptable control interface via the `TeletextButtons` class.
This API mirrors all user interactions available through the keyboard, on-screen controls, or touch gestures — allowing external scripts, hardware devices, or custom interfaces to control navigation programmatically.

Developers can call these methods directly from the global `TeletextButtons` instance after initialization.

---

#### **Available Commands**

| Method                             | Description                                                                                 | Parameters                   | Example                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------- |
| `TeletextButtons.inputDigit(n)`    | Inputs a single numeric digit (0–9). Digits are buffered to form a three-digit page number. | `n` — number (0–9)           | `TeletextButtons.inputDigit(1)`             |
| `TeletextButtons.clearInput()`     | Clears the current numeric input buffer before the page is loaded.                          | *(none)*                     | `TeletextButtons.clearInput()`              |
| `TeletextButtons.goToPage(page)`   | Immediately loads the specified page number.                                                | `page` — number (e.g. `300`) | `TeletextButtons.goToPage(300)`             |
| `TeletextButtons.nextPage()`       | Navigates to the next available page (+1).                                                  | *(none)*                     | `TeletextButtons.nextPage()`                |
| `TeletextButtons.prevPage()`       | Navigates to the previous available page (−1).                                              | *(none)*                     | `TeletextButtons.prevPage()`                |
| `TeletextButtons.jumpPage(offset)` | Moves by a given offset (+10, −100, etc.).                                                  | `offset` — integer           | `TeletextButtons.jumpPage(10)`              |
| `TeletextButtons.nextSubpage()`    | Advances to the next subpage within the same page.                                          | *(none)*                     | `TeletextButtons.nextSubpage()`             |
| `TeletextButtons.prevSubpage()`    | Returns to the previous subpage.                                                            | *(none)*                     | `TeletextButtons.prevSubpage()`             |
| `TeletextButtons.firstSubpage()`   | Jumps to the first subpage of the current page.                                             | *(none)*                     | `TeletextButtons.firstSubpage()`            |
| `TeletextButtons.lastSubpage()`    | Jumps to the last subpage of the current page.                                              | *(none)*                     | `TeletextButtons.lastSubpage()`             |
| `TeletextButtons.toggleButtons()`  | Toggles the visibility of the on-screen control panel.                                      | *(none)*                     | `TeletextButtons.toggleButtons()`           |
| `TeletextButtons.getState()`       | Returns an object describing the current Teletext state (page, subpage, buffer, etc.).      | *(none)*                     | `const state = TeletextButtons.getState();` |

---

#### **Example Usage**

```js
// Load a specific page
TeletextButtons.goToPage(200);

// Navigate forward
TeletextButtons.nextPage();

// Change subpage
TeletextButtons.nextSubpage();

// Simulate typing "1 0 0"
TeletextButtons.inputDigit(1);
TeletextButtons.inputDigit(0);
TeletextButtons.inputDigit(0);

// Retrieve current state
const state = TeletextButtons.getState();
console.log(state.page, state.subpage);
```

---

#### **Returned State Object Example**

The `getState()` method returns a structured object with useful navigation data:

```js
{
  page: 300,          // current page number
  subpage: 2,         // current subpage index
  totalSubpages: 4,   // total subpages in this page
  inputBuffer: "10",  // current numeric input
  buttonsVisible: true
}
```

---

### Layout and Styling

The button panel inherits style variables from configuration or CSS, including color, padding, and font.

Common style properties in `config.js`:

```js
buttons: {
  buttonBg: "#111",
  buttonFg: "#fff",
  buttonBorder: "1px solid #333",
  buttonBorderRadius: "6px",
  buttonPadding: "0.3em 0.8em",
  buttonGap: "0.4em"
}
```

These settings are applied dynamically and can be further customized using CSS variables prefixed with `--ttx-button-*`.

---

### Summary

* Navigation can be performed via keyboard, on-screen controls, or touch gestures.
* The on-screen control panel acts as a virtual remote with full numeric and directional input.
* All control actions are mirrored by the unified `TeletextButtons` API, allowing external automation.
* Visual customization is handled through configuration or CSS variables for full theme control.

---

## 3.4 Subpages

Every page in TeletextJS consists of at least one **subpage**.
A subpage is the actual content unit of a page — each page always corresponds to one or more subpages.
When multiple subpages are defined within a page’s `content` array, they are automatically numbered in the order they appear.
A subpage primarily inherits its settings from the parent page element.

```js
200: {
  title: "News",
  content: [
    { text: "Morning headlines: markets open higher." },
    { text: "Sports update: local team wins championship." },
    { text: "Weather: clear skies expected tomorrow." }
  ]
}
```

In this example, page **200** contains three subpages, automatically numbered as *200.1*, *200.2*, and *200.3*. The system automatically numbers them as *1/3*, *2/3*, and *3/3* in the header display to indicate their position within the sequence.

---

## 3.5 Inline Formatting, Color Tags, and Links

TeletextJS supports a lightweight inline markup syntax for adding color, emphasis, and internal navigation links directly within page content.
This markup is parsed when a page is rendered and converted into styled HTML elements, usually `<span>` elements with `.ttx-*` CSS classes.

---

### Color Tags

Color tags are written using square brackets and define either text color or background color.
Each tag is replaced by a corresponding class defined in `teletext.css`.

| Markup                        | Class            | Description         | Color                                                                                                                                 |
| ----------------------------- | ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `[blue]Text[/blue]`           | `.ttx-blue`      | Blue text           | `#0000ff` <span style="background:#0000ff;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[green]Text[/green]`         | `.ttx-green`     | Green text          | `#00ff00` <span style="background:#00ff00;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[cyan]Text[/cyan]`           | `.ttx-cyan`      | Cyan text           | `#00ffff` <span style="background:#00ffff;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[yellow]Text[/yellow]`       | `.ttx-yellow`    | Yellow text         | `#ffff00` <span style="background:#ffff00;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[red]Text[/red]`             | `.ttx-red`       | Red text            | `#ff0000` <span style="background:#ff0000;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[magenta]Text[/magenta]`     | `.ttx-magenta`   | Magenta text        | `#ff00ff` <span style="background:#ff00ff;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[white]Text[/white]`         | `.ttx-white`     | White text          | `#ffffff` <span style="background:#ffffff;display:inline-block;width:1em;height:1em;border:1px solid #ccc;border-radius:2px;"></span> |
| `[black]Text[/black]`         | `.ttx-black`     | Black text          | `#000000` <span style="background:#000000;display:inline-block;width:1em;height:1em;border:1px solid #ccc;border-radius:2px;"></span> |
| `[dkblue]Text[/dkblue]`       | `.ttx-dkblue`    | Dark blue text      | `#02006c` <span style="background:#02006c;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[dkgreen]Text[/dkgreen]`     | `.ttx-dkgreen`   | Dark green text     | `#009900` <span style="background:#009900;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[dkcyan]Text[/dkcyan]`       | `.ttx-dkcyan`    | Dark cyan text      | `#009999` <span style="background:#009999;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[dkyellow]Text[/dkyellow]`   | `.ttx-dkyellow`  | Dark yellow text    | `#999900` <span style="background:#999900;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[dkred]Text[/dkred]`         | `.ttx-dkred`     | Dark red text       | `#990000` <span style="background:#990000;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[dkmagenta]Text[/dkmagenta]` | `.ttx-dkmagenta` | Dark magenta text   | `#990099` <span style="background:#990099;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[grey]Text[/grey]`           | `.ttx-grey`      | Grey text           | `#888888` <span style="background:#888888;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[brblue]Text[/brblue]`       | `.ttx-brblue`    | Bright blue text    | `#66ccff` <span style="background:#66ccff;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[brgreen]Text[/brgreen]`     | `.ttx-brgreen`   | Bright green text   | `#66ff66` <span style="background:#66ff66;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[brcyan]Text[/brcyan]`       | `.ttx-brcyan`    | Bright cyan text    | `#99ffff` <span style="background:#99ffff;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[bryellow]Text[/bryellow]`   | `.ttx-bryellow`  | Bright yellow text  | `#ffff99` <span style="background:#ffff99;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[brred]Text[/brred]`         | `.ttx-brred`     | Bright red text     | `#ff6666` <span style="background:#ff6666;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[brmagenta]Text[/brmagenta]` | `.ttx-brmagenta` | Bright magenta text | `#ff66ff` <span style="background:#ff66ff;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[brwhite]Text[/brwhite]`     | `.ttx-brwhite`   | Bright white text   | `#f8f8f8` <span style="background:#f8f8f8;display:inline-block;width:1em;height:1em;border:1px solid #ccc;border-radius:2px;"></span> |
| `[orange]Text[/orange]`       | `.ttx-orange`    | Orange text         | `#ff9900` <span style="background:#ff9900;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[brown]Text[/brown]`         | `.ttx-brown`     | Brown text          | `#996633` <span style="background:#996633;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[lime]Text[/lime]`           | `.ttx-lime`      | Lime text           | `#99ff33` <span style="background:#99ff33;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[pink]Text[/pink]`           | `.ttx-pink`      | Pink text           | `#ff66cc` <span style="background:#ff66cc;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[sky]Text[/sky]`             | `.ttx-sky`       | Sky blue text       | `#66ccff` <span style="background:#66ccff;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[aqua]Text[/aqua]`           | `.ttx-aqua`      | Aqua text           | `#33cccc` <span style="background:#33cccc;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[gold]Text[/gold]`           | `.ttx-gold`      | Gold text           | `#ffd700` <span style="background:#ffd700;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[silver]Text[/silver]`       | `.ttx-silver`    | Silver text         | `#cccccc` <span style="background:#cccccc;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[rose]Text[/rose]`           | `.ttx-rose`      | Rose text           | `#ff99aa` <span style="background:#ff99aa;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |
| `[amber]Text[/amber]`         | `.ttx-amber`     | Amber text          | `#ffbf00` <span style="background:#ffbf00;display:inline-block;width:1em;height:1em;border:1px solid #333;border-radius:2px;"></span> |

You can freely mix color tags with normal HTML or Teletext components (e.g. `<ttx-block>`).
Nested color tags are also supported — the innermost tag takes precedence.

---

### Link Tags

Links are defined using the `[link]` tag and automatically converted into interactive internal navigation elements.

**Syntax:**

```
[link]300[/link]
```

When rendered:

* If the content inside `[link]` is a **three-digit page number** (e.g. `100–899`), it becomes a clickable link that navigates to that Teletext page.
* TeletextJS internally transforms it into an `<a>` element with the class `.ttx-link`.
* Clicking it (or selecting the same number via keyboard input) automatically switches to the corresponding page, without reloading the browser.
* The link’s appearance (usually blue or highlighted) follows the `linkUnderline`, `baseTextColor`, and `.ttx-link` style definitions in `teletext.css`.
* Non-numeric link text (e.g. `[link]Home[/link]`) is rendered as styled text but does **not** perform navigation.

**Example:**

```text
For the weather forecast, see [link]300[/link].
```

**Rendered result:**

> For the weather forecast, see **300** (blue clickable link).

---

### Centered Text

If you want to center text or any element inside your page, use a regular `<div>` with the `.ttx-center` class rather than a `[center]` tag.
This class is already defined in **teletext.css** and ensures proper centering without breaking the Teletext layout.

**Example:**

```html
<div class="ttx-center">
  [cyan]LIGHTWEIGHT, FUN AND EASY TO USE![/cyan]
</div>
```

**CSS definition:**

```css
.ttx-center {
  display: inline-block;
  text-align: center;
  width: 100%;
}

.ttx-center > * {
  display: inline-block;
  text-align: center;
}
```

The `.ttx-center` class makes the enclosed content centered both horizontally and semantically compatible with other TeletextJS elements.

---

### Formatting and Spacing

When adding manual spacing or indentation inside Teletext content, avoid using multiple spaces or tab characters as browsers collapse them automatically.
Instead, use the HTML entity `&nbsp;` (non-breaking space) to preserve exact spacing in rendered output.

**Example:**

```html
<p>
&nbsp;&nbsp;&nbsp;Indented line of text aligned under a header.
</p>
````

Each `&nbsp;` represents a single fixed-width space that will not collapse or break between lines.
This method ensures consistent alignment across different browsers, fonts, and screen sizes.

> Note: TeletextJS preserves `&nbsp;` characters even when parsing color tags or inline markup, so they are safe to use anywhere in content strings.

---

### Summary

* Inline markup allows simple color and link styling without HTML.
* `[color]...[/color]` and `[bg-color]...[/bg-color]` modify text and background colors.
* `[link]page[/link]` creates an interactive Teletext-style navigation link.
* All tags are parsed and replaced by HTML spans or anchors at render time, using predefined `.ttx-*` classes from `teletext.css`.

---

## 3.6 Built-in Components

### `<ttx-block>`

A general-purpose content container used for styled sections, banners, or boxed information.

**Example:**

```html
<ttx-block background="blue" color="white" padding="2" font-size="1.2em">
  Important notice inside a styled block.
</ttx-block>
```

**Attributes:**

* `background` — background color (e.g. “blue”, “black”).
* `color` — text color.
* `padding`, `margin` — spacing.
* `font-size` — font size multiplier.
* `align` — text alignment (`left`, `center`, `right`).

All of these map to CSS variables that can also be globally adjusted in `config.js` or `teletext.css`.

---

### `<ttx-mosaic>`

Displays grid-based pixel mosaics similar to classic teletext art.

**Example:**

```html
<ttx-mosaic cols="8" rows="4" data="01234567...." gap="1"></ttx-mosaic>
```

**Attributes:**

* `cols`, `rows` — grid dimensions.
* `data` — character string defining each cell (`0–7` for colors, `.` for transparent).
* `gap` — space between cells.
* `palette` — optional JSON color palette.

You can define a global palette via a container element:

```html
<div data-ttx-mosaic-palette='{"0":"#000","1":"#fff","2":"#f00"}'></div>
```

---

### `<ttx-blink>`

Renders blinking text using CSS animation.

**Example:**

```html
<ttx-blink color="yellow" speed="1s">
  [red]ALERT[/red] SYSTEM FAILURE
</ttx-blink>
```

**Attributes:**

* `color` — overrides text color.
* `speed` — blink interval (e.g. “1s”, “2s”).
* `state` — “on”, “off”, or “toggle”.

---

### `<ttx-title>`

A freely positionable, stylized title element for overlaying text above TeletextJS content.
It supports full theme customization through CSS variables and config parameters.

**Example:**

```html
<ttx-title color="yellow" size="3em" top="10%">
  TELETEXT NEWS
</ttx-title>
```

**Attributes:**

* `top`, `left` — position as percentage values relative to the Teletext screen (`top="0%"` places the title at the top edge).
* `color` — text color (CSS value).
* `font` — font family (e.g. `"PixelFont", monospace`).
* `size` — font size (`em`, `px`, or `%`).
* `weight` — font weight (`normal`, `bold`, etc.).
* `align` — text alignment (`left`, `center`, `right`).
* `background`, `border`, `radius` — optional box styling.
* `shadow` — text-shadow effect.
* `margin`, `padding` — spacing control.
* `z` — z-index for layering.
* `offset` — **vertical font offset compensation**, used to fine-tune baseline alignment for different fonts.

All these attributes map directly to CSS custom properties (e.g. `--ttx-title-color`, `--ttx-title-top`, `--ttx-title-offset`) and can also be defined globally in `config.js` or `teletext.css`.

---

**Font alignment note:**

The default configuration of `<ttx-title>` uses the custom pixel font **`pixel.ttf`**, defined as:

```css
--ttx-title-font: "PixelFont", monospace;
```

Because this specific font includes intrinsic vertical spacing (*ascent area*) above the visible glyphs,
a compensating transform is applied:

```css
transform: translateX(-50%) translateY(var(--ttx-title-offset, -0.175em));
```

The default offset value `-0.175em` ensures that when `top="0%"`,
the visible text truly begins from the very top edge of the screen.
This makes positioning consistent and intuitive even when using pixel fonts with uneven baselines.

If a user changes the font, they can adjust this compensation in configuration:

```js
title: {
  font: "'European Teletext', monospace",
  offset: "0em" // Adjust if the new font has different baseline metrics
}
```

---

**Configuration (excerpt from `config.js`):**

```js
title: {
  color: "cyan",
  background: "transparent",
  align: "center",
  font: "'PixelFont', monospace",
  size: "3em",
  weight: "bold",
  margin: "0 0",
  padding: "0",
  shadow: "none",
  border: "none",
  radius: "0",
  offset: "-0.175em" // vertical baseline adjustment for pixel.ttf
}
```

> **Placement note:**
>
> When adding `<ttx-title>` to a page, place the element **as the last child inside the content container** (for example, after `<ttx-content>` or `<header>` elements).
This avoids unintended vertical gaps caused by browser whitespace handling or block-level element margins above the title.
>
> Even though `<ttx-title>` is absolutely positioned and visually overlays other elements, its position in the DOM can still influence how parent layout margins collapse—particularly if a `<header>` or `<section>` element precedes it.
Placing `<ttx-title>` last ensures consistent top alignment and prevents unwanted spacing shifts.

**Summary:**
`<ttx-title>` provides a flexible, accessible title overlay system that integrates seamlessly with TeletextJS themes.
Its offset parameter ensures precise vertical alignment across different fonts and screen scales.

> Accessibility attributes such as `role` and `aria-label` are automatically preserved.

---

## 3.7 Page Layout and Structure

Each page is divided into three visual sections:

* **Header** — shows page number, title, and subpage index.
* **Content area** — displays page text, color markup, and components.
* **Footer** — optional bar for clock, hints, or custom info.

The layout maintains the defined aspect ratio (`4:3`, `16:9`, etc.) and scales dynamically to fit the browser window.

---

## 3.8 Example Page Set

```js
const pages = {
  100: {
    title: "Home",
    content: `
      <ttx-block background="black" color="yellow" align="center">
        Welcome to [red]TeletextJS[/red]!
      </ttx-block>
      <p>Navigate using [yellow]1[/yellow] for News, [cyan]2[/cyan] for Weather.</p>
    `
  },
  101: {
    title: "Weather",
    content: `
      <ttx-mosaic cols="6" rows="3" data="012345...." gap="1"></ttx-mosaic>
      <ttx-blink color="red" speed="1s">Severe Weather Warning!</ttx-blink>
    `
  }
};

Teletext.init(pages, { defaultPage: 100 });
```

This creates a fully functional teletext interface with styled blocks, mosaic graphics, and blinking text effects.

---

## 3.9 Summary

* Define pages in a `pages` object using `title` and `content`.
* Use arrays for multi-page (subpage) content.
* Navigate with numeric keys or on-screen buttons.
* Style content with `[color]...[/color]` tags.
* Embed `<ttx-block>`, `<ttx-mosaic>`, and `<ttx-blink>` directly in your page content.
* Control appearance and behavior via initialization options or configuration settings.

The next section will detail how configuration and override hierarchy work to control global behavior and styling.

# 4. Configuration and Override Hierarchy

TeletextJS uses a **layered configuration system** that merges settings from multiple sources in a defined order of priority.
Each level refines or overrides values from the previous one, allowing both global defaults and page-specific customization.

---

## 4.1 Configuration Priority

When TeletextJS runs, configuration values are resolved in the following order (from **highest** to **lowest** priority):

1. **Per-page settings** – any property defined directly in a page object (e.g. `pages[100].aspectRatio = "16:9"`) overrides all other sources for that page.
2. **Initialization options** – parameters passed to `Teletext.init(pages, options)`.
3. **config.js** – optional global configuration file automatically loaded by `teletext.js` if it exists.
4. **Built-in defaults** – internal fallback values defined inside `teletext.js`.
5. **CSS styles** – visual defaults defined in `teletext.css` (applied as CSS variables).
6. **Component-level defaults** – each web component (`Block`, `Mosaic`, `Blink`) has its own internal baseline settings for color, spacing, and behavior.

This means the **last defined value always wins**.
For example, a `baseFont` defined inside a page will override the same key in `config.js`, even if `config.js` specifies a different value.

If a value is missing from `config.js`, the system automatically falls back to the internal defaults built into `teletext.js`, ensuring stable behavior even if parts of the configuration are removed or corrupted.

---

## 4.2 How Configuration Is Applied

When TeletextJS starts:

1. It loads `config.js` (if available) and merges it with internal defaults.
2. It applies any `options` object passed to `Teletext.init()`, overwriting existing keys.
3. When rendering a specific page, it checks for per-page properties and applies them last.
4. All visual-related keys are converted into CSS variables (e.g. `--ttx-base-font`, `--ttx-color-primary`) using the `applyConfig()` and `applyDynamicStyle()` methods, affecting both the layout and components.

This layered approach allows you to define global behavior in `config.js`, site-level preferences in `Teletext.init()`, and fine-tuned styling on a per-page basis.

---

## 4.3 Commonly Used Settings

Below are the most relevant and frequently adjusted settings.
A complete list follows in the next section.

| Setting               | Type / Example                        | Description                                                                   |
| --------------------- | ------------------------------------- | ----------------------------------------------------------------------------- |
| **`defaultPage`**     | `100`                                 | The page loaded automatically on startup.                                     |
| **`aspectRatio`**     | `"4:3"` or `"16:9"`                   | Defines the screen’s width-to-height ratio. Format must be `number:number`.   |
| **`baseFont`**        | `"1.0em"` or `"14px"`                 | Controls the global text scaling for all content.                             |
| **`buttons.enabled`** | `true` / `false`                      | Toggles the on-screen navigation button panel.                                |
| **Color values**      | `"red"`, `"#ff0"`, `"rgb(255,255,0)"` | All color fields accept standard CSS color names, hexadecimal, or RGB syntax. |

**Example usage:**

```js
Teletext.init(pages, {
  defaultPage: 100,
  aspectRatio: "4:3",
  baseFont: "1.1em",
  buttons: { enabled: true }
});
```

Per-page overrides can also be defined like this:

```js
pages[200].aspectRatio = "16:9";
pages[200].baseFont = "1.3em";
```

---

## 4.4 CSS Integration

Visual and layout-related settings are reflected in the stylesheet via CSS variables prefixed with `--ttx-`.
For example, `baseFont` becomes `--ttx-base-font`, and colors such as `colorPrimary` become `--ttx-color-primary`.

This allows additional fine-tuning through external CSS if needed:

```css
:root {
  --ttx-base-font: 1.2em;
  --ttx-color-primary: yellow;
}
```

---

## 4.5 Component Defaults

Each web component (`<ttx-block>`, `<ttx-mosaic>`, `<ttx-blink>`) includes its own internal default behavior and style rules.
These can be overridden globally in `config.js` under their respective sections (e.g. `config.block`, `config.mosaic`, `config.blink`) or inline via HTML attributes.

---

### Summary

* Configuration flows from **per-page → init options → config.js → internal defaults → CSS → component defaults**.
* The **most specific definition wins**.
* `defaultPage`, `aspectRatio`, `baseFont`, and `buttons.enabled` are the most common global options.
* Colors can be set using standard CSS formats (name, hex, or RGB).
* Even if `config.js` is missing or incomplete, TeletextJS will still operate using its internal defaults and CSS variables.


# 5. Complete Configuration Reference

The following table lists all configuration keys available in **TeletextJS**, grouped by category. Each setting includes its type, example value, and a concise description. Default values are those defined in `teletext.js`, which act as fallbacks if not overridden in `config.js` or initialization options.

---

## 5.1 Core Settings

| Key                | Type / Example | Description                                                |
| ------------------ | -------------- | -----------------------------------------------------------|
| `touch.threshold`  | `8`            | Minimum swipe distance (% of width) to trigger navigation. |
| `touch.medium`     | `25`           | Swipe distance (% of width) for ±10 page jump.             |
| `touch.long`       | `60`           | Swipe distance (% of width) for ±100 page jump.            |
| `containerId`      | `"teletext"`   | HTML element ID where the teletext interface is rendered.  |
| `defaultPage`      | `100`          | Page number displayed on startup.                          |
| `enableKeyboard`   | `true`         | Enables keyboard navigation (numbers, arrows, backspace).  |
| `baseTextColor`    | `"#ffffff"`  | Default text color for all content.                        |
| `showMobileNotice` | `true`         | Displays a mobile device usage notice.                     |
| `aspectRatio`      | `4 / 3`        | Screen ratio (width / height), e.g. `4 / 3` or `16 / 9`.   |
| `containerWidth`   | `"100%"`       | Width of the main teletext container.                      |
| `containerDisplay` | `"block"`      | CSS display mode for the container.                        |
| `containerAlign`   | `"center"`     | Horizontal alignment (`left`, `center`, `right`).          |
| `maxWidth`         | `"800px"`      | Maximum allowed teletext width.                            |
| `nativeWidth`      | `800`          | Internal pixel width for scaling calculations.             |
| `linkUnderline`    | `false`        | Whether links are underlined.                              |

---

## 5.2 Line Element Settings

| Key                 | Type / Example | Description                                         |
| ------------------- | -------------- | --------------------------------------------------- |
| `line.thickness`    | `"0.3em"`      | Line thickness for `[line]` tag.                    |
| `line.color`        | `"#fff"`     | Line color.                                         |
| `line.style`        | `"solid"`      | Line style (`solid`, `dashed`, `dotted`, `double`). |
| `line.marginTop`    | `"0.5em"`      | Vertical spacing above the line.                    |
| `line.marginBottom` | `"0.5em"`      | Vertical spacing below the line.                    |

---

## 5.3 Font and Typography

| Key                | Type / Example          | Description                                       |
| ------------------ | ----------------------- | ------------------------------------------------- |
| `baseSize`         | `22`                    | Base font size in pixels, affects global scaling. |
| `contentFontSize`  | `"1em"`                 | Default text size inside content.                 |
| `headerFontSizes`  | `{ h1: "1.9em", ... }`  | Heading font sizes for `<h1>`–`<h6>`.             |
| `headerFontColors` | `{ h1: "yellow", ... }` | Heading text colors for `<h1>`–`<h6>`.            |

---

## 5.4 Frame and Border

| Key                | Type / Example               | Description                     |
| ------------------ | ---------------------------- | ------------------------------- |
| `border.enabled`   | `false`                      | Toggles outer frame visibility. |
| `border.width`     | `4`                          | Border thickness in pixels.     |
| `border.color`     | `"#cccccc"`                | Border color.                   |
| `border.style`     | `"solid"`                    | Border style.                   |
| `border.radius`    | `6`                          | Corner radius in pixels.        |
| `border.glow`      | `false`                      | Enables glow effect.            |
| `border.glowColor` | `"rgba(220,220,220,0.6)"` | Glow color when enabled.         |

---

## 5.5 Mobile Notice

| Key            | Type / Example                              | Description                                                               |
| -------------- | ------------------------------------------- | ------------------------------------------------------------------------- |
| `mobileNotice` | `"This interface works best on desktop..."` | Text displayed on mobile devices when TeletextJS detects a small screen. |

---

## 5.6 Header Bar

| Key                   | Type / Example | Description                       |
| --------------------- | -------------- | --------------------------------- |
| `headerBackground`    | `"blue"`       | Header background color.          |
| `headerMarginTop`     | `"1em"`        | Top margin for the header bar.    |
| `headerMarginBottom`  | `"1em"`        | Bottom margin for the header bar. |
| `headerMarginLeft`    | `"1em"`        | Left margin.                      |
| `headerMarginRight`   | `"1em"`        | Right margin.                     |
| `pageNumberSize`      | `"1em"`        | Page number font size.            |
| `pageNumberWeight`    | `"normal"`     | Page number font weight.          |
| `pageNumberColor`     | `"#fff"`     | Page number color.                |
| `titleColor`          | `"#fff"`     | Header title text color.          |
| `titleWeight`         | `"normal"`     | Header title weight.              |
| `titleSize`           | `"1em"`        | Header title font size.           |
| `titleAlign`          | `"left"`       | Title alignment.                  |
| `titleMarginLeft`     | `"1em"`        | Left margin for title.            |
| `titleMarginRight`    | `"1em"`        | Right margin for title.           |
| `subpageNumberSize`   | `"1em"`        | Subpage indicator size.           |
| `subpageNumberWeight` | `"normal"`     | Subpage font weight.              |
| `subpageNumberColor`  | `"#fff"`     | Subpage text color.               |

---

## 5.7 Datetime (Header Clock & Date)

| Key                      | Type / Example | Description                             |
| ------------------------ | -------------- | --------------------------------------- |
| `datetime.enabled`       | `true`         | Enables or disables the clock and date. |
| `datetime.position`      | `"right"`      | Display position (`left` or `right`).   |
| `datetime.locale`        | `"en-US"`      | Locale for date/time formatting.        |
| `datetime.showClock`     | `true`         | Show current time.                      |
| `datetime.showDate`      | `false`        | Show current date.                      |
| `datetime.showWeekday`   | `true`         | Show weekday name.                      |
| `datetime.timeFormat`    | `"HH:MM:SS"`   | Time display format.                    |
| `datetime.dateFormat`    | `"DD.MM.YYYY"` | Date display format.                    |
| `datetime.weekdayFormat` | `"short"`      | Weekday format (`short` or `long`).     |
| `datetime.color`         | `"#ffffff"`  | Text color for date/time.               |
| `datetime.fontWeight`    | `"normal"`     | Font weight for date/time.              |
| `datetime.size`          | `"1em"`        | Font size for date/time.                |
| `datetime.marginLeft`    | `"0.5em"`      | Left margin spacing.                    |
| `datetime.marginRight`   | `"0.5em"`      | Right margin spacing.                   |

---

## 5.8 Content Area

| Key                   | Type / Example | Description                           |
| --------------------- | -------------- | ------------------------------------- |
| `contentPaddingLeft`  | `"1em"`        | Left padding inside the content area. |
| `contentPaddingRight` | `"1em"`        | Right padding.                        |
| `contentLineHeight`   | `"1.2"`        | Line height for content text.         |

---

## 5.9 Visual Effects

| Key             | Type / Example | Description                           |
| --------------- | -------------- | ------------------------------------- |
| `enableFlicker` | `true`         | Enables subtle CRT-style flicker.     |
| `flickerSpeed`  | `"4s"`         | Speed of the flicker animation.       |
| `screenRadius`  | `"0.2em"`      | Corner radius of the teletext screen. |

---

## 5.10 Footer

| Key               | Type / Example                           | Description                                    |
| ----------------- | ---------------------------------------- | ---------------------------------------------- |
| `showFooterText`  | `true`                                   | Show or hide footer text.                      |
| `footerText`      | `"Use Arrow keys or numbers (100–899)."` | Footer hint text.                              |
| `footerTextColor` | `"white"`                                | Footer text color.                             |
| `footerPosition`  | `"inside"`                               | Placement of the footer (`inside` or `below`). |

---

## 5.11 Button Panel

| Key                             | Type / Example                   | Description                                            |
| ------------------------------- | -------------------------------- | ------------------------------------------------------ |
| `buttons.enabled`               | `true`                           | Enables on-screen button panel.                        |
| `buttons.showNumeric`           | `true`                           | Displays numeric keypad (0–9).                         |
| `buttons.containerId`           | `"teletext-controls"`            | ID of the button container.                            |
| `buttons.position`              | `"custom"`                       | Button placement (`below`, `left`, `right`, `custom`). |
| `buttons.theme`                 | `"dark"`                         | Visual theme (`dark` or `light`).                      |
| `buttons.buttonBg`              | `"#111"`                         | Button background color.                               |
| `buttons.buttonFg`              | `"#f8f8f8"`                      | Button text color.                                     |
| `buttons.buttonBorder`          | `"1px solid #333"`               | Button border style.                                   |
| `buttons.buttonBorderRadius`    | `"6px"`                          | Button corner radius.                                  |
| `buttons.buttonHoverBg`         | `"#1a1a1a"`                      | Hover background color.                                |
| `buttons.buttonHoverFg`         | `"#f8f8f8"`                      | Hover text color.                                      |
| `buttons.fontFamily`            | `"European Teletext, monospace"` | Font used in buttons.                                  |
| `buttons.buttonFontSize`        | `"0.8em"`                        | Font size for buttons.                                 |
| `buttons.buttonContainerMargin` | `"0.8em 0 0 0"`                  | Outer margin of button container.                      |
| `buttons.buttonPadding`         | `"0.3em 0.8em"`                  | Inner padding of buttons.                              |
| `buttons.buttonGap`             | `"0.4em"`                        | Space between adjacent buttons.                        |

---

## 5.12 Component Settings

### Block Component (`<ttx-block>`)

| Key                | Example      | Description               |
| ------------------ | ------------ | ------------------------- |
| `block.background` | `"blue"`     | Default background color. |
| `block.color`      | `"#fff"`   | Default text color.       |
| `block.padding`    | `"0.5em"`    | Uniform inner spacing.    |
| `block.margin`     | `"0.25em 0"` | Outer spacing.            |
| `block.fontSize`   | `"1em"`      | Text size.                |
| `block.lineHeight` | `"1.25"`     | Line spacing.             |
| `block.radius`     | `"0px"`      | Corner rounding.          |
| `block.border`     | `"none"`     | Border style.             |
| `block.shadow`     | `"none"`     | Box shadow.               |

---

### Mosaic Component (`<ttx-mosaic>`)

| Key                 | Example                                                                                        | Description                          |
| ------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------ |
| `mosaic.background` | `"transparent"`                                                                                | Background color.                    |
| `mosaic.color`      | `"inherit"`                                                                                    | Text color (usually unused).         |
| `mosaic.border`     | `"none"`                                                                                       | Border style.                        |
| `mosaic.radius`     | `"0"`                                                                                          | Corner rounding.                     |
| `mosaic.shadow`     | `"none"`                                                                                       | Box shadow.                          |
| `mosaic.gap`        | `"0"`                                                                                          | Space between mosaic cells.          |
| `mosaic.cellSize`   | `"auto"`                                                                                       | Optional size hint for cells.        |
| `mosaic.palette`    | `["transparent", "#ff0000", "#00ff00", "#ffff00", "#0000ff", "#ff00ff", "#00ffff", "#ffffff"]` | Default color palette (indexes 0–7). |

---

### Blink Component (`<ttx-blink>`)

| Key           | Example     | Description            |
| ------------- | ----------- | ---------------------- |
| `blink.speed` | `"1s"`      | Blink animation speed. |
| `blink.color` | `"inherit"` | Text color override.   |

---

### Title Component (`<ttx-title>`)

| Key                | Example                    | Description                                                                  |
| ------------------ | -------------------------- | ---------------------------------------------------------------------------- |
| `title.color`      | `"cyan"`                   | Text color.                                                                  |
| `title.background` | `"transparent"`            | Background color behind the title text.                                      |
| `title.align`      | `"center"`                 | Text alignment (`left`, `center`, `right`).                                  |
| `title.font`       | `"'PixelFont', monospace"` | Font family used for the title text.                                         |
| `title.size`       | `"3em"`                    | Font size.                                                                   |
| `title.weight`     | `"bold"`                   | Font weight.                                                                 |
| `title.margin`     | `"0 0"`                    | Margin around the title.                                                     |
| `title.padding`    | `"0"`                      | Inner padding.                                                               |
| `title.shadow`     | `"none"`                   | Text shadow.                                                                 |
| `title.border`     | `"none"`                   | Optional border.                                                             |
| `title.radius`     | `"0"`                      | Corner rounding.                                                             |
| `title.offset`     | `"-0.175em"`                | Vertical baseline adjustment for `pixel.ttf`; compensates font ascent space. |

> **Note:**
> The default title font is `PixelFont` (from `pixel.ttf`).
> Because this font includes extra ascent space above the visible glyphs,
> the `offset` property applies a negative vertical transform (`translateY(-0.175em)`)
> to ensure that when `top="0%"`, the visible text starts exactly at the top edge of the screen.


### Notes

* All color fields accept **named CSS colors**, **hexadecimal values**, or **RGB strings** (`"red"`, `"#ff0000"`, `"rgb(255,0,0)"`).
* Units (e.g., `"px"`, `"em"`, `"%"`) must be included where applicable.
* Any omitted values revert to defaults defined in `teletext.js`.
* Per-page settings, initialization options, and `config.js` can override these values individually.


# 6. Appearance and CSS

The **visual presentation** of TeletextJS is handled by the stylesheet `teletext.css`.
It defines the grid layout, typography, color variables, and responsive scaling logic that recreates the retro teletext appearance while remaining adaptable to modern displays.

---

## 6.1 Structural Overview

TeletextJS renders all visual elements inside a root container (by default, the element with `id="teletext"`).
When initialized, the script generates the following internal structure:

```html
<div id="teletext" class="ttx-wrapper">
  <div class="ttx-screen">
    <header class="ttx-header">
      <div class="ttx-page-number">100</div>
      <div class="ttx-title">Home</div>
      <div class="ttx-subpage">1/1</div>
    </header>

    <main class="ttx-content">
      <!-- Page text, [color] markup, and components -->
    </main>

    <footer class="ttx-footer">
      <div class="ttx-footer-text">Use Arrow keys or numbers (100–899). [↑/↓] changes subpages.</div>
    </footer>
  </div>
</div>
```

* `.ttx-wrapper` — top-level container controlling alignment and width.
* `.ttx-screen` — the main display surface that scales according to `aspectRatio`.
* `.ttx-header` / `.ttx-content` / `.ttx-footer` — logical sections styled independently using CSS variables.
* Each web component (`<ttx-block>`, `<ttx-mosaic>`, `<ttx-blink>`) is styled within its own Shadow DOM, isolating it from global styles while still inheriting color and font variables.

---

## 6.2 CSS Variable System

`teletext.css` uses **CSS custom properties (variables)** to make nearly every aspect configurable through JavaScript or `config.js`.

All variables use the `--ttx-` prefix.
For example:

| Variable                | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| `--ttx-base-font`       | Global font size scaling (controlled by `baseFont` / `baseSize`). |
| `--ttx-color-primary`   | Primary text color.                                               |
| `--ttx-bg-header`       | Background color of the header bar.                               |
| `--ttx-bg-footer`       | Background color of the footer.                                   |
| `--ttx-content-padding` | Horizontal padding inside the content area.                       |
| `--ttx-aspect-ratio`    | Numeric ratio value (used to calculate height).                   |
| `--ttx-screen-radius`   | Corner rounding of the entire teletext screen.                    |

These variables are applied globally via the `applyConfig()` and `applyDynamicStyle()` functions in `teletext.js`, ensuring any change in configuration or window size updates the style dynamically.

You can override these directly in your own stylesheet, for example:

```css
:root {
  --ttx-bg-header: darkblue;
  --ttx-base-font: 1.2em;
  --ttx-color-primary: #ff0;
}
```

---

## 6.3 Font System

The teletext appearance relies on the **European Teletext** typeface, a monospaced pixel-style font defined in `teletext.css`.
It’s loaded via a `@font-face` rule and applied throughout the teletext environment:

```css
@font-face {
  font-family: "European Teletext";
  src: url("../fonts/teletext.woff2") format("woff2");
  font-display: swap;
}

.ttx-screen {
  font-family: "European Teletext", monospace;
  color: var(--ttx-color-primary, #fff);
  background: black;
}
```

The font’s pixel grid defines the authentic retro look.
The **`baseFont`** and **`baseSize`** options control the relative scaling, ensuring consistent readability across resolutions.
Headings (`h1–h6`) inherit size and color variables from configuration (`headerFontSizes`, `headerFontColors`).

---

## 6.4 Aspect Ratio and Scaling

A key part of the Teletext layout is maintaining a consistent **aspect ratio** (e.g., `4:3`, `16:9`) regardless of window size.

* The ratio is converted into a percentage height based on width:

  ```css
  .ttx-screen::before {
    content: "";
    display: block;
    padding-top: calc(100% / (var(--ttx-aspect-ratio)));
  }
  ```
* The display automatically scales using `transform: scale()` to fit the available viewport while preserving pixel proportions.
* The scaling respects `maxWidth` and `containerAlign` to center the teletext within the page.

This ensures the interface always looks like a true broadcast-style teletext page, whether on a large monitor or mobile screen.

---

## 6.5 Header and Footer Styling

Both the header and footer use dedicated CSS variables and layout rules:

**Header (`.ttx-header`)**

```css
.ttx-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--ttx-bg-header, blue);
  color: var(--ttx-color-header-text, #fff);
  padding: 0.3em 1em;
  font-size: 1em;
}
```

**Footer (`.ttx-footer`)**

```css
.ttx-footer {
  text-align: center;
  color: var(--ttx-footer-color, white);
  background-color: var(--ttx-bg-footer, transparent);
  padding: 0.3em 0;
  font-size: 0.9em;
}
```

Both sections inherit their text color, background color, and spacing from configuration or can be overridden with CSS.

---

## 6.6 Content Area

The content area (`.ttx-content`) provides flexible space for text, color tags, and components.

Key CSS properties:

```css
.ttx-content {
  padding: var(--ttx-content-padding, 1em);
  line-height: var(--ttx-line-height, 1.2);
  white-space: pre-wrap;
  overflow: hidden;
}
```

* Uses `white-space: pre-wrap` to maintain manual spacing typical of teletext layout.
* Respects color markup like `[red]...[/red]` which translates into spans such as `.ttx-red`.
* Components like `<ttx-block>` and `<ttx-mosaic>` can be freely nested inside without breaking layout flow.

---

## 6.7 Color Classes

The stylesheet defines a range of **semantic color classes** used by color markup and components.
Each follows the naming pattern `.ttx-[color]` and `.ttx-bg-[color]`.

```css
.ttx-red        { color: #ff0000; }
.ttx-yellow     { color: #ffff00; }
.ttx-green      { color: #00ff00; }
.ttx-blue       { color: #0000ff; }
.ttx-magenta    { color: #ff00ff; }
.ttx-cyan       { color: #00ffff; }
.ttx-white      { color: #ffffff; }

.ttx-bg-red     { background-color: #ff0000; }
.ttx-bg-blue    { background-color: #0000ff; }
```

These classes are automatically inserted when parsing text that uses `[color]` or `[bg-color]` tags.

---

## 6.8 Frame and Effects

The outer frame and optional glow or CRT flicker are also controlled through CSS:

```css
.ttx-screen {
  border: var(--ttx-border-width, 4px) solid var(--ttx-border-color, #ccc);
  border-radius: var(--ttx-screen-radius, 0.2em);
  box-shadow: var(--ttx-border-glow, none);
  animation: flicker var(--ttx-flicker-speed, 4s) infinite alternate;
}
```

The **flicker effect** is defined as a simple brightness animation:

```css
@keyframes flicker {
  0%, 100% { filter: brightness(100%); }
  50% { filter: brightness(98%); }
}
```

You can disable this via `enableFlicker: false` or override the animation entirely in your own stylesheet.

---

## 6.9 Customizing Teletext.css

You can safely override any property using CSS variables or direct selectors.
Typical customizations include:

```css
:root {
  --ttx-bg-header: #202060;
  --ttx-bg-footer: #101030;
  --ttx-border-color: #ffaa00;
  --ttx-color-primary: #ff0;
  --ttx-base-font: 1.1em;
}
```

If you need deeper changes (e.g. repositioning header elements or replacing the font), you can extend or override the `.ttx-*` selectors directly in your theme stylesheet.

---

## 6.10 Summary

* `teletext.css` defines layout, font, and retro styling for the interface.
* It relies heavily on CSS variables (`--ttx-*`) that can be changed from `config.js` or via custom CSS.
* The structure includes a wrapper, screen, header, content area, and footer.
* The **European Teletext** font ensures authentic pixel rendering.
* Aspect ratio, scaling, and responsive design maintain a consistent shape across devices.
* Colors, borders, and flicker effects are all adjustable through configuration or CSS overrides.

Together, these elements form the visual backbone of TeletextJS, allowing both nostalgic aesthetics and modern flexibility.

# 7. Dynamic Styling and Scaling

TeletextJS dynamically adjusts its appearance to fit any screen size or aspect ratio, ensuring that the interface remains visually consistent and proportionally accurate — just like a real broadcast teletext display.
All resizing, scaling, and CSS variable updates happen automatically during initialization and whenever the browser window is resized.

---

## 7.1 Automatic Scaling Logic

When TeletextJS initializes, it calculates the **available container width** and determines the proper **screen height** based on the configured `aspectRatio` (for example `4:3` or `16:9`).

Internally, this process happens through the `updateScale()` and `applyDynamicStyle()` functions in `teletext.js`. These functions:

1. Measure the container’s current dimensions.
2. Compute the target height using:

   ```
   height = width / (aspectRatio)
   ```
3. Apply the new size and scaling factor directly to the `.ttx-screen` element using CSS transforms.
4. Update all dependent CSS variables (font size, border radius, padding, etc.) so that text and UI elements maintain their proportions.

As a result, the Teletext screen **always stays centered, readable, and pixel-accurate**, regardless of the user’s display or zoom level.

---

## 7.2 Responsive CSS Variable Updates

TeletextJS uses a live CSS variable system to control its layout and typography.
Whenever the window resizes, these variables are automatically recalculated and re-applied to the document root.

Typical variables updated dynamically include:

| Variable                | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `--ttx-base-font`       | Base font size (scales with container width).   |
| `--ttx-aspect-ratio`    | Numeric ratio that defines height calculation.  |
| `--ttx-content-padding` | Adjusted padding inside the content area.       |
| `--ttx-screen-radius`   | Screen corner rounding (can scale with screen). |
| `--ttx-border-width`    | Border thickness scaling with zoom.             |

These updates are applied through JavaScript rather than static CSS, allowing for instant adaptation when resizing the browser or rotating a mobile device.

---

## 7.3 Aspect Ratio Enforcement

The `aspectRatio` configuration defines the **exact proportional shape** of the teletext display.
The engine enforces this ratio by setting the screen’s height relative to its width using CSS variables:

```css
.ttx-screen {
  aspect-ratio: var(--ttx-aspect-ratio);
  width: 100%;
  height: auto;
}
```

If the user resizes the window, the system automatically recalculates the height and scales down content to prevent distortion or letterboxing.

---

## 7.4 Header, Footer, and Content Synchronization

During each dynamic layout update, TeletextJS ensures that all major sections — **header**, **content**, and **footer** — are recalculated together to preserve a unified composition.

* The **header bar** resizes its text and icon spacing using the same base font variable.
* The **content area** keeps its text line height proportional to the new font size.
* The **footer** remains anchored to the bottom of the `.ttx-screen` element, expanding or shrinking smoothly with the viewport.

This guarantees that page numbers, subpage counters, and navigation hints always stay properly aligned, even when the entire teletext interface is scaled down.

---

## 7.5 Live Re-rendering and Transitions

The update cycle runs automatically whenever:

* The browser window is resized.
* The device orientation changes.
* Configuration values are modified programmatically (e.g., changing `aspectRatio` or `baseFont` via script).

TeletextJS re-applies all style calculations and uses CSS transitions for smooth visual updates where applicable, preventing any flicker or layout jump during resizing.

---

## 7.6 Custom Control Over Scaling

If you wish to manually trigger a resize recalculation (for example, after dynamically changing the container size), you can call:

```js
Teletext.updateScale();
```

This forces the system to re-evaluate the aspect ratio, font scaling, and layout variables immediately.

---

## 7.7 Summary

* TeletextJS continuously monitors screen dimensions and updates style variables in real time.
* The `aspectRatio` setting ensures the teletext screen always retains the correct proportions.
* Font size, padding, borders, and other visual metrics scale automatically to maintain visual balance.
* Header, footer, and content areas stay synchronized under all scaling conditions.
* Developers can call `Teletext.updateScale()` manually to refresh layout calculations.

This dynamic styling system allows TeletextJS to preserve its authentic teletext aesthetic on any screen size — from mobile devices to large widescreen monitors — without manual adjustments.


# 8. Accessibility and Performance

TeletextJS is designed with both **accessibility** and **performance efficiency** in mind.
Although it replicates the look of classic teletext systems, its components follow modern web standards and best practices to ensure usability across devices and screen readers.

---

## 8.1 Accessibility Features

TeletextJS includes support for **ARIA roles** and attributes to make key interface elements identifiable to assistive technologies.

* The main container (`#teletext`) is assigned `role="application"`.
* Each page and subpage is rendered within a `<section>` or `<article>` element that includes `aria-label` attributes for screen readers.
* Navigation buttons include `aria-label` descriptions (e.g. “Next page”, “Previous page”, “Return to main menu”).
* Components such as `<ttx-block>` and `<ttx-blink>` can inherit ARIA roles from configuration or inline attributes.

In addition, **white-space normalization** is automatically applied to content when rendering from markup.
This prevents inconsistent spacing or hidden control characters from being exposed to assistive tools.

---

## 8.2 Reduced Motion and Visual Comfort

The `<ttx-blink>` element uses CSS animations for blinking text, and `<ttx-mosaic>` uses efficient CSS grid rendering.
To minimize visual strain and respect user preferences:

* If the user’s operating system has “reduce motion” enabled (`prefers-reduced-motion: reduce`), all blink animations are automatically disabled.
* The blink component respects the `blink.speed` and `blink.color` configuration, allowing developers to tone down or completely disable flashing content when needed.

This ensures that TeletextJS remains visually accessible and avoids potential discomfort for sensitive users.

---

## 8.3 Mobile Optimization

On mobile devices, the system automatically switches to a simplified layout:

* The teletext display scales to fit narrow viewports while maintaining correct aspect ratio.
* Touch controls replace keyboard navigation when on-screen buttons are enabled.
* A **mobile notice message** (defined in `config.js` as `mobileNotice`) is displayed if interaction capabilities are limited.
* The rendering engine reduces unnecessary layout recalculations on scroll or zoom to maintain performance.

These optimizations ensure a consistent and readable experience even on smaller screens.

---

## 8.4 Performance Considerations

TeletextJS avoids costly reflows and repaints by using **CSS transforms and variables** rather than direct DOM resizing.
Only the minimal number of style recalculations is performed when updating layout or switching pages.

Key optimizations include:

* **GPU-accelerated scaling** via `transform: scale()` rather than resizing fonts or boxes individually.
* **Pre-rendered subpages**, cached in memory for instant transitions.
* **Lightweight component architecture**, where `<ttx-block>`, `<ttx-mosaic>`, and `<ttx-blink>` each manage their own isolated Shadow DOM.
* **Asynchronous configuration loading**, so `config.js` does not block rendering.

---

## 8.5 Summary

* All core components support ARIA roles and assistive labeling.
* Blink and mosaic effects are implemented efficiently in pure CSS.
* Motion and flicker effects automatically respect system accessibility preferences.
* Mobile layout and warnings are optimized for readability and reduced overhead.
* The rendering engine is highly efficient, using hardware acceleration and caching to deliver smooth performance on all platforms.

Together, these features make TeletextJS both visually authentic and technically modern — preserving the nostalgic design while ensuring inclusivity and speed.
