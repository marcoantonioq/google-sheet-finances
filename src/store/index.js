import { createStore } from "vuex";
import { Sheet } from "./googlesheet";
import mock from "./db.mock";

const DataValues = {
  state: {
    values: [],
  },
  actions: {
    async setValues(context, payload) {
      const val = { payload };
      context.values = val;
    },
    async addValue(context, payload) {
      const val = { payload };
      context.values.push(val);
    },
    async delValue(context, { key }) {
      console.log("remover", context, key);
      context.values.splice(key, 1);
    },
    async getValues(context) {
      context.commit("getValueSpreadsheetToState");
      return context.state.values;
    },
  },
  getters: {
    // Campis calculados
    countValues: (state) => {
      return state.values.length;
    },
  },
  mutations: {
    insertValueSpreadsheet({ commit }, value) {
      return new Promise((resolve) => {
        setTimeout(() => {
          value.date = Date.now();
          commit("addValue", value);
          console.log("Resolve: ", resolve);
        }, 1000);
      });
    },
    getValueSpreadsheetToState(state) {
      // const { values } = state;
      Sheet.onGetValues(null, (el) => {
        console.log("Mensagem do banco: ", el.msg);
        console.log("Status do banco: ", el.status);
        state.values = el.data;
      });
      state.values = mock;
    },
    delValueSpreadSheet({ key }) {
      console.log("Remover key:", key);
    },
  },
  mounted() {
    console.log("DB mounted");
  },
};

const Count = {
  state: {
    notifications: 0,
  },
  mutations: {
    setNotification(state, value) {
      state.notifications = value;
    },
  },
};

const store = createStore({
  modules: {
    tables: DataValues,
    Count: Count,
  },
});

export default store;
