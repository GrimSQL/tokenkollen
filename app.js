import { MOLN, HARDVARA, EL, VALUTA_RESERV, OMRADEN, OMRADE_NAMN, KONTROLLERAT } from './data.js';
import { orePerKwh, kwhPerMiljon, hardvaraPerMiljon, billigasteFonster, lasStatistik, tal } from './calc.js';

const $ = (id) => document.getElementById(id);
const SV = 'sv-SE';
const TZ = 'Europe/Stockholm';
const fmt = (n, d = 0) => Number(n).toLocaleString(SV, { minimumFractionDigits: d, maximumFractionDigits: d });
const krDec = (n) => (n < 10 ? 2 : n < 100 ? 1 : 0);
const fmtKr = (n) => fmt(n, krDec(n));
const tid = (d) => d.toLocaleTimeString(SV, { hour: '2-digit', minute: '2-digit', timeZone: TZ });

const state = {
  omrade: 'SE3',
  hw: 'rtx4090',
  storlek: '8b',
  watt: null,
  tps: null,
  kalla: 'uppskattat', // uppskattat | egna | matt
  kor: 'snitt',
  allt: true,
  paslag: EL.paslag,
  nat: EL.nat,
  skatt: EL.energiskatt,
  egenSpot: null,
  langd: 12,
  hwPris: null,
  hwAr: 4,
  hwTim: 2,
  matt: null,
  tokLokalt: null,
  tokMoln: null,
};

const priser = new Map(); // area -> { kvartar: [{start, slut, ore}], idag: n, fel }
let usdSek = VALUTA_RESERV.usdSek;
let valutaDatum = VALUTA_RESERV.datum;
let valutaReserv = true;
let senasteSvar = '';

// ---------- URL state ----------
function lasHash() {
  const p = new URLSearchParams(location.hash.slice(1));
  if (OMRADEN.includes(p.get('o'))) state.omrade = p.get('o');
  if (HARDVARA.some((h) => h.id === p.get('h'))) state.hw = p.get('h');
  if (['8b', '32b'].includes(p.get('s'))) state.storlek = p.get('s');
  if (['nu', 'snitt', 'billig'].includes(p.get('k'))) state.kor = p.get('k');
  if (p.get('a') === '0') state.allt = false;
  const w = tal(p.get('w') ?? ''), t = tal(p.get('t') ?? '');
  if (w > 0) { state.watt = w; state.kalla = 'egna'; }
  if (t > 0) { state.tps = t; state.kalla = p.get('m') === '1' ? 'matt' : 'egna'; }
}
function skrivHash() {
  const p = new URLSearchParams({ o: state.omrade, h: state.hw, s: state.storlek, k: state.kor });
  if (!state.allt) p.set('a', '0');
  const f = forval();
  if (state.watt != null && state.watt !== f.w) p.set('w', state.watt);
  if (state.tps != null && state.tps !== f.tps) p.set('t', state.tps);
  if (state.kalla === 'matt') p.set('m', '1');
  history.replaceState(null, '', '#' + p.toString());
}

// ---------- Hardware ----------
const hwNu = () => HARDVARA.find((h) => h.id === state.hw);
const forval = () => ({ w: hwNu().w[state.storlek], tps: hwNu().tps[state.storlek] });
const effWatt = () => state.watt ?? forval().w;
const effTps = () => state.tps ?? forval().tps;

