<template>
  <div class="search">
    <a @click.prevent="submit($event)">
      <i class="material-icons"> search </i>
    </a>
    <div class="input-field col s6">
      <input
        placeholder="Pesquisar..."
        type="search"
        id="gsearch"
        name="gsearch"
        v-model="search"
        v-on:change="submit($event)"
        v-on:keydown="submit($event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  emits: ["submit"],
  data() {
    return {
      search: "",
    };
  },
  methods: {
    submit(event) {
      if (this.search == "" || event.keyCode === 13 || event.type == "click") {
        this.$emit("submit", this.search);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  width: 300px;
  padding-left: 25px;
}

@media (max-width: 720px) {
  .search {
    display: flex;
    justify-content: flex-start;
  }
  a {
    padding: 4px 9px;
    i {
      font-size: 2.5rem;
    }
  }
}
</style>
