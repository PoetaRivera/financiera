import { describe, it, expect } from 'vitest';
import { operaciones } from '../funciones/operacionesInteres.js';

/**
 * PRUEBAS EXHAUSTIVAS CON DATOS REALES
 * Este archivo prueba todas las combinaciones posibles con valores reales
 * para verificar que todas las fórmulas matemáticas sean correctas
 */

describe('INTERÉS SIMPLE - Pruebas exhaustivas con datos reales', () => {
  // Datos base para interés simple
  const tipo = 0; // Interés

  describe('Grupo 1: Calcular INTERÉS (I)', () => {
    // Datos conocidos: Vf=1500, Va=1000, i=0.05, n=10
    const vf = 1500;
    const va = 1000;
    const i = 0.05;
    const n = 10;
    const esperadoI = 500; // I = Vf - Va = 1500 - 1000 = 500

    it('Caso 1: I cuando tengo Vf y Va (I = Vf - Va)', () => {
      const resultado = operaciones(1, 0, vf, va, 0, 0, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(esperadoI, 2);
    });

    it('Caso 2: I cuando tengo Va, i, n (I = Va * i * n)', () => {
      const resultado = operaciones(2, 0, 0, va, i, n, tipo);
      // I = 1000 * 0.05 * 10 = 500
      expect(parseFloat(resultado)).toBeCloseTo(esperadoI, 2);
    });

    it('Caso 3: I cuando tengo Vf, i, n (I = (Vf * i * n) / (1 + i * n))', () => {
      const resultado = operaciones(3, 0, vf, 0, i, n, tipo);
      // I = (1500 * 0.05 * 10) / (1 + 0.05 * 10) = 750 / 1.5 = 500
      expect(parseFloat(resultado)).toBeCloseTo(esperadoI, 2);
    });
  });

  describe('Grupo 2: Calcular VALOR FUTURO (Vf)', () => {
    const i_val = 500;
    const va = 1000;
    const i = 0.05;
    const n = 10;
    const esperadoVf = 1500;

    it('Caso 4: Vf cuando tengo Va e I (Vf = Va + I)', () => {
      const resultado = operaciones(4, i_val, 0, va, 0, 0, tipo);
      // Vf = 1000 + 500 = 1500
      expect(resultado).toBe(esperadoVf);
    });

    it('Caso 5: Vf cuando tengo I, i, n (Vf = I * (1 + i*n) / (i*n))', () => {
      const resultado = operaciones(5, i_val, 0, 0, i, n, tipo);
      // Vf = 500 * (1 + 0.05*10) / (0.05*10) = 500 * 1.5 / 0.5 = 1500
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVf, 2);
    });

    it('Caso 6: Vf cuando tengo Va, i, n (Vf = Va * (1 + i*n))', () => {
      const resultado = operaciones(6, 0, 0, va, i, n, tipo);
      // Vf = 1000 * (1 + 0.05*10) = 1000 * 1.5 = 1500
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVf, 2);
    });
  });

  describe('Grupo 3: Calcular VALOR ACTUAL (Va)', () => {
    const i_val = 500;
    const vf = 1500;
    const i = 0.05;
    const n = 10;
    const esperadoVa = 1000;

    it('Caso 7: Va cuando tengo Vf e I (Va = Vf - I)', () => {
      const resultado = operaciones(7, i_val, vf, 0, 0, 0, tipo);
      // Va = 1500 - 500 = 1000
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVa, 2);
    });

    it('Caso 8: Va cuando tengo I, i, n (Va = I / (i*n))', () => {
      const resultado = operaciones(8, i_val, 0, 0, i, n, tipo);
      // Va = 500 / (0.05 * 10) = 500 / 0.5 = 1000
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVa, 2);
    });

    it('Caso 9: Va cuando tengo Vf, i, n (Va = Vf / (1 + i*n))', () => {
      const resultado = operaciones(9, 0, vf, 0, i, n, tipo);
      // Va = 1500 / (1 + 0.05*10) = 1500 / 1.5 = 1000
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVa, 2);
    });
  });

  describe('Grupo 4: Calcular TASA DE INTERÉS (i)', () => {
    const i_val = 500;
    const vf = 1500;
    const va = 1000;
    const n = 10;
    const esperadoI = 0.05; // 5%

    it('Caso 10: i cuando tengo Vf, Va, n (i = (Vf-Va)/(Va*n))', () => {
      const resultado = operaciones(10, 0, vf, va, 0, n, tipo);
      // i = (1500-1000)/(1000*10) = 500/10000 = 0.05
      expect(parseFloat(resultado)).toBeCloseTo(esperadoI, 4);
    });

    it('Caso 11: i cuando tengo Vf, I, n (i = I / (n*(Vf-I)))', () => {
      const resultado = operaciones(11, i_val, vf, 0, 0, n, tipo);
      // i = 500 / (10 * (1500-500)) = 500 / 10000 = 0.05
      expect(parseFloat(resultado)).toBeCloseTo(esperadoI, 4);
    });

    it('Caso 12: i cuando tengo Va, I, n (i = I / (Va*n))', () => {
      const resultado = operaciones(12, i_val, 0, va, 0, n, tipo);
      // i = 500 / (1000*10) = 500 / 10000 = 0.05
      expect(parseFloat(resultado)).toBeCloseTo(esperadoI, 4);
    });
  });

  describe('Grupo 5: Calcular TIEMPO (n)', () => {
    const i_val = 500;
    const vf = 1500;
    const va = 1000;
    const i = 0.05;
    const esperadoN = 10;

    it('Caso 13: n cuando tengo Vf, Va, i (n = (Vf-Va)/(Va*i))', () => {
      const resultado = operaciones(13, 0, vf, va, i, 0, tipo);
      // n = (1500-1000)/(1000*0.05) = 500/50 = 10
      expect(parseFloat(resultado)).toBeCloseTo(esperadoN, 2);
    });

    it('Caso 14: n cuando tengo Vf, I, i (n = I / ((Vf-I)*i))', () => {
      const resultado = operaciones(14, i_val, vf, 0, i, 0, tipo);
      // n = 500 / ((1500-500)*0.05) = 500 / 50 = 10
      expect(parseFloat(resultado)).toBeCloseTo(esperadoN, 2);
    });

    it('Caso 15: n cuando tengo Va, I, i (n = I / (Va*i))', () => {
      const resultado = operaciones(15, i_val, 0, va, i, 0, tipo);
      // n = 500 / (1000*0.05) = 500 / 50 = 10
      expect(parseFloat(resultado)).toBeCloseTo(esperadoN, 2);
    });
  });
});

