import { Sheet } from "./googlesheet";

import { reactive } from "vue";

class DataSets {
  static #data = reactive({
    values: [],
  });

  constructor() {
    this.updateDataSetsFromTables();
  }

  set values(values) {
    DataSets.#data.values = values;
  }
  get values() {
    return DataSets.#data.values;
  }
  get count() {
    return DataSets.#data.values.length;
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
      if (this.values) {
        let values = this.values;
        filters.forEach((filter) => {
          values = values.filter(filter);
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
  tiposMovimento(escola, es = "Entrada/Saída") {
    return this.getDataSetsOnFilter([
      (el) => String(el["Escola"]).includes(escola),
      (el) => String(el["Campo"]).includes("Tipo"),
      (el) => String(el["Entrada/Saída"]).includes(es),
    ]);
  }
  locaisMovimento(escola, es = "Entrada/Saída") {
    return datasets.getDataSetsOnFilter([
      (el) => String(el["Escola"]).includes(escola),
      (el) => String(el["Campo"]).includes("Local do movimento"),
      (el) => String(el["Entrada/Saída"]).includes(es),
    ]);
  }
  formasPagamento(escola, es = "Entrada/Saída") {
    return datasets.getDataSetsOnFilter([
      (el) => String(el["Escola"]).includes(escola),
      (el) => String(el["Campo"]).includes("Forma de Pagamento"),
      (el) => String(el["Entrada/Saída"]).includes(es),
    ]);
  }
}

const datasets = new DataSets();

export default datasets;
