<template>
  <div class="row"></div>
  <div class="row parcelas">
    <b> {{ total }} em {{ parcelas.length }}x de {{ valorParcelas }}</b>
    <table>
      <thead>
        <tr>
          <th>Vencimento</th>
          <th>Valor</th>
          <th>Pago em</th>
          <th>Parcelas</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="parcela in parcelas" :key="parcela">
          <td>
            {{ parcela["Vencimento"] }}
          </td>
          <td>{{ toReal(parcela["Valor"]) }}</td>
          <td>
            {{
              parcela["Pago em"]
                ? moment(parcela["Pago em"]).format("DD/MM")
                : ""
            }}
          </td>
          <td>{{ parcela["Outras Observações"] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { format } from "../../helpers/utility";
const moment = require("moment");

export default {
  name: "View",
  props: {
    parcelas: Array,
  },
  setup() {
    return {
      moment,
    };
  },
  computed: {
    total: function () {
      if (this.parcelas) {
        return this.toReal(
          this.parcelas.reduce(
            (acc, obj) => acc + this.toNumber(obj["Valor"]),
            0
          )
        );
      } else {
        return 0;
      }
    },
    valorParcelas: function () {
      if (this.parcelas[0]) {
        return this.toReal(this.parcelas[0]["Valor"]);
      } else {
        return 0;
      }
    },
  },
  methods: {
    toNumber: format.toNumber,
    toReal: format.toReal,
  },
};
</script>

<style lang="scss" scoped>
.parcelas {
  max-width: 70%;
}
@media (max-width: 600px) {
  .parcelas {
    max-width: 90%;
  }
}
</style>
