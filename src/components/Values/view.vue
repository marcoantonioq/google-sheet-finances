<template>
  <div class="row">
    <dl>
      <dt>Titular:</dt>
      <dd>{{ value["Titularidade"] }}&nbsp;</dd>

      <dt>Escola:</dt>
      <dd>{{ value["Escola"] }}&nbsp;</dd>

      <dt>Tipo:</dt>
      <dd>{{ value["Tipo"] }}&nbsp;</dd>

      <dt>Discriminação:</dt>
      <dd>{{ value["Discriminação"] }}&nbsp;</dd>

      <dt>Local do movimento:</dt>
      <dd>{{ value["Local do movimento"] }}&nbsp;</dd>

      <dt>Valor:</dt>
      <dd :class="[value['Valor'] > 0 ? 'green-text' : 'red-text']">
        R$ {{ Math.abs(value["Valor"]) }} &nbsp;
      </dd>

      <dt>Forma de pagamento:</dt>
      <dd>{{ value["Forma de pagamento"] }}&nbsp;</dd>

      <dt>Data/Vencimento:</dt>
      <dd>{{ moment(value["Vencimento"]).format("DD/MM/YYYY") }}&nbsp;</dd>

      <dt>Parcelas:</dt>
      <dd>{{ value["Parcelas"] }}&nbsp;</dd>

      <dt>Observações:</dt>
      <dd>
        {{ value["Observações"] }} <br />
        {{ value["Outras Observações"] }}
        &nbsp;
      </dd>

      <dt v-if="value['Titular Cheque']">Titular Cheque:</dt>
      <dd>{{ value["Titular Cheque"] }}&nbsp;</dd>

      <dt v-if="value['Conta Cheque']">Conta Cheque:</dt>
      <dd>{{ value["Conta Cheque"] }}&nbsp;</dd>

      <dt v-if="value['Titular Cheque']">Agência Cheque:</dt>
      <dd>{{ value["Agência Cheque"] }}&nbsp;</dd>

      <dt v-if="value['Titular Cheque']">Nº Cheque</dt>
      <dd>{{ value["Nº Cheque"] }}&nbsp;</dd>
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

import { inject, ref } from "vue";
import { useRoute } from "vue-router";
const moment = require("moment");

export default {
  name: "View",
  components: {
    ValuesIndex,
  },
  props: {
    es_pass: String,
    id_pass: String,
  },
  setup() {
    const store = inject("store");
    const route = useRoute();

    var value = ref([]);
    value = store.getters.getValue(route.params.id_pass);

    return {
      value,
      store,
      moment,
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
