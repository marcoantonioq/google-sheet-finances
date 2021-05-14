<template>
  <div class="row">
    <div
      v-on:click="navegation.showhelp = !navegation.showhelp"
      class="icon_help right"
    >
      <i class="material-icons">help_outline</i>
    </div>
  </div>

  <div class="row">
    <h4>{{ value["ES"] }}</h4>
  </div>

  <form ref="form" id="form" name="DB">
    <div class="row">
      <div class="input-field col s12 m6">
        <i class="material-icons prefix">account_circle</i>
        <input
          :disabled="navegation.updating"
          id="Titularidade"
          v-model.trim="value.Titularidade"
          type="text"
          class="validate"
          minlength="6"
          required
          autocomplete="off"
          placeholder="Titular"
        />
        <small v-show="navegation.showhelp" class="help">
          {{ navegation.help.get("Titularidade") }}</small
        >
      </div>

      <div class="input-field col s12 m6">
        <i class="material-icons prefix">keyboard_tab</i>
        <select
          :required="!navegation.updating"
          :disabled="navegation.updating"
          v-model="value['Tipo']"
          name="Tipo"
        >
          <option value="" disabled selected>Tipo de {{ value["ES"] }}</option>
          <option
            v-for="item in getTipos()"
            :key="item['Texto']"
            v-bind:value="item['Texto']"
          >
            {{ item["Texto"] }}
          </option>
        </select>
        <small v-show="navegation.showhelp" class="help">
          {{ navegation.help.get("Tipo") }}</small
        >
      </div>
    </div>

    <div class="row">
      <div class="input-field col s12 m6">
        <i class="material-icons prefix">description</i>
        <input
          id="Discriminação"
          v-model.trim="value.Discriminação"
          type="text"
          class="validate"
          required
          autocomplete="off"
          placeholder="Discriminação"
        />
        <small v-show="navegation.showhelp" class="help">
          {{ navegation.help.get("Discriminação") }}</small
        >
      </div>

      <div class="input-field col s12 m6">
        <i class="material-icons prefix">card_travel</i>
        <select
          required
          v-model="value['Local de movimento']"
          name="local_movimento"
        >
          <option value="" disabled selected>Local de movimento:</option>
          <option
            v-for="item in getLocaisMovimento()"
            :key="item['Texto']"
            v-bind:value="item['Texto']"
          >
            {{ item["Texto"] }}
          </option>
        </select>
        <small v-show="navegation.showhelp" class="help">
          {{ navegation.help.get("Local de movimento") }}</small
        >
      </div>
    </div>

    <div class="row">
      <div class="input-field col s12 m6">
        <i class="material-icons prefix">attach_money</i>
        <input
          id="Valor"
          type="text"
          @blur="checkValor"
          v-model.trim="value.Valor"
          class="pagamento validate"
          pattern="^(-)?\d*(,)?\d{1,2}"
          required
          autocomplete="off"
          placeholder="Valor (R$)"
        />
        <small v-show="navegation.showhelp" class="help">
          {{ navegation.help.get("Valor") }}</small
        >
      </div>

      <div class="input-field col s12 m6">
        <i class="material-icons prefix">card_membership</i>
        <select
          required
          v-model="value['Forma de pagamento']"
          name="Forma de pagamento"
        >
          <option value="" disabled selected>Forma de pagamento</option>
          <option
            v-for="item in getFormaPagamentos()"
            :key="item['Texto']"
            v-bind:value="item['Texto']"
          >
            {{ item["Texto"] }}
          </option>
        </select>
        <small v-show="navegation.showhelp" class="help">
          {{ navegation.help.get("Forma de pagamento") }}</small
        >
      </div>
    </div>

    <div class="row">
      <div class="col s12 m2 input-field botton10">Vencimento:</div>
      <div class="col s12 m10">
        <div class="input-field">
          <i class="material-icons prefix">date_range</i>
          <input
            :disabled="navegation.updating"
            class="validate"
            id="Vencimento"
            v-model="value.Vencimento"
            type="date"
            required
            autocomplete="off"
            placeholder="Vencimento"
          />
          <small v-show="navegation.showhelp" class="help">
            {{ navegation.help.get("Vencimento") }}</small
          >
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col s12 m2 input-field botton10">Pago em:</div>
      <div class="col s12 m10">
        <div class="input-field">
          <i class="material-icons prefix">date_range</i>
          <input
            :disabled="!navegation.updating"
            :required="navegation.updating"
            class="validate"
            id="pago"
            v-model="value['Pago em']"
            type="date"
            autocomplete="off"
          />
          <small v-show="navegation.showhelp" class="help">
            {{ navegation.help.get("Pago em") }}</small
          >
        </div>
      </div>
    </div>

    <div class="row">
      <div class="input-field col s12 m6">
        <span class="prefix">P <sub>x</sub></span>
        <input
          :disabled="navegation.updating"
          :required="!navegation.updating"
          id="Parcelas"
          v-model.trim="value.Parcelas"
          type="number"
          min="1"
          max="12"
          autocomplete="off"
          placeholder="Parcela(s): "
        />
        <small v-show="navegation.showhelp" class="help">
          {{ navegation.help.get("Parcelas") }}</small
        >
      </div>

      <div class="input-field col s12 m6">
        <i class="material-icons prefix">group</i>
        <input
          class="Observações"
          id="Observações"
          v-model.trim="value['Observações']"
          type="text"
          autocomplete="off"
          placeholder="Observações"
        />
        <small v-show="navegation.showhelp" class="help">
          {{ navegation.help.get("") }}</small
        >
      </div>
    </div>

    <div class="margin2 row">
      {{ info_user }}
    </div>

    <div class="row">
      <div class="col s12 m6">
        <a class="btn red" v-on:click="$router.go(-1)">
          <i class="material-icons left"> arrow_back </i>
          Voltar
        </a>
      </div>
      <div class="col s12 m6">
        <button
          v-on:click.prevent.stop="salvar"
          class="col s12 btn green"
          type="submit"
          id="salvar"
        >
          Salvar
          <i class="material-icons right">save</i>
        </button>
      </div>
    </div>
  </form>

  <Parcelas v-if="parcelas.length > 0" :parcelas="parcelas" />

  <ValuesIndex v-if="paginate.length > 0" :values="paginate" />
