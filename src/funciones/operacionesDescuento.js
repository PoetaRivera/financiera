export function operacionesDescuento(caso, dD, vf, va, dd, nn) {
  const numDeci = 6;
  dD = +dD; vf = +vf; va = +va; dd = +dd; nn = +nn;

  switch (caso) {
    // Calcular D
    case 1: return parseFloat(vf - va).toFixed(numDeci);
    case 2: if (dd * nn >= 1) return null;
            return parseFloat((va * dd * nn) / (1 - dd * nn)).toFixed(numDeci);
    case 3: return parseFloat(vf * dd * nn).toFixed(numDeci);
    // Calcular Vf
    case 4: return parseFloat(va + dD).toFixed(numDeci);
    case 5: return parseFloat(dD / (dd * nn)).toFixed(numDeci);
    case 6: if (dd * nn >= 1) return null;
            return parseFloat(va / (1 - dd * nn)).toFixed(numDeci);
    // Calcular Va
    case 7: return parseFloat(vf - dD).toFixed(numDeci);
    case 8: return parseFloat(dD * (1 / (dd * nn) - 1)).toFixed(numDeci);
    case 9: return parseFloat(vf * (1 - dd * nn)).toFixed(numDeci);
    // Calcular d (resultado como decimal)
    case 10: return parseFloat((vf - va) / (vf * nn)).toFixed(numDeci);
    case 11: return parseFloat(dD / (nn * vf)).toFixed(numDeci);
    case 12: return parseFloat(dD / ((va + dD) * nn)).toFixed(numDeci);
    // Calcular n
    case 13: return parseFloat((vf - va) / (vf * dd)).toFixed(numDeci);
    case 14: return parseFloat(dD / (vf * dd)).toFixed(numDeci);
    case 15: return parseFloat(dD / ((va + dD) * dd)).toFixed(numDeci);
    default: return null;
  }
}
