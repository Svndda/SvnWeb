import type {Ref} from 'react';
import type {Board} from '../types';
import {classNames} from '../utils/classNames';
import {CandyCell} from './CandyCell';
import {CandySprites} from './CandySprites';

type CandyBoardProps = {
    board: Board;
    selected: number | null;
    clearing: ReadonlySet<number>;
    isBusy: boolean;
    boardRef: Ref<HTMLDivElement>;
    onSelect: (index: number) => void;
};

export function CandyBoard({board, selected, clearing, isBusy, boardRef, onSelect}: CandyBoardProps) {
    return (
        <>
            <CandySprites/>

            {/* ───────── Lógica de Animaciones CSS ───────── */}
            <style>{`
        @keyframes anim-pop-out {
          0% { transform: scale(1); filter: brightness(1); opacity: 1; }
          40% { transform: scale(1.15); filter: brightness(1.3); opacity: 1; }
          100% { transform: scale(0.2); filter: brightness(2); opacity: 0; }
        }
        @keyframes anim-pulse-select {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); filter: brightness(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes anim-striped-h {
          0% { transform: scale(1); }
          50% { transform: scale(1.2) scaleX(2.5); filter: brightness(2); opacity: 1; }
          100% { transform: scaleY(0.1) scaleX(6); opacity: 0; }
        }
        @keyframes anim-striped-v {
          0% { transform: scale(1); }
          50% { transform: scale(1.2) scaleY(2.5); filter: brightness(2); opacity: 1; }
          100% { transform: scaleX(0.1) scaleY(6); opacity: 0; }
        }
        @keyframes anim-wrapped {
          0% { transform: scale(1); }
          20% { transform: scale(1.3); filter: brightness(1.5); }
          40% { transform: scale(0.9); }
          60% { transform: scale(1.6); filter: brightness(2); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes anim-color-bomb {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.4) rotate(180deg); filter: contrast(1.5) brightness(1.5); }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }

        .candy-cell {
          transition: transform 0.2s ease, filter 0.2s ease;
        }
        
        .candy-cell.is-selected .candy-icon-wrap {
          animation: anim-pulse-select 0.8s infinite ease-in-out;
        }
        
        /* Animaciones base de limpieza. Superponemos el Z-Index para que las animaciones grandes no queden detrás. */
        .candy-cell.is-clearing {
          z-index: 10;
          pointer-events: none; 
          animation: anim-pop-out 0.4s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        /* Sobreescritura de animación para especiales */
        .candy-cell.is-clearing.has-striped-h {
          animation: anim-striped-h 0.45s forwards ease-in;
        }
        .candy-cell.is-clearing.has-striped-v {
          animation: anim-striped-v 0.45s forwards ease-in;
        }
        .candy-cell.is-clearing.has-wrapped {
          animation: anim-wrapped 0.65s forwards ease-in-out;
        }
        .candy-cell.is-clearing.has-color-bomb {
          animation: anim-color-bomb 0.6s forwards ease-in;
        }
      `}</style>

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