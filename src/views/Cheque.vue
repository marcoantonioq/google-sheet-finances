<template>
  <div class="row">
    <div class="col s12 m6">
      <div class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            Cheques vencidos
            <p>{{ format.toReal(soma(cheque_by["Vencidos"])) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col s12 m6">
      <div class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            Cheques a vencer
            <p>{{ format.toReal(soma(cheque_by["A vencer"])) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col s12">
      <ul class="tabs">
        <li
          v-for="(cheques, title) in cheque_by"
          :key="title"
          class="tab col s4"
        >
          <a :href="`#${title.replace(' ', '')}`">{{ title }}</a>
        </li>
      </ul>
    </div>
    <div
      v-for="(cheques, title) in cheque_by"
      :key="title"
      :id="title.replace(' ', '')"
      class="col s12"
    >
      <dl v-for="value in cheques" :key="value['ID']" class="row">
        <dt>Titular:</dt>
        <dd>{{ value["Titularidade"] }}&nbsp;</dd>

        <dt>Escola:</dt>
        <dd>{{ value["Escola"] }}&nbsp;</dd>

        <dt>Tipo:</dt>
        <dd>{{ value["ES"] }} / {{ value["Tipo"] }}&nbsp;</dd>

        <dt>Discriminação:</dt>
        <dd>
          {{ value["Discriminação"] }}
          {{ value["Outras Observações"] }}&nbsp;
        </dd>

        <dt>Local do movimento:</dt>
        <dd>{{ value["Local do movimento"] }}&nbsp;</dd>

        <dt>Valor:</dt>
        <dd :class="[value['Valor'] > 0 ? 'green-text' : 'red-text']">
          {{ format.toReal(Math.abs(value["Valor"])) }} &nbsp;
        </dd>

        <dt>Forma de pagamento:</dt>
        <dd>{{ value["Forma de pagamento"] }}&nbsp;</dd>

        <dt>Titular Cheque:</dt>
        <dd>{{ value["Titular Cheque"] }}&nbsp;</dd>

        <dt>Conta Cheque:</dt>
        <dd>{{ value["Conta Cheque"] }}&nbsp;</dd>

        <dt>Agência Cheque:</dt>
        <dd>{{ value["Agência Cheque"] }}&nbsp;</dd>

        <dt>Nº Cheque</dt>
        <dd>{{ value["N° Cheque"] }}&nbsp;</dd>

        <dt>Vencimento:</dt>
        <dd>{{ moment(value["Vencimento"]).format("DD/MM/YYYY") }}&nbsp;</dd>

        <dt>Situação</dt>
        <dd v-html="formatVencimento(value['Vencimento']) || '&nbsp;'"></dd>

        <dt>Pago em:</dt>
        <dd>
          {{
            value["Pago em"]
              ? moment(value["Pago em"]).format("DD/MM/YYYY HH:MM")
              : "Não pago"
          }}&nbsp;
        </dd>

        <dt>Observações:</dt>
        <dd>
          {{ value["Observações"] }} | {{ value["Outras Observações"] }}
          &nbsp;
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { computed, inject } from "vue";

const moment = require("moment");
import { format } from "../helpers/utility";

export default {
  name: "Saída",
  components: {},
  setup() {
    const store = inject("store");

    const cheque_by = computed(() => {
      return store.database.values
        .filter((o) => o["Escola"] === store.escola.nome)
        .filter((o) => o["ES"] === "Entrada")
        .filter((o) =>
          o["Forma de pagamento"].toLocaleLowerCase().includes("cheque")
        )
        .filter((obj) => obj["Pago em"] == "")
        .reduce(
          (acc, o) => {
            let current_moment = moment();
            let venc_moment = moment(o["Vencimento"]);
            let status = current_moment > venc_moment ? "Vencido" : "A vencer";
            acc[status].push(o);
            return acc;
          },
          { Vencidos: [], "A vencer": [] }
        );
    });

    const soma = function (arr) {
      let val = 0;
      try {
        val = arr.reduce((acc, val) => {
          return acc + parseFloat(val["Valor"]);
        }, 0);
      } catch (e) {
        console.log(e);
      }
      return val;
    };

    const formatVencimento = (venc) => {
      let vencimento = moment(venc);
      return moment().isAfter(vencimento)
        ? `<b class='red-text'>Vencido<b>`
        : `A vencer`;
    };

    return {
      moment,
      format,
      cheque_by,
      soma,
      formatVencimento,
    };
  },
};
</script>

<style lang="scss" scoped>
dl {
  margin-bottom: 50px;
}

dl dt {
  float: left;
  font-weight: bold;
  margin-right: 10px;
  padding: 5px;
  min-width: 135px;
}

dl dd {
  margin: 2px 0;
  padding: 5px 0;
}

.card-content {
  color: var(--blue);
  font-size: 1.2rem;
  font-weight: 400;
  p {
    font-size: 1.4rem;
    color: var(--green);
  }
}
.double-margin-top {
  margin-top: 3rem;
}
</style>
