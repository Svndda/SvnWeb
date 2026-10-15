import { SIZE } from '../constants';
import type { Board } from '../types';

export function findMatches(board: Board): Set<number> {
  const matches = new Set<number>();
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      const index = row * SIZE + col;
      const kind = board[index]?.kind;
      if (!kind) continue;
      if (col < SIZE - 2 && kind === board[index + 1]?.kind && kind === board[index + 2]?.kind) {
        let end = col + 2;
        while (end + 1 < SIZE && board[row * SIZE + end + 1]?.kind === kind) end += 1;
        for (let x = col; x <= end; x += 1) matches.add(row * SIZE + x);
      }
      if (row < SIZE - 2 && kind === board[index + SIZE]?.kind && kind === board[index + 2 * SIZE]?.kind) {
        let end = row + 2;
        while (end + 1 < SIZE && board[(end + 1) * SIZE + col]?.kind === kind) end += 1;
        for (let y = row; y <= end; y += 1) matches.add(y * SIZE + col);
      }
    }
  }
  return matches;
}

/** Agrupa las casillas combinadas que están conectadas entre sí y son del mismo tipo. */
export function matchedGroups(board: Board, matches: Set<number>): number[][] {
  const remaining = new Set(matches);
  const groups: number[][] = [];
  while (remaining.size) {
    const start = remaining.values().next().value as number;
    remaining.delete(start);
    const group = [start];
    for (let cursor = 0; cursor < group.length; cursor += 1) {
      const index = group[cursor];
      const neighbors = [
        index - SIZE,
        index + SIZE,
        ...(index % SIZE ? [index - 1] : []),
        ...(index % SIZE < SIZE - 1 ? [index + 1] : []),
      ];
      for (const neighbor of neighbors) {
        if (remaining.has(neighbor) && board[neighbor]?.kind === board[index]?.kind) {
          remaining.delete(neighbor);
          group.push(neighbor);
        }
      }
    }
    groups.push(group);
  }
  return groups;
}
