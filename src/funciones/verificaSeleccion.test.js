import { describe, it, expect, vi, beforeEach } from 'vitest';
import { verificaSeleccion } from './verificaSeleccion.js';
import * as alertaModule from './alertaMensaje.js';

// Mock de alertaMensaje
vi.mock('./alertaMensaje.js', () => ({
  alertaMensaje: vi.fn(),
}));

describe('verificaSeleccion - Validación de datos', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada test
    vi.clearAllMocks();
  });

  describe('Validaciones generales', () => {
    it('debe alertar cuando no se selecciona ningún dato conocido', () => {
      verificaSeleccion('I', false, false, false, false, false, 0);
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('Debe seleccionar datos conocidos');
    });

    it('debe alertar cuando se seleccionan 5 datos conocidos', () => {
      verificaSeleccion('I', true, true, true, true, true, 0);
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('No es selección válida');
    });

    it('debe alertar cuando se seleccionan 4 datos conocidos', () => {
      verificaSeleccion('I', true, true, true, true, false, 0);
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('No es selección válida');
    });
  });

  describe('Incógnita I/R - Interés Simple', () => {
    const tipo = 0; // Interés Simple

    it('debe retornar 0 para selección válida: !I, Vf, Va, !i, !n', () => {
      const resultado = verificaSeleccion('I', false, true, true, false, false, tipo);
      expect(resultado).toBe(0);
    });

    it('debe retornar 0 para selección válida: !I, !Vf, Va, i, n', () => {
      const resultado = verificaSeleccion('I', false, false, true, true, true, tipo);
      expect(resultado).toBe(0);
    });

    it('debe retornar 0 para selección válida: !I, Vf, !Va, i, n', () => {
      const resultado = verificaSeleccion('I', false, true, false, true, true, tipo);
      expect(resultado).toBe(0);
    });

    it('debe alertar para selección inválida', () => {
      verificaSeleccion('I', false, true, true, true, false, tipo);
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('No es selección válida');
    });
  });

  describe('Incógnita I/R - Anualidades', () => {
    const tipo = 1; // Anualidades

    it('debe alertar para caso !I, Vf, Va, !i, !n en anualidades', () => {
      verificaSeleccion('R', false, true, true, false, false, tipo);
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('Opcion no valida para anualidades');
    });

    it('debe retornar 0 para selección válida: !I, !Vf, Va, i, n', () => {
      const resultado = verificaSeleccion('R', false, false, true, true, true, tipo);
      expect(resultado).toBe(0);
    });

    it('debe retornar 0 para selección válida: !I, Vf, !Va, i, n', () => {
      const resultado = verificaSeleccion('R', false, true, false, true, true, tipo);
      expect(resultado).toBe(0);
    });
  });

  describe('Incógnita Vf - Interés Simple', () => {
    const tipo = 0;

    it('debe retornar 0 para selección válida: I, !Vf, Va, !i, !n', () => {
      const resultado = verificaSeleccion('Vf', true, false, true, false, false, tipo);
      expect(resultado).toBe(0);
    });

    it('debe retornar 0 para selección válida: I, !Vf, !Va, i, n', () => {
      const resultado = verificaSeleccion('Vf', true, false, false, true, true, tipo);
      expect(resultado).toBe(0);
    });

    it('debe retornar 0 para selección válida: !I, !Vf, Va, i, n', () => {
      const resultado = verificaSeleccion('Vf', false, false, true, true, true, tipo);
      expect(resultado).toBe(0);
    });

    it('debe alertar para selección inválida', () => {
      verificaSeleccion('Vf', true, false, true, true, false, tipo);
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('No es selección válida');
    });
  });

  describe('Incógnita Vf - Anualidades', () => {
    const tipo = 1;

    it('debe alertar para caso I, !Vf, Va, !i, !n en anualidades', () => {
      verificaSeleccion('Vf', true, false, true, false, false, tipo);
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('Opcion no valida para anualidades');
    });

    it('debe retornar 0 para selección válida: I, !Vf, !Va, i, n', () => {
      const resultado = verificaSeleccion('Vf', true, false, false, true, true, tipo);
      expect(resultado).toBe(0);
    });
  });

  describe('Incógnita Va - Interés Simple', () => {
    const tipo = 0;

    it('debe retornar 0 para selección válida: I, Vf, !Va, !i, !n', () => {
      const resultado = verificaSeleccion('Va', true, true, false, false, false, tipo);
      expect(resultado).toBe(0);
    });

    it('debe retornar 0 para selección válida: I, !Vf, !Va, i, n', () => {
      const resultado = verificaSeleccion('Va', true, false, false, true, true, tipo);
      expect(resultado).toBe(0);
    });

    it('debe retornar 0 para selección válida: !I, Vf, !Va, i, n', () => {
      const resultado = verificaSeleccion('Va', false, true, false, true, true, tipo);
      expect(resultado).toBe(0);
    });

    it('debe alertar para selección inválida', () => {
      verificaSeleccion('Va', true, true, false, true, false, tipo);
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('No es selección válida');
    });
  });

  describe('Incógnita Va - Anualidades', () => {
    const tipo = 1;

    it('debe alertar para caso I, Vf, !Va, !i, !n en anualidades', () => {
      verificaSeleccion('Va', true, true, false, false, false, tipo);
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('Opcion no valida para anualidades');
    });
  });

  describe('Incógnita i - Interés Simple', () => {
    const tipo = 0;

    it('debe retornar 0 para selección válida: !I, Vf, Va, !i, n', () => {
      const resultado = verificaSeleccion('i', false, true, true, false, true, tipo);
      expect(resultado).toBe(0);
    });

    it('debe retornar 0 para selección válida: I, Vf, !Va, !i, n', () => {
      const resultado = verificaSeleccion('i', true, true, false, false, true, tipo);
      expect(resultado).toBe(0);
    });

    it('debe retornar 0 para selección válida: I, !Vf, Va, !i, n', () => {
      const resultado = verificaSeleccion('i', true, false, true, false, true, tipo);
      expect(resultado).toBe(0);
    });

    it('debe alertar para selección inválida sin n', () => {
      verificaSeleccion('i', true, true, false, false, false, tipo);
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('No es selección válida');
    });
  });

  describe('Incógnita i - Anualidades', () => {
    const tipo = 1;

    it('debe alertar para casos válidos de interés simple pero inválidos para anualidades', () => {
      verificaSeleccion('i', false, true, true, false, true, tipo);
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('Opcion no valida para anualidades');
    });
  });

  describe('Incógnita n - Interés Simple', () => {
    const tipo = 0;

    it('debe retornar 0 para selección válida: !I, Vf, Va, i, !n', () => {
      const resultado = verificaSeleccion('n', false, true, true, true, false, tipo);
      expect(resultado).toBe(0);
    });

    it('debe retornar 0 para selección válida: I, Vf, !Va, i, !n', () => {
      const resultado = verificaSeleccion('n', true, true, false, true, false, tipo);
      expect(resultado).toBe(0);
    });

    it('debe retornar 0 para selección válida: I, !Vf, Va, i, !n', () => {
      const resultado = verificaSeleccion('n', true, false, true, true, false, tipo);
      expect(resultado).toBe(0);
    });

    it('debe alertar para selección inválida sin i', () => {
      verificaSeleccion('n', true, true, false, false, false, tipo);
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('No es selección válida');
    });
  });

  describe('Incógnita n - Anualidades', () => {
    const tipo = 1;

    it('debe alertar para caso !I, Vf, Va, i, !n en anualidades', () => {
      verificaSeleccion('n', false, true, true, true, false, tipo);
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('Opcion no valida para anualidades');
    });

    it('debe retornar 0 para selección válida: I, Vf, !Va, i, !n', () => {
      const resultado = verificaSeleccion('n', true, true, false, true, false, tipo);
      expect(resultado).toBe(0);
    });
  });

  describe('Casos edge', () => {
    it('debe alertar para incógnita no válida', () => {
      verificaSeleccion('X', true, true, false, true, false, 0);
      expect(alertaModule.alertaMensaje).toHaveBeenCalledWith('No es selección válida');
    });

    it('debe manejar tipo de dato correcto (booleanos)', () => {
      const resultado = verificaSeleccion('I', false, true, true, false, false, 0);
      expect(resultado).toBe(0);
      expect(alertaModule.alertaMensaje).not.toHaveBeenCalled();
    });
  });
});
