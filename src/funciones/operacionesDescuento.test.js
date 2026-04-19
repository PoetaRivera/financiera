import { describe, it, expect } from 'vitest';
import { operacionesDescuento } from './operacionesDescuento.js';
import { determinaCasoDescuento } from './determinaCasoDescuento.js';
import { verificaSeleccionDescuento } from './verificaSeleccionDescuento.js';

// Valores base para todas las pruebas: Vf=1000, Va=900, D=100, d=0.1, n=1
// Verificación: D=Vf-Va=100, D=Va*d*n/(1-d*n)=90/0.9=100, D=Vf*d*n=100 ✓

describe('operacionesDescuento — 15 casos', () => {

  describe('Incógnita D (casos 1-3)', () => {
    it('caso 1: D = Vf - Va  →  1000 - 900 = 100', () => {
      expect(operacionesDescuento(1, 0, 1000, 900, 0, 0)).toBe('100.000000');
    });
    it('caso 2: D = Va*d*n/(1-d*n)  →  900*0.1*1/(1-0.1) = 100', () => {
      expect(operacionesDescuento(2, 0, 0, 900, 0.1, 1)).toBe('100.000000');
    });
    it('caso 3: D = Vf*d*n  →  1000*0.1*1 = 100', () => {
      expect(operacionesDescuento(3, 0, 1000, 0, 0.1, 1)).toBe('100.000000');
    });
  });

  describe('Incógnita Vf (casos 4-6)', () => {
    it('caso 4: Vf = Va + D  →  900 + 100 = 1000', () => {
      expect(operacionesDescuento(4, 100, 0, 900, 0, 0)).toBe('1000.000000');
    });
    it('caso 5: Vf = D/(d*n)  →  100/(0.1*1) = 1000', () => {
      expect(operacionesDescuento(5, 100, 0, 0, 0.1, 1)).toBe('1000.000000');
    });
    it('caso 6: Vf = Va/(1-d*n)  →  900/(1-0.1) = 1000', () => {
      expect(operacionesDescuento(6, 0, 0, 900, 0.1, 1)).toBe('1000.000000');
    });
  });

  describe('Incógnita Va (casos 7-9)', () => {
    it('caso 7: Va = Vf - D  →  1000 - 100 = 900', () => {
      expect(operacionesDescuento(7, 100, 1000, 0, 0, 0)).toBe('900.000000');
    });
    it('caso 8: Va = D*(1/(d*n)-1)  →  100*(10-1) = 900', () => {
      expect(operacionesDescuento(8, 100, 0, 0, 0.1, 1)).toBe('900.000000');
    });
    it('caso 9: Va = Vf*(1-d*n)  →  1000*(1-0.1) = 900', () => {
      expect(operacionesDescuento(9, 0, 1000, 0, 0.1, 1)).toBe('900.000000');
    });
  });

  describe('Incógnita d (casos 10-12)', () => {
    it('caso 10: d = (Vf-Va)/(Vf*n)  →  100/(1000*1) = 0.1', () => {
      expect(operacionesDescuento(10, 0, 1000, 900, 0, 1)).toBe('0.100000');
    });
    it('caso 11: d = D/(n*Vf)  →  100/(1*1000) = 0.1', () => {
      expect(operacionesDescuento(11, 100, 1000, 0, 0, 1)).toBe('0.100000');
    });
    it('caso 12: d = D/((Va+D)*n)  →  100/(1000*1) = 0.1', () => {
      expect(operacionesDescuento(12, 100, 0, 900, 0, 1)).toBe('0.100000');
    });
  });

  describe('Incógnita n (casos 13-15)', () => {
    it('caso 13: n = (Vf-Va)/(Vf*d)  →  100/(1000*0.1) = 1', () => {
      expect(operacionesDescuento(13, 0, 1000, 900, 0.1, 0)).toBe('1.000000');
    });
    it('caso 14: n = D/(Vf*d)  →  100/(1000*0.1) = 1', () => {
      expect(operacionesDescuento(14, 100, 1000, 0, 0.1, 0)).toBe('1.000000');
    });
    it('caso 15: n = D/((Va+D)*d)  →  100/(1000*0.1) = 1', () => {
      expect(operacionesDescuento(15, 100, 0, 900, 0.1, 0)).toBe('1.000000');
    });
  });

  describe('Casos con valores decimales no enteros', () => {
    it('caso 1 con decimales: D = 1500.75 - 1200.25 = 300.5', () => {
      expect(operacionesDescuento(1, 0, 1500.75, 1200.25, 0, 0)).toBe('300.500000');
    });
    it('caso 3 con n=2: D = 500*0.05*2 = 50', () => {
      expect(operacionesDescuento(3, 0, 500, 0, 0.05, 2)).toBe('50.000000');
    });
  });
});

