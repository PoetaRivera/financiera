import { useState } from "react";
import "./interes.css";
import milogo from "../imagenes/financiera1024.png";
import Calcular from "../componentes/Calcular";
import { alertaMensaje } from "../funciones/alertaMensaje";
import { esNumeroValido } from "../funciones/validarInput";
import { operacionesTasas as calcularTasas } from "../funciones/operacionesTasas";

// Casos: 1=calcular i, 2=calcular j, 3=calcular d, 4=calcular ir
const OPCIONES = [
  { value: 1, label: "i  (Tasa Efectiva)" },
  { value: 2, label: "j  (Tasa Nominal)" },
  { value: 3, label: "d  (Desc. Comercial)" },
  { value: 4, label: "ir (Tasa Real)" },
];

const CONFIG = {
  1: { labels: ["j (nominal)", "m (cap./año)", "n (períodos)"], campos: 3, resultado: "i = " },
  2: { labels: ["i (efectiva)", "m (cap./año)", "n (períodos)"], campos: 3, resultado: "j = " },
  3: { labels: ["ir (tasa real)", "n (períodos)", null],          campos: 2, resultado: "d = " },
  4: { labels: ["d (desc. com.)", "n (períodos)", null],          campos: 2, resultado: "ir = " },
};

export default function Tasas() {
  const [muestraAyuda, setMuestraAyuda] = useState(false);
  const [tipoCalc, setTipoCalc] = useState(1);
  const [deshabilitado, setDeshabilitado] = useState(false);
  const [mostrarInputs, setMostrarInputs] = useState(false);
  const [e1, setE1] = useState("");
  const [e2, setE2] = useState("");
  const [e3, setE3] = useState("");
  const [resultado, setResultado] = useState(null);

  function introducirDatos() {
    setMostrarInputs(true);
    setDeshabilitado(true);
    setResultado(null);
    setE1(""); setE2(""); setE3("");
  }

  function calcular() {
    const cfg = CONFIG[tipoCalc];
    const vals = cfg.campos === 3 ? [e1, e2, e3] : [e1, e2];

    for (const v of vals) {
      if (v === "" || v === undefined) {
        alertaMensaje("Ingrese todos los datos");
        return;
      }
      if (!esNumeroValido(v)) {
        alertaMensaje("Ingrese un número válido");
        return;
      }
      if (Number(v) <= 0) {
        alertaMensaje("Los valores deben ser mayores que cero");
        return;
      }
    }

    const res = calcularTasas(tipoCalc, e1, e2, e3);
    if (res === null) {
      alertaMensaje("n × d debe ser menor que 1 para calcular ir");
      return;
    }
    setResultado(`${cfg.resultado} ${res}`);
  }

  function limpiar() {
    setTipoCalc(1);
    setDeshabilitado(false);
    setMostrarInputs(false);
    setE1(""); setE2(""); setE3("");
    setResultado(null);
  }

  const cfg = CONFIG[tipoCalc];

  return (
    <main className="principal">
      <div className="cabecera-principal">
        <header>
          <div className="cabecera">
            <h2 className="titulo">Tasas</h2>
            <button className="boton-ayuda" onClick={() => setMuestraAyuda(!muestraAyuda)}>
              Ayuda
            </button>
          </div>
        </header>
      </div>

      {muestraAyuda && (
        <div className="definicion aparecer">
          <section className="indicaciones">
            <span className="miTitulo">Indicaciones:</span>
            <span>1. Seleccione qué tasa desea calcular.</span>
            <span>2. Dé clic en &quot;Introducir datos&quot;.</span>
            <span>3. Introduzca los datos requeridos (en decimal, ej: 0.05 para 5%).</span>
            <span>4. Dé clic en &quot;Calcular&quot;.</span>
            <span>5. Dé clic en &quot;Limpiar&quot; para reiniciar.</span>
          </section>
          <section className="definiciones">
            <span className="miTitulo">Definiciones:</span>
            <span>i: tasa de interés efectiva</span>
            <span>j: tasa de interés nominal</span>
            <span>d: tasa de descuento comercial</span>
            <span>ir: tasa de interés real</span>
            <span>m: número de capitalizaciones por año</span>
            <span>n: número de períodos (años)</span>
          </section>
        </div>
      )}

      {/* Selección del tipo de cálculo */}
      <section className="incognita" aria-labelledby="tasas-titulo">
        <h3 id="tasas-titulo" className="incognita-subtitulo">
          1. Seleccione qué calcular
        </h3>
        <aside className="incognita-input" role="radiogroup">
          {OPCIONES.map((op) => (
            <article key={op.value}>
              <input
                id={`tasas-opt-${op.value}`}
                disabled={deshabilitado}
                type="radio"
                name="tasas-tipo"
                value={op.value}
                checked={tipoCalc === op.value}
                onChange={() => setTipoCalc(op.value)}
                aria-label={op.label}
              />
              <label htmlFor={`tasas-opt-${op.value}`}>{op.label}</label>
            </article>
          ))}
        </aside>
      </section>

      {/* Botón Introducir datos */}
      <section className="seleccion">
        <button onClick={introducirDatos} disabled={deshabilitado}>
          Introducir datos
        </button>
      </section>

      {!mostrarInputs && <img className="logo" alt="Logo Financiera" src={milogo} />}

      {/* Campos de entrada */}
      {mostrarInputs && (
        <section className="resultados">
          <article>
            <input
              className="resultados-input"
              type="number"
              step="0.0001"
              placeholder={cfg.labels[0]}
              value={e1}
              onChange={(e) => setE1(e.target.value)}
            />
          </article>
          <article>
            <input
              className="resultados-input"
              type="number"
              step="0.0001"
              placeholder={cfg.labels[1]}
              value={e2}
              onChange={(e) => setE2(e.target.value)}
            />
          </article>
          {cfg.campos === 3 && (
            <article>
              <input
                className="resultados-input"
                type="number"
                step="0.0001"
                placeholder={cfg.labels[2]}
                value={e3}
                onChange={(e) => setE3(e.target.value)}
              />
            </article>
          )}
          {resultado !== null && (
            <article>
              <input
                className="resultados-input"
                readOnly
                type="text"
                value={resultado}
              />
            </article>
          )}
        </section>
      )}

      <Calcular verificaEntradas={calcular} limpiar={limpiar} />
    </main>
  );
}
