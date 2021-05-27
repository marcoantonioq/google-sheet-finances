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
          :disabled="navegation.updating || navegation.edit"
          id="Titularidade"
          v-model.trim="value.Titularidade"
          type="text"
          class="validate"
          minlength="6"
          required
          autocomplete="off"
          placeholder="Titular"
        />
        <small v-show="navegation.showhelp" class="help"
          >{{ navegation.help.get("Titularidade") }}
        </small>
      </div>

      <div class="input-field col s12 m6">
        <i class="material-icons prefix">keyboard_tab</i>
        <select
          :required="!navegation.updating"
          :disabled="navegation.updating"
          class="validate browser-default"
          v-model="value['Tipo']"
          name="Tipo"
        >
          <option value="" disabled selected>Tipo de {{ value["ES"] }}</option>
          <option v-for="item in tipos" :key="item" v-bind:value="item">
            {{ item }}
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
          v-model="value['Local do movimento']"
          name="local_movimento"
          class="validate browser-default"
        >
          <option value="" disabled selected>Local do movimento:</option>
          <option v-for="item in locais" :key="item" v-bind:value="item">
            {{ item }}
          </option>
        </select>
        <small v-show="navegation.showhelp" class="help">
          {{ navegation.help.get("Local do movimento") }}</small
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
          class="validate"
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
          class="validate browser-default"
          v-model="value['Forma de pagamento']"
          name="Forma de pagamento"
        >
          <option value="" disabled selected>Forma de pagamento</option>
          <option v-for="item in formas" :key="item" v-bind:value="item">
            {{ item }}
          </option>
        </select>
        <small v-show="navegation.showhelp" class="help">
          {{ navegation.help.get("Forma de pagamento") }}</small
        >
      </div>
      <div
        v-show="
          value['Forma de pagamento'].toLocaleLowerCase().includes('cheque')
        "
        class="row"
      >
        <div class="input-field col s12">
          <i class="material-icons prefix">check</i>
          <input
            v-model.trim="value['Titular Cheque']"
            type="text"
            autocomplete="off"
            placeholder="Titular cheque"
          />
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">check</i>
          <input
            v-model.trim="value['Agência Cheque']"
            type="text"
            autocomplete="off"
            placeholder="Agência Cheque"
          />
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">check</i>
          <input
            v-model.trim="value['Conta Cheque']"
            type="text"
            autocomplete="off"
            placeholder="Conta"
          />
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">check</i>
          <input
            v-model.trim="value['N° Cheque']"
            type="text"
            autocomplete="off"
            placeholder="N° Cheque"
          />
        </div>
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
          :disabled="navegation.updating || navegation.edit"
          :required="!navegation.updating"
          id="Parcelas"
          class="validate"
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
          class="validate"
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

    <div class="margin2 row" v-html="getInfo"></div>

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
          :disabled="sending"
        >
          Salvar
          <i class="material-icons right">save</i>
        </button>
      </div>
    </div>
  </form>

  <Parcelas
    v-if="!navegation.updating && !navegation.edit"
    :parcelas="parcelas"
  />
</template>

<script>
// import ValuesIndex from "./index.vue";
import Parcelas from "./parcelas.vue";

import { createParcelas } from "../../model/parcelas";
import { helpsForm, createInfo } from "../../model/helps";

const moment = require("moment");

import { inject, reactive, ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import Values from "../../store/values";
import event from "../../lib/Event";

export default {
  name: "Save",
  components: {
    // ValuesIndex,
    Parcelas,
  },
  props: {
    es_pass: String,
    id_pass: String,
  },
  setup() {
    const store = inject("store");
    const route = useRoute();
    const router = useRouter();

    const sending = ref(false);

    const form = ref(null);
    var value = reactive(JSON.parse(JSON.stringify(Values)));
    const datasets = store.datasets;

    const navegation = reactive({
      updating: false,
      edit: false,
      showhelp: false,
      help: helpsForm,
    });

    if (route.path.includes("create")) {
      value = reactive(JSON.parse(JSON.stringify(Values)));
      value["ES"] = route.params.es_pass == "Entrada" ? "Entrada" : "Saída";
    } else if (route.path.includes("edit")) {
      navegation.edit = true;
      Object.assign(value, store.database.getValue(route.params.id_pass));
    } else if (route.path.includes("update") && route.params.id_pass) {
      navegation.updating = true;
      Object.assign(value, store.database.getValue(route.params.id_pass));
    } else {
      router.go(-1);
    }
    // Convert Number to String
    value["Valor"] = String(value["Valor"]).replace(".", ",");

    const parcelas = computed(() => {
      return createParcelas(value);
    });

    function salvar() {
      try {
        if (form.value.checkValidity()) {
          sending.value = true;
          let val =
            navegation.updating || navegation.edit ? [value] : parcelas.value;
          store.database
            .saveValues(val)
            .then((data) => {
              console.log("Restornado:", data);
              event.trigger("msg", "Dados enviados com sucesso!");
              router.go(-1);
            })
            .catch((e) => {
              sending.value = false;
              console.log("Erro retornado:", e);
            });
        } else {
          navegation.showhelp = true;
          throw "Preencha todos os camos!";
        }
      } catch (e) {
        console.info(e);
        event.trigger("msg", "Aglumas informações obrigatárias!");
      }
    }

    const getInfo = computed(() => {
      return createInfo(value);
    });

    const tipos = computed(() => {
      return datasets.getValues(store.escola.nome, "Tipo", value["ES"]);
    });

    const formas = computed(() => {
      return datasets.getValues(
        store.escola.nome,
        "Forma de Pagamento",
        value["ES"]
      );
    });

    const locais = computed(() => {
      return datasets.getValues(
        store.escola.nome,
        "Local do movimento",
        value["ES"]
      );
    });

    console.log("Locais: ", locais);

    watch(
      () => value.Valor,
      (val) => {
        console.log(val);
        value["Valor"] =
          value["ES"] === "Saída" && val > 0 ? -1 * Number(val) : val;
      }
    );

    watch(
      () => value.Vencimento,
      (val) => {
        let current_data = moment().format("YYYY-MM-DD");
        value["Pago em"] = moment(val).isSame(current_data)
          ? moment().format("YYYY-MM-DD HH:MM:SS")
          : "";
      }
    );
    function setEscola(escola) {
      value["Escola"] = escola;
    }
    watch(() => store.escola.nome, setEscola);

    onMounted(() => {
      setEscola(store.escola.nome);

      navegation.help.tipo = route.params.es_pass || value["ES"];

      value["Vencimento"] = moment(value["Vencimento"] || new Date()).format(
        "YYYY-MM-DD"
      );
    });

    return {
      datasets,
      form,
      getInfo,
      moment,
      navegation,
      parcelas,
      salvar,
      store,
      value,
      tipos,
      formas,
      locais,
      sending,
    };
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
  font-size: 0.9rem;
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
.cheque {
  .row {
    .input-field {
      padding-left: 40px;
      margin: 0;
    }
  }
}
</style>
