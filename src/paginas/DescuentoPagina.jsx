import { useState, useEffect } from "react";
import "./interes.css";
import milogo from "../imagenes/financiera1024.png";
import Incognita from "../componentes/Incognita";
import Datos from "../componentes/Datos";
import Resultados from "../componentes/Resultados";
import Calcular from "../componentes/Calcular";
import { alertaMensaje } from "../funciones/alertaMensaje";
import { esNumeroValido } from "../funciones/validarInput";
import { verificaSeleccionDescuento } from "../funciones/verificaSeleccionDescuento";
import { determinaCasoDescuento } from "../funciones/determinaCasoDescuento";
import { ejecutaCasoDescuento } from "../funciones/ejecutaCasoDescuento";
import { operacionesDescuento } from "../funciones/operacionesDescuento";

const INCOGNITAS = ["D", "Vf", "Va", "d", "n"];

const RESULTADO_LABEL = ["D = ", "Vf = ", "Va = ", "d = ", "n = "];
function labelResultado(caso) {
  if (caso <= 3)  return RESULTADO_LABEL[0];
  if (caso <= 6)  return RESULTADO_LABEL[1];
  if (caso <= 9)  return RESULTADO_LABEL[2];
  if (caso <= 12) return RESULTADO_LABEL[3];
  return RESULTADO_LABEL[4];
}

const LABELS_VALIDACION = {
  1:  ['Vf', 'Va'],
  2:  ['Va', 'd', 'n'],
  3:  ['Vf', 'd', 'n'],
  4:  ['Va', 'D'],
  5:  ['D',  'd', 'n'],
  6:  ['Va', 'd', 'n'],
  7:  ['Vf', 'D'],
  8:  ['D',  'd', 'n'],
  9:  ['Vf', 'd', 'n'],
  10: ['Vf', 'Va', 'n'],
  11: ['Vf', 'D',  'n'],
  12: ['Va', 'D',  'n'],
  13: ['Vf', 'Va', 'd'],
  14: ['Vf', 'D',  'd'],
  15: ['D',  'Va', 'd'],
};

// Mapa declarativo: caso → { d1: setter, d2: setter, d3?: setter }
// Se construye dentro del componente para acceder a los setters de estado
function buildCamposPorCaso(setVf, setVa, setDD, setDd, setNn) {
  return {
    1:  { d1: setVf, d2: setVa },
    2:  { d1: setVa, d2: setDd, d3: setNn },
    3:  { d1: setVf, d2: setDd, d3: setNn },
    4:  { d1: setVa, d2: setDD },
    5:  { d1: setDD, d2: setDd, d3: setNn },
    6:  { d1: setVa, d2: setDd, d3: setNn },
    7:  { d1: setVf, d2: setDD },
    8:  { d1: setDD, d2: setDd, d3: setNn },
    9:  { d1: setVf, d2: setDd, d3: setNn },
    10: { d1: setVf, d2: setVa, d3: setNn },
    11: { d1: setVf, d2: setDD, d3: setNn },
    12: { d1: setVa, d2: setDD, d3: setNn },
    13: { d1: setVf, d2: setVa, d3: setDd },
    14: { d1: setVf, d2: setDD, d3: setDd },
    15: { d1: setDD, d2: setVa, d3: setDd },
  };
}

// Qué valores usar para calcular cada caso
const GRUPOS_VALIDACION = {
  1:  (s) => [s.vf, s.va],
  2:  (s) => [s.va, s.dd, s.nn],
  3:  (s) => [s.vf, s.dd, s.nn],
  4:  (s) => [s.va, s.dD],
  5:  (s) => [s.dD, s.dd, s.nn],
  6:  (s) => [s.va, s.dd, s.nn],
  7:  (s) => [s.vf, s.dD],
  8:  (s) => [s.dD, s.dd, s.nn],
  9:  (s) => [s.vf, s.dd, s.nn],
  10: (s) => [s.vf, s.va, s.nn],
  11: (s) => [s.vf, s.dD, s.nn],
  12: (s) => [s.va, s.dD, s.nn],
  13: (s) => [s.vf, s.va, s.dd],
  14: (s) => [s.vf, s.dD, s.dd],
  15: (s) => [s.dD, s.va, s.dd],
};

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

  const camposPorCaso = buildCamposPorCaso(setVf, setVa, setDD, setDd, setNn);

  useEffect(() => {
    setDD(0); setVf(0); setVa(0); setDd(0); setNn(0);
    setResultado("");
    const resetMostrar = Array(4).fill(false);
    const resetTexto   = Array(4).fill(false);
    setMostrar(resetMostrar);
    setTexto(resetTexto);

    if (verificaSeleccionDescuento(incognita, D, Vf, Va, d, n) === 0) {
      const numCaso = determinaCasoDescuento(incognita, D, Vf, Va, d, n);
      if (numCaso !== undefined) {
        ejecutaCasoDescuento(numCaso, resetTexto, setTexto, resetMostrar, setMostrar, setCaso, null);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incognita, D, Vf, Va, d, n]);

  function manejarEntrada(e) {
    const setter = camposPorCaso[caso]?.[e.target.name];
    if (setter) setter(e.target.value);
  }

  function verificaEntradas() {
    const vals   = GRUPOS_VALIDACION[caso]?.({ dD, vf, va, dd, nn });
    const labels = LABELS_VALIDACION[caso] || [];
    if (!vals) return;

    for (let idx = 0; idx < vals.length; idx++) {
      const v     = vals[idx];
      const label = labels[idx] || `Campo ${idx + 1}`;
      if (v === undefined || v === "" || v === 0) {
        alertaMensaje(`Ingrese el valor de "${label}"`);
        return;
      }
      if (!esNumeroValido(v)) {
        alertaMensaje(`"${label}" debe ser un número válido`);
        return;
      }
      if (Number(v) <= 0) {
        alertaMensaje(`"${label}" debe ser mayor que cero`);
        return;
      }
    }

    const res = operacionesDescuento(caso, dD, vf, va, dd, nn);
    if (res === null) {
      alertaMensaje("d × n debe ser menor que 1 para este cálculo");
      return;
    }
    const esResultadoTasa = caso >= 10 && caso <= 12;
    const resFormateado = esResultadoTasa
      ? `${res}  (${(parseFloat(res) * 100).toFixed(4)}%)`
      : res;
    texto[3] = labelResultado(caso);
    setTexto([...texto]);
    mostrar[3] = true;
    setMostrar([...mostrar]);
    setResultado(resFormateado);
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

      <Incognita
        deshabilitado={deshabilitado}
        valores={INCOGNITAS}
        incognita={incognita}
        setIncognita={setIncognita}
        nameGroup="incognita-desc"
      />

      <Datos
        deshabilitado={deshabilitado}
        valores={INCOGNITAS.map((v) => ({ label: v, key: v }))}
        datos={datos}
        setDatos={setDatos}
        incognitaKey={incognita}
      />

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
