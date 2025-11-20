/* eslint-disable react/prop-types */
import "./incognita.css";
import { subtitulos } from "../variables/variables.js";

export default function Incognita({
  valor1,
  valor2,
  valor3,
  valor4,
  valor5,
  incognita,
  setIncognita,
  deshabilitado,
}) {
  
  function manejaIncognita(e) {
    setIncognita(e.target.value);
  }

  return (
    <section className="incognita" aria-labelledby="incognita-titulo">
      <h3 id="incognita-titulo" className="incognita-subtitulo">{subtitulos[1]}</h3>
      <aside className="incognita-input" role="radiogroup" aria-labelledby="incognita-titulo">
        <article>
          <input
            id="radio3"
            disabled={deshabilitado}
            type="radio"
            name="incognita"
            onChange={manejaIncognita}
            checked={valor1 === incognita}
            value={valor1}
            aria-label={`Seleccionar ${valor1} como incógnita`}
          />
          <label htmlFor="radio3">{valor1}</label>
        </article>
        <article>
          <input
            id="radio4"
            disabled={deshabilitado}
            type="radio"
            name="incognita"
            onChange={manejaIncognita}
            checked={valor2 === incognita}
            value={valor2}
            aria-label={`Seleccionar ${valor2} como incógnita`}
          />
          <label htmlFor="radio4">{valor2}</label>
        </article>
        <article>
          <input
            id="radio5"
            disabled={deshabilitado}
            type="radio"
            name="incognita"
            onChange={manejaIncognita}
            checked={valor3 === incognita}
            value={valor3}
            aria-label={`Seleccionar ${valor3} como incógnita`}
          />
          <label htmlFor="radio5">{valor3}</label>
        </article>
        <article>
          <input
            id="radio6"
            disabled={deshabilitado}
            type="radio"
            name="incognita"
            onChange={manejaIncognita}
            checked={valor4 === incognita}
            value={valor4}
            aria-label={`Seleccionar ${valor4} como incógnita`}
          />
          <label htmlFor="radio6">{valor4}</label>
        </article>
        <article>
          <input
            id="radio7"
            disabled={deshabilitado}
            type="radio"
            name="incognita"
            onChange={manejaIncognita}
            checked={valor5 === incognita}
            value={valor5}
            aria-label={`Seleccionar ${valor5} como incógnita`}
          />
          <label htmlFor="radio7">{valor5}</label>
        </article>
      </aside>
    </section>
  );
}
