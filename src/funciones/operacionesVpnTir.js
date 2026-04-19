export function calcularVpn(flujos, tasa) {
  return flujos.reduce((acc, cf, k) => acc + cf / Math.pow(1 + tasa, k), 0);
}

export function calcularTir(flujos) {
  // Bisección: busca la tasa que hace VPN = 0
  const vpnBajo = calcularVpn(flujos, 0);
  if (Math.abs(vpnBajo) < 1e-8) return 0;

  // Necesita flujos mixtos (al menos un positivo y uno negativo)
  const tienePositivo = flujos.some(f => f > 0);
  const tieneNegativo = flujos.some(f => f < 0);
  if (!tienePositivo || !tieneNegativo) return null;

  let lo = -0.9999;
  let hi = 100;

  // Verifica que hay un cambio de signo en el rango
  if (calcularVpn(flujos, lo) * calcularVpn(flujos, hi) > 0) return null;

  for (let iter = 0; iter < 1000; iter++) {
    const mid = (lo + hi) / 2;
    const vpnMid = calcularVpn(flujos, mid);
    if (Math.abs(vpnMid) < 1e-8 || (hi - lo) < 1e-10) return mid;
    if (calcularVpn(flujos, lo) * vpnMid < 0) hi = mid;
    else lo = mid;
  }

  return (lo + hi) / 2;
}
