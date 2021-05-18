import { Sheet } from "./googlesheet";

class DataBase {
  static #values = [];
  static #preload = false;

  constructor() {
    this.updateValuesFromTables();
  }

  get preload() {
    return DataBase.#preload;
  }

  get values() {
    return DataBase.#values;
  }
  set values(value) {
    DataBase.#values = value;
  }

  log(msg) {
    console.log("msg", msg, DataBase.#values);
  }

  saveValues(values) {
    DataBase.#preload = true;
    console.log("Ok, vamos enviar para o google salvar!", values);
    Sheet.onSaveValues(values, (el) => {
      const { data, msg, status } = JSON.parse(el);

      console.log("Mensagem do banco: ", msg);
      console.log("Status do datasets: ", status);

      console.log("Dados atualizados: ", data.updated);
      console.log("Dados criados: ", data.created);

      try {
        this.values.push(data.created);
        data.updated.forEach((value) => {
          let index = this.values.findIndex((obj) => obj.ID == value.ID);
          this.values[index] = value;
        });
      } catch (e) {
        console.log("Erro sync values!", e);
      } finally {
        DataBase.#preload = false;
      }
    });

    return true;
  }

  async updateValuesFromTables() {
    DataBase.#preload = true;
    Sheet.onGetValues(null, (el) => {
      const { data, msg, status } = JSON.parse(el);
      console.log("Mensagem do banco: ", msg);
      console.log("Status: ", status);
      this.values = data;
      DataBase.#preload = false;
    });
    return true;
  }

  find(filter) {
    return this.values.filter((obj) => {
      return Object.entries(filter).every(([col, val]) => obj[col] == val);
    });
  }
  getValue(id) {
    return this.values.find((el) => el.ID == id);
  }
}

const database = new DataBase();

export default database;
