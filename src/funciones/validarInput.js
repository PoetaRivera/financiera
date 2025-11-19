import { alertaMensaje } from "./alertaMensaje.js";

/**
 * Valida que un valor sea un número válido
 * @param {*} valor - El valor a validar
 * @returns {boolean} - true si es válido, false si no
 */
export function esNumeroValido(valor) {
  // Verificar strings vacíos antes de convertir
  if (typeof valor === 'string' && valor.trim() === '') {
    return false;
  }

  // Verificar null o undefined
  if (valor === null || valor === undefined) {
    return false;
  }

  // Convertir a número
  const num = Number(valor);

  // Verificar que sea un número y no NaN
  if (isNaN(num)) {
    return false;
  }

  // Verificar que sea finito (no Infinity)
  if (!isFinite(num)) {
    return false;
  }

  return true;
}

/**
 * Valida que un valor sea un número positivo
 * @param {*} valor - El valor a validar
 * @param {boolean} permitirCero - Si se permite el valor 0 (default: false)
 * @returns {boolean} - true si es válido, false si no
 */
export function esNumeroPositivo(valor, permitirCero = false) {
  if (!esNumeroValido(valor)) {
    return false;
  }

  const num = Number(valor);

  if (permitirCero) {
    return num >= 0;
  }

  return num > 0;
}

/**
 * Valida que un valor sea una tasa de interés válida (entre 0 y 1, o entre 0% y 100%)
 * @param {*} valor - El valor a validar
 * @returns {boolean} - true si es válido, false si no
 */
export function esTasaValida(valor) {
  if (!esNumeroValido(valor)) {
    return false;
  }

  const num = Number(valor);

  // Permitir tasas entre 0 y 100 (formato porcentaje)
  // o entre 0 y 1 (formato decimal)
  return num >= 0 && num <= 100;
}

/**
 * Valida un input numérico y muestra alerta si es inválido
 * @param {*} valor - El valor a validar
 * @param {string} nombreCampo - Nombre del campo para el mensaje de error
 * @param {Object} opciones - Opciones de validación
 * @param {boolean} opciones.positivo - Requiere número positivo (default: true)
 * @param {boolean} opciones.permitirCero - Permite el valor 0 (default: false)
 * @param {boolean} opciones.esTasa - Valida como tasa de interés (default: false)
 * @returns {boolean} - true si es válido, false si no
 */
export function validarInputConAlerta(valor, nombreCampo, opciones = {}) {
  const {
    positivo = true,
    permitirCero = false,
    esTasa = false
  } = opciones;

  // Verificar si está vacío
  if (valor === "" || valor === null || valor === undefined) {
    alertaMensaje(`El campo "${nombreCampo}" no puede estar vacío`);
    return false;
  }

  // Verificar si es un número válido
  if (!esNumeroValido(valor)) {
    alertaMensaje(`El campo "${nombreCampo}" debe ser un número válido`);
    return false;
  }

  // Validar como tasa de interés
  if (esTasa) {
    if (!esTasaValida(valor)) {
      alertaMensaje(`La tasa de interés debe estar entre 0 y 100`);
      return false;
    }
    return true;
  }

  // Validar como número positivo
  if (positivo && !esNumeroPositivo(valor, permitirCero)) {
    if (permitirCero) {
      alertaMensaje(`El campo "${nombreCampo}" debe ser mayor o igual a 0`);
    } else {
      alertaMensaje(`El campo "${nombreCampo}" debe ser un número positivo`);
    }
    return false;
  }

  return true;
}

/**
 * Sanitiza un valor numérico (limpia y convierte a número)
 * @param {*} valor - El valor a sanitizar
 * @returns {number} - El número sanitizado o 0 si es inválido
 */
export function sanitizarNumero(valor) {
  // Si ya es un número, devolverlo
  if (typeof valor === 'number') {
    return isNaN(valor) ? 0 : valor;
  }

  // Si es string, intentar convertir
  if (typeof valor === 'string') {
    // Eliminar espacios en blanco
    const limpio = valor.trim();

    // Convertir a número
    const num = Number(limpio);

    // Retornar el número o 0 si es NaN
    return isNaN(num) ? 0 : num;
  }

  // Para otros tipos, retornar 0
  return 0;
}
