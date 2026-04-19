import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./baraNavegacion.css";

function getInitialTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export default function BarraNavegacion() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <nav className="links">
      <NavLink className="link" to="/">Inicio</NavLink>
      <NavLink className="link" to="/Interes">Interés</NavLink>
      <NavLink className="link" to="/Anualidades">Anualidad</NavLink>
      <NavLink className="link" to="/Tasas">Tasas</NavLink>
      <NavLink className="link" to="/Descuento">Descuento</NavLink>
      <NavLink className="link" to="/Acerca">Acerca</NavLink>
      <button className="link tema-toggle" onClick={toggleTheme} title="Cambiar tema">
        {theme === "dark" ? "Claro" : "Oscuro"}
      </button>
    </nav>
  );
}
