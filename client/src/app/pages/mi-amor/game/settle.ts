import { SIZE } from '../constants';
import type { Board, Candy, SpecialCandy } from '../types';
import { createCandy } from './board';
import { findMatches } from './matches';
import { expandSpecialMatches, specialPlacements } from './specials';

const MAX_CASCADES = 20;

export type SettleResult = {
  board: Board;
  cleared: number;
  /** Casillas eliminadas en la primera ola (para la animación de salida). */
  firstWave: Set<number>;
  placements: Map<number, SpecialCandy>;
  /** Cantidad de olas encadenadas (1 = sin cascada). */
  cascades: number;
  /** Tipos de dulces especiales que explotaron durante la jugada. */
  activated: SpecialCandy[];
  /** Tipos de dulces especiales que nacieron durante la jugada. */
  created: SpecialCandy[];
};

function dropColumns(board: Board): void {
  for (let col = 0; col < SIZE; col += 1) {
    const survivors: Candy[] = [];
    for (let row = SIZE - 1; row >= 0; row -= 1) {
      const candy = board[row * SIZE + col];
      if (candy) survivors.push(candy);
    }
    for (let row = SIZE - 1; row >= 0; row -= 1) {
      board[row * SIZE + col] = survivors[SIZE - 1 - row] ?? createCandy();
    }
  }
}

/** Resuelve todas las combinaciones y cascadas hasta dejar el tablero estable. */
export function settleBoard(input: Board, preferredIndex: number): SettleResult {
  const board = [...input];
  const activated = new Set<SpecialCandy>();
  const created = new Set<SpecialCandy>();
  let cleared = 0;
  let cascades = 0;
  let firstWave = new Set<number>();
  let firstPlacements = new Map<number, SpecialCandy>();
  let matches = findMatches(board);

  while (matches.size && cascades < MAX_CASCADES) {
    const placements = specialPlacements(board, matches, preferredIndex);
    const wave = expandSpecialMatches(board, matches);
    if (cascades === 0) {
      firstWave = new Set(wave);
      firstPlacements = placements;
    }
    cleared += wave.size - placements.size;

    for (const index of wave) {
      const special = board[index]?.special;
      if (special) activated.add(special);
    }
    for (const [index, special] of placements) {
      const candy = board[index];
      if (candy) board[index] = { ...candy, special };
      created.add(special);
    }
    for (const index of wave) if (!placements.has(index)) board[index] = null;

    dropColumns(board);
    matches = findMatches(board);
    cascades += 1;
  }

  return {
    board,
    cleared,
    firstWave,
    placements: firstPlacements,
    cascades,
    activated: [...activated],
    created: [...created],
  };
}
