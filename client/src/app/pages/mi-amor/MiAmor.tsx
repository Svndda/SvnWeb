import { useEffect, useRef, useState } from 'react';
import '../../../styles/MiAmor.css';
import { playSound } from './audio/soundEngine';
import { useAudioLifecycle } from './audio/useAudioLifecycle';
import { DateCard } from './components/DateCard';
import { GameSection } from './components/GameSection';
import { LoveFooter } from './components/LoveFooter';
import { LoveHeader } from './components/LoveHeader';
import { ProposalCard } from './components/ProposalCard';
import { useCandyGame } from './hooks/useCandyGame';
import { useDateReached } from './hooks/useDateReached';
import { useSavedDate } from './hooks/useSavedDate';

export default function MiAmor() {
  useAudioLifecycle();
  const saved = useSavedDate();
  const dateReached = useDateReached(saved.date);
  const game = useCandyGame();
  const [answered, setAnswered] = useState(false);

  // Guardamos el nivel actual en el que el jugador inicia la sesión.
  const currentPlayingLevel = useRef(game.level);

  useEffect(() => {
    if (game.level < currentPlayingLevel.current) {
      currentPlayingLevel.current = game.level;
    }
  }, [game.level]);

  const isLevelCompleted = game.level > currentPlayingLevel.current;
  const canAsk = isLevelCompleted && dateReached;

  const handleSaveDate = () => {
    if (!saved.save()) return;
    game.reset();
    playSound('save');
  };

  const handleResetDate = () => {
    saved.clear();
    game.reset();
    setAnswered(false);
    playSound('reset');
  };

  const handleAnswer = () => {
    setAnswered(true);
    playSound('yes');
  };

  let content;
  if (saved.date && canAsk) content = <ProposalCard answered={answered} date={saved.date} onAnswer={handleAnswer} />;
  else if (saved.date) content = <GameSection game={game} date={saved.date} />;
  else content = <DateCard value={saved.dateValue} onChange={saved.setDateValue} onSubmit={handleSaveDate} />;

  return (
      <main className="love-page">
        <div className="love-glow love-glow-one" />
        <div className="love-glow love-glow-two" />
        <div className="love-shell">
          <LoveHeader />
          {content}
          <LoveFooter onResetDate={handleResetDate} />
        </div>
      </main>
  );
}