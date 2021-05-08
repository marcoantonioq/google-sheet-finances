<template>
  <form id="form" name="DB">
    
    <div class="input-field">
      <i class="material-icons prefix">keyboard_tab</i>
      <input
        :disabled="updating"
        id="tipo"
        v-model="DataSets.tipo"
        type="text"
        class="validate"
        required
        autocomplete="off"
      />
      <label for="tipo">Tipo</label>
      <small class="help"> {{ getHelp("tipo") }}</small>
    </div>
    <div class="input-field">
      <i class="material-icons prefix">description</i>
      <input
        id="disc"
        v-model="DataSets.disc"
        type="text"
        class="validate"
        required
        autocomplete="off"
      />
      <label for="disc">Discriminação</label>
      <small class="help"> {{ getHelp("disc") }}</small>
    </div>

    <div class="input-field">
      <i class="material-icons prefix">card_travel</i>
      <input
        id="local_movimento"
        v-model="DataSets.local_movimento"
        type="text"
        class="y"
        required
        autocomplete="off"
      />
      <label for="local_movimento">Local de movimento</label>
      <small class="help"> {{ getHelp("local_movimento") }}</small>
    </div>

    <div class="input-field">
      <i class="material-icons prefix">attach_money</i>
      <input
        id="valor"
        type="text"
        @blur="checkValor"
        v-model="DataSets.valor"
        class="pagamento validate"
        pattern="^(-)?\d*(,)?\d{1,2}"
        required
        autocomplete="off"
      />
      <label for="valor" data-error="Ex: 200,00"
        >Valor {{ this.DataSets.es }} (R$)<small></small>
      </label>
      <small class="help"> {{ getHelp("valor") }}</small>
    </div>

    <div class="input-field">
      <i class="material-icons prefix">card_membership</i>
      <input
        id="forma_pagamento"
        v-model="DataSets.forma_pagamento"
        type="text"
        class="pagamento validate"
        required
        autocomplete="off"
      />
      <label for="forma_pagamento">Forma de pagamento</label>
      <small class="help"> {{ getHelp("forma_pagamento") }}</small>
    </div>

    <div class="input-field">
      <i class="material-icons prefix">date_range</i>
      <input
        :disabled="updating"
        class="validate"
        id="vencimento"
        v-model="DataSets.vencimento"
        type="date"
        required
        autocomplete="off"
      />
      <label for="vencimento">Vencimento <small>(Data)</small> </label>
      <small class="help"> {{ getHelp("vencimento") }}</small>
    </div>

    <div class="input-field">
      <i class="material-icons prefix">date_range</i>
      <input
        :disabled="!updating"
        :required="updating"
        class="validate"
        id="pago"
        v-model="DataSets.Pago_em"
        type="date"
        autocomplete="off"
      />
      <label for="pago">Pago em <small>(Data)</small> </label>
      <small class="help"> {{ getHelp("Pago_em") }}</small>
    </div>

    <div class="input-field launch">
      <i class="material-icons prefix">add</i>
      <input
        :disabled="updating"
        id="parcelas"
        v-model="DataSets.parcelas"
        type="number"
        min="1"
        autocomplete="off"
      />
      <label for="parcelas">Parcela(s): </label>
      <small class="help"> {{ getHelp("Parcelas") }}</small>
    </div>

    <div class="input-field launch">
      <i class="material-icons prefix">group</i>
      <input
        class="obs"
        id="obs"
        v-model="DataSets.obs"
        type="text"
        autocomplete="off"
      />
      <label for="obs"
        >Observações
        <small class="help">(Agência / Conta / Nº Cheque)</small></label
      >
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
</template>

<script>
export default {
  data() {
    return {
      tipo: "Saída",
      DataSets: {
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
      updating: false,
      message: [],
    };
  },
  methods: {
    getHelp(title) {
      return this.help[this.tipo][title];
    },
  },
  watch: {
    "DataSets.escola": function (el) {
      console.log(el);
    },
  },
};
</script>
