import { SIZE } from '../constants';
import type { Board, CandyKind, SpecialCandy } from '../types';
import { colOf, rowOf } from './board';
import { matchedGroups } from './matches';

/** Largo de la línea continua del mismo tipo que pasa por `index` en el eje indicado. */
function runThrough(board: Board, index: number, kind: CandyKind, axis: 'row' | 'col'): number {
  const row = rowOf(index);
  const col = colOf(index);
  const stepRow = axis === 'col' ? 1 : 0;
  const stepCol = axis === 'row' ? 1 : 0;
  let length = 1;
  for (let r = row - stepRow, c = col - stepCol; r >= 0 && c >= 0 && board[r * SIZE + c]?.kind === kind; r -= stepRow, c -= stepCol) {
    length += 1;
  }
  for (let r = row + stepRow, c = col + stepCol; r < SIZE && c < SIZE && board[r * SIZE + c]?.kind === kind; r += stepRow, c += stepCol) {
    length += 1;
  }
  return length;
}

/** Decide qué dulce especial nace de cada grupo combinado y en qué casilla. */
export function specialPlacements(board: Board, matches: Set<number>, preferredIndex: number): Map<number, SpecialCandy> {
  const placements = new Map<number, SpecialCandy>();
  for (const group of matchedGroups(board, matches)) {
    const kind = board[group[0]]?.kind;
    if (!kind) continue;
    let longestHorizontal = 1;
    let longestVertical = 1;
    for (const index of group) {
      longestHorizontal = Math.max(longestHorizontal, runThrough(board, index, kind, 'row'));
      longestVertical = Math.max(longestVertical, runThrough(board, index, kind, 'col'));
    }
    let special: SpecialCandy | null = null;
    if (longestHorizontal >= 3 && longestVertical >= 3) special = 'wrapped';
    else if (group.length >= 5 || longestHorizontal >= 5 || longestVertical >= 5) special = 'color-bomb';
    else if (longestHorizontal >= 4) special = 'striped-h';
    else if (longestVertical >= 4) special = 'striped-v';
    if (!special) continue;
    const usable = group.filter((index) => !board[index]?.special);
    const anchor = usable.includes(preferredIndex) ? preferredIndex : usable[Math.floor(usable.length / 2)];
    if (anchor !== undefined) placements.set(anchor, special);
  }
  return placements;
}

function specialArea(board: Board, index: number, special: SpecialCandy): Set<number> {
  const affected = new Set<number>();
  const row = rowOf(index);
  const col = colOf(index);
  if (special === 'striped-h') {
    for (let x = 0; x < SIZE; x += 1) affected.add(row * SIZE + x);
  } else if (special === 'striped-v') {
    for (let y = 0; y < SIZE; y += 1) affected.add(y * SIZE + col);
  } else if (special === 'wrapped') {
    for (let y = Math.max(0, row - 1); y <= Math.min(SIZE - 1, row + 1); y += 1) {
      for (let x = Math.max(0, col - 1); x <= Math.min(SIZE - 1, col + 1); x += 1) affected.add(y * SIZE + x);
    }
  } else {
    const kind = board[index]?.kind;
    board.forEach((other, otherIndex) => {
      if (other?.kind === kind) affected.add(otherIndex);
    });
  }
  return affected;
}

/** Propaga el efecto de los dulces especiales (en cadena) sobre las casillas combinadas. */
export function expandSpecialMatches(board: Board, matches: Set<number>): Set<number> {
  const expanded = new Set(matches);
  const queue = [...matches].filter((index) => board[index]?.special);
  const triggered = new Set<number>();
  while (queue.length) {
    const index = queue.pop()!;
    if (triggered.has(index)) continue;
    triggered.add(index);
    const special = board[index]?.special;
    if (!special) continue;
    for (const affectedIndex of specialArea(board, index, special)) {
      if (!expanded.has(affectedIndex) && board[affectedIndex]?.special) queue.push(affectedIndex);
      expanded.add(affectedIndex);
    }
  }
  return expanded;
}
