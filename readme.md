markdown
# Teletext.js User Configuration Guide

This document explains all **user-adjustable settings** in *Teletext.js v1.0*, based on the contents of `config.js`, `teletext.js`, and related CSS files.  
It focuses **only on configurable options** — not on internal implementation details.

---

## Overview

You can configure Teletext.js in two main ways:

1. **Globally** — via `config.js` before `teletext.js` is loaded.
2. **Per instance** — by passing an `options` object to `Teletext.init(pages, options)`.

All parameters are **optional**. Missing values fall back to built-in defaults.

Example:

```js
window.TeletextConfig = {
  baseSize: 18,
  headerBackground: "green",
  border: { color: "#ff0", width: 4 }
};
```

---

## ⚙️ Core Settings

| Option               | Type               | Default | Description                                                                                                                  |
| -------------------- | ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **fetchUrl**         | `string` or `null` | `null`  | Optional remote JSON endpoint for loading Teletext page data. Example: `"/api/pages"` or `"https://example.com/pages.json"`. |
| **defaultPage**      | `number`           | `100`   | Page number loaded when Teletext starts.                                                                                     |
| **enableKeyboard**   | `boolean`          | `true`  | Enables keyboard navigation (numeric keys, arrows, backspace).                                                               |
| **showMobileNotice** | `boolean`          | `true`  | Shows a notice on mobile devices about limited navigation.                                                                   |
| **aspectRatio**      | `number`           | `4/3`   | Aspect ratio (width ÷ height). You can set `18/9`, `21/9`, etc.                                                              |
| **linkUnderline**    | `boolean`          | `false` | Controls whether hyperlinks inside content are underlined.                                                                   |

---

## ✍️ Font & Typography

All text scaling and typographic sizing are defined here.
You can use absolute (`px`) or relative (`em`) values.

| Option               | Type     | Default              | Description                                             |
| -------------------- | -------- | -------------------- | ------------------------------------------------------- |
| **baseSize**     | `number` | `18`                 | Base reference size in pixels. Controls global scaling. |
| **contentFontSize**  | `string` | `"1em"`              | Body text size, relative to base font size.             |
| **headlineSize** | `string` | `"1.9em"`            | Size for `[headline]` tags and `.headline` elements.    |
| **titleSize**    | `string` | `"1.3em"`            | Size for the header bar title.                          |
| **headerFontSizes**  | `object` | `{ h1: "1.9em", … }` | Custom per-heading sizes (`h1`–`h6`).                   |

---

## Frame and Border Configuration

Defines the appearance of the outer frame surrounding the Teletext screen.
Can be customized globally or per instance.

```js
border: {
  enabled: true,
  width: 5,
  color: "#fff",
  style: "solid",
  radius: 5,
  glow: false,
  glowColor: "#888"
}
```

| Property      | Type      | Default   | Description                                                   |
| ------------- | --------- | --------- | ------------------------------------------------------------- |
| **enabled**   | `boolean` | `true`    | Whether the outer frame is visible.                           |
| **width**     | `number`  | `3`       | Border thickness in pixels.                                   |
| **color**     | `string`  | `"#0f0"`  | Border color (CSS color format).                              |
| **style**     | `string`  | `"solid"` | Border style: `"solid"`, `"dashed"`, `"double"`, or `"none"`. |
| **radius**    | `number`  | `0`       | Corner radius in pixels.                                      |
| **glow**      | `boolean` | `false`   | Enables a glowing box-shadow around the border.               |
| **glowColor** | `string`  | `"#888"`  | Color of the glow if enabled.                                 |

---

## Mobile Notice

Displayed only when `showMobileNotice` is `true`.

| Option           | Type     | Default                                                             | Description                            |
| ---------------- | -------- | ------------------------------------------------------------------- | -------------------------------------- |
| **mobileNotice** | `string` | `"This interactive teletext interface works best on a computer..."` | Text shown on smartphones and tablets. |

---

## Header Bar (Top Row)

Controls the header area showing the page number, title, and subpage counter.

| Option                | Type     | Default   | Description                                                                                                                                       |
| --------------------- | -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **headerBackground**  | `string` | `"blue"`  | Background theme. Options: `"blue"`, `"red"`, `"green"`, `"yellow"`, `"transparent"`. You can also use custom CSS classes (e.g. `"ttx-bg-gold"`). |
| **pageNumberSize**    | `string` | `"1.3em"` | Font size of the page number.                                                                                                                     |
| **titleSize**         | `string` | `"1.3em"` | Font size of the page title.                                                                                                                      |
| **subpageNumberSize** | `string` | `"1.3em"` | Font size of the subpage counter.                                                                                                                 |
| **titleAlign**        | `string` | `"left"`  | Horizontal alignment: `"left"`, `"center"`, or `"right"`.                                                                                         |
| **titleMarginLeft**   | `string` | `"1.0em"` | Left margin for the title.                                                                                                                        |
| **titleMarginRight**  | `string` | `"1.0em"` | Right margin for the title.                                                                                                                       |

---

## Footer Bar (Bottom Row)

Controls the footer text and its position.

| Option             | Type      | Default                                                          | Description                                                 |
| ------------------ | --------- | ---------------------------------------------------------------- | ----------------------------------------------------------- |
| **showFooterText** | `boolean` | `true`                                                           | Whether to display the footer hint text.                    |
| **footerText**     | `string`  | `"Use Arrow keys or numbers (100–999). [↑/↓] changes subpages."` | The text displayed in the footer. Plain text only.          |
| **footerPosition** | `string`  | `"below"`                                                        | `"inside"` – inside the Teletext box; `"below"` – below it. |

