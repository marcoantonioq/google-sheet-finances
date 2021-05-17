<template>
  <div class="home">Pagina home</div>
  <h1>Home</h1>
  <h3>Store</h3>
  {{ store.database.values }}

  <h3>Values react</h3>
  {{ values }}

  <h1>Outros componentes</h1>

  <div class="row">
    <Componenta />
  </div>

  <div class="row">
    <Componentb />
  </div>

  <div class="row">v.1.0.1</div>
</template>

<script>
import Componenta from "../components/componenta.vue";
import Componentb from "../components/componentb.vue";

import { inject, reactive } from "vue";

export default {
  name: "Home",
  components: {
    Componenta,
    Componentb,
  },
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
