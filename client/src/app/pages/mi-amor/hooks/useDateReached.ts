import { useEffect, useState } from 'react';

// setTimeout falla (se dispara al instante) con esperas mayores a ~24.8 días.
const MAX_TIMEOUT_MS = 2 ** 31 - 1;

/**
 * Indica si ya llegó la fecha. En lugar de re-renderizar toda la página cada
 * segundo, programa un único temporizador hasta el momento exacto.
 */
export function useDateReached(date: Date | null): boolean {
  const [reached, setReached] = useState(() => (date ? date.getTime() <= Date.now() : false));

  useEffect(() => {
    if (!date) {
      setReached(false);
      return;
    }
    let timer: number | undefined;
    const check = () => {
      window.clearTimeout(timer);
      const remaining = date.getTime() - Date.now();
      if (remaining <= 0) {
        setReached(true);
        return;
      }
      setReached(false);
      timer = window.setTimeout(check, Math.min(remaining, MAX_TIMEOUT_MS));
    };
    check();
    // Los temporizadores se retrasan en pestañas ocultas o con el equipo suspendido.
    document.addEventListener('visibilitychange', check);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', check);
    };
  }, [date]);

  return reached;
}
