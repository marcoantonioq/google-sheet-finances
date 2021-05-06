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
      console.log("Erro GooglePushValues");
    }
  };

  /**
   * Pega dados do Banco de Dados
   * @param {function} call Função de retorno
   * @returns void
   */
  instance.getValues = (call, fail = func) => {
    try {
      // eslint-disable-next-line no-undef
      return google.script.run
        .withSuccessHandler(call)
        .withFailureHandler(fail)
        .getInfoWebApp();
    } catch (e) {
      console.group("Erro ao buscar no Google")
      console.groupCollapsed("More...")
      console.warn("Erro:", e)
      console.groupEnd()
    }
  };
}

export const Sheet = new GoogleSheet();
