<template>
  <div class="row">
    <div v-on:click="showhelp = !showhelp" class="icon_help right">
      <i class="material-icons">help_outline</i>
    </div>
  </div>

  <div v-if="value['ES'] && value['Local do movimento']" class="row">
    {{ value["ES"] == Saída ? "Pagando" : "Recebendo" }}, o valor de R$
    {{ value["Valor"] }} {{ value["Local do movimento"] }} /
    {{ store.state.current_escola }}
  </div>
  <form id="form" name="Banco de Dados">
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
        <select v-model="value['Tipo']" name="Tipo">
          <option value="" disabled selected>Tipo</option>
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

      <ul>
        <li v-for="tip in getTipos()" :key="tip">
          {{ tip }}
        </li>
      </ul>
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
        <select v-model="value['Local de movimento']" name="local_movimento">
          <option value="" disabled selected>Caixa da escola</option>
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
        <select v-model="value['Forma de pagamento']" name="Forma de pagamento">
          <option value="" disabled selected>Dinheiro</option>
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
          id="Parcelas"
          v-model.trim="value.Parcelas"
          type="number"
          min="1"
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
        />
        <label for="Observações"
          >Observações
          <small v-show="showhelp" class="help">
            {{ getHelp("") }}</small
          ></label
        >
      </div>
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

  <ValuesIndex v-if="paginate.length > 0" :values="paginate" />
</template>

<script>
import ValuesIndex from "./index.vue";

import { inject } from "vue";

export default {
  components: {
    ValuesIndex,
  },
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
        Parcelas: "",
        Observações: "",
        "Pago em": "",
        "Atualizado em": "",
        "Outras Observações": "",
        "Titular Cheque": "",
        "Conta Cheque": "",
        "Agência Cheque": "",
        "Nº Cheque": "",
      },
      help: {
        Entrada: {
          Escola: "Selecione a escola onde o dinheiro está entrando",
          Titularidade: "Nome do aluno/cliente que está pagando",
          Tipo: "Selecione o tipo de entrada",
          Discriminação: "Detalhamento do tipo de entrada",
          ["Local de movimento"]: "Selecione o local que o valor está entrando",
          Valor: "Digite o valor que está entrando",
          "Forma de pagamento": "Selecione a forma de pagamento",
          Parcelas: "Quantidade de parcelas",
          Observações:
            "Informação relevante para lembrar sobre esse recebimento",
        },
        Saída: {
          Escola: "Selecione a escola onde o dinheiro está saindo",
          Titularidade: "Nome da empresa/pessoa que está recebendo",
          Tipo: "Selecione o tipo de saída",
          Discriminação: "Detalhamento do tipo de saída",
          ["Local de movimento"]: "Selecione o local onde o valor está saindo",
          Valor: "Digite o valor que está saindo",
          "Forma de pagamento": "Selecione a forma de pagamento",
          Parcelas: "Quantidade de parcelas",
          Observações: "Informação relevante para lembrar sobre esse pagamento",
        },
      },
    };
  },
  methods: {
    getHelp(title) {
      try {
        return this.help[this.es_pass][title];
      } catch (error) {
        error;
      }
    },
    salvar() {
      console.log("Valvar:", this.value);
    },
    getTipos() {
      let values = this.store.state.ds.filter((el) => {
        return (
          this.value["Escola"] == el["Escola"] ||
          this.value["Escola"] == el["Todas"] ||
          (el["Campo"] == "Tipo" &&
            (el["Campo"] == this.es_pass || el["Campo"] == "Entrada/Saída"))
        );
      });
      return values;
    },
  },
  watch: {
    "value.Escola": function (el) {
      console.log("Alterado valor de escola: ", el);
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
  },
  mounted() {
    if (this.id_pass) {
      this.updating = true;
      this.value = this.store.getters.getValue(this.id_pass);
      console.log("Atualizar valores...");
    } else {
      this.value["ES"] = this.es_pass;
    }
    this.value["Escola"] = this.store.state.current_escola;
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
