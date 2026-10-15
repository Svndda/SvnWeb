import { CANDIES, SIZE } from '../constants';
import type { Board, Candy, CandyKind } from '../types';

let nextCandyId = 0;

export const rowOf = (index: number) => Math.floor(index / SIZE);
export const colOf = (index: number) => index % SIZE;

function randomKind(): CandyKind {
  return CANDIES[Math.floor(Math.random() * CANDIES.length)];
}

export function createCandy(kind: CandyKind = randomKind()): Candy {
  nextCandyId += 1;
  return { id: nextCandyId, kind };
}

/** Crea un tablero inicial sin combinaciones ya formadas. */
export function createBoard(): Board {
  const board: Board = [];
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      const index = row * SIZE + col;
      const choices = CANDIES.filter(
        (kind) =>
          !(
            (col >= 2 && board[index - 1]?.kind === kind && board[index - 2]?.kind === kind) ||
            (row >= 2 && board[index - SIZE]?.kind === kind && board[index - 2 * SIZE]?.kind === kind)
          ),
      );
      board.push(createCandy(choices[Math.floor(Math.random() * choices.length)]));
    }
  }
  return board;
}

export function areAdjacent(a: number, b: number): boolean {
  return Math.abs(rowOf(a) - rowOf(b)) + Math.abs(colOf(a) - colOf(b)) === 1;
}

export function swapCandies(board: Board, a: number, b: number): Board {
  const next = [...board];
  [next[a], next[b]] = [next[b], next[a]];
  return next;
}
