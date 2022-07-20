<template>
  <div class="w-full grid grid-cols-12 gap-2">
    <!--begin::Mixed Widget 10-->
    <div
      class="hx-card bg-white rounded-xl col-span-12 md:col-span-6 xl:col-span-6"
      v-for="(item, index) in 2"
    >
      <!--begin::Body-->
      <div class="card-body p-0 flex justify-between flex-col overflow-hidden">
        <!--begin::Hidden-->
        <div
          class="flex justify-between items-center flex-wrap flex-grow px-9 pt-9 pb-3"
        >
          <div class="flex flex-col">
            <span class="text-gray-800 block">فروش</span>

            <span class="text-gray-400 fw-bold">8 فرودین تا 18 آذر</span>
          </div>
          <div>
            <span class="text-blue-500 mx-1">120000000</span>
            <span class="text-blue-500">تومان</span>
          </div>
        </div>
        <!--end::Hidden-->

        <!--begin::Chart-->
        <apexchart
          :options="chartOptions"
          :series="series"
          type="bar"
          :height="240"
        ></apexchart>
        <!--end::Chart-->
      </div>
    </div>
    <!--end::Mixed Widget 10-->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const color = ref("primary");

const labelColor = "#222";
const borderColor = "#e2e8f9";
const secondaryColor = "#e2e8f9";
const baseColor = "#1da1f2";

const chartOptions = {
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
  plotOptions: {
    radialBar: {
      horizontal: false,
      borderRadius: 50,
    },
    bar: {
      borderRadius: 5,
      horizontal: false,
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    // categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    categories: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],

    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: labelColor,
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    y: 0,
    offsetX: 0,
    offsetY: 0,
    labels: {
      style: {
        colors: labelColor,
        fontSize: "12px",
      },
    },
  },
  fill: {
    type: "solid",
  },
  states: {
    normal: {
      filter: {
        type: "none",
        value: 0,
      },
    },
    hover: {
      filter: {
        type: "none",
        value: 0,
      },
    },
    active: {
      allowMultipleDataPointsSelection: false,
      filter: {
        type: "none",
        value: 0,
      },
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
    },
    y: {
      formatter: function (val: any) {
        return "تومان" + val + " revenue";
      },
    },
  },
  colors: [baseColor, secondaryColor],
  grid: {
    show: false,
    padding: {
      top: 0,
      left: 20,
      right: 0,
      bottom: 0,
    },

    borderColor: borderColor,
    strokeDashArray: 4,
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
};

const series = [
  {
    name: "Net Profit",
    data: [50, 60, 70, 80, 60, 50],
  },
  {
    name: "Revenue",
    data: [50, 60, 70, 80, 60, 50],
  },
];
</script>

<style></style>
