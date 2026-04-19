import { useState } from "react";
import "./interes.css";
import "./amortizacion.css";
import "./gradientes.css";
import Calcular from "../componentes/Calcular";
import { alertaMensaje } from "../funciones/alertaMensaje";
import { esNumeroValido } from "../funciones/validarInput";
import { gradienteAritmetico, gradienteGeometrico } from "../funciones/operacionesGradientes";

const TIPOS = [
  { value: "aritmetico", label: "Aritmético  (G fija)" },
  { value: "geometrico", label: "Geométrico  (g %)" },
];

function fmtNum(num) {
  return parseFloat(num).toLocaleString("es", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtBig(num) {
  return parseFloat(num).toFixed(6);
}

export default function Gradientes() {
  const [tipo, setTipo]       = useState("aritmetico");
  const [R, setR]             = useState("");
  const [G, setG]             = useState("");
  const [ii, setIi]           = useState("");
  const [nn, setNn]           = useState("");
  const [resultado, setResultado] = useState(null);

  const labelG = tipo === "aritmetico" ? "G — incremento fijo por período" : "g — tasa de crecimiento (decimal)";

  function calcular() {
    const campos = [
      [R,  "R (pago base)"],
      [G,  tipo === "aritmetico" ? "G (incremento)" : "g (tasa crecimiento)"],
      [ii, "i (tasa de interés)"],
      [nn, "n (períodos)"],
    ];
    for (const [val, label] of campos) {
      if (val === "") { alertaMensaje(`Ingrese el valor de "${label}"`); return; }
      if (!esNumeroValido(val)) { alertaMensaje(`"${label}" debe ser un número válido`); return; }
    }
    if (Number(R) <= 0) { alertaMensaje('"R" debe ser mayor que cero'); return; }
    if (Number(ii) <= 0) { alertaMensaje('"i" debe ser mayor que cero'); return; }
    const nNum = Math.round(Number(nn));
    if (nNum <= 0) { alertaMensaje('"n" debe ser mayor que cero'); return; }
    if (nNum > 600) { alertaMensaje('El número de períodos no puede superar 600'); return; }

    const res = tipo === "aritmetico"
      ? gradienteAritmetico(Number(R), Number(G), Number(ii), nNum)
      : gradienteGeometrico(Number(R), Number(G), Number(ii), nNum);

    setResultado(res);
  }

  function limpiar() { setR(""); setG(""); setIi(""); setNn(""); setResultado(null); }
  function reiniciar() { setTipo("aritmetico"); limpiar(); }

  return (
    <main className="principal">
      <div className="cabecera-principal">
        <header><div className="cabecera"><h2 className="titulo">Gradientes</h2></div></header>
      </div>

      <section className="incognita" aria-labelledby="grad-tipo">
        <h3 id="grad-tipo" className="incognita-subtitulo">1. Tipo de gradiente</h3>
        <aside className="incognita-input" role="radiogroup">
          {TIPOS.map((t) => (
            <article key={t.value}>
              <input id={`grad-${t.value}`} type="radio" name="grad-tipo"
                value={t.value} checked={tipo === t.value}
                onChange={() => { setTipo(t.value); setResultado(null); }} />
              <label htmlFor={`grad-${t.value}`}>{t.label}</label>
            </article>
          ))}
        </aside>
      </section>

      <section className="resultados">
        <article><input className="resultados-input" type="number" step="0.01"
          placeholder="R — pago del primer período" value={R} onChange={e => setR(e.target.value)} /></article>
        <article><input className="resultados-input" type="number" step="0.01"
          placeholder={labelG} value={G} onChange={e => setG(e.target.value)} /></article>
        <article><input className="resultados-input" type="number" step="0.0001"
          placeholder="i — tasa por período (decimal)" value={ii} onChange={e => setIi(e.target.value)} /></article>
        <article><input className="resultados-input" type="number" step="1"
          placeholder="n — número de períodos" value={nn} onChange={e => setNn(e.target.value)} /></article>
      </section>

      <Calcular verificaEntradas={calcular} limpiar={limpiar} reiniciar={reiniciar} />

      {resultado && (
        <section className="amort-resumen aparecer">
          <div className="amort-resumen-item">
            <span className="amort-label">Valor Actual (VA)</span>
            <span className="amort-valor">{fmtBig(resultado.va)}</span>
          </div>
          <div className="amort-resumen-item">
            <span className="amort-label">Valor Futuro (VF)</span>
            <span className="amort-valor amort-total">{fmtBig(resultado.vf)}</span>
          </div>
        </section>
      )}

      {resultado && (
        <section className="amort-tabla-wrapper aparecer">
          <table className="amort-tabla">
            <thead>
              <tr><th>Período</th><th>Pago</th></tr>
            </thead>
            <tbody>
              {resultado.pagos.map(f => (
                <tr key={f.periodo}>
                  <td>{f.periodo}</td>
                  <td>{fmtNum(f.pago)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}
