<template>
  <div class="element">
    <router-link class="shadow" to="/saida/">
      {{ title }}
      <i class="material-icons"> {{ icon }} </i>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    to: String,
    icon: String,
  },
};
</script>

<style lang="scss" scoped>
a {
  background-color: var(--green-dark);
  border-radius: 0.3rem;
  color: var(--white);
  font-weight: 800;
  padding: 0.5rem 1rem;
  text-align: center;
  width: 200px;
  justify-content: flex-end;
}
</style>
