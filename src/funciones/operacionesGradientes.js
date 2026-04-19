function fmt(num) {
  return parseFloat(num.toFixed(6));
}

export function gradienteAritmetico(R, G, i, n) {
  const factorAnualidad = (1 - Math.pow(1 + i, -n)) / i;
  const va = R * factorAnualidad + (G / i) * (factorAnualidad - n * Math.pow(1 + i, -n));
  const vf = va * Math.pow(1 + i, n);

  const pagos = Array.from({ length: n }, (_, k) => ({
    periodo: k + 1,
    pago: fmt(R + G * k),
  }));

  return { va: fmt(va), vf: fmt(vf), pagos };
}

export function gradienteGeometrico(R, g, i, n) {
  let va;
  if (Math.abs(i - g) < 1e-10) {
    va = R * n / (1 + i);
  } else {
    va = R * (1 - Math.pow(1 + g, n) * Math.pow(1 + i, -n)) / (i - g);
  }
  const vf = va * Math.pow(1 + i, n);

  const pagos = Array.from({ length: n }, (_, k) => ({
    periodo: k + 1,
    pago: fmt(R * Math.pow(1 + g, k)),
  }));

  return { va: fmt(va), vf: fmt(vf), pagos };
}
