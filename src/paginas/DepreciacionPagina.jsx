import { useState } from "react";
import "./interes.css";
import "./amortizacion.css";
import Calcular from "../componentes/Calcular";
import { alertaMensaje } from "../funciones/alertaMensaje";
import { esNumeroValido } from "../funciones/validarInput";
import { lineaRecta, sumaDigitos, dobleSaldo } from "../funciones/operacionesDepreciacion";

const METODOS = [
  { value: "lr",  label: "Línea recta" },
  { value: "sd",  label: "Suma de dígitos" },
  { value: "ds",  label: "Doble saldo decreciente" },
];

function fmtNum(num) {
  return parseFloat(num).toLocaleString("es", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Depreciacion() {
  const [metodo, setMetodo] = useState("lr");
  const [costo, setCosto]   = useState("");
  const [vr, setVr]         = useState("");
  const [nn, setNn]         = useState("");
  const [tabla, setTabla]   = useState(null);

  function calcular() {
    const campos = [
      [costo, "Costo inicial"],
      [vr,    "Valor residual"],
      [nn,    "n (períodos)"],
    ];
    for (const [val, label] of campos) {
      if (val === "") { alertaMensaje(`Ingrese "${label}"`); return; }
      if (!esNumeroValido(val)) { alertaMensaje(`"${label}" debe ser un número válido`); return; }
      if (Number(val) < 0) { alertaMensaje(`"${label}" no puede ser negativo`); return; }
    }
    const costoN = Number(costo);
    const vrN    = Number(vr);
    const nNum   = Math.round(Number(nn));
    if (nNum <= 0) { alertaMensaje('"n" debe ser mayor que cero'); return; }
    if (nNum > 600) { alertaMensaje('El número de períodos no puede superar 600'); return; }
    if (vrN >= costoN) { alertaMensaje('El valor residual debe ser menor que el costo'); return; }

    const fn = metodo === "lr" ? lineaRecta : metodo === "sd" ? sumaDigitos : dobleSaldo;
    setTabla(fn(costoN, vrN, nNum));
  }

  function limpiar() { setCosto(""); setVr(""); setNn(""); setTabla(null); }
  function reiniciar() { setMetodo("lr"); limpiar(); }

  return (
    <main className="principal">
      <div className="cabecera-principal">
        <header><div className="cabecera"><h2 className="titulo">Depreciación</h2></div></header>
      </div>

      <section className="incognita" aria-labelledby="dep-metodo">
        <h3 id="dep-metodo" className="incognita-subtitulo">1. Seleccione el método</h3>
        <aside className="incognita-input" role="radiogroup">
          {METODOS.map(m => (
            <article key={m.value}>
              <input id={`dep-${m.value}`} type="radio" name="dep-metodo"
                value={m.value} checked={metodo === m.value}
                onChange={() => { setMetodo(m.value); setTabla(null); }} />
              <label htmlFor={`dep-${m.value}`}>{m.label}</label>
            </article>
          ))}
        </aside>
      </section>

      <section className="resultados">
        <article><input className="resultados-input" type="number" step="0.01"
          placeholder="Costo inicial del activo" value={costo}
          onChange={e => setCosto(e.target.value)} /></article>
        <article><input className="resultados-input" type="number" step="0.01"
          placeholder="Valor residual (valor de rescate)" value={vr}
          onChange={e => setVr(e.target.value)} /></article>
        <article><input className="resultados-input" type="number" step="1"
          placeholder="n — vida útil en períodos" value={nn}
          onChange={e => setNn(e.target.value)} /></article>
      </section>

      <Calcular verificaEntradas={calcular} limpiar={limpiar} reiniciar={reiniciar} />

      {tabla && (
        <section className="amort-tabla-wrapper aparecer">
          <table className="amort-tabla">
            <thead>
              <tr>
                <th>Período</th>
                <th>Depreciación</th>
                <th>Acumulada</th>
                <th>Valor en libros</th>
              </tr>
            </thead>
            <tbody>
              {tabla.map(f => (
                <tr key={f.periodo}>
                  <td>{f.periodo}</td>
                  <td className="amort-td-interes">{fmtNum(f.depreciacion)}</td>
                  <td>{fmtNum(f.acumulada)}</td>
                  <td>{fmtNum(f.libros)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}
