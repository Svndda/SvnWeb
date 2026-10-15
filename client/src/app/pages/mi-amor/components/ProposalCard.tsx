import { DatePill } from './DatePill';

type ProposalCardProps = { answered: boolean; date: Date; onAnswer: () => void };

export function ProposalCard({ answered, date, onAnswer }: ProposalCardProps) {
  return (
    <section className="proposal-card">
      <span className="eyebrow">CON TODO MI CORAZÓN</span>
      <div className="proposal-heart">♥</div>
      {answered ? (
        <>
          <h1>
            ¡Me haces <em>muy feliz!</em>
          </h1>
          <p className="love-copy">Gracias por decir que sí, Mi amor. Esta es la primera página de una historia preciosa. ♡</p>
          <DatePill date={date} className="proposal-date" />
        </>
      ) : (
        <>
          <h1>
            ¿Quieres ser <em>mi novia</em>?
          </h1>
          <p className="love-copy">
            Mi amor, desde que llegaste a mi vida, cada día tiene algo más bonito. Me encantaría seguir creando momentos contigo.
          </p>
          <div className="answer-buttons">
            <button type="button" className="love-button" onClick={onAnswer}>
              ¡Sí, quiero! <span>♡</span>
            </button>
            <button type="button" className="soft-button" onClick={onAnswer}>
              ¡Claro que sí! ✨
            </button>
          </div>
          <p className="tiny-note">Gracias por compartir conmigo este momento tan especial.</p>
        </>
      )}
    </section>
  );
}
