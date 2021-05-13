import { reactive } from "vue";

import { Sheet } from "./googlesheet";

const state = reactive({
  counter: 0,
  notifications: 0,
  values: [],
  escolas: ["Cidade de Goiás", "Jussara", "Itaberaí"],
  current_escola: "",
  ds: [],
});

const methods = {
  countValues() {
    return state.values.length;
  },
  saveValues(values) {
    console.log("Ok, vamos enviar para o google salvar!", values);
    Sheet.onSaveValues(values, (el) => {
      const { data, msg, status } = JSON.parse(el);

      console.log("Mensagem do banco: ", msg);
      console.log("Status do datasets: ", status);

      console.log("Dados atualizados: ", data.updated);
      console.log("Dados criados: ", data.created);

      state.updateValues(data.updated);

      state.values.push(data.created);
    });

    return true;
  },
  updateValues(values) {
    values.forEach((value) => {
      console.log("Atualizar:", value);
      let index = state.values.findIndex((obj) => obj.ID == value.ID);
      state.values[index] = value;
    });
  },
  async delValue({ key }) {
    state.values.splice(key, 1);
    return true;
  },
  async updateValuesFromTables() {
    Sheet.onGetValues(null, (el) => {
      const { data, msg, status } = JSON.parse(el);
      console.log("Mensagem do banco: ", msg);
      console.log("Status do datasets: ", status);
      state.values = data;
    });

    return true;
  },
  async updateDataSetsFromTables() {
    Sheet.onGetDataSets((el) => {
      const { data, msg, status } = JSON.parse(el);
      console.log("Mensagem do banco: ", msg);
      console.log("Status do banco: ", status);
      state.ds = data;
    });

    return true;
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
};

export default {
  state,
  methods,
  getters,
};
