import { useState } from "react";
import "./interes.css";
import "./amortizacion.css";
import "./vpntir.css";
import Calcular from "../componentes/Calcular";
import { alertaMensaje } from "../funciones/alertaMensaje";
import { esNumeroValido } from "../funciones/validarInput";
import { calcularVpn, calcularTir } from "../funciones/operacionesVpnTir";

function fmtBig(num) {
  return parseFloat(num).toFixed(6);
}
function fmtPct(num) {
  return (num * 100).toFixed(4);
}

export default function VpnTir() {
  const [tasa, setTasa]     = useState("");
  const [flujos, setFlujos] = useState(["", ""]);
  const [resultado, setResultado] = useState(null);

  function agregarFlujo() {
    setFlujos(f => [...f, ""]);
  }

  function quitarFlujo() {
    if (flujos.length <= 2) return;
    setFlujos(f => f.slice(0, -1));
  }

  function cambiarFlujo(idx, val) {
    setFlujos(f => f.map((v, i) => i === idx ? val : v));
  }

  function calcular() {
    if (tasa === "") { alertaMensaje('Ingrese la tasa de descuento "i"'); return; }
    if (!esNumeroValido(tasa)) { alertaMensaje('"i" debe ser un número válido'); return; }
    if (Number(tasa) < 0) { alertaMensaje('"i" no puede ser negativa'); return; }

    for (let k = 0; k < flujos.length; k++) {
      if (flujos[k] === "") { alertaMensaje(`Ingrese el flujo del período ${k}`); return; }
      if (!esNumeroValido(flujos[k])) { alertaMensaje(`Flujo ${k} debe ser un número válido`); return; }
    }

    const nums = flujos.map(Number);
    const vpn = calcularVpn(nums, Number(tasa));
    const tir = calcularTir(nums);

    setResultado({ vpn, tir });
  }

  function limpiar() {
    setTasa(""); setFlujos(["", ""]); setResultado(null);
  }

  return (
    <main className="principal">
      <div className="cabecera-principal">
        <header><div className="cabecera"><h2 className="titulo">VPN / TIR</h2></div></header>
      </div>

      {/* Tasa */}
      <section className="resultados">
        <article>
          <input className="resultados-input" type="number" step="0.0001"
            placeholder="i — tasa de descuento (decimal)"
            value={tasa} onChange={e => setTasa(e.target.value)} />
        </article>
      </section>

      {/* Flujos */}
      <section className="vpntir-flujos aparecer">
        <h3 className="incognita-subtitulo">Flujos de caja</h3>
        <p className="vpntir-nota">El período 0 es la inversión inicial (negativa).</p>
        {flujos.map((f, idx) => (
          <div key={idx} className="vpntir-fila">
            <span className="vpntir-periodo">k = {idx}</span>
            <input
              className="resultados-input vpntir-input"
              type="number"
              step="0.01"
              placeholder={idx === 0 ? "Inversión inicial (ej: -1000)" : `Flujo período ${idx}`}
              value={f}
              onChange={e => cambiarFlujo(idx, e.target.value)}
            />
          </div>
        ))}
        <div className="vpntir-botones-flujo">
          <button onClick={agregarFlujo}>+ Período</button>
          <button onClick={quitarFlujo} disabled={flujos.length <= 2}>− Período</button>
        </div>
      </section>

      <Calcular verificaEntradas={calcular} limpiar={limpiar} reiniciar={limpiar} />

      {resultado && (
        <section className="amort-resumen aparecer">
          <div className="amort-resumen-item">
            <span className="amort-label">VPN</span>
            <span className={`amort-valor ${resultado.vpn >= 0 ? "amort-total" : "amort-interes"}`}>
              {fmtBig(resultado.vpn)}
            </span>
          </div>
          {resultado.tir !== null ? (
            <div className="amort-resumen-item">
              <span className="amort-label">TIR</span>
              <span className="amort-valor amort-total">
                {fmtBig(resultado.tir)}  ({fmtPct(resultado.tir)}%)
              </span>
            </div>
          ) : (
            <div className="amort-resumen-item">
              <span className="amort-label">TIR</span>
              <span className="amort-valor" style={{ color: "var(--text-secondary)" }}>
                No existe TIR única
              </span>
            </div>
          )}
          <div className="amort-resumen-item vpntir-decision">
            <span className="amort-label">Decisión</span>
            <span className={`amort-valor ${resultado.vpn >= 0 ? "amort-total" : "amort-interes"}`}>
              {resultado.vpn >= 0 ? "Aceptar ✓" : "Rechazar ✗"}
            </span>
          </div>
        </section>
      )}
    </main>
  );
}
