<template>
  <div class="home">Pagina entrada</div>
  <div>
    Loading: {{ loading }}
    <pre>
        {{ values }} <br />
      </pre>
    <a @click="push">Add</a> <br />
    <a @click="remove">Remove</a>
  </div>
</template>

<script>
export default {
  name: "Entrada",
  data() {
    return {
      loading: false,
    };
  },
  components: {},
  computed: {
    values: {
      set(v) {
        this.$store.dispatch("insertValueSpreadsheet", v);
      },
      get() {
        return this.$store.state.DB.values;
      },
    },
  },
  methods: {
    async push() {
      let value = {
        created: new Date(),
        name: "Nome",
      };
      this.values = value;
    },
    async remove() {
      this.$store.commit("delValue", { key: 0 });
    },
  },
};
</script>
