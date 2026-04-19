import { describe, it, expect } from 'vitest';
import { operaciones } from './operacionesInteres.js';

describe('operacionesInteres - Interés Simple', () => {
  const tipo = 0; // Interés Simple

  describe('Caso 1 y 16: Calcular Interés (I = Vf - Va)', () => {
    it('debe calcular el interés correctamente con valores positivos', () => {
      const resultado = operaciones(1, 0, 1000, 800, 0, 0, tipo);
      expect(resultado).toBe('200.000000');
    });

    it('debe manejar valores decimales', () => {
      const resultado = operaciones(1, 0, 1500.50, 1000.25, 0, 0, tipo);
      expect(resultado).toBe('500.250000');
    });

    it('debe devolver cero cuando Vf = Va', () => {
      const resultado = operaciones(1, 0, 1000, 1000, 0, 0, tipo);
      expect(resultado).toBe('0.000000');
    });
  });

  describe('Caso 2: Calcular Interés Simple (I = Va * i * n)', () => {
    it('debe calcular interés simple correctamente', () => {
      const resultado = operaciones(2, 0, 0, 1000, 0.05, 2, tipo);
      expect(resultado).toBe('100.000000');
    });

    it('debe manejar tasa decimal pequeña', () => {
      const resultado = operaciones(2, 0, 0, 1000, 0.01, 12, tipo);
      expect(resultado).toBe('120.000000');
    });

    it('debe devolver cero si algún parámetro es cero', () => {
      const resultado = operaciones(2, 0, 0, 1000, 0, 12, tipo);
      expect(resultado).toBe('0.000000');
    });
  });

  describe('Caso 3: Calcular Interés con Vf conocido', () => {
    it('debe calcular correctamente', () => {
      const resultado = operaciones(3, 0, 1100, 0, 0.05, 2, tipo);
      expect(resultado).toBe('100.000000');
    });
  });

  describe('Caso 4 y 19: Calcular Valor Futuro (Vf = Va + I)', () => {
    it('debe calcular el valor futuro correctamente', () => {
      const resultado = operaciones(4, 100, 0, 1000, 0, 0, tipo);
      expect(resultado).toBe(1100); // Devuelve Vf = Va + I = 1000 + 100
    });
  });

  describe('Caso 6: Calcular Vf con interés simple (Vf = Va * (1 + i*n))', () => {
    it('debe calcular el valor futuro con interés simple', () => {
      const resultado = operaciones(6, 0, 0, 1000, 0.05, 2, tipo);
      expect(resultado).toBe('1100.000000');
    });

    it('debe manejar diferentes tasas y períodos', () => {
      const resultado = operaciones(6, 0, 0, 5000, 0.03, 5, tipo);
      expect(resultado).toBe('5750.000000');
    });
  });

  describe('Caso 7 y 22: Calcular Va (Va = Vf - I)', () => {
    it('debe calcular el valor actual correctamente', () => {
      const resultado = operaciones(7, 200, 1200, 0, 0, 0, tipo);
      expect(resultado).toBe('1000.000000');
    });
  });

  describe('Caso 9: Calcular Va con descuento (Va = Vf / (1 + i*n))', () => {
    it('debe calcular el valor actual con descuento', () => {
      const resultado = operaciones(9, 0, 1100, 0, 0.05, 2, tipo);
      expect(resultado).toBe('1000.000000');
    });
  });

  describe('Caso 10: Calcular tasa de interés (i = (Vf - Va) / (Va * n))', () => {
    it('debe calcular la tasa de interés correctamente', () => {
      const resultado = operaciones(10, 0, 1100, 1000, 0, 2, tipo);
      expect(resultado).toBe('0.050000');
    });

    it('debe manejar diferentes valores', () => {
      const resultado = operaciones(10, 0, 1500, 1000, 0, 10, tipo);
      expect(resultado).toBe('0.050000');
    });
  });

  describe('Caso 13: Calcular número de períodos (n = (Vf - Va) / (Va * i))', () => {
    it('debe calcular el número de períodos correctamente', () => {
      const resultado = operaciones(13, 0, 1100, 1000, 0.05, 0, tipo);
      expect(resultado).toBe('2.000000');
    });

    it('debe manejar diferentes escenarios', () => {
      const resultado = operaciones(13, 0, 2000, 1000, 0.1, 0, tipo);
      expect(resultado).toBe('10.000000');
    });
  });
});

