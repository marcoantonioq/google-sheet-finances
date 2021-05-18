<template>
  <form id="form" name="DB">
    <h5>De:</h5>
    <div class="input-field">
      <i class="material-icons prefix rotated">keyboard_tab</i>
      <input
        disabled="disabled"
        id="origem"
        v-model.trim="de['Escola']"
        type="text"
        class="validate"
        minlength="6"
        required
        autocomplete="off"
        placeholder="Escola"
      />
      <label for="origem">Origem do dinheiro:</label>
    </div>

    <div class="input-field col s12 m6">
      <i class="material-icons prefix">card_travel</i>
      <select
        required
        v-model="de['Local de movimento']"
        name="local_movimento"
        class="validate"
      >
        <option value="" disabled selected>__Local de movimento:__</option>
        <option
          v-for="item in datasets.locaisMovimento(de['Escola'])"
          :key="item['Texto']"
          v-bind:value="item['Texto']"
        >
          {{ item["Texto"] }}
        </option>
      </select>
    </div>

    <h5>Para:</h5>
    <div class="input-field">
      <i class="material-icons prefix">keyboard_tab</i>
      <select
        v-model="para['Escola']"
        name="para_escola"
        id="para_escola"
        class="validate"
        required
      >
        <option value="" disabled selected>Selecione</option>
        <option
          v-for="item in store.escola.escolas"
          :key="item"
          v-bind:value="item"
        >
          {{ item }}
        </option>
      </select>
      <label for="para_escola">Escola de destino</label>
    </div>

    <div class="input-field col s12 m6">
      <i class="material-icons prefix">card_travel</i>
      <select
        required
        v-model="para['Local de movimento']"
        name="local_movimento"
        class="validate"
      >
        <option value="" disabled selected>__Local de movimento:__</option>
        <option
          v-for="item in datasets.locaisMovimento(para['Escola'])"
          :key="item['Texto']"
          v-bind:value="item['Texto']"
        >
          {{ item["Texto"] }}
        </option>
      </select>
    </div>

    <div class="divider"></div>
    <h5>Transação</h5>

    <div class="input-field">
      <i class="material-icons prefix">attach_money</i>
      <input
        name="valor"
        v-model="data['valor']"
        id="valor"
        type="text"
        class="pagamento validate"
        pattern="^\d*(,)?\d{1,2}"
        required
        autocomplete="off"
      />
      <label for="valor">Valor (R$) <small>(Ex: 1000,20)</small> </label>
    </div>

    <div class="input-field">
      <i class="material-icons prefix">card_membership</i>
      <input
        name="forma_pagamento"
        id="forma_pagamento"
        type="text"
        class="pagamento validate"
        required
        autocomplete="off"
        v-model="data['forma']"
      />
      <label for="forma_pagamento">Forma de transferência</label>
    </div>

    <div class="input-field launch">
      <i class="material-icons prefix">group</i>
      <input
        v-model="data['obs']"
        class="obs"
        id="obs"
        type="text"
        autocomplete="off"
      />
      <label for="obs"
        >Observações
        <small>(Motivo / Agência / Conta / Nº Cheque)</small></label
      >
    </div>

    <div class="row">
      <div class="col s12 m6">
        <button class="col s12 btn green" type="submit" name="salvar">
          Salvar
          <i class="material-icons right">save</i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { inject, reactive, watch, onMounted } from "vue";

import Values from "../store/values";

export default {
  name: "Transferir",
  components: {},
  setup() {
    const store = inject("store");
    const datasets = reactive(store.datasets);
    const de = reactive(Object.assign({}, Values));
    const para = reactive(Object.assign({}, Values));
    const data = reactive({
      valor: 0,
      obs: "",
      forma: "Transferência bancária",
    });

    function setEscola(escola) {
      console.log("Changed escola:", escola);
      de["Escola"] = escola;
    }
    watch(() => store.escola.nome, setEscola);
    onMounted(() => {
      setEscola(store.escola.nome);
    });

    return {
      datasets,
      de,
      para,
      data,
      store,
    };
  },
};
</script>