</template>

<script>
import ValuesIndex from "./index.vue";
import Parcelas from "./parcelas.vue";
import Helps from "../../store/helps";
import Values from "../../store/values";

import { money } from "../../helpers/utility";
const moment = require("moment");

import { inject, reactive, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "Save",
  components: {
    ValuesIndex,
    Parcelas,
  },
  props: {
    es_pass: String,
    id_pass: String,
  },
  setup() {
    const store = inject("store");
    const route = useRoute();

    const search = ref("");
    var value = reactive(Values);
    const parcelas = reactive([]);
    const navegation = reactive({
      updating: false,
      showhelp: false,
      help: Helps,
    });

    navegation.help.tipo = "Entrada";
    if (route.params.id_pass) {
      navegation.updating = true;
      value = store.getters.getValue(route.params.id_pass);
    } else {
      value["ES"] = route.params.es_pass == "Entrada" ? "Entrada" : "Saída";
      console.log("Criar dado!");
    }

    value["Escola"] = store.state.current_escola;

    value["Vencimento"] = moment(value["Vencimento"] || new Date()).format(
      "YYYY-MM-DD"
    );

    return {
      navegation,
      parcelas,
      search,
      store,
      value,
      moment,
    };
  },
  methods: {
    async setValue(val) {
      this.value = val;
    },
    salvar() {
      if (this.$refs.form.checkValidity()) {
        this.updateParcelas();
        this.store.methods.saveValues(this.parcelas);
      } else {
        this.emitter.emit("msg", "Verifique todos valores!");
      }
    },
    getDataSetsOnFilter(filters = []) {
      try {
        if (this.store.state.ds) {
          let values = [];
          filters.forEach((filter) => {
            values = this.store.state.ds.filter(filter);
          });
          return values;
        } else {
          throw "Não há DataSets";
        }
      } catch (e) {
        this.emitter.emit("msg", "Erro ao carregar DataSets!");
        return [];
      }
    },
    getTipos() {
      return this.getDataSetsOnFilter([
        (el) => String(el["Escola"]).includes(this.value["Escola"]),
        (el) => String(el["Campo"]).includes("Tipo"),
      ]);
    },
    getLocaisMovimento() {
      return this.getDataSetsOnFilter([
        (el) => String(el["Escola"]).includes(this.value["Escola"]),
        (el) => String(el["Campo"]).includes("Local de movimento"),
      ]);
    },
    getFormaPagamentos() {
      return this.getDataSetsOnFilter([
        (el) => String(el["Escola"]).includes(this.value["Escola"]),
        (el) => String(el["Campo"]).includes("Forma de Pagamento"),
      ]);
    },
    updateParcelas() {
      this.value["Escola"] = this.store.state.current_escola;
      let countParcelas = Number(this.value["Parcelas"]);
      let parcelas = [];
      if (countParcelas) {
        console.log("Numero de parcelas:", parcelas);
        for (let i = 0; i < countParcelas; i++) {
          let obj = Object.assign({}, this.value);
          obj["Pago em"] = "";
          obj["Vencimento"] = this.moment(obj["Vencimento"]).add(i, "months");
          obj["Outras Observações"] = `Parcela ${i + 1}/${countParcelas}`;
          parcelas.push(obj);
        }
        parcelas[0]["Pago em"] = this.value["Pago em"];
        this.parcelas = parcelas;
      }
    },
  },
  watch: {
    "value.Valor": function () {
      this.updateParcelas();
    },
    "value.Vencimento": function (val) {
      let current_data = this.moment().format("YYYY-MM-DD");
      this.value["Pago em"] = this.moment(val).isSame(current_data)
        ? this.moment().format("YYYY-MM-DD")
        : "";
      this.updateParcelas();
    },
    "value.Parcelas": function (val) {
      console.log("Parcelas:", val);
      this.updateParcelas();
    },
  },
  computed: {
    paginate: function () {
      if (this.search == "") {
        return [];
      } else {
        return this.store.getters.find({ ES: this.Tipo });
      }
    },
    info_user: function () {
      if (!this.value["Valor"]) return "";
      let isPay = this.value["ES"] == "Saída" ? true : false;

      const replaces = {
        "{es}": isPay ? "Pagando" : "Recebendo",
        "{tipo_pagamento}": this.value["Tipo"].toLowerCase() || "...tipo...",
        "{escola}": this.store.state.current_escola || "...Escola...",
        "{valor}": money.toReal(this.value["Valor"]),
        "{local_movimento}":
          this.value["Local de movimento"] || "...local movimento...",
        "{forma_pagamento}":
          this.value["Forma de pagamento"] || "...forma pagamento...",
        "{titular}": this.value["Titularidade"] || "...titular...",
      };
      let template = isPay
        ? "{es} {tipo_pagamento} no valor de {valor} para {titular} com {forma_pagamento} / {local_movimento} / {escola}."
        : "{es} {tipo_pagamento} {valor} de {titular} com {forma_pagamento} para {local_movimento} / {escola}.";

      return Object.entries(replaces).reduce((acc, [k, v]) => {
        return acc.replaceAll(k, v);
      }, template);
    },
  },
  created() {
    console.log("created");
  },
};
</script>

<style lang="scss" scoped>
#form {
  max-width: 1000px;
  margin: 0 auto;
}
.help {
  color: var(--red);
  font-size: 1rem;
}

.botton10 {
  bottom: -10px;
}

.margin2 {
  margin-top: 2rem;
  margin-bottom: 2.5rem;
  font-weight: 600;
}

.icon_help {
  cursor: pointer;
  user-select: none;
}
sub {
  position: relative;
  right: 13px;
  top: 3px;
  font-size: 1.2rem;
}
</style>
