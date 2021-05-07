<template>
  <form id="form" name="DB">
    <div class="row">
      <div class="col s12">
        <div class="input-field inline col s12">
          <input id="email_inline" type="email" class="validate" />
          <label for="email_inline">Email</label>
          <span class="helper-text" data-error="wrong" data-success="right">
            Helper text
          </span>
        </div>
      </div>
    </div>

    <!-- 
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
      <label for="tipo"
        >Tipo
        <small>(Ex. mensalidades, água, aluguel, manutenção)</small></label
      >
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
      <label for="disc"
        >Discriminação
        <small>(O que se refere à entrada. Ex: 1° mensalidade)</small>
      </label>
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
    </div>

    <div class="input-field">
      <i class="material-icons prefix">date_range</i>
      <input
        :disabled="!updating"
        :required="updating"
        class="validate"
        id="pago"
        v-model="DataSets.pago_em"
        type="date"
        autocomplete="off"
      />
      <label for="pago">Pago em <small>(Data)</small> </label>
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
      <label for="parcelas">Parcela(s): {{ parcelado }} </label>
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
        >Observações <small>(Agência / Conta / Nº Cheque)</small></label
      >
    </div>

    <div class="row">
      <div class="col s12 m6">
        {{ textoPagamento() }}
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
    </div> -->
  </form>
</template>

<script>
export default {
  data() {
    return {
      DataSets: {
        row: "",
        datetime: "",
        ativo: "true",
        status:
          '=IF(AND(ISDATE( INDEX(A:Z; ROW(); 16) )); "Paga"; IF(INDEX(A:Z; ROW(); 13) < TODAY() ;"Vencido";"À vencer"))',
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
      updating: false,
      message: [],
    };
  },
  watch: {
    "DataSets.escola": function (el) {
      console.log(el);
    },
  },
};
</script>
