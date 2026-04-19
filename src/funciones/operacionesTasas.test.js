import { describe, it, expect } from 'vitest';
import { operacionesTasas } from './operacionesTasas.js';

// Todas las tasas se trabajan como decimales (ej: 0.12 = 12%)
// Los resultados también son decimales

describe('operacionesTasas — 4 conversiones de tasas', () => {

  describe('Caso 1: Tasa Efectiva  i = (1 + j/m)^n - 1', () => {
    it('j=0.12, m=12, n=1  →  i = (1+0.01)^1 - 1 = 0.01', () => {
      expect(operacionesTasas(1, 0.12, 12, 1)).toBe('0.010000');
    });
    it('j=0.1, m=1, n=1  →  i = (1.1)^1 - 1 = 0.1', () => {
      expect(operacionesTasas(1, 0.1, 1, 1)).toBe('0.100000');
    });
    it('j=0.24, m=12, n=1  →  i = (1+0.02)^1 - 1 = 0.02', () => {
      expect(operacionesTasas(1, 0.24, 12, 1)).toBe('0.020000');
    });
    it('j=0.12, m=12, n=12  →  i = (1.01)^12 - 1 ≈ 0.126825', () => {
      const result = parseFloat(operacionesTasas(1, 0.12, 12, 12));
      expect(result).toBeCloseTo(0.126825, 4);
    });
  });

  describe('Caso 2: Tasa Nominal  j = m * ((1+i)^(1/n) - 1)', () => {
    it('i=0.01, m=12, n=1  →  j = 12*(1.01-1) = 0.12', () => {
      expect(operacionesTasas(2, 0.01, 12, 1)).toBe('0.120000');
    });
    it('i=0.1, m=1, n=1  →  j = 1*(1.1-1) = 0.1', () => {
      expect(operacionesTasas(2, 0.1, 1, 1)).toBe('0.100000');
    });
    it('i=0.02, m=12, n=1  →  j = 12*(1.02-1) = 0.24', () => {
      expect(operacionesTasas(2, 0.02, 12, 1)).toBe('0.240000');
    });
    it('round-trip caso 1→2: j=0.12,m=12,n=1 → i=0.01 → j=0.12', () => {
      const i = operacionesTasas(1, 0.12, 12, 1); // "0.010000"
      const j = operacionesTasas(2, parseFloat(i), 12, 1);
      expect(j).toBe('0.120000');
    });
  });

  describe('Caso 3: Desc. Comercial  d = ir / (1 + ir*n)', () => {
    it('ir=0.1, n=10  →  d = 0.1/(1+1) = 0.05', () => {
      expect(operacionesTasas(3, 0.1, 10, 0)).toBe('0.050000');
    });
    it('ir=0.2, n=4  →  d = 0.2/(1+0.8) = 0.2/1.8 ≈ 0.111111', () => {
      expect(operacionesTasas(3, 0.2, 4, 0)).toBe('0.111111');
    });
    it('ir=0.5, n=1  →  d = 0.5/1.5 ≈ 0.333333', () => {
      expect(operacionesTasas(3, 0.5, 1, 0)).toBe('0.333333');
    });
  });

  describe('Caso 4: Tasa Real  ir = d / (1 - n*d)', () => {
    it('d=0.05, n=10  →  ir = 0.05/(1-0.5) = 0.1', () => {
      expect(operacionesTasas(4, 0.05, 10, 0)).toBe('0.100000');
    });
    it('d=0.111111, n=4  →  ir ≈ 0.2', () => {
      const result = parseFloat(operacionesTasas(4, 0.111111, 4, 0));
      expect(result).toBeCloseTo(0.2, 4);
    });
    it('round-trip caso 3→4: ir=0.1,n=10 → d=0.05 → ir=0.1', () => {
      const d = operacionesTasas(3, 0.1, 10, 0); // "0.050000"
      const ir = operacionesTasas(4, parseFloat(d), 10, 0);
      expect(ir).toBe('0.100000');
    });
    it('round-trip caso 3→4: ir=0.5,n=1 → d=0.333333 → ir≈0.5', () => {
      const d = operacionesTasas(3, 0.5, 1, 0);
      const ir = parseFloat(operacionesTasas(4, parseFloat(d), 1, 0));
      expect(ir).toBeCloseTo(0.5, 4);
    });
  });

  describe('caso inválido', () => {
    it('caso 0 devuelve null', () => {
      expect(operacionesTasas(0, 0.1, 12, 1)).toBeNull();
    });
  });

  describe('Guardas de dominio — caso 4 ir = d/(1-n*d)', () => {
    it('n*d = 1 → null (denominador cero)', () => {
      expect(operacionesTasas(4, 0.5, 2, 0)).toBeNull();
    });
    it('n*d > 1 → null (denominador negativo)', () => {
      expect(operacionesTasas(4, 0.5, 3, 0)).toBeNull();
    });
    it('n*d < 1 → valor válido', () => {
      expect(operacionesTasas(4, 0.05, 10, 0)).not.toBeNull();
    });
  });
});
