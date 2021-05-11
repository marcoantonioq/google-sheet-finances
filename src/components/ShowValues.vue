<template>
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
      <tr v-for="value in paginate" :key="value.ID">
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
import { normalizeString } from "../helpers/utility.js";

export default {
  props: {
    values: { Type: Array, required: true },
    search: { Type: String, default: "'" },
  },
  data() {
    return {
      limit: 20,
    };
  },
  computed: {
    paginate: function () {
      if (this.search.trim() == "") {
        return this.values.slice(0, this.limit);
      } else {
        return this.values.slice(0, this.limit).filter((obj) => {
          let str_obj = normalizeString(
            JSON.stringify(Object.values(obj)).toLocaleLowerCase()
          );
          return str_obj.includes(
            normalizeString(this.search.toLocaleLowerCase())
              .split(" ")
              .every((item) => str_obj.includes(item))
          );
        });
      }
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
