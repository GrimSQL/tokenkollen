// Fixed input data for Tokenkollen. Everything here is either sourced (with a date) or an
// explicitly labelled estimate. Change a value here and the page follows.

export const KONTROLLERAT = '2026-10-16';

// Cloud list prices, USD per million tokens, standard tier, short context.
export const MOLN = [
  { id: 'gpt-6-astra', namn: 'GPT-6 Astra', bolag: 'OpenAI', in: 10.0, ut: 50.0, kalla: 'https://developers.openai.com/api/docs/pricing' },
  { id: 'claude-fable-5-1', namn: 'Claude Fable 5.1', bolag: 'Anthropic', in: 10.0, ut: 50.0, kalla: 'https://platform.claude.com/docs/en/about-claude/pricing' },
  { id: 'claude-opus-5-5', urval: true, namn: 'Claude Opus 5.5', bolag: 'Anthropic', in: 4.0, ut: 20.0, kalla: 'https://platform.claude.com/docs/en/about-claude/pricing' },
  { id: 'gemini-3-1-pro', urval: true, namn: 'Gemini 3.1 Pro', bolag: 'Google', in: 2.0, ut: 12.0, kalla: 'https://ai.google.dev/gemini-api/docs/pricing' },
  { id: 'gpt-6-1-sol', urval: true, namn: 'GPT-6.1 Sol', bolag: 'OpenAI', in: 2.0, ut: 10.0, kalla: 'https://developers.openai.com/api/docs/pricing' },
  { id: 'claude-sonnet-5-5', namn: 'Claude Sonnet 5.5', bolag: 'Anthropic', in: 2.0, ut: 10.0, kalla: 'https://platform.claude.com/docs/en/about-claude/pricing' },
  { id: 'gemini-3-8-flash', urval: true, namn: 'Gemini 3.8 Flash', bolag: 'Google', in: 0.75, ut: 3.75, kalla: 'https://ai.google.dev/gemini-api/docs/pricing', not: 'Introduktionspris till 31 december 2026, sedan 1,50/7,50 USD.' },
  { id: 'gpt-6-luna', urval: true, namn: 'GPT-6 Luna', bolag: 'OpenAI', in: 0.10, ut: 0.50, kalla: 'https://developers.openai.com/api/docs/pricing' },
  { id: 'claude-haiku-5-5', namn: 'Claude Haiku 5.5', bolag: 'Anthropic', in: 0.10, ut: 0.50, kalla: 'https://platform.claude.com/docs/en/about-claude/pricing', not: 'Gäller prompter upp till 100 000 tokens.' },
  { id: 'gemini-2-5-flash-lite', namn: 'Gemini 2.5 Flash-Lite', bolag: 'Google', in: 0.10, ut: 0.40, kalla: 'https://ai.google.dev/gemini-api/docs/pricing' },
];

