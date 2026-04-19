import "./datos.css";
import { subtitulos } from "../variables/variables.js";

// valores: array de { label, key } donde label se muestra y key es la clave en el objeto datos
// incognitaKey: key de la variable seleccionada como incógnita — se deshabilita para no seleccionarla como dato
export default function Datos({ valores, datos, setDatos, deshabilitado, incognitaKey }) {
  function manejaDatos(e) {
    setDatos({ ...datos, [e.target.name]: e.target.checked });
  }

  return (
    <section className="datos" aria-labelledby="datos-titulo">
      <h3 id="datos-titulo" className="datos-subtitulo">{subtitulos[2]}</h3>
      <aside className="datos-input" role="group" aria-label="Selección de datos conocidos">
        {valores.map(({ label, key }, idx) => {
          const esIncognita = key === incognitaKey;
          return (
            <article key={key}>
              <label htmlFor={`dato${idx + 1}`} style={esIncognita ? { opacity: 0.4 } : {}}>
                <input
                  id={`dato${idx + 1}`}
                  disabled={deshabilitado || esIncognita}
                  type="checkbox"
                  name={key}
                  onChange={manejaDatos}
                  value={label}
                  checked={!!datos[key]}
                  aria-label={`Seleccionar ${label} como dato conocido`}
                />
                {label}
              </label>
            </article>
          );
        })}
      </aside>
    </section>
  );
}
