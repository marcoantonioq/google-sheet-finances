<template>
  <div class="input-field col s12 search">
    <i @click.prevent="submit($event)" class="material-icons prefix">
      search
    </i>
    <input
      id="icon_prefix"
      type="text"
      class="validate"
      autocomplete="off"
      placeholder="Pesquisar..."
      ref="search"
      v-model.trim="search"
      v-on:keydown="submit($event)"
      v-on:keydown.enter="submit($event)"
      v-on:keydown.esc="clear()"
    />
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
    submit() {
      this.$emit("submit", this.search);
    },
    clear() {
      this.search = "";
      this.$emit("submit", this.search);
    },
  },
  mounted() {
    this.$refs.search.focus();
  },
};
</script>

<style lang="scss" scoped>
.material-icons {
  cursor: pointer;
  left: 10px;
  top: 10px;
}

.input-field {
  margin-bottom: 0rem;
}
</style>
