import { useCallback } from 'react';
import { flushSync } from 'react-dom';
import { SIZE } from '../constants';
import type { Board } from '../types';
import { prefersReducedMotion } from '../utils/time';

type ElementRef = { readonly current: HTMLElement | null };

const SWAP_EASING = 'cubic-bezier(.3,.7,.3,1)';
const FALL_EASING = 'cubic-bezier(.3,1.25,.55,1)';

function measureCandies(container: HTMLElement | null): Map<number, DOMRect> {
  const rects = new Map<number, DOMRect>();
  container?.querySelectorAll<HTMLElement>('[data-candy-id]').forEach((element) => {
    rects.set(Number(element.dataset.candyId), element.getBoundingClientRect());
  });
  return rects;
}

/**
 * Técnica FLIP: mide posiciones, aplica el nuevo tablero y anima cada dulce
 * desde donde estaba hasta donde quedó. Los dulces nuevos caen desde arriba.
 * `flushSync` evita que el navegador pinte un frame en la posición final antes
 * de que empiece la animación (el parpadeo que había con requestAnimationFrame).
 */
export function useBoardAnimation(boardRef: ElementRef, setBoard: (board: Board) => void) {
  return useCallback(
    async (nextBoard: Board): Promise<void> => {
      const container = boardRef.current;
      const before = measureCandies(container);
      flushSync(() => setBoard(nextBoard));
      if (!container || prefersReducedMotion()) return;

      const boardRect = container.getBoundingClientRect();
      const animations: Animation[] = [];
      container.querySelectorAll<HTMLElement>('[data-candy-id]').forEach((element) => {
        const from = before.get(Number(element.dataset.candyId));
        const to = element.getBoundingClientRect();

        if (!from) {
          const row = Math.min(SIZE - 1, Math.max(0, Math.floor(((to.top - boardRect.top + to.height / 2) / boardRect.height) * SIZE)));
          animations.push(
            element.animate(
              [
                { transform: `translateY(${-(row + 1) * to.height * 1.1}px) scale(.82)`, opacity: 0 },
                { transform: 'translateY(0) scale(1)', opacity: 1 },
              ],
              { duration: 180 + (row + 1) * 45, easing: FALL_EASING },
            ),
          );
          return;
        }

        const dx = from.left - to.left;
        const dy = from.top - to.top;
        if (!dx && !dy) return;
        const cells = Math.max(Math.abs(dx), Math.abs(dy)) / to.height;
        const isFall = dy < 0 && cells > 1.2;
        animations.push(
          element.animate(
            [{ transform: `translate(${dx}px, ${dy}px) scale(.94)` }, { transform: 'translate(0, 0) scale(1)' }],
            { duration: isFall ? 160 + cells * 55 : 190, easing: isFall ? FALL_EASING : SWAP_EASING },
          ),
        );
      });
      await Promise.all(animations.map((animation) => animation.finished.catch(() => undefined)));
    },
    [boardRef, setBoard],
  );
}
