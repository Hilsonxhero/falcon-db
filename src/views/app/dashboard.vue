<template>
  <section class="mb-6">
    <div class="hx-card p-3">
      <HxDataTable
        :table-header="tableHeader"
        :table-data="tableData4"
        :rows-per-page="5"
        :enable-items-per-page-dropdown="false"
      >
        <template v-slot:cell-order="{ row: invoice }">
          {{ invoice.order }}
        </template>
        <template v-slot:cell-amount="{ row: invoice }">
          <span :class="`text-${invoice.color}`">
            {{ invoice.amount }}
          </span>
        </template>
        <template v-slot:cell-status="{ row: invoice }">
          <span :class="`badge badge-light-${invoice.status.state}`">{{
            invoice.status.label
          }}</span>
        </template>
        <template v-slot:cell-date="{ row: invoice }">
          {{ invoice.date }}
        </template>
        <template v-slot:cell-invoice>
          <button class="btn btn-sm btn-light btn-active-light-primary">
            Download
          </button>
        </template>
      </HxDataTable>
    </div>
  </section>
  <div class="w-full grid grid-cols-12 gap-2">
    <div
      class="hx-card bg-white rounded-xl col-span-12 md:col-span-6 xl:col-span-6"
    >
      <!--begin::Body-->
      <div class="card-body p-0 flex justify-between flex-col">
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

        <HxChart
          :options="area_options"
          :height="300"
          :series="area_series"
          type="area"
        />
        <!--end::Chart-->
      </div>
    </div>

    <div
      class="hx-card bg-white rounded-xl col-span-12 md:col-span-6 xl:col-span-6"
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
        <HxChart
          :options="chartOptions"
          :height="250"
          :series="series"
          type="bar"
        />
        <!--end::Chart-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HxChart from "@/components/common/widgets/charts/Chart.vue";

import HxDataTable from "@/components/common/datatable/DataTable.vue";

const tableHeader = ref([
  {
    name: "Order id",
    key: "order",
    sortable: true,
  },
  {
    name: "Amount",
    key: "amount",
    sortable: true,
  },
  {
    name: "Status",
    key: "status",
    sortingField: "status.label",
    sortable: true,
  },
  {
    name: "Date",
    key: "date",
    sortable: true,
  },
  {
    name: "Invoice",
    key: "invoice",
    sortable: false,
  },
]);
const tableData4 = ref([
  {
    date: "Nov 01, 2020",
    order: "102445788",
    details: "Darknight transparency  36 Icons Pack",
    color: "success",
    amount: "$38.00",
    status: {
      label: "Pending",
      state: "warning",
    },
  },
  {
    date: "Oct 24, 2020",
    order: "423445721",
    details: "Seller Fee",
    color: "danger",
    amount: "$-2.60",
    status: {
      label: "Pending",
      state: "warning",
    },
  },
  {
    date: "Nov 01, 2020",
    order: "102445788",
    details: "Darknight transparency  36 Icons Pack",
    color: "success",
    amount: "$38.00",
    status: {
      label: "Pending",
      state: "warning",
    },
  },
  {
    date: "Oct 24, 2020",
    order: "423445721",
    details: "Seller Fee",
    color: "danger",
    amount: "$-2.60",
    status: {
      label: "Pending",
      state: "warning",
    },
  },
  {
    date: "Feb 09, 2020",
    order: "426445943",
    details: "Visual Design Illustration",
    color: "success",
    amount: "$31.00",
    status: {
      label: "Pending",
      state: "warning",
    },
  },
  {
    date: "Nov 01, 2020",
    order: "984445943",
    details: "Abstract Vusial Pack",
    color: "success",
    amount: "$52.00",
    status: {
      label: "Pending",
      state: "warning",
    },
  },
  {
    date: "Jan 04, 2020",
    order: "324442313",
    details: "Seller Fee",
    color: "danger",
    amount: "$-0.80",
    status: {
      label: "Pending",
      state: "warning",
    },
  },
  {
    date: "Oct 08, 2020",
    order: "312445984",
    details: "Cartoon Mobile Emoji Phone Pack",
    color: "success",
    amount: "$76.00",
    status: {
      label: "Pending",
      state: "warning",
    },
  },
  {
    date: "Oct 08, 2020",
    order: "312445984",
    details: "Cartoon Mobile Emoji Phone Pack",
    color: "success",
    amount: "$76.00",
    status: {
      label: "Pending",
      state: "warning",
    },
  },
  {
    date: "Feb 09, 2020",
    order: "426445943",
    details: "Visual Design Illustration",
    color: "success",
    amount: "$31.00",
    status: {
      label: "Pending",
      state: "warning",
    },
  },
  {
    date: "Nov 01, 2020",
    order: "984445943",
    details: "Abstract Vusial Pack",
    color: "success",
    amount: "$52.00",
    status: {
      label: "Pending",
      state: "warning",
    },
  },
  {
    date: "Jan 04, 2020",
    order: "324442313",
    details: "Seller Fee",
    color: "danger",
    amount: "$-0.80",
    status: {
      label: "Pending",
      state: "warning",
    },
  },
  {
    date: "Oct 08, 2020",
    order: "312445984",
    details: "Cartoon Mobile Emoji Phone Pack",
    color: "success",
    amount: "$76.00",
    status: {
      label: "Pending",
      state: "warning",
    },
  },
  {
    date: "Oct 08, 2020",
    order: "312445984",
    details: "Cartoon Mobile Emoji Phone Pack",
    color: "success",
    amount: "$76.00",
    status: {
      label: "Pending",
      state: "warning",
    },
  },
]);

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

const area_options = {
  chart: {
    fontFamily: "inherit",
    type: "area",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {},
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: "solid",
    opacity: 1,
  },
  stroke: {
    curve: "smooth",
    show: true,
    width: 2,
    colors: ["#FFC700", "#50CD89", "#009EF7"],
  },
  xaxis: {
    x: 0,
    offsetX: 0,
    offsetY: 0,
    padding: {
      left: 0,
      right: 0,
      top: 0,
    },
    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      style: {
        colors: "#e2e8f9",
        fontSize: "12px",
      },
    },
    crosshairs: {
      show: false,
      position: "front",
      stroke: {
        color: "#e2e8f9",
        width: 1,
        dashArray: 3,
      },
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    y: 0,
    offsetX: 0,
    offsetY: 0,
    padding: {
      left: 0,
      right: 0,
    },
    labels: {
      show: false,
      style: {
        colors: "#e2e8f9",
        fontSize: "12px",
      },
    },
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
        return "$" + val + " thousands";
      },
    },
  },
  colors: ["#FFF8DD", "#E8FFF3", "#F1FAFF"],
  grid: {
    borderColor: borderColor,
    strokeDashArray: 4,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  markers: {
    colors: ["#FFF8DD", "#E8FFF3", "#F1FAFF"],
    strokeColor: ["#FFC700", "#50CD89", "#009EF7"],
    strokeWidth: 3,
  },
};
const series = [
  {
    name: "Net Profit",
    data: [50, 60, 70, 200, 60, 50],
  },
  {
    name: "Revenue",
    data: [12, 40, 120, 80, 30, 20],
  },
];
const area_series = [
  {
    name: "Net Profit",
    data: [30, 30, 50, 50, 35, 35],
  },
  {
    name: "Revenue",
    data: [55, 20, 20, 20, 70, 70],
  },
  {
    name: "Expenses",
    data: [60, 60, 40, 40, 30, 30],
  },
];
</script>

<style></style>
