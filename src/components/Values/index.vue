<template>
  <table class="highlight">
    <thead>
      <tr>
        <th>Vencimento</th>
        <th>Titularidade</th>
        <th>Valor</th>
        <th>Tipo</th>
        <th>Pago</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-on:click.stop.prevent="view(value.ID)"
        v-for="value in paginate"
        :key="value.ID"
      >
        <td>
          {{ moment(value["Data/Vencimento"]).format("DD/MM") }}
        </td>
        <td>{{ value["Titularidade"] }}</td>
        <td>R$ {{ Math.abs(value["Valor"]) }}</td>
        <td>{{ value["Tipo"] }}</td>
        <td>
          {{
            value["Pago em"]
              ? moment(value["Pago em"]).format("DD/MM HH:MM")
              : ""
          }}
        </td>
        <td>
          <i
            v-on:click.stop.prevent="pay(value.ID)"
            v-if="!value['Pago em']"
            class="green-text cursor material-icons tooltipped"
            data-position="left"
            data-tooltip="Efetuar pagamento!"
          >
            input
          </i>
          <i
            v-on:click.stop.prevent="view(value.ID)"
            v-if="value['Pago em']"
            class="cursor material-icons tooltipped"
            data-position="left"
            data-tooltip="Cancelar pagamento!"
          >
            visibility
          </i>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="row">
    <div class="col s12 m8">
      <h6>{{ paginate.length }} de {{ values.length }}</h6>
    </div>
    <div class="col s12 m4">
      <div class="input-field">
        <select v-model="limit">
          <option value="20">20 registros</option>
          <option value="50">50 registros</option>
          <option value="100">100 registros</option>
          <option value="99999">Todos registros</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { upMaterialize } from "../../helpers/materialize.js";
import { format } from "../../helpers/utility";

export default {
  props: {
    values: { Type: Array, required: true },
    search: { Type: String, default: "'" },
  },
  data() {
    return {
      limit: 20,
      modalOpen: false,
    };
  },
  computed: {
    paginate: function () {
      if (this.search.trim() == "") {
        return this.values.slice(0, this.limit);
      } else {
        return this.values.slice(0, this.limit).filter((obj) => {
          let str_obj = format.normalize(
            JSON.stringify(Object.values(obj)).toLocaleLowerCase()
          );
          return str_obj.includes(
            format.normalize(this.search.toLocaleLowerCase())
          );
        });
      }
    },
  },
  methods: {
    view(id) {
      console.log("View ", id);
      this.$router.push({ name: "View", params: { id_pass: id } });
    },
    cancel(id) {
      console.log("Cancel ", id);
    },
    pay(id) {
      console.log("Pay ", id);
      this.$router.push({ name: "Update", params: { id_pass: id } });
    },
  },
  mounted() {
    upMaterialize();
  },
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  line-height: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background-color: transparent;
  border-collapse: collapse;
  border-bottom: 1px solid var(--gray);
  text-align: center;

  td,
  th {
    padding: 0.5rem;
  }

  td:nth-child(1),
  th:nth-child(1) {
    text-align: left;
  }

  td:nth-last-child(1),
  th:nth-last-child(1) {
    text-align: right;
  }

  thead {
    th {
      font-weight: 1000;
    }
    th:nth-child(2) {
      min-width: 250px;
    }
    border-bottom: 1px solid var(--gray);
  }

  tbody {
    a {
      font-size: 0.9rem;
      background-color: var(--red-dark);
      color: var(--white);
      padding: 0 1.1rem;
      border-radius: 0.2rem;
    }
  }
}
</style>
