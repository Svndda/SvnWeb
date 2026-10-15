import { useSound } from '../audio/useSound';

function MusicIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
      {muted && <path d="M3 3l18 18" />}
    </svg>
  );
}

function EffectsIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      {!muted && <path d="M15.500 8.500a5 5 0 0 1 0 7M18.500 5.500a9 9 0 0 1 0 13" />}
      {muted && <path d="M3 3l18 18" />}
    </svg>
  );
}

export function SoundToggle() {
  const { prefs, toggleMusic, toggleSfx } = useSound();
  return (
    <div className="sound-controls" role="group" aria-label="Sonido">
      <button type="button" className="sound-button" aria-pressed={prefs.music} aria-label="Música de fondo" title={prefs.music ? 'Silenciar música' : 'Activar música'} onClick={toggleMusic}>
        <MusicIcon muted={!prefs.music} />
      </button>
      <button type="button" className="sound-button" aria-pressed={prefs.sfx} aria-label="Efectos de sonido" title={prefs.sfx ? 'Silenciar efectos' : 'Activar efectos'} onClick={toggleSfx}>
        <EffectsIcon muted={!prefs.sfx} />
      </button>
    </div>
  );
}
