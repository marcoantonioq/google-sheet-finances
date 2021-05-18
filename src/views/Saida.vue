<template>
  <Search @submit="submit" />

  <ValuesIndex :search="search" :values="values_escola" />

  <div class="row right">
    <ButtonLarge title="Criar novo registro" to="/create/Saída" icon="add" />
  </div>
</template>

<script>
import ButtonLarge from "../components/ButtonLarge.vue";
import ValuesIndex from "../components/Values/";
import Search from "../components/Search.vue";

import { computed, inject } from "vue";

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

    const values_escola = computed(() => {
      return store.database.find({ ES: "Saída", Escola: store.escola.nome });
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
