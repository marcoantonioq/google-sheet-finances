import mockDB from "./db.mock";
import mockDS from "./datasets.mock";

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
  instance.onSaveValues = (values, call = func, fail = func) => {
    try {
      let sendData = JSON.stringify({ data: values, table: "Banco de dados" });
      console.log("onSaveValues em GoogleSheet.js recebeu: ", sendData);
      // eslint-disable-next-line no-undef
      google.script.run
        .withSuccessHandler(call)
        .withFailureHandler(fail)
        .save({ data: values, table: "Banco de dados" });
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

      // Mock values
      console.info("!!!! Dados Mock !!!!");
      call(JSON.stringify({ status: false, msg: "Dados Mock", data: mockDB }));
    }
  };

  /**
   * Pega dados de DataSets
   * @param {function} call Função de retorno
   * @returns void
   */
  instance.onGetDataSets = (call, fail = func) => {
    try {
      // eslint-disable-next-line no-undef
      return google.script.run
        .withSuccessHandler(call)
        .withFailureHandler(fail)
        .FieldsDataSets();
    } catch (e) {
      console.groupCollapsed("Erro ao buscar no Google: More...");
      console.warn("Erro:", e);
      console.groupEnd();

      // Mock values
      console.info("!!!! DataSets Mock !!!!");
      call(
        JSON.stringify({ status: false, msg: "Datasets Mock", data: mockDS })
      );
    }
  };
}

export const Sheet = new GoogleSheet();
