import { useState } from "react";
import "./interes.css";
import "./amortizacion.css";
import Calcular from "../componentes/Calcular";
import { alertaMensaje } from "../funciones/alertaMensaje";
import { esNumeroValido } from "../funciones/validarInput";
import { tablaFrances, tablaAleman } from "../funciones/operacionesAmortizacion";

const SISTEMAS = [
  { value: "frances", label: "Francés (cuota fija)" },
  { value: "aleman",  label: "Alemán (amortización constante)" },
];

function fmtNum(num) {
  return parseFloat(num).toLocaleString("es", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function Amortizacion() {
  const [sistema, setSistema]   = useState("frances");
  const [va, setVa]             = useState("");
  const [ii, setIi]             = useState("");
  const [nn, setNn]             = useState("");
  const [resultado, setResultado] = useState(null);

  function calcular() {
    const campos = [
      [va, "Va (capital)"],
      [ii, "i (tasa)"],
      [nn, "n (períodos)"],
    ];
    for (const [val, label] of campos) {
      if (val === "" || val === undefined) {
        alertaMensaje(`Ingrese el valor de "${label}"`);
        return;
      }
      if (!esNumeroValido(val)) {
        alertaMensaje(`"${label}" debe ser un número válido`);
        return;
      }
      if (Number(val) <= 0) {
        alertaMensaje(`"${label}" debe ser mayor que cero`);
        return;
      }
    }

    const nNum = Math.round(Number(nn));
    if (nNum > 600) {
      alertaMensaje("El número de períodos no puede superar 600");
      return;
    }

    const res = sistema === "frances"
      ? tablaFrances(Number(va), Number(ii), nNum)
      : tablaAleman(Number(va), Number(ii), nNum);

    setResultado(res);
  }

  function limpiar() {
    setVa(""); setIi(""); setNn("");
    setResultado(null);
  }

  function reiniciar() {
    setSistema("frances");
    limpiar();
  }

  return (
    <main className="principal">
      <div className="cabecera-principal">
        <header>
          <div className="cabecera">
            <h2 className="titulo">Amortización</h2>
          </div>
        </header>
      </div>

      {/* Sistema */}
      <section className="incognita" aria-labelledby="sist-titulo">
        <h3 id="sist-titulo" className="incognita-subtitulo">1. Seleccione el sistema</h3>
        <aside className="incognita-input" role="radiogroup">
          {SISTEMAS.map((s) => (
            <article key={s.value}>
              <input
                id={`sist-${s.value}`}
                type="radio"
                name="sistema-amort"
                value={s.value}
                checked={sistema === s.value}
                onChange={() => { setSistema(s.value); setResultado(null); }}
              />
              <label htmlFor={`sist-${s.value}`}>{s.label}</label>
            </article>
          ))}
        </aside>
      </section>

      {/* Inputs */}
      <section className="resultados">
        <article>
          <input
            className="resultados-input"
            type="number"
            step="0.01"
            placeholder="Va — capital inicial"
            value={va}
            onChange={(e) => setVa(e.target.value)}
          />
        </article>
        <article>
          <input
            className="resultados-input"
            type="number"
            step="0.0001"
            placeholder="i — tasa por período (decimal)"
            value={ii}
            onChange={(e) => setIi(e.target.value)}
          />
        </article>
        <article>
          <input
            className="resultados-input"
            type="number"
            step="1"
            placeholder="n — número de períodos"
            value={nn}
            onChange={(e) => setNn(e.target.value)}
          />
        </article>
      </section>

      <Calcular verificaEntradas={calcular} limpiar={limpiar} reiniciar={reiniciar} />

      {/* Resumen */}
      {resultado && (
        <section className="amort-resumen aparecer">
          {resultado.cuotaFija !== null && (
            <div className="amort-resumen-item">
              <span className="amort-label">Cuota fija</span>
              <span className="amort-valor">{fmtNum(resultado.cuotaFija)}</span>
            </div>
          )}
          <div className="amort-resumen-item">
            <span className="amort-label">Capital prestado</span>
            <span className="amort-valor">{fmtNum(resultado.capital)}</span>
          </div>
          <div className="amort-resumen-item">
            <span className="amort-label">Total intereses</span>
            <span className="amort-valor amort-interes">{fmtNum(resultado.totalInteres)}</span>
          </div>
          <div className="amort-resumen-item">
            <span className="amort-label">Total pagado</span>
            <span className="amort-valor amort-total">{fmtNum(resultado.totalPagado)}</span>
          </div>
        </section>
      )}

      {/* Tabla */}
      {resultado && (
        <section className="amort-tabla-wrapper aparecer">
          <table className="amort-tabla">
            <thead>
              <tr>
                <th>Período</th>
                <th>Cuota</th>
                <th>Interés</th>
                <th>Capital</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {resultado.filas.map((fila) => (
                <tr key={fila.periodo}>
                  <td>{fila.periodo}</td>
                  <td>{fmtNum(fila.cuota)}</td>
                  <td className="amort-td-interes">{fmtNum(fila.interes)}</td>
                  <td>{fmtNum(fila.capital)}</td>
                  <td>{fmtNum(fila.saldo)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}
