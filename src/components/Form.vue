<template>
  <div class="row">
    <div v-on:click="showhelp = !showhelp" class="icon_help right">
      <i class="material-icons">help_outline</i>
    </div>
  </div>
  <form id="form" name="Banco de Dados">
    <div class="row">
      <div class="input-field col s12 m6">
        <i class="material-icons prefix">account_balance</i>
        <select v-model="value.escola" name="escola">
          <option value="" disabled selected>Escola</option>
          <option value="Cidade de Goiás">Cidade de Goías</option>
          <option value="Itaberaí">Itaberaí</option>
          <option value="Jussara">Jussara</option>
        </select>
        <small v-show="showhelp" class="help"> {{ getHelp("escola") }}</small>
      </div>

      <div class="input-field col s12 m6">
        <i class="material-icons prefix">keyboard_tab</i>
        <select v-model="value.tipo" name="tipo">
          <option value="" disabled selected>tipo</option>
        </select>
        <small v-show="showhelp" class="help"> {{ getHelp("tipo") }}</small>
      </div>
    </div>

    <div class="row">
      <div class="input-field col s12 m6">
        <i class="material-icons prefix">description</i>
        <input
          id="disc"
          v-model="value.disc"
          type="text"
          class="validate"
          required
          autocomplete="off"
          placeholder="Discriminação"
        />
        <small v-show="showhelp" class="help"> {{ getHelp("disc") }}</small>
      </div>

      <div class="input-field col s12 m6">
        <i class="material-icons prefix">card_travel</i>
        <select v-model="value.local_movimento" name="local_movimento">
          <option value="" disabled selected>Caixa da escola</option>
        </select>
        <small v-show="showhelp" class="help">
          {{ getHelp("local_movimento") }}</small
        >
      </div>
    </div>

    <div class="row">
      <div class="input-field col s12 m6">
        <i class="material-icons prefix">attach_money</i>
        <input
          id="valor"
          type="text"
          @blur="checkValor"
          v-model="value.valor"
          class="pagamento validate"
          pattern="^(-)?\d*(,)?\d{1,2}"
          required
          autocomplete="off"
          placeholder="Valor (R$)"
        />
        <small v-show="showhelp" class="help"> {{ getHelp("valor") }}</small>
      </div>

      <div class="input-field col s12 m6">
        <i class="material-icons prefix">card_membership</i>
        <select v-model="value.forma_pagamento" name="forma_pagamento">
          <option value="" disabled selected>Dinheiro</option>
        </select>
        <small v-show="showhelp" class="help">
          {{ getHelp("forma_pagamento") }}</small
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
            id="vencimento"
            v-model="value.vencimento"
            type="date"
            required
            autocomplete="off"
            placeholder="Vencimento"
          />
          <small v-show="showhelp" class="help">
            {{ getHelp("vencimento") }}</small
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
            v-model="value.Pago_em"
            type="date"
            autocomplete="off"
          />
          <small v-show="showhelp" class="help">
            {{ getHelp("Pago_em") }}</small
          >
        </div>
      </div>
    </div>

    <div class="row">
      <div class="input-field col s12 m6">
        <i class="material-icons prefix">add</i>
        <input
          :disabled="updating"
          id="parcelas"
          v-model="value.parcelas"
          type="number"
          min="1"
          autocomplete="off"
        />
        <label for="parcelas">Parcela(s): </label>
        <small v-show="showhelp" class="help"> {{ getHelp("Parcelas") }}</small>
      </div>

      <div class="input-field col s12 m6">
        <i class="material-icons prefix">group</i>
        <input
          class="obs"
          id="obs"
          v-model="value.obs"
          type="text"
          autocomplete="off"
        />
        <label for="obs"
          >Observações
          <small v-show="showhelp" class="help">
            {{ getHelp("") }}</small
          ></label
        >
      </div>
    </div>

    <div class="row">
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

  <ShowValues v-if="paginate.length > 0" :values="paginate" />
</template>

<script>
import ShowValues from "../components/ShowValues";

import { inject } from "vue";

export default {
  components: {
    ShowValues,
  },
  props: {
    es: String,
  },
  setup() {
    const store = inject("store");
    return {
      store,
    };
  },
  data() {
    return {
      tipo: "Saída",
      showhelp: false,
      search: "",
      updating: false,
      message: [],
      value: {
        row: "",
        datetime: "",
        ativo: "true",
        es: "",
        escola: "",
        titular: "",
        tipo: "",
        disc: "",
        local_movimento: "",
        valor: "",
        forma_pagamento: "",
        vencimento: "",
        parcelas: "",
        obs: "",
        pago_em: "",
        updated: "",
      },
      help: {
        Entrada: {
          datetime: "",
          status: "",
          escola: "Selecione a escola onde o dinheiro está entrando",
          titular: "Nome do aluno/cliente que está pagando",
          tipo: "Selecione o tipo de entrada",
          disc: "Detalhamento do tipo de entrada",
          local_movimento: "Selecione o local que o valor está entrando",
          valor: "Digite o valor que está entrando",
          forma_pagamento: "Selecione a forma de pagamento",
          vencimento: "",
          parcelas: "Quantidade de parcelas",
          obs: "Informação relevante para lembrar sobre esse recebimento",
          pago_em: "",
          updated: "",
        },
        Saída: {
          datetime: "",
          ativo: "true",
          es: "",
          escola: "Selecione a escola onde o dinheiro está saindo",
          titular: "Nome da empresa/pessoa que está recebendo",
          tipo: "Selecione o tipo de saída",
          disc: "Detalhamento do tipo de saída",
          local_movimento: "Selecione o local onde o valor está saindo",
          valor: "Digite o valor que está saindo",
          forma_pagamento: "Selecione a forma de pagamento",
          vencimento: "",
          parcelas: "Quantidade de parcelas",
          obs: "Informação relevante para lembrar sobre esse pagamento",
          pago_em: "",
          updated: "",
        },
      },
    };
  },
  methods: {
    getHelp(title) {
      return this.help[this.tipo][title];
    },
  },
  watch: {
    "value.escola": function (el) {
      console.log(el);
    },
  },
  computed: {
    paginate: function () {
      if (this.search == "") {
        return [];
      } else {
        const values =
          this.es == "entrada"
            ? this.store.getters.entradas()
            : this.store.getters.saidas();
        return values;
      }
    },
  },
  mounted() {
    this.tipo = this.es == "entrada" ? "Entrada" : "Saída";
    var options = null;
    var elems = document.querySelectorAll("select");
    // eslint-disable-next-line no-undef
    M.FormSelect.init(elems, options);
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
</style>
