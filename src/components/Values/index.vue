<template>
  <table class="highlight">
    <thead>
      <tr>
        <th @click="sort('Vencimento')">ES</th>
        <th @click="sort('Vencimento')">Vencimento</th>
        <th @click="sort('Titularidade')">Titularidade</th>
        <th @click="sort('Valor')">Valor</th>
        <th @click="sort('Tipo')">Tipo</th>
        <th @click="sort('Pago')">Pago</th>
        <th @click="sort('Ações')">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-on:click.stop.prevent="view(value.ID)"
        v-for="value in paginate"
        :key="value.ID"
      >
        <td>{{ value["ES"] }}</td>
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
            class="green-text cursor material-icons"
          >
            input
          </i>
          <i
            v-on:click.stop.prevent="view(value.ID)"
            v-if="value['Pago em']"
            class="cursor material-icons"
          >
            view_headline
          </i>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="row">
    <div class="col s12 m4">
      <div v-show="valuesCount > paginateCount">
        <button class="btn-small grey lighten-4 black-text" @click="prevPage">
          Anterior
        </button>
        <button class="btn-small grey lighten-4 black-text" @click="nextPage">
          Próximo
        </button>
      </div>
    </div>

    <div class="col s12 m4 center">
      Página: {{ currentPage }} <br />
      Mostrando {{ paginateCount }} de
      {{ valuesCount }}
    </div>

    <div class="col s12 m4">
      <div v-show="valuesCount > paginateCount">
        <a
          class="col s12 btn-small grey lighten-4 black-text"
          v-on:click="pageSize = 9999"
        >
          <i class="material-icons left"> arrow_drop_down </i>
          Mostrar todos os registros
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "../../helpers/utility";
const moment = require("moment");

export default {
  props: {
    values: { Type: Array, required: true },
    search: { Type: String, default: "'" },
  },
  emits: ["view"],
  setup() {
    return {
      moment,
    };
  },
  data() {
    return {
      modalOpen: false,
      currentSort: "name",
      currentSortDir: "asc",
      pageSize: 20,
      currentPage: 1,
    };
  },
  computed: {
    paginate: function () {
      console.log("o.O", this.values);
      if (!this.values) {
        return [];
      }
      let values = this.values
        .filter((obj) => {
          let str_obj = format.normalize(
            JSON.stringify(Object.values(obj)).toLocaleLowerCase()
          );
          return str_obj.includes(
            format.normalize(this.search.toLocaleLowerCase())
          );
        })
        .sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });

      return values;
    },
    paginateCount: function () {
      return this.paginate.length;
    },
    valuesCount: function () {
      return this.values.length;
    },
  },
  methods: {
    view(id) {
      this.$emit("view", id);
      this.$router.push({ name: "View", params: { id_pass: id } });
    },
    cancel(id) {
      console.log("Cancel ", id);
    },
    pay(id) {
      console.log("Pay ", id);
      this.$router.push({ name: "Update", params: { id_pass: id } });
    },
    sort: function (s) {
      console.log("Set:", s);
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    nextPage: function () {
      if (this.currentPage * this.pageSize < this.values.length)
        this.currentPage++;
    },
    prevPage: function () {
      if (this.currentPage > 1) this.currentPage--;
    },
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
      padding: 0 1.1rem;
      border-radius: 0.2rem;
    }
  }
}
</style>
