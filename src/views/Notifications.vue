<template>
  <h4>Notificações</h4>

  <div class="row" v-for="(values, item) in data" :key="item">
    <h5>{{ item }}</h5>
    <Table
      :settings="{ route: '/view/', editable: ['Outras Observações'] }"
      :values="values"
    />
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

    function sortUpdate(a, b) {
      if (a["Atualizado em"] < b["Atualizado em"]) {
        return -1;
      }
      if (a["Atualizado em"] > b["Atualizado em"]) {
        return 1;
      }
      return 0;
    }

    data["Ligar para alunos com mensalidade(s) atrasadas: "] = computed(() => {
      return (
        db.values
          .filter((o) => o["Escola"] === store.escola.nome)
          .filter((o) => o["Tipo"] == "Mensalidade")
          .filter((o) => o["Pago em"] == "")
          // .filter((o) => moment().isAfter(moment(o["Vencimento"])))
          .sort(sortUpdate)
          .map((o) => {
            return {
              ID: o["ID"],
              Titularidade: o["Titularidade"],
              Discriminação: o["Discriminação"],
              Valor: format.toReal(o["Valor"]),
              Vencimento: moment(o["Vencimento"]).format("DD/MM/YYYY"),
            };
          })
      );
    });

    db.count = Object.entries(data).reduce((acc, [, v]) => {
      console.log("Itens:", v);
      acc = acc + v.length;
      return acc;
    }, 0);

    return {
      data,
    };
  },
};
</script>
