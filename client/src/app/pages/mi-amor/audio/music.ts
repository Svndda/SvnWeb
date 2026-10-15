import { hz, playTone, type AudioGraph } from './voices';

export const BAR_SECONDS = 2.4;

/** Cmaj7 → Am7 → Fmaj7 → G: una progresión cálida y romántica. */
const CHORDS: ReadonlyArray<{ root: number; notes: readonly number[] }> = [
  { root: 48, notes: [60, 64, 67, 71] },
  { root: 45, notes: [57, 60, 64, 67] },
  { root: 41, notes: [53, 57, 60, 64] },
  { root: 43, notes: [55, 59, 62, 67] },
];

const ARP_PATTERN = [0, 1, 2, 3, 2, 1, 2, 1];

/**
 * Programa un compás de música. `startAt` es el tiempo absoluto del AudioContext.
 * Los arpegios omiten notas al azar y la melodía "brilla" con notas del acorde,
 * así el loop nunca suena exactamente igual dos veces.
 */
export function scheduleBar(graph: AudioGraph, startAt: number, barIndex: number): void {
  const chord = CHORDS[barIndex % CHORDS.length];
  const offset = Math.max(0, startAt - graph.ctx.currentTime);
  const music = { bus: 'music', echo: true } as const;

  chord.notes.slice(0, 3).forEach((note) => {
    playTone(graph, { freq: hz(note), type: 'triangle', start: offset, duration: BAR_SECONDS + 0.8, attack: 0.9, release: 1.2, gain: 0.05, ...music });
  });

  playTone(graph, { freq: hz(chord.root), start: offset, duration: 1.9, attack: 0.03, gain: 0.13, bus: 'music' });
  playTone(graph, { freq: hz(chord.root + 12), start: offset + 1.2, duration: 1.1, attack: 0.03, gain: 0.06, bus: 'music' });

  ARP_PATTERN.forEach((noteIndex, step) => {
    if (Math.random() < 0.12) return;
    playTone(graph, { freq: hz(chord.notes[noteIndex] + 12), start: offset + step * 0.3, duration: 1, attack: 0.01, gain: 0.09, ...music });
  });

  if (Math.random() < 0.7) {
    const note = chord.notes[Math.floor(Math.random() * chord.notes.length)] + 24;
    const at = [0.6, 0.9, 1.5, 1.8][Math.floor(Math.random() * 4)];
    playTone(graph, { freq: hz(note), type: 'triangle', start: offset + at, duration: 1.5, attack: 0.04, gain: 0.05, ...music });
  }
}
