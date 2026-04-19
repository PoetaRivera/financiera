# Guía de Usuario — miFinanciera

Calculadora financiera para Interés Simple, Interés Compuesto, Anualidades, Descuento Comercial y Conversión de Tasas.

---

## Variables que maneja la app

| Símbolo | Nombre completo | Descripción |
|---------|----------------|-------------|
| **I** | Interés | Ganancia o costo del dinero en el período |
| **Vf** | Valor futuro | Monto total al final del período (capital + interés) |
| **Va** | Valor actual | Capital inicial invertido o prestado |
| **i** | Tasa de interés | Se ingresa en decimal: 5% → 0.05 |
| **n** | Número de períodos | Tiempo (años, meses, semanas — debe ser consistente con i) |
| **R** | Anualidad | Pago periódico uniforme |
| **D** | Descuento | Valor descontado del documento |
| **d** | Tasa de descuento | Se ingresa en decimal: 10% → 0.10 |
| **j** | Tasa nominal | Tasa con capitalización periódica |
| **m** | Capitalizaciones/año | Cuántas veces se capitaliza en un año |
| **ir** | Tasa real | Tasa de interés real (excluye inflación) |

> **Importante:** Las tasas siempre se ingresan en decimal, nunca en porcentaje.
> Ejemplo: una tasa del 12% se escribe `0.12`.

---

## Módulo Interés

**Ruta:** `/Interes`

Calcula con fórmulas de **Interés Simple** o **Interés Compuesto**.

### Cómo usarlo

1. **Seleccione Simple o Compuesto** con los radio buttons superiores.
2. **Elija la incógnita** (la variable que quiere calcular): I, Vf, Va, i o n.
3. **Marque los datos conocidos** con los checkboxes. Los campos de entrada aparecen automáticamente cuando la combinación es válida.
4. **Ingrese los valores** en los campos que aparecen.
5. Haga clic en **Calcular**.

### Fórmulas

**Interés Simple:**
- `Vf = Va × (1 + i × n)`
- `I = Va × i × n`
- `i = (Vf − Va) / (Va × n)`
- `n = (Vf − Va) / (Va × i)`

**Interés Compuesto:**
- `Vf = Va × (1 + i)ⁿ`
- `I = Va × ((1 + i)ⁿ − 1)`
- `i = (Vf/Va)^(1/n) − 1`
- `n = log(Vf/Va) / log(1 + i)`

### Botones

| Botón | Acción |
|-------|--------|
| **Calcular** | Ejecuta el cálculo con los datos ingresados |
| **Limpiar** | Borra solo los valores ingresados; mantiene la selección |
| **Reiniciar** | Restablece todo (selección + valores) al estado inicial |

---

## Módulo Anualidades

**Ruta:** `/Anualidades`

Calcula pagos periódicos uniformes (**R**) con anualidades **Vencidas** (pago al final del período) o **Anticipadas** (pago al inicio del período).

### Variables

Mismas que Interés, más:
- **R** — El pago o cuota periódica (reemplaza a I en este módulo)

### Cómo usarlo

Igual que Interés:
1. Seleccione **Vencida** o **Anticipada**.
2. Elija la incógnita (R, Vf, Va, i o n).
3. Marque los datos conocidos.
4. Ingrese los valores.
5. Haga clic en **Calcular**.

---

## Módulo Descuento

**Ruta:** `/Descuento`

Calcula operaciones de **Descuento Comercial**: el valor que se rebaja de un documento antes de su vencimiento.

### Variables

| Símbolo | Significado |
|---------|-------------|
| **D** | Descuento (monto descontado) |
| **Vf** | Valor nominal del documento |
| **Va** | Valor actual (lo que se recibe) |
| **d** | Tasa de descuento (decimal) |
| **n** | Tiempo hasta el vencimiento |

**Relación básica:** `Va = Vf − D` y `D = Vf × d × n`

### Cómo usarlo

Igual que el módulo Interés: elegir incógnita → marcar datos conocidos → ingresar valores → Calcular.

---

## Módulo Tasas

**Ruta:** `/Tasas`

Convierte entre distintos tipos de tasas de interés.

### Qué puede calcular

| Opción | Calcula | Necesita |
|--------|---------|----------|
| **i** (Tasa Efectiva) | Tasa efectiva i | j, m, n |
| **j** (Tasa Nominal) | Tasa nominal j | i, m, n |
| **d** (Desc. Comercial) | Tasa de descuento d | ir, n |
| **ir** (Tasa Real) | Tasa de interés real ir | d, n |

### Fórmulas

- `i = (1 + j/m)ⁿ − 1`
- `j = m × ((1 + i)^(1/n) − 1)`
- `d = ir / (1 + ir × n)`
- `ir = d / (1 − n × d)`

### Nota sobre n y m

Para calcular **i** y **j**, `n` es el número de sub-períodos a convertir.
- Si `n = m` obtienes la tasa efectiva anual estándar.
- Si `n ≠ m` conviertes a otro período (bimestral, trimestral, etc.).

### Cómo usarlo

1. Seleccione qué tasa quiere calcular.
2. Ingrese los datos requeridos (en decimal).
3. Haga clic en **Calcular**.

---

## Interpretación de resultados

- Los resultados numéricos se muestran con **6 decimales**.
- Las tasas se muestran en **decimal y porcentaje**: `0.125000  (12.5000%)`.
- Si los valores ingresados no tienen solución matemática válida, la app muestra un mensaje de error descriptivo.

---

## Consejos generales

- Si cambia la incógnita o los datos marcados, los campos de entrada se actualizan automáticamente.
- Use **Limpiar** para corregir valores sin perder la selección.
- Use **Reiniciar** para empezar un cálculo completamente diferente.
- El botón **Ayuda** en cada módulo muestra las indicaciones y definiciones de las variables.
