import { describe, it, expect } from 'vitest';
import { determinaCaso } from './determinaCaso.js';

describe('determinaCaso - Interés Simple', () => {
  const tipo = 0; // Interés Simple
  const opcionSimple = 'Simple';
  const opcionCompuesto = 'Compuesto';

  describe('Incógnita I - Simple', () => {
    it('debe retornar caso 1 para: !I, Vf, Va, !i, !n', () => {
      const caso = determinaCaso('I', opcionSimple, false, true, true, false, false, tipo);
      expect(caso).toBe(1);
    });

    it('debe retornar caso 2 para: !I, !Vf, Va, i, n', () => {
      const caso = determinaCaso('I', opcionSimple, false, false, true, true, true, tipo);
      expect(caso).toBe(2);
    });

    it('debe retornar caso 3 para: !I, Vf, !Va, i, n', () => {
      const caso = determinaCaso('I', opcionSimple, false, true, false, true, true, tipo);
      expect(caso).toBe(3);
    });
  });

  describe('Incógnita I - Compuesto', () => {
    it('debe retornar caso 16 para: !I, Vf, Va, !i, !n', () => {
      const caso = determinaCaso('I', opcionCompuesto, false, true, true, false, false, tipo);
      expect(caso).toBe(16);
    });

    it('debe retornar caso 17 para: !I, !Vf, Va, i, n', () => {
      const caso = determinaCaso('I', opcionCompuesto, false, false, true, true, true, tipo);
      expect(caso).toBe(17);
    });

    it('debe retornar caso 18 para: !I, Vf, !Va, i, n', () => {
      const caso = determinaCaso('I', opcionCompuesto, false, true, false, true, true, tipo);
      expect(caso).toBe(18);
    });
  });

  describe('Incógnita Vf - Simple', () => {
    it('debe retornar caso 4 para: I, !Vf, Va, !i, !n', () => {
      const caso = determinaCaso('Vf', opcionSimple, true, false, true, false, false, tipo);
      expect(caso).toBe(4);
    });

    it('debe retornar caso 5 para: I, !Vf, !Va, i, n', () => {
      const caso = determinaCaso('Vf', opcionSimple, true, false, false, true, true, tipo);
      expect(caso).toBe(5);
    });

    it('debe retornar caso 6 para: !I, !Vf, Va, i, n', () => {
      const caso = determinaCaso('Vf', opcionSimple, false, false, true, true, true, tipo);
      expect(caso).toBe(6);
    });
  });

  describe('Incógnita Vf - Compuesto', () => {
    it('debe retornar caso 19 para: I, !Vf, Va, !i, !n', () => {
      const caso = determinaCaso('Vf', opcionCompuesto, true, false, true, false, false, tipo);
      expect(caso).toBe(19);
    });

    it('debe retornar caso 20 para: I, !Vf, !Va, i, n', () => {
      const caso = determinaCaso('Vf', opcionCompuesto, true, false, false, true, true, tipo);
      expect(caso).toBe(20);
    });

    it('debe retornar caso 21 para: !I, !Vf, Va, i, n', () => {
      const caso = determinaCaso('Vf', opcionCompuesto, false, false, true, true, true, tipo);
      expect(caso).toBe(21);
    });
  });

  describe('Incógnita Va - Simple', () => {
    it('debe retornar caso 7 para: I, Vf, !Va, !i, !n', () => {
      const caso = determinaCaso('Va', opcionSimple, true, true, false, false, false, tipo);
      expect(caso).toBe(7);
    });

    it('debe retornar caso 8 para: I, !Vf, !Va, i, n', () => {
      const caso = determinaCaso('Va', opcionSimple, true, false, false, true, true, tipo);
      expect(caso).toBe(8);
    });

    it('debe retornar caso 9 para: !I, Vf, !Va, i, n', () => {
      const caso = determinaCaso('Va', opcionSimple, false, true, false, true, true, tipo);
      expect(caso).toBe(9);
    });
  });

  describe('Incógnita Va - Compuesto', () => {
    it('debe retornar caso 22 para: I, Vf, !Va, !i, !n', () => {
      const caso = determinaCaso('Va', opcionCompuesto, true, true, false, false, false, tipo);
      expect(caso).toBe(22);
    });

    it('debe retornar caso 23 para: I, !Vf, !Va, i, n', () => {
      const caso = determinaCaso('Va', opcionCompuesto, true, false, false, true, true, tipo);
      expect(caso).toBe(23);
    });

    it('debe retornar caso 24 para: !I, Vf, !Va, i, n', () => {
      const caso = determinaCaso('Va', opcionCompuesto, false, true, false, true, true, tipo);
      expect(caso).toBe(24);
    });
  });

  describe('Incógnita i - Simple', () => {
    it('debe retornar caso 10 para: !I, Vf, Va, !i, n', () => {
      const caso = determinaCaso('i', opcionSimple, false, true, true, false, true, tipo);
      expect(caso).toBe(10);
    });

    it('debe retornar caso 11 para: I, Vf, !Va, !i, n', () => {
      const caso = determinaCaso('i', opcionSimple, true, true, false, false, true, tipo);
      expect(caso).toBe(11);
    });

    it('debe retornar caso 12 para: I, !Vf, Va, !i, n', () => {
      const caso = determinaCaso('i', opcionSimple, true, false, true, false, true, tipo);
      expect(caso).toBe(12);
    });
  });

  describe('Incógnita i - Compuesto', () => {
    it('debe retornar caso 25 para: !I, Vf, Va, !i, n', () => {
      const caso = determinaCaso('i', opcionCompuesto, false, true, true, false, true, tipo);
      expect(caso).toBe(25);
    });

    it('debe retornar caso 26 para: I, Vf, !Va, !i, n', () => {
      const caso = determinaCaso('i', opcionCompuesto, true, true, false, false, true, tipo);
      expect(caso).toBe(26);
    });

    it('debe retornar caso 27 para: I, !Vf, Va, !i, n', () => {
      const caso = determinaCaso('i', opcionCompuesto, true, false, true, false, true, tipo);
      expect(caso).toBe(27);
    });
  });

  describe('Incógnita n - Simple', () => {
    it('debe retornar caso 13 para: !I, Vf, Va, i, !n', () => {
      const caso = determinaCaso('n', opcionSimple, false, true, true, true, false, tipo);
      expect(caso).toBe(13);
    });

    it('debe retornar caso 14 para: I, Vf, !Va, i, !n', () => {
      const caso = determinaCaso('n', opcionSimple, true, true, false, true, false, tipo);
      expect(caso).toBe(14);
    });

    it('debe retornar caso 15 para: I, !Vf, Va, i, !n', () => {
      const caso = determinaCaso('n', opcionSimple, true, false, true, true, false, tipo);
      expect(caso).toBe(15);
    });
  });

  describe('Incógnita n - Compuesto', () => {
    it('debe retornar caso 28 para: !I, Vf, Va, i, !n', () => {
      const caso = determinaCaso('n', opcionCompuesto, false, true, true, true, false, tipo);
      expect(caso).toBe(28);
    });

    it('debe retornar caso 29 para: I, Vf, !Va, i, !n', () => {
      const caso = determinaCaso('n', opcionCompuesto, true, true, false, true, false, tipo);
      expect(caso).toBe(29);
    });

    it('debe retornar caso 30 para: I, !Vf, Va, i, !n', () => {
      const caso = determinaCaso('n', opcionCompuesto, true, false, true, true, false, tipo);
      expect(caso).toBe(30);
    });
  });
});

