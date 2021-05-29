<template>
  <div class="row">
    <div class="col s12 m6">
      <div class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            Saldo caixa
            <p>{{ format.toReal(saldo) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col s12 m6">
      <div class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            Saldo cofre
            <p>{{ format.toReal(cofre) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col s12 m6">
      <div class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            Saída do dia
            <p class="red-text">{{ format.toReal(pago) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col s12 m6">
      <div class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            Entrada do dia
            <p>{{ format.toReal(recebido) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="double-margin-top" v-if="entradas.length > 0">
    <h5>Entradas</h5>
    <ValuesIndex :values="entradas" />
  </div>

  <div class="double-margin-top" v-if="saidas.length > 0">
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

    const db = reactive(store.database);

    const current_date = moment();

    const entradas = computed(() => {
      return db.values
        .filter((o) => o["Escola"] === store.escola.nome)
        .filter((obj) => obj["ES"] === "Entrada")
        .filter(
          (obj) =>
            moment(obj["Atualizado em"]).format("DD/MM/YYYY") ===
            current_date.format("DD/MM/YYYY")
        );
    });

    const saidas = computed(() => {
      return db.values
        .filter((o) => o["Escola"] === store.escola.nome)
        .filter((obj) => obj["ES"] === "Saída")
        .filter(
          (obj) =>
            moment(obj["Atualizado em"]).format("DD/MM/YYYY") ===
            current_date.format("DD/MM/YYYY")
        );
    });

    const saldo = computed(() => {
      return db.values
        .filter((o) => o["Escola"] === store.escola.nome)
        .filter((obj) => obj["Pago em"] !== "")
        .reduce((acc, val) => {
          return acc + parseFloat(val["Valor"]);
        }, 0);
    });

    const cofre = computed(() => {
      return db.values
        .filter((o) => o["Escola"] === store.escola.nome)
        .filter((o) => o["Local do movimento"] === "Cofre")
        .filter((obj) => obj["Pago em"] !== "")
        .reduce((acc, val) => {
          return acc + parseFloat(val["Valor"]);
        }, 0);
    });

    const pago = computed(() => {
      return db.values
        .filter((o) => o["Escola"] === store.escola.nome)
        .filter((o) => o["ES"] === "Saída")
        .filter((o) => o["Pago em"] !== "")
        .filter(
          (o) =>
            moment(o["Pago em"]).format("DD/MM/YYYY") ===
            current_date.format("DD/MM/YYYY")
        )
        .reduce((acc, val) => {
          return acc + parseFloat(val["Valor"]);
        }, 0);
    });

    const recebido = computed(() => {
      return db.values
        .filter((o) => o["Escola"] === store.escola.nome)
        .filter((o) => o["ES"] === "Entrada")
        .filter((o) => o["Pago em"] !== "")
        .filter(
          (o) =>
            moment(o["Pago em"]).format("DD/MM/YYYY") ===
            current_date.format("DD/MM/YYYY")
        )
        .reduce((acc, val) => {
          return acc + parseFloat(String(val["Valor"]).replace(",", "."));
        }, 0);
    });

    return {
      store,
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
.card-content {
  color: var(--blue);
  font-size: 1.2rem;
  font-weight: 400;
  p {
    font-size: 1.4rem;
    color: var(--green);
  }
}
.double-margin-top {
  margin-top: 3rem;
}
</style>
