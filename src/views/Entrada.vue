<template>
  <Search @submit="submit" />

  <ValuesIndex :search="search" :values="values_escola" />

  {{ values_escola }}

  <div class="row right">
    <ButtonLarge title="Criar novo registro" to="/create/Entrada" icon="add" />
  </div>
</template>

<script>
import ButtonLarge from "../components/ButtonLarge.vue";
import ValuesIndex from "../components/Values/index.vue";
import Search from "../components/Search.vue";

import { computed, inject } from "vue";

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

    const values_escola = computed(() => {
      return store.database.find({
        Escola: store.escola.nome,
        ES: "Entrada",
      });
    });

    return {
      store,
      values_escola,
    };
  },
  methods: {
    submit(search) {
      this.search = search;
    },
  },
};
</script>
