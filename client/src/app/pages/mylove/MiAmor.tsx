// import { useEffect, useMemo, useState } from 'react';
// import '../../../styles/MiAmor.css';
//
// const SIZE = 7;
// const TARGET = 1200;
// const CANDIES = ['berry', 'cherry', 'grape', 'orange', 'lemon', 'blueberry'] as const;
// const STORAGE_KEY = 'mi-amor-date';
// type CandyKind = (typeof CANDIES)[number];
// type SpecialCandy = 'striped-h' | 'striped-v' | 'wrapped' | 'color-bomb';
// type Candy = { id: number; kind: CandyKind; special?: SpecialCandy };
// type Board = (Candy | null)[];
// let nextCandyId = 0;
//
// function createCandy(kind: CandyKind = CANDIES[Math.floor(Math.random() * CANDIES.length)]): Candy {
//   nextCandyId += 1;
//   return { id: nextCandyId, kind };
// }
//
// function createBoard(): Board {
//   const board: Board = [];
//   for (let row = 0; row < SIZE; row += 1) {
//     for (let col = 0; col < SIZE; col += 1) {
//       const choices = CANDIES.filter((kind) =>
//         !((col >= 2 && board[row * SIZE + col - 1]?.kind === kind && board[row * SIZE + col - 2]?.kind === kind)
//           || (row >= 2 && board[(row - 1) * SIZE + col]?.kind === kind && board[(row - 2) * SIZE + col]?.kind === kind)),
//       );
//       board.push(createCandy(choices[Math.floor(Math.random() * choices.length)]));
//     }
//   }
//   return board;
// }
//
// function findMatches(board: Board): Set<number> {
//   const matches = new Set<number>();
//   for (let row = 0; row < SIZE; row += 1) {
//     for (let col = 0; col < SIZE; col += 1) {
//       const index = row * SIZE + col;
//       const candy = board[index]?.kind;
//       if (candy && col < SIZE - 2 && candy === board[index + 1]?.kind && candy === board[index + 2]?.kind) {
//         let end = col + 2;
//         while (end + 1 < SIZE && board[row * SIZE + end + 1]?.kind === candy) end += 1;
//         for (let x = col; x <= end; x += 1) matches.add(row * SIZE + x);
//       }
//       if (candy && row < SIZE - 2 && candy === board[index + SIZE]?.kind && candy === board[index + 2 * SIZE]?.kind) {
//         let end = row + 2;
//         while (end + 1 < SIZE && board[(end + 1) * SIZE + col]?.kind === candy) end += 1;
//         for (let y = row; y <= end; y += 1) matches.add(y * SIZE + col);
//       }
//     }
//   }
//   return matches;
// }
//
// function matchedGroups(board: Board, matches: Set<number>): number[][] {
//   const remaining = new Set(matches);
//   const groups: number[][] = [];
//   while (remaining.size) {
//     const start = remaining.values().next().value as number;
//     remaining.delete(start);
//     const group = [start];
//     for (let cursor = 0; cursor < group.length; cursor += 1) {
//       const index = group[cursor];
//       const neighbors = [index - SIZE, index + SIZE, ...(index % SIZE ? [index - 1] : []), ...(index % SIZE < SIZE - 1 ? [index + 1] : [])];
//       for (const neighbor of neighbors) {
//         if (remaining.has(neighbor) && board[neighbor]?.kind === board[index]?.kind) {
//           remaining.delete(neighbor);
//           group.push(neighbor);
//         }
//       }
//     }
//     groups.push(group);
//   }
//   return groups;
// }
//
// function specialPlacements(board: Board, matches: Set<number>, preferredIndex: number): Map<number, SpecialCandy> {
//   const placements = new Map<number, SpecialCandy>();
//   for (const group of matchedGroups(board, matches)) {
//     const kind = board[group[0]]?.kind;
//     if (!kind) continue;
//     let longestHorizontal = 1;
//     let longestVertical = 1;
//     for (const index of group) {
//       let horizontal = 1;
//       for (let col = index % SIZE - 1; col >= 0 && board[Math.floor(index / SIZE) * SIZE + col]?.kind === kind; col -= 1) horizontal += 1;
//       for (let col = index % SIZE + 1; col < SIZE && board[Math.floor(index / SIZE) * SIZE + col]?.kind === kind; col += 1) horizontal += 1;
//       let vertical = 1;
//       for (let row = Math.floor(index / SIZE) - 1; row >= 0 && board[row * SIZE + index % SIZE]?.kind === kind; row -= 1) vertical += 1;
//       for (let row = Math.floor(index / SIZE) + 1; row < SIZE && board[row * SIZE + index % SIZE]?.kind === kind; row += 1) vertical += 1;
//       longestHorizontal = Math.max(longestHorizontal, horizontal);
//       longestVertical = Math.max(longestVertical, vertical);
//     }
//     let special: SpecialCandy | null = null;
//     if (longestHorizontal >= 3 && longestVertical >= 3) special = 'wrapped';
//     else if (group.length >= 5 || longestHorizontal >= 5 || longestVertical >= 5) special = 'color-bomb';
//     else if (longestHorizontal >= 4) special = 'striped-h';
//     else if (longestVertical >= 4) special = 'striped-v';
//     if (!special) continue;
//     const usable = group.filter((index) => !board[index]?.special);
//     const anchor = usable.includes(preferredIndex) ? preferredIndex : usable[Math.floor(usable.length / 2)];
//     if (anchor !== undefined) placements.set(anchor, special);
//   }
//   return placements;
// }
//
// function expandSpecialMatches(board: Board, matches: Set<number>): Set<number> {
//   const expanded = new Set(matches);
//   const queue = [...matches].filter((index) => board[index]?.special);
//   const triggered = new Set<number>();
//   while (queue.length) {
//     const index = queue.pop()!;
//     if (triggered.has(index)) continue;
//     triggered.add(index);
//     const candy = board[index];
//     if (!candy?.special) continue;
//     const affected = new Set<number>();
//     if (candy.special === 'striped-h') {
//       const row = Math.floor(index / SIZE);
//       for (let col = 0; col < SIZE; col += 1) affected.add(row * SIZE + col);
//     } else if (candy.special === 'striped-v') {
//       const col = index % SIZE;
//       for (let row = 0; row < SIZE; row += 1) affected.add(row * SIZE + col);
//     } else if (candy.special === 'wrapped') {
//       const row = Math.floor(index / SIZE);
//       const col = index % SIZE;
//       for (let y = Math.max(0, row - 1); y <= Math.min(SIZE - 1, row + 1); y += 1) {
//         for (let x = Math.max(0, col - 1); x <= Math.min(SIZE - 1, col + 1); x += 1) affected.add(y * SIZE + x);
//       }
//     } else {
//       board.forEach((other, otherIndex) => { if (other?.kind === candy.kind) affected.add(otherIndex); });
//     }
//     for (const affectedIndex of affected) {
//       if (!expanded.has(affectedIndex) && board[affectedIndex]?.special) queue.push(affectedIndex);
//       expanded.add(affectedIndex);
//     }
//   }
//   return expanded;
// }
//
// function settleBoard(input: Board, preferredIndex: number): { board: Board; cleared: number; firstWave: Set<number>; placements: Map<number, SpecialCandy> } {
//   let board = [...input];
//   let cleared = 0;
//   let matches = findMatches(board);
//   let cascades = 0;
//   let firstWave = new Set<number>();
//   let firstPlacements = new Map<number, SpecialCandy>();
//   while (matches.size && cascades < 20) {
//     const placements = specialPlacements(board, matches, preferredIndex);
//     const wave = expandSpecialMatches(board, matches);
//     if (cascades === 0) {
//       firstWave = new Set(wave);
//       firstPlacements = placements;
//     }
//     cleared += wave.size - placements.size;
//     for (const [index, special] of placements) {
//       const candy = board[index];
//       if (candy) board[index] = { ...candy, special };
//     }
//     for (const index of wave) if (!placements.has(index)) board[index] = null;
//     for (let col = 0; col < SIZE; col += 1) {
//       const survivors: Candy[] = [];
//       for (let row = SIZE - 1; row >= 0; row -= 1) {
//         const candy = board[row * SIZE + col];
//         if (candy) survivors.push(candy);
//       }
//       for (let row = SIZE - 1; row >= 0; row -= 1) {
//         board[row * SIZE + col] = survivors[SIZE - 1 - row] ?? createCandy();
//       }
//     }
//     matches = findMatches(board);
//     cascades += 1;
//   }
//   return { board, cleared, firstWave, placements: firstPlacements };
// }
//
// function formatRemaining(ms: number): string {
//   const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
//   const days = Math.floor(totalSeconds / 86400);
//   const hours = Math.floor((totalSeconds % 86400) / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;
//   return `${days}d ${hours}h ${minutes}m ${seconds}s`;
// }
//
// function CandyIcon({ kind, special }: { kind: CandyKind; special?: SpecialCandy }) {
//   return (
//     <span className={`candy-icon-wrap${special ? ` is-special is-${special}` : ''}`}>
//     <svg className={`candy-art candy-art-${kind}`} viewBox="0 0 64 64" aria-hidden="true">
//       {kind === 'berry' && <><path className="candy-leaf" d="M32 17c-5-9-13-7-13-7 2 7 7 10 13 10-1-8 7-12 14-10-1 7-6 11-14 10"/><path className="candy-body" d="M32 57C25 48 12 38 14 27c1-8 8-12 15-9l3 3 3-3c8-4 16 1 16 10 0 11-12 21-19 29Z"/><path className="candy-seeds" d="m24 27 1 2m13-3-1 2m-9 7 1 2m9 3-1 2m-7 6 1 1"/></>}
//       {kind === 'cherry' && <><path className="candy-stem" d="M31 31c4-14 10-20 18-21M34 31c-3-12-9-17-16-17"/><path className="candy-leaf" d="M40 12c5-8 12-6 12-6-1 7-6 10-12 6"/><circle className="candy-body" cx="23" cy="42" r="12"/><circle className="candy-body candy-body-alt" cx="43" cy="40" r="12"/><ellipse className="candy-shine" cx="19" cy="38" rx="3" ry="5"/><ellipse className="candy-shine" cx="39" cy="36" rx="3" ry="5"/></>}
//       {kind === 'grape' && <><path className="candy-leaf" d="M30 19c0-9 7-13 16-12-1 8-7 13-16 12m0 0c-8 1-12-4-13-11 7-1 12 3 13 11"/><circle className="candy-body" cx="25" cy="27" r="9"/><circle className="candy-body" cx="40" cy="27" r="9"/><circle className="candy-body" cx="18" cy="41" r="9"/><circle className="candy-body" cx="33" cy="42" r="10"/><circle className="candy-body" cx="47" cy="41" r="8"/><circle className="candy-body" cx="26" cy="54" r="7"/><ellipse className="candy-shine" cx="22" cy="24" rx="2" ry="3"/></>}
//       {kind === 'orange' && <><circle className="candy-rind" cx="32" cy="33" r="24"/><circle className="candy-pulp" cx="32" cy="33" r="19"/><path className="candy-pith" d="M32 14v38M13 33h38M18.5 19.5l27 27m0-27-27 27"/><circle className="candy-center" cx="32" cy="33" r="4"/><path className="candy-leaf" d="M34 9c5-8 12-7 14-6-2 6-7 9-14 6"/></>}
//       {kind === 'lemon' && <><path className="candy-body" d="M9 33c7-4 11-17 23-17s16 13 23 17c-7 4-11 17-23 17S16 37 9 33Z"/><path className="candy-leaf" d="M30 18c4-10 12-11 19-9-3 7-9 11-19 9"/><path className="candy-shine-line" d="M19 32c3-5 6-8 10-9"/></>}
//       {kind === 'blueberry' && <><circle className="candy-body" cx="32" cy="35" r="22"/><path className="candy-calyx" d="m32 18 3 8 8-4-3 8 8 4-9 2-2 8-5-7-7 5 2-9-8-3 8-3Z"/><ellipse className="candy-shine" cx="23" cy="28" rx="4" ry="6"/></>}
//       {(special === 'striped-h' || special === 'striped-v') && <path className={`special-stripes ${special}`} d={special === 'striped-h' ? 'M13 27h38M11 34h42M14 41h36' : 'M26 12v40M33 10v44M40 13v38'}/>}
//     </svg>
//     {special && <span className={`special-marker marker-${special}`} aria-label={special === 'color-bomb' ? 'Bomba de color' : special === 'wrapped' ? 'Dulce explosivo' : 'Dulce rayado'}>{special === 'color-bomb' ? '✹' : special === 'wrapped' ? '✦' : '✧'}</span>}
//     </span>
//   );
// }
//
// const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
//
// export default function MiAmor() {
//   const [dateValue, setDateValue] = useState(() => localStorage.getItem(STORAGE_KEY) ?? '');
//   const [savedDate, setSavedDate] = useState(() => localStorage.getItem(STORAGE_KEY) ?? '');
//   const [board, setBoard] = useState<Board>(createBoard);
//   const [selected, setSelected] = useState<number | null>(null);
//   const [clearing, setClearing] = useState<number[]>([]);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [score, setScore] = useState(0);
//   const [moves, setMoves] = useState(0);
//   const [now, setNow] = useState(Date.now());
//   const [answer, setAnswer] = useState(false);
//
//   useEffect(() => {
//     const timer = window.setInterval(() => setNow(Date.now()), 1000);
//     return () => window.clearInterval(timer);
//   }, []);
//
//   const date = useMemo(() => savedDate ? new Date(savedDate) : null, [savedDate]);
//   const dateReached = Boolean(date && date.getTime() <= now);
//   const levelComplete = score >= TARGET;
//   const canAsk = dateReached && levelComplete;
//
//   function saveDate(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     if (!dateValue || new Date(dateValue).getTime() < Date.now()) return;
//     localStorage.setItem(STORAGE_KEY, dateValue);
//     setSavedDate(dateValue);
//     setScore(0);
//     setMoves(0);
//     setBoard(createBoard());
//   }
//
//   function resetDate() {
//     localStorage.removeItem(STORAGE_KEY);
//     setSavedDate('');
//     setDateValue('');
//     setScore(0);
//     setMoves(0);
//     setAnswer(false);
//     setSelected(null);
//     setClearing([]);
//     setBoard(createBoard());
//   }
//
//   async function animateBoard(nextBoard: Board) {
//     const boardElement = document.querySelector('.candy-board');
//     const before = new Map<number, DOMRect>();
//     boardElement?.querySelectorAll<HTMLElement>('[data-candy-id]').forEach((element) => {
//       const id = Number(element.dataset.candyId);
//       before.set(id, element.getBoundingClientRect());
//     });
//     setBoard(nextBoard);
//     await nextFrame();
//     await nextFrame();
//     const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//     const animations: Animation[] = [];
//     boardElement?.querySelectorAll<HTMLElement>('[data-candy-id]').forEach((element) => {
//       const id = Number(element.dataset.candyId);
//       const from = before.get(id);
//       const to = element.getBoundingClientRect();
//       if (!from) {
//         if (!reduceMotion) animations.push(element.animate([
//           { transform: 'translateY(-150%) scale(.82)', opacity: 0 },
//           { transform: 'translateY(0) scale(1)', opacity: 1 },
//         ], { duration: 260, easing: 'cubic-bezier(.2,.75,.25,1)' }));
//         return;
//       }
//       const dx = from.left - to.left;
//       const dy = from.top - to.top;
//       if (dx || dy) {
//         animations.push(element.animate([
//           { transform: `translate(${dx}px, ${dy}px) scale(.92)` },
//           { transform: 'translate(0, 0) scale(1)' },
//         ], { duration: reduceMotion ? 0 : 230, easing: 'cubic-bezier(.2,.75,.25,1)' }));
//       }
//     });
//     await Promise.all(animations.map((animation) => animation.finished.catch(() => undefined)));
//   }
//
//   async function chooseCandy(index: number) {
//     if (canAsk || answer || isAnimating) return;
//     if (selected === null) {
//       setSelected(index);
//       return;
//     }
//     if (selected === index) {
//       setSelected(null);
//       return;
//     }
//     const adjacent = Math.abs(Math.floor(selected / SIZE) - Math.floor(index / SIZE))
//       + Math.abs((selected % SIZE) - (index % SIZE)) === 1;
//     if (!adjacent) {
//       setSelected(index);
//       return;
//     }
//     const original = [...board];
//     const swapped = [...board];
//     [swapped[selected], swapped[index]] = [swapped[index], swapped[selected]];
//     setSelected(null);
//     setIsAnimating(true);
//     try {
//       await animateBoard(swapped);
//       const matches = findMatches(swapped);
//       if (!matches.size) {
//         await animateBoard(original);
//         return;
//       }
//       const result = settleBoard(swapped, index);
//       setClearing([...result.firstWave].filter((matchedIndex) => !result.placements.has(matchedIndex)));
//       await new Promise((resolve) => window.setTimeout(resolve, 170));
//       setClearing([]);
//       await animateBoard(result.board);
//       setScore((current) => current + result.cleared * 50);
//       setMoves((current) => current + 1);
//     } finally {
//       setIsAnimating(false);
//     }
//   }
//
//   function resetGame() {
//     setBoard(createBoard());
//     setScore(0);
//     setMoves(0);
//     setSelected(null);
//     setClearing([]);
//   }
//
//   const dateLabel = date ? new Intl.DateTimeFormat('es-CR', {
//     dateStyle: 'full', timeStyle: 'short',
//   }).format(date) : '';
//
//   return (
//     <main className="love-page">
//       <div className="love-glow love-glow-one" />
//       <div className="love-glow love-glow-two" />
//       <div className="love-shell">
//         <header className="love-header">
//           <a className="love-mark" href="/" aria-label="Volver al inicio">♡</a>
//           <span>una pequeña sorpresa</span>
//           <span className="love-header-heart">♥</span>
//         </header>
//
//         {!canAsk ? (
//           <>
//             {!savedDate ? (
//               <section className="date-card">
//                 <span className="eyebrow">PARA ALGUIEN MUY ESPECIAL</span>
//                 <div className="hero-heart" aria-hidden="true">♡</div>
//                 <h1>Una cita para <em>Mi amor</em></h1>
//                 <p className="love-copy">Quiero invitarte a una noche bonita, de esas que se quedan guardadas en el corazón. ¿Cuándo te gustaría que fuera?</p>
//                 <form className="date-form" onSubmit={saveDate}>
//                   <label htmlFor="date">Elige la fecha y la hora</label>
//                   <input id="date" type="datetime-local" value={dateValue} min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)} onChange={(event) => setDateValue(event.target.value)} required />
//                   <button className="love-button" type="submit">Guardar nuestra cita <span>♡</span></button>
//                 </form>
//                 <p className="tiny-note">Este momento empieza con una fecha… y un poquito de magia.</p>
//               </section>
//             ) : (
//               <section className="game-section">
//                 <div className="game-heading">
//                   <span className="eyebrow">NIVEL 1 · HECHO CON AMOR</span>
//                   <h1>Un juego para <em>Mi amor</em></h1>
//                   <p>Combina 3 o más dulces iguales. No hay límite de movimientos: juega a tu ritmo.</p>
//                 </div>
//                 <div className="date-pill">
//                   <span>✦</span> Nuestra cita · {dateLabel}
//                 </div>
//                 <div className="game-card">
//                   <div className="score-row">
//                     <div><span className="score-label">PUNTOS</span><strong>{score.toLocaleString('es-CR')}</strong></div>
//                     <div className="target-score"><span className="score-label">META</span><strong>{TARGET.toLocaleString('es-CR')} <span>♡</span></strong></div>
//                     <button className="reset-button" onClick={resetGame} title="Empezar de nuevo" aria-label="Empezar de nuevo">↻</button>
//                   </div>
//                   <div className="progress-track"><div className="progress-fill" style={{ width: `${Math.min(100, (score / TARGET) * 100)}%` }} /></div>
//                   <div className="candy-board" role="grid" aria-label="Tablero de dulces">
//                     {board.map((candy, index) => candy && (
//                       <button key={candy.id} data-candy-id={candy.id} type="button" role="gridcell" className={`candy-cell candy-cell-${candy.kind}${candy.special ? ` has-${candy.special}` : ''}${selected === index ? ' is-selected' : ''}${clearing.includes(index) ? ' is-clearing' : ''}`} onClick={() => void chooseCandy(index)} aria-label={`Dulce ${index + 1}${candy.special ? ` especial: ${candy.special}` : ''}`}>
//                         <CandyIcon kind={candy.kind} special={candy.special} />
//                       </button>
//                     ))}
//                   </div>
//                   <div className="special-guide"><span>✧ <b>4 en línea</b> · despeja una fila o columna</span><span>✹ <b>5 o más</b> · bomba de color</span><span>✦ <b>En T o L</b> · explosión alrededor</span></div>
//                   <div className="game-footer"><span>Movimientos <strong>{moves}</strong></span><span>Un match de 3 suma puntos ✨</span></div>
//                 </div>
//                 {levelComplete && !dateReached ? (
//                   <div className="waiting-card"><span className="waiting-heart">♥</span><div><strong>¡Nivel superado, Mi amor!</strong><p>La sorpresa se abrirá cuando llegue nuestra cita.</p><span className="countdown">Faltan {formatRemaining((date?.getTime() ?? now) - now)}</span></div></div>
//                 ) : levelComplete ? (
//                   <div className="waiting-card"><span className="waiting-heart">♥</span><div><strong>¡Llegó nuestro momento, Mi amor!</strong><p>Una última sorpresa te espera…</p><button className="love-button reveal-button" onClick={() => setAnswer(true)}>Ver mi pregunta <span>♡</span></button></div></div>
//                 ) : (
//                   <p className="encouragement">Cada combinación nos acerca a una noche especial <span>♡</span></p>
//                 )}
//               </section>
//             )}
//           </>
//         ) : (
//           <section className="proposal-card">
//             <span className="eyebrow">CON TODO MI CORAZÓN</span>
//             <div className="proposal-heart">♥</div>
//             {answer ? <><h1>¡Me haces <em>muy feliz!</em></h1><p className="love-copy">Gracias por decir que sí, Mi amor. Esta es la primera página de una historia preciosa. ♡</p><div className="date-pill proposal-date">Nuestra cita · {dateLabel}</div></> : <><h1>¿Quieres ser <em>mi novia</em>?</h1><p className="love-copy">Mi amor, desde que llegaste a mi vida, cada día tiene algo más bonito. Me encantaría seguir creando momentos contigo.</p><div className="answer-buttons"><button className="love-button" onClick={() => setAnswer(true)}>¡Sí, quiero! <span>♡</span></button><button className="soft-button" onClick={() => setAnswer(true)}>¡Claro que sí! ✨</button></div><p className="tiny-note">Gracias por compartir conmigo este momento tan especial.</p></>}
//           </section>
//         ) }
//         <footer className="love-footer">
//           hecho con mucho cariño{' '}
//           <button
//             type="button"
//             onClick={resetDate}
//             title="Cambiar fecha"
//             style={{
//               background: 'none',
//               border: 'none',
//               color: 'inherit',
//               font: 'inherit',
//               cursor: 'pointer',
//               padding: 0,
//             }}
//           >
//             ♥
//           </button>
//         </footer>
//       </div>
//     </main>
//   );
// }