import { Sheet } from "./googlesheet";

const database = {
  _values: [],
  set values(values) {
    this._values.slice(0, this._values.length, ...values);
  },
  get values() {
    return this._values;
  },
  get count() {
    return this._values.length;
  },
  methods: {
    countValues() {
      return database.values.length;
    },
    saveValues(values) {
      console.log("Ok, vamos enviar para o google salvar!", values);
      Sheet.onSaveValues(values, (el) => {
        const { data, msg, status } = JSON.parse(el);

        console.log("Mensagem do banco: ", msg);
        console.log("Status do datasets: ", status);

        console.log("Dados atualizados: ", data.updated);
        console.log("Dados criados: ", data.created);

        try {
          this.values = data;
        } catch (e) {
          console.log("Erro update values!", e);
        }
        try {
          database.values.push(data);
        } catch (e) {
          console.log("Erro push values!", e);
        }
      });

      return true;
    },
    async updateValuesFromTables() {
      Sheet.onGetValues(null, (el) => {
        const { data, msg, status } = JSON.parse(el);
        console.log("Mensagem do banco: ", msg);
        console.log("Status do datasets: ", status);
        this.values = data;
      });

      return true;
    },
  },
  getters: {
    find(filter) {
      return database.values.filter((obj) => {
        return Object.entries(filter).every(([col, val]) => obj[col] == val);
      });
    },
    getValue(id) {
      return database.values.find((el) => el.ID == id);
    },
  },
};

export default {
  database,
};
