<template>
  <img
    v-if="!value['Escola']"
    class="arrow_escola"
    src="https://www.seekpng.com/png/full/240-2401269_youtube-arrow-png-red-arrow-youtube-png.png"
  />

  <div class="row">
    <div v-on:click="showhelp = !showhelp" class="icon_help right">
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
          :disabled="updating"
          id="Titularidade"
          v-model.trim="value.Titularidade"
          type="text"
          class="validate"
          minlength="6"
          required
          autocomplete="off"
          placeholder="Titular"
        />
        <small v-show="showhelp" class="help">
          {{ getHelp("Titularidade") }}</small
        >
      </div>

      <div class="input-field col s12 m6">
        <i class="material-icons prefix">keyboard_tab</i>
        <select
          :required="!updating"
          :disabled="updating"
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
        <small v-show="showhelp" class="help"> {{ getHelp("Tipo") }}</small>
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
        <small v-show="showhelp" class="help">
          {{ getHelp("Discriminação") }}</small
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
        <small v-show="showhelp" class="help">
          {{ getHelp("Local de movimento") }}</small
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
        <small v-show="showhelp" class="help"> {{ getHelp("Valor") }}</small>
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
        <small v-show="showhelp" class="help">
          {{ getHelp("Forma de pagamento") }}</small
        >
      </div>
    </div>

    <div class="row">
      <div class="col s12 m2 input-field botton10">Vencimento:</div>
      <div class="col s12 m10">
        <div class="input-field">
          <i class="material-icons prefix">date_range</i>
          <input
            :disabled="updating"
            class="validate"
            id="Vencimento"
            v-model="value.Vencimento"
            type="date"
            required
            autocomplete="off"
            placeholder="Vencimento"
          />
          <small v-show="showhelp" class="help">
            {{ getHelp("Vencimento") }}</small
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
            :disabled="!updating"
            :required="updating"
            class="validate"
            id="pago"
            v-model="value['Pago em']"
            type="date"
            autocomplete="off"
          />
          <small v-show="showhelp" class="help">
            {{ getHelp("Pago em") }}</small
          >
        </div>
      </div>
    </div>

    <div class="row">
      <div class="input-field col s12 m6">
        <span class="prefix">P <sub>x</sub></span>
        <input
          :disabled="updating"
          :required="!updating"
          id="Parcelas"
          v-model.trim="value.Parcelas"
          type="number"
          min="1"
          max="12"
          autocomplete="off"
          placeholder="Parcela(s): "
        />
        <small v-show="showhelp" class="help"> {{ getHelp("Parcelas") }}</small>
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
        <small v-show="showhelp" class="help"> {{ getHelp("") }}</small>
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
</template>

<script>
import Helps from "../../store/helps";

import { money } from "../../helpers/utility";

import { inject } from "vue";

export default {
  name: "Save",
  props: {
    es_pass: String,
    id_pass: String,
  },
  setup() {
    const store = inject("store");
    return {
      store,
    };
  },
  data() {
    return {
      showhelp: false,
      search: "",
      updating: false,
      message: [],
      value: {
        ID: "",
        "Criado em": "",
        ES: "",
        Escola: "",
        Titularidade: "",
        Tipo: "",
        Discriminação: "",
        "Local do movimento": "",
        Valor: "",
        "Forma de pagamento": "",
        Vencimento: "",
        Parcelas: 1,
        Observações: "",
        "Pago em": "",
        "Atualizado em": "",
        "Outras Observações": "",
        "Titular Cheque": "",
        "Conta Cheque": "",
        "Agência Cheque": "",
        "Nº Cheque": "",
      },
      help: Helps,
      parcelas: [],
    };
  },
  methods: {
    getHelp(title) {
      try {
        return this.help[this.value["ES"]][title];
      } catch (error) {
        error;
      }
    },
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
    if (this.id_pass) {
      this.updating = true;
      this.setValue(this.store.getters.getValue(this.id_pass));
      console.log("Atualizar valores...");
      console.log(this.value);
    } else {
      this.value["ES"] = this.es_pass == "Entrada" ? "Entrada" : "Saída";
      console.log("Criar dado!");
    }

    this.value["Escola"] = this.store.state.current_escola;

    this.value["Vencimento"] = this.moment(
      this.value["Vencimento"] || new Date()
    ).format("YYYY-MM-DD");
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

@keyframes shake {
  0% {
    transform: scaleY(-1) scaleX(-1) translate(1px, 1px) rotate(22deg);
  }
  50% {
    transform: scaleY(-1) scaleX(-1) translate(-1px, 2px) rotate(21deg);
  }
  100% {
    transform: scaleY(-1) scaleX(-1) translate(1px, 1px) rotate(22deg);
  }
}

img.arrow_escola {
  position: fixed;
  top: 20px;
  right: 81px;
  width: 20%;
  transform: scaleY(-1) scaleX(-1) rotate(22deg);
  animation: shake 0.5s;
  animation-iteration-count: infinite;
  z-index: -1;
}
</style>
