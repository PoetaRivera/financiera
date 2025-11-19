import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  esNumeroValido,
  esNumeroPositivo,
  esTasaValida,
  validarInputConAlerta,
  sanitizarNumero
} from './validarInput.js';
import * as alertaModule from './alertaMensaje.js';

// Mock de alertaMensaje
vi.mock('./alertaMensaje.js', () => ({
  alertaMensaje: vi.fn(),
}));

describe('validarInput - Funciones de validación', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('esNumeroValido', () => {
    it('debe retornar true para números válidos', () => {
      expect(esNumeroValido(0)).toBe(true);
      expect(esNumeroValido(1)).toBe(true);
      expect(esNumeroValido(-1)).toBe(true);
      expect(esNumeroValido(3.14)).toBe(true);
      expect(esNumeroValido("42")).toBe(true);
      expect(esNumeroValido("3.14159")).toBe(true);
    });

    it('debe retornar false para valores no numéricos', () => {
      expect(esNumeroValido("abc")).toBe(false);
      expect(esNumeroValido("")).toBe(false);
      expect(esNumeroValido(NaN)).toBe(false);
      expect(esNumeroValido(undefined)).toBe(false);
      expect(esNumeroValido(null)).toBe(false);
    });

    it('debe retornar false para Infinity', () => {
      expect(esNumeroValido(Infinity)).toBe(false);
      expect(esNumeroValido(-Infinity)).toBe(false);
    });

    it('debe manejar strings con espacios', () => {
      expect(esNumeroValido(" 42 ")).toBe(true);
      expect(esNumeroValido("  3.14  ")).toBe(true);
    });
  });

  describe('esNumeroPositivo', () => {
    it('debe retornar true para números positivos', () => {
      expect(esNumeroPositivo(1)).toBe(true);
      expect(esNumeroPositivo(100)).toBe(true);
      expect(esNumeroPositivo(0.01)).toBe(true);
      expect(esNumeroPositivo("42")).toBe(true);
    });

    it('debe retornar false para cero por defecto', () => {
      expect(esNumeroPositivo(0)).toBe(false);
      expect(esNumeroPositivo("0")).toBe(false);
    });

    it('debe retornar true para cero cuando permitirCero es true', () => {
      expect(esNumeroPositivo(0, true)).toBe(true);
      expect(esNumeroPositivo("0", true)).toBe(true);
    });

    it('debe retornar false para números negativos', () => {
      expect(esNumeroPositivo(-1)).toBe(false);
      expect(esNumeroPositivo(-100)).toBe(false);
      expect(esNumeroPositivo("-42")).toBe(false);
    });

    it('debe retornar false para valores no numéricos', () => {
      expect(esNumeroPositivo("abc")).toBe(false);
      expect(esNumeroPositivo(NaN)).toBe(false);
      expect(esNumeroPositivo(undefined)).toBe(false);
    });
  });

  describe('esTasaValida', () => {
    it('debe retornar true para tasas válidas en formato decimal', () => {
      expect(esTasaValida(0)).toBe(true);
      expect(esTasaValida(0.05)).toBe(true);
      expect(esTasaValida(0.5)).toBe(true);
      expect(esTasaValida(1)).toBe(true);
    });

    it('debe retornar true para tasas válidas en formato porcentaje', () => {
      expect(esTasaValida(5)).toBe(true);
      expect(esTasaValida(10)).toBe(true);
      expect(esTasaValida(50)).toBe(true);
      expect(esTasaValida(100)).toBe(true);
    });

    it('debe retornar false para tasas fuera de rango', () => {
      expect(esTasaValida(-1)).toBe(false);
      expect(esTasaValida(101)).toBe(false);
      expect(esTasaValida(200)).toBe(false);
    });

    it('debe retornar false para valores no numéricos', () => {
      expect(esTasaValida("abc")).toBe(false);
      expect(esTasaValida(NaN)).toBe(false);
    });
  });

  describe('validarInputConAlerta', () => {
    it('debe retornar true y no alertar para valores válidos', () => {
      const resultado = validarInputConAlerta(100, "Monto");
      expect(resultado).toBe(true);
      expect(alertaModule.alertaMensaje).not.toHaveBeenCalled();
    });

    it('debe alertar y retornar false para valores vacíos', () => {
      expect(validarInputConAlerta("", "Monto")).toBe(false);
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('El campo "Monto" no puede estar vacío');
    });

    it('debe alertar y retornar false para valores null o undefined', () => {
      validarInputConAlerta(null, "Monto");
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('El campo "Monto" no puede estar vacío');

      vi.clearAllMocks();

      validarInputConAlerta(undefined, "Monto");
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('El campo "Monto" no puede estar vacío');
    });

    it('debe alertar y retornar false para valores no numéricos', () => {
      validarInputConAlerta("abc", "Monto");
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('El campo "Monto" debe ser un número válido');
    });

    it('debe alertar y retornar false para números negativos cuando positivo es true', () => {
      validarInputConAlerta(-100, "Monto", { positivo: true });
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('El campo "Monto" debe ser un número positivo');
    });

    it('debe alertar y retornar false para cero cuando permitirCero es false', () => {
      validarInputConAlerta(0, "Monto", { positivo: true, permitirCero: false });
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('El campo "Monto" debe ser un número positivo');
    });

    it('debe retornar true para cero cuando permitirCero es true', () => {
      const resultado = validarInputConAlerta(0, "Monto", { positivo: true, permitirCero: true });
      expect(resultado).toBe(true);
      expect(alertaModule.alertaMensaje).not.toHaveBeenCalled();
    });

    it('debe validar tasas de interés correctamente', () => {
      expect(validarInputConAlerta(5, "Tasa", { esTasa: true })).toBe(true);
      expect(alertaModule.alertaMensaje).not.toHaveBeenCalled();
    });

    it('debe alertar para tasas fuera de rango', () => {
      validarInputConAlerta(150, "Tasa", { esTasa: true });
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('La tasa de interés debe estar entre 0 y 100');
    });

    it('debe permitir números negativos cuando positivo es false', () => {
      const resultado = validarInputConAlerta(-50, "Valor", { positivo: false });
      expect(resultado).toBe(true);
      expect(alertaModule.alertaMensaje).not.toHaveBeenCalled();
    });
  });

  describe('sanitizarNumero', () => {
    it('debe retornar el número tal cual si ya es un número', () => {
      expect(sanitizarNumero(42)).toBe(42);
      expect(sanitizarNumero(3.14)).toBe(3.14);
      expect(sanitizarNumero(0)).toBe(0);
      expect(sanitizarNumero(-10)).toBe(-10);
    });

    it('debe convertir strings numéricos a números', () => {
      expect(sanitizarNumero("42")).toBe(42);
      expect(sanitizarNumero("3.14")).toBe(3.14);
      expect(sanitizarNumero("0")).toBe(0);
      expect(sanitizarNumero("-10")).toBe(-10);
    });

    it('debe eliminar espacios en blanco de strings', () => {
      expect(sanitizarNumero(" 42 ")).toBe(42);
      expect(sanitizarNumero("  100  ")).toBe(100);
      expect(sanitizarNumero("\t50\n")).toBe(50);
    });

    it('debe retornar 0 para valores no numéricos', () => {
      expect(sanitizarNumero("abc")).toBe(0);
      expect(sanitizarNumero("")).toBe(0);
      expect(sanitizarNumero(null)).toBe(0);
      expect(sanitizarNumero(undefined)).toBe(0);
      expect(sanitizarNumero({})).toBe(0);
      expect(sanitizarNumero([])).toBe(0);
    });

    it('debe retornar 0 para NaN', () => {
      expect(sanitizarNumero(NaN)).toBe(0);
    });

    it('debe manejar strings con formato decimal', () => {
      expect(sanitizarNumero("123.456")).toBe(123.456);
      expect(sanitizarNumero(".5")).toBe(0.5);
      expect(sanitizarNumero("0.0001")).toBe(0.0001);
    });

    it('debe manejar notación científica', () => {
      expect(sanitizarNumero("1e3")).toBe(1000);
      expect(sanitizarNumero("1.5e2")).toBe(150);
    });
  });

  describe('Casos de integración', () => {
    it('debe validar correctamente un flujo típico de entrada de usuario', () => {
      // Simular entrada de usuario para un cálculo financiero
      const monto = "1000";
      const tasa = "5";
      const periodo = "12";

      expect(validarInputConAlerta(monto, "Monto", { positivo: true })).toBe(true);
      expect(validarInputConAlerta(tasa, "Tasa", { esTasa: true })).toBe(true);
      expect(validarInputConAlerta(periodo, "Período", { positivo: true })).toBe(true);
    });

    it('debe detectar entradas inválidas en un flujo típico', () => {
      expect(validarInputConAlerta("abc", "Monto", { positivo: true })).toBe(false);
      expect(validarInputConAlerta("-100", "Monto", { positivo: true })).toBe(false);
      expect(validarInputConAlerta("", "Monto", { positivo: true })).toBe(false);
    });
  });
});
