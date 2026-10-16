---
name: Tokenkollen
description: The electricity cost of a local AI token, read off the elbolag's meter-reading card.
colors:
  kuvert: "oklch(0.42 0.135 258)"
  kuvert-djup: "oklch(0.34 0.12 260)"
  kuvert-text: "oklch(0.97 0.012 250)"
  kuvert-text-2: "oklch(0.86 0.04 252)"
  kort: "oklch(0.935 0.03 48)"
  kort-falt: "oklch(0.965 0.018 52)"
  ror: "oklch(0.66 0.16 37)"
  ror-text: "oklch(0.49 0.16 33)"
  black: "oklch(0.25 0.055 262)"
  black-2: "oklch(0.42 0.05 262)"
  signal: "oklch(0.5 0.22 305)"
  signal-yta: "oklch(0.5 0.22 305 / 0.14)"
  ramp-1: "oklch(0.88 0.035 252)"
  ramp-2: "oklch(0.8 0.055 254)"
  ramp-3: "oklch(0.71 0.075 256)"
  ramp-4: "oklch(0.61 0.09 258)"
  ramp-5: "oklch(0.51 0.1 260)"
  ramp-6: "oklch(0.41 0.1 261)"
  ramp-7: "oklch(0.31 0.09 262)"
  kuvert-dark: "oklch(0.29 0.105 258)"
  kuvert-djup-dark: "oklch(0.23 0.09 260)"
  kuvert-text-dark: "oklch(0.95 0.015 60)"
  kuvert-text-2-dark: "oklch(0.84 0.04 252)"
  kort-dark: "oklch(0.83 0.04 44)"
  kort-falt-dark: "oklch(0.87 0.03 48)"
  ror-dark: "oklch(0.56 0.16 35)"
  ror-text-dark: "oklch(0.42 0.15 31)"
  black-dark: "oklch(0.22 0.055 262)"
  black-2-dark: "oklch(0.35 0.05 262)"
  signal-dark: "oklch(0.43 0.22 305)"
  signal-yta-dark: "oklch(0.43 0.22 305 / 0.16)"
typography:
  wordmark:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 6vw, 4.1rem)"
    fontWeight: 850
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  reading:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7.4vw, 5.6rem)"
    fontWeight: 760
    lineHeight: 1
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 100"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 2.1vw, 1.7rem)"
    fontWeight: 750
    lineHeight: 1.12
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 750
    lineHeight: 1.12
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 118"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "'tnum' 1"
  figure:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 650
    letterSpacing: "0.02em"
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 105"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    fontVariation: "'wdth' 108"
  stamp:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.86rem"
    fontWeight: 850
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 125"
  mono:
    fontFamily: "ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "0.85rem"
    lineHeight: 1.5
rounded:
  hairline: "1px"
  field: "2px"
  card: "3px"
spacing:
  gutter-sm: "16px"
  gutter-lg: "32px"
  mellan: "clamp(1rem, 2.4vw, 1.75rem)"
  card-pad: "clamp(1.1rem, 2.6vw, 1.9rem)"
  sheet-max: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.black}"
    textColor: "{colors.kort}"
    rounded: "{rounded.field}"
    padding: "0.55rem 1.2rem"
    height: "2.9rem"
  button-primary-disabled:
    backgroundColor: "transparent"
    textColor: "{colors.black-2}"
    rounded: "{rounded.field}"
  input-field:
    backgroundColor: "{colors.kort-falt}"
    textColor: "{colors.black}"
    rounded: "{rounded.field}"
    padding: "0.5rem 0.65rem"
    height: "2.75rem"
  comb-field:
    backgroundColor: "{colors.kort-falt}"
    textColor: "{colors.black}"
    typography: "{typography.figure}"
    rounded: "{rounded.field}"
    padding: "0"
  tick-box:
    backgroundColor: "{colors.kort-falt}"
    textColor: "{colors.black}"
    rounded: "{rounded.field}"
    padding: "0.35rem 0.8rem 0.35rem 0.55rem"
    height: "2.6rem"
  card:
    backgroundColor: "{colors.kort}"
    textColor: "{colors.black}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  stamp:
    backgroundColor: "transparent"
    textColor: "{colors.ror-text}"
    typography: "{typography.stamp}"
    rounded: "{rounded.card}"
    padding: "0.18rem 0.55rem 0.12rem"
  reading-digit:
    backgroundColor: "{colors.kort-falt}"
    textColor: "{colors.black}"
    typography: "{typography.reading}"
    width: "0.86em"
    height: "1.2em"
  cheapest-mark:
    backgroundColor: "{colors.signal-yta}"
    textColor: "{colors.signal}"
    rounded: "{rounded.field}"
    padding: "0 0.2em"