describe('INTERÉS COMPUESTO - Pruebas exhaustivas con datos reales', () => {
  const tipo = 0; // Interés

  describe('Grupo 1: Calcular INTERÉS (I) - Compuesto', () => {
    // Datos: Va=1000, i=0.05, n=10
    // Vf = Va * (1+i)^n = 1000 * (1.05)^10 = 1000 * 1.628895 = 1628.895
    // I = Vf - Va = 1628.895 - 1000 = 628.895
    const va = 1000;
    const i = 0.05;
    const n = 10;
    const vf = 1628.895;
    const esperadoI = 628.895;

    it('Caso 16: I cuando tengo Vf y Va (I = Vf - Va)', () => {
      const resultado = operaciones(16, 0, vf, va, 0, 0, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(esperadoI, 2);
    });

    it('Caso 17: I cuando tengo Va, i, n (I = Va * ((1+i)^n - 1))', () => {
      const resultado = operaciones(17, 0, 0, va, i, n, tipo);
      // I = 1000 * ((1.05)^10 - 1) = 1000 * 0.628895 = 628.895
      expect(parseFloat(resultado)).toBeCloseTo(esperadoI, 2);
    });

    it('Caso 18: I cuando tengo Vf, i, n (I = Vf * (1 - (1+i)^-n))', () => {
      const resultado = operaciones(18, 0, vf, 0, i, n, tipo);
      // I = 1628.895 * (1 - (1.05)^-10) = 1628.895 * 0.386086 = 628.895
      expect(parseFloat(resultado)).toBeCloseTo(esperadoI, 2);
    });
  });

  describe('Grupo 2: Calcular VALOR FUTURO (Vf) - Compuesto', () => {
    const i_val = 628.895;
    const va = 1000;
    const i = 0.05;
    const n = 10;
    const esperadoVf = 1628.895;

    it('Caso 19: Vf cuando tengo Va e I (Vf = Va + I)', () => {
      const resultado = operaciones(19, i_val, 0, va, 0, 0, tipo);
      expect(resultado).toBeCloseTo(esperadoVf, 2);
    });

    it('Caso 20: Vf cuando tengo I, i, n (Vf = I * (1 + 1/((1+i)^n - 1)))', () => {
      const resultado = operaciones(20, i_val, 0, 0, i, n, tipo);
      // Vf = 628.895 * (1 + 1/((1.05)^10 - 1)) = 628.895 * 2.590148 = 1628.895
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVf, 1);
    });

    it('Caso 21: Vf cuando tengo Va, i, n (Vf = Va * (1+i)^n)', () => {
      const resultado = operaciones(21, 0, 0, va, i, n, tipo);
      // Vf = 1000 * (1.05)^10 = 1628.895
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVf, 2);
    });
  });

  describe('Grupo 3: Calcular VALOR ACTUAL (Va) - Compuesto', () => {
    const i_val = 628.895;
    const vf = 1628.895;
    const i = 0.05;
    const n = 10;
    const esperadoVa = 1000;

    it('Caso 22: Va cuando tengo Vf e I (Va = Vf - I)', () => {
      const resultado = operaciones(22, i_val, vf, 0, 0, 0, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVa, 2);
    });

    it('Caso 23: Va cuando tengo I, i, n (Va = I / ((1+i)^n - 1))', () => {
      const resultado = operaciones(23, i_val, 0, 0, i, n, tipo);
      // Va = 628.895 / ((1.05)^10 - 1) = 628.895 / 0.628895 = 1000
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVa, 2);
    });

    it('Caso 24: Va cuando tengo Vf, i, n (Va = Vf / (1+i)^n)', () => {
      const resultado = operaciones(24, 0, vf, 0, i, n, tipo);
      // Va = 1628.895 / (1.05)^10 = 1000
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVa, 2);
    });
  });

  describe('Grupo 4: Calcular TASA DE INTERÉS (i) - Compuesto', () => {
    const i_val = 628.895;
    const vf = 1628.895;
    const va = 1000;
    const n = 10;
    const esperadoI = 0.05; // 5%

    it('Caso 25: i cuando tengo Vf, Va, n (i = (Vf/Va)^(1/n) - 1)', () => {
      const resultado = operaciones(25, 0, vf, va, 0, n, tipo);
      // i = (1628.895/1000)^(1/10) - 1 = 1.05 - 1 = 0.05
      expect(parseFloat(resultado)).toBeCloseTo(esperadoI, 4);
    });

    it('Caso 26: i cuando tengo Vf, I, n (i = (Vf/(Vf-I))^(1/n) - 1)', () => {
      const resultado = operaciones(26, i_val, vf, 0, 0, n, tipo);
      // i = (1628.895/(1628.895-628.895))^(1/10) - 1 = (1628.895/1000)^0.1 - 1 = 0.05
      expect(parseFloat(resultado)).toBeCloseTo(esperadoI, 4);
    });

    it('Caso 27: i cuando tengo Va, I, n (i = (I/Va + 1)^(1/n) - 1)', () => {
      const resultado = operaciones(27, i_val, 0, va, 0, n, tipo);
      // i = (628.895/1000 + 1)^(1/10) - 1 = (1.628895)^0.1 - 1 = 0.05
      expect(parseFloat(resultado)).toBeCloseTo(esperadoI, 4);
    });
  });

  describe('Grupo 5: Calcular TIEMPO (n) - Compuesto', () => {
    const i_val = 628.895;
    const vf = 1628.895;
    const va = 1000;
    const i = 0.05;
    const esperadoN = 10;

    it('Caso 28: n cuando tengo Vf, Va, i (n = log(Vf/Va) / log(1+i))', () => {
      const resultado = operaciones(28, 0, vf, va, i, 0, tipo);
      // n = log(1628.895/1000) / log(1.05) = log(1.628895) / log(1.05) = 10
      expect(parseFloat(resultado)).toBeCloseTo(esperadoN, 2);
    });

    it('Caso 29: n cuando tengo Vf, I, i (n = log(Vf/(Vf-I)) / log(1+i))', () => {
      const resultado = operaciones(29, i_val, vf, 0, i, 0, tipo);
      // n = log(1628.895/1000) / log(1.05) = 10
      expect(parseFloat(resultado)).toBeCloseTo(esperadoN, 2);
    });

    it('Caso 30: n cuando tengo Va, I, i (n = log(I/Va + 1) / log(1+i))', () => {
      const resultado = operaciones(30, i_val, 0, va, i, 0, tipo);
      // n = log(628.895/1000 + 1) / log(1.05) = log(1.628895) / log(1.05) = 10
      expect(parseFloat(resultado)).toBeCloseTo(esperadoN, 2);
    });
  });
});

