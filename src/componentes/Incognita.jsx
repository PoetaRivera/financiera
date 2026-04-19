import "./incognita.css";
import { subtitulos } from "../variables/variables.js";

// valores: array de strings — cada uno es valor y etiqueta del radio button
export default function Incognita({ valores, incognita, setIncognita, deshabilitado, nameGroup = "incognita" }) {
  function manejaIncognita(e) {
    setIncognita(e.target.value);
  }

  return (
    <section className="incognita" aria-labelledby="incognita-titulo">
      <h3 id="incognita-titulo" className="incognita-subtitulo">{subtitulos[1]}</h3>
      <aside className="incognita-input" role="radiogroup" aria-labelledby="incognita-titulo">
        {valores.map((val, idx) => (
          <article key={val}>
            <input
              id={`radio-inc-${nameGroup}-${idx}`}
              disabled={deshabilitado}
              type="radio"
              name={nameGroup}
              onChange={manejaIncognita}
              checked={val === incognita}
              value={val}
              aria-label={`Seleccionar ${val} como incógnita`}
            />
            <label htmlFor={`radio-inc-${nameGroup}-${idx}`}>{val}</label>
          </article>
        ))}
      </aside>
    </section>
  );
}
