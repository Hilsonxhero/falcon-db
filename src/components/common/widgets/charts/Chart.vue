<template>
  <apexchart
    :options="options"
    :series="series"
    :type="type"
    :height="height"
  ></apexchart>
</template>

<script setup lang="ts">
const pops = defineProps({
  options: {
    type: Object,
  },
  series: {
    type: Array,
  },
  height: {
    type: Number,
  },
  color: {
    type: String,
    defualt: "primary",
  },
  type: {
    type: String,
    defualt: "bar",
  },
});
</script>

<style scoped></style>