// Hardware. The presets are not measurements: speed and power are ESTIMATED from the card's
// published specs by `uppskatta()` in calc.js (generation is memory-bound, so tokens/s follows
// memory bandwidth). gb = memory the model can use, bw = memory bandwidth GB/s,
// tgp = the card's rated board power W. `system: true` means tgp is the whole computer's draw
// (Apple silicon, APUs, a CPU-only PC), so no rest-of-system is added.
export const HARDVARA = [
  { grupp: 'Nvidia RTX 50', id: 'rtx5090', namn: 'RTX 5090 32 GB', gb: 32, bw: 1792, tgp: 575 },
  { grupp: 'Nvidia RTX 50', id: 'rtx5080', namn: 'RTX 5080 16 GB', gb: 16, bw: 960, tgp: 360 },
  { grupp: 'Nvidia RTX 50', id: 'rtx5070ti', namn: 'RTX 5070 Ti 16 GB', gb: 16, bw: 896, tgp: 300 },
  { grupp: 'Nvidia RTX 50', id: 'rtx5070', namn: 'RTX 5070 12 GB', gb: 12, bw: 672, tgp: 250 },
  { grupp: 'Nvidia RTX 50', id: 'rtx5060ti', namn: 'RTX 5060 Ti 16 GB', gb: 16, bw: 448, tgp: 180 },
  { grupp: 'Nvidia RTX 40', id: 'rtx4090', namn: 'RTX 4090 24 GB', gb: 24, bw: 1008, tgp: 450 },
  { grupp: 'Nvidia RTX 40', id: 'rtx4080s', namn: 'RTX 4080 Super 16 GB', gb: 16, bw: 736, tgp: 320 },
  { grupp: 'Nvidia RTX 40', id: 'rtx4070tis', namn: 'RTX 4070 Ti Super 16 GB', gb: 16, bw: 672, tgp: 285 },
  { grupp: 'Nvidia RTX 40', id: 'rtx4070s', namn: 'RTX 4070 Super 12 GB', gb: 12, bw: 504, tgp: 220 },
  { grupp: 'Nvidia RTX 40', id: 'rtx4070', namn: 'RTX 4070 12 GB', gb: 12, bw: 504, tgp: 200 },
  { grupp: 'Nvidia RTX 40', id: 'rtx4060ti16', namn: 'RTX 4060 Ti 16 GB', gb: 16, bw: 288, tgp: 165 },
  { grupp: 'Nvidia RTX 40', id: 'rtx4060', namn: 'RTX 4060 8 GB', gb: 8, bw: 272, tgp: 115 },
  { grupp: 'Nvidia RTX 30', id: 'rtx3090', namn: 'RTX 3090 24 GB', gb: 24, bw: 936, tgp: 350 },
  { grupp: 'Nvidia RTX 30', id: 'rtx3080', namn: 'RTX 3080 10 GB', gb: 10, bw: 760, tgp: 320 },
  { grupp: 'Nvidia RTX 30', id: 'rtx3070', namn: 'RTX 3070 8 GB', gb: 8, bw: 448, tgp: 220 },
  { grupp: 'Nvidia RTX 30', id: 'rtx3060', namn: 'RTX 3060 12 GB', gb: 12, bw: 360, tgp: 170 },
  { grupp: 'AMD Radeon', id: 'rx9070xt', namn: 'RX 9070 XT 16 GB', gb: 16, bw: 640, tgp: 304 },
  { grupp: 'AMD Radeon', id: 'rx7900xtx', namn: 'RX 7900 XTX 24 GB', gb: 24, bw: 960, tgp: 355 },
  { grupp: 'AMD Radeon', id: 'rx7800xt', namn: 'RX 7800 XT 16 GB', gb: 16, bw: 624, tgp: 263 },
  { grupp: 'AMD Radeon', id: 'rx7600', namn: 'RX 7600 8 GB', gb: 8, bw: 288, tgp: 165 },
  { grupp: 'Intel Arc', id: 'arcb580', namn: 'Arc B580 12 GB', gb: 12, bw: 456, tgp: 190 },
  { grupp: 'Delat minne', id: 'm3ultra', namn: 'Mac Studio M3 Ultra 512 GB', gb: 384, bw: 819, tgp: 220, system: true },
  { grupp: 'Delat minne', id: 'm4max', namn: 'Mac Studio M4 Max 128 GB', gb: 96, bw: 546, tgp: 130, system: true },
  { grupp: 'Delat minne', id: 'm4pro', namn: 'Mac mini M4 Pro 64 GB', gb: 48, bw: 273, tgp: 65, system: true },
  { grupp: 'Delat minne', id: 'ai395', namn: 'Ryzen AI Max+ 395 128 GB', gb: 96, bw: 256, tgp: 140, system: true },
  { grupp: 'Delat minne', id: 'cpu', namn: 'Bara processor, DDR5 64 GB', gb: 56, bw: 80, tgp: 150, system: true, cpu: true },
  { grupp: 'Övrigt', id: 'proart', namn: 'ASUS ProArt P16 (tävlingens vinst)', okand: true },
  { grupp: 'Övrigt', id: 'egen', namn: 'Egen dator', egen: true },
];

// Model sizes, Q4-quantised (about 0.6 GB per billion parameters). For a mixture-of-experts model
// every weight must fit in memory, but only the active experts are read per token.
export const MODELLER = [
  { id: '3b', namn: '3B', total: 3, aktiva: 3 },
  { id: '8b', namn: '7-8B', total: 8, aktiva: 8 },
  { id: '14b', namn: '12-14B', total: 14, aktiva: 14 },
  { id: '24b', namn: '24-27B', total: 27, aktiva: 27 },
  { id: '32b', namn: '30-32B', total: 32, aktiva: 32 },
  { id: '70b', namn: '70B', total: 70, aktiva: 70 },
  { id: 'moe30', namn: '30B MoE', not: '3B aktiva', total: 30, aktiva: 3 },
  { id: 'moe120', namn: '120B MoE', not: '5B aktiva', total: 117, aktiva: 5.1 },
];

// Swedish electricity defaults, öre per kWh excluding VAT, except where stated.
export const EL = {
  energiskatt: 36.0, // Skatteverket, 2026
  energiskattKalla: 'https://www.skatteverket.se/foretag/skatterochavdrag/punktskatter/energiskatter/skattpael',
  nat: 25.0, // typical variable grid fee; differs per nätbolag, so it is an editable default
  paslag: 5.0, // typical elhandel markup; editable default
  moms: 0.25,
};

export const VALUTA_RESERV = { usdSek: 9.9719, datum: '2026-10-15' };

export const OMRADEN = ['SE1', 'SE2', 'SE3', 'SE4'];
export const OMRADE_NAMN = { SE1: 'Luleå', SE2: 'Sundsvall', SE3: 'Stockholm', SE4: 'Malmö' };
