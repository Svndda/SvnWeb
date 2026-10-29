import { DatePill } from './DatePill';

type ProposalCardProps = { answered: boolean; date: Date; onAnswer: () => void };

export function ProposalCard({ answered, date, onAnswer }: ProposalCardProps) {
  return (
    <section className="proposal-card">
      <span className="eyebrow">CON TODO MI AMOR</span>
      <div className="proposal-heart">♥</div>
      {answered ? (
        <>
          <h1>
            ¡Te amo <em> mucho!</em>
          </h1>
          <p className="love-copy">Gracias por decir que sí, Mi amor. Quiero compartir mi vida y tiempo contigo.</p>
          <DatePill date={date} className="proposal-date" />
        </>
      ) : (
        <>
          <h1>
            ¿Quieres ser <em>mi novia</em>?
          </h1>
          <p className="love-copy">
            Mi amor, desde el primer día me gustaste demasiado, y cada día me encantas más. Me encantaría seguir creando juntos.
          </p>
          <div className="answer-buttons">
            <button type="button" className="love-button" onClick={onAnswer}>
              ¡Sí, quiero! <span>♡</span>
            </button>
            <button type="button" className="soft-button" onClick={onAnswer}>
              ¡Claro que sí! ✨
            </button>
          </div>
          <p className="tiny-note">Gracias por cada momento que hemos compartido.</p>
        </>
      )}
    </section>
  );
}
