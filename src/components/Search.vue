<template>
  <form v-on:submit.prevent.stop class="col s12">
    <div class="row">
      <div class="input-field col s12 search">
        <i @click.prevent="submit($event)" class="material-icons prefix">
          search
        </i>
        <input
          id="icon_prefix"
          type="text"
          class="validate"
          autocomplete="off"
          v-model="search"
          v-on:keydown.enter="submit($event)"
          autofocus
        />
        <label for="icon_prefix">Pesquisar:</label>
      </div>
    </div>
  </form>
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
