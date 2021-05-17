<template>
  Componente 2
  <div class="row">
    <input
      v-on:keydown.enter="save()"
      v-model="store.database.values[1]['Titularidade']"
      type="text"
      name="escola"
      placeholder="Titularidade"
    />
  </div>
  {{ store.database.values[1]["Titularidade"] }}
</template>

<script>
import { inject, ref } from "vue";
export default {
  name: "Componenta",
  setup() {
    const store = inject("store");

    const escola = ref("");

    function save() {
      console.log("save", store.database.values[1]);
      store.database.values[1]["Titularidade"] = escola.value;
    }

    return {
      store,
      escola,
      save,
    };
  },
};
</script>
