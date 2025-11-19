import { useState } from "react";
//css
import "./interes.css";
import milogo from '../imagenes/financiera1024.png'
//variables
import { mensajesI, mensajesR } from "../variables/variables.js";
//componentes
import Opcion from "../componentes/Opcion.jsx";
import Indicaciones from "../componentes/Indicaciones.jsx";
import Incognita from "../componentes/Incognita.jsx";
import Datos from "../componentes/Datos.jsx";
import Calcular from "../componentes/Calcular.jsx";
import Resultados from "../componentes/Resultados.jsx";
import Seleccion from "../componentes/Seleccion.jsx";
//funciones
import { verificaSeleccion } from "../funciones/verificaSeleccion.js";
import { determinaCaso } from "../funciones/determinaCaso.js";
import { ejecutaCaso } from "../funciones/ejecutaCaso.js";
import { operaciones } from "../funciones/operacionesInteres.js";
import { alertaMensaje } from "../funciones/alertaMensaje.js";
import { esNumeroValido, esNumeroPositivo, sanitizarNumero } from "../funciones/validarInput.js";
//============================================================================================
//componente
export default function Interes({ tipo }) {
  // el tipo define si trabajo con interes(tipo=0) o con anualidades(tipo=1)

  //useStates
  const [muestraIndicaciones, setMuestraIndicaciones] = useState(false);
  //---------------------------------------------------------------------------------------------
  //inicializa incognita
  const initialStateIncognita = () => {
    if (tipo === 0) {
      return "I";
    } else if (tipo === 1) {
      return "R";
    }
  };
  const [incognita, setIncognita] = useState(initialStateIncognita);
  //-----------------------------------------------------------------------------------------------
  // inicializa Opcion
  const initialStateOpcion = () => {
    if (tipo === 0) {
      return "Simple";
    } else if (tipo === 1) {
      return "Vencida";
    }
  };
  const [opcion, setOpcion] = useState(initialStateOpcion);
  //-----------------------------------------------------------------------------------------------
  const [caso, setCaso] = useState(0);
  //-----------------------------------------------------------------------------------------------
  // inicializa datos
  const [datos, setDatos] = useState({
    I: false,
    Vf: false,
    Va: false,
    i: false,
    n: false,
  });

  //desestructura datos
  const { I, Vf, Va, i, n } = datos;

  //============================================================================================

  //useStates comunes
  const [mostrar, setMostrar] = useState(Array(4).fill(false));
  const [texto, setTexto] = useState(Array(4).fill(false));
  const [resultado, setResultado] = useState("");
  const [deshabilitado, setDeshabilitado] = useState(false);

  const [iI, setII] = useState(0);
  const [vf, setVf] = useState(0);
  const [va, setVa] = useState(0);
  const [ii, setIi] = useState(0);
  const [nn, setNn] = useState(0);

  //define variables de uso específico 'he regresado'

  let numCaso;

  let etiquetaOpcion1 = "";
  let etiquetaOpcion2 = "";
  let etiquetaInicial = "";
  let valorx = "";

  if (tipo === 0) {
    // Interes
    etiquetaOpcion1 = "Simple";
    etiquetaOpcion2 = "Compuesto";
    etiquetaInicial = "I";
    valorx = "I";
    // Anualidades
  } else if (tipo === 1) {
    etiquetaOpcion1 = "Vencida";
    etiquetaOpcion2 = "Anticipada";
    etiquetaInicial = "R";
    valorx = "R";
  }

  //------------------------------------------------------------------------------------

  function obtenerCaso() {
    if (verificaSeleccion(incognita, I, Vf, Va, i, n, tipo) === 0) {
      numCaso = determinaCaso(incognita, opcion, I, Vf, Va, i, n, tipo);

      ejecutaCaso(
        numCaso,
        texto,
        setTexto,
        mensajesI,
        mostrar,
        setMostrar,
        setCaso,
        setDeshabilitado,
        tipo
      );
    }
  }

  function manejarEntrada(e) {
    switch (caso) {
      case 1:
      case 16:
        e.target.name === "d1" && setVf(e.target.value);
        e.target.name === "d2" && setVa(e.target.value);
        break;
      case 2:
      case 17:
      case 6:
      case 21:
        e.target.name === "d1" && setVa(e.target.value);
        e.target.name === "d2" && setIi(e.target.value);
        e.target.name === "d3" && setNn(e.target.value);
        break;
      case 3:
      case 18:
      case 9:
      case 24:
        e.target.name === "d1" && setVf(e.target.value);
        e.target.name === "d2" && setIi(e.target.value);
        e.target.name === "d3" && setNn(e.target.value);
        break;
      case 4:
      case 19:
        e.target.name === "d1" && setII(e.target.value);
        e.target.name === "d2" && setVa(e.target.value);
        break;
      case 5:
      case 20:
      case 8:
      case 23:
        e.target.name === "d1" && setII(e.target.value);
        e.target.name === "d2" && setIi(e.target.value);
        e.target.name === "d3" && setNn(e.target.value);
        break;
      case 7:
      case 22:
        e.target.name === "d1" && setII(e.target.value);
        e.target.name === "d2" && setVf(e.target.value);
        break;
      case 10:
      case 25:
        e.target.name === "d1" && setVf(e.target.value);
        e.target.name === "d2" && setVa(e.target.value);
        e.target.name === "d3" && setNn(e.target.value);
        break;
      case 11:
      case 26:
        e.target.name === "d1" && setII(e.target.value);
        e.target.name === "d2" && setVf(e.target.value);
        e.target.name === "d3" && setNn(e.target.value);
        break;
      case 12:
      case 27:
        e.target.name === "d1" && setII(e.target.value);
        e.target.name === "d2" && setVa(e.target.value);
        e.target.name === "d3" && setNn(e.target.value);
        break;
      case 13:
      case 28:
        e.target.name === "d1" && setVf(e.target.value);
        e.target.name === "d2" && setVa(e.target.value);
        e.target.name === "d3" && setIi(e.target.value);
        break;
      case 14:
      case 29:
        e.target.name === "d1" && setII(e.target.value);
        e.target.name === "d2" && setVf(e.target.value);
        e.target.name === "d3" && setIi(e.target.value);
        break;
      case 15:
      case 30:
        e.target.name === "d1" && setII(e.target.value);
        e.target.name === "d2" && setVa(e.target.value);
        e.target.name === "d3" && setIi(e.target.value);
        break;
      default:
        break;
    }
  }

  function verificaEntradas() {
    const etiquetaI = tipo === 0 ? 'I' : 'R';

    switch (caso) {
      case 1:
      case 16:
        validarDatos([vf, va], ['Vf', 'Va']);
        break;

      case 4:
      case 19:
        validarDatos([va, iI], ['Va', etiquetaI]);
        break;

      case 7:
      case 22:
        validarDatos([vf, iI], ['Vf', etiquetaI]);
        break;

      case 2:
      case 17:
      case 6:
      case 21:
        validarDatos([va, ii, nn], ['Va', 'i', 'n']);
        break;

      case 3:
      case 18:
      case 9:
      case 24:
        validarDatos([vf, ii, nn], ['Vf', 'i', 'n']);
        break;

      case 5:
      case 20:
      case 8:
      case 23:
        validarDatos([iI, ii, nn], [etiquetaI, 'i', 'n']);
        break;

      case 10:
      case 25:
        validarDatos([vf, va, nn], ['Vf', 'Va', 'n']);
        break;

      case 11:
      case 26:
        validarDatos([iI, vf, nn], [etiquetaI, 'Vf', 'n']);
        break;

      case 12:
      case 27:
        validarDatos([iI, va, nn], [etiquetaI, 'Va', 'n']);
        break;

      case 13:
      case 28:
        validarDatos([vf, va, ii], ['Vf', 'Va', 'i']);
        break;

      case 14:
      case 29:
        validarDatos([iI, vf, ii], [etiquetaI, 'Vf', 'i']);
        break;

      case 15:
      case 30:
        validarDatos([iI, va, ii], [etiquetaI, 'Va', 'i']);
        break;

      default:
        break;
    }
    function validarDatos(datos, nombres = []) {
      // Verificar si hay datos vacíos
      if (datos.some((dato) => dato === undefined || dato === "")) {
        alertaMensaje("Ingrese todos los datos conocidos");
        return;
      }

      // Validar que todos sean números válidos
      for (let i = 0; i < datos.length; i++) {
        if (!esNumeroValido(datos[i])) {
          const nombreCampo = nombres[i] || `Campo ${i + 1}`;
          alertaMensaje(`"${nombreCampo}" debe ser un número válido`);
          return;
        }
      }

      // Validar que sean números positivos (permitiendo cero en algunos casos)
      for (let i = 0; i < datos.length; i++) {
        const valor = Number(datos[i]);

        // Verificar valores negativos
        if (valor < 0) {
          const nombreCampo = nombres[i] || `Campo ${i + 1}`;
          alertaMensaje(`"${nombreCampo}" no puede ser negativo`);
          return;
        }

        // Verificar cero (en valores financieros, típicamente no se permite cero)
        if (valor === 0) {
          const nombreCampo = nombres[i] || `Campo ${i + 1}`;
          alertaMensaje(`"${nombreCampo}" debe ser mayor que cero`);
          return;
        }
      }

      // Si todas las validaciones pasan, presentar resultado
      presentaResultado(tipo);
    }
  }

  function presentaResultado(tipo) {
    let numMesaje;

    switch (caso) {
      case 1:
      case 2:
      case 3:
      case 16:
      case 17:
      case 18:
        tipo === 1 ? (numMesaje = 5) : (numMesaje = 0);
        break;
      case 4:
      case 5:
      case 6:
      case 19:
      case 20:
      case 21:
        numMesaje = 1;
        break;
      case 7:
      case 8:
      case 9:
      case 22:
      case 23:
      case 24:
        numMesaje = 2;
        break;
      case 10:
      case 11:
      case 12:
      case 25:
      case 26:
      case 27:
        numMesaje = 3;
        break;
      case 13:
      case 14:
      case 15:
      case 28:
      case 29:
      case 30:
        numMesaje = 4;
        break;
    }
    texto[3] = mensajesR[numMesaje];
    const textoNuevo = [...texto];
    setTexto(textoNuevo);
    mostrar[3] = true;
    const mostrarNuevo = [...mostrar];
    setMostrar(mostrarNuevo);
    setResultado(operaciones(caso, iI, vf, va, ii, nn, tipo));
  }

  function limpiar() {
    setCaso(0);
    setOpcion(etiquetaOpcion1);
    setIncognita(etiquetaInicial);
    setDatos({
      ...datos,
      I: false,
      Vf: false,
      Va: false,
      i: false,
      n: false,
    });

    setMostrar(Array(4).fill(false));
    setTexto(Array(4).fill(false));
    setResultado("");
    setDeshabilitado(false);
    setII(0);
    setVf(0);
    setVa(0);
    setIi(0);
    setNn(0);
  }

  function interesAnualidad() {
    if (tipo === 0) {
      return "Interés";
    } else if (tipo === 1) {
      return "Anualidades";
    }
  }
  let muestraIndicacionesNuevo = muestraIndicaciones;

  return (
    <main className="principal">
      <div className="cabecera-principal">
        <header>
          <div className="cabecera">
            <h2 className="titulo">{interesAnualidad()}</h2>

            <button
              className="boton-ayuda"
              onClick={() => {
                setMuestraIndicaciones(!muestraIndicacionesNuevo);
              }}
            >
              Ayuda
            </button>
          </div>
        </header>
      </div>
      {muestraIndicaciones ? (
        <Indicaciones tipo={tipo} miClase={"aparecer"} />
      ) : null}

      <Opcion
        className="opcion"
        deshabilitado={deshabilitado}
        opcion1={etiquetaOpcion1}
        opcion2={etiquetaOpcion2}
        opcion={opcion}
        setOpcion={setOpcion}
        tipo={tipo}
      ></Opcion>

      <Incognita
        className="incognita"
        deshabilitado={deshabilitado}
        valor1={valorx}
        valor2="Vf"
        valor3="Va"
        valor4="i"
        valor5="n"
        incognita={incognita}
        setIncognita={setIncognita}
      ></Incognita>

      <Datos
        className="datos"
        deshabilitado={deshabilitado}
        valor1={valorx}
        valor2="Vf"
        valor3="Va"
        valor4="i"
        valor5="n"
        datos={datos}
        setDatos={setDatos}
      ></Datos>

      <Seleccion
        className="seleccion"
        obtenerCaso={obtenerCaso}
        deshabilitado={deshabilitado}
      ></Seleccion>

      {!mostrar[0] ? (<img className="logo" alt="Logo Financiera" src={milogo} />):null}

      <Resultados
        className="resultados"
        manejarEntrada={manejarEntrada}
        mostrar={mostrar}
        texto={texto}
        resultado={resultado}
      ></Resultados>

      <Calcular
        className="calcular"
        verificaEntradas={verificaEntradas}
        limpiar={limpiar}
      ></Calcular>
    </main>
  );
}
