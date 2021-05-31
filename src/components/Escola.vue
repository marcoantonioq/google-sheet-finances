<template>
  <img
    v-if="!store.escola.nome"
    class="arrow_escola"
    src="https://www.seekpng.com/png/full/240-2401269_youtube-arrow-png-red-arrow-youtube-png.png"
  />
  <div class="row">
    <a class="dropdown-trigger" href="#" data-target="dropdown1">
      {{ store.escola.nome || "Selectione uma escola" }}
      <i class="material-icons">arrow_drop_down</i>
    </a>

    <!-- Dropdown Structure -->
    <ul id="dropdown1" class="dropdown-content">
      <li v-for="escola in store.escola.escolas" :key="escola">
        <a v-on:click="setEscola(escola)">{{ escola }}</a>
      </li>
    </ul>

    <router-link class="notifications" to="/notifications">
      <div class="flex count">15</div>
      <i class="material-icons">notifications_none</i>
    </router-link>
  </div>
</template>

<script>
import { inject } from "vue";
// import { useRouter } from "vue-router";

export default {
  name: "Escola",
  setup() {
    const store = inject("store");
    // const router = useRouter();

    function setEscola(escola) {
      store.escola.nome = escola;
      // router.push("/");
    }

    return {
      store,
      setEscola,
    };
  },
};
</script>

<style lang="scss" scoped>
.row {
  text-align: right;
  display: flex;
  justify-content: flex-end;
}

.dropdown-trigger {
  z-index: 2;
}

.dropdown-content {
  width: 400px;
  z-index: 2;
}

a {
  color: #000;
}
@keyframes shake {
  0% {
    transform: scaleY(-1) scaleX(-1) translate(1px, 1px) rotate(22deg);
  }
  50% {
    transform: scaleY(-1) scaleX(-1) translate(-1px, 2px) rotate(21deg);
  }
  100% {
    transform: scaleY(-1) scaleX(-1) translate(1px, 1px) rotate(22deg);
  }
}

img.arrow_escola {
  position: fixed;
  top: 20px;
  right: 81px;
  width: 20%;
  transform: scaleY(-1) scaleX(-1) rotate(22deg);
  animation: shake 0.5s;
  animation-iteration-count: infinite;
  z-index: 2;
}

.notifications {
  cursor: pointer;
  i.material-icons {
    font-size: 2.6rem;
    transform: rotate(10deg);
  }
}
.count {
  position: relative;
  top: -10px;
  left: 37px;
  background: var(--main-color);
  border-radius: 50%;
  color: var(--white);
  font-weight: 600;
  font-size: 0.8rem;
  width: 18px;
  height: 18px;
  text-align: center;
  z-index: 1;
}
</style>
