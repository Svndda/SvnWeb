import type { SpecialCandy } from '../types';
import { CandyIcon } from './CandyIcon';

const GUIDE: ReadonlyArray<{ special: SpecialCandy; title: string; text: string }> = [
  { special: 'striped-h', title: '4 en línea', text: 'despeja una fila o columna' },
  { special: 'color-bomb', title: '5 o más', text: 'bomba de color' },
  { special: 'wrapped', title: 'En T o L', text: 'explosión alrededor' },
];

export function SpecialGuide() {
  return (
    <div className="special-guide">
      {GUIDE.map(({ special, title, text }) => (
        <div key={special}>
          <span className="guide-icon">
            <CandyIcon kind="berry" special={special} />
          </span>
          <span>
            <b>{title}</b> · {text}
          </span>
        </div>
      ))}
    </div>
  );
}
