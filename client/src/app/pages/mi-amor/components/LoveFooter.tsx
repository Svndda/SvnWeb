type LoveFooterProps = { onResetDate: () => void };

export function LoveFooter({ onResetDate }: LoveFooterProps) {
  return (
    <footer className="love-footer">
      Hecho con mucho amor{' '}
      <button type="button" className="love-footer-button" onClick={onResetDate} title="Cambiar fecha" aria-label="Cambiar fecha">
        ♥
      </button>
    </footer>
  );
}
