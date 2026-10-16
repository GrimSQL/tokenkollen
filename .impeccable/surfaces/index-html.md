---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

## Scope

index.html, the whole one-page tool. Visitor mode: Operate (a calculator people use, then share).

## Audience and job

SweClockers readers with a local LLM running. Job: get one believable number, kr per miljon tokens
on their hardware in their elområde, next to cloud list prices, and paste it into the forum.
Proof is the open arithmetic: every figure shows the inputs it came from. Constraints: no invented
benchmarks; presets are labelled estimates; cloud prices carry source and date.

Decision note: Viktor skipped the questions ("ja kör"), so the assigned direction was built without a
decision round. Grounded list, by resonance: 1 EU-energimärket A-G, 2 elräkningen, 3 SVT Text-TV
elpris, 4 Ferraris-elmätaren, 5 ICA-kvittot, 6 tidningens testtabell, 7 elbolagets avläsningskort.
Challengers: doujin catalog (declined), warm consumer app (declined), ticket wallet (declined),
orienteering map (competitive on audience, loses clarity), lexicon (declined), exposure record (declined).

## Direction contract

THESIS: The page is the elbolag's meter-reading card ("avläsningskort"): you report your machine's
draw and speed in boxed digit fields, and the card answers with the reading that matters, kronor
per miljon tokens. Refuses the category default of a dark dashboard with stat tiles and sliders.

OWN-WORLD: Page ground is a committed utility blue (the envelope); the cards are pale salmon card
stock. All guide rules, box rules and labels print in form dropout vermilion; everything the user
or the computation writes sits in deep blue-black ink in Archivo with tabular figures, one digit
per box in the hero field. Perforation edges between card sections. Status stamps, not badges.
Raise from ticket wallet: states stamp onto the card, nothing disappears: UPPSKATTAT becomes MÄTT
when the user's own Ollama numbers are pasted, and the old value stays visible struck through.
Raise from orienteering map: one reserved colour (signal violet) used only for the cheapest
running window in the price strip and its matching text, nowhere else.
Raise from exposure record: price levels snap to a fixed seven-step ramp; the chart has no free gradients.

STORY: The visitor sees their likely cost instantly from a preset, corrects it with their own
watts and tokens/s (or pastes Ollama output), sees how far below or above each cloud model it
lands, learns when today is cheapest to run, and copies a BB-code line for the forum thread.

FIRST VIEWPORT: Blue ground. Left (5/12): the reading card "Din dator" with elområde tick boxes
SE1-SE4, hardware select, model size, watt and tokens/s boxed fields, price breakdown. Right
(7/12): the answer card, the result set in giant boxed digits "kr per miljon tokens" with the
UPPSKATTAT/MÄTT stamp, and directly under it the first five rows of the cloud ledger with a
ratio column. Primary action "Klistra in från Ollama" sits on the left card's foot. Mobile: the
answer card comes first, the form follows.

FORM: Elbolagets avläsningskort, position 7 of 7 on the grounded list, seed key 3a5915a4.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Signature interaction and motion

Typing into a boxed field re-prints the answer digits with a short ink-settle (opacity and a 1px
vertical offset, staggered per digit, 180ms, ease-out); pasting Ollama output stamps MÄTT with a
single stamp press (scale 1.08 to 1, rotate -4deg). Reduced motion: no movement, instant change.

## Unresolved

Hosting and public URL are Viktor's call.
