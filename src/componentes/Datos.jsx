import "./datos.css";
import { subtitulos } from "../variables/variables.js";

export default function Datos({
  valor1,
  valor2,
  valor3,
  valor4,
  valor5,
  datos,
  setDatos,
  deshabilitado,
}) {
 // setDatos(datos);

  function manejaDatos(e) {
    let mivalor=''
    e.target.value === 'R' ? mivalor = 'I' : mivalor = e.target.value;
    setDatos({ ...datos, [mivalor]: e.target.checked });
   
  }

  return (
    <section className="datos" aria-labelledby="datos-titulo">
      <h3 id="datos-titulo" className="datos-subtitulo">{subtitulos[2]}</h3>
      <aside className="datos-input" role="group" aria-label="Selección de datos conocidos">
        <article>
          <label htmlFor="dato1">
            <input
              id="dato1"
              disabled={deshabilitado}
              type="checkbox"
              name="dato1"
              onChange={manejaDatos}
              value={valor1}
              checked={datos.I}
              aria-label={`Seleccionar ${valor1} como dato conocido`}
            />
            {valor1}
          </label>
        </article>
        <article>
          <label htmlFor="dato2">
            <input
              id="dato2"
              disabled={deshabilitado}
              type="checkbox"
              name="dato2"
              onChange={manejaDatos}
              value={valor2}
              checked={datos.Vf}
              aria-label={`Seleccionar ${valor2} como dato conocido`}
            />
            {valor2}
          </label>
        </article>
        <article>
          <label htmlFor="dato3">
            <input
              id="dato3"
              disabled={deshabilitado}
              type="checkbox"
              name="dato3"
              onChange={manejaDatos}
              value={valor3}
              checked={datos.Va}
              aria-label={`Seleccionar ${valor3} como dato conocido`}
            />
            {valor3}
          </label>
        </article>
        <article>
          <label htmlFor="dato4">
            <input
              id="dato4"
              disabled={deshabilitado}
              type="checkbox"
              name="dato4"
              onChange={manejaDatos}
              value={valor4}
              checked={datos.i}
              aria-label={`Seleccionar ${valor4} como dato conocido`}
            />
            {valor4}
          </label>
        </article>
        <article>
          <label htmlFor="dato5">
            <input
              id="dato5"
              disabled={deshabilitado}
              type="checkbox"
              name="dato5"
              onChange={manejaDatos}
              value={valor5}
              checked={datos.n}
              aria-label={`Seleccionar ${valor5} como dato conocido`}
            />
            {valor5}
          </label>
        </article>
      </aside>
    </section>
  );
}
