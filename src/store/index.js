import { createStore } from "vuex";
import { Sheet } from "./googlesheet";
// import mock from "./db.mock";

const DataValues = {
  state: {
    values: [],
  },
  getters: {
    // Campis calculados
    countValues: (state) => {
      return state.values.length;
    },
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
    async updateValues(context) {
      console.log("Função async para atualizar banco de dados chamada!");
      context.commit("updateFromTable");
    },
  },
  mutations: {
    updateFromTable(state) {
      console.log("Função para atualizar banco de dados chamada!");
      Sheet.onGetValues(null, (el) => {
        console.log("All data", JSON.parse(el))
        console.log("Mensagem do banco: ", el.msg);
        console.log("Status do banco: ", el.status);
        state.values = el.data;
      });
      // state.values = mock;
    },
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
