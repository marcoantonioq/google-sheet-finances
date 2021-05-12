<template>
  <div class="row">
    <a class="dropdown-trigger" href="#" data-target="dropdown1">
      {{ current_escola || "Selectione uma escola" }}
      <i class="material-icons">arrow_drop_down</i>
    </a>

    <!-- Dropdown Structure -->
    <ul id="dropdown1" class="dropdown-content">
      <li v-for="escola in escolas" :key="escola">
        <a v-on:click="setEscola(escola)">{{ escola }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "Escola",
  data() {
    return {
      current_escola: "",
      escolas: [],
    };
  },
  setup() {
    const store = inject("store");

    return {
      store,
    };
  },
  methods: {
    setEscola(escola) {
      this.current_escola = escola;
      this.store.state.current_escola = escola;
      localStorage.setItem("escola", escola);
    },
  },
  mounted() {
    this.escolas = this.store.state.escolas;
    let current_escola = localStorage.getItem("escola");
    if (current_escola) {
      this.setEscola(current_escola);
    }
  },
};
</script>

<style lang="scss" scoped>
.row {
  text-align: right;
  display: flex;
  justify-content: flex-end;
}

.dropdown-content {
  width: 400px;
}

a {
  color: #000;
}
</style>
