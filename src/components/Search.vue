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
      v-model="search"
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
    submit(event) {
      if (this.search == "" || event.keyCode === 13 || event.type == "click") {
        this.$emit("submit", this.search);
      }
    },
    clear() {
      this.search = "";
      this.$emit("submit", this.search);
    },
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
