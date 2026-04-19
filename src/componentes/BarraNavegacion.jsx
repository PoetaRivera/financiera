import { NavLink } from "react-router-dom";
import "./baraNavegacion.css";

export default function BarraNavegacion() {
  return (
    <nav className="links">
      <NavLink className="link" to="/">Inicio</NavLink>
      <NavLink className="link" to="/Interes">Interés</NavLink>
      <NavLink className="link" to="/Anualidades">Anualidad</NavLink>
      <NavLink className="link" to="/Tasas">Tasas</NavLink>
      <NavLink className="link" to="/Descuento">Descuento</NavLink>
    </nav>
  );
}
