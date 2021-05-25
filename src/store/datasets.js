import { Sheet } from "./googlesheet";

// import { reactive } from "vue";

class DataSets {
  static #values = {};

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
    return this.values.length;
  }

  getValues(escola, campo, es) {
    return this.values[escola][campo][es];
  }

  async updateDataSetsFromTables() {
    let ds = this;
    Sheet.onGetDataSets((el) => {
      const { data, msg, status } = JSON.parse(el);
      console.log("Mensagem do datasets: ", msg);
      console.log("Status: ", status);
      ds.values = data;
    });
  }
}

const datasets = new DataSets();

export default datasets;
