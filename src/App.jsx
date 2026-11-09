import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ChiSiamo from './pages/ChiSiamo';
import Servizi from './pages/Servizi';
import Contatti from './pages/Contatti';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="chi-siamo" element={<ChiSiamo />} />
        <Route path="servizi" element={<Servizi />} />
        <Route path="contatti" element={<Contatti />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
