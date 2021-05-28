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
      <dd>
        {{ value["Discriminação"] }}
        {{ value["Outras Observações"] }}&nbsp;
      </dd>

      <dt>Local do movimento:</dt>
      <dd>{{ value["Local do movimento"] }}&nbsp;</dd>

      <dt>Valor:</dt>
      <dd :class="[value['Valor'] > 0 ? 'green-text' : 'red-text']">
        {{ format.toReal(Math.abs(value["Valor"])) }} &nbsp;
      </dd>

      <dt>Forma de pagamento:</dt>
      <dd>{{ value["Forma de pagamento"] }}&nbsp;</dd>

      <dt>Data/Vencimento:</dt>
      <dd>{{ moment(value["Vencimento"]).format("DD/MM/YYYY") }}&nbsp;</dd>

      <dt>Pago em:</dt>
      <dd>
        {{
          value["Pago em"]
            ? moment(value["Pago em"]).format("DD/MM/YYYY HH:MM")
            : "Não pago"
        }}&nbsp;
      </dd>

      <dt>Parcelas:</dt>
      <dd>{{ value["Parcelas"] }}&nbsp;</dd>

      <dt>Observações:</dt>
      <dd>
        {{ value["Observações"] }}
        &nbsp;
      </dd>
    </dl>
    <dl v-if="value['Titular Cheque']">
      <dt v-if="value['Titular Cheque']">Titular Cheque:</dt>
      <dd>{{ value["Titular Cheque"] }}&nbsp;</dd>

      <dt v-if="value['Conta Cheque']">Conta Cheque:</dt>
      <dd>{{ value["Conta Cheque"] }}&nbsp;</dd>

      <dt v-if="value['Agência Cheque']">Agência Cheque:</dt>
      <dd>{{ value["Agência Cheque"] }}&nbsp;</dd>

      <dt v-if="value['Nº Cheque']">Nº Cheque</dt>
      <dd>{{ value["Nº Cheque"] }}&nbsp;</dd>
    </dl>
  </div>

  <div class="row">
    <a style="margin-top: 5px" class="col s12 m4 btn red" v-on:click="back">
      <i class="material-icons left"> arrow_back </i>
      Voltar
    </a>
    <a
      style="margin-top: 5px"
      class="col s12 m4 btn blue"
      v-on:click="edit(value['ID'])"
    >
      <i class="material-icons left"> edit </i>
      Editar
    </a>
    <a
      style="margin-top: 5px"
      class="col s12 m4 btn green"
      v-on:click="pay(value['ID'])"
    >
      <i class="material-icons left"> payment </i>
      Pagar
    </a>
  </div>

  <div class="row">
    <ValuesIndex v-on:view="upView" :values="similarBills" />
  </div>
</template>

<script>
import ValuesIndex from "./index";
import { inject, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const moment = require("moment");
import { format } from "../../helpers/utility";

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
    const router = useRouter();
    const route = useRoute();

    const value = reactive({});
    const values = reactive(store.database.values);

    const similarBills = reactive([]);

    function upView(id) {
      console.log("upView ID:", id, "Route: ", route.params.id_pass);
      Object.assign(value, store.database.getValue(id));

      let similar = values
        .filter((el) => el["Titularidade"] == value["Titularidade"])
        .filter((el) => el["ID"] != value["ID"]);
      Object.assign(similarBills, similar);
    }

    function back() {
      router.go(-1);
    }
    function edit(id) {
      router.push({ name: "Edit", params: { id_pass: id } });
    }
    function pay(id) {
      router.push({ name: "Update", params: { id_pass: id } });
    }

    onMounted(() => {
      upView(route.params.id_pass);
    });

    return {
      value,
      moment,
      upView,
      back,
      similarBills,
      format,
      edit,
      pay,
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
