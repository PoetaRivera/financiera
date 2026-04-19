# Seguimiento Fase 1 - Proyecto FINANCIERA

## Estado General
Aplicación React (Vite) de calculadora financiera. Rama actual: `claude/spanish-greeting-01CyWWkk1GWd7zNnAjoDi1Lj`

---

## Lo que está TERMINADO

### Funcionalidades principales
- **Interés Simple y Compuesto** (`/Interes`) — 30 casos implementados, funciona completamente
- **Anualidades Vencidas y Anticipadas** (`/Anualidades`) — reutiliza `InteresPagina.jsx` con `tipo=1`, funciona completamente
- **Validación de inputs** — números positivos, no vacíos, mensajes de error con SweetAlert2
- **Lógica de negocio** — `determinaCaso.js`, `ejecutaCaso.js`, `operacionesInteres.js`, `presentaResultado.js`, `verificaSeleccion.js`

### UI/UX
- Diseño flat estilo Android con paleta verde neón
- Responsive para móviles (navbar, botones centrados)
- Botón "Ayuda" con indicaciones por tipo (Interés / Anualidades)
- Checkbox y radio button con colores
- Logo en pantalla de inicio y en pantalla de cálculo (antes de mostrar resultados)
- SEO implementado con `SEOContent.jsx`

### Tests
- `determinaCaso.test.js` — cobertura de casos
- `operacionesInteres.test.js` — pruebas de operaciones matemáticas
- `validarInput.test.js` — validaciones de entrada
- `verificaSeleccion.test.js` — verificación de selección de datos
- `pruebaExhaustiva.test.js` — pruebas con datos reales

---

## Lo que está TERMINADO — actualización 2026-04-18

### Módulo Tasas (`/Tasas`) — IMPLEMENTADO
- `TasasPagina.jsx` — 4 conversiones de tasas completamente funcionales
- UI: radio buttons para seleccionar qué calcular (i, j, d, ir), inputs dinámicos
- Fórmulas: i=(1+j/m)^n-1, j=m*((1+i)^(1/n)-1), d=ir/(1+ir*n), ir=d/(1-n*d)

### Módulo Descuento (`/Descuento`) — IMPLEMENTADO
- `DescuentoPagina.jsx` — 15 casos completamente funcionales
- `operacionesDescuento.js` — fórmulas de los 15 casos
- `determinaCasoDescuento.js` — selección de caso según incógnita + datos conocidos
- `ejecutaCasoDescuento.js` — muestra los campos de entrada según el caso
- `verificaSeleccionDescuento.js` — valida la combinación seleccionada
- Variables: D, Vf, Va, d (tasa), n — misma UI que Interés

### Estado de Tests
- 197 tests pasando, 0 fallos (build limpio verificado)

---

## Lo que está TERMINADO — actualización 2026-04-18 (sesión 2)

### Tests nuevos módulos — IMPLEMENTADOS
- `operacionesTasas.test.js` — 16 tests: casos 1-4, round-trips, inválido
- `operacionesDescuento.test.js` — 37 tests: 15 casos + determinaCasoDescuento (15+1) + verificaSeleccionDescuento (4)

### Validación de fórmulas — COMPLETADA
- `validacion-formulas.md` — 65 fórmulas validadas contra 7 fuentes académicas externas
- Módulos cubiertos: Interés Simple, Interés Compuesto, Anualidades Vencidas, Anualidades Anticipadas, Descuento Comercial, Conversión de Tasas
- Derivación matemática documentada para Tasas casos 3 y 4
- Estado: 65/65 fórmulas ✅

---

## Lo que está TERMINADO — actualización 2026-04-18 (sesión 3)

### Correcciones arquitectónicas — COMPLETADAS
- **Guardas de dominio matemático:** `null` en vez de `Infinity`/`NaN` en casos peligrosos
  - `operacionesDescuento.js` casos 2 y 6: guard `d*n < 1`
  - `operacionesTasas.js` caso 4: guard `n*d < 1`
  - `operacionesInteres.js` casos 29 (tipo=0), 15 y 30 (tipo=1): guards de logaritmo
  - UI maneja `null` con `alertaMensaje` descriptivo
