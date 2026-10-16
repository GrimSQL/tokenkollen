# Utkast till tävlingsbidraget

Till formuläret på https://projekt.sweclockers.com/asus/lamna-in (öppet till 30 november).
Allt här är ett utkast. Skriv om det med egna ord där det inte låter som du.

## Länk

https://grimsql.github.io/tokenkollen/ (källkod och dagbok: https://github.com/GrimSQL/tokenkollen)

## Spår

Verktyget du alltid saknat

## Rubrik

Tokenkollen: vad kostar en lokal AI-token i el?

## Beskrivning

Tävlingen vill att alla redovisar tokens lokalt och i molnet. Molnets tokens har ett pris på
fakturan. De lokala sägs vara gratis, men elmätaren snurrar ju. Så vad kostar en miljon tokens
från mitt eget grafikkort, med svenska elpriser, jämfört med att betala Anthropic, OpenAI eller
Google?

Det fanns ingen sida som räknade på det med elområde, kvartspris och svensk energiskatt, så jag
byggde en med AI. Tokenkollen hämtar dagens spotpris för SE1-SE4 kvart för kvart, tar din
dators effekt och hastighet (eller läser dem ur utskriften från `ollama run --verbose`,
llama.cpp och LM Studio) och ger dig kronor per miljon tokens bredvid tio molnmodeller. Den
visar också när på dygnet det är billigast att köra ett långt jobb, och skriver en färdig rad
med BB-kod till tävlingstråden, så att andra deltagare kan redovisa sina lokala tokens.

Varje siffra visas med uträkningen bakom, så ni kan kontrollera den.

Det som förvånade mig: molnets billigaste modeller är bara två gånger dyrare än elen till ett
RTX 4090, och med en 32B-modell eller en dyr kvällstimme blir molnet billigare än elen hemma.
Lokalt vinner stort mot toppmodellerna, men det är en annan jämförelse, eftersom en 8B-modell
inte gör samma jobb som Claude Opus.

## Vad som gick fel

Hela listan står i RESAN.md. Ett urval:

- AI:ns webbverktyg blockerades av SweClockers (403), så sidan fick hämtas med curl och tolkas för hand.
- Prisjämförelsesajterna för AI-priser motsade varandra, så bara tjänsternas egna prissidor används.
- Elprisgrafen ljög först: passerade kvartar såg ut som billiga kvartar.
- Stämpeln sa MÄTT fast bara hastigheten var mätt och effekten fortfarande gissad.
- 512 tokens gav "0,00 kr", vilket såg ut som gratis.

## Verktyg och hårdvara

- Claude Code med Claude Opus 5.5 (molnet) skrev koden, i samtal med mig.
- Designskillen impeccable för formspråket, Playwright för skärmbilder och tester.
- Elpris: elprisetjustnu.se. Växelkurs: Frankfurter (ECB). Typsnitt: Archivo (SIL OFL).
- Ren HTML, CSS och JavaScript, inget ramverk.

## Tokens

- Lokalt: 0 (ingen lokal modell användes i bygget).
- Molnet: ≈ 0,85 miljoner, summerat ur Claude Codes sessionslogg utan cache-läsningar (cirka 40 M, samma samtal som skickas om vid varje steg).

## Bilder att ladda upp (1-10)

1. Första vyn på desktop: blanketten och avläsningen.
2. Dygnets elpris med billigaste fönstret.
3. Inklistrad Ollama-utskrift och stämpeln som byts till Mätt hastighet.
4. Mobilvyn.
5. Mörkt läge.
6. En skärmdump ur RESAN.md eller samtalet med Claude där något gick fel.
