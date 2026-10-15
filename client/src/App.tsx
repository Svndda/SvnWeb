import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './app/pages/Home';
import HomeUCR from './app/pages/ucr/HomeUCR';
import Biography from './app/pages/ucr/Biography';
import Services from './app/pages/Services';
import SecondaryLayout from './layouts/SecondaryLayout';
import type { SecondaryLayoutProps } from './layouts/SecondaryLayout';
import HomeJM from './app/pages/joshe/Home';
import MiAmor from './app/pages/mi-amor/MiAmor';

const josheManicuristaLinks : SecondaryLayoutProps['navLinks'] = [
  { label: 'Inicio', route: '/joshe-manicurista' },
  // { label: 'Servicios', route: '/joshe-manicurista/services' },
  // { label: 'Contacto', route: '/joshe-manicurista/contact' },
];

const appUCRLinks : SecondaryLayoutProps['navLinks'] = [
  { label: 'Inicio', route: '/app-ucr' },
  { label: 'Biografía', route: '/app-ucr/biography' },
];

const myLoveLinks : SecondaryLayoutProps['navLinks'] = [
  { label: 'Inicio', route: '/mi-amor' },
  { label: 'Juego', route: '/mi-amor/game' },
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
          <Route index element={<HomeJM/>} />  
        </Route>

        { /* App UCR related routes*/}
        <Route path="/app-ucr" element={<SecondaryLayout appName="App UCR" navLinks={appUCRLinks} /* settingsLinks={settingsLinks} *//>}> 
          <Route index element={<HomeUCR />} />
          <Route path="biography" element = {<Biography />} />
        </Route>

        { /* Mi Amor related routes*/}
        <Route path="/mi-amor" element={<SecondaryLayout appName="Mi Amor" navLinks={myLoveLinks} /* settingsLinks={settingsLinks} */ />}>
          <Route index element={<MiAmor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
