import { log } from "mathjs";

/**
 * Formatea un número a string con decimales fijos
 * @param {number} valor - El valor numérico a formatear
 * @param {number} decimales - Número de decimales (default: 6)
 * @returns {string} - El número formateado
 */
function formatear(valor, decimales = 6) {
  return parseFloat(valor).toFixed(decimales);
}

/**
 * Calcula el interés: I = Vf - Va
 * Casos 1 y 16 (Simple y Compuesto idénticos)
 */
function calcularInteres_VfMenosVa(vf, va) {
  const iI = vf - va;
  return formatear(iI);
}

/**
 * Calcula el valor futuro: Vf = Va + I
 * Casos 4 y 19 (Simple y Compuesto idénticos)
 */
function calcularVf_VaMasI(va, iI) {
  const vf = va + iI;
  return vf; // Nota: retorna el número, no formateado
}

/**
 * Calcula el valor actual: Va = Vf - I
 * Casos 7 y 22 (Simple y Compuesto idénticos)
 */
function calcularVa_VfMenosI(vf, iI) {
  const va = vf - iI;
  return formatear(va);
}

export function operaciones(caso, iI, vf, va, ii, nn, tipo) {
  const numDeci = 6;
  let x, y, z, u, w;

  if (tipo === 0) {
    iI = +iI;
    vf = +vf;
    va = +va;
    ii = +ii;
    nn = +nn;
    switch (caso) {
      case 1:
        return calcularInteres_VfMenosVa(vf, va);
      case 2:
        iI = va * ii * nn;
        iI = parseFloat(iI).toFixed(numDeci);
        return iI;
      case 3:
        x = vf * ii * nn;
        y = 1 + ii * nn;
        iI = x / y;
        iI = parseFloat(iI).toFixed(numDeci);
        return iI;
      case 4:
        return calcularVf_VaMasI(va, iI);
      case 5:
        x = 1 + ii * nn;
        y = ii * nn;
        vf = (iI * x) / y;
        vf = parseFloat(vf).toFixed(numDeci);
        return vf;
      case 6:
        x = 1 + ii * nn;
        vf = va * x;
        vf = parseFloat(vf).toFixed(numDeci);
        return vf;
      case 7:
        return calcularVa_VfMenosI(vf, iI);
      case 8:
        va = iI / (ii * nn);
        va = parseFloat(va).toFixed(numDeci);
        return va;
      case 9:
        x = 1 + ii * nn;
        va = vf / x;
        va = parseFloat(va).toFixed(numDeci);
        return va;
      case 10:
        x = vf - va;
        y = va * nn;
        ii = x / y;
        ii = parseFloat(ii).toFixed(numDeci);
        return ii;
      case 11:
        x = nn * (vf - iI);
        ii = iI / x;
        ii = parseFloat(ii).toFixed(numDeci);
        return ii;
      case 12:
        x = va * nn;
        ii = iI / x;
        ii = parseFloat(ii).toFixed(numDeci);
        return ii;
      case 13:
        x = vf - va;
        y = va * ii;
        nn = x / y;
        nn = parseFloat(nn).toFixed(numDeci);
        return nn;
      case 14:
        x = vf - iI;
        y = x * ii;
        nn = iI / y;
        nn = parseFloat(nn).toFixed(numDeci);
        return nn;
      case 15:
        x = va * ii;
        nn = iI / x;
        nn = parseFloat(nn).toFixed(numDeci);
        return nn;
      case 16:
        return calcularInteres_VfMenosVa(vf, va);
      case 17:
        x = (1 + ii) ** nn;
        iI = va * (x - 1);
        iI = parseFloat(iI).toFixed(numDeci);
        return iI;
      case 18:
        x = (1 + ii) ** nn;
        y = 1 / x;
        iI = vf * (1 - y);
        iI = parseFloat(iI).toFixed(numDeci);
        return iI;
      case 19:
        return calcularVf_VaMasI(va, iI);
      case 20:
        x = (1 + ii) ** nn;
        y = x - 1;
        vf = iI * (1 + 1 / y);
        vf = parseFloat(vf).toFixed(numDeci);
        return vf;
      case 21:
        x = (1 + ii) ** nn;
        vf = va * x;
        vf = parseFloat(vf).toFixed(numDeci);
        return vf;
      case 22:
        return calcularVa_VfMenosI(vf, iI);
      case 23:
        x = (1 + ii) ** nn;
        va = iI / (x - 1);
        va = parseFloat(va).toFixed(numDeci);
        return va;
      case 24:
        x = (1 + ii) ** nn;
        va = vf / x;
        va = parseFloat(va).toFixed(numDeci);
        return va;
      case 25:
        x = vf / va;
        y = x ** (1 / nn);
        ii = y - 1;
        ii = parseFloat(ii).toFixed(numDeci);
        return ii;
      case 26:
        x = vf / (vf - iI);
        ii = x ** (1 / nn) - 1;
        ii = parseFloat(ii).toFixed(numDeci);
        return ii;
      case 27:
        x = iI / va + 1;
        y = x ** (1 / nn);
        ii = y - 1;
        ii = parseFloat(ii).toFixed(numDeci);
        return ii;
      case 28:
        x = vf / va;
        y = 1 + ii;
        nn = log(x) / log(y);
        nn = parseFloat(nn).toFixed(numDeci);
        return nn;
      case 29:
        x = vf - iI;
        y = vf / x;
        nn = log(y) / log(1 + ii);
        nn = parseFloat(nn).toFixed(numDeci);
        return nn;
      case 30:
        x = iI / va + 1;
        y = log(x);
        z = 1 + ii;
        nn = y / log(z);
        nn = parseFloat(nn).toFixed(numDeci);
        return nn;

      default:
        break;
    }
    return null;
  } else {
    iI = +iI;
    vf = +vf;
    va = +va;
    ii = +ii;
    nn = +nn;
    switch (caso) {
      case 2:
        x = va * ii;
        y = (1 + ii) ** -nn;
        z = 1 - y;
        iI = x / z;
        iI = parseFloat(iI).toFixed(numDeci);
        return iI;
      case 3:
        x = vf * ii;
        y = (1 + ii) ** nn;
        z = y - 1;
        iI = x / z;
        iI = parseFloat(iI).toFixed(numDeci);
        return iI;

      case 5:
        x = (1 + ii) ** nn;
        y = iI * (x - 1);
        vf = y / ii;
        vf = parseFloat(vf).toFixed(numDeci);
        return vf;
      case 6:
        x = (1 + ii) ** nn;
        vf = va * x;
        vf = parseFloat(vf).toFixed(numDeci);
        return vf;

      case 8:
        x = (1 + ii) ** -nn;
        y = iI * (1 - x);
        va = y / ii;
        va = parseFloat(va).toFixed(numDeci);
        return va;
      case 9:
        x = (1 + ii) ** nn;
        va = vf / x;
        va = parseFloat(va).toFixed(numDeci);
        return va;
      case 10:
        x = vf - va;
        y = va * nn;
        ii = x / y;
        ii = parseFloat(ii).toFixed(numDeci);
        return ii;

      case 14:
        x = (vf * ii) / iI;
        y = x + 1;
        z = 1 + ii;
        nn = log(y) / log(z);
        nn = parseFloat(nn).toFixed(numDeci);
        return nn;

      case 15:
        x = (va * ii) / iI;
        y = 1 - x;
        z = 1 + ii;
        nn = -(log(y) / log(z));
        nn = parseFloat(nn).toFixed(numDeci);
        return nn;

      case 17:
        x = 1 + ii;
        y = (1 + ii) ** -nn;
        z = 1 - y;
        iI = va * (1 / x) * (ii / z);
        iI = parseFloat(iI).toFixed(numDeci);
        return iI;
      case 18:
        x = 1 + ii;
        y = x ** nn - 1;
        iI = vf * (1 / x) * (ii / y);
        iI = parseFloat(iI).toFixed(numDeci);
        return iI;

      case 20:
        x = 1 + ii;
        y = x ** nn - 1;
        vf = iI * x * (y / ii);
        vf = parseFloat(vf).toFixed(numDeci);
        return vf;
      case 21:
        x = (1 + ii) ** nn;
        vf = va * x;
        vf = parseFloat(vf).toFixed(numDeci);
        return vf;

      case 23:
        x = 1 + ii;
        y = 1 - x ** -nn;
        va = iI * x * (y / ii);
        va = parseFloat(va).toFixed(numDeci);
        return va;
      case 24:
        x = (1 + ii) ** -nn;
        va = vf * x;
        va = parseFloat(va).toFixed(numDeci);
        return va;

      case 29:
        x = 1 + ii;
        y = (ii * vf) / (iI * x);
        z = y + 1;
        nn = log(z) / log(x);
        nn = parseFloat(nn).toFixed(numDeci);
        return nn;
      case 30:
        x = 1 + ii;
        y = (va * ii) / iI;
        z = 1 / x;
        u = y * z;
        w = 1 - u;
        nn = -(log(w) / log(x));
        nn = parseFloat(nn).toFixed(numDeci);
        return nn;

      default:
        break;
    }
    return null;
  }
}
