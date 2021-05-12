<template>
  <Search @submit="submit" />
  <ValuesIndex :search="search" :values="store.getters.find({ ES: 'Saída' })" />

  <div class="row right">
    <ButtonLarge title="Criar novo registro" to="/create/Saída" icon="add" />
  </div>
</template>

<script>
import ButtonLarge from "../components/ButtonLarge.vue";
import ValuesIndex from "../components/Values/";
import Search from "../components/Search.vue";

import { inject } from "vue";

export default {
  name: "Saída",
  components: {
    ValuesIndex,
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