---

# Design System: Tokenkollen

## Overview

**Creative North Star: "The Meter-Reading Card"**

The whole page is the elbolag's avläsningskort, mailed out in its envelope. The ground is a committed utility blue, the envelope. Every working surface is a pale salmon card of form stock with a perforated top edge where the envelope shows through the punched holes. The card is printed in one dropout ink, vermilion: every rule, box, label, form number and list marker. Everything the reader types or the computation writes goes on in deep blue-black ink, in Archivo with tabular figures. The split between printed and written is the whole visual grammar.

Density is that of a utility form: compact labels, boxed fields, ledger rows with hairline vermilion rules, figures that line up. The answer is the one loud element: the reading in giant boxed digits, one figure per printed cell, with a rotated status stamp beside it. States stamp onto the card rather than replacing what came before. A superseded estimate stays visible with a vermilion strike. The world rejects the category default for this kind of tool, the dark dashboard with stat tiles and sliders.

Colour beyond the form is rationed. Price levels snap to a fixed seven-step blue ramp, with no free gradients. One reserved signal violet marks only the cheapest running window and the sentence that names it. Dark mode is the same card with the lamp off: the hues stay put and only the light drops.

**Key Characteristics:**
- Utility-blue envelope ground, salmon card stock, vermilion dropout print, blue-black ink.
- Comb digit fields and boxed reading digits: one figure per printed cell.
- Tick boxes filled with an ink cross, never a checkmark or a toggle.
- A rotated, bordered, uppercase status stamp. No badges or pills.
- A seven-step price ramp and one reserved violet.
- Archivo variable, with its width axis carrying hierarchy. Tabular figures everywhere.

## Colors

A two-ink printed form on blue stock: vermilion prints the form, blue-black fills it in, and two rationed accents (a seven-step blue ramp and one violet) carry data.

### Primary
- **Utility Envelope Blue** (`kuvert`): the page ground behind every card, the header and the footer. It also shows through the perforation holes, which is why the card's top edge is drawn in this colour. Its deeper partner, **Envelope Lining** (`kuvert-djup`), is only the scrollbar track.
- **Envelope Print** (`kuvert-text`, `kuvert-text-2`): wordmark, nav and footer text on the envelope. The secondary tone takes the strapline and footer paragraphs.

### Secondary
- **Form Dropout Vermilion** (`ror`): the printed form itself. Card header and foot rules (2px), field and tick-box borders (1.5px), comb cell dividers, reading-digit cells, ledger and chart rules (mixed down to 40-55%), dashed disclosure rules, link underlines, list markers, the strike on a superseded value, and the "cheaper than cloud" meter bar. It is never used for text that has to be read.
- **Dropout Label Vermilion** (`ror-text`): the readable strength of the same ink, for every printed label, legend, table header, form number, stamp, status line and select chevron. It runs about 5.5:1 on card stock.

