export function operacionesTasas(caso, e1, e2, e3) {
  const numDeci = 6;
  const a = +e1, b = +e2, c = +e3;
  switch (caso) {
    case 1: return parseFloat(Math.pow(1 + a / b, c) - 1).toFixed(numDeci); // i = (1+j/m)^n - 1
    case 2: return parseFloat(b * (Math.pow(1 + a, 1 / c) - 1)).toFixed(numDeci); // j = m*((1+i)^(1/n)-1)
    case 3: return parseFloat(a / (1 + a * b)).toFixed(numDeci);              // d = ir/(1+ir*n)
    case 4: return parseFloat(a / (1 - b * a)).toFixed(numDeci);              // ir = d/(1-n*d)
    default: return null;
  }
}
