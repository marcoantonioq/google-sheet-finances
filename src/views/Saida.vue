<template>
  <Search @submit="submit" />
  <ShowValues :search="search" :values="store.getters.find({ ES: 'Saída' })" />

  <div class="row right">
    <ButtonLarge title="Criar novo registro" to="/form/Saída" icon="add" />
  </div>
</template>

<script>
import ButtonLarge from "../components/ButtonLarge.vue";
import ShowValues from "../components/ShowValues";
import Search from "../components/Search.vue";

import { inject } from "vue";

export default {
  name: "Saída",
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
