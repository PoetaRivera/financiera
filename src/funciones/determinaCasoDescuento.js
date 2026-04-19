export function determinaCasoDescuento(incognita, D, Vf, Va, d, n) {
  switch (incognita) {
    case "D":
      if (!D && Vf && Va && !d && !n) return 1;
      if (!D && !Vf && Va && d && n) return 2;
      if (!D && Vf && !Va && d && n) return 3;
      break;
    case "Vf":
      if (D && !Vf && Va && !d && !n) return 4;
      if (D && !Vf && !Va && d && n) return 5;
      if (!D && !Vf && Va && d && n) return 6;
      break;
    case "Va":
      if (D && Vf && !Va && !d && !n) return 7;
      if (D && !Vf && !Va && d && n) return 8;
      if (!D && Vf && !Va && d && n) return 9;
      break;
    case "d":
      if (!D && Vf && Va && !d && n) return 10;
      if (D && Vf && !Va && !d && n) return 11;
      if (D && !Vf && Va && !d && n) return 12;
      break;
    case "n":
      if (!D && Vf && Va && d && !n) return 13;
      if (D && Vf && !Va && d && !n) return 14;
      if (D && !Vf && Va && d && !n) return 15;
      break;
    default:
      break;
  }
  return undefined;
}
