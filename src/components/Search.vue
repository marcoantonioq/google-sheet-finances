<template>
  <div class="input-field col s6">
    <i class="material-icons prefix"> search </i>
    <input
      placeholder="Pesquisar..."
      type="search"
      id="gsearch"
      name="gsearch"
    />
  </div>
</template>

<script>
export default {
  name: "Search",
};
</script>

<style lang="scss" scoped>
input {
  width: 300px;
  padding-left: 25px;
}

@media (max-width: 720px) {
  .search {
    justify-content: flex-start;
  }
}
</style>
