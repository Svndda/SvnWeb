type LevelCompleteModalProps = {
  level: number;
  nextLevel: number;
};

export function LevelCompleteModal({ level, nextLevel }: LevelCompleteModalProps) {
  return (
    <div
      className="level-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="level-modal-title"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="level-modal-card">
        <span className="level-modal-heart" aria-hidden="true">♥</span>
        <span className="level-modal-eyebrow">¡Objetivo alcanzado!</span>
        <h2 id="level-modal-title" className="level-modal-title">
          ¡Nivel {level} superado!
        </h2>
        <p className="level-modal-desc">
          ¡Increíble, mi amor! Preparando el nivel {nextLevel}...
        </p>
        <div className="level-modal-badge">
          <span>Nivel {level}</span>
          <span aria-hidden="true">➔</span>
          <strong>Nivel {nextLevel} ✨</strong>
        </div>
      </div>
    </div>
  );
}
