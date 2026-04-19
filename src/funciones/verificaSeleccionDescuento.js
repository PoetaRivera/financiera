import { alertaMensaje } from "./alertaMensaje";

export function verificaSeleccionDescuento(incognita, D, Vf, Va, d, n) {
  const suma = [D, Vf, Va, d, n].filter(Boolean).length;

  if (suma === 0) {
    alertaMensaje("Debe seleccionar datos conocidos");
    return -1;
  }
  if (suma >= 4) {
    alertaMensaje("Selección no válida");
    return -1;
  }

  switch (incognita) {
    case "D":
      if (!D && Vf && Va && !d && !n) return 0;
      if (!D && !Vf && Va && d && n) return 0;
      if (!D && Vf && !Va && d && n) return 0;
      break;
    case "Vf":
      if (D && !Vf && Va && !d && !n) return 0;
      if (D && !Vf && !Va && d && n) return 0;
      if (!D && !Vf && Va && d && n) return 0;
      break;
    case "Va":
      if (D && Vf && !Va && !d && !n) return 0;
      if (D && !Vf && !Va && d && n) return 0;
      if (!D && Vf && !Va && d && n) return 0;
      break;
    case "d":
      if (!D && Vf && Va && !d && n) return 0;
      if (D && Vf && !Va && !d && n) return 0;
      if (D && !Vf && Va && !d && n) return 0;
      break;
    case "n":
      if (!D && Vf && Va && d && !n) return 0;
      if (D && Vf && !Va && d && !n) return 0;
      if (D && !Vf && Va && d && !n) return 0;
      break;
    default:
      break;
  }

  alertaMensaje("Selección no válida");
  return -1;
}
