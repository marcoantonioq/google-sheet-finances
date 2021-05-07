function GoogleSheet() {
  var instance = {};

  // Set the instance.
  instance = this;

  // eslint-disable-next-line no-func-assign
  GoogleSheet = function () {
    return instance;
  };

  /**
   * Função modelo
   */
  let func = (el) => el;

  /**
   * Salvar dados no banco de dados {ID:1} => update {ID: null} => Insert
   * @param {function} call Função de retorno
   * @returns void
   */
  instance.pushValues = (value, call = func, fail = func) => {
    try {
      // eslint-disable-next-line no-undef
      google.script.run
        .withSuccessHandler(call)
        .withFailureHandler(fail)
        .pushValueWebApp(value);
    } catch (e) {
      console.groupCollapsed("Erro ao salvar no Google: More...");
      console.warn("Erro:", e);
      console.groupEnd();
    }
  };

  /**
   * Pega dados do Banco de Dados
   * @param {function} call Função de retorno
   * @returns void
   */
  instance.onGetValues = (filter = null, call, fail = func) => {
    try {
      // eslint-disable-next-line no-undef
      return google.script.run
        .withSuccessHandler(call)
        .withFailureHandler(fail)
        .find({ table: "Banco de dados", filter: filter });
    } catch (e) {
      console.groupCollapsed("Erro ao buscar no Google: More...");
      console.warn("Erro:", e);
      console.groupEnd();
    }
  };
}

export const Sheet = new GoogleSheet();
