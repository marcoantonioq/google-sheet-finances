import mockDB from "./database.mock";
import mockDS from "./datasets.mock";

class Google {
  func(resp) {
    return resp;
  }

  /**
   * Salvar dados no banco de dados {ID:1} => update {ID: null} => Insert
   * @param {array} values Valores enviados ao Google Sheets
   * @param {function} call Função de retorno
   * @param {function} fail Função de error
   * @returns boolean
   */
  onSaveValues(values, call = this.func, fail = this.func) {
    try {
      let sendData = JSON.stringify({ data: values, table: "Banco de dados" });
      console.log("onSaveValues em GoogleSheet.js recebeu: ", sendData, call);
      // eslint-disable-next-line no-undef
      google.script.run
        .withSuccessHandler(call)
        .withFailureHandler(fail)
        .save(sendData);
      return true;
    } catch (e) {
      console.groupCollapsed("Erro ao salvar no Google: More...");
      console.warn("Erro:", e);
      console.groupEnd();
      fail();
      return false;
    }
  }

  /**
   * Pega dados do Banco de Dados
   * @param {*} filter Filtro no formato Ex. {ES: "Entrada"}
   * @param {function} call Função de retorno
   * @param {function} fail Função de error
   * @returns
   */
  onGetValues(filter = null, call, fail = this.func) {
    try {
      // eslint-disable-next-line no-undef
      return google.script.run
        .withSuccessHandler(call)
        .withFailureHandler(fail)
        .find({ table: "Banco de dados", filter: filter });
    } catch (e) {
      console.groupCollapsed("Erro ao buscar Dados no Google: More...");
      console.error("Erro:", e);
      console.info("!!!! Dados Mock !!!!");
      console.groupEnd();

      // Mock values
      call(JSON.stringify({ status: false, msg: "Dados Mock", data: mockDB }));
    }
  }

  /**
   * Pega dados de DataSets
   * @param {function} call Função de retorno
   * @param {function} fail Função de error
   * @returns
   */
  onGetDataSets(call, fail = this.func) {
    try {
      // eslint-disable-next-line no-undef
      return google.script.run
        .withSuccessHandler(call)
        .withFailureHandler(fail)
        .FieldsDataSets();
    } catch (e) {
      console.groupCollapsed("Erro ao buscar DataSets no Google: More...");
      console.error("Erro:", e);
      console.info("!!!! DataSets Mock !!!!");
      console.groupEnd();

      // Mock values
      call(
        JSON.stringify({ status: false, msg: "Datasets Mock", data: mockDS })
      );
    }
  }
}

export const Sheet = new Google();
