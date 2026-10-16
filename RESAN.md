# Resan - så byggdes Tokenkollen

Dagbok för SweClockers-tävlingen "Gick inte. Nu går det." (inlämning 16 okt - 30 nov 2026).
Allt som gick fel står med. Det är den delen tävlingen vill se, och den som är roligast att läsa.

Verktyg: Claude Code (modell Claude Opus 5.5) i molnet. Ingen lokal modell i bygget.

## Idén

Tävlingen kräver att varje bidrag redovisar tokens i två tal: lokalt och i molnet. Men vad
*kostar* en lokal token egentligen? Ingen tar betalt per token hemma, men elmätaren snurrar.
Ingen sajt räknar ut det med svenska elpriser. Det är luckan Tokenkollen fyller:

- dagens spotpris för ditt elområde (SE1-SE4), kvart för kvart
- din hårdvara: watt och tokens per sekund (förval eller egna mätvärden)
- kronor per miljon tokens lokalt, bredvid vad molntjänsterna tar betalt
- när på dygnet det är billigast att köra ett långt jobb
- klistra in utskriften från `ollama run --verbose` och få tokens och hastighet direkt

## Logg

### 2026-10-16 15:00 - läsa tävlingen

- **Fel 1:** Claude Codes inbyggda webbhämtning fick `403 Forbidden` från sweclockers.com.
  Lösning: hämta sidan med `curl` och en vanlig webbläsar-User-Agent och plocka ut texten själv.
- **Fel 2:** Python-skriptet som skulle skriva ut sidans text kraschade på Windows med
  `UnicodeEncodeError: 'charmap' codec can't encode character '►'`. Tecknet var en liten
  pil (►) i en länk. `PYTHONIOENCODING=utf-8` hjälpte inte, eftersom skriptet kördes med
  `python -I` (isolerat läge ignorerar miljövariabler). Lösning: `sys.stdout.reconfigure(encoding='utf-8')`.
- Tävlingssidans undersidor (Lämna in, exempelbidraget) är en JavaScript-app, så `curl`
  gav bara "Laddar ...". Formatet stod ändå på sidan Utmaningen, så det räckte.

### 2026-10-16 15:10 - idé och priser

- Jag sa "ja kör" och hoppade över frågorna, så idén valdes av AI:n utifrån tävlingens
  regler. Ärligt redovisat: idén är maskinens, valet att köra på den är mitt.
- **Fel 3:** Prisjämförelsesajterna för molnpriser motsade varandra. Samma modell
  (GPT-5.6 Sol) stod som 5 USD per miljon input-tokens på en sajt och 4 USD på en annan.
  Lösning: bara tjänsternas egna prissidor används, och varje pris visas med källa och datum.
- **Fel 4:** openai.com/api/pricing svarade 403. Den gamla dokumentationsadressen skickade
  vidare till developers.openai.com, som gick att läsa.
- Elpriset kommer från elprisetjustnu.se och växelkursen från Frankfurter (ECB). Båda svarar
  med öppen CORS, så sajten kan vara helt statisk utan egen server.

### 2026-10-16 15:25 - design

- Designen styrdes av skillen *impeccable*. Den slumpar fram vilken av sju egna idéer som ska
  byggas, för att AI:n annars alltid landar i samma mörka instrumentpanel. Listan var: EU:s
  energimärke, elräkningen, Text-TV:s elpris, Ferraris-elmätaren, ICA-kvittot, tidningens
  testtabell och elbolagets avläsningskort. Tärningen pekade på nummer sju: avläsningskortet.
  Därför ser sidan ut som en blankett: laxrosa kartong, rutor och etiketter i blindfärg
  (den orangeröda tryckfärgen blanketter har för att skannrar ska ignorera den), siffrorna i bläck.

### 2026-10-16 15:30 - bygget

- **Fel 5:** `node --test test/` på Windows hittade inga testfiler och rapporterade bara
  "test failed". Lösning: peka på filen direkt (`node --test test/calc.test.js`). Alla tio
  tester för uträkningen och inläsningen av Ollama-utskrift gick sedan igenom på första försöket.
