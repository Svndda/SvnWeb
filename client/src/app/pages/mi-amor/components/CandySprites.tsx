import { memo } from 'react';
import { CANDIES } from '../constants';

/** Colores más vibrantes y saturados: [luz, color base, sombra] */
const FRUIT_STOPS: Record<string, [string, string, string]> = {
  berry: ['#ffb3c6', '#e51046', '#870020'],
  cherry: ['#ffb3c6', '#e51046', '#870020'],
  grape: ['#e2a8ff', '#9422e8', '#4b0b8a'],
  blueberry: ['#99c2ff', '#1a66ff', '#002999'],
  lemon: ['#ffffa8', '#ffcc00', '#997a00'],
  'orange-rind': ['#ffcc85', '#ff7b00', '#994a00'],
  'orange-pulp': ['#ffe6b3', '#ff9900', '#cc5200'],
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
  ['M 20 20 L 24 22', '#ff5c8a'],
  ['M 40 18 L 38 22', '#4a9bff'],
  ['M 30 14 L 34 14', '#ffd21f'],
  ['M 46 30 L 46 34', '#3fcf8e'],
  ['M 14 32 L 18 30', '#b57cf0'],
  ['M 24 44 L 28 42', '#ff9d2e'],
  ['M 40 48 L 36 46', '#ff5c8a'],
  ['M 32 52 L 34 48', '#4a9bff'],
  ['M 50 40 L 46 42', '#ffd21f'],
  ['M 20 34 L 22 38', '#3fcf8e'],
  ['M 34 32 L 38 34', '#ff9d2e'],
];

const BERRY_PATH = 'M32 57C25 48 12 38 14 27c1-8 8-12 15-9l3 3 3-3c8-4 16 1 16 10 0 11-12 21-19 29Z';
const LEMON_PATH = 'M6 34c2-1 4-1.500 6-3 5-4 9-15 20-15s15 11 20 15c2 1.500 4 2 6 3-2 1-4 1.500-6 3-5 4-9 15-20 15S17 41 12 37c-2-1.500-4-2-6-3Z';
const SPARK = 'M54 8l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z';

