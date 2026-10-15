import type { Ref } from 'react';
import type { Board } from '../types';
import { classNames } from '../utils/classNames';
import { CandyCell } from './CandyCell';
import { CandySprites } from './CandySprites';

type CandyBoardProps = {
  board: Board;
  selected: number | null;
  clearing: ReadonlySet<number>;
  isBusy: boolean;
  boardRef: Ref<HTMLDivElement>;
  onSelect: (index: number) => void;
};

export function CandyBoard({ board, selected, clearing, isBusy, boardRef, onSelect }: CandyBoardProps) {
  return (
    <>
      <CandySprites />
      <div
        ref={boardRef}
        className={classNames('candy-board', isBusy && 'is-busy')}
        role="group"
        aria-label="Tablero de dulces"
        aria-busy={isBusy}
      >
        {board.map(
          (candy, index) =>
            candy && (
              <CandyCell
                key={candy.id}
                candy={candy}
                index={index}
                selected={selected === index}
                clearing={clearing.has(index)}
                onSelect={onSelect}
              />
            ),
        )}
      </div>
    </>
  );
}
