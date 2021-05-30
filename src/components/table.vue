<template>
  <table class="print highlight">
    <thead>
      <tr>
        <th v-for="title in titles" :key="title" @click="sort(title)">
          {{ title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="value in paginate"
        :key="value"
        v-on:click.stop.prevent="view(value.ID)"
      >
        <td v-for="item in value" :key="item">{{ item }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
export default {
  props: {
    values: { Type: Array, required: true },
    settings: { Type: Array },
  },
  setup(props) {
    const titles = Object.keys(props.values[0] || []);
    const vals = reactive(props.values);
    const router = useRouter();

    const navegation = reactive({
      currentSort: "name",
      currentSortDir: "asc",
      pageSize: 50,
      currentPage: 1,
      ...props.settings,
    });

    console.log(navegation);

    const paginate = computed(() => {
      return vals.sort((a, b) => {
        let modifier = 1;
        if (navegation.currentSortDir === "desc") modifier = -1;
        if (a[navegation.currentSort] < b[navegation.currentSort])
          return -1 * modifier;
        if (a[navegation.currentSort] > b[navegation.currentSort])
          return 1 * modifier;
        return 0;
      });
    });

    function view(id) {
      router.push({ name: "View", params: { id_pass: id } });
    }

    function sort(s) {
      console.log("Sort:", s);
      //if s == current sort, reverse
      if (s === navegation.currentSort) {
        navegation.currentSortDir =
          navegation.currentSortDir === "asc" ? "desc" : "asc";
      }
      navegation.currentSort = s;
    }

    return {
      titles,
      sort,
      view,
      paginate,
      navegation,
    };
  },
};
</script>

<style lang="scss" scoped>
table {
  thead tr th:first-child,
  tbody tr td:first-child {
    display: none;
  }
  tr {
    cursor: pointer;
  }
}
</style>
