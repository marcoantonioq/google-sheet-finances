<template>
  <div class="home">Pagina home</div>

  <select v-model="selected">
    <option v-for="option in options" v-bind:value="option.value" :key="option">
      {{ option.text }}
    </option>
  </select>
  <br />
  <span>Selecionado: {{ selected }}</span>

  <div class="row">v.1.0.1</div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "Home",
  setup() {
    const store = inject("store");
    return {
      store,
    };
  },
  data() {
    return {
      selected: "A",
      options: [
        { text: "Um", value: "A" },
        { text: "Dois", value: "B" },
        { text: "Três", value: "C" },
      ],
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
