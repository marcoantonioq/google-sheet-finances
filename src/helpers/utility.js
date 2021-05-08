/**
 * Normaliza texto (remove caracteres especiais)
 * @param {string} text Texto
 * @returns string
 */
export function normalizeString(text) {
  return text.normalize("NFD").replace(/[^a-zA-Zs ]/g, "");
}