/** Componente reutilizable para el reflejo cristalino 3D */
function CandyGloss({ cx, cy, rx, ry, rotate = -30 }: { cx: number; cy: number; rx: number; ry: number; rotate?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${rotate} ${cx} ${cy})`} fill="url(#gr-gloss)" />;
}

function Spark({ fill = '#fff6c8', stroke = '#ffb53d' }: { fill?: string; stroke?: string }) {
  return (
      <path d={SPARK} fill={fill} stroke={stroke} strokeWidth=".9" strokeLinejoin="round">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
      </path>
  );
}

function Stripes({ orientation, kind }: { orientation: 'h' | 'v'; kind: string }) {
  const offsets = orientation === 'h' ? [20, 32, 44] : [20, 32, 44];
  return (
      <g id={`special-striped-${orientation}-${kind}`}>
        <g clipPath={`url(#clip-${kind})`}>
          {/* Bandas blancas sólidas para mayor contraste */}
          {offsets.map((offset) =>
              orientation === 'h' ? (
                  <rect key={offset} x="0" y={offset - 3} width="64" height="6" fill="#fff" opacity="0.9" />
              ) : (
                  <rect key={offset} x={offset - 3} y="0" width="6" height="64" fill="#fff" opacity="0.9" />
              ),
          )}
          {/* Resplandor interior */}
          <rect x="0" y="0" width="64" height="64" fill="none" stroke="#fff" strokeWidth="6" opacity="0.6" />
        </g>
        <Spark />
      </g>
  );
}

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

          {/* Clip Paths */}
          <clipPath id="clip-berry"><path d={BERRY_PATH} /></clipPath>
          <clipPath id="clip-cherry">
            <circle cx="22" cy="44" r="13" />
            <circle cx="42" cy="42" r="13" />
          </clipPath>
          <clipPath id="clip-grape">
            {GRAPE_BALLS.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="8.500" />)}
          </clipPath>
          <clipPath id="clip-orange"><circle cx="32" cy="34" r="25" /></clipPath>
          <clipPath id="clip-lemon"><path transform="rotate(-20 32 34)" d={LEMON_PATH} /></clipPath>
          <clipPath id="clip-blueberry"><circle cx="32" cy="35" r="23" /></clipPath>

          {/* ───────── Frutas con acabados de caramelo brillante ───────── */}
          <g id="candy-berry" strokeLinejoin="round" strokeLinecap="round">
            <path d={BERRY_PATH} fill="url(#gr-berry)" stroke="#7a001a" strokeWidth="2.4" />
            <path d="M 20 32 C 16 22, 22 14, 30 16" fill="none" stroke="#fff" strokeWidth="4" opacity="0.6" strokeLinecap="round" />
            <CandyGloss cx={26} cy={20} rx={8} ry={4} rotate={-20} />
            <circle cx="44" cy="40" r="2.5" fill="#fff" opacity="0.6" />
          </g>

          <g id="candy-cherry" strokeLinejoin="round" strokeLinecap="round">
            <path d="M22 32C23 20 32 12 47 8M42 30C42 21 44 14 47 8" fill="none" stroke="#5e8a2e" strokeWidth="3" />
            <path d="M47 8c4-5 11-5 14-3-1 6-7 9-14 3Z" fill="url(#gr-leaf)" stroke="#2b7a3e" strokeWidth="1.6" />
            <circle cx="22" cy="44" r="14" fill="url(#gr-cherry)" stroke="#7a001a" strokeWidth="2" />
            <CandyGloss cx={16} cy={38} rx={6} ry={3} rotate={-40} />
            <circle cx="28" cy="50" r="1.5" fill="#fff" opacity="0.7" />

            <circle cx="42" cy="42" r="14" fill="url(#gr-cherry)" stroke="#7a001a" strokeWidth="2" />
            <CandyGloss cx={36} cy={36} rx={6} ry={3} rotate={-40} />
            <circle cx="48" cy="48" r="1.5" fill="#fff" opacity="0.7" />
          </g>

          <g id="candy-grape" strokeLinejoin="round" strokeLinecap="round">
            <path d="M32 21c0-5 1-9 4-12" fill="none" stroke="#6d4a2a" strokeWidth="2.6" />
            <path d="M34 14c1-7 8-11 16-9-1 7-8 12-16 9Z" fill="url(#gr-leaf)" stroke="#2b7a3e" strokeWidth="1.6" />
            {GRAPE_BALLS.map(([cx, cy]) => (
                <g key={`${cx}-${cy}`}>
                  <circle cx={cx} cy={cy} r="9" fill="url(#gr-grape)" stroke="#3a096b" strokeWidth="1.5" />
                  <CandyGloss cx={cx - 3} cy={cy - 3} rx={3} ry={1.5} rotate={-30} />
                  <circle cx={cx + 4} cy={cy + 4} r="1" fill="#fff" opacity="0.6" />
                </g>
            ))}
          </g>

          <g id="candy-orange" strokeLinejoin="round" strokeLinecap="round">
            <circle cx="32" cy="34" r="25" fill="url(#gr-orange-rind)" stroke="#b34700" strokeWidth="2.4" />
            <circle cx="32" cy="34" r="20" fill="#fff4d6" />
            <circle cx="32" cy="34" r="18" fill="url(#gr-orange-pulp)" />
            <path d="M32 34V15.5M32 34l13-13M32 34h18.5M32 34l13 13M32 34v18.5M32 34l-13 13M32 34h-18.5M32 34l-13-13" fill="none" stroke="#fff4d6" strokeWidth="2.5" />
            <CandyGloss cx={20} cy={22} rx={12} ry={6} rotate={-40} />
            <circle cx="44" cy="46" r="3.5" fill="#fff" opacity="0.7" />
          </g>

          <g id="candy-lemon" strokeLinejoin="round" strokeLinecap="round">
            <g transform="rotate(-20 32 34)">
              <path d={LEMON_PATH} fill="url(#gr-lemon)" stroke="#b38200" strokeWidth="2.4" />
              <path d="M 18 30 C 20 20, 30 18, 38 18" fill="none" stroke="#fff" strokeWidth="3" opacity="0.7" strokeLinecap="round" />
              <CandyGloss cx={28} cy={22} rx={8} ry={4} rotate={-10} />
              <circle cx="42" cy="42" r="2.5" fill="#fff" opacity="0.7" />
            </g>
          </g>

          <g id="candy-blueberry" strokeLinejoin="round" strokeLinecap="round">
            <circle cx="32" cy="35" r="23" fill="url(#gr-blueberry)" stroke="#001f66" strokeWidth="2.4" />
            <CandyGloss cx={22} cy={24} rx={10} ry={5} rotate={-35} />
            <path d="M 18 42 A 16 16 0 0 0 42 46" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
            <circle cx="42" cy="44" r="3" fill="#fff" opacity="0.7" />
          </g>

          {/* ───────── Dulces especiales ───────── */}
          {CANDIES.map((kind) => <Stripes key={`h-${kind}`} orientation="h" kind={kind} />)}
          {CANDIES.map((kind) => <Stripes key={`v-${kind}`} orientation="v" kind={kind} />)}

          <g id="special-wrapped">
            {/* Colas de la envoltura */}
            <path d="M 12 18 L 2 10 L 4 34 Z" fill="url(#gr-gold)" />
            <path d="M 52 18 L 62 10 L 60 34 Z" fill="url(#gr-gold)" />
            <path d="M 12 50 L 2 58 L 4 34 Z" fill="url(#gr-gold)" />
            <path d="M 52 50 L 62 58 L 60 34 Z" fill="url(#gr-gold)" />

            {/* Cuerpo principal cuadrado brillante */}
            <rect x="12" y="14" width="40" height="40" rx="10" fill="none" stroke="url(#gr-gold)" strokeWidth="4" />
            <rect x="16" y="18" width="32" height="32" rx="8" fill="none" stroke="#fff" strokeWidth="2" opacity="0.9" />
            <Spark />
          </g>

          <g id="special-color-bomb">
            <circle cx="32" cy="34" r="26" fill="#3d2314" stroke="#1f1008" strokeWidth="2" />
            <CandyGloss cx={22} cy={20} rx={12} ry={5} rotate={-30} />
            <g strokeLinecap="round">
              {SPRINKLES.map(([d, color]) => (
                  <path key={`c-${d}`} d={d} stroke={color} strokeWidth="3" />
              ))}
            </g>
            <Spark />
          </g>

          <g id="special-color-bomb-ring">
            <circle cx="32" cy="34" r="30" fill="none" stroke="url(#gr-rainbow)" strokeWidth="4" strokeDasharray="8 6" opacity="0.9">
              <animateTransform attributeName="transform" type="rotate" from="0 32 34" to="360 32 34" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>
        </defs>
      </svg>
  );
});