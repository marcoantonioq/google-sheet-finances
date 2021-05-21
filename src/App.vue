<template>
  <nav>
    <div class="logo">NM</div>
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
    <Escola />
    <router-view />

    <Load />
  </div>
</template>

<script>
import { provide } from "vue";
import store from "./store";
import event from "./lib/Event";

import Escola from "./components/Escola.vue";
import Load from "./components/Load";

export default {
  components: { Escola, Load },
  setup() {
    provide("store", store);
    provide("event", event);

    event.on("msg", (text) => {
      // eslint-disable-next-line no-undef
      M.toast({ html: text });
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    });
  },
};
</script>

<style lang="scss">
:root {
  --blue: #007bff;
  --cyan: #17a2b8;
  --danger: #dc3545;
  --dark: #343a40;
  --gray-dark: #343a40;
  --gray-light: #f7f7f7;
  --gray: #6c757d;
  --green: #28a745;
  --green-dark: #605c00;
  --indigo: #6610f2;
  --info: #17a2b8;
  --light: #f8f9fa;
  --main-color: #e30713;
  --orange: #fd7e14;
  --pink: #e83e8c;
  --primary: #007bff;
  --purple: #6f42c1;
  --red: #dc3545;
  --red-dark: #870000;
  --red-light: #ffd6d6;
  --secondary: #6c757d;
  --success: #28a745;
  --teal: #20c997;
  --warning: #ffc107;
  --white: #fff;
  --yellow: #ffc107;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  line-height: 1.5;
  color: var(--dark);
  letter-spacing: 0.02rem;
  -ms-text-size-adjust: 100%;
}

html,
body,
#app {
  height: 100vh;
  width: 100vw;
  background-color: var(--white);
}

a {
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
}

nav {
  background-color: var(--main-color);
  text-align: center;
  line-height: 10px;
  user-select: none;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-shadow: none;
  overflow: auto;
  grid-area: nav;
  overflow: hidden;

  a {
    background-color: var(--main-color);
    color: var(--light);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    font-weight: bold;
    justify-content: center;
    margin: 1.3rem 0;
    margin-left: 5px;
    padding: 0px;
    text-decoration: none;
    min-height: 65px;

    i.material-icons {
      font-size: 2.7rem;
      height: 44px;
      position: relative;
      top: -8px;
    }

    &.active-route {
      color: var(--dark);
      background-color: var(--white);
      border-radius: 19px 0px 0px 18px;
    }
  }
}

.flex {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.red {
  background-color: var(--red) !important;
}
.green {
  background-color: var(--green) !important;
}

.cursor {
  cursor: pointer;
}

#app {
  display: grid;
  grid-template-columns: 86px 1fr;
  grid-template-areas: "nav content";
}
.content {
  grid-area: content;
  padding: 0.5rem 1rem;
  overflow: auto;
}

.logo {
  font-size: 2.5rem;
  margin: 1.5rem auto;
  font-size: 2.5rem;
  color: var(--white);
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
  background: var(--main-color);
  padding: 2px 6px;
  border-radius: 50%;
  color: var(--white);
  font-weight: 600;
}

.shadow {
  box-shadow: 5px 5px 8px -3px rgba(58, 58, 58, 0.44);
}

@media (max-height: 400px) {
  nav {
    a {
      min-height: 30px;
      margin: 0.2rem 0;
      margin-left: 5px;
      i.material-icons {
        display: none;
      }
    }
  }
}

@media (max-width: 2600px) {
  html {
    font-size: 95%;
  }
  .content {
    padding: 3rem 4rem;
  }
}

@media (max-width: 1080px) {
  html {
    font-size: 93.75%;
  }
  .content {
    padding: 1.5rem 2rem;
  }
}

@media (max-width: 720px) {
  html {
    font-size: 80%;
  }
  .content {
    padding: 1rem 1.5rem;
  }
}
//
@media (max-width: 600px) {
  #app {
    display: grid;
    // grid-template-columns: 1fr;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 70px;
    grid-template-areas:
      "content"
      "nav";
  }
  nav {
    flex-direction: row;
    height: 70px;
    align-self: stretch;

    .logo {
      display: none;
    }
    a {
      height: auto;
      width: 100%;
      margin: 0;

      &.active-route-exact {
        color: var(--dark);
        background-color: var(--main-color);
        border-radius: 0px 0px 0px 0px;
        left: 0;
      }
    }
  }
  .preloader-wrapper {
    bottom: 80px !important;
  }
}

.preloader-wrapper {
  width: 35px;
  height: 35px;
  position: fixed;
  bottom: 10px;
  right: 10px;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background: #e30713;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #e30713;
}
::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 3px;
  box-shadow: inset 0px -11px 12px #f0f0f0;
}
</style>