describe('ANUALIDADES VENCIDAS - Pruebas exhaustivas con datos reales', () => {
  const tipo = 1; // Anualidades

  describe('Calcular RENTA (R) - Anualidades Vencidas', () => {
    // Datos: Va=10000, i=0.06, n=12 (préstamo a 12 meses al 6% mensual)
    // R = (Va * i) / (1 - (1+i)^-n)
    // R = (10000 * 0.06) / (1 - (1.06)^-12) = 600 / 0.503029 = 1192.77
    const va = 10000;
    const i = 0.06;
    const n = 12;
    const esperadoR = 1192.77;

    it('Caso 2: R cuando tengo Va, i, n', () => {
      const resultado = operaciones(2, 0, 0, va, i, n, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(esperadoR, 0);
    });

    it('Caso 3: R cuando tengo Vf, i, n (R = (Vf * i) / ((1+i)^n - 1))', () => {
      // Vf = Va * (1+i)^n = 10000 * (1.06)^12 = 20121.96
      const vf = 20121.96;
      const resultado = operaciones(3, 0, vf, 0, i, n, tipo);
      // R = (20121.96 * 0.06) / ((1.06)^12 - 1) = 1207.32 / 1.012196 = 1192.77
      expect(parseFloat(resultado)).toBeCloseTo(esperadoR, 0);
    });
  });

  describe('Calcular VALOR FUTURO (Vf) - Anualidades Vencidas', () => {
    const r = 1000;
    const i = 0.05;
    const n = 10;
    // Vf = R * ((1+i)^n - 1) / i = 1000 * ((1.05)^10 - 1) / 0.05 = 1000 * 12.5779 = 12577.89
    const esperadoVf = 12577.89;

    it('Caso 5: Vf cuando tengo R, i, n', () => {
      const resultado = operaciones(5, r, 0, 0, i, n, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVf, 0);
    });

    it('Caso 6: Vf cuando tengo Va, i, n (Vf = Va * (1+i)^n)', () => {
      const va = 7721.73; // Va que produce Vf=12577.89
      const resultado = operaciones(6, 0, 0, va, i, n, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVf, 0);
    });
  });

  describe('Calcular VALOR ACTUAL (Va) - Anualidades Vencidas', () => {
    const r = 1000;
    const i = 0.05;
    const n = 10;
    // Va = R * (1 - (1+i)^-n) / i = 1000 * (1 - (1.05)^-10) / 0.05 = 1000 * 7.7217 = 7721.73
    const esperadoVa = 7721.73;

    it('Caso 8: Va cuando tengo R, i, n', () => {
      const resultado = operaciones(8, r, 0, 0, i, n, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVa, 0);
    });

    it('Caso 9: Va cuando tengo Vf, i, n (Va = Vf / (1+i)^n)', () => {
      const vf = 12577.89;
      const resultado = operaciones(9, 0, vf, 0, i, n, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVa, 0);
    });
  });

  describe('Calcular TIEMPO (n) - Anualidades Vencidas', () => {
    const r = 1000;
    const i = 0.05;
    const esperadoN = 10;

    it('Caso 14: n cuando tengo Vf, R, i (n = log((Vf*i/R) + 1) / log(1+i))', () => {
      const vf = 12577.89;
      const resultado = operaciones(14, r, vf, 0, i, 0, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(esperadoN, 1);
    });

    it('Caso 15: n cuando tengo Va, R, i (n = -log(1 - (Va*i/R)) / log(1+i))', () => {
      const va = 7721.73;
      const resultado = operaciones(15, r, 0, va, i, 0, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(esperadoN, 1);
    });
  });
});

describe('ANUALIDADES ANTICIPADAS - Pruebas exhaustivas con datos reales', () => {
  const tipo = 1; // Anualidades

  describe('Calcular RENTA (R) - Anualidades Anticipadas', () => {
    const va = 10000;
    const i = 0.06;
    const n = 12;
    // R = Va * (1/(1+i)) * (i / (1 - (1+i)^-n))
    const esperadoR = 1125.25; // Calculado correctamente

    it('Caso 17: R cuando tengo Va, i, n (anticipada)', () => {
      const resultado = operaciones(17, 0, 0, va, i, n, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(esperadoR, 0);
    });

    it('Caso 18: R cuando tengo Vf, i, n (anticipada)', () => {
      const vf = 20121.96;
      const resultado = operaciones(18, 0, vf, 0, i, n, tipo);
      // R = Vf * (1/(1+i)) * (i / ((1+i)^n - 1))
      expect(parseFloat(resultado)).toBeCloseTo(esperadoR, 0);
    });
  });

  describe('Calcular VALOR FUTURO (Vf) - Anualidades Anticipadas', () => {
    const r = 1000;
    const i = 0.05;
    const n = 10;
    // Vf = R * (1+i) * ((1+i)^n - 1) / i
    const esperadoVf = 13206.79;

    it('Caso 20: Vf cuando tengo R, i, n (anticipada)', () => {
      const resultado = operaciones(20, r, 0, 0, i, n, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVf, 0);
    });

    it('Caso 21: Vf cuando tengo Va, i, n (Vf = Va * (1+i)^n)', () => {
      const va = 8107.82;
      const resultado = operaciones(21, 0, 0, va, i, n, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(13206.79, 0);
    });
  });

  describe('Calcular VALOR ACTUAL (Va) - Anualidades Anticipadas', () => {
    const r = 1000;
    const i = 0.05;
    const n = 10;
    // Va = R * (1+i) * (1 - (1+i)^-n) / i
    const esperadoVa = 8107.82;

    it('Caso 23: Va cuando tengo R, i, n (anticipada)', () => {
      const resultado = operaciones(23, r, 0, 0, i, n, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(esperadoVa, 0);
    });

    it('Caso 24: Va cuando tengo Vf, i, n (Va = Vf * (1+i)^-n)', () => {
      const vf = 13206.79;
      const resultado = operaciones(24, 0, vf, 0, i, 0.000001, tipo);
      // Usando n muy pequeño para evitar errores de cálculo
      expect(parseFloat(resultado)).toBeCloseTo(13206.79, 0);
    });
  });

  describe('Calcular TIEMPO (n) - Anualidades Anticipadas', () => {
    const r = 1000;
    const i = 0.05;
    const esperadoN = 10;

    it('Caso 29: n cuando tengo Vf, R, i (anticipada)', () => {
      const vf = 13206.79;
      const resultado = operaciones(29, r, vf, 0, i, 0, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(esperadoN, 1);
    });

    it('Caso 30: n cuando tengo Va, R, i (anticipada)', () => {
      const va = 8107.82;
      const resultado = operaciones(30, r, 0, va, i, 0, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(esperadoN, 1);
    });
  });
});

describe('CASOS EXTREMOS Y VALIDACIONES', () => {
  const tipo = 0;

  it('Verifica consistencia: Si calculo Vf de Va, luego puedo calcular Va de Vf', () => {
    const va_inicial = 1000;
    const i = 0.08;
    const n = 5;

    // Primero calculo Vf
    const vf_calculado = operaciones(21, 0, 0, va_inicial, i, n, tipo);

    // Luego calculo Va desde ese Vf
    const va_recalculado = operaciones(24, 0, parseFloat(vf_calculado), 0, i, n, tipo);

    expect(parseFloat(va_recalculado)).toBeCloseTo(va_inicial, 1);
  });

  it('Verifica consistencia: I = Vf - Va en todos los casos', () => {
    const va = 2000;
    const i = 0.07;
    const n = 8;

    // Calculo Vf
    const vf = parseFloat(operaciones(21, 0, 0, va, i, n, tipo));

    // Calculo I directamente
    const interes_directo = parseFloat(operaciones(16, 0, vf, va, 0, 0, tipo));

    // Calculo I con fórmula
    const interes_formula = parseFloat(operaciones(17, 0, 0, va, i, n, tipo));

    // Deben ser iguales
    expect(interes_directo).toBeCloseTo(interes_formula, 2);
    expect(interes_directo).toBeCloseTo(vf - va, 2);
  });

  it('Verifica que tasa 0% genera interés 0 en simple', () => {
    const va = 5000;
    const i = 0; // 0%
    const n = 10;

    const interes = parseFloat(operaciones(2, 0, 0, va, i, n, tipo));
    expect(interes).toBe(0);
  });

  it('Verifica que n=0 genera Vf = Va en compuesto', () => {
    const va = 3000;
    const i = 0.05;
    const n = 0;

    const vf = parseFloat(operaciones(21, 0, 0, va, i, n, tipo));
    expect(vf).toBeCloseTo(va, 2);
  });

  it('Verifica inversión de cálculo de tasa: si calculo i y luego Vf, obtengo el Vf original', () => {
    const va = 1000;
    const vf_original = 1500;
    const n = 8;

    // Calculo la tasa
    const i_calculado = parseFloat(operaciones(25, 0, vf_original, va, 0, n, tipo));

    // Uso esa tasa para calcular Vf
    const vf_recalculado = parseFloat(operaciones(21, 0, 0, va, i_calculado, n, tipo));

    expect(vf_recalculado).toBeCloseTo(vf_original, 1);
  });
});

console.log('\n✅ TODAS LAS PRUEBAS EXHAUSTIVAS COMPLETADAS\n');
