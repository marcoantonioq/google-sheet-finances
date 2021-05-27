<template>
  <div class="home">Pagina home</div>
  <h1>Home</h1>
  Saldo: {{ saldo }} <br />
  Cofre: {{ cofre }}<br />
  Pagar: {{ pagar }}<br />
  Receber: {{ receber }}<br />
</template>

<script>
import { inject, computed, reactive } from "vue";

const moment = require("moment");

export default {
  name: "Home",
  components: {},
  setup() {
    const store = inject("store");

    const values = reactive(store.database.values);

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