### Tertiary
- **Signal Violet** (`signal`, `signal-yta`): only the cheapest running window in the price strip (2px outline over a 14% fill, plus its "billigast" label) and the highlighted phrase in the sentence that names that window.
- **Price Ramp** (`ramp-1` to `ramp-7`): seven blues from pale to near-ink, hue 252-262. Each quarter-hour price bar snaps to one step. `ramp-6` also fills the "dearer than you" meter bar in the cloud ledger.

### Neutral
- **Card Stock** (`kort`): the face of every card, and the text colour of the ink button.
- **Field Ground** (`kort-falt`): a paler stock inside fields, tick boxes, reading cells and code spans, so writing areas read as cut-outs in the card.
- **Blue-Black Ink** (`black`): all written content. Body text, input values, the reading digits, the ink cross, the button fill, the "now" line in the chart and the focus outline.
- **Faded Ink** (`black-2`): notes, placeholders, provider names, axis labels, the struck-through prior value and the disabled button text.

### Named Rules
**The Dropout Ink Rule.** Whatever the form prints is vermilion. Whatever the reader or the calculation writes is blue-black. Labels are never ink and values are never vermilion.

**The One Violet Rule.** Signal violet marks only the cheapest running window and the text that names it. If anything else on the page turns violet, it has stolen the signal.

**The Seven Steps Rule.** A price level is one of seven ramp steps. Charts get no continuous gradients and no in-between tints. Hours that have already passed drop to vermilion at 30%.

**The Lamp-Off Rule.** Dark mode keeps every hue and drops the lightness: the envelope stays blue, the card stays salmon and the print stays vermilion (see the `-dark` tokens). Cards keep `color-scheme: light` because they are still paper.

## Typography

**Display Font:** Archivo, self-hosted variable (weight 100-900, width 62-125%), with system-ui as fallback.
**Body Font:** Archivo, the same family.
**Label/Mono Font:** ui-monospace, Cascadia Mono or Consolas, for pasted terminal output, the BB-code block and inline code.

**Character:** a single grotesque does every job, with weight and width doing the work a second family would. Wide and heavy is the envelope's voice. Normal width is the ink.

### Hierarchy
- **Wordmark** (850, `clamp(2.2rem, 6vw, 4.1rem)`, line-height 1, width 125%, -0.035em): the name on the envelope, used once.
- **Reading** (760, `clamp(3rem, 7.4vw, 5.6rem)`, line-height 1, width 100%): the answer digits, each in its own vermilion cell. The decimal comma sits on a vermilion baseline cell.
- **Headline** (750, `clamp(1.35rem, 2.1vw, 1.7rem)`, line-height 1.12, width 118%, -0.01em, balanced wrapping): the card titles.
- **Title** (750, 1.02rem, width 118%): subheads inside a card.
- **Body** (400, 1rem, line-height 1.55, max 68ch, or 80ch for method lists): running text. Tabular figures are global.
- **Figure** (650, 1.35rem, width 105%, +0.02em; 1.5rem in comb fields): values typed into numeric fields. Measured results use 720 at 1.5rem.
- **Label** (600, 0.78-0.8rem, width 108-112%): field labels, legends, table headers and form numbers, all in Dropout Label Vermilion and in sentence case. Units inside a label drop to 450.
- **Stamp** (850, 0.86rem, width 125%, +0.06em, uppercase): the status stamp only.

### Named Rules
**The Tabular Figures Rule.** Every number is set with `tabular-nums`, chart axes included. Columns of kronor have to line up the way they would on a printed ledger.

**The Uppercase Belongs to the Stamp Rule.** Only the stamp is set in capitals. Labels, form numbers and headings stay in sentence case.

## Layout

The page is an envelope holding a sheet of cards. The header and footer sit on the blue ground. The sheet (`blad`) is a grid, at most 1240px wide, with gutters of 16px that grow to 32px from 700px, and `mellan` (`clamp(1rem, 2.4vw, 1.75rem)`) between cards. Card padding is `clamp(1.1rem, 2.6vw, 1.9rem)`, with 6px extra on top to clear the perforation.

