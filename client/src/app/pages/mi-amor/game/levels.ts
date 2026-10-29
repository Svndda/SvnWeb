const FIRST_LEVEL_TARGET = 1200;
const TARGET_STEP = 400;

/** Meta de puntos del nivel: 1200, 1600, 2000, 2400... */
export function targetForLevel(level: number): number {
    return FIRST_LEVEL_TARGET + (level - 1) * TARGET_STEP;
}

/**
 * Calcula el puntaje sumado para el nivel actual.
 * Si se alcanza o supera la meta, el puntaje se fija en la meta
 * (desechando el sobrante) e indica que el nivel fue completado.
 */
export function addPointsToLevel(
    currentScore: number,
    points: number,
    target: number,
): { score: number; completed: boolean } {
    const nextScore = currentScore + points;
    if (nextScore >= target) {
        return { score: target, completed: true };
    }
    return { score: nextScore, completed: false };
}