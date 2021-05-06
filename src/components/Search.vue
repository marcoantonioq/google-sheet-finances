<template>
  <div class="search">
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
.search {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

input {
  width: 300px;
  padding-left: 25px;
}

i.material-icons {
  font-size: 2rem;
  position: relative;
  left: 25px;
}
@media (max-width: 720px) {
  .search {
    justify-content: flex-start;
  }
}
</style>
