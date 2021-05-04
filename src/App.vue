<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/entrada">Entrada</router-link> |
    <router-link to="/saida">Saída</router-link> |
    <router-link to="/transferir">Transferir</router-link> |
    <router-link to="/cheque">Cheque</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

pre {
  text-align: left;
}
</style>
