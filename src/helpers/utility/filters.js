import * as Valid from "./Validations.js";
/**
 * Função agrupo por propriedade
 * @param {array} objectArray Array de valores
 * @param {string} property Propriedade filtrada
 * @returns array
 */
export function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj, index) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({ key: index, ...obj });
    return acc;
  }, {});
}

/**
 * Converte string para numero
 * @param {string} valor Informe um valor
 * @returns boolean
 */

export function toNumber(valor) {
  console.log(Valid)
  let num = NaN;
  try {
    num = +(`${valor}`.replace(/\D+/g, ""));
  } catch (e) {
    console.info("Erro ao converter para numero");
  }
  return !isNaN(parseFloat(num));
}