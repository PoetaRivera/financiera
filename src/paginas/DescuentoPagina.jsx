import { useState } from "react";
import "./interes.css";
import milogo from "../imagenes/financiera1024.png";
import Seleccion from "../componentes/Seleccion";
import Resultados from "../componentes/Resultados";
import Calcular from "../componentes/Calcular";
import { alertaMensaje } from "../funciones/alertaMensaje";
import { esNumeroValido } from "../funciones/validarInput";
import { verificaSeleccionDescuento } from "../funciones/verificaSeleccionDescuento";
import { determinaCasoDescuento } from "../funciones/determinaCasoDescuento";
import { ejecutaCasoDescuento } from "../funciones/ejecutaCasoDescuento";
import { operacionesDescuento } from "../funciones/operacionesDescuento";

// Etiqueta del resultado según el caso
const RESULTADO_LABEL = ["D = ", "Vf = ", "Va = ", "d = ", "n = "];
function labelResultado(caso) {
  if (caso <= 3) return RESULTADO_LABEL[0];
  if (caso <= 6) return RESULTADO_LABEL[1];
  if (caso <= 9) return RESULTADO_LABEL[2];
  if (caso <= 12) return RESULTADO_LABEL[3];
  return RESULTADO_LABEL[4];
}

export default function Descuento() {
  const [muestraAyuda, setMuestraAyuda] = useState(false);
  const [incognita, setIncognita] = useState("D");
  const [datos, setDatos] = useState({ D: false, Vf: false, Va: false, d: false, n: false });
  const [caso, setCaso] = useState(0);
  const [deshabilitado, setDeshabilitado] = useState(false);
  const [mostrar, setMostrar] = useState(Array(4).fill(false));
  const [texto, setTexto] = useState(Array(4).fill(false));
  const [resultado, setResultado] = useState("");

  const [dD, setDD] = useState(0);
  const [vf, setVf] = useState(0);
  const [va, setVa] = useState(0);
  const [dd, setDd] = useState(0);
  const [nn, setNn] = useState(0);

  const { D, Vf, Va, d, n } = datos;

  function manejaDatos(e) {
    setDatos({ ...datos, [e.target.value]: e.target.checked });
  }

  function obtenerCaso() {
    if (verificaSeleccionDescuento(incognita, D, Vf, Va, d, n) === 0) {
      const numCaso = determinaCasoDescuento(incognita, D, Vf, Va, d, n);
      if (numCaso === undefined) {
        alertaMensaje("Selección no válida");
        return;
      }
      ejecutaCasoDescuento(numCaso, texto, setTexto, mostrar, setMostrar, setCaso, setDeshabilitado);
    }
  }

  function manejarEntrada(e) {
    const { name, value } = e.target;
    switch (caso) {
      case 1:
        if (name === "d1") setVf(value);
        if (name === "d2") setVa(value);
        break;
      case 2:
      case 6:
        if (name === "d1") setVa(value);
        if (name === "d2") setDd(value);
        if (name === "d3") setNn(value);
        break;
      case 3:
      case 9:
        if (name === "d1") setVf(value);
        if (name === "d2") setDd(value);
        if (name === "d3") setNn(value);
        break;
      case 4:
        if (name === "d1") setVa(value);
        if (name === "d2") setDD(value);
        break;
      case 5:
      case 8:
        if (name === "d1") setDD(value);
        if (name === "d2") setDd(value);
        if (name === "d3") setNn(value);
        break;
      case 7:
        if (name === "d1") setVf(value);
        if (name === "d2") setDD(value);
        break;
      case 10:
        if (name === "d1") setVf(value);
        if (name === "d2") setVa(value);
        if (name === "d3") setNn(value);
        break;
      case 11:
        if (name === "d1") setVf(value);
        if (name === "d2") setDD(value);
        if (name === "d3") setNn(value);
        break;
      case 12:
        if (name === "d1") setVa(value);
        if (name === "d2") setDD(value);
        if (name === "d3") setNn(value);
        break;
      case 13:
        if (name === "d1") setVf(value);
        if (name === "d2") setVa(value);
        if (name === "d3") setDd(value);
        break;
      case 14:
        if (name === "d1") setVf(value);
        if (name === "d2") setDD(value);
        if (name === "d3") setDd(value);
        break;
      case 15:
        if (name === "d1") setDD(value);
        if (name === "d2") setVa(value);
        if (name === "d3") setDd(value);
        break;
      default:
        break;
    }
  }

  function verificaEntradas() {
    const grupos = {
      1:  [vf, va],
      2:  [va, dd, nn],
      3:  [vf, dd, nn],
      4:  [va, dD],
      5:  [dD, dd, nn],
      6:  [va, dd, nn],
      7:  [vf, dD],
      8:  [dD, dd, nn],
      9:  [vf, dd, nn],
      10: [vf, va, nn],
      11: [vf, dD, nn],
      12: [va, dD, nn],
      13: [vf, va, dd],
      14: [vf, dD, dd],
      15: [dD, va, dd],
    };
    const vals = grupos[caso];
    if (!vals) return;

    for (const v of vals) {
      if (v === undefined || v === "" || v === 0) {
        alertaMensaje("Ingrese todos los datos conocidos");
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

    texto[3] = labelResultado(caso);
    setTexto([...texto]);
    mostrar[3] = true;
    setMostrar([...mostrar]);
    setResultado(operacionesDescuento(caso, dD, vf, va, dd, nn));
  }

  function limpiar() {
    setCaso(0);
    setIncognita("D");
    setDatos({ D: false, Vf: false, Va: false, d: false, n: false });
    setMostrar(Array(4).fill(false));
    setTexto(Array(4).fill(false));
    setResultado("");
    setDeshabilitado(false);
    setDD(0); setVf(0); setVa(0); setDd(0); setNn(0);
  }

  const incognitas = ["D", "Vf", "Va", "d", "n"];

  return (
    <main className="principal">
      <div className="cabecera-principal">
        <header>
          <div className="cabecera">
            <h2 className="titulo">Descuento</h2>
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
            <span>1. Seleccione la variable incógnita.</span>
            <span>2. Seleccione los datos conocidos.</span>
            <span>3. Dé clic en &quot;Introducir datos&quot;.</span>
            <span>4. Introduzca los datos conocidos.</span>
            <span>5. Dé clic en &quot;Calcular&quot;.</span>
            <span>6. Dé clic en &quot;Limpiar&quot; para reiniciar.</span>
          </section>
          <section className="definiciones">
            <span className="miTitulo">Definiciones:</span>
            <span>D: es el descuento</span>
            <span>Vf: es el valor futuro (nominal)</span>
            <span>Va: es el valor actual (líquido)</span>
            <span>d: es la tasa de descuento (decimal)</span>
            <span>n: es el número de períodos</span>
          </section>
        </div>
      )}

      {/* Incógnita */}
      <section className="incognita" aria-labelledby="incognita-desc-titulo">
        <h3 id="incognita-desc-titulo" className="incognita-subtitulo">
          1. Seleccione la incógnita
        </h3>
        <aside className="incognita-input" role="radiogroup">
          {incognitas.map((val, idx) => (
            <article key={val}>
              <input
                id={`desc-inc-${idx}`}
                disabled={deshabilitado}
                type="radio"
                name="incognita-desc"
                value={val}
                checked={incognita === val}
                onChange={(e) => setIncognita(e.target.value)}
                aria-label={`Seleccionar ${val} como incógnita`}
              />
              <label htmlFor={`desc-inc-${idx}`}>{val}</label>
            </article>
          ))}
        </aside>
      </section>

      {/* Datos conocidos */}
      <section className="datos" aria-labelledby="datos-desc-titulo">
        <h3 id="datos-desc-titulo" className="datos-subtitulo">
          2. Seleccione datos conocidos
        </h3>
        <aside className="datos-input" role="group">
          {incognitas.map((val, idx) => (
            <article key={val}>
              <label htmlFor={`desc-dato-${idx}`}>
                <input
                  id={`desc-dato-${idx}`}
                  disabled={deshabilitado}
                  type="checkbox"
                  value={val}
                  checked={!!datos[val]}
                  onChange={manejaDatos}
                  aria-label={`Seleccionar ${val} como dato conocido`}
                />
                {val}
              </label>
            </article>
          ))}
        </aside>
      </section>

      <Seleccion obtenerCaso={obtenerCaso} deshabilitado={deshabilitado} />

      {!mostrar[0] && <img className="logo" alt="Logo Financiera" src={milogo} />}

      <Resultados
        manejarEntrada={manejarEntrada}
        mostrar={mostrar}
        texto={texto}
        resultado={resultado}
      />

      <Calcular verificaEntradas={verificaEntradas} limpiar={limpiar} />
    </main>
  );
}
