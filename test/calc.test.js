import { test } from 'node:test';
import assert from 'node:assert/strict';
import { orePerKwh, kwhPerMiljon, hardvaraPerMiljon, billigasteFonster, lasStatistik, tal } from '../calc.js';

test('price per kWh adds fees before VAT', () => {
  const p = orePerKwh({ spot: 50, paslag: 5, nat: 25, energiskatt: 36, moms: 0.25, allt: true });
  assert.equal(p, 145);
  assert.equal(orePerKwh({ spot: 50, paslag: 5, nat: 25, energiskatt: 36, moms: 0.25, allt: false }), 62.5);
});

test('360 W at 100 tokens/s is exactly 1 kWh per million tokens', () => {
  assert.equal(kwhPerMiljon(360, 100), 1);
  assert.equal(kwhPerMiljon(0, 100), null);
  assert.equal(kwhPerMiljon(300, null), null);
});

test('hardware cost spreads over lifetime tokens', () => {
  // 10 000 kr, 1 year, 1 h/day, 100 tok/s -> 131.4 M tokens -> 76.1 kr per million
  const k = hardvaraPerMiljon({ pris: 10000, ar: 1, timmarPerDag: 1, tps: 100 });
  assert.ok(Math.abs(k - 10000 / 131.4) < 1e-9);
  assert.equal(hardvaraPerMiljon({ pris: 0, ar: 1, timmarPerDag: 1, tps: 100 }), 0);
});

test('cheapest window finds the lowest mean run', () => {
  const p = [5, 5, 1, 2, 9, 0, 0, 9];
  assert.deepEqual(billigasteFonster(p, 2), { start: 5, slut: 7, snitt: 0 });
  assert.equal(billigasteFonster(p, 2, 6).start, 6);
  assert.equal(billigasteFonster(p, 20), null);
});

test('parses ollama --verbose output', () => {
  const ut = `total duration:       12.5s
load duration:        20ms
prompt eval count:    26 token(s)
prompt eval duration: 120ms
prompt eval rate:     216.67 tokens/s
eval count:           512 token(s)
eval duration:        11.3s
eval rate:            45.31 tokens/s`;
  const s = lasStatistik(ut);
  assert.equal(s.tokens, 512);
  assert.equal(s.prompt, 26);
  assert.ok(Math.abs(s.tps - 45.31) < 1e-9);
  assert.deepEqual(s.kalla, ['Ollama']);
});

test('sums several pasted runs with token-weighted speed', () => {
  const ut = 'eval count: 100 token(s)\neval rate: 50 tokens/s\n\neval count: 300 token(s)\neval rate: 100 tokens/s';
  const s = lasStatistik(ut);
  assert.equal(s.tokens, 400);
  assert.equal(s.tps, 400 / (2 + 3));
});

test('parses llama.cpp timings and ignores the prompt line', () => {
  const ut = `llama_print_timings: prompt eval time =   210.33 ms /    26 tokens (    8.09 ms per token,   123.61 tokens per second)
llama_print_timings:        eval time =  2468.52 ms /   256 runs   (    9.64 ms per token,   103.70 tokens per second)`;
  const s = lasStatistik(ut);
  assert.equal(s.tokens, 256);
  assert.ok(Math.abs(s.tps - 103.7) < 1e-9);
});

test('parses LM Studio footer', () => {
  const s = lasStatistik('42.17 tok/sec • 1 024 tokens • 0.31s to first token');
  assert.equal(s.tokens, 1024);
  assert.equal(s.tps, 42.17);
});

test('returns null for text without statistics', () => {
  assert.equal(lasStatistik('hej hej'), null);
});

test('reads Swedish and English decimals', () => {
  assert.equal(tal('45,3'), 45.3);
  assert.equal(tal('1 024'), 1024);
  assert.ok(Number.isNaN(tal('abc')));
});
