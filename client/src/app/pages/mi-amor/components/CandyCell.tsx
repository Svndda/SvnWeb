import { memo } from 'react';
import { CANDY_LABELS, SPECIAL_LABELS } from '../constants';
import { colOf, rowOf } from '../game/board';
import type { Candy } from '../types';
import { classNames } from '../utils/classNames';
import { CandyIcon } from './CandyIcon';

type CandyCellProps = {
  candy: Candy;
  index: number;
  selected: boolean;
  clearing: boolean;
  onSelect: (index: number) => void;
};

/**
 * React.memo: tras cada jugada solo se vuelven a dibujar las celdas cuyo dulce,
 * selección o estado de "limpiando" cambió, no las 49.
 */
export const CandyCell = memo(function CandyCell({ candy, index, selected, clearing, onSelect }: CandyCellProps) {
  const special = candy.special;
  const label = `${CANDY_LABELS[candy.kind]}${special ? ` ${SPECIAL_LABELS[special]}` : ''}, fila ${rowOf(index) + 1}, columna ${colOf(index) + 1}`;
  const isAlt = (rowOf(index) + colOf(index)) % 2 === 1;

  return (
    <button
      type="button"
      data-candy-id={candy.id}
      className={classNames(
        'candy-cell',
        isAlt && 'is-alt',
        special && `has-${special}`,
        selected && 'is-selected',
        clearing && 'is-clearing',
      )}
      aria-label={label}
      aria-pressed={selected}
      onClick={() => onSelect(index)}
    >
      <CandyIcon kind={candy.kind} special={special} />
    </button>
  );
});

