<template>
  <form ref="form" name="DB">
    <div class="row">
      <h5>De:</h5>
      <div class="input-field">
        <i class="material-icons prefix rotated">keyboard_tab</i>
        <input
          aria-required="true"
          autocomplete="off"
          class="validate"
          disabled="disabled"
          id="origem"
          minlength="6"
          placeholder="Escola"
          required
          type="text"
          v-model.trim="de['Escola']"
        />
      </div>

      <div class="input-field col s12">
        <i class="material-icons prefix">card_travel</i>
        <select
          required
          aria-required="true"
          v-model="de['Local do movimento']"
          class="validate"
        >
          <option value="" disabled selected>__Local do movimento:__</option>
          <option
            :key="item['Texto']"
            v-bind:value="item['Texto']"
            v-for="item in datasets.locaisMovimento(de['Escola'])"
          >
            {{ item["Texto"] }}
          </option>
        </select>
      </div>
    </div>

    <div class="row">
      <h5>Para:</h5>
      <div class="input-field">
        <i class="material-icons prefix">keyboard_tab</i>
        <select
          class="validate"
          id="para_escola"
          name="para_escola"
          required
          v-model="para['Escola']"
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
      </div>

      <div class="input-field col s12">
        <i class="material-icons prefix">card_travel</i>
        <select
          aria-required="true"
          class="validate"
          required
          v-model="para['Local do movimento']"
        >
          <option value="" disabled selected>__Local do movimento:__</option>
          <option
            :key="item['Texto']"
            v-bind:value="item['Texto']"
            v-for="item in datasets.locaisMovimento(para['Escola'])"
          >
            {{ item["Texto"] }}
          </option>
        </select>
      </div>
    </div>

    <div class="divider"></div>
    <h5>Transação</h5>

    <div class="input-field">
      <i class="material-icons prefix">attach_money</i>
      <input
        aria-required="true"
        autocomplete="off"
        class="validate"
        id="valor"
        pattern="^\d*(,)?\d{1,2}"
        placeholder="Valor. Ex: 1000,20"
        required
        type="text"
        v-model="data['Valor']"
      />
    </div>

    <div class="input-field col s12">
      <i class="material-icons prefix">keyboard_tab</i>
      <select
        aria-required="true"
        class="validate"
        required
        v-model="data['Forma de pagamento']"
      >
        <option value="" disabled selected>__Forma de pagamento__</option>
        <option
          v-for="item in datasets.formasPagamento(de['Escola'])"
          :key="item['Texto']"
          v-bind:value="item['Texto']"
        >
          {{ item["Texto"] }}
        </option>
      </select>
    </div>

    <div class="input-field launch">
      <i class="material-icons prefix">group</i>
      <input
        autocomplete="off"
        class="obs"
        id="obs"
        type="text"
        v-model="data['Observações']"
      />
      <label for="obs"
        >Observações
        <small>(Motivo / Agência / Conta / Nº Cheque)</small></label
      >
    </div>

    <div class="row">
      <div class="col s12 m6">
        <button
          class="col s12 btn green"
          name="salvar"
          type="submit"
          v-on:click.prevent.stop="save"
        >
          Salvar
          <i class="material-icons right">save</i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { inject, reactive, watch, onMounted, ref } from "vue";

const moment = require("moment");
import event from "../lib/Event";

import Values from "../store/values";

export default {
  name: "Transferir",
  components: {},
  setup() {
    const store = inject("store");
    const form = ref(null);

    const datasets = reactive(store.datasets);
    const de = reactive(Object.assign({}, Values));
    const para = reactive(Object.assign({}, Values));
    const data = reactive({
      Valor: "",
      Observações: "",
      "Forma de pagamento": "",
    });

    function setEscola(escola) {
      console.log("Changed escola:", escola);
      de["Escola"] = escola;
    }
    watch(() => store.escola.nome, setEscola);
    onMounted(() => {
      setEscola(store.escola.nome);
    });

    function save() {
      if (form.value.checkValidity()) {
        de["ES"] = "Saída";
        para["ES"] = "Entrada";

        de["Valor"] = data["Valor"];
        para["Valor"] = data["Valor"];

        de["Titularidade"] = `Escola ${para["Escola"]}`;
        para["Titularidade"] = `Escola ${de["Escola"]}`;

        de[
          "Discriminação"
        ] = `De ${de["Local do movimento"]}/${de["Escola"]} para ${para["Local do movimento"]}/${para["Escola"]}`;
        para[
          "Discriminação"
        ] = `De ${de["Local do movimento"]}/${de["Escola"]} para ${para["Local do movimento"]}/${para["Escola"]}`;

        de["Observações"] = data["Observações"];
        para["Observações"] = data["Observações"];

        de["Forma de pagamento"] = data["Forma de pagamento"];
        para["Forma de pagamento"] = data["Forma de pagamento"];

        de["Vencimento"] = moment(new Date()).format("YYYY-MM-DD");
        para["Vencimento"] = moment(new Date()).format("YYYY-MM-DD");

        de["Pago em"] = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");
        para["Pago em"] = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");

        de["Tipo"] = "Transferências interna";
        para["Tipo"] = "Transferências interna";

        console.log("Salvar:", [de, para]);

        store.database.saveValues([de, para]);

        event.trigger("msg", "Dados enviados com sucesso!");
      } else {
        console.log("Verifique todos os campos!");
      }
    }

    return {
      data,
      datasets,
      de,
      para,
      save,
      store,
      form,
    };
  },
};
</script>

<style lang="scss" scoped>
.input-field {
  margin: 1.2rem 0;
}
</style>
