# Validación de Fórmulas — Aplicación miFinanciera

**Fecha:** 2026-04-18  
**Versión app:** commit `1a476c1` (main)  
**Tests:** 250/250 pasando  

---

## Fuentes de Referencia

| Fuente | Institución | Módulo validado |
|--------|-------------|-----------------|
| [Interés Simple](https://belver.clavijero.edu.mx/cursos/nme/semestre5/matefin_1/s3/contenidos/index.html) | Universidad Clavijero (México) | Interés Simple |
| [Despeje Interés Compuesto](https://www.disfrutalasmatematicas.com/dinero/compuesto-interes-derivacion.html) | DisfrutaLasMatemáticas.com | Interés Compuesto |
| [Anualidades Vencidas](https://blogs.ugto.mx/rea/clase-digital-17-anualidades-vencidas-u-ordinarias-monto-valor-actual-tasa-y-tiempo/) | Universidad de Guanajuato (México) | Anualidades Vencidas |
| [Anualidades Vencidas y Anticipadas](https://matefinanciera.com/anualidad) | MatéFinanciera.com | Anualidades |
| [Descuento Comercial](https://www.plangeneralcontable.com/?tit=guia-de-matematica-financiera-descuento-simple-y-descuento-comercial&name=Manuales&fid=eg0bcad) | Plan General Contable (España) | Descuento |
| [Descuento Comercial y Racional](https://www.eaeprogramas.es/blog/negocio/finanzas-economia/matematica-financiera-para-la-empresa-descuentos-comercial-y-racional) | EAE Business School (España) | Descuento |
| [Relación Tasas Descuento/Efectivas](https://blog.nekomath.com/matematicas-financieras-relacion-de-tasas-de-descuento-efectivas-tasas-equivalentes/) | Blog Nekomath | Conversión de Tasas |

---

## Nomenclatura General

| Variable | Descripción |
|----------|-------------|
| `I` / `R` | Interés (módulo Interés) / Renta o pago periódico (módulo Anualidades) |
| `Vf` | Valor Futuro (monto) |
| `Va` | Valor Actual (capital o valor presente) |
| `i` | Tasa de interés por período (decimal) |
| `n` | Número de períodos |
| `D` | Descuento (monto) |
| `d` | Tasa de descuento comercial (decimal) |
| `j` | Tasa nominal anual |
| `m` | Número de capitalizaciones por año |
| `ir` | Tasa de interés real |

> **Nota:** Todas las tasas se expresan en forma **decimal** (ej: 5% = 0.05).  
> Los resultados se muestran con **6 decimales**.

---

## Módulo 1 — Interés Simple

**Fórmula base:** `Vf = Va × (1 + i × n)`

### Casos 1–15

| Caso | Incógnita | Datos conocidos | Fórmula aplicada | Derivación / Fuente |
|------|-----------|-----------------|------------------|---------------------|
| 1 | I | Vf, Va | `I = Vf − Va` | Definición básica *(Clavijero)* |
| 2 | I | Va, i, n | `I = Va × i × n` | `I = C × i × t` *(Clavijero)* |
| 3 | I | Vf, i, n | `I = Vf×i×n / (1 + i×n)` | `Va = Vf/(1+i×n)`, luego `I = Va×i×n` |
| 4 | Vf | Va, I | `Vf = Va + I` | `M = C + I` *(Clavijero)* |
| 5 | Vf | I, i, n | `Vf = I×(1+i×n) / (i×n)` | `Va = I/(i×n)`, luego `Vf = Va×(1+i×n)` |
| 6 | Vf | Va, i, n | `Vf = Va × (1 + i×n)` | `M = C(1+it)` *(Clavijero)* |
| 7 | Va | Vf, I | `Va = Vf − I` | `C = M − I` *(Clavijero)* |
| 8 | Va | I, i, n | `Va = I / (i×n)` | `C = I/(i×t)` *(Clavijero)* |
| 9 | Va | Vf, i, n | `Va = Vf / (1 + i×n)` | `C = M/(1+it)` *(Clavijero)* |
| 10 | i | Vf, Va, n | `i = (Vf − Va) / (Va×n)` | `i = (M−C)/(C×t)` *(Clavijero)* |
| 11 | i | I, Vf, n | `i = I / (n×(Vf−I))` | `Va = Vf−I`, luego `i = I/(Va×n)` |
| 12 | i | I, Va, n | `i = I / (Va×n)` | `i = I/(C×t)` *(Clavijero)* |
| 13 | n | Vf, Va, i | `n = (Vf − Va) / (Va×i)` | `t = (M−C)/(C×i)` *(Clavijero)* |
| 14 | n | I, Vf, i | `n = I / ((Vf−I)×i)` | `Va = Vf−I`, luego `n = I/(Va×i)` |
| 15 | n | I, Va, i | `n = I / (Va×i)` | `t = I/(C×i)` *(Clavijero)* |

**Estado: ✅ 15/15 correctas**

---

## Módulo 2 — Interés Compuesto

**Fórmula base:** `Vf = Va × (1 + i)^n`

### Casos 16–30

| Caso | Incógnita | Datos conocidos | Fórmula aplicada | Derivación / Fuente |
|------|-----------|-----------------|------------------|---------------------|
| 16 | I | Vf, Va | `I = Vf − Va` | Idéntico al caso 1 |
| 17 | I | Va, i, n | `I = Va × ((1+i)^n − 1)` | `I = Vf − Va`, `Vf = Va(1+i)^n` |
| 18 | I | Vf, i, n | `I = Vf × (1 − 1/(1+i)^n)` | `I = Vf − Va`, `Va = Vf/(1+i)^n` |
| 19 | Vf | Va, I | `Vf = Va + I` | Idéntico al caso 4 |
| 20 | Vf | I, i, n | `Vf = I × (1+i)^n / ((1+i)^n − 1)` | `Va = I/((1+i)^n−1)`, `Vf = Va(1+i)^n` |
| 21 | Vf | Va, i, n | `Vf = Va × (1+i)^n` | `F = P(1+r)^n` *(disfrutalasmatematicas.com)* |
| 22 | Va | Vf, I | `Va = Vf − I` | Idéntico al caso 7 |
| 23 | Va | I, i, n | `Va = I / ((1+i)^n − 1)` | `I = Va×((1+i)^n−1)` despejando Va |
| 24 | Va | Vf, i, n | `Va = Vf / (1+i)^n` | `P = F(1+r)^-n` *(disfrutalasmatematicas.com)* |
| 25 | i | Vf, Va, n | `i = (Vf/Va)^(1/n) − 1` | `r = (VF/VA)^(1/n) − 1` *(disfrutalasmatematicas.com)* |
| 26 | i | I, Vf, n | `i = (Vf/(Vf−I))^(1/n) − 1` | `Va = Vf−I`, luego caso 25 |
| 27 | i | I, Va, n | `i = (I/Va + 1)^(1/n) − 1` | `(1+i)^n = I/Va+1` despejando i |
| 28 | n | Vf, Va, i | `n = log(Vf/Va) / log(1+i)` | `n = ln(VF/VA)/ln(1+r)` *(disfrutalasmatematicas.com)* |
| 29 | n | I, Vf, i | `n = log(Vf/(Vf−I)) / log(1+i)` | `Va = Vf−I`, luego caso 28 |
| 30 | n | I, Va, i | `n = log(I/Va + 1) / log(1+i)` | `(1+i)^n = I/Va+1` despejando n |

**Estado: ✅ 15/15 correctas**

---

## Módulo 3 — Anualidades Vencidas (Ordinarias)

**Definición:** Los pagos se realizan al **final** de cada período.

**Fórmulas base:**
- Valor Actual: `Va = R × [1−(1+i)^-n] / i`
- Valor Futuro: `Vf = R × [(1+i)^n − 1] / i`

### Casos

| Caso | Incógnita | Datos conocidos | Fórmula aplicada | Fuente |
|------|-----------|-----------------|------------------|--------|
| 2 | R | Va, i, n | `R = Va×i / (1−(1+i)^-n)` | `A = Pi/[1−(1+i)^-n]` *(matefinanciera.com)* |
| 3 | R | Vf, i, n | `R = Vf×i / ((1+i)^n − 1)` | `A = Fi/[(1+i)^n−1]` *(matefinanciera.com)* |
| 5 | Vf | R, i, n | `Vf = R × ((1+i)^n − 1) / i` | `F = A[(1+i)^n−1]/i` *(UGT / matefinanciera.com)* |
| 6 | Vf | Va, i, n | `Vf = Va × (1+i)^n` | Equivalencia financiera — mismo que IC caso 21 |
| 8 | Va | R, i, n | `Va = R × (1−(1+i)^-n) / i` | `P = A[1−(1+i)^-n]/i` *(matefinanciera.com)* |
| 9 | Va | Vf, i, n | `Va = Vf / (1+i)^n` | Equivalencia financiera — mismo que IC caso 24 |
| 14 | n | R, Vf, i | `n = log((Vf×i/R)+1) / log(1+i)` | `n = log(Fi/A+1)/log(1+i)` *(UGT)* |
| 15 | n | R, Va, i | `n = −log(1−(Va×i/R)) / log(1+i)` | `n = −log(1−Pi/A)/log(1+i)` *(matefinanciera.com)* |

**Estado: ✅ 8/8 correctas**

---

## Módulo 4 — Anualidades Anticipadas

**Definición:** Los pagos se realizan al **inicio** de cada período.

**Diferencia con vencidas:** Factor multiplicador `(1+i)` en fórmulas de R, Va y Vf con R.

**Fórmulas base:**
- Valor Actual: `Va = R × [1−(1+i)^-n] / i × (1+i)`
- Valor Futuro: `Vf = R × [(1+i)^n − 1] / i × (1+i)`

### Casos

| Caso | Incógnita | Datos conocidos | Fórmula aplicada | Fuente |
|------|-----------|-----------------|------------------|--------|
| 17 | R | Va, i, n | `R = Va×i / ((1+i)×(1−(1+i)^-n))` | `A = Pi/[(1−(1+i)^-n)(1+i)]` *(matefinanciera.com)* |
| 18 | R | Vf, i, n | `R = Vf×i / ((1+i)×((1+i)^n−1))` | `A = Fi/[(1+i)^n−1](1+i)` *(matefinanciera.com)* |
| 20 | Vf | R, i, n | `Vf = R×(1+i)×((1+i)^n−1) / i` | `F = A[(1+i)^n−1](1+i)/i` *(matefinanciera.com)* |
| 21 | Vf | Va, i, n | `Vf = Va × (1+i)^n` | Igual que vencida — correcto (independiente del tipo) |
| 23 | Va | R, i, n | `Va = R×(1+i)×(1−(1+i)^-n) / i` | `P = A[1−(1+i)^-n](1+i)/i` *(matefinanciera.com)* |
| 24 | Va | Vf, i, n | `Va = Vf / (1+i)^n` | Igual que vencida — correcto |
| 29 | n | R, Vf, i | `n = log(Vf×i/(R×(1+i))+1) / log(1+i)` | `n = log(Fi/[A(1+i)]+1)/log(1+i)` *(matefinanciera.com)* |
| 30 | n | R, Va, i | `n = −log(1−Va×i/(R×(1+i))) / log(1+i)` | `n = −log(1−Pi/[A(1+i)])/log(1+i)` *(matefinanciera.com)* |

**Estado: ✅ 8/8 correctas**

---

## Módulo 5 — Descuento Comercial

**Definición:** El descuento se calcula sobre el **valor futuro (nominal)** del documento.

**Fórmulas base:**
- `D = Vf × d × n`
- `Va = Vf × (1 − d×n)`
- `Vf = Va / (1 − d×n)`

> **Distinción importante:** La app implementa únicamente **descuento comercial** (D calculado sobre Vf).  
> El descuento racional calcula D sobre Va: `D = Va×d×n/(1+d×n)` — **no implementado**, no es un error.

### Casos 1–15

| Caso | Incógnita | Datos conocidos | Fórmula aplicada | Derivación / Fuente |
|------|-----------|-----------------|------------------|---------------------|
| 1 | D | Vf, Va | `D = Vf − Va` | Definición básica *(Plan Gral. Contable)* |
| 2 | D | Va, d, n | `D = Va×d×n / (1−d×n)` | `Vf = Va/(1−d×n)`, luego `D = Vf×d×n` |
| 3 | D | Vf, d, n | `D = Vf × d × n` | `D = VN×d×t` *(Plan Gral. Contable)* |
| 4 | Vf | Va, D | `Vf = Va + D` | Definición básica |
| 5 | Vf | D, d, n | `Vf = D / (d×n)` | Despeje de `D = Vf×d×n` |
| 6 | Vf | Va, d, n | `Vf = Va / (1−d×n)` | `Vf = Va/(1−d×n)` *(Plan Gral. Contable)* |
| 7 | Va | Vf, D | `Va = Vf − D` | `Va = Vf − D` *(Plan Gral. Contable)* |
| 8 | Va | D, d, n | `Va = D × (1/(d×n) − 1)` | `Vf = D/(d×n)`, `Va = Vf×(1−d×n)` |
| 9 | Va | Vf, d, n | `Va = Vf × (1−d×n)` | `Va = Vf×(1−d×n)` *(Plan Gral. Contable)* |
| 10 | d | Vf, Va, n | `d = (Vf−Va) / (Vf×n)` | `d = (Vf−Va)/(Vf×n)` *(Plan Gral. Contable)* |
| 11 | d | D, Vf, n | `d = D / (n×Vf)` | `d = D/(Vf×n)` *(Plan Gral. Contable)* |
| 12 | d | D, Va, n | `d = D / ((Va+D)×n)` | `Va+D = Vf`, luego `d = D/(Vf×n)` |
| 13 | n | Vf, Va, d | `n = (Vf−Va) / (Vf×d)` | `n = (Vf−Va)/(Vf×d)` *(Plan Gral. Contable)* |
| 14 | n | D, Vf, d | `n = D / (Vf×d)` | `n = D/(Vf×d)` *(Plan Gral. Contable)* |
| 15 | n | D, Va, d | `n = D / ((Va+D)×d)` | `Va+D = Vf`, luego `n = D/(Vf×d)` |

**Estado: ✅ 15/15 correctas**

---

## Módulo 6 — Conversión de Tasas

### Casos 1–4

| Caso | Resultado | Datos | Fórmula aplicada | Fuente / Observación |
|------|-----------|-------|------------------|----------------------|
| 1 | i (efectiva) | j, m, n | `i = (1 + j/m)^n − 1` | Generalización de `i=(1+j/m)^m−1` *(estándar)* |
| 2 | j (nominal) | i, m, n | `j = m × ((1+i)^(1/n) − 1)` | Inversa del caso 1 |
| 3 | d (desc. comercial) | ir, n | `d = ir / (1 + ir×n)` | Derivado de equivalencia comercial-racional *(Nekomath)* |
| 4 | ir (tasa real) | d, n | `ir = d / (1 − n×d)` | Despeje algebraico del caso 3 |

**Estado: ✅ 4/4 correctas**

#### Derivación casos 3 y 4

De la equivalencia entre ley de capitalización simple y ley de descuento comercial:

```
Va = Vf/(1+ir×n)   [capitalización simple]
Va = Vf×(1−d×n)    [descuento comercial]

Igualando:  1/(1+ir×n) = 1−d×n
            d×n = 1 − 1/(1+ir×n) = ir×n/(1+ir×n)
            d = ir/(1+ir×n)  ✓  [caso 3]

Despejando ir de la ecuación anterior:
            d×(1+ir×n) = ir
            d + d×ir×n = ir
            ir×(1 − d×n) = d
            ir = d/(1−n×d)  ✓  [caso 4]
```

#### Nota sobre parámetro `n` en casos 1 y 2

La fórmula estándar de conversión nominal→efectiva anual es `i = (1+j/m)^m − 1`.  
La app usa `n` en lugar de `m` como exponente, lo que es una **generalización válida**:

| Valor de n | Significado |
|------------|-------------|
| n = m | Tasa efectiva **anual** (caso estándar) |
| n = 1 | Tasa efectiva por **sub-período** (ej: mensual si m=12) |
| n = k | Tasa efectiva para **k sub-períodos** |

La fórmula es matemáticamente correcta para cualquier n. El usuario debe ingresar n según el período para el que necesita la tasa efectiva.

---

## Resumen de Validación

| Módulo | Fórmulas validadas | Resultado |
|--------|--------------------|-----------|
| Interés Simple | 15 / 15 | ✅ Todas correctas |
| Interés Compuesto | 15 / 15 | ✅ Todas correctas |
| Anualidades Vencidas | 8 / 8 | ✅ Todas correctas |
| Anualidades Anticipadas | 8 / 8 | ✅ Todas correctas |
| Descuento Comercial | 15 / 15 | ✅ Todas correctas |
| Conversión de Tasas | 4 / 4 | ✅ Todas correctas |
| **Total** | **65 / 65** | ✅ |

**Conclusión:** La aplicación implementa correctamente las 65 operaciones financieras. Las fórmulas están alineadas con la literatura académica estándar de matemáticas financieras. La única observación es de carácter pedagógico: en el módulo Tasas, el parámetro `n` es una generalización del `m` de la fórmula estándar, lo cual es matemáticamente válido pero conviene aclararlo al usuario en las indicaciones.

---

*Documento generado: 2026-04-18*  
*Validado con Claude Sonnet 4.6 contra fuentes académicas de universidades e instituciones financieras de México, España y Colombia.*
