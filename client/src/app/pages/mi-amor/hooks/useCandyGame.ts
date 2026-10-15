import { useCallback, useEffect, useRef, useState } from 'react';
import { playSound } from '../audio/soundEngine';
import type { SfxName } from '../audio/types';
import { areAdjacent, createBoard, swapCandies } from '../game/board';
import { findMatches } from '../game/matches';
import { settleBoard, type SettleResult } from '../game/settle';
import type { Board, SpecialCandy } from '../types';
import { useBoardAnimation } from './useBoardAnimation';
import { useStableCallback } from './useStableCallback';
import {CLEAR_DELAY_MS, POINTS_PER_CANDY} from '../constants';
import { addPoints, targetForLevel } from '../game/levels';

const EMPTY_SET: ReadonlySet<number> = new Set();
const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

const ACTIVATION_SOUND: Record<SpecialCandy, SfxName> = {
  'striped-h': 'striped',
  'striped-v': 'striped',
  wrapped: 'wrapped',
  'color-bomb': 'color-bomb',
};

function playResultSounds(result: SettleResult) {
  if (result.cascades > 1) playSound('cascade', { level: result.cascades });
  else playSound('match');
  new Set(result.activated.map((special) => ACTIVATION_SOUND[special])).forEach((name) => playSound(name));
  if (result.created.length) playSound('special-created', { delay: 0.18 });
}

export function useCandyGame() {
  const [board, setBoard] = useState<Board>(createBoard);
  const [selected, setSelected] = useState<number | null>(null);
  const [clearing, setClearing] = useState<ReadonlySet<number>>(EMPTY_SET);
  const [isBusy, setIsBusy] = useState(false);
  const [progress, setProgress] = useState({ level: 1, score: 0 });
  const [moves, setMoves] = useState(0);

  const boardRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const aliveRef = useRef(true);
  const epochRef = useRef(0);
  const animateBoard = useBoardAnimation(boardRef, setBoard);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  const { level, score } = progress;
  const target = targetForLevel(level);

  useEffect(() => {
    if (level > 1) playSound('level-complete', { delay: 0.15 });
  }, [level]);

  async function attemptSwap(from: number, to: number) {
    const original = board;
    const swapped = swapCandies(board, from, to);
    const epoch = epochRef.current;
    const isStale = () => !aliveRef.current || epoch !== epochRef.current;

    busyRef.current = true;
    setIsBusy(true);
    setSelected(null);
    playSound('swap');
    try {
      await animateBoard(swapped);
      if (isStale()) return;
      if (!findMatches(swapped).size) {
        playSound('invalid');
        await animateBoard(original);
        return;
      }

      const result = settleBoard(swapped, to);
      playResultSounds(result);
      setClearing(new Set([...result.firstWave].filter((index) => !result.placements.has(index))));
      await wait(CLEAR_DELAY_MS);
      if (isStale()) return;
      setClearing(EMPTY_SET);
      await animateBoard(result.board);
      if (isStale()) return;
      playSound('land');
      setProgress((current) => addPoints(current, result.cleared * POINTS_PER_CANDY));
      setMoves((current) => current + 1);
    } finally {
      if (epoch === epochRef.current) {
        busyRef.current = false;
        if (aliveRef.current) setIsBusy(false);
      }
    }
  }

  const selectCandy = useStableCallback((index: number) => {
    if (busyRef.current) return;
    if (selected === null) {
      setSelected(index);
      playSound('select');
    } else if (selected === index) {
      setSelected(null);
      playSound('deselect');
    } else if (!areAdjacent(selected, index)) {
      setSelected(index);
      playSound('select');
    } else {
      void attemptSwap(selected, index);
    }
  });

  const reset = useCallback(() => {
    epochRef.current += 1;
    busyRef.current = false;
    setIsBusy(false);
    setBoard(createBoard());
    setProgress({ level: 1, score: 0 });
    setMoves(0);
    setSelected(null);
    setClearing(EMPTY_SET);
  }, []);

  return { board, selected, clearing, isBusy, score, level, target, moves, boardRef, selectCandy, reset };
}

export type CandyGame = ReturnType<typeof useCandyGame>;
