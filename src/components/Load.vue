<template>
  <div v-bind:class="{ active: load }" class="preloader-wrapper">
    <div class="spinner-layer spinner-red-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="gap-patch">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject, reactive } from "vue";
export default {
  setup() {
    const store = inject("store");

    const status = reactive(store.database.status);

    const load = computed(() => {
      return status.load;
    });

    return {
      load,
    };
  },
};
</script>
