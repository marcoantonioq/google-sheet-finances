export default {
  /**
   * Retorna contagem de ocorrĂȘncias de um valor
   * @param {array} arr Array de dados
   * @returns object
   */
  countsCurrent(arr) {
    return arr.reduce(
      (acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1,
      }),
      {}
    );
  },
};
