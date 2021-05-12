<template>
  <div :class="{ progress: progress }">
    <div class="indeterminate"></div>
  </div>

  <ul class="collapsible">
    <li v-for="objs in entries" :key="objs[0]">
      <div class="collapsible-header">
        <i class="material-icons">person</i>
        {{ objs[0] }}<span class="new badge red">4 vencidas</span>
      </div>
      <div class="collapsible-body">
        <span>Lorem ipsum dolor sit amet.</span>
      </div>
    </li>
  </ul>
  {{ entries }}
</template>

<script>
import { filters } from "../../helpers/utility";
export default {
  props: {
    values: { Type: Array, required: true },
  },
  data() {
    return {
      progress: false,
      entries: [],
    };
  },
  methods: {
    computedData: async function () {
      this.entries = Object.entries(
        filters.groupBy(this.values, "Titularidade")
      );
      this.progress = false;
    },
  },
  mounted() {
    this.progress = true;
    this.computedData();
  },
};
</script>
