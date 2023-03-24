<template>
  <apexchart
    :options="options"
    :series="series"
    :height="height"
    type="donut"
  ></apexchart>
</template>

<script setup lang="ts">
// @ts-nocheck
import { getCurrentInstance } from "vue";

const { appContext } = getCurrentInstance()!;
const props = defineProps({
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
  labels: {
    type: Array,
  },
});

const options = {
  chart: {
    fontFamily: "inherit",
    type: "bar",
    // height: "10",
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
    },
    y: {
      formatter: function (val: any) {
        const value = val / 10;
        return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      },
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
  labels: props.labels,
};
</script>

<style scoped></style>
