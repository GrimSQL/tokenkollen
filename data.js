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

// Hardware presets. These are ROUGH ESTIMATES of whole-system wall power while generating and
// generation speed for a Q4-quantised model. They exist so the page shows a number before the
// visitor measures anything; the visitor's own figures always win. null = does not fit in memory.
export const HARDVARA = [
  { id: 'rtx3060', namn: 'RTX 3060 12 GB', w: { '8b': 260, '32b': null }, tps: { '8b': 55, '32b': null } },
  { id: 'rtx4070s', namn: 'RTX 4070 Super 12 GB', w: { '8b': 320, '32b': null }, tps: { '8b': 80, '32b': null } },
  { id: 'rtx4090', namn: 'RTX 4090 24 GB', w: { '8b': 500, '32b': 520 }, tps: { '8b': 130, '32b': 38 } },
  { id: 'rtx5090', namn: 'RTX 5090 32 GB', w: { '8b': 650, '32b': 680 }, tps: { '8b': 180, '32b': 60 } },
  { id: 'm4max', namn: 'Mac Studio M4 Max', w: { '8b': 110, '32b': 120 }, tps: { '8b': 85, '32b': 25 } },
  { id: 'cpu', namn: 'Bara processor (16 kärnor, DDR5)', w: { '8b': 200, '32b': 210 }, tps: { '8b': 14, '32b': 3.5 } },
  { id: 'proart', namn: 'ASUS ProArt P16 (tävlingens vinst)', w: { '8b': null, '32b': null }, tps: { '8b': null, '32b': null }, okand: true },
  { id: 'egen', namn: 'Egen dator', w: { '8b': null, '32b': null }, tps: { '8b': null, '32b': null }, egen: true },
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
