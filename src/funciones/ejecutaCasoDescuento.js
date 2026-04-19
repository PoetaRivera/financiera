// Índices: 0=D, 1=Vf, 2=Va, 3=d, 4=n
const MSG = [
  "Introduce D",
  "Introduce Vf",
  "Introduce Va",
  "Introduce d",
  "Introduce n",
];

export function ejecutaCasoDescuento(
  numCaso,
  texto,
  setTexto,
  mostrar,
  setMostrar,
  setCaso,
  setDeshabilitado
) {
  let m1, m2, m3;

  switch (numCaso) {
    case 1:  m1 = 1; m2 = 2;           break; // Vf, Va
    case 2:  m1 = 2; m2 = 3; m3 = 4;  break; // Va, d, n
    case 3:  m1 = 1; m2 = 3; m3 = 4;  break; // Vf, d, n
    case 4:  m1 = 2; m2 = 0;           break; // Va, D
    case 5:  m1 = 0; m2 = 3; m3 = 4;  break; // D, d, n
    case 6:  m1 = 2; m2 = 3; m3 = 4;  break; // Va, d, n
    case 7:  m1 = 1; m2 = 0;           break; // Vf, D
    case 8:  m1 = 0; m2 = 3; m3 = 4;  break; // D, d, n
    case 9:  m1 = 1; m2 = 3; m3 = 4;  break; // Vf, d, n
    case 10: m1 = 1; m2 = 2; m3 = 4;  break; // Vf, Va, n
    case 11: m1 = 1; m2 = 0; m3 = 4;  break; // Vf, D, n
    case 12: m1 = 2; m2 = 0; m3 = 4;  break; // Va, D, n
    case 13: m1 = 1; m2 = 2; m3 = 3;  break; // Vf, Va, d
    case 14: m1 = 1; m2 = 0; m3 = 3;  break; // Vf, D, d
    case 15: m1 = 0; m2 = 2; m3 = 3;  break; // D, Va, d
    default: return;
  }

  texto[0] = MSG[m1];
  texto[1] = MSG[m2];
  if (m3 !== undefined) {
    texto[2] = MSG[m3];
    mostrar[2] = true;
  }
  setTexto([...texto]);
  mostrar[0] = true;
  mostrar[1] = true;
  setMostrar([...mostrar]);
  setCaso(numCaso);
  if (setDeshabilitado) setDeshabilitado(true);
}
