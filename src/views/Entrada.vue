<template>
  <Search @submit="submit" />
  <ShowValues :values="store.getters.entradas()" />

  <div class="row right">
    <ButtonLarge title="Criar novo registro" to="/form/entrada" icon="add" />
  </div>
</template>

<script>
import ButtonLarge from "../components/ButtonLarge.vue";
import ShowValues from "../components/ShowValues";
import Search from "../components/Search.vue";

import { inject } from "vue";

export default {
  name: "Entrada",
  components: {
    ShowValues,
    Search,
    ButtonLarge,
  },
  data() {
    return {
      search: "",
    };
  },
  setup() {
    const store = inject("store");

    return {
      store,
    };
  },
  methods: {
    submit(search) {
      this.search = search;
    },
  },
};
</script>
