# CLAUDE.md — Proyecto FINANCIERA

## Qué es esto

Calculadora financiera web: React 18 + Vite 5. Desplegada en Vercel.
URL producción: proyecto `financiera` en team `nelson-riveras-projects`.

## Rutas de la app

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | `InicioPagina.jsx` | Pantalla de inicio con logo |
| `/Interes` | `InteresPagina.jsx` (tipo=0) | Interés simple y compuesto — 30 casos |
| `/Anualidades` | `InteresPagina.jsx` (tipo=1) | Anualidades vencidas y anticipadas — reutiliza misma página |
| `/Tasas` | `TasasPagina.jsx` | Conversión de tasas — 4 casos |
| `/Descuento` | `DescuentoPagina.jsx` | Descuento comercial — 15 casos |

## Arquitectura clave

- **`InteresPagina.jsx`** es polimórfico: `tipo=0` → Interés, `tipo=1` → Anualidades. El `tipo` viene como prop desde `App.jsx`, derivado de la ruta.
- **`determinaCaso.js`** mapea (incógnita + opcion + datos marcados) → número de caso (1–30).
- **`ejecutaCaso.js`** determina qué inputs mostrar según el caso.
- **`operacionesInteres.js`** contiene las 30 fórmulas matemáticas (switch gigante).
- **`datosContexto.js`** — Context de React, no se usa ampliamente (la mayoría es estado local).
- Auto-detección de caso válido via `useEffect` al cambiar incógnita/opcion/datos — sin botón intermedio.

## Componentes reutilizables

- `Incognita.jsx` — radio buttons para elegir la variable a calcular; recibe array `valores[]`
- `Datos.jsx` — checkboxes para datos conocidos; recibe array `[{label, key}]`
- `Calcular.jsx` — botones Calcular / Limpiar (valores) / Reiniciar todo
- `Resultados.jsx` — inputs de entrada + campo de resultado
- `Indicaciones.jsx` — panel de ayuda contextual
- `Opcion.jsx` — radio buttons Simple/Compuesto o Vencida/Anticipada

## Variables financieras

| Símbolo | Significado |
|---------|-------------|
| I | Interés |
| R | Anualidad (pago periódico) |
| Vf | Valor futuro (monto) |
| Va | Valor actual (capital) |
| i | Tasa de interés efectiva (decimal) |
| n | Número de períodos |
| D | Descuento comercial |
| d | Tasa de descuento comercial (decimal) |
| j | Tasa nominal |
| m | Capitalizaciones por año |
| ir | Tasa de interés real |

## Convenciones de código

- Nombres en español (componentes, variables, funciones)
- Estilos: CSS plano por componente (`componente.css`), paleta verde neón, diseño flat estilo Android
- Tasas siempre en decimal (0.05 = 5%); resultados de tasa se muestran como `0.050000  (5.0000%)`
- Resultados numéricos a 6 decimales fijos
- Guards de dominio: funciones retornan `null` en vez de `Infinity`/`NaN`; la UI muestra alerta descriptiva

## Tests

- Framework: Vitest
- 267+ tests pasando, 0 fallos
- Archivos de test: `*.test.js` dentro de `src/funciones/` y `src/test/`
- Correr: `npm test`

## Deployment

- Plataforma: Vercel MCP configurado (`claude mcp add --transport http vercel https://mcp.vercel.com`)
- Team ID: `team_BHJZgDNsndhNXrL9A3kaj9rd`
- Project ID: `prj_81PMwtI9UbEto8bTRgEwHFWh7472`
- Build: `npm run build` → carpeta `dist/`

## Estado del proyecto (2026-04-19)

Ver `siguimiento-fase1.md` para el detalle de sesiones. Resumen:
- Todos los módulos implementados y funcionales
- 267 tests pasando
- UX niveles 1 y 2 completados
- Pendiente: UX Nivel 3 (visual/diseño)
