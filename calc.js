// Pure arithmetic and parsing. No DOM here, so it runs under `node --test` as well.

// Total price per kWh in öre, VAT included. spot and fees are öre/kWh excluding VAT.
export function orePerKwh({ spot, paslag, nat, energiskatt, moms, allt }) {
  const exMoms = allt ? spot + paslag + nat + energiskatt : spot;
  return exMoms * (1 + moms);
}

// kWh needed to generate one million tokens at `watt` and `tps` tokens per second.
export function kwhPerMiljon(watt, tps) {
  if (!(watt > 0) || !(tps > 0)) return null;
  return watt / (tps * 3.6);
}

// Hardware cost spread over the tokens the machine produces in its lifetime, kr per million.
export function hardvaraPerMiljon({ pris, ar, timmarPerDag, tps }) {
  if (!(pris > 0) || !(ar > 0) || !(timmarPerDag > 0) || !(tps > 0)) return 0;
  const tokens = ar * 365 * timmarPerDag * 3600 * tps;
  return pris / (tokens / 1e6);
}

export const GB_PER_MILJARD = 0.6; // Q4_K_M weights incl. overhead
export const VERKNINGSGRAD = 0.65; // share of peak memory bandwidth reached while generating
export const KORTETS_ANDEL = 0.7; // a memory-bound card draws about this share of its TGP
export const RESTEN_AV_DATORN = 100; // W for CPU, board, RAM, disks and fans
const RESERV_GB = 1.5; // context cache and runtime

// Estimates generation speed and wall power for a model on a piece of hardware from published
// specs. Generation reads every active weight once per token, so speed is bandwidth-bound.
export function uppskatta(hw, modell) {
  if (!hw || !modell || !(hw.bw > 0)) return { w: null, tps: null, ryms: null, gb: null };
  const gb = modell.total * GB_PER_MILJARD;
  const ryms = gb + RESERV_GB <= hw.gb;
  const tps = (hw.bw * VERKNINGSGRAD) / (modell.aktiva * GB_PER_MILJARD);
  const w = hw.system ? hw.tgp : hw.tgp * KORTETS_ANDEL + RESTEN_AV_DATORN;
  return {
    gb,
    ryms,
    tps: ryms ? Math.round(tps * (tps < 20 ? 10 : 1)) / (tps < 20 ? 10 : 1) : null,
    w: ryms ? Math.round(w / 5) * 5 : null,
  };
}

// Mean price per quarter-hour window of `kvartar` quarters, cheapest first, from index `fran`.
export function billigasteFonster(priser, kvartar, fran = 0) {
  let bast = null;
  for (let i = fran; i + kvartar <= priser.length; i++) {
    let summa = 0;
    for (let j = i; j < i + kvartar; j++) summa += priser[j];
    const snitt = summa / kvartar;
    if (!bast || snitt < bast.snitt) bast = { start: i, slut: i + kvartar, snitt };
  }
  return bast;
}

// Reads generation statistics out of whatever the visitor pastes. Understands
// `ollama run --verbose`, llama.cpp's timing lines and LM Studio's "tok/sec" footer.
// Several runs pasted together are summed; speed is the token-weighted mean.
export function lasStatistik(text) {
  const korningar = [];
  const rader = String(text).split(/\r?\n/);

  // Ollama: "eval count:  512 token(s)" followed by "eval rate:  45.31 tokens/s".
  let ollama = null;
  for (const rad of rader) {
    const antal = rad.match(/^\s*eval count:\s*([\d.,]+)/i);
    const takt = rad.match(/^\s*eval rate:\s*([\d.,]+)\s*tokens?\/s/i);
    const prompt = rad.match(/^\s*prompt eval count:\s*([\d.,]+)/i);
    if (prompt) (ollama ??= {}).prompt = tal(prompt[1]);
    if (antal) (ollama ??= {}).tokens = tal(antal[1]);
    if (takt) {
      (ollama ??= {}).tps = tal(takt[1]);
      if (ollama.tokens) korningar.push({ kalla: 'Ollama', ...ollama });
      ollama = null;
    }
  }

  // llama.cpp: "eval time =  1234.56 ms /   128 runs   (  9.64 ms per token,   103.72 tokens per second)"
  for (const rad of rader) {
    if (/prompt eval time/i.test(rad)) continue;
    const m = rad.match(/eval time\s*=\s*[\d.]+\s*ms\s*\/\s*(\d+)\s*(?:runs|tokens).*?([\d.]+)\s*tokens per second/i);
    if (m) korningar.push({ kalla: 'llama.cpp', tokens: tal(m[1]), tps: tal(m[2]) });
  }

  // LM Studio: "45.12 tok/sec • 512 tokens • 0.21s to first token"
  for (const rad of rader) {
    const m = rad.match(/([\d.,]+)\s*tok\/sec\D+?([\d\s.,]+)\s*tokens/i);
    if (m) korningar.push({ kalla: 'LM Studio', tokens: tal(m[2]), tps: tal(m[1]) });
  }

  const giltiga = korningar.filter((k) => k.tokens > 0 && k.tps > 0);
  if (!giltiga.length) return null;
  const tokens = giltiga.reduce((s, k) => s + k.tokens, 0);
  const sekunder = giltiga.reduce((s, k) => s + k.tokens / k.tps, 0);
  const prompt = giltiga.reduce((s, k) => s + (k.prompt || 0), 0);
  return { korningar: giltiga, tokens, prompt, tps: tokens / sekunder, kalla: [...new Set(giltiga.map((k) => k.kalla))] };
}

// Accepts "45.3", "45,3" and "1 024" (Swedish thousands space).
export function tal(s) {
  if (typeof s === 'number') return s;
  const ren = String(s).replace(/[\s  ]/g, '').replace(',', '.');
  const n = parseFloat(ren);
  return Number.isFinite(n) ? n : NaN;
}
