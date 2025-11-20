import Interes from './paginas/InteresPagina'

import Tasas from "./paginas/TasasPagina";
import Descuento from "./paginas/DescuentoPagina";
import Inicio from "./paginas/InicioPagina";
import Error404 from "./paginas/Error404";
import SEOContent from './componentes/SEOContent';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BarraNavegacion from './componentes/BarraNavegacion';
import { useState } from 'react';

function App() {
  const [tipo, setTipo] = useState(0);
  
  return (
    <BrowserRouter className='Browser'>
      {/* Contenido SEO para motores de búsqueda */}
      <SEOContent />

      <BarraNavegacion tipo={tipo} setTipo={setTipo}></BarraNavegacion>
      <Routes className='routes'>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/Interes"
          element={
            <Interes
              className='interes'
              key="interes"
              name="interes"
              tipo={tipo}
              setTipo={setTipo}
            />
          }
        />
        <Route
          path="/Anualidades"
          element={
            <Interes
              key="anualidades"
              name="anualidades"
              tipo={tipo}
              setTipo={setTipo}
            />
          }
        />
        <Route path="/Tasas" element={<Tasas />} />
        <Route path="/Descuento" element={<Descuento />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
