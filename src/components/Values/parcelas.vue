<template>
  {{ total }} em {{ parcelas.length }}x de
  {{ valorParcelas }}
  <div class="row">
    <table>
      <thead>
        <tr>
          <th>Data de vencimento</th>
          <th>Valor</th>
          <th>Pago em</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="parcela in parcelas" :key="parcela">
          <td>{{ moment(parcela["Vencimento"]).format("DD/MM") }}</td>
          <td>{{ parcela["Valor"] }}</td>
          <td>
            {{
              parcela["Pago em"]
                ? moment(parcela["Pago em"]).format("DD/MM")
                : ""
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="row">
    {{ parcelas }}
  </div>
</template>

<script>
export default {
  name: "View",
  props: {
    parcelas: Array,
  },
  computed: {
    total: function () {
      if (this.parcelas) {
        return this.toReal(
          this.parcelas.reduce((acc, obj) => acc + Number(obj["Valor"]), 0)
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
    toReal(val) {
      return Number(val).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  mounted() {
    console.log("Parcelas recebidas: ", this.parcelas);
  },
};
</script>
