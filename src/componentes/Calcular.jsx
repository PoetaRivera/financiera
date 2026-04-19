import './calcular.css'

export default function Calcular({ verificaEntradas, limpiar, reiniciar }) {
  return (
    <section className="calcular">
      <button onClick={verificaEntradas}>Calcular</button>
      <button onClick={limpiar}>Limpiar</button>
      {reiniciar && <button onClick={reiniciar}>Reiniciar</button>}
    </section>
  );
}
