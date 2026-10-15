import { useNow } from '../hooks/useNow';
import { formatRemaining } from '../utils/time';

/** Solo este componente se re-renderiza cada segundo, no la página completa. */
export function Countdown({ target }: { target: Date }) {
  const now = useNow(1000);
  return <span className="countdown">Faltan {formatRemaining(target.getTime() - now)}</span>;
}