---

## On-Screen Button Panel

Teletext.js includes an optional button interface for navigation and page input.
You can fully customize its look and position.

```js
buttons: {
  enabled: true,
  showNumeric: true,
  containerId: "teletext-controls",
  position: "custom",
  buttonBg: "#000",
  buttonFg: "#0f0",
  buttonBorder: "3px solid #0f0",
  buttonBorderRadius: "8px",
  buttonHoverBg: "#0f0",
  buttonHoverFg: "#000",
  fontFamily: "'European Teletext', monospace",
  buttonFontSize: "1em",
  buttonPadding: "0.6em 1.2em",
  buttonGap: "1em"
}
```

| Property               | Type      | Default               | Description                                                    |
| ---------------------- | --------- | --------------------- | -------------------------------------------------------------- |
| **enabled**            | `boolean` | `true`                | Whether to show the button panel.                              |
| **showNumeric**        | `boolean` | `true`                | Shows the numeric keypad (0–9).                                |
| **containerId**        | `string`  | `"teletext-controls"` | ID of an existing external container element (optional).       |
| **position**           | `string`  | `"custom"`            | If no container is defined: `"below"`, `"left"`, or `"right"`. |
| **buttonBg**           | `string`  | `"#000"`              | Button background color.                                       |
| **buttonFg**           | `string`  | `"#0f0"`              | Button text color.                                             |
| **buttonBorder**       | `string`  | `"3px solid #0f0"`    | Full CSS border definition.                                    |
| **buttonBorderRadius** | `string`  | `"8px"`               | Border radius.                                                 |
| **buttonHoverBg**      | `string`  | `"#0f0"`              | Hover background color.                                        |
| **buttonHoverFg**      | `string`  | `"#000"`              | Hover text color.                                              |
| **fontFamily**         | `string`  | `"European Teletext"`    | Font used for button labels.                                   |
| **buttonFontSize**     | `string`  | `"1em"`               | Font size for buttons.                                         |
| **buttonPadding**      | `string`  | `"0.6em 1.2em"`       | Internal button padding.                                       |
| **buttonGap**          | `string`  | `"1em"`               | Gap between buttons.                                           |

---

## 🎨 Color System (colors.css)

You can add **custom Teletext colors** in the optional `colors.css` file.
These colors are automatically recognized by Teletext.js — no JavaScript changes needed.

### Syntax

```css
.ttx-gold { color: #ffd700; }
.ttx-bg-lime { background-color: #99ff33; color: #000; }
```

### Usage in Page Content

```text
[gold]Golden Text[/gold]
[bg-lime]Lime Background[/bg-lime]
```

### Rules

* Class names must start with `ttx-`
* For text color: `.ttx-colorName`
* For background color: `.ttx-bg-colorName`
* File must be loaded **before** `teletext.js`

  ```html
  <link rel="stylesheet" href="assets/css/colors.css">
  ```

---

## 🧰 Per-Page Overrides

Each page object in the `pages` dataset can override any of the following on a per-page basis:

| Property                                                    | Description                                    |
| ----------------------------------------------------------- | ---------------------------------------------- |
| **title**                                                   | Page title text.                               |
| **headline**                                                | Headline (supports `[headline]` markup).       |
| **headerBackground**                                        | Header color (e.g. `"red"`, `"ttx-bg-gold"`).  |
| **pageNumberColor**, **titleColor**, **subpageNumberColor** | Per-page header text colors.                   |
| **pageNumberSize**, **titleSize**, **subpageNumberSize**    | Per-page font sizes for header elements.       |
| **titleAlign**, **titleMarginLeft**, **titleMarginRight**   | Per-page title alignment and margins.          |
| **headlineSize**                                        | Override the headline font size for this page. |

Example:

```js
pages = {
  200: {
    title: "Weather",
    headline: "[headline]Today[/headline]",
    headerBackground: "green",
    titleColor: "#fff",
    pageNumberColor: "#ff0",
    subpageNumberColor: "#ff0",
    headlineSize: "2.2em",
  }
};
```

---

## Initialization Example

```html
<div id="teletext"></div>
<script src="config.js"></script>
<script src="teletext.js"></script>
<script>
  const pages = {
    100: { title: "Home", headline: "Welcome", content: "Use [yellow]keys[/yellow] to navigate." },
    200: { title: "Weather", content: ["Page 1 text", "Page 2 text"] }
  };

  Teletext.init(pages, {
    aspectRatio: 18 / 9,
    border: { width: 2, color: "#0f0", glow: true },
    headerBackground: "green",
  });
</script>
```

---

## 🗂️ Summary of Configuration Categories

| Category             | Description                           |
| -------------------- | ------------------------------------- |
| **Core Settings**    | Data source, keyboard, aspect ratio.  |
| **Font System**      | All text and headline sizes.          |
| **Frame / Border**   | Visual frame and glow effects.        |
| **Header Bar**       | Top title row styling.                |
| **Footer Text**      | Bottom info row settings.             |
| **Button Panel**     | On-screen navigation control styling. |
| **Custom Colors**    | User-defined colors in `colors.css`.  |
| **Per-Page Options** | Override visuals on individual pages. |

---

**Author:** Kasperi Koski
**License:** MIT
**Version:** Teletext.js v1.0

```
```
