import "./acerca.css";

const MODULOS = [
  {
    nombre: "Interés",
    ruta: "/Interes",
    descripcion:
      "Calcula cualquier variable de Interés Simple o Compuesto: el interés (I), valor futuro (Vf), valor actual (Va), tasa (i) o períodos (n).",
    pasos: [
      "Seleccione Simple o Compuesto.",
      "Elija la incógnita (la variable que desea calcular).",
      "Marque los datos conocidos con los checkboxes.",
      "Ingrese los valores en los campos que aparecen.",
      'Haga clic en "Calcular".',
    ],
  },
  {
    nombre: "Anualidades",
    ruta: "/Anualidades",
    descripcion:
      "Calcula pagos periódicos uniformes (R) en anualidades Vencidas (pago al final) o Anticipadas (pago al inicio).",
    pasos: [
      "Seleccione Vencida o Anticipada.",
      "Elija la incógnita (R, Vf, Va, i o n).",
      "Marque los datos conocidos.",
      "Ingrese los valores.",
      'Haga clic en "Calcular".',
    ],
  },
  {
    nombre: "Descuento",
    ruta: "/Descuento",
    descripcion:
      "Calcula operaciones de Descuento Comercial: el monto descontado (D), valor nominal (Vf), valor actual (Va), tasa de descuento (d) o tiempo (n).",
    pasos: [
      "Elija la incógnita.",
      "Marque los datos conocidos.",
      "Ingrese los valores.",
      'Haga clic en "Calcular".',
    ],
  },
  {
    nombre: "Tasas",
    ruta: "/Tasas",
    descripcion:
      "Convierte entre tipos de tasas: Efectiva (i), Nominal (j), Descuento Comercial (d) y Tasa Real (ir).",
    pasos: [
      "Seleccione qué tasa desea calcular.",
      "Ingrese los datos requeridos (en decimal, ej: 0.05 para 5%).",
      'Haga clic en "Calcular".',
    ],
  },
];

const VARIABLES = [
  { simbolo: "I",  nombre: "Interés",               descripcion: "Ganancia o costo del dinero en el período" },
  { simbolo: "R",  nombre: "Anualidad",              descripcion: "Pago periódico uniforme" },
  { simbolo: "Vf", nombre: "Valor futuro",           descripcion: "Monto total al final del período" },
  { simbolo: "Va", nombre: "Valor actual",           descripcion: "Capital inicial invertido o prestado" },
  { simbolo: "i",  nombre: "Tasa efectiva",          descripcion: "Tasa de interés en decimal (5% → 0.05)" },
  { simbolo: "n",  nombre: "Períodos",               descripcion: "Número de períodos (debe ser consistente con i)" },
  { simbolo: "D",  nombre: "Descuento",              descripcion: "Monto descontado del documento" },
  { simbolo: "d",  nombre: "Tasa de descuento",      descripcion: "Tasa de descuento comercial en decimal" },
  { simbolo: "j",  nombre: "Tasa nominal",           descripcion: "Tasa con capitalización periódica" },
  { simbolo: "m",  nombre: "Capitalizaciones/año",   descripcion: "Cuántas veces se capitaliza en un año" },
  { simbolo: "ir", nombre: "Tasa real",              descripcion: "Tasa de interés real" },
];

export default function Acerca() {
  return (
    <main className="acerca-principal">

      {/* GUÍA DE USUARIO */}
      <section className="acerca-seccion">
        <h2 className="acerca-titulo">Guía de usuario</h2>

        <div className="acerca-nota">
          Las tasas siempre se ingresan en <strong>decimal</strong>, nunca en porcentaje.
          Ejemplo: 12% → <code>0.12</code>
        </div>

        {/* Variables */}
        <h3 className="acerca-subtitulo">Variables</h3>
        <table className="acerca-tabla">
          <thead>
            <tr>
              <th>Símbolo</th>
              <th>Nombre</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {VARIABLES.map((v) => (
              <tr key={v.simbolo}>
                <td className="acerca-simbolo">{v.simbolo}</td>
                <td>{v.nombre}</td>
                <td>{v.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Módulos */}
        <h3 className="acerca-subtitulo">Cómo usar cada módulo</h3>
        <div className="acerca-modulos">
          {MODULOS.map((m) => (
            <article key={m.nombre} className="acerca-modulo">
              <h4 className="acerca-modulo-nombre">{m.nombre}</h4>
              <p className="acerca-modulo-desc">{m.descripcion}</p>
              <ol className="acerca-pasos">
                {m.pasos.map((paso, i) => (
                  <li key={i}>{paso}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        {/* Resultados */}
        <h3 className="acerca-subtitulo">Interpretación de resultados</h3>
        <ul className="acerca-lista">
          <li>Los resultados numéricos se muestran con <strong>6 decimales</strong>.</li>
          <li>Las tasas muestran el valor en decimal <strong>y</strong> en porcentaje: <code>0.125000 (12.5000%)</code></li>
          <li>Si los datos no tienen solución válida, la app muestra un mensaje de error descriptivo.</li>
          <li><strong>Limpiar</strong> borra solo los valores ingresados, manteniendo la selección.</li>
          <li><strong>Reiniciar</strong> restablece todo al estado inicial.</li>
        </ul>
      </section>

      {/* ACERCA DE */}
      <section className="acerca-seccion acerca-about">
        <h2 className="acerca-titulo">Acerca de</h2>

        <p className="acerca-parrafo">
          <strong>miFinanciera</strong> nació de la necesidad de contar con una herramienta
          práctica y accesible para resolver problemas de matemáticas financieras sin depender
          de calculadoras físicas ni hojas de cálculo complejas.
        </p>
        <p className="acerca-parrafo">
          La idea fue construir algo que cualquier estudiante o profesional pueda usar desde
          el navegador: que guíe paso a paso, que valide los datos antes de calcular, y que
          muestre resultados claros con su unidad y formato correcto.
        </p>

        <div className="acerca-autor">
          <h3 className="acerca-subtitulo">Autor</h3>
          <p><strong>Nelson Rivera</strong></p>
          <p className="acerca-rol">Desarrollador de software</p>
          <a
            className="acerca-link"
            href="https://github.com/PoetaRivera"
            target="_blank"
            rel="noreferrer"
          >
            github.com/PoetaRivera
          </a>
        </div>

        <div className="acerca-tech">
          <h3 className="acerca-subtitulo">Tecnologías</h3>
          <ul className="acerca-lista">
            <li>React 18 + Vite 5</li>
            <li>React Router 6</li>
            <li>Math.js — cálculos matemáticos de precisión</li>
            <li>Vitest — suite de tests unitarios</li>
            <li>SweetAlert2 — notificaciones</li>
            <li>Vercel — despliegue</li>
          </ul>
        </div>
      </section>

    </main>
  );
}
