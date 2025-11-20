/**
 * Componente SEO con contenido textual para mejorar la indexación en motores de búsqueda
 * Este contenido está oculto visualmente pero accesible para buscadores
 */

import './seoContent.css';

export default function SEOContent() {
  return (
    <div className="seo-content" aria-hidden="true">
      <h1>Calculadora de Matemáticas Financieras Completa</h1>

      <section>
        <h2>¿Qué es miFinanciera?</h2>
        <p>
          miFinanciera es una calculadora financiera profesional diseñada específicamente
          para estudiantes, profesores y profesionales de matemáticas financieras.
          Resuelve 30 casos diferentes de cálculos financieros con precisión de 6 decimales.
        </p>
      </section>

      <section>
        <h2>Interés Simple</h2>
        <p>
          Calcula interés simple, valor presente, valor futuro, tasa de interés y tiempo.
          Usa las fórmulas estándar: I = Va × i × n, Vf = Va(1 + i×n).
          Ideal para préstamos simples y cálculos básicos de inversión.
        </p>
        <ul>
          <li>Calcular interés (I) conociendo valor futuro y valor actual</li>
          <li>Calcular valor futuro (Vf) con diferentes combinaciones de datos</li>
          <li>Calcular valor actual (Va) para análisis de inversiones</li>
          <li>Determinar tasa de interés (i) en operaciones financieras</li>
          <li>Calcular tiempo (n) necesario para alcanzar objetivos financieros</li>
        </ul>
      </section>

      <section>
        <h2>Interés Compuesto</h2>
        <p>
          Resuelve problemas de interés compuesto usando la fórmula Vf = Va(1+i)^n.
          Perfecto para inversiones a largo plazo, cuentas de ahorro y análisis de capitalización.
          Incluye cálculos con logaritmos para determinar tasas y períodos.
        </p>
        <ul>
          <li>Cálculo exponencial con (1+i)^n para crecimiento compuesto</li>
          <li>Valor futuro de inversiones con capitalización</li>
          <li>Valor presente con descuento compuesto</li>
          <li>Tasa de interés efectiva usando raíz n-ésima</li>
          <li>Tiempo de inversión con logaritmos naturales</li>
        </ul>
      </section>

      <section>
        <h2>Anualidades</h2>
        <p>
          Calcula anualidades vencidas y anticipadas. Ideal para préstamos hipotecarios,
          planes de pensiones, arrendamientos y cualquier serie de pagos periódicos.
          Usa las fórmulas estándar de rentas constantes.
        </p>

        <h3>Anualidades Vencidas</h3>
        <p>
          Para pagos al final de cada período. Usa la fórmula:
          R = (Va × i) / (1 - (1+i)^-n). Común en préstamos bancarios y hipotecas.
        </p>

        <h3>Anualidades Anticipadas</h3>
        <p>
          Para pagos al inicio de cada período. Aplica factor de ajuste (1+i).
          Común en arrendamientos y seguros con pago adelantado.
        </p>
      </section>

      <section>
        <h2>Variables Financieras</h2>
        <ul>
          <li><strong>Va (Valor Actual/Presente):</strong> Capital inicial o monto de inversión/préstamo</li>
          <li><strong>Vf (Valor Futuro):</strong> Monto final después del período de inversión</li>
          <li><strong>i (Tasa de Interés):</strong> Porcentaje de rendimiento o costo por período</li>
          <li><strong>n (Tiempo):</strong> Número de períodos (días, meses, años)</li>
          <li><strong>I (Interés):</strong> Ganancia o costo total generado</li>
          <li><strong>R (Renta):</strong> Pago periódico en anualidades</li>
        </ul>
      </section>

      <section>
        <h2>Casos de Uso</h2>
        <ul>
          <li>Estudiantes de matemáticas financieras resolviendo tareas</li>
          <li>Profesores preparando ejercicios y exámenes</li>
          <li>Analistas financieros evaluando inversiones</li>
          <li>Contadores calculando amortizaciones</li>
          <li>Empresarios analizando opciones de financiamiento</li>
          <li>Inversionistas comparando rendimientos</li>
        </ul>
      </section>

      <section>
        <h2>Ventajas</h2>
        <ul>
          <li>30 casos diferentes cubiertos - la calculadora más completa</li>
          <li>Precisión de 6 decimales para resultados exactos</li>
          <li>Interfaz intuitiva con selección por pasos</li>
          <li>Validación de datos para evitar errores</li>
          <li>Completamente gratis y sin registro</li>
          <li>Funciona en dispositivos móviles y computadoras</li>
          <li>Resultados instantáneos</li>
        </ul>
      </section>

      <section>
        <h2>Fórmulas Incluidas</h2>
        <p>
          Todas las fórmulas estándar de matemáticas financieras están implementadas:
          interés simple (I=Va×i×n), interés compuesto (Vf=Va(1+i)^n),
          anualidades vencidas (R=Va×i/(1-(1+i)^-n)), anualidades anticipadas,
          cálculo de tasas con raíz n-ésima, cálculo de tiempo con logaritmos,
          y todas sus variaciones inversas.
        </p>
      </section>

      <footer>
        <p>
          Herramienta educativa para matemáticas financieras - Gratis y de código abierto.
          Perfecta para cursos universitarios de finanzas, contabilidad y administración.
        </p>
      </footer>
    </div>
  );
}