// ---------- Electricity prices ----------
function datumIStockholm(forskjut = 0) {
  const d = new Date(Date.now() + forskjut * 864e5);
  return new Intl.DateTimeFormat('sv-SE', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}
async function hamtaDag(omrade, datum) {
  const [y, m, d] = datum.split('-');
  const svar = await fetch(`https://www.elprisetjustnu.se/api/v1/prices/${y}/${m}-${d}_${omrade}.json`);
  if (svar.status === 404) return [];
  if (!svar.ok) throw new Error('HTTP ' + svar.status);
  const rader = await svar.json();
  return rader.map((r) => ({ start: new Date(r.time_start), slut: new Date(r.time_end), ore: r.SEK_per_kWh * 100 }));
}
async function hamtaPriser(omrade) {
  if (priser.has(omrade)) return priser.get(omrade);
  const post = { kvartar: [], idag: 0, laddar: true };
  priser.set(omrade, post);
  try {
    const [idag, imorgon] = await Promise.all([
      hamtaDag(omrade, datumIStockholm(0)),
      hamtaDag(omrade, datumIStockholm(1)).catch(() => []),
    ]);
    if (!idag.length) throw new Error('inga priser för i dag');
    post.kvartar = [...idag, ...imorgon];
    post.idag = idag.length;
  } catch (e) {
    post.fel = e.message;
  }
  post.laddar = false;
  return post;
}
function nuIndex(kvartar) {
  const nu = Date.now();
  return kvartar.findIndex((k) => k.start.getTime() <= nu && nu < k.slut.getTime());
}
async function hamtaValuta() {
  try {
    const svar = await fetch('https://api.frankfurter.dev/v1/latest?from=USD&to=SEK');
    const d = await svar.json();
    if (d?.rates?.SEK > 0) { usdSek = d.rates.SEK; valutaDatum = d.date; valutaReserv = false; }
  } catch { /* the dated fallback rate stays in use and is named under the ledger */ }
}

// The spot price this run is priced at, plus a line saying where it came from.
function spotFor(post) {
  if (state.egenSpot != null) return { ore: state.egenSpot, text: 'ditt eget spotpris' };
  if (!post || post.laddar) return null;
  if (post.fel || !post.kvartar.length) return null;
  const k = post.kvartar;
  const i = nuIndex(k);
  if (state.kor === 'nu' && i >= 0) return { ore: k[i].ore, text: `spotpris ${tid(k[i].start)}-${tid(k[i].slut)}` };
  if (state.kor === 'billig') {
    const f = billigasteFonster(k.map((x) => x.ore), state.langd, Math.max(0, i));
    if (f) return { ore: f.snitt, text: `billigaste ${state.langd / 4} h, ${tid(k[f.start].start)}-${tid(k[f.slut - 1].slut)}`, fonster: f };
  }
  const dag = k.slice(0, post.idag);
  return { ore: dag.reduce((s, x) => s + x.ore, 0) / dag.length, text: 'dygnets snittpris' };
}

// A measured speed with a preset wattage is only half measured; say so.
const stampelText = () => ({ uppskattat: 'Uppskattat', egna: 'Egna värden', matt: (state.watt == null ? 'Mätt hastighet ' : 'Mätt ') + datumIStockholm(0) })[state.kalla];
const kallText = () => ({ uppskattat: 'uppskattat', egna: 'egna värden', matt: state.watt == null ? 'hastighet mätt, effekt uppskattad' : 'mätt' })[state.kalla];

// ---------- Computation ----------
function rakna() {
  const post = priser.get(state.omrade);
  const spot = spotFor(post);
  const w = effWatt(), t = effTps();
  const kwh = kwhPerMiljon(w, t);
  const ore = spot ? orePerKwh({ spot: spot.ore, paslag: state.paslag, nat: state.nat, energiskatt: state.skatt, moms: EL.moms, allt: state.allt }) : null;
  const el = kwh != null && ore != null ? (kwh * ore) / 100 : null;
  const hw = hardvaraPerMiljon({ pris: state.hwPris, ar: state.hwAr, timmarPerDag: state.hwTim, tps: t });
  const totalt = el != null ? el + hw : null;
  let forvalTotal = null;
  const f = forval();
  const fk = kwhPerMiljon(f.w, f.tps);
  if (fk != null && ore != null) forvalTotal = (fk * ore) / 100 + hardvaraPerMiljon({ pris: state.hwPris, ar: state.hwAr, timmarPerDag: state.hwTim, tps: f.tps });
  return { post, spot, w, t, kwh, ore, el, hw, totalt, forvalTotal };
}

// ---------- Rendering ----------
function ritaSiffror(varde) {
  const rutor = $('svar-rutor');
  const text = varde == null ? '-,--' : fmtKr(varde);
  $('svar-text').textContent = varde == null ? 'Ingen uppgift ännu' : `${text} kronor`;
  if (text === senasteSvar) return;
  senasteSvar = text;
  rutor.textContent = '';
  let i = 0;
  for (const tecken of text.replace(/[\s  ]/g, '')) {
    const el = document.createElement('span');
    if (tecken === ',') { el.className = 'komma'; el.textContent = ','; }
    else { el.className = 'ruta ny' + (tecken === '-' ? ' tom' : ''); el.textContent = tecken; el.style.setProperty('--i', i++); }
    rutor.append(el);
  }
}

function ritaSvar(r) {
  ritaSiffror(r.totalt);
  const st = $('stampel');
  const lage = state.kalla;
  const text = stampelText();
  if (st.dataset.lage !== lage || st.textContent !== text) {
    st.dataset.lage = lage;
    st.textContent = text;
    st.classList.remove('prassad');
    void st.offsetWidth;
    st.classList.add('prassad');
  }
  const fv = $('svar-forval');
  if (lage !== 'uppskattat' && r.forvalTotal != null && r.totalt != null && fmtKr(r.forvalTotal) !== fmtKr(r.totalt)) {
    fv.hidden = false;
    fv.innerHTML = `Förvalet sa <s>${fmtKr(r.forvalTotal)} kr</s>`;
  } else fv.hidden = true;

  $('svar-etikett').textContent = r.hw > 0 ? 'El och dator per miljon genererade tokens' : 'Elkostnad per miljon genererade tokens';

  const upp = $('svar-uppdelning');
  if (r.kwh != null && r.ore != null) {
    upp.innerHTML = `<b>${fmt(r.kwh, 2)} kWh</b> à <b>${fmt(r.ore / 100, 2)} kr</b> (${r.spot.text}${state.allt ? ', allt inräknat' : ', bara spotpris med moms'})` +
      (r.hw > 0 ? `, plus <b>${fmtKr(r.hw)} kr</b> för datorn` : '');
  } else upp.textContent = '';

  const status = $('svar-status');
  if (r.kwh == null) status.textContent = hwNu().okand
    ? 'Ingen har publicerat mätvärden för den här datorn än. Fyll i effekt och hastighet.'
    : 'Fyll i effekt och hastighet för att få en avläsning.';
  else if (r.post?.laddar) status.textContent = 'Hämtar dagens elpris ...';
  else if (r.post?.fel && state.egenSpot == null) status.textContent = 'Elpriset gick inte att hämta från elprisetjustnu.se. Skriv in ett eget spotpris under Ändra avgifterna.';
  else status.textContent = '';

  ritaLiggare(r);
}

function ritaLiggare(r) {
  const kropp = $('liggare').tBodies[0];
  kropp.textContent = '';
  const alla = $('liggare').classList.contains('alla');
  for (const m of MOLN) {
    const ut = m.ut * usdSek, inn = m.in * usdSek;
    const tr = document.createElement('tr');
    if (!m.urval && !alla) tr.hidden = true;
    let mot = '<span class="matare-text">-</span>';
    if (r.totalt > 0) {
      const kvot = ut / r.totalt;
      // Log scale from 0.1x to 1000x; the 1x line sits a quarter in.
      const pos = Math.max(-1, Math.min(3, Math.log10(kvot)));
      const bredd = Math.abs(pos) * 25;
      const dyr = kvot >= 1;
      const text = dyr ? `${fmt(kvot, kvot < 10 ? 1 : 0)}× dyrare` : `${fmt(1 / kvot, 1)}× billigare`;
      mot = `<div class="matare" aria-hidden="true"><i class="${dyr ? 'dyrare' : 'billigare'}" style="width:${bredd}%"></i></div><span class="matare-text ${dyr ? '' : 'billigare'}">${text}</span>`;
    }
    tr.innerHTML = `<td><span class="modell">${m.namn}</span><span class="bolag">${m.bolag}</span></td>` +
      `<td class="tal">${fmtKr(ut)} kr</td><td class="tal kol-in">${fmtKr(inn)} kr</td><td class="mot">${mot}</td>`;
    kropp.append(tr);
  }
  $('liggare-not').textContent = `Listpris per miljon tokens, kontrollerat ${KONTROLLERAT}, omräknat med ${fmt(usdSek, 2)} kr per dollar (ECB ${valutaDatum}${valutaReserv ? ', reservkurs' : ''}). "Mot din el" jämför molnets output-pris med din avläsning.`;
}

function ritaGraf(r) {
  const post = r.post;
  const graf = $('graf');
  $('dygn-omrade').textContent = `${state.omrade} ${OMRADE_NAMN[state.omrade]}`;
  const svar = $('dygn-svar');
  if (!post || post.laddar) { graf.innerHTML = '<p class="graf-tom">Hämtar priserna ...</p>'; svar.textContent = ''; return; }
  if (post.fel) { graf.innerHTML = '<p class="graf-tom">Priserna gick inte att hämta just nu. Försök igen om en stund.</p>'; svar.textContent = ''; return; }

  const k = post.kvartar;
  const ore = k.map((x) => x.ore * (1 + EL.moms));
  const i = nuIndex(k);
  const f = billigasteFonster(k.map((x) => x.ore), state.langd, Math.max(0, i));

  // Seven fixed steps between the day's lowest and highest price; no free gradient.
  const min = Math.min(...ore), max = Math.max(...ore);
  const steg = (v) => (max === min ? 4 : 1 + Math.min(6, Math.floor(((v - min) / (max - min)) * 7)));

  // Drawn at the container's real width so labels stay 12px on a phone.
  const W = Math.max(300, Math.round(graf.clientWidth || 960));
  const H = W < 600 ? 220 : 240, vank = 34, topp = 26, botten = 28;
  const etikettSteg = W < 600 ? 6 : 3;
  const bw = (W - vank) / k.length;
  // Round gridline step (10, 20, 25, 50, 100 ...) giving three to five lines.
  const ra = Math.max(10, max) / 5;
  const mag = 10 ** Math.floor(Math.log10(ra));
  const stegLinje = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((m) => m >= ra);
  const linjer = Math.ceil(Math.max(10, max) / stegLinje);
  const tak = linjer * stegLinje;
  const y = (v) => topp + (H - topp - botten) * (1 - Math.max(0, v) / tak);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Spotpris per kvart för ${state.omrade}, ${fmt(min, 0)} till ${fmt(max, 0)} öre per kWh inklusive moms">`;
  for (let g = 0; g <= linjer; g++) {
    const v = stegLinje * g, yy = y(v);
    s += `<line class="linje" x1="${vank}" x2="${W}" y1="${yy}" y2="${yy}"/><text class="axel" x="${vank - 6}" y="${yy + 4}" text-anchor="end">${fmt(v)}</text>`;
  }
  s += `<text class="axel" x="0" y="12">öre/kWh</text>`;
  if (f) {
    const x0 = vank + f.start * bw, x1 = vank + f.slut * bw;
    s += `<rect class="fonster" x="${x0}" y="${topp - 4}" width="${x1 - x0}" height="${H - topp - botten + 4}" rx="2"/>`;
    s += `<text class="fonster-text" x="${(x0 + x1) / 2}" y="${topp - 9}" text-anchor="middle">billigast</text>`;
  }
  k.forEach((q, n) => {
    const x = vank + n * bw, yy = y(ore[n]);
    s += `<rect class="${i >= 0 && n < i ? 'passerat' : 'ramp-' + steg(ore[n])}" x="${x + 0.6}" y="${yy}" width="${Math.max(1, bw - 1.2)}" height="${H - botten - yy}"/>`;
    const tim = q.start.toLocaleTimeString(SV, { hour: '2-digit', timeZone: TZ });
    if (q.start.getMinutes() === 0 && Number(tim) % etikettSteg === 0) {
      s += `<text class="axel" x="${x}" y="${H - 10}">${tim}</text>`;
    }
  });
  if (post.idag < k.length) {
    const xg = vank + post.idag * bw;
    s += `<line class="dagsgrans" x1="${xg}" x2="${xg}" y1="${topp - 6}" y2="${H - botten}"/>`;
    s += `<text class="axel" x="${xg + 4}" y="${topp + 6}">i morgon</text>`;
  }
  if (i >= 0) {
    const xn = vank + (i + 0.5) * bw;
    s += `<line class="nu" x1="${xn}" x2="${xn}" y1="${topp - 2}" y2="${H - botten}"/><text class="nu-text" x="${xn + 5}" y="${H - botten - 6}">nu</text>`;
  }
  graf.innerHTML = s + '</svg>';

  if (f && r.kwh != null) {
    const start = k[f.start].start, slut = k[f.slut - 1].slut;
    const dag = start.toDateString() === new Date().toDateString() ? '' : 'i morgon ';
    const kost = (orePerKwh({ spot: f.snitt, paslag: state.paslag, nat: state.nat, energiskatt: state.skatt, moms: EL.moms, allt: state.allt }) * r.w * (state.langd / 4)) / 1000 / 100;
    const tokens = r.t * state.langd * 900;
    svar.innerHTML = `Billigast att köra ${state.langd / 4} h: <mark>${dag}${tid(start)}-${tid(slut)}</mark>, spotpris ${fmt(f.snitt * 1.25, 0)} öre/kWh med moms. Det blir ungefär ${fmt(tokens / 1e6, 1)} miljoner tokens för ${fmtKr(kost)} kr.`;
  } else if (f) {
    svar.innerHTML = `Billigast att köra ${state.langd / 4} h: <mark>${tid(k[f.start].start)}-${tid(k[f.slut - 1].slut)}</mark>.`;
  } else svar.textContent = 'Inga fler hela fönster kvar i dag. Morgondagens priser kommer vid 13-tiden.';

  const tab = $('pristabell');
  tab.innerHTML = '<thead><tr><th scope="col">Tid</th><th scope="col">Öre/kWh inkl. moms</th></tr></thead><tbody>' +
    k.map((q, n) => `<tr><td>${q.start.toLocaleDateString(SV, { weekday: 'short', timeZone: TZ })} ${tid(q.start)}</td><td>${fmt(ore[n], 1)}</td></tr>`).join('') + '</tbody>';
}

function ritaMetod(r) {
  const ol = $('rakning');
  const rad = (rubrik, formel) => `<li>${rubrik}<span class="formel">${formel}</span></li>`;
  const w = r.w ?? '?', t = r.t ?? '?';
  let h = rad('Energi per miljon tokens: effekt delat med hastighet, omräknat från joule till kWh.',
    `${fmt(w)} W ÷ (${t === '?' ? '?' : fmt(t, t % 1 ? 1 : 0)} tokens/s × 3,6) = <b>${r.kwh != null ? fmt(r.kwh, 2) : '?'} kWh</b>`);
  if (r.spot) {
    const sp = fmt(r.spot.ore, 1);
    h += rad('Elpris per kWh. Spotpriset kommer från elprisetjustnu.se.',
      state.allt
        ? `(${sp} spot + ${fmt(state.paslag, 1)} påslag + ${fmt(state.nat, 1)} nät + ${fmt(state.skatt, 1)} skatt) × 1,25 moms = <b>${fmt(r.ore, 1)} öre</b>`
        : `${sp} spot × 1,25 moms = <b>${fmt(r.ore, 1)} öre</b>`);
  }
  if (r.el != null) h += rad('Elkostnad.', `${fmt(r.kwh, 2)} kWh × ${fmt(r.ore / 100, 3)} kr = <b>${fmtKr(r.el)} kr</b>`);
  if (r.hw > 0) h += rad('Datorn, fördelad på livstidens tokens.',
    `${fmt(state.hwPris)} kr ÷ (${fmt(state.hwAr)} år × 365 × ${fmt(state.hwTim)} h × 3 600 s × ${fmt(r.t, 1)} tokens/s ÷ 1 000 000) = <b>${fmtKr(r.hw)} kr</b>`);
  const opus = MOLN.find((m) => m.id === 'claude-opus-5-5');
  h += rad('Molnet: listpris i dollar gånger växelkursen.', `${opus.namn}: ${fmt(opus.ut, 2)} USD × ${fmt(usdSek, 2)} = <b>${fmtKr(opus.ut * usdSek)} kr</b> per miljon output-tokens`);
  ol.innerHTML = h;
}

function ritaTavling(r) {
  const lok = state.tokLokalt ?? state.matt?.tokens ?? null;
  if (state.tokLokalt == null && state.matt) $('tok-lokalt').placeholder = fmt(state.matt.tokens);
  const moln = state.tokMoln;
  const rader = [];
  rader.push(`[b]Tokenkollen: ${r.totalt != null ? fmtKr(r.totalt) : '?'} kr per miljon tokens lokalt[/b]`);
  rader.push(`${hwNu().namn}, ${r.w != null ? fmt(r.w) : '?'} W, ${r.t != null ? fmt(r.t, r.t % 1 ? 1 : 0) : '?'} tokens/s (${kallText()})`);
  if (r.ore != null) rader.push(`Elområde ${state.omrade}, ${fmt(r.ore / 100, 2)} kr/kWh (${r.spot.text}${state.allt ? ', allt inräknat' : ', bara spotpris'})`);
  const jmf = ['claude-opus-5-5', 'gpt-6-1-sol', 'gemini-3-8-flash'].map((id) => MOLN.find((m) => m.id === id)).map((m) => `${m.namn} ${fmtKr(m.ut * usdSek)} kr`);
  rader.push(`Samma miljon output-tokens i molnet: ${jmf.join(', ')}`);
  if (lok != null || moln != null) {
    let t = `Min tävlingsredovisning: ${lok != null ? fmt(lok) : '0'} tokens lokalt, ${moln != null ? fmt(moln) : '0'} tokens i molnet.`;
    if (lok != null && r.totalt != null) {
      const kr = (lok / 1e6) * r.totalt;
      t += ` Elen för de lokala: ${kr < 0.01 ? 'mindre än 1 öre' : fmtKr(kr) + ' kr'}.`;
    }
    rader.push(t);
  }
  const publik = location.protocol.startsWith('http') && !/^(localhost|127\.)/.test(location.hostname);
  rader.push(publik ? `[url=${location.href}]Räkna själv på Tokenkollen[/url]` : 'Räknat med Tokenkollen');
  $('bbkod').value = rader.join('\n');
}

function ritaKallor() {
  const ul = $('kallor');
  const unika = [...new Map(MOLN.map((m) => [m.kalla, m.bolag])).entries()];
  ul.innerHTML = [
    `<li>Spotpris per kvart: <a href="https://www.elprisetjustnu.se/elpris-api">elprisetjustnu.se</a>, exklusive moms och avgifter.</li>`,
    `<li>Energiskatt 2026, 36,0 öre/kWh exklusive moms: <a href="${EL.energiskattKalla}">Skatteverket</a>.</li>`,
    `<li>Växelkurs: <a href="https://frankfurter.dev">Frankfurter</a>, ECB:s referenskurser.</li>`,
    ...unika.map(([url, bolag]) => `<li>Molnpriser från ${bolag}: <a href="${url}">${new URL(url).host}</a>, kontrollerat ${KONTROLLERAT}.</li>`),
    ...MOLN.filter((m) => m.not).map((m) => `<li>${m.namn}: ${m.not}</li>`),
    `<li>Förvalen för hårdvaran är grova uppskattningar av hela datorns effekt och hastighet för en Q4-kvantiserad modell, inte egna mätningar. Dina egna värden går alltid före.</li>`,
  ].join('');
}

function ritaHardvaraNot() {
  const h = hwNu(), f = forval();
  const not = $('hardvara-not');
  if (h.okand) not.textContent = 'Inga mätvärden publicerade än. Vinner du den, mät och fyll i.';
  else if (h.egen) not.textContent = 'Fyll i dina egna värden.';
  else if (f.w == null) not.textContent = 'Modellen får inte plats i minnet på den här datorn.';
  else not.textContent = `Förval: ${fmt(f.w)} W och ${fmt(f.tps, f.tps % 1 ? 1 : 0)} tokens/s, grovt uppskattat.`;
  $('watt').placeholder = f.w != null ? fmt(f.w) : '';
  $('tps').placeholder = f.tps != null ? fmt(f.tps, f.tps % 1 ? 1 : 0) : '';
}

function rita() {
  const r = rakna();
  ritaSvar(r);
  ritaGraf(r);
  ritaMetod(r);
  ritaTavling(r);
  ritaHardvaraNot();
  const opt = $('kor').querySelector('option[value="billig"]');
  opt.textContent = `under dygnets billigaste ${state.langd / 4} h`;
  skrivHash();
}

// ---------- Inputs ----------
function bygg() {
  const om = $('omraden');
  om.innerHTML = OMRADEN.map((o) => `<label class="kryss"><input type="radio" name="omrade" value="${o}"${o === state.omrade ? ' checked' : ''}><span>${o} <small>${OMRADE_NAMN[o]}</small></span></label>`).join('');
  $('hardvara').innerHTML = HARDVARA.map((h) => `<option value="${h.id}"${h.id === state.hw ? ' selected' : ''}>${h.namn}</option>`).join('');
  document.querySelector(`input[name="storlek"][value="${state.storlek}"]`).checked = true;
  $('kor').value = state.kor;
  $('allt').checked = state.allt;
  $('paslag').value = fmt(state.paslag, 1);
  $('nat').value = fmt(state.nat, 1);
  $('skatt').value = fmt(state.skatt, 1);
  if (state.watt != null) $('watt').value = String(Math.round(state.watt));
  if (state.tps != null) $('tps').value = String(state.tps).replace('.', ',');
  ritaKallor();
}

function koppla() {
  const form = $('dator');
  form.addEventListener('submit', (e) => e.preventDefault());
  form.addEventListener('change', async (e) => {
    const t = e.target;
    if (t.name === 'omrade') { state.omrade = t.value; rita(); await hamtaPriser(state.omrade); }
    if (t.id === 'hardvara') { state.hw = t.value; state.watt = state.tps = null; $('watt').value = $('tps').value = ''; state.kalla = 'uppskattat'; }
    if (t.name === 'storlek') { state.storlek = t.value; if (state.kalla === 'uppskattat') { state.watt = state.tps = null; } }
    if (t.id === 'kor') state.kor = t.value;
    if (t.id === 'allt') state.allt = t.checked;
    rita();
  });
  const siffra = (id, nyckel, efter) => $(id).addEventListener('input', (e) => {
    const v = tal(e.target.value);
    state[nyckel] = e.target.value.trim() === '' || !(v >= 0) ? null : v;
    efter?.();
    rita();
  });
  const egna = () => { state.kalla = state.watt == null && state.tps == null ? 'uppskattat' : 'egna'; };
  siffra('watt', 'watt', egna);
  siffra('tps', 'tps', egna);
  siffra('egen-spot', 'egenSpot');
  siffra('hw-pris', 'hwPris');
  siffra('hw-ar', 'hwAr');
  siffra('hw-tim', 'hwTim');
  for (const [id, nyckel, std] of [['paslag', 'paslag', EL.paslag], ['nat', 'nat', EL.nat], ['skatt', 'skatt', EL.energiskatt]]) {
    $(id).addEventListener('input', (e) => { const v = tal(e.target.value); state[nyckel] = v >= 0 ? v : std; rita(); });
  }
  document.querySelectorAll('input[name="langd"]').forEach((el) => el.addEventListener('change', (e) => { state.langd = Number(e.target.value); rita(); }));

  $('till-matt').addEventListener('click', () => setTimeout(() => $('klistra').focus({ preventScroll: true }), 350));
  $('klistra').addEventListener('input', (e) => {
    const s = lasStatistik(e.target.value);
    state.matt = s;
    const ut = $('matt-resultat');
    if (!e.target.value.trim()) { ut.textContent = ''; $('anvand').disabled = true; rita(); return; }
    if (!s) {
      ut.innerHTML = '<p class="fel">Hittar ingen statistik i texten. Kör med <code>--verbose</code> och ta med raderna som börjar med eval count och eval rate.</p>';
      $('anvand').disabled = true;
      rita();
      return;
    }
    ut.innerHTML = `<dl><div><dt>Genererade tokens</dt><dd>${fmt(s.tokens)}</dd></div><div><dt>Hastighet</dt><dd>${fmt(s.tps, 1)} tokens/s</dd></div>` +
      (s.prompt ? `<div><dt>Prompt-tokens</dt><dd>${fmt(s.prompt)}</dd></div>` : '') +
      `<div><dt>Körningar</dt><dd>${s.korningar.length}</dd></div></dl><p class="falt-not">Läst som ${s.kalla.join(' och ')}.</p>`;
    $('anvand').disabled = false;
    rita();
  });
  $('anvand').addEventListener('click', () => {
    if (!state.matt) return;
    state.tps = Math.round(state.matt.tps * 10) / 10;
    state.kalla = 'matt';
    $('tps').value = fmt(state.tps, 1);
    rita();
    document.querySelector('.kort-svar').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });
  for (const [id, nyckel] of [['tok-lokalt', 'tokLokalt'], ['tok-moln', 'tokMoln']]) {
    $(id).addEventListener('input', (e) => { const v = tal(e.target.value); state[nyckel] = e.target.value.trim() === '' || !(v >= 0) ? null : v; rita(); });
  }
  $('visa-alla').addEventListener('click', (e) => {
    const t = $('liggare');
    t.classList.toggle('alla');
    const oppen = t.classList.contains('alla');
    e.currentTarget.setAttribute('aria-expanded', String(oppen));
    e.currentTarget.textContent = oppen ? 'Visa färre modeller' : `Visa alla ${MOLN.length} modeller`;
    rita();
  });
  let bredd = 0;
  new ResizeObserver(([e]) => {
    const b = Math.round(e.contentRect.width);
    if (Math.abs(b - bredd) > 8) { bredd = b; ritaGraf(rakna()); }
  }).observe($('graf'));
  $('kopiera').addEventListener('click', async () => {
    const st = $('kopiera-status');
    try {
      await navigator.clipboard.writeText($('bbkod').value);
      st.textContent = 'Kopierat. Klistra in i forumtråden.';
    } catch {
      $('bbkod').select();
      st.textContent = 'Kopieringen nekades av webbläsaren. Texten är markerad, tryck Ctrl+C.';
    }
  });
}

async function start() {
  lasHash();
  bygg();
  koppla();
  rita();
  await Promise.all([hamtaPriser(state.omrade), hamtaValuta()]);
  rita();
  // Roll the "now" marker and the current-quarter price forward every minute.
  setInterval(rita, 60_000);
}

start();
