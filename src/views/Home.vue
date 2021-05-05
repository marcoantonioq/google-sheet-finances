<template>
  <div class="row">
    <div class="home">Pagina home</div>
    <div>
      <p>
        Store:
        {{ count }} <br />
        <a @click="decrement">Decrementar</a> <br />
        <a @click="increment">Incremnetar</a>
      </p>
    </div>
  </div>
  <div class="row">v.1.0.1</div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  computed: {
    count: {
      set(v) {
        this.$store.commit("setCount", v);
      },
      get() {
        return this.$store.state.Count.count;
      },
    },
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
};
</script>
