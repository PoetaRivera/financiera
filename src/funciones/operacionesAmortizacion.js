function fmt(num) {
  return parseFloat(num.toFixed(6));
}

export function tablaFrances(va, i, n) {
  const cuota = (va * i) / (1 - Math.pow(1 + i, -n));
  const filas = [];
  let saldo = va;

  for (let k = 1; k <= n; k++) {
    const interes = saldo * i;
    const capital = cuota - interes;
    saldo = k === n ? 0 : saldo - capital;

    filas.push({
      periodo: k,
      cuota:   fmt(cuota),
      interes: fmt(interes),
      capital: fmt(cuota - interes),
      saldo:   fmt(Math.max(0, saldo)),
    });
  }

  return {
    filas,
    cuotaFija: fmt(cuota),
    totalPagado: fmt(cuota * n),
    totalInteres: fmt(cuota * n - va),
    capital: fmt(va),
  };
}

export function tablaAleman(va, i, n) {
  const capitalFijo = va / n;
  const filas = [];
  let saldo = va;

  for (let k = 1; k <= n; k++) {
    const interes = saldo * i;
    const cuota = capitalFijo + interes;
    saldo = k === n ? 0 : saldo - capitalFijo;

    filas.push({
      periodo: k,
      cuota:   fmt(cuota),
      interes: fmt(interes),
      capital: fmt(capitalFijo),
      saldo:   fmt(Math.max(0, saldo)),
    });
  }

  const totalPagado = filas.reduce((s, f) => s + f.cuota, 0);
  const totalInteres = filas.reduce((s, f) => s + f.interes, 0);

  return {
    filas,
    cuotaFija: null,
    totalPagado: fmt(totalPagado),
    totalInteres: fmt(totalInteres),
    capital: fmt(va),
  };
}
