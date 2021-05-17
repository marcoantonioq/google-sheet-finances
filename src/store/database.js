import { Sheet } from "./googlesheet";

class DataBase {
  static #values = [];

  constructor() {
    console.log("DataBase criado");
    this.updateValuesFromTables();
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
      }
    });

    return true;
  }

  updateValuesFromTables() {
    console.log("Escopo updateValues", this);
    Sheet.onGetValues(null, (el) => {
      const { data, msg, status } = JSON.parse(el);
      console.log("Mensagem do banco: ", msg);
      console.log("Status do datasets: ", status);
      this.values = data;
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
  similarBills(obj) {
    return this.values.filter(
      (el) => (el["Titularidade"] = obj["Titularidade"])
    );
  }
}

const database = new DataBase();

export default database;
