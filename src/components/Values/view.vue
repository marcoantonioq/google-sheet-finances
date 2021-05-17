<template>
  <div class="row">
    <dl>
      <dt>ID:</dt>
      <dd>{{ values[index]["ID"] }}&nbsp;</dd>

      <dt>Titular:</dt>
      <dd>{{ values[index]["Titularidade"] }}&nbsp;</dd>

      <dt>Escola:</dt>
      <dd>{{ values[index]["Escola"] }}&nbsp;</dd>

      <dt>Tipo:</dt>
      <dd>{{ values[index]["Tipo"] }}&nbsp;</dd>

      <dt>Discriminação:</dt>
      <dd>
        {{ values[index]["Discriminação"] }}
        {{ values[index]["Outras Observações"] }}&nbsp;
      </dd>

      <dt>Local do movimento:</dt>
      <dd>{{ values[index]["Local do movimento"] }}&nbsp;</dd>

      <dt>Valor:</dt>
      <dd :class="[values[index]['Valor'] > 0 ? 'green-text' : 'red-text']">
        R$ {{ Math.abs(values[index]["Valor"]) }} &nbsp;
      </dd>

      <dt>Forma de pagamento:</dt>
      <dd>{{ values[index]["Forma de pagamento"] }}&nbsp;</dd>

      <dt>Data/Vencimento:</dt>
      <dd>
        {{ moment(values[index]["Vencimento"]).format("DD/MM/YYYY") }}&nbsp;
      </dd>

      <dt>Parcelas:</dt>
      <dd>{{ values[index]["Parcelas"] }}&nbsp;</dd>

      <dt>Observações:</dt>
      <dd>
        {{ values[index]["Observações"] }}
        &nbsp;
      </dd>
    </dl>
    <dl v-if="values[index]['Titular Cheque']">
      <dt v-if="values[index]['Titular Cheque']">Titular Cheque:</dt>
      <dd>{{ values[index]["Titular Cheque"] }}&nbsp;</dd>

      <dt v-if="values[index]['Conta Cheque']">Conta Cheque:</dt>
      <dd>{{ values[index]["Conta Cheque"] }}&nbsp;</dd>

      <dt v-if="values[index]['Agência Cheque']">Agência Cheque:</dt>
      <dd>{{ values[index]["Agência Cheque"] }}&nbsp;</dd>

      <dt v-if="values[index]['Nº Cheque']">Nº Cheque</dt>
      <dd>{{ values[index]["Nº Cheque"] }}&nbsp;</dd>
    </dl>
  </div>

  <div class="row">
    <a class="btn red" v-on:click="back">
      <i class="material-icons left"> arrow_back </i>
      Voltar
    </a>
  </div>

  <div class="row">
    <ValuesIndex v-on:view="upView" :values="similarBills(values[index])" />
  </div>
</template>

<script>
import ValuesIndex from "./index";
import { inject, reactive, ref } from "vue";
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
    const route = reactive(useRoute());

    const index = ref(+route.params.id_pass);
    const values = reactive(store.database.values);

    function similarBills(obj) {
      return values
        .filter((el) => el["Titularidade"] == obj["Titularidade"])
        .filter((el) => el["ID"] != obj["ID"]);
    }

    function upView(id) {
      // index.value = values.findIndex((el) => el["ID"] == route.params.id_pass);
      index.value = values.findIndex((el) => el["ID"] == id);
      console.log("upView ID:", id, "Route: ", route.params.id_pass);
    }
    upView(index.value);

    function back() {}

    return {
      values,
      moment,
      upView,
      index,
      back,
      similarBills,
    };
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
