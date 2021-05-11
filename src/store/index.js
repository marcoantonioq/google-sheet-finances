import { reactive } from "vue";
import mock from "./db.mock";

const state = reactive({
  counter: 0,
  notifications: 0,
  values: [],
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
    console.log("Função async para atualizar banco de dados chamada!");
    // console.log("Função para atualizar banco de dados chamada!");
    // Sheet.onGetValues(null, (el) => {
    //   const { data, msg, status } = JSON.parse(el);
    //   console.log("Mensagem do banco: ", msg);
    //   console.log("Status do banco: ", status);
    //   state.values = data;
    // });
    state.values = mock;
    return true;
  },
};

const getters = {
  counterSquared() {
    return state.counter * state.counter;
  },
  find(filter) {
    if (filter) {
      return state.values;
    } else {
      return state.values.filter((obj) => {
        return Object.entries(filter).every(([col, val]) => obj[col] == val);
      });
    }
  },
};

export default {
  state,
  methods,
  getters,
};
