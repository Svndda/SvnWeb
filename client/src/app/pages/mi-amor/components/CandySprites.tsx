import { memo } from 'react';
import { CANDIES } from '../constants';

/** [luz, color base, sombra] de cada fruta. */
const FRUIT_STOPS: Record<string, [string, string, string]> = {
  berry: ['#ffa0b4', '#f2476f', '#bd1646'],
  cherry: ['#ff8f8f', '#e52d4a', '#95102e'],
  grape: ['#d6b3ff', '#8e55d6', '#4f2398'],
  blueberry: ['#a8bbff', '#5668e0', '#292c8e'],
  lemon: ['#fff8ad', '#ffdc2e', '#dca000'],
  'orange-rind': ['#ffbb6b', '#fb8a22', '#df5f0a'],
  'orange-pulp': ['#ffe488', '#ffb43c', '#ff8a1f'],
};

const GRAPE_BALLS: ReadonlyArray<[number, number]> = [
  [17, 28],
  [32, 28],
  [47, 28],
  [24.5, 41.5],
  [39.5, 41.5],
  [32, 54],
];

const SPRINKLES: ReadonlyArray<[string, string]> = [
  ['M19 30l3-2', '#ff5c8a'],
  ['M30 22l3 2', '#ffd21f'],
  ['M42 26l2 3', '#3fcf8e'],
  ['M24 40l3 2', '#4a9bff'],
  ['M38 38l3-2', '#b57cf0'],
  ['M32 48l3-1', '#ff9d2e'],
  ['M46 42l1 3', '#ff5c8a'],
  ['M16 42l2 3', '#ffd21f'],
];

const BERRY_PATH = 'M32 57C25 48 12 38 14 27c1-8 8-12 15-9l3 3 3-3c8-4 16 1 16 10 0 11-12 21-19 29Z';
const LEMON_PATH = 'M6 34c2-1 4-1.500 6-3 5-4 9-15 20-15s15 11 20 15c2 1.500 4 2 6 3-2 1-4 1.500-6 3-5 4-9 15-20 15S17 41 12 37c-2-1.500-4-2-6-3Z';
const SPARK = 'M54 8l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z';
const LEAF_STROKE = '#2b7a3e';

function Gloss({ cx, cy, rx, ry, rotate = -30 }: { cx: number; cy: number; rx: number; ry: number; rotate?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${rotate} ${cx} ${cy})`} fill="url(#gr-gloss)" />;
}

function Spark({ fill = '#fff6c8', stroke = '#ffb53d' }: { fill?: string; stroke?: string }) {
  return <path d={SPARK} fill={fill} stroke={stroke} strokeWidth=".9" strokeLinejoin="round" />;
}

function Stripes({ orientation, kind }: { orientation: 'h' | 'v'; kind: string }) {
  const offsets = orientation === 'h' ? [22, 32.8, 43.6] : [20, 29.8, 39.6];
  return (
    <g id={`special-striped-${orientation}-${kind}`}>
      <g clipPath={`url(#clip-${kind})`} fill="#fff" fillOpacity=".9" stroke="#8a2d52" strokeOpacity=".4" strokeWidth=".9">
        {offsets.map((offset) =>
          orientation === 'h' ? (
            <rect key={offset} x="2" y={offset} width="60" height="4.400" rx="2.200" />
          ) : (
            <rect key={offset} x={offset} y="6" width="4.400" height="56" rx="2.200" />
          ),
        )}
      </g>
      <Spark />
    </g>
  );
}

/**
 * Todas las frutas y dulces especiales se definen UNA vez aquí. Cada celda del
 * tablero solo dibuja `<use href="#candy-…">`, así el DOM es mucho más liviano.
 * Debe renderizarse una sola vez por página (los ids son globales).
 */
