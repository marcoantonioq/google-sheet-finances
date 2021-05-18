<template>
  <div class="home">Pagina home</div>
  <h1>Home</h1>

  <div class="row">v.1.0.1</div>
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
