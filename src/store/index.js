import { reactive } from "vue";

import { Sheet } from "./googlesheet";

const state = reactive({
  counter: 0,
  notifications: 0,
  values: [],
  ds: [],
});

const methods = {
  countValues() {
    return state.values.length;
  },
  async addValue(value) {
    state.values.push(value);
    return true;
  },
  async delValue({ key }) {
    state.values.splice(key, 1);
    return true;
  },
  async updateValuesFromTables() {
    Sheet.onGetValues(null, (el) => {
      const { data, msg, status } = JSON.parse(el);
      console.log("Mensagem do banco: ", msg);
      console.log("Status do banco: ", status);
      state.values = data;
    });

    return true;
  },
  async updateDataSetsFromTables() {
    Sheet.onGetDataSets(null, (el) => {
      const { data, msg, status } = JSON.parse(el);
      console.log("Mensagem do banco: ", msg);
      console.log("Status do banco: ", status);
      state.ds = data;
    });
    console.log("Dados datasets: ", state.ds);
  },
};

const getters = {
  counterSquared() {
    return state.counter * state.counter;
  },
  find(filter) {
    return state.values.filter((obj) => {
      return Object.entries(filter).every(([col, val]) => obj[col] == val);
    });
  },
  getValue(id) {
    return state.values.find((el) => el.ID == id);
  },
  similarBills(titular) {
    return state.values.find((el) => el["Titularidade"] == titular);
  },
};

export default {
  state,
  methods,
  getters,
};
