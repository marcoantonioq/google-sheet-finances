<template>
  <h4>Notificações</h4>

  <div class="row" v-for="(values, item) in data" :key="item">
    <h5>{{ item }}</h5>
    <Table :settings="{ route: '/view/' }" :values="values" />
  </div>
</template>

<script>
import { computed, inject, reactive } from "vue";

import Table from "../components/table";

const moment = require("moment");
import { format } from "../helpers/utility";

export default {
  name: "Notificações",
  components: {
    Table,
  },
  setup() {
    const store = inject("store");
    const db = reactive(store.database);

    const data = reactive({});

    data["Ligar para alunos com mensalidade(s) atrasadas: "] = computed(() => {
      return db.values
        .filter((o) => o["Escola"] === store.escola.nome)
        .filter((o) => o["Tipo"] == "Mensalidade")
        .filter((o) => o["Pago em"] == "")
        .map((o) => {
          return {
            ID: o["ID"],
            Titularidade: o["Titularidade"],
            Discriminação: o["Discriminação"],
            Valor: format.toReal(o["Valor"]),
            Vencimento: moment(o["Vencimento"]).format("DD/MM/YYYY"),
          };
        });
    });

    return {
      data,
    };
  },
};
</script>