On narrow screens there is a single column with the answer card first: answer, your computer, price strip, measured, contest, method. From 1000px the sheet becomes 12 columns. The input card takes 5 and the answer card 7 in the first row. The price strip spans all 12. Measured and contest split 6 and 6 and stretch to equal height. The method card spans 12, with its numbered steps in two CSS columns and caveats and sources side by side.

Inside a card, a header row (headline left, form number or stamp right, bottom-aligned) sits on a 2px vermilion rule. A foot row sits on the same rule and holds the primary action plus a note. Field pairs use a 2-column grid. Fee trios use 3 columns, which collapse to 1 below 460px. The ledger hides its input column below 560px.

## Elevation & Depth

Depth is physical and has exactly one layer: cards of stock lying on an envelope. Each card casts one soft drop shadow. Nothing on a card is raised above it except the ink button, which lifts 1px on hover and presses 1px on active. Inside a card, depth comes from print instead: rules, boxed cells and the paler field ground.

### Shadow Vocabulary
- **Card on envelope** (`box-shadow: 0 1px 1px oklch(0 0 0 / 0.18), 0 14px 32px -12px oklch(0 0 0 / 0.4)`; dark: `0 1px 1px oklch(0 0 0 / 0.35), 0 14px 32px -12px oklch(0 0 0 / 0.65)`): every card.
- **Ink button** (`box-shadow: 0 1px 0 var(--ror), 0 6px 14px -8px oklch(0 0 0 / 0.35)`; hover `0 2px 0 var(--ror), 0 10px 18px -8px ...`; active `0 0 0 var(--ror)`): the primary action.

### Named Rules
**The One Sheet Rule.** Only cards cast shadows, plus the ink button's small lift. Fields, tick boxes, stamps and table rows are printed flat on the card.

## Shapes

Corners are barely softened, like die-cut stock: 3px on cards and the stamp, 2px on fields, tick boxes, buttons and marks, 1px on meter bars. Nothing is pill-shaped or round, except the perforation holes: a repeating row of 3px half-circles across each card's top edge, 14px apart, in envelope blue. Borders are the main form language: 2px header and foot rules, 1.5px field and box outlines, 2px reading cells that share their dividing walls, 1px dashed rules above disclosures, and hairline ledger rules. The ink cross in a tick box is drawn with two 45-degree gradient strokes, not a glyph.

## Components

### Buttons
Ink stamped onto the card: dense, heavy and slightly wide.
- **Shape:** 2px corners, minimum height 2.9rem, padding 0.55rem 1.2rem.
- **Primary:** Blue-Black Ink fill, Card Stock text, weight 700 at width 110%.
- **Hover / Focus:** lifts 1px over 140ms `cubic-bezier(0.2, 0.8, 0.2, 1)`, and the vermilion under-rule grows to 2px. Presses 1px on active. Focus is a 2.5px ink outline at a 2px offset.
- **Disabled:** goes transparent with a 1.5px inset vermilion outline and Faded Ink text, so it reads as an empty printed box.
- **Text action:** "Visa alla" and similar actions are ink text with a 1.5px vermilion underline that thickens to 2.5px on hover. The same treatment applies to every link.

### Inputs / Fields
- **Style:** Field Ground fill, a 1.5px vermilion border, 2px corners, minimum height 2.75rem and an ink caret. Numeric fields set their value in the Figure style. Selects draw their chevron from two vermilion-label gradient triangles.
- **Comb field:** a numeric field that is exactly N cells wide (4 or 5) at a 1.7ch pitch. Vermilion cell dividers are a repeating gradient and the digits are tracked 0.7ch so each sits in its own cell.
- **Hover:** the border deepens to Dropout Label Vermilion.
- **Read-only:** a transparent ground, so generated output reads as printed onto the card.