describe('determinaCaso - Anualidades', () => {
  const tipo = 1; // Anualidades
  const opcionVencida = 'Vencida';
  const opcionAnticipada = 'Anticipada';

  describe('Incógnita R - Vencida', () => {
    it('debe retornar caso 1 para: !I, Vf, Va, !i, !n', () => {
      const caso = determinaCaso('R', opcionVencida, false, true, true, false, false, tipo);
      expect(caso).toBe(1);
    });

    it('debe retornar caso 2 para: !I, !Vf, Va, i, n', () => {
      const caso = determinaCaso('R', opcionVencida, false, false, true, true, true, tipo);
      expect(caso).toBe(2);
    });

    it('debe retornar caso 3 para: !I, Vf, !Va, i, n', () => {
      const caso = determinaCaso('R', opcionVencida, false, true, false, true, true, tipo);
      expect(caso).toBe(3);
    });
  });

  describe('Incógnita R - Anticipada', () => {
    it('debe retornar caso 16 para: !I, Vf, Va, !i, !n', () => {
      const caso = determinaCaso('R', opcionAnticipada, false, true, true, false, false, tipo);
      expect(caso).toBe(16);
    });

    it('debe retornar caso 17 para: !I, !Vf, Va, i, n', () => {
      const caso = determinaCaso('R', opcionAnticipada, false, false, true, true, true, tipo);
      expect(caso).toBe(17);
    });

    it('debe retornar caso 18 para: !I, Vf, !Va, i, n', () => {
      const caso = determinaCaso('R', opcionAnticipada, false, true, false, true, true, tipo);
      expect(caso).toBe(18);
    });
  });

  describe('Incógnita Vf - Vencida', () => {
    it('debe retornar caso 4 para: I, !Vf, Va, !i, !n', () => {
      const caso = determinaCaso('Vf', opcionVencida, true, false, true, false, false, tipo);
      expect(caso).toBe(4);
    });

    it('debe retornar caso 5 para: I, !Vf, !Va, i, n', () => {
      const caso = determinaCaso('Vf', opcionVencida, true, false, false, true, true, tipo);
      expect(caso).toBe(5);
    });

    it('debe retornar caso 6 para: !I, !Vf, Va, i, n', () => {
      const caso = determinaCaso('Vf', opcionVencida, false, false, true, true, true, tipo);
      expect(caso).toBe(6);
    });
  });

  describe('Incógnita n - Vencida', () => {
    it('debe retornar caso 13 para: !I, Vf, Va, i, !n', () => {
      const caso = determinaCaso('n', opcionVencida, false, true, true, true, false, tipo);
      expect(caso).toBe(13);
    });

    it('debe retornar caso 14 para: I, Vf, !Va, i, !n', () => {
      const caso = determinaCaso('n', opcionVencida, true, true, false, true, false, tipo);
      expect(caso).toBe(14);
    });

    it('debe retornar caso 15 para: I, !Vf, Va, i, !n', () => {
      const caso = determinaCaso('n', opcionVencida, true, false, true, true, false, tipo);
      expect(caso).toBe(15);
    });
  });

  describe('Incógnita n - Anticipada', () => {
    it('debe retornar caso 28 para: !I, Vf, Va, i, !n', () => {
      const caso = determinaCaso('n', opcionAnticipada, false, true, true, true, false, tipo);
      expect(caso).toBe(28);
    });

    it('debe retornar caso 29 para: I, Vf, !Va, i, !n', () => {
      const caso = determinaCaso('n', opcionAnticipada, true, true, false, true, false, tipo);
      expect(caso).toBe(29);
    });

    it('debe retornar caso 30 para: I, !Vf, Va, i, !n', () => {
      const caso = determinaCaso('n', opcionAnticipada, true, false, true, true, false, tipo);
      expect(caso).toBe(30);
    });
  });
});

describe('determinaCaso - Casos edge', () => {
  it('debe retornar undefined para combinación no válida', () => {
    const caso = determinaCaso('I', 'Simple', true, true, true, true, true, 0);
    expect(caso).toBeUndefined();
  });

  it('debe retornar undefined para incógnita no válida', () => {
    const caso = determinaCaso('X', 'Simple', false, true, true, false, false, 0);
    expect(caso).toBeUndefined();
  });

  it('debe retornar undefined para opción no válida', () => {
    const caso = determinaCaso('I', 'Invalida', false, true, true, false, false, 0);
    expect(caso).toBeUndefined();
  });

  it('debe distinguir correctamente entre tipo 0 (interés) y tipo 1 (anualidades)', () => {
    const casoInteres = determinaCaso('I', 'Simple', false, true, true, false, false, 0);
    const casoAnualidad = determinaCaso('R', 'Vencida', false, true, true, false, false, 1);
    expect(casoInteres).toBe(1);
    expect(casoAnualidad).toBe(1);
  });

  it('debe manejar valores booleanos correctamente', () => {
    const caso = determinaCaso('I', 'Simple', false, true, true, false, false, 0);
    expect(caso).toBe(1);
    expect(typeof caso).toBe('number');
  });
});
