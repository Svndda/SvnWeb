import { SoundToggle } from './SoundToggle';

export function LoveHeader() {
  return (
    <header className="love-header">
      <a className="love-mark" href="/" aria-label="Volver al inicio">
        ♡
      </a>
      <span>una pequeña sorpresa</span>
      <SoundToggle />
    </header>
  );
}
