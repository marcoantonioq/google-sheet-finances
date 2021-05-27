<template>
  <div class="home">Pagina home</div>
  <h1>Home</h1>
  Saldo: {{ format.toReal(saldo) }} <br />
  Cofre: {{ format.toReal(cofre) }}<br />
  Pagar: {{ format.toReal(pagar) }}<br />
  Receber: {{ format.toReal(receber) }}<br />

  <h3>Entradas</h3>
  <ValuesIndex :values="entradas" />

  <h3>Saídas</h3>
  <ValuesIndex :values="saidas" />
</template>

<script>
import ValuesIndex from "../components/Values/";

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

    const entradas = store.database.values
      .filter((obj) => obj["ES"] === "Entrada")
      .filter(
        (obj) =>
          moment(obj["Atualizado em"]).format("DD/MM/YYYY") ===
          current_date.format("DD/MM/YYYY")
      );

    const saidas = store.database.values
      .filter((obj) => obj["ES"] === "Saída")
      .filter(
        (obj) =>
          moment(obj["Atualizado em"]).format("DD/MM/YYYY") ===
          current_date.format("DD/MM/YYYY")
      );

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

    const pagar = computed(() => {
      return values
        .filter((o) => o["Escola"] === store.escola.nome)
        .filter((o) => o["ES"] === "Saída")
        .filter((o) => o["Pago em"] === "")
        .filter(
          (o) =>
            moment(o["Vencimento"]).format("DD/MM/YYYY") ===
            moment().format("DD/MM/YYYY")
        )
        .reduce((acc, val) => {
          return acc + val["Valor"];
        }, 0);
    });

    const receber = computed(() => {
      return values
        .filter((o) => o["Escola"] === store.escola.nome)
        .filter((o) => o["ES"] === "Entrada")
        .filter((o) => o["Pago em"] === "")
        .filter(
          (o) =>
            moment(o["Vencimento"]).format("DD/MM/YYYY") ===
            moment().format("DD/MM/YYYY")
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
      pagar,
      receber,
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
