import { Countdown } from './Countdown';

export function WaitingCard({ date }: { date: Date }) {
  return (
    <div className="waiting-card">
      <span className="waiting-heart">♥</span>
      <div>
        <strong>¡Nivel superado, Mi amor!</strong>
        <p>La sorpresa se abrirá cuando llegue nuestra cita.</p>
        <Countdown target={date} />
      </div>
    </div>
  );
}
