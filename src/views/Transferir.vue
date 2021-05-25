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

      <div class="input-field">
        <i class="material-icons prefix">card_travel</i>
        <select
          required
          aria-required="true"
          v-model="de['Local do movimento']"
          class="validate browser-default"
        >
          <option value="" disabled selected>
            __Selecione local do movimento:__
          </option>
          <option :key="item" v-bind:value="item" v-for="item in locais_de">
            {{ item }}
          </option>
        </select>
      </div>
    </div>

    <div class="row">
      <h5>Para:</h5>
      <div class="input-field">
        <i class="material-icons prefix">keyboard_tab</i>
        <select
          class="validate browser-default"
          id="para_escola"
          name="para_escola"
          required
          v-model="para['Escola']"
        >
          <option value="" disabled selected>__Selecione escola__</option>
          <option
            v-for="item in store.escola.escolas"
            :key="item"
            v-bind:value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>

      <div v-if="para['Escola']" class="input-field">
        <i class="material-icons prefix">card_travel</i>
        <select
          aria-required="true"
          class="validate browser-default"
          required
          v-model="para['Local do movimento']"
        >
          <option value="" disabled selected>__Selecione local__</option>
          <option
            :key="item"
            v-bind:value="item"
            v-for="item in ds_para.locais"
          >
            {{ item }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="de['Local do movimento'] && para['Local do movimento']">
      <h5>Valor e forma de pagamento</h5>

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
          class="validate browser-default"
          required
          v-model="data['Forma de pagamento']"
        >
          <option value="" disabled selected>
            __Selecione forma de pagamento__
          </option>
          <option v-for="item in formas_de" :key="item" v-bind:value="item">
            {{ item }}
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
            :disabled="sending"
          >
            Salvar
            <i class="material-icons right">save</i>
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { inject, reactive, watch, computed, onMounted, ref } from "vue";

const moment = require("moment");
import event from "../lib/Event";

import Values from "../store/values";

export default {
  name: "Transferir",
  components: {},
  setup() {
    const store = inject("store");
    const form = ref(null);

    const sending = ref(false);

    const datasets = store.datasets;

    const de = reactive(Object.assign({}, Values));
    const para = reactive(Object.assign({}, Values));

    const ds_de = reactive({
      locais: [],
      escolas: [],
    });

    const ds_para = reactive({
      locais: [],
      escolas: [],
    });

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

        sending.value = true;
        store.database
          .saveValues([de, para])
          .then((data) => {
            console.log("Restornado:", data);
            event.trigger("msg", "Dados enviados com sucesso!");
          })
          .catch((e) => {
            sending.value = false;
            console.log("Erro retornado:", e);
          });

        event.trigger("msg", "Dados enviados com sucesso!");
      } else {
        console.log("Verifique todos os campos!");
      }
    }

    const tipos = computed(() => {
      return datasets.getValues(
        store.escola.nome,
        "Forma de Pagamento",
        de["ES"]
      );
    });

    const formas_de = computed(() => {
      return datasets.getValues(
        store.escola.nome,
        "Forma de Pagamento",
        "Saída"
      );
    });

    const locais_de = computed(() => {
      return datasets.getValues(
        store.escola.nome,
        "Local do movimento",
        "Saída"
      );
    });

    watch(
      () => para["Escola"],
      (escola) => {
        ds_para.locais = datasets.getValues(
          escola,
          "Local do movimento",
          "Entrada"
        );
      }
    );

    return {
      data,
      datasets,
      de,
      para,
      save,
      store,
      form,
      locais_de,
      formas_de,
      ds_de,
      ds_para,
      tipos,
      sending,
    };
  },
};
</script>

<style lang="scss" scoped>
.input-field {
  margin: 1.2rem 0;
}
</style>
