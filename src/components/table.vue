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
        v-on:click.stop.prevent="view(value.ID)"
        v-for="value in paginate"
        :key="value"
      >
        <td
          v-for="(item, key) in value"
          @keydown.esc.stop.prevent="update"
          @focusout.stop.prevent="update"
          :contenteditable="settings.editable.includes(key)"
          :key="item"
          :data-id="value['ID']"
          :data-key="key"
        >
          {{ item }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { computed, reactive } from "vue";
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
      let dir = navegation.currentSortDir;
      let sort = navegation.currentSort;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return vals.sort((a, b) => {
        let modifier = 1;
        if (dir === "desc") modifier = -1;
        if (a[sort] < b[sort]) return -1 * modifier;
        if (a[sort] > b[sort]) return 1 * modifier;
        return 0;
      });
    });

    function sort(s) {
      console.log("Sort:", s);
      //if s == current sort, reverse
      if (s === navegation.currentSort) {
        navegation.currentSortDir =
          navegation.currentSortDir === "asc" ? "desc" : "asc";
      }
      navegation.currentSort = s;
    }

    function view(id) {
      router.push({ name: "View", params: { id_pass: id } });
    }

    function update(e) {
      console.log("Update:", e.target.dataset.id);
      console.log("Update:", e.target.dataset.key);
      console.log("Update:", e.target.innerText);
      e.target.blur();
    }

    return {
      titles,
      sort,
      view,
      paginate,
      navegation,
      update,
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
