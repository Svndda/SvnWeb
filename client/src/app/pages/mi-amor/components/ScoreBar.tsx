type ScoreBarProps = { score: number; target: number; onReset: () => void };

export function ScoreBar({ score, target, onReset }: ScoreBarProps) {
  const progress = Math.min(100, (score / target) * 100);
  return (
    <>
      <div className="score-row">
        <div>
          <span className="score-label">PUNTOS</span>
          <strong>{score.toLocaleString('es-CR')}</strong>
        </div>
        <div className="target-score">
          <span className="score-label">META</span>
          <strong>
            {target.toLocaleString('es-CR')} <span>♡</span>
          </strong>
        </div>
        <button type="button" className="reset-button" onClick={onReset} title="Empezar de nuevo" aria-label="Empezar de nuevo">
          ↻
        </button>
      </div>
      <div className="progress-track" role="progressbar" aria-label="Progreso hacia la meta" aria-valuemin={0} aria-valuemax={target} aria-valuenow={Math.min(score, target)}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </>
  );
}
