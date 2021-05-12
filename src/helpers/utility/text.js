export default {
  /**
   * Normaliza texto (remove caracteres especiais)
   * @param {string} text Texto
   * @returns string
   */
  normalize: function (text) {
    return text.normalize("NFD").replace(/[^a-zA-Zs ]/g, "");
  },
};
