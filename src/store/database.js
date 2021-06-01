import { Sheet } from "./googlesheet";
import event from "../lib/Event";

import { reactive } from "vue";

const moment = require("moment");

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
    setInterval(function () {
      this.updateValuesFromTables();
    }, 15 * 60 * 1000);
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

  /**
   * Salva lista de objetos
   * @param {array} values Array de objetos [obj, obj]
   * @returns Promises
   */
  saveValues(values) {
    let colUpdateDate = ["Criado em", "Atualizado em", "Vencimento", "Pago em"];
    values.forEach((obj) => {
      colUpdateDate.forEach((key) => {
        obj[key] = obj[key]
          ? moment(obj[key]).format("YYYY-MM-DD HH:mm:ss")
          : obj[key];
      });
    });

    database.status.load = true;
    console.log("Enviando dados para google salvar!", values);

    return Sheet.onSaveValues(values)
      .then((el) => {
        const { data, msg, status } = JSON.parse(el);

        console.log("Status do datasets: ", status);
        if (status) {
          console.log("Dados atualizados: ", data.updated);
          console.log("Dados criados: ", data.created);

          this.updateValuesFromTables();

          // try {
          //   this.values.push(data.created);
          //   data.updated.forEach((value) => {
          //     let index = this.values.findIndex((obj) => obj.ID == value.ID);
          //     this.values[index] = value;
          //   });
          // } catch (e) {
          //   console.log("Erro sync values!", e);
          // } finally {
          //   database.status.load = false;
          // }
          // router.go(-1);
          event.trigger("msg", "Dados salvo com sucesso! :)");
        } else {
          database.status.load = false;
          event.trigger("msg", "Erro ao salvar no banco de dados! :(");
          event.trigger("msg", msg);
        }
      })
      .catch((msg) => {
        event.trigger("msg", "Erro ao salvar no banco de dados! :(");
        database.status.load = false;
        return Promise.reject(msg);
      });
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

    return Sheet.onGetValues(null)
      .then((el) => {
        const { data, msg, status } = JSON.parse(el);
        console.log("Mensagem do banco: ", msg);
        console.log("Status: ", status);
        this.values = data;
        database.status.load = false;
      })
      .catch((error) => {
        console.log("Erro ao carregar dados: ", error);
        database.status.load = false;
      });
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
