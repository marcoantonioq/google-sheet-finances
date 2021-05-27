<template>
  <div class="row">
    <div class="col s6">
      <div class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            Saldo: <br />

            {{ format.toReal(saldo) }} <br />
          </div>
        </div>
      </div>
    </div>

    <div class="col s6">
      <div class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            Cofre: {{ format.toReal(cofre) }}<br />
          </div>
        </div>
      </div>
    </div>
  </div>

  Saída do dia: {{ format.toReal(pago) }}<br />
  Entrada do dia: {{ format.toReal(recebido) }}<br />

  <div v-if="entradas.length > 0">
    <h5>Entradas</h5>
    <ValuesIndex :values="entradas" />
  </div>

  <div v-if="saidas.length > 0">
    <h5>Saídas</h5>
    <ValuesIndex v-if="saidas.length > 0" :values="saidas" />
  </div>
</template>

<script>
import ValuesIndex from "../components/Values/showpay";

import { inject, computed, reactive } from "vue";

const moment = require("moment");
import { format } from "../helpers/utility";

export default {
  name: "Home",
  components: {
    ValuesIndex,
  },
  setup() {
    const store = inject("store");

    const values = reactive(store.database.values);

    const current_date = moment();

    const entradas = computed(() => {
      return store.database.values
        .filter((o) => o["Escola"] === store.escola.nome)
        .filter((obj) => obj["ES"] === "Entrada")
        .filter(
          (obj) =>
            moment(obj["Atualizado em"]).format("DD/MM/YYYY") ===
            current_date.format("DD/MM/YYYY")
        );
    });

    const saidas = computed(() => {
      return store.database.values
        .filter((o) => o["Escola"] === store.escola.nome)
        .filter((obj) => obj["ES"] === "Saída")
        .filter(
          (obj) =>
            moment(obj["Atualizado em"]).format("DD/MM/YYYY") ===
            current_date.format("DD/MM/YYYY")
        );
    });

    const saldo = computed(() => {
      return values
        .filter((o) => o["Escola"] === store.escola.nome)
        .reduce((acc, val) => {
          return acc + val["Valor"];
        }, 0);
    });

    const cofre = computed(() => {
      return values
        .filter((o) => o["Escola"] === store.escola.nome)
        .filter((o) => o["Local do movimento"] === "Cofre")
        .reduce((acc, val) => {
          return acc + val["Valor"];
        }, 0);
    });

    const pago = computed(() => {
      return values
        .filter((o) => o["Escola"] === store.escola.nome)
        .filter((o) => o["ES"] === "Saída")
        .filter((o) => o["Pago em"] === "")
        .filter(
          (o) =>
            moment(o["Vencimento"]).format("DD/MM/YYYY") ===
            current_date.format("DD/MM/YYYY")
        )
        .reduce((acc, val) => {
          return acc + val["Valor"];
        }, 0);
    });

    const recebido = computed(() => {
      return values
        .filter((o) => o["Escola"] === store.escola.nome)
        .filter((o) => o["ES"] === "Entrada")
        .filter((o) => o["Pago em"] === "")
        .filter(
          (o) =>
            moment(o["Vencimento"]).format("DD/MM/YYYY") ===
            current_date.format("DD/MM/YYYY")
        )
        .reduce((acc, val) => {
          return acc + val["Valor"];
        }, 0);
    });

    return {
      store,
      values,
      saldo,
      cofre,
      pago,
      recebido,
      format,
      entradas,
      saidas,
    };
  },
};
</script>

<style lang="scss" scoped>
td,
th {
  padding: 5px;
}

th {
  cursor: pointer;
}
</style>
