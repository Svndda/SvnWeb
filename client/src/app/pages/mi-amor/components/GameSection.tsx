import { useSound } from '../audio/useSound';
import type { CandyGame } from '../hooks/useCandyGame';
import { CandyBoard } from './CandyBoard';
import { DatePill } from './DatePill';
import { LevelCompleteModal } from './LevelCompleteModal';
import { ScoreBar } from './ScoreBar';
import { SpecialGuide } from './SpecialGuide';
import { WaitingCard } from './WaitingCard';

type GameSectionProps = { game: CandyGame; date: Date };

export function GameSection({ game, date }: GameSectionProps) {
  const { play } = useSound();
  const { board, selected, clearing, isBusy, score, level, target, moves, boardRef, selectCandy, reset, levelCompleted } = game;

  const levelComplete = level > 1;

  const handleReset = () => {
    play('reset');
    reset();
  };

  return (
    <section className="game-section">
      {levelCompleted !== null && <LevelCompleteModal level={levelCompleted} nextLevel={levelCompleted + 1} />}
      <div className="game-heading">
        <span className="eyebrow">NIVEL {level} · HECHO CON AMOR</span>

        <h1>
          Un juego para <em>Mi amor</em>
        </h1>
        <p>Combina 3 o más dulces iguales. No hay límite de movimientos: juega a tu ritmo.</p>
      </div>
      <DatePill date={date} withIcon />
      <div className="game-card">
        <ScoreBar score={score} target={target} onReset={handleReset} />
        <CandyBoard board={board} selected={selected} clearing={clearing} isBusy={isBusy} boardRef={boardRef} onSelect={selectCandy} />
        <SpecialGuide />
        <div className="game-footer">
          <span>
            Movimientos <strong>{moves}</strong>
          </span>
          <span>Un match de 3 suma puntos ✨</span>
        </div>
      </div>
      {levelComplete ? (
        <WaitingCard date={date} />
      ) : (
        <p className="encouragement">
          Cada combinación nos acerca a una noche especial <span>♡</span>
        </p>
      )}
    </section>
  );
}
