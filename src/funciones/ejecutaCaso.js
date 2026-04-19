export function ejecutaCaso(
  numCaso,
  texto,
  setTexto,
  mensajesI,
  mostrar,
  setMostrar,
  setCaso,
  setDeshabilitado,
  tipo
) {
  let m1, m2, m3;

  switch (numCaso) {
    case 1:
    case 16:
      m1 = 1;
      m2 = 2;
      break;

    case 4:
    case 19:
      m1 = 0;
      m2 = 2;
      break;

    case 7:
    case 22:
      m1 = 0;
      m2 = 1;
      break;

    case 2:
    case 17:
    case 6:
    case 21:
      m1 = 2;
      m2 = 3;
      m3 = 4;
      break;

    case 3:
    case 18:
    case 9:
    case 24:
      m1 = 1;
      m2 = 3;
      m3 = 4;
      break;

    case 5:
    case 20:
    case 8:
    case 23:
      tipo === 1 ? (m1 = 5) : (m1 = 0);
      m2 = 3;
      m3 = 4;
      break;

    case 10:
    case 25:
      m1 = 1;
      m2 = 2;
      m3 = 4;
      break;

    case 11:
    case 26:
      m1 = 0;
      m2 = 1;
      m3 = 4;
      break;

    case 12:
    case 27:
      m1 = 0;
      m2 = 2;
      m3 = 4;
      break;

    case 13:
    case 28:
      m1 = 1;
      m2 = 2;
      m3 = 3;
      break;

    case 14:
    case 29:
      tipo === 1 ? (m1 = 5) : (m1 = 0);
      m2 = 1;
      m3 = 3;
      break;

    case 15:
    case 30:
      tipo === 1 ? (m1 = 5) : (m1 = 0);
      m2 = 2;
      m3 = 3;
      break;
  }

  texto[0] = mensajesI[m1];
  texto[1] = mensajesI[m2];
  if (m3 !== undefined) {
    texto[2] = mensajesI[m3];
    mostrar[2] = true;
  }
  const textoNuevo = [...texto];
  setTexto(textoNuevo);
  mostrar[0] = true;
  mostrar[1] = true;
  const mostrarNuevo = [...mostrar];
  setMostrar(mostrarNuevo);
  setCaso(numCaso);
  if (setDeshabilitado) setDeshabilitado(true);
}
