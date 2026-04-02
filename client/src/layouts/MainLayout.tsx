import { Outlet, Link } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="app">
      <header className="container flex">
        <nav className="gap-md flex">
          <Link to="/" className="button">Inicio</Link>
          <Link to="/services" className="button">Servicios</Link>
          <Link to="/portfolio" className="button">Portfolio</Link>
        </nav>
      </header>

      <main className="container flex-col centered" style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
      
    </div>
  );
}