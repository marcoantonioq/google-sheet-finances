<template>
  <table class="print highlight">
    <thead>
      <tr>
        <th @click="sort('Vencimento')">Vencimento</th>
        <th @click="sort('Titularidade')">Titularidade</th>
        <th @click="sort('Valor')">Valor</th>
        <th @click="sort('Tipo')">Tipo</th>
        <th @click="sort('Pago')">Situação</th>
        <th @click="sort('Ações')">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-on:click.stop.prevent="view(value.ID)"
        v-for="value in paginate"
        :key="value.ID"
        :class="[value['Pago em'] != '' ? 'green-text' : '']"
      >
        <td>
          {{ moment(value["Vencimento"]).format("DD/MM") }}
        </td>
        <td>{{ value["Titularidade"] }}</td>
        <td>{{ format.toReal(Math.abs(value["Valor"])) }}</td>
        <td>
          {{ value["Tipo"] }}
          {{
            value["Outras Observações"]
              ? `- ${value["Outras Observações"]}`
              : ""
          }}
        </td>
        <td>
          {{
            value["Pago em"]
              ? `Pago ${moment(value["Pago em"]).format("DD/MM H:mm")}`
              : moment(value["Vencimento"]) > moment()
              ? "A vencer"
              : "Vencido"
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
    <div v-show="values.length > paginate.length" class="flex col s12 m6">
      <a> <i class="material-icons" @click="prevPage"> chevron_left </i> </a>
      Página: {{ navegation.currentPage }}
      <a> <i class="material-icons" @click="nextPage"> chevron_right </i> </a>
    </div>

    <div v-show="values.length > paginate.length" class="flex col s12 m6">
      <a v-on:click="navegation.pageSize = 9999">
        <i class="material-icons left"> arrow_drop_down </i>
        Todos os registros
      </a>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";

import { format } from "../../helpers/utility";
const moment = require("moment");

export default {
  props: {
    values: { Type: Array, required: true },
    search: { Type: String, default: "'" },
  },
  emits: ["view"],
  setup(props, context) {
    const router = useRouter();
    const values = reactive(props.values);

    const navegation = reactive({
      currentSort: "name",
      currentSortDir: "asc",
      pageSize: 50,
      currentPage: 1,
    });

    const paginate = computed(() => {
      let vals = props.values;

      if (!props.search) {
        vals = vals.filter((obj) => obj["Pago em"] == "");
      }

      if (navegation.pageSize == 9999) {
        vals = props.values;
      }

      return vals
        .filter((obj) => {
          let str_obj = format.normalize(
            JSON.stringify(Object.values(obj)).toLocaleLowerCase()
          );
          return str_obj.includes(
            format.normalize(props.search.toLocaleLowerCase())
          );
        })
        .sort((a, b) => {
          let modifier = 1;
          if (navegation.currentSortDir === "desc") modifier = -1;
          if (a[navegation.currentSort] < b[navegation.currentSort])
            return -1 * modifier;
          if (a[navegation.currentSort] > b[navegation.currentSort])
            return 1 * modifier;
          return 0;
        })
        .filter((row, index) => {
          let start = (navegation.currentPage - 1) * navegation.pageSize;
          let end = navegation.currentPage * navegation.pageSize;
          if (index >= start && index < end) return true;
        });
    });

    function view(id) {
      context.emit("view", id);
      router.push({ name: "View", params: { id_pass: id } });
    }
    function cancel(id) {
      console.log("Cancel ", id);
    }
    function pay(id) {
      console.log("Pay ", id);
      router.push({ name: "Update", params: { id_pass: id } });
    }
    function sort(s) {
      //if s == current sort, reverse
      if (s === navegation.currentSort) {
        navegation.currentSortDir =
          navegation.currentSortDir === "asc" ? "desc" : "asc";
      }
      navegation.currentSort = s;
    }
    function nextPage() {
      if (navegation.currentPage * navegation.pageSize < values.length)
        navegation.currentPage++;
    }
    function prevPage() {
      if (navegation.currentPage > 1) navegation.currentPage--;
    }

    return {
      moment,
      format,
      navegation,
      paginate,
      view,
      cancel,
      pay,
      sort,
      nextPage,
      prevPage,
    };
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

  tr {
    cursor: pointer;
  }

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
      min-width: 150px;
    }
    th:nth-child(3) {
      min-width: 100px;
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
