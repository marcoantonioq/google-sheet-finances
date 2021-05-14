<template>
  <div class="home">Pagina home</div>

  <div class="row">
    <Componenta />
  </div>

  <div class="row">
    <Componentb />
  </div>

  <div class="row">v.1.0.1</div>
</template>

<script>
import Componenta from "../components/componenta.vue";
import Componentb from "../components/componentb.vue";

export default {
  name: "Home",
  components: {
    Componenta,
    Componentb,
  },
  setup() {},
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
