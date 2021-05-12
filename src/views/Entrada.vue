<template>
  <Search @submit="submit" />
  <ValuesIndex
    :search="search"
    :values="store.getters.find({ ES: 'Entrada' })"
  />

  <div class="row right">
    <ButtonLarge title="Criar novo registro" to="/create/Entrada" icon="add" />
  </div>
</template>

<script>
import ButtonLarge from "../components/ButtonLarge.vue";
import ValuesIndex from "../components/Values/index.vue";
import Search from "../components/Search.vue";

import { inject } from "vue";

export default {
  name: "Entrada",
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
