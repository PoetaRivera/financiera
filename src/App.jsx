import Interes from './paginas/InteresPagina'
import Tasas from "./paginas/TasasPagina";
import Descuento from "./paginas/DescuentoPagina";
import Inicio from "./paginas/InicioPagina";
import Acerca from "./paginas/AcercaPagina";
import Amortizacion  from "./paginas/AmortizacionPagina";
import Gradientes    from "./paginas/GradientesPagina";
import VpnTir        from "./paginas/VpnTirPagina";
import Depreciacion  from "./paginas/DepreciacionPagina";
import Error404 from "./paginas/Error404";
import SEOContent from './componentes/SEOContent';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BarraNavegacion from './componentes/BarraNavegacion';

function App() {
  return (
    <BrowserRouter>
      <SEOContent />
      <BarraNavegacion />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Interes"    element={<Interes key="interes"     tipo={0} />} />
        <Route path="/Anualidades" element={<Interes key="anualidades" tipo={1} />} />
        <Route path="/Tasas"      element={<Tasas />} />
        <Route path="/Descuento"  element={<Descuento />} />
        <Route path="/Acerca"        element={<Acerca />} />
        <Route path="/Amortizacion"  element={<Amortizacion />} />
        <Route path="/Gradientes"    element={<Gradientes />} />
        <Route path="/VpnTir"        element={<VpnTir />} />
        <Route path="/Depreciacion"  element={<Depreciacion />} />
        <Route path="*"           element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
