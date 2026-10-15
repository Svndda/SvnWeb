import { useCallback, useLayoutEffect, useRef } from 'react';

/**
 * Devuelve una función con identidad estable que siempre ejecuta la versión más
 * reciente de `callback`. Permite usar React.memo en hijos sin perder datos frescos.
 */
export function useStableCallback<Args extends unknown[], Result>(callback: (...args: Args) => Result) {
  const ref = useRef(callback);
  useLayoutEffect(() => {
    ref.current = callback;
  });
  return useCallback((...args: Args) => ref.current(...args), []);
}
