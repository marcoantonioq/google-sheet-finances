import database from "./database.js";
import datasets from "./database.js";

import { reactive } from "vue";

const escola = reactive({
  _nome: "",
  set nome(nome) {
    localStorage.setItem("escola", nome);
    this._nome = nome;
  },
  get nome() {
    let nome = localStorage.getItem("escola");
    return nome || this._nome;
  },
  escolas: ["Cidade de Goiás", "Jussara", "Itaberaí"],
});

export default {
  escola,
  ...database,
  ...datasets,
};
