import { useEffect } from 'react';
import { soundEngine } from './soundEngine';

const GESTURES = ['pointerup', 'touchend', 'keydown', 'click'] as const;

/**
 * Activa el audio con el primer gesto del usuario (los navegadores bloquean el
 * autoplay) y detiene la música cuando la página se desmonta.
 */
export function useAudioLifecycle() {
  useEffect(() => {
    soundEngine.setActive(true);

    const detach = () => GESTURES.forEach((name) => window.removeEventListener(name, handleGesture, true));
    function handleGesture() {
      void soundEngine.unlock().then((running) => {
        if (running) detach();
      });
    }
    GESTURES.forEach((name) => window.addEventListener(name, handleGesture, { capture: true, passive: true }));

    return () => {
      detach();
      soundEngine.setActive(false);
    };
  }, []);
}
