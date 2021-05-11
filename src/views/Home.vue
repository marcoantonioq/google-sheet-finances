<template>
  <div class="row">
    <div class="home">Pagina home</div>
    <div>
      <p :style="{ color: color }">
        Store:
        {{ store.state.counter }} <br />
      </p>
      <a @click="store.methods.decrement">Decrementar</a> |
      <a @click="store.methods.increment">Incremnetar</a>
      <br />
      <input type="text" v-model="color" placeholder="Informe uma cor..." />
    </div>
  </div>

  <div class="row">v.1.0.1</div>
</template>

<script>
import { inject, computed } from "vue";
// import store from "../store";

export default {
  name: "Home",
  setup() {
    const store = inject("store");

    const color = computed({
      get() {
        return store.state.color;
      },
      set(val) {
        console.log("SetColor: ", val);
        store.state.color = val;
      },
    });

    return {
      store,
      color,
    };
  },
  created() {
    console.log(this.store.state.counter);
  },
};
</script>
