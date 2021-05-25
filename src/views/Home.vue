<template>
  <div class="home">Pagina home</div>
  <h1>Home</h1>
</template>

<script>
import { inject, reactive } from "vue";

export default {
  name: "Home",
  components: {},
  setup() {
    const store = inject("store");

    const values = reactive(store.database.values);

    return {
      store,
      values,
    };
  },
};
</script>

<style lang="scss" scoped>
td,
th {
  padding: 5px;
}

th {
  cursor: pointer;
}
</style>