describe('determinaCasoDescuento — selección correcta de casos', () => {
  // Flags: D, Vf, Va, d, n
  it('caso 1: incógnita=D, conocidos Vf,Va', () => {
    expect(determinaCasoDescuento('D', false, true, true, false, false)).toBe(1);
  });
  it('caso 2: incógnita=D, conocidos Va,d,n', () => {
    expect(determinaCasoDescuento('D', false, false, true, true, true)).toBe(2);
  });
  it('caso 3: incógnita=D, conocidos Vf,d,n', () => {
    expect(determinaCasoDescuento('D', false, true, false, true, true)).toBe(3);
  });
  it('caso 4: incógnita=Vf, conocidos D,Va', () => {
    expect(determinaCasoDescuento('Vf', true, false, true, false, false)).toBe(4);
  });
  it('caso 5: incógnita=Vf, conocidos D,d,n', () => {
    expect(determinaCasoDescuento('Vf', true, false, false, true, true)).toBe(5);
  });
  it('caso 6: incógnita=Vf, conocidos Va,d,n', () => {
    expect(determinaCasoDescuento('Vf', false, false, true, true, true)).toBe(6);
  });
  it('caso 7: incógnita=Va, conocidos D,Vf', () => {
    expect(determinaCasoDescuento('Va', true, true, false, false, false)).toBe(7);
  });
  it('caso 8: incógnita=Va, conocidos D,d,n', () => {
    expect(determinaCasoDescuento('Va', true, false, false, true, true)).toBe(8);
  });
  it('caso 9: incógnita=Va, conocidos Vf,d,n', () => {
    expect(determinaCasoDescuento('Va', false, true, false, true, true)).toBe(9);
  });
  it('caso 10: incógnita=d, conocidos Vf,Va,n', () => {
    expect(determinaCasoDescuento('d', false, true, true, false, true)).toBe(10);
  });
  it('caso 11: incógnita=d, conocidos D,Vf,n', () => {
    expect(determinaCasoDescuento('d', true, true, false, false, true)).toBe(11);
  });
  it('caso 12: incógnita=d, conocidos D,Va,n', () => {
    expect(determinaCasoDescuento('d', true, false, true, false, true)).toBe(12);
  });
  it('caso 13: incógnita=n, conocidos Vf,Va,d', () => {
    expect(determinaCasoDescuento('n', false, true, true, true, false)).toBe(13);
  });
  it('caso 14: incógnita=n, conocidos D,Vf,d', () => {
    expect(determinaCasoDescuento('n', true, true, false, true, false)).toBe(14);
  });
  it('caso 15: incógnita=n, conocidos D,Va,d', () => {
    expect(determinaCasoDescuento('n', true, false, true, true, false)).toBe(15);
  });
  it('combinación inválida devuelve undefined', () => {
    expect(determinaCasoDescuento('D', true, true, true, false, false)).toBeUndefined();
  });
});

describe('verificaSeleccionDescuento — validaciones', () => {
  it('devuelve 0 para selección válida', () => {
    expect(verificaSeleccionDescuento('D', false, true, true, false, false)).toBe(0);
  });
  it('devuelve -1 cuando no hay datos seleccionados', () => {
    expect(verificaSeleccionDescuento('D', false, false, false, false, false)).toBe(-1);
  });
  it('devuelve -1 cuando hay 4 o más datos', () => {
    expect(verificaSeleccionDescuento('D', true, true, true, true, false)).toBe(-1);
  });
  it('devuelve -1 para combinación inválida', () => {
    expect(verificaSeleccionDescuento('D', true, false, false, false, false)).toBe(-1);
  });
});
