import { type FormEvent, useMemo } from 'react';
import { toLocalInputValue } from '../utils/time';

type DateCardProps = { value: string; onChange: (value: string) => void; onSubmit: () => void };

export function DateCard({ value, onChange, onSubmit }: DateCardProps) {
  const min = useMemo(() => toLocalInputValue(), []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <section className="date-card">
      <span className="eyebrow">PARA MI VIDA HERMOSA</span>
      <div className="hero-heart" aria-hidden="true">
        ♡
      </div>
      <h1>
        Una cita para <em>Mi Dra. Muelitas</em>
      </h1>
      <p className="love-copy">
        Quiero compartir contigo una noche especial, en la que podamos pasarla bien bonito. ¿Cuándo te gustaría que fuera?
      </p>
      <form className="date-form" onSubmit={handleSubmit}>
        <label htmlFor="date">Selecciona la fecha y la hora</label>
        <input id="date" type="datetime-local" value={value} min={min} onChange={(event) => onChange(event.target.value)} required />
        <button className="love-button" type="submit">
          Guardar nuestra cita <span>♡</span>
        </button>
      </form>
      <p className="tiny-note">Amo demasiado cada momento que compartimos.</p>
    </section>
  );
}
