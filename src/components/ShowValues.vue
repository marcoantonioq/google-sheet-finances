<template>
  <Search @submit="submit" />

  <table>
    <thead>
      <tr>
        <th>Vencimento</th>
        <th>Titularidade</th>
        <th>Valor</th>
        <th>Tipo</th>
        <th>Situação</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="value in data" :key="value.ID">
        <td>
          {{ moment(value["Data/Vencimento"]).format("DD/MM") }}
        </td>
        <td>{{ value["Titularidade"] }}</td>
        <td>R$ {{ value["Valor"] }}</td>
        <td>{{ value["Tipo"] }}</td>
        <td>{{ value["Situação"] }}</td>
        <td>
          <a class="shadow">Pagar</a>
        </td>
      </tr>
    </tbody>
  </table>
  <h6>
    {{ data.length > countValues ? countValues : data.length }} de
    {{ countValues }} registros.
  </h6>

  <div class="row right">
    <ButtonLarge title="Criar novo registro" to="/form" icon="add" />
  </div>
</template>

<script>
import ButtonLarge from "../components/ButtonLarge.vue";
import Search from "../components/Search.vue";
import { normalizeString } from "../helpers/utility.js";

import { mapActions, mapState, mapGetters } from "vuex";

export default {
  components: {
    ButtonLarge,
    Search,
  },
  data() {
    return {
      limit: 20,
      search: "",
      data: [],
    };
  },
  computed: {
    ...mapState({
      values: (state) => state.tables.values,
    }),
    ...mapGetters(["countValues"]),
  },
  methods: {
    ...mapActions(["updateValues"]),
    // ...mapMutations(["paginate"]),
    paginate() {
      this.data = this.values.slice(0, this.limit);
      if (this.search != "") {
        let search = normalizeString(this.search.toLocaleLowerCase());
        this.data = this.data.filter((obj) => {
          return normalizeString(
            JSON.stringify(obj).toLocaleLowerCase()
          ).includes(search);
        });
      }
    },
    submit(search) {
      this.search = search;
      this.paginate();
    },
  },
  mounted() {
    this.paginate();
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
    tr:hover {
      background-color: var(--gray-light);
    }

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