- **`Datos.jsx` e `Incognita.jsx`** refactorizados: reciben arrays `valores[]` en vez de `valor1...valor5` hardcodeados
- **`DescuentoPagina.jsx`** reescrito: usa `<Datos>` e `<Incognita>` reutilizables; switch de 15 casos → mapa declarativo `buildCamposPorCaso`
- **`App.jsx`**: `tipo` derivado de la ruta (prop literal 0/1), eliminado estado compartido y `setTipo`
- **`BarraNavegacion.jsx`**: simplificado, sin `asignarTipo` ni `setTipo`
- **`AnualidadesPagina.jsx`**: eliminado (archivo huérfano)
- **267 tests pasando** (+17 nuevos tests de guardas de dominio)
- **Corrección matemática: 10/10**

### Vercel MCP — CONFIGURADO
- Servidor agregado: `claude mcp add --transport http vercel https://mcp.vercel.com`
- Token configurado con header `Authorization: Bearer ...`
- Estado: ✓ Connected (verificado con `claude mcp list`)
- **Los tools de Vercel estarán disponibles desde la próxima sesión** (los MCP se cargan al arrancar)

---

## Lo que está TERMINADO — actualización 2026-04-18 (sesión 4)

### UX Nivel 1 — COMPLETADO
- Mensajes de error nombran el campo específico que falla (los 3 módulos)
- Resultados de tasa muestran decimal + porcentaje: `0.125000  (12.5000%)`
  → Tasas: todos los casos; Descuento: casos 10-12 (d); Interés: casos de i
- Bloque Ayuda en Tasas: nota que explica generalización de `n` vs `m`

### Fix bugs de Ayuda — COMPLETADO
- Texto invisible: `color: var(--A100)` = `#CCFF90` coincidía con el fondo → cambiado a `#213547` modo claro
- Texto todo pegado: `<span>` inline → `.indicaciones` y `.definiciones` con `display:flex; flex-direction:column`

### UX Nivel 2 — COMPLETADO
- Al seleccionar incógnita, su checkbox en datos queda deshabilitado y atenuado (`opacity: 0.4`)
- **Eliminado botón "Introducir datos"** en Interés, Anualidades y Descuento
- Los campos de entrada aparecen automáticamente al detectar combinación válida (`useEffect`)
- Al cambiar la selección los valores se limpian automáticamente

---

## Lo que está TERMINADO — actualización 2026-04-19

### Documentación — COMPLETADA
- **`CLAUDE.md`** — documentación técnica del proyecto para futuras sesiones de Claude: rutas, arquitectura, componentes, convenciones, variables financieras, estado de tests, deployment
- **`GUIA-USUARIO.md`** — guía completa para el usuario final (archivo Markdown en repo)
- **Página `/Acerca`** — guía de usuario + sección "Acerca de" integradas en la app
  - `AcercaPagina.jsx` + `acerca.css` — página completa con tabla de variables, instrucciones por módulo, autor, tecnologías
  - `App.jsx` — ruta `/Acerca` agregada
  - `BarraNavegacion.jsx` — link "Acerca" agregado a la navbar

### Vercel MCP — VERIFICADO
- Conexión activa confirmada: team `nelson-riveras-projects`, proyecto `financiera` visible

---

## Lo que está PENDIENTE (por hacer)

- **UX Nivel 3** (visual/diseño) — pendiente de discusión con el usuario

---

## Por dónde continuar (próxima sesión)

1. Discutir y definir UX Nivel 3 (visual)
2. Desplegar a Vercel cuando haya cambios listos (usar MCP Vercel)

---

*Actualizado: 2026-04-19 — Página /Acerca creada (guía usuario + about). Deploy a producción: https://financiera-ten.vercel.app. Pendiente: UX Nivel 3*
