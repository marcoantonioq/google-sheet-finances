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
      DataSets.#data.values = data;
    });
  }
}

const datasets = new DataSets();

export default datasets;
