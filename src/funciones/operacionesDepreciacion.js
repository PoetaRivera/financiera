function fmt(num) {
  return parseFloat(num.toFixed(6));
}

export function lineaRecta(costo, vr, n) {
  const d = (costo - vr) / n;
  const filas = [];
  let libros = costo;
  for (let k = 1; k <= n; k++) {
    libros = k === n ? vr : libros - d;
    filas.push({ periodo: k, depreciacion: fmt(d), acumulada: fmt(d * k), libros: fmt(Math.max(vr, libros)) });
  }
  return filas;
}

export function sumaDigitos(costo, vr, n) {
  const sd = (n * (n + 1)) / 2;
  const base = costo - vr;
  const filas = [];
  let acum = 0;
  for (let k = 1; k <= n; k++) {
    const d = ((n - k + 1) / sd) * base;
    acum += d;
    filas.push({ periodo: k, depreciacion: fmt(d), acumulada: fmt(acum), libros: fmt(costo - acum) });
  }
  return filas;
}

export function dobleSaldo(costo, vr, n) {
  const tasa = 2 / n;
  const filas = [];
  let bv = costo;
  let acum = 0;
  for (let k = 1; k <= n; k++) {
    let d = tasa * bv;
    // Cambio a línea recta cuando conviene
    const periodosRestantes = n - k + 1;
    const dLineaRecta = (bv - vr) / periodosRestantes;
    if (dLineaRecta > d) d = dLineaRecta;
    if (bv - d < vr) d = bv - vr;
    acum += d;
    bv -= d;
    if (bv < vr) bv = vr;
    filas.push({ periodo: k, depreciacion: fmt(d), acumulada: fmt(acum), libros: fmt(bv) });
  }
  return filas;
}
