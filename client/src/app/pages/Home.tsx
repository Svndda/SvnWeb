import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex-col gap-md centered text-center">
      <h1>Bienvenido a la Plataforma</h1>
      <p className="color-muted">Selecciona una aplicación de servicio para comenzar.</p>
      
      <div className="card flex-col gap-md centered">
        <div className="flex gap-md">
        </div>
        <button 
          className="button" 
          onClick={() => setCount((c) => c + 1)}
        >
          El contador es {count}
        </button>
      </div>
    </div>
  );
}