export const CandySprites = memo(function CandySprites() {
  return (
    <svg className="candy-sprites" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        {Object.entries(FRUIT_STOPS).map(([name, [light, base, shade]]) => (
          <radialGradient key={name} id={`gr-${name}`} cx=".36" cy=".3" r=".85">
            <stop offset="0" stopColor={light} />
            <stop offset=".45" stopColor={base} />
            <stop offset="1" stopColor={shade} />
          </radialGradient>
        ))}
        <linearGradient id="gr-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a6ee82" />
          <stop offset="1" stopColor="#2f9a4b" />
        </linearGradient>
        <linearGradient id="gr-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gr-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe98f" />
          <stop offset=".5" stopColor="#ffb52e" />
          <stop offset="1" stopColor="#d4800f" />
        </linearGradient>
        <linearGradient id="gr-rainbow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff5c8a" />
          <stop offset=".25" stopColor="#ffb347" />
          <stop offset=".5" stopColor="#ffe14d" />
          <stop offset=".75" stopColor="#4fd3a0" />
          <stop offset="1" stopColor="#7a8cff" />
        </linearGradient>
        <clipPath id="clip-berry">
          <path d={BERRY_PATH} />
        </clipPath>
        <clipPath id="clip-cherry">
          <circle cx="22" cy="44" r="13" />
          <circle cx="42" cy="42" r="13" />
        </clipPath>
        <clipPath id="clip-grape">
          {GRAPE_BALLS.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="8.500" />
          ))}
        </clipPath>
        <clipPath id="clip-orange">
          <circle cx="32" cy="34" r="25" />
        </clipPath>
        <clipPath id="clip-lemon">
          <path transform="rotate(-20 32 34)" d={LEMON_PATH} />
        </clipPath>
        <clipPath id="clip-blueberry">
          <circle cx="32" cy="35" r="23" />
        </clipPath>

        {/* ───────── Frutas ───────── */}
        <g id="candy-berry" strokeLinejoin="round" strokeLinecap="round">
          <path d="M32 20c0-5 1-9 4-12" fill="none" stroke="#4e8a3a" strokeWidth="2.6" />
          <path d={BERRY_PATH} fill="url(#gr-berry)" stroke="#a8123d" strokeWidth="2.4" />
          <g fill="#ffeaa3" stroke="#b5304f" strokeWidth=".5">
            {(
              [
                [24, 31, -20],
                [40, 30, 20],
                [32, 36, 0],
                [25, 42, -15],
                [39, 42, 15],
                [32, 49, 0],
              ] as const
            ).map(([x, y, r]) => (
              <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="1.2" ry="2" transform={`rotate(${r} ${x} ${y})`} />
            ))}
          </g>
          <path d="M19 12c4 1 9 4 13 8 4-4 9-7 14-8-1 6-6 11-14 12-8-1-13-5-13-12Z" fill="url(#gr-leaf)" stroke={LEAF_STROKE} strokeWidth="1.6" />
          <path d="M17 34c0-4 3-7.500 7.500-8.500" fill="none" stroke="#fff" strokeWidth="3.200" opacity=".85" />
          <ellipse cx="41" cy="29" rx="1.600" ry="2.400" fill="#fff" opacity=".5" />
          <path d="M40 48c-1.500 2.500-3 4-5 5.500" fill="none" stroke="#ff9fb3" strokeWidth="1.800" opacity=".4" />
        </g>

        <g id="candy-cherry" strokeLinejoin="round" strokeLinecap="round">
          <path d="M22 32C23 20 32 12 47 8M42 30C42 21 44 14 47 8" fill="none" stroke="#5e8a2e" strokeWidth="2.600" />
          <path d="M47 8c4-5 11-5 14-3-1 6-7 9-14 3Z" fill="url(#gr-leaf)" stroke={LEAF_STROKE} strokeWidth="1.600" />
          <circle cx="22" cy="44" r="13" fill="url(#gr-cherry)" stroke="#8a0f2e" strokeWidth="2.400" />
          <circle cx="42" cy="42" r="13" fill="url(#gr-cherry)" stroke="#8a0f2e" strokeWidth="2.400" />
          <Gloss cx={17.500} cy={38.500} rx={3.400} ry={5.400} rotate={35} />
          <Gloss cx={37.500} cy={36.500} rx={3.400} ry={5.400} rotate={35} />
          <path d="M27 54c2 1.500 4.500 1.500 6.500 0M47 52c2-1 3.500-2.500 4-4.500" fill="none" stroke="#ff8f8f" strokeWidth="1.800" opacity=".5" />
        </g>

        <g id="candy-grape" strokeLinejoin="round" strokeLinecap="round">
          <path d="M32 21c0-5 1-9 4-12" fill="none" stroke="#6d4a2a" strokeWidth="2.600" />
          <path d="M34 14c1-7 8-11 16-9-1 7-8 12-16 9Z" fill="url(#gr-leaf)" stroke={LEAF_STROKE} strokeWidth="1.600" />
          {GRAPE_BALLS.map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="8.500" fill="url(#gr-grape)" stroke="#43207f" strokeWidth="2" />
              <Gloss cx={cx - 2.800} cy={cy - 3} rx={2.100} ry={3.200} rotate={30} />
            </g>
          ))}
        </g>

        <g id="candy-orange" strokeLinejoin="round" strokeLinecap="round">
          <circle cx="32" cy="34" r="25" fill="url(#gr-orange-rind)" stroke="#c9540a" strokeWidth="2.400" />
          <circle cx="32" cy="34" r="20.500" fill="#fff4d6" />
          <circle cx="32" cy="34" r="18.500" fill="url(#gr-orange-pulp)" />
          <path d="M32 34V15.500M32 34l13.080-13.080M32 34h18.500M32 34l13.080 13.080M32 34v18.500M32 34l-13.080 13.080M32 34h-18.500M32 34l-13.080-13.080" fill="none" stroke="#fff4d6" strokeWidth="2.200" />
          <circle cx="32" cy="34" r="3.200" fill="#fff4d6" />
          <path d="M16 27c3-6 8-9.500 14-10.500" fill="none" stroke="#fff" strokeWidth="3.200" opacity=".75" />
          <path d="M37 11c3-7 11-9 15-6-2 7-9 10-15 6Z" fill="url(#gr-leaf)" stroke={LEAF_STROKE} strokeWidth="1.600" />
          <path d="M39 10c4-2 8-3 11-3" fill="none" stroke={LEAF_STROKE} strokeWidth="1" opacity=".5" />
        </g>

        <g id="candy-lemon" strokeLinejoin="round" strokeLinecap="round">
          <g transform="rotate(-20 32 34)">
            <path d={LEMON_PATH} fill="url(#gr-lemon)" stroke="#b88600" strokeWidth="2.400" />
            <g fill="#d9a400" opacity=".45">
              {(
                [
                  [24, 40],
                  [34, 44],
                  [42, 36],
                  [28, 33],
                  [38, 28],
                ] as const
              ).map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r=".8" />
              ))}
            </g>
            <path d="M17 31c3-6 8-9.500 14-10.500" fill="none" stroke="#fff" strokeWidth="3.200" opacity=".85" />
            <path d="M33 17c1-7 7-11 14-10-1 7-7 11-14 10Z" fill="url(#gr-leaf)" stroke={LEAF_STROKE} strokeWidth="1.600" />
          </g>
        </g>

        <g id="candy-blueberry" strokeLinejoin="round" strokeLinecap="round">
          <circle cx="32" cy="35" r="23" fill="url(#gr-blueberry)" stroke="#1f2380" strokeWidth="2.400" />
          <polygon points="32,25 34.06,30.17 39.61,30.53 35.33,34.08 36.7,39.47 32,36.5 27.3,39.47 28.67,34.08 24.39,30.53 29.94,30.17" fill="#3a3fae" stroke="#1f2380" strokeWidth="1.200" />
          <circle cx="32" cy="33.500" r="1.800" fill="#1b1f6e" />
          <Gloss cx={22} cy={26} rx={5} ry={7.500} rotate={30} />
          <circle cx="17.500" cy="36" r="1.600" fill="#fff" opacity=".7" />
          <path d="M42 50c3-2 5-5 6-8.500" fill="none" stroke="#a8bbff" strokeWidth="2.200" opacity=".5" />
        </g>

        {/* ───────── Dulces especiales (se dibujan encima de la fruta) ───────── */}
        {CANDIES.map((kind) => (
          <Stripes key={`h-${kind}`} orientation="h" kind={kind} />
        ))}
        {CANDIES.map((kind) => (
          <Stripes key={`v-${kind}`} orientation="v" kind={kind} />
        ))}

        <g id="special-wrapped">
          <circle cx="32" cy="35" r="26" fill="none" stroke="#a8620a" strokeOpacity=".35" strokeWidth="5.200" strokeDasharray="7 3.500" strokeLinecap="round" />
          <circle cx="32" cy="35" r="26" fill="none" stroke="url(#gr-gold)" strokeWidth="3.600" strokeDasharray="7 3.500" strokeLinecap="round" />
          <path d="M2 35l11-8.500v17ZM62 35l-11-8.500v17Z" fill="url(#gr-gold)" stroke="#c98a12" strokeWidth="1.300" strokeLinejoin="round" />
          <Spark />
        </g>

        <g id="special-color-bomb">
          <g fill="none" strokeLinecap="round">
            {SPRINKLES.map(([d]) => (
              <path key={d} d={d} stroke="#fff" strokeWidth="5" />
            ))}
            {SPRINKLES.map(([d, color]) => (
              <path key={`c-${d}`} d={d} stroke={color} strokeWidth="2.800" />
            ))}
          </g>
          <Spark />
        </g>
        <circle id="special-color-bomb-ring" cx="32" cy="35" r="27.500" fill="none" stroke="url(#gr-rainbow)" strokeWidth="3" strokeDasharray="3 4.500" strokeLinecap="round" />
      </defs>
    </svg>
  );
});
