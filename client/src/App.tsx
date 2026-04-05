import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './app/pages/Home';
import HomeUCR from './app/pages/ucr/HomeUCR';
import Services from './app/pages/Services';
import SecondaryLayout from './layouts/SecondaryLayout';
import type { SecondaryLayoutProps } from './layouts/SecondaryLayout';

const josheManicuristaLinks : SecondaryLayoutProps['navLinks'] = [
  { label: 'Inicio', route: '/joshe-manicurista' },
  { label: 'Servicios', route: '/joshe-manicurista/services' },
  { label: 'Contacto', route: '/joshe-manicurista/contact' },
];

const appUCRLinks : SecondaryLayoutProps['navLinks'] = [
  { label: 'Inicio', route: '/app-ucr' },
  // { label: 'Proyectos', route: '/app-ucr/projects' },
];

// const settingsLinks : SecondaryLayoutProps['settingsLinks'] = [
//   { label: 'Configuración', route: '/settings' },
//   { label: 'Cerrar sesión', route: '/logout' },
// ];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main web routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
        </Route>

        { /* JosheManicurista related routes*/}
        <Route path="/joshe-manicurista" element={<SecondaryLayout appName="Joshe Manicurista" navLinks={josheManicuristaLinks} /* settingsLinks={settingsLinks} */ />}>
          <Route path="services" element={<Services />} />
         </Route>

        { /* App UCR related routes*/}
        <Route path="/app-ucr" element={<SecondaryLayout appName="App UCR" navLinks={appUCRLinks} /* settingsLinks={settingsLinks} *//>}> 
          <Route path="/app-ucr" element={<HomeUCR />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;