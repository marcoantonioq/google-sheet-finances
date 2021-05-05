<template>
  <nav>
    <div class="log">FISK</div>
    <router-link to="/">
      <i class="material-icons">home</i>
      Home
    </router-link>
    <router-link to="/entrada">
      <i class="material-icons"> trending_up </i>
      Entrada
    </router-link>
    <router-link to="/saida">
      <i class="material-icons"> trending_down </i>
      Saída
    </router-link>
    <router-link to="/transferir">
      <i class="material-icons"> autorenew </i>
      Transferir
    </router-link>
    <router-link to="/cheque">
      <i class="material-icons"> card_membership </i>
      Cheque
    </router-link>
  </nav>
  <div class="content">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}
body {
  min-height: 100vh;
  min-width: 100vw;
}
a {
  text-decoration: none;
}
nav {
  display: flex;
  flex-direction: column;
  background-color: #e30713;
  text-align: center;
  line-height: 10px;

  a {
    display: flex;
    flex-direction: column;
    margin: 1.5rem 0;
    padding: 0 0.2rem;
    font-weight: bold;
    color: #ffffff;
    background-color: #e30713;
    justify-content: center;
    margin-left: 5px;
    height: 78px;

    i.material-icons {
      font-size: 2.7rem;
    }

    &.router-link-exact-active {
      color: #000;
      background-color: #fff;
      border-radius: 23px 0px 0px 23px;
    }
  }
}

#app {
  display: grid;
  grid-template-columns: 86px auto;
  justify-content: stretch;
  align-items: stretch;
  height: 100vh;
  width: 100vw;
}
.content {
  padding: 0.5rem 1rem;
}

.log {
  font-size: 2.5rem;
  margin-top: 20px;
  font-size: 2.5rem;
  color: #fff;
  font-weight: 900;
  text-align: center;
}

.notifications {
  right: 0px;
  top: 20px;
  i.material-icons {
    font-size: 3.3rem;
    transform: rotate(10deg);
  }
}
.count {
  position: relative;
  top: -35px;
  left: -20px;
  background: #e30713;
  padding: 2px 6px;
  border-radius: 50%;
  color: #fff;
  font-weight: 600;
}
</style>