describe('operacionesInteres - Interés Compuesto', () => {
  const tipo = 0; // Mismo tipo, pero casos diferentes

  describe('Caso 17: Calcular I compuesto (I = Va * ((1+i)^n - 1))', () => {
    it('debe calcular el interés compuesto correctamente', () => {
      const resultado = operaciones(17, 0, 0, 1000, 0.05, 2, tipo);
      // I = 1000 * ((1.05)^2 - 1) = 1000 * (1.1025 - 1) = 102.5
      expect(resultado).toBe('102.500000');
    });

    it('debe manejar más períodos', () => {
      const resultado = operaciones(17, 0, 0, 1000, 0.1, 3, tipo);
      // I = 1000 * ((1.1)^3 - 1) = 1000 * (1.331 - 1) = 331
      expect(resultado).toBe('331.000000');
    });
  });

  describe('Caso 21: Calcular Vf compuesto (Vf = Va * (1+i)^n)', () => {
    it('debe calcular el valor futuro con interés compuesto', () => {
      const resultado = operaciones(21, 0, 0, 1000, 0.05, 2, tipo);
      // Vf = 1000 * (1.05)^2 = 1102.5
      expect(resultado).toBe('1102.500000');
    });

    it('debe manejar diferentes escenarios', () => {
      const resultado = operaciones(21, 0, 0, 5000, 0.08, 10, tipo);
      // Vf = 5000 * (1.08)^10 ≈ 10794.62
      expect(parseFloat(resultado)).toBeCloseTo(10794.624777, 3);
    });
  });

  describe('Caso 24: Calcular Va con descuento compuesto (Va = Vf / (1+i)^n)', () => {
    it('debe calcular el valor actual con descuento compuesto', () => {
      const resultado = operaciones(24, 0, 1102.5, 0, 0.05, 2, tipo);
      expect(parseFloat(resultado)).toBeCloseTo(1000, 5);
    });
  });

  describe('Caso 25: Calcular tasa con interés compuesto', () => {
    it('debe calcular la tasa de interés compuesto', () => {
      const resultado = operaciones(25, 0, 1102.5, 1000, 0, 2, tipo);
      // i = (Vf/Va)^(1/n) - 1 = (1102.5/1000)^(1/2) - 1 ≈ 0.05
      expect(parseFloat(resultado)).toBeCloseTo(0.05, 5);
    });
  });

  describe('Caso 28: Calcular n con interés compuesto', () => {
    it('debe calcular el número de períodos con interés compuesto', () => {
      const resultado = operaciones(28, 0, 1102.5, 1000, 0.05, 0, tipo);
      // n = log(Vf/Va) / log(1+i) = log(1.1025) / log(1.05) ≈ 2
      expect(parseFloat(resultado)).toBeCloseTo(2, 5);
    });
  });
});

