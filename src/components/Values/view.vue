<template>
  <div class="row">
    <dl>
      <dt>Titular:</dt>
      <dd>{{ value["Titularidade"] }}</dd>

      <dt>Escola:</dt>
      <dd>{{ value["Escola"] }}</dd>

      <dt>Tipo:</dt>
      <dd>{{ value["Tipo"] }}</dd>

      <dt>Discriminação:</dt>
      <dd>{{ value["Discriminação"] }}</dd>

      <dt>Local do movimento:</dt>
      <dd>{{ value["Local do movimento"] }}</dd>

      <dt>Valor:</dt>
      <dd :class="[value['Valor'] > 0 ? 'green-text' : 'red-text']">
        R$ {{ Math.abs(value["Valor"]) }}
      </dd>

      <dt>Forma de pagamento:</dt>
      <dd>{{ value["Forma de pagamento"] }}</dd>

      <dt>Data/Vencimento:</dt>
      <dd>{{ value["Data/Vencimento"] }}</dd>

      <dt>Parcelas:</dt>
      <dd>{{ value["Parcelas"] }}</dd>

      <dt>Observações:</dt>
      <dd>
        {{ value["Observações"] }} <br />
        {{ value["Outras Observações"] }}
      </dd>

      <dt v-if="value['Titular Cheque']">Titular Cheque:</dt>
      <dd>{{ value["Titular Cheque"] }}</dd>

      <dt v-if="value['Conta Cheque']">Conta Cheque:</dt>
      <dd>{{ value["Conta Cheque"] }}</dd>

      <dt v-if="value['Titular Cheque']">Agência Cheque:</dt>
      <dd>{{ value["Agência Cheque"] }}</dd>

      <dt v-if="value['Titular Cheque']">Nº Cheque</dt>
      <dd>{{ value["Nº Cheque"] }}</dd>
    </dl>
  </div>

  <div class="row">
    <a class="btn red" v-on:click="$router.go(-1)">
      <i class="material-icons left"> arrow_back </i>
      Voltar
    </a>
  </div>

  <div class="row">
    <ValuesIndex v-on:view="upView" :values="similarBills" />
  </div>
</template>

<script>
import ValuesIndex from "./index";

import { inject } from "vue";

export default {
  name: "View",
  components: {
    ValuesIndex,
  },
  props: {
    es_pass: String,
    id_pass: String,
  },
  data() {
    return {
      value: [],
    };
  },
  setup() {
    const store = inject("store");

    return {
      store,
    };
  },
  computed: {
    similarBills() {
      return this.store.state.values.filter(
        (el) => el["Titularidade"] == this.value["Titularidade"]
      );
    },
  },
  methods: {
    upView(id) {
      this.value = this.store.getters.getValue(id);
    },
  },
  mounted() {
    console.log("Moutend");
    this.upView(this.id_pass);
  },
};
</script>

<style lang="scss" scoped>
/*DL, DT, DD TAGS LIST DATA*/
dl {
  margin-bottom: 50px;
}

dl dt {
  float: left;
  font-weight: bold;
  margin-right: 10px;
  padding: 5px;
  min-width: 135px;
}

dl dd {
  margin: 2px 0;
  padding: 5px 0;
}
</style>
