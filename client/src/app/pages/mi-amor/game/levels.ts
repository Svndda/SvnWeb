const FIRST_LEVEL_TARGET = 1200;
const TARGET_STEP = 400;

/** Meta de puntos del nivel: 1200, 1600, 2000, 2400... */
export function targetForLevel(level: number): number {
    return FIRST_LEVEL_TARGET + (level - 1) * TARGET_STEP;
}

/** Suma puntos y sube de nivel las veces que haga falta (el sobrante pasa al siguiente nivel). */
export function addPoints(
    progress: { level: number; score: number },
    points: number,
): { level: number; score: number } {
    let { level, score } = progress;
    score += points;
    while (score >= targetForLevel(level)) {
        score -= targetForLevel(level);
        level += 1;
    }
    return { level, score };
}