<template>
  <div class="row">Visualizar: {{ id_pass }}</div>

  <div class="row">
    {{ value }}
  </div>

  <a class="btn red" v-on:click="$router.go(-1)">
    <i class="material-icons left"> arrow_back </i>
    Voltar
  </a>

  <div class="row">
    <h5>Outros boletos...</h5>
    {{ store.getters.similarBills("José Carlos Filho") }}
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "View",
  props: {
    es_pass: String,
    id_pass: String,
  },
  data() {
    return {
      value: this.store.getters.getValue(this.id_pass),
    };
  },
  setup() {
    const store = inject("store");

    return {
      store,
    };
  },
  computed: {
    boletosSimilares: function () {
      return this.store.getters.similarBills(this.value["Titularidade"]);
    },
  },
};
</script>
