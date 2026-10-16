# Product

<!-- impeccable:product-schema 1 -->

> Viktor hoppade över intervjun ("ja kör"). Allt nedan som inte står i tävlingsvillkoren är
> härlett från uppdraget och märkt *(antagande)*.

## Platform

web

## Stack

delegated: statisk HTML/CSS/JS utan byggsteg. Skäl: sajten ska kunna läggas var som helst
(Cloudflare Pages, en mapp på en server, GitHub Pages) och källkoden ska vara läsbar för
forumet, som får granska hur den räknar. Inga ramverk att uppdatera.

## Users

SweClockers-läsare: datorintresserade svenskar som kör eller funderar på att köra språkmodeller
lokalt (Ollama, LM Studio, llama.cpp) på eget grafikkort eller en Mac. De sitter vid sin dator,
ofta med en lokal modell igång i ett annat fönster. *(antagande)* Sekundärt: deltagare i
tävlingen som måste redovisa tokens lokalt och i molnet.

Jobb: få ett ärligt svar på "vad kostar det mig att köra det här hemma, jämfört med att betala
per token i molnet?" med sin egen hårdvara och sitt eget elområde.

## Product Purpose

Räknar ut elkostnaden per miljon tokens för lokal AI med dagens spotpris för SE1-SE4, och ställer
den bredvid molntjänsternas listpriser. Visar när på dygnet det är billigast att köra ett långt
jobb. Tar emot utskriften från `ollama run --verbose` och läser ut tokens och hastighet.

Lyckat = en läsare får en siffra hen tror på inom en minut, och delar den i forumet.

## Positioning

Ingen annan räknar med svenska elpriser kvart för kvart och svensk elskatt, och ingen visar
räknestegen öppet så att en kräsen läsare kan kontrollera dem.

## Operating Context

- Elpris: elprisetjustnu.se (spotpris per kvart, öre exkl. moms och avgifter).
- Växelkurs: Frankfurter (ECB-kurser).
- Molnpriser: tjänsternas egna prissidor, kontrollerade 2026-10-16, med källa och datum synligt.
- Tävlingen "Gick inte. Nu går det." på SweClockers, inlämning 16 okt - 30 nov 2026, communityn röstar.

## Capabilities and Constraints

- Allt räknas i webbläsaren; inga användardata lämnar sidan.
- Hårdvaruförvalen (watt, tokens/s) är uppskattningar och måste märkas så; användarens egna
  mätvärden går alltid före. *(antagande om exakta värden)*
- Molnpriser ändras; de visas med datum och länk. De går inte att skriva över på sidan än (öppet beslut).
- Fast elpris (nätavgift, energiskatt, moms) varierar per nätbolag; standardvärden ska gå att ändra.

## Evidence on Hand

Inga användare, inga citat, inga benchmarks av egen mätning ännu. Inga påhittade testresultat
eller omdömen får visas.

## Product Principles

1. Visa räknestegen. Varje siffra går att följa tillbaka till sina ingångsvärden.
2. Dina mätvärden slår våra gissningar.
3. Svenska förhållanden först: elområde, öre, kronor, svensk elskatt.
4. Källa och datum på allt som kommer utifrån.

## Accessibility & Inclusion

WCAG 2.2 AA som mål *(antagande)*. Grafen ska ha en textuell motsvarighet.
