const dateFormatter = new Intl.DateTimeFormat('es-CR', { dateStyle: 'full', timeStyle: 'short' });

export function formatDateLabel(date: Date): string {
  return dateFormatter.format(date);
}

export function formatRemaining(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

/** Valor compatible con <input type="datetime-local"> en la zona horaria local. */
export function toLocalInputValue(date: Date = new Date()): string {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
