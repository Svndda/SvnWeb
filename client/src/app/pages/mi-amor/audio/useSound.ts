import { useSyncExternalStore } from 'react';
import { soundEngine } from './soundEngine';

/** Estado de las preferencias de audio + acciones. Para botones y paneles de UI. */
export function useSound() {
  const prefs = useSyncExternalStore(soundEngine.subscribe, soundEngine.getPrefs, soundEngine.getPrefs);
  return {
    prefs,
    play: soundEngine.play,
    toggleMusic: soundEngine.toggleMusic,
    toggleSfx: soundEngine.toggleSfx,
  };
}
