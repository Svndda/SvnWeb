import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './app/pages/Home';
import Services from './app/pages/Services';
import Portfolio from './app/pages/ucr/Portfolio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Todas las rutas dentro de este bloque compartirán el MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Portfolio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;