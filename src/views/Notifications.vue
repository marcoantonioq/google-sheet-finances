<template>
  <h4>Notificações</h4>

  Count {{ count }}

  <div class="row" v-for="(values, item) in data" :key="item">
    <h5>{{ item }}</h5>
    <Table
      :settings="{ route: '/view/', editable: ['Outras Observações'] }"
      :values="values"
    />
  </div>
</template>

<script>
import { computed, inject, reactive, ref, watch } from "vue";

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

    const count = ref(0);
    watch(
      () => data,
      (val) => {
        console.log("Data alterado: ", val);
        count.value = 1;
        return val;
      }
    );

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

    return {
      data,
      count,
    };
  },
};
</script>
