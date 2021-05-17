<template>
  Componente 1
  <div class="row">
    <input
      v-on:keydown.enter="save()"
      v-model="values[0]['Titularidade']"
      type="text"
      name="escola"
      placeholder="Titularidade"
    />
  </div>
  <h3>Titular</h3>
  {{ values[0]["Titularidade"] }}
  <h3>Store</h3>
  {{ store.database.values[0]["Titularidade"] }}
</template>

<script>
import { inject, reactive, ref } from "vue";
export default {
  name: "Componenta",
  setup() {
    const store = inject("store");

    const escola = ref("");

    const values = reactive(store.database.values);

    function save() {
      values[0]["Titularidade"] = escola;
    }

    return {
      store,
      escola,
      save,
      values,
    };
  },
};
</script>