- **Fel 6:** första skärmbilden visade att passerade kvartar i elprisgrafen var bleka, precis
  som billiga kvartar. Grafen ljög alltså lite: det såg billigt ut i morse. Passerade kvartar
  får nu en egen, neutral färg.
- **Fel 7:** y-axeln fick steg på 53, 105, 158 öre. Den räknar nu fram jämna steg (50, 100 ...).
- **Fel 8:** 512 tokens gav "Elen för de lokala: 0,00 kr", vilket ser ut som gratis. Visas nu
  som "mindre än 1 öre".
- **Fel 9:** stämpeln sa MÄTT fast bara hastigheten kom från Ollama och effekten fortfarande
  var en gissning. Den säger nu "Mätt hastighet" tills även effekten är ifylld.
- **Fel 10:** på mobil bröts modellnamnen i molntabellen på tre rader, och fälten för watt och
  tokens/s hamnade i olika höjd när den ena etiketten bröts. Input-kolumnen göms nu på smala
  skärmar och fälten linjeras mot underkanten.
- **Fel 11:** designdetektorn hittade en blåtonad skugga på mörk botten (ett känt AI-manér).
  Skuggorna är nu neutralt svarta.
- En upptäckt under testningen: med dagens priser är molnets billigaste modeller (GPT-6 Luna,
  Claude Haiku 5.5, Gemini 2.5 Flash-Lite) bara 2-2,5 gånger dyrare än elen till ett RTX 4090,
  och med 32B-modell eller dyr kvart blir molnet billigare än elen. Det hade jag inte gissat.

### 2026-10-16 15:35 - granskning och publicering

- En fristående granskningsagent (impeccable finish reviewer) fick skärmbilderna och dömde **fix**
  med sju fel: mörkt läge hade blivit den vanliga skiffergrå AI-panelen i stället för kuvert och
  kartong, fälten saknade sifferrutorna som hela idén bygger på, violett (reserverat för
  billigaste fönstret) hade smugit in som fokusfärg, första sifferrutan var öppen på ena sidan,
  grafens etiketter blev 4 px höga på mobil eftersom SVG:n skalades ned, liggaren var tio rader
  lång och animationerna följde inte de värden som stod i designkontraktet. Alla sju rättades,
  och andra granskningen sa **ship**.
- Publicerad på GitHub Pages: https://grimsql.github.io/tokenkollen/

### 2026-10-16 16:00 - fler grafikkort, ärligare tokens

- **Fel 12:** första tokenredovisningen sa 24,4 miljoner. Det var nästan bara cache-läsningar,
  samma samtal som skickas om vid varje steg. Utan dem blir det cirka 0,85 miljoner. Det hade
  varit lätt att skicka in den stora siffran, så nu står hur den räknats.
- Förvalen var sex handskrivna gissningar. Nu räknas de fram för 26 datorer och 8 modellstorlekar
  ur tillverkarnas specifikationer: hastighet = minnesbandbredd × 0,65 ÷ modellens vikter i GB,
  effekt = 70 % av kortets TGP + 100 W för resten av datorn. Kontroll: RTX 4090 med en 8B-modell
  ger 137 tokens/s, och mätningar brukar landa kring 130. MoE-modeller räknas på de aktiva
  vikterna men måste rymmas helt, och storlekar som inte ryms visas streckade.
- Fråga som dök upp: går nätavgiften att hämta live? Nej. Runt 150 nätbolag har egna tariffer
  och det finns inget öppet API, så den är ett ändringsbart standardvärde.

## Tokens

Fylls i löpande. Claude Code visar förbrukningen per session.

| Datum | Var | Tokens | Hur det räknats |
|---|---|---|---|
| 2026-10-16 | molnet | ≈ 0,85 miljoner | summerat ur Claude Codes sessionslogg (`usage` per svar, huvudsession och granskningsagenter): 0,7 M nyinlästa tokens (cache-skrivningar och input) och 0,14 M output. Cache-läsningarna, ungefär 40 M, är inte medräknade: de är samma samtal som skickas om vid varje steg och står för 98 % av råsumman. |
| 2026-10-16 | lokalt | 0 | ingen lokal modell användes |
