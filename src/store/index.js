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
    async updateValues(context) {
      context.commit("updateFromTable");
    },
  },
  getters: {
    // Campis calculados
    countValues: (state) => {
      return state.values.length;
    },
  },
  mutations: {
    updateFromTable(state) {
      Sheet.onGetValues(null, (el) => {
        console.log("Mensagem do banco: ", el.msg);
        console.log("Status do banco: ", el.msg);
        state.values = el.data;
      });
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
