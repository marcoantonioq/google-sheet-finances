import { createStore } from "vuex";
import { Sheet } from "./googlesheet";
import mock from "./db.mock";

const DataValues = {
  state: {
    values: [],
  },
  actions: {
    insertValueSpreadsheet({ commit }, value) {
      return new Promise((resolve) => {
        setTimeout(() => {
          value.date = Date.now();
          commit("addValue", value);
          console.log("Resolve: ", resolve);
        }, 1000);
      });
    },
    getValueSpreadsheet({ commit }) {
      Sheet.getValues()
      commit("setValues", mock);
      // commit()
    },
    delValueSpreadSheet({ key }) {
      console.log("Remover key:", key);
    },
  },
  mutations: {
    setValues(state, payload) {
      state.values = payload;
    },
    addValue(state, payload) {
      state.values.push(payload);
    },
    delValue(state, { key }) {
      console.log("remover", state, key);
      state.values.splice(key, 1);
    },
  },
};

const Count = {
  state: {
    count: 0,
  },
  mutations: {
    setCount(state, value) {
      state.count = value;
    },
  },
};

const store = createStore({
  modules: {
    DB: DataValues,
    Count: Count,
  },
});

export default store;
