import { Sheet } from "./googlesheet";
import event from "../lib/Event";

import { reactive } from "vue";

// import { useRouter } from "vue-router";

// const router = useRouter();
class DataBase {
  static #data = reactive({
    values: [],
  });
  status = reactive({
    load: false,
  });

  constructor() {
    this.updateValuesFromTables();
  }

  get values() {
    return DataBase.#data.values;
  }
  set values(value) {
    DataBase.#data.values = value;
  }

  log(msg) {
    console.log("msg", msg, DataBase.#data);
  }

  saveValues(values) {
    database.status.load = true;
    console.log("Enviando dados para google salvar!", values);
    const call = (el) => {
      const { data, msg, status } = JSON.parse(el);

      console.log("Status do datasets: ", status);
      if (status) {
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
          database.status.load = false;
        }
        // router.go(-1);
        event.trigger("msg", "Dados salvo com sucesso! :)");
      } else {
        event.trigger("msg", "Erro ao salvar no banco de dados! :(");
        event.trigger("msg", msg);
      }
    };

    const fail = (msg) => {
      event.trigger("msg", "Erro ao salvar no banco de dados! :(");
      event.trigger("msg", msg);
      database.status.load = false;
    };

    Sheet.onSaveValues(values, call, fail);

    return true;
  }

  updateValuesFromTables() {
    const database = this;
    database.status.load = true;

    setTimeout(() => {
      if (database.status.load) {
        database.status.load = false;
        console.error("Tempo limit para updateValues!", database.load);
      }
    }, 10000);

    Sheet.onGetValues(
      null,
      (el) => {
        const { data, msg, status } = JSON.parse(el);
        console.log("Mensagem do banco: ", msg);
        console.log("Status: ", status);
        this.values = data;
        database.status.load = false;
      },
      (error) => {
        console.log("Erro ao carregar dados: ", error);
        database.status.load = false;
      }
    );
    return true;
  }

  find(filter) {
    let entries = Object.entries(filter);
    return this.values.filter((obj) => {
      return entries.every(([col, val]) => obj[col] === val);
    });
  }
  getValue(id) {
    return this.values.find((el) => el.ID == id);
  }
}

const database = new DataBase();

export default database;
