<template>
  Componente 1
  <div class="row">
    <input v-model="store.escola.nome" type="text" name="escola" />
  </div>
  {{ store.escola }}
</template>

<script>
import { inject } from "vue";
export default {
  name: "Componenta",
  setup() {
    const store = inject("store");

    return {
      store,
    };
  },
};
</script>
