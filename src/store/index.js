import { createStore } from "vuex";

const DataValues = {
  state: {
    values: [{ created: new Date(), name: "" }],
  },
  actions: {
    insertValueSpreadsheet({ commit }, value) {
      console.log("Recebido em Vuex", commit, value);
      return new Promise(() => {
        setTimeout(() => {
          value.date = Date.now();
          commit("addValue", value);
        }, 1000);
      });
    },
    getValueSpreeadSheet({ commit }) {
      //, state, dispatch
      console.log("GetValues", commit);
    },
    delValueSpreedSheet({ key }) {
      console.log("Remover key:", key);
    },
  },
  mutations: {
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