describe('operacionesInteres - Anualidades', () => {
  const tipo = 1; // Anualidades

  describe('Caso 2 (Anualidades): Calcular R con Va', () => {
    it('debe calcular la renta con valor actual', () => {
      const resultado = operaciones(2, 0, 0, 1000, 0.05, 12, tipo);
      // R = (Va * i) / (1 - (1+i)^-n)
      const i = 0.05;
      const n = 12;
      const esperado = (1000 * i) / (1 - Math.pow(1 + i, -n));
      expect(parseFloat(resultado)).toBeCloseTo(esperado, 5);
    });
  });

  describe('Caso 3 (Anualidades): Calcular R con Vf', () => {
    it('debe calcular la renta con valor futuro', () => {
      const resultado = operaciones(3, 0, 15917.127, 0, 0.05, 12, tipo);
      // R = (Vf * i) / ((1+i)^n - 1)
      const esperado = 1000; // Aproximadamente
      expect(parseFloat(resultado)).toBeCloseTo(esperado, 0);
    });
  });

  describe('Caso 6 (Anualidades): Calcular Vf = Va * (1+i)^n', () => {
    it('debe calcular el valor futuro de anualidad', () => {
      const resultado = operaciones(6, 0, 0, 1000, 0.05, 2, tipo);
      const esperado = 1000 * Math.pow(1.05, 2);
      expect(parseFloat(resultado)).toBeCloseTo(esperado, 5);
    });
  });

  describe('Caso 8 (Anualidades): Calcular Va con renta', () => {
    it('debe calcular el valor actual de anualidad', () => {
      const resultado = operaciones(8, 100, 0, 0, 0.05, 12, tipo);
      // Va = R * (1 - (1+i)^-n) / i
      const esperado = 100 * (1 - Math.pow(1.05, -12)) / 0.05;
      expect(parseFloat(resultado)).toBeCloseTo(esperado, 5);
    });
  });
});

describe('Validación de casos especiales', () => {
  it('debe devolver null para caso no válido en interés simple', () => {
    const resultado = operaciones(999, 0, 0, 1000, 0.05, 2, 0);
    expect(resultado).toBeNull();
  });

  it('debe manejar valores string convirtiéndolos a números', () => {
    const resultado = operaciones(1, '0', '1000', '800', '0', '0', 0);
    expect(resultado).toBe('200.000000');
  });

  it('debe manejar decimales con precisión de 6 dígitos', () => {
    const resultado = operaciones(2, 0, 0, 100.123456, 0.0456789, 3, 0);
    const esperado = 100.123456 * 0.0456789 * 3;
    expect(resultado).toBe(esperado.toFixed(6));
  });
});

describe('Guardas de dominio — logaritmos', () => {
  describe('caso 29 (tipo=0): n = log(Vf/(Vf-I)) / log(1+i)', () => {
    it('Vf = I → null (log de cero)', () => {
      expect(operaciones(29, 1000, 1000, 0, 0.05, 0, 0)).toBeNull();
    });
    it('Vf < I → null (log de negativo)', () => {
      expect(operaciones(29, 1200, 1000, 0, 0.05, 0, 0)).toBeNull();
    });
    it('Vf > I → valor válido', () => {
      expect(operaciones(29, 100, 1000, 0, 0.05, 0, 0)).not.toBeNull();
    });
  });

  describe('caso 15 (tipo=1, anticipada): n con condición R > Va*i', () => {
    it('R = Va*i → null', () => {
      // R=10, Va=100, i=0.1 → R = Va*i
      expect(operaciones(15, 10, 0, 100, 0.1, 0, 1)).toBeNull();
    });
    it('R < Va*i → null', () => {
      expect(operaciones(15, 5, 0, 100, 0.1, 0, 1)).toBeNull();
    });
    it('R > Va*i → valor válido', () => {
      expect(operaciones(15, 20, 0, 100, 0.1, 0, 1)).not.toBeNull();
    });
  });

  describe('caso 30 (tipo=1, anticipada): n con condición R*(1+i) > Va*i', () => {
    it('condición violada → null', () => {
      // Va*i = 100*0.9 = 90, R*(1+i) = 50*1.9 = 95 > 90 → válido
      // Para violar: Va=1000, i=0.9, R=1, R*(1+i)=1.9, Va*i=900 → 1.9 < 900
      expect(operaciones(30, 1, 0, 1000, 0.9, 0, 1)).toBeNull();
    });
    it('condición satisfecha → valor válido', () => {
      expect(operaciones(30, 200, 0, 100, 0.1, 0, 1)).not.toBeNull();
    });
  });
});
