<template>
  <img
    v-if="!store.state.current_escola"
    class="arrow_escola"
    src="https://www.seekpng.com/png/full/240-2401269_youtube-arrow-png-red-arrow-youtube-png.png"
  />
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

.dropdown-trigger {
  z-index: 2;
}

.dropdown-content {
  width: 400px;
  z-index: 2;
}

a {
  color: #000;
}
@keyframes shake {
  0% {
    transform: scaleY(-1) scaleX(-1) translate(1px, 1px) rotate(22deg);
  }
  50% {
    transform: scaleY(-1) scaleX(-1) translate(-1px, 2px) rotate(21deg);
  }
  100% {
    transform: scaleY(-1) scaleX(-1) translate(1px, 1px) rotate(22deg);
  }
}

img.arrow_escola {
  position: fixed;
  top: 20px;
  right: 81px;
  width: 20%;
  transform: scaleY(-1) scaleX(-1) rotate(22deg);
  animation: shake 0.5s;
  animation-iteration-count: infinite;
  z-index: 1;
}
</style>
