import type { SfxName } from './types';
import { hz, playNoise, playTone, type AudioGraph } from './voices';

type Sfx = (graph: AudioGraph, delay: number, level: number) => void;

/** Escala pentatónica mayor: cualquier combinación de notas suena bien junta. */
const PENTATONIC = [72, 74, 76, 79, 81, 84, 86, 88, 91];

function chime(graph: AudioGraph, midi: number, start: number, gain = 0.2, duration = 0.5) {
  playTone(graph, { freq: hz(midi), start, duration, gain });
  playTone(graph, { freq: hz(midi + 12), type: 'triangle', start, duration: duration * 0.6, gain: gain * 0.3 });
}

function matchChime(graph: AudioGraph, level: number, start: number) {
  const base = Math.min(level, PENTATONIC.length - 3);
  for (let step = 0; step < 3; step += 1) chime(graph, PENTATONIC[base + step], start + step * 0.06, 0.18, 0.4);
}

export const SFX: Record<SfxName, Sfx> = {
  click: (g, d) => playTone(g, { freq: 1100, type: 'triangle', start: d, duration: 0.05, gain: 0.12 }),

  select: (g, d) => {
    playTone(g, { freq: 880, type: 'triangle', start: d, duration: 0.1, gain: 0.2 });
    playTone(g, { freq: 1320, start: d + 0.035, duration: 0.12, gain: 0.1 });
  },

  deselect: (g, d) => playTone(g, { freq: 660, to: 500, type: 'triangle', start: d, duration: 0.09, gain: 0.16 }),

  swap: (g, d) => {
    playTone(g, { freq: 380, to: 760, start: d, duration: 0.13, gain: 0.16 });
    playNoise(g, { type: 'bandpass', from: 900, to: 2600, q: 1.2, start: d, duration: 0.12, gain: 0.06 });
  },

  invalid: (g, d) => {
    playTone(g, { freq: 330, to: 196, type: 'triangle', start: d, duration: 0.22, gain: 0.24 });
    playTone(g, { freq: 247, to: 165, start: d + 0.09, duration: 0.24, gain: 0.2 });
  },

  match: (g, d, level) => matchChime(g, level, d),

  cascade: (g, d, level) => {
    const steps = Math.min(level, 6);
    for (let i = 0; i < steps; i += 1) matchChime(g, i, d + i * 0.16);
    if (level >= 3) chime(g, 96, d + steps * 0.16, 0.12, 0.8);
  },

  land: (g, d) => playTone(g, { freq: 140, to: 70, start: d, duration: 0.11, gain: 0.2 }),

  'special-created': (g, d) => {
    [84, 88, 91, 96].forEach((midi, i) => chime(g, midi, d + i * 0.06, 0.15, 0.45));
  },

  striped: (g, d) => {
    playNoise(g, { type: 'bandpass', from: 300, to: 4200, q: 1.5, start: d, duration: 0.35, gain: 0.12 });
    playTone(g, { freq: 400, to: 1800, type: 'sawtooth', start: d, duration: 0.3, gain: 0.07 });
    chime(g, 93, d + 0.28, 0.12, 0.4);
  },

  wrapped: (g, d) => {
    playTone(g, { freq: 190, to: 38, start: d, duration: 0.5, gain: 0.42 });
    playTone(g, { freq: 90, to: 45, type: 'triangle', start: d, duration: 0.4, gain: 0.25 });
    playNoise(g, { type: 'lowpass', from: 1800, to: 120, start: d, duration: 0.4, gain: 0.25 });
  },

  'color-bomb': (g, d) => {
    for (let i = 0; i < 10; i += 1) playTone(g, { freq: hz(72 + i * 2), start: d + i * 0.045, duration: 0.3, gain: 0.11 });
    [84, 88, 91].forEach((midi) => playTone(g, { freq: hz(midi), start: d + 0.5, duration: 0.7, gain: 0.13 }));
  },

  'level-complete': (g, d) => {
    [72, 76, 79].forEach((midi, i) => chime(g, midi, d + i * 0.14, 0.2, 0.55));
    chime(g, 84, d + 0.42, 0.22, 1.1);
    [67, 72, 76].forEach((midi) => playTone(g, { freq: hz(midi), type: 'triangle', start: d + 0.42, duration: 1.2, gain: 0.09 }));
    chime(g, 91, d + 0.75, 0.12, 0.9);
  },

  save: (g, d) => {
    chime(g, 76, d, 0.18, 0.4);
    chime(g, 83, d + 0.1, 0.18, 0.6);
  },

  reset: (g, d) => {
    playTone(g, { freq: 640, to: 220, start: d, duration: 0.26, gain: 0.15 });
    playNoise(g, { type: 'highpass', from: 3000, to: 800, start: d, duration: 0.18, gain: 0.05 });
  },

  yes: (g, d) => {
    [72, 76, 79, 84, 88].forEach((midi, i) => chime(g, midi, d + i * 0.11, 0.17, 1));
    [91, 96].forEach((midi, i) => chime(g, midi, d + 0.7 + i * 0.1, 0.1, 0.9));
  },
};
