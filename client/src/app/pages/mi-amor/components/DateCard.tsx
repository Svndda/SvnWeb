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
      <span className="eyebrow">PARA ALGUIEN MUY ESPECIAL</span>
      <div className="hero-heart" aria-hidden="true">
        ♡
      </div>
      <h1>
        Una cita para <em>Mi amor</em>
      </h1>
      <p className="love-copy">
        Quiero invitarte a una noche bonita, de esas que se quedan guardadas en el corazón. ¿Cuándo te gustaría que fuera?
      </p>
      <form className="date-form" onSubmit={handleSubmit}>
        <label htmlFor="date">Elige la fecha y la hora</label>
        <input id="date" type="datetime-local" value={value} min={min} onChange={(event) => onChange(event.target.value)} required />
        <button className="love-button" type="submit">
          Guardar nuestra cita <span>♡</span>
        </button>
      </form>
      <p className="tiny-note">Este momento empieza con una fecha… y un poquito de magia.</p>
    </section>
  );
}
