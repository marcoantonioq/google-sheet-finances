import { Sheet } from "./googlesheet";

class DataSets {
  static #values = [];

  constructor() {
    this.updateDataSetsFromTables();
  }

  set values(values) {
    DataSets.#values = values;
  }
  get values() {
    return DataSets.#values;
  }
  get count() {
    return DataSets.#values.length;
  }

  async updateDataSetsFromTables() {
    Sheet.onGetDataSets((el) => {
      const { data, msg, status } = JSON.parse(el);
      console.log("Mensagem do datasets: ", msg);
      console.log("Status: ", status);
      this.values = data;
    });
    return true;
  }

  getDataSetsOnFilter(filters = []) {
    try {
      if (DataSets.#values) {
        let values = [];
        filters.forEach((filter) => {
          values = DataSets.#values.filter(filter);
        });
        return values;
      } else {
        throw "Não há DataSets";
      }
    } catch (e) {
      console.info(e);
      return [];
    }
  }
  tiposMovimento(escola) {
    return this.getDataSetsOnFilter([
      (el) => String(el["Escola"]).includes(escola),
      (el) => String(el["Campo"]).includes("Tipo"),
    ]);
  }
  locaisMovimento(escola) {
    return datasets.getDataSetsOnFilter([
      (el) => String(el["Escola"]).includes(escola),
      (el) => String(el["Campo"]).includes("Local de movimento"),
    ]);
  }
  formasPagamento(escola) {
    return datasets.getDataSetsOnFilter([
      (el) => String(el["Escola"]).includes(escola),
      (el) => String(el["Campo"]).includes("Forma de Pagamento"),
    ]);
  }
}

const datasets = new DataSets();

export default datasets;