### Tick Boxes
- **Style:** a bordered vermilion chip on Field Ground with a 1.05rem printed square on the left, weight 650. A secondary hint (`small`) sits in Faded Ink at 450.
- **State:** checked fills the square with a blue-black ink cross and deepens the chip border. Focus puts the ink outline on the chip. The same box serves radios and checkboxes. The long variant wraps multi-line text, top-aligned.

### Cards / Containers
- **Corner Style:** 3px.
- **Background:** Card Stock, with a perforated top edge.
- **Shadow Strategy:** Card on envelope (see Elevation & Depth).
- **Border:** none around the card. Rules are printed inside it, in the header and the foot.
- **Internal Padding:** `card-pad`.
- **Form number:** the header's right slot carries a small vermilion label ("Blankett TK-1"), or the stamp on the answer card.

### Navigation
The envelope nav is a wrapping row of weight-600 links at 0.95rem in Envelope Print, underlined in vermilion. Disclosures (`details`) open from a vermilion chevron drawn with borders, which rotates from -45 to 45 degrees over 160ms.

### Status Stamp (signature)
Uppercase Stamp type inside a 2.5px currentColor border with 3px corners, rotated -4deg. The colour follows the state: vermilion label ink for an estimate, blue-black for measured, Faded Ink for the reader's own values. On a state change it presses once (scale 1.08 to 1, opacity 0.35 to 1, 260ms `cubic-bezier(0.2, 0.9, 0.25, 1)`). The prior value stays beside it, struck through with a 2px vermilion line.

### Reading Digits (signature)
Each figure of the answer sits in a 0.86em by 1.2em vermilion-ruled cell on Field Ground. Adjacent cells share walls. An empty position shows a vermilion dash at weight 400. On re-render the digits ink-settle: opacity 0.15 to 1 and 1px of vertical travel, over 180ms `cubic-bezier(0.16, 1, 0.3, 1)`, staggered 28ms per digit. The unit "kr" follows at 700, width 112%.

### Cloud Ledger and Meter
A ruled table: vermilion label headers on a 2px rule, then rows on 45%-vermilion hairlines. Model names are 650 with the provider below in Faded Ink. Figure columns are right-aligned at 600. The "Mot din el" meter has a 2px ink zero line at 25%. A ramp-6 bar extends right for cloud models that cost more than the reader's electricity, and a vermilion bar extends left for those that cost less, each with a 0.8rem caption.

### Price Strip
An inline SVG of quarter-hour bars, each filled with one ramp step. Hours already passed are 30% vermilion. Rules are 55% vermilion and the day boundary is a dashed vermilion line. "Now" is a 2px ink line. The cheapest window is outlined in Signal Violet. A table version sits behind a disclosure.

## Do's and Don'ts

### Do:
- **Do** print every label, rule, border and form number in vermilion (`ror-text` for text, `ror` for lines), and write every value in blue-black ink.
- **Do** put numeric entry in comb cells and the headline result in boxed reading digits, one figure per cell.
- **Do** show state with the rotated stamp, and keep the superseded value visible with a vermilion strike.
- **Do** snap any price or level colour to `ramp-1` through `ramp-7`.
- **Do** keep tabular figures on every number, including chart axes.
- **Do** keep the hues fixed in dark mode and lower only the lightness. Cards stay `color-scheme: light`.
- **Do** honour reduced motion: no ink-settle, no stamp press, no chevron turn and no smooth scroll.

### Don't:
- **Don't** use Signal Violet for anything except the cheapest running window and the text that names it.
- **Don't** use continuous gradients or free tints in charts.
- **Don't** replace the stamp with badges, pills or coloured chips, or the ink cross with checkmarks, toggles or sliders.
- **Don't** set labels or headings in uppercase. Capitals belong to the stamp.
- **Don't** round anything past 3px, apart from the perforation holes.
- **Don't** cast shadows from anything printed on a card. Only cards and the ink button have depth.
- **Don't** set readable text in `ror`. At about 2.7:1 on card stock it is a line colour, not a text colour.
