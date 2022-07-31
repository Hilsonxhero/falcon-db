<template>

  <section class="my-4">

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-6 lg:col-span-4" v-for="(item, index) in 3">
        <StaticArea description="  لورم ایپسوم متن ساختگی با تولید" title="فروش هفتگی" :change="150" color="succcess"
          :height="100" />
      </div>
    </div>

  </section>

  <section class="my-4">

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-6 lg:col-span-4" v-for="(item, index) in 3">
        <StaticCard icon="ecc" description="  لورم ایپسوم متن ساختگی با تولید" title="فروش هفتگی" :change="150"
          color="dark" :height="100" />
      </div>
    </div>

  </section>

  <section class="my-4">

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-6 lg:col-span-3" v-for="(item, index) in 4">
        <StaticCard icon="static" description="  لورم ایپسوم متن ساختگی با تولید" title="12000000" color="primary" />
      </div>
    </div>

  </section>

  <section class="my-4">

    <div class="w-full grid grid-cols-12 gap-6">
      <div class="hx-card bg-white rounded-xl col-span-12 md:col-span-6 xl:col-span-6">
        <!--begin::Body-->
        <div class="hx-card__body flex justify-between flex-col overflow-hidden">
          <!--begin::Hidden-->
          <div class="flex justify-between items-center flex-wrap flex-grow px-9 pt-9 pb-3">
            <div class="flex flex-col">
              <span class="text-gray-800 block">دسته بندی های پرفروش</span>

              <span class="text-gray-400 fw-bold">8 فرودین تا 18 آذر</span>
            </div>

          </div>
          <!--end::Hidden-->

          <!--begin::Chart-->
          <HxChart :options="chartOptionsHorizontal" :height="300" :series="seriesHorizontal" type="bar" />
          <!--end::Chart-->
        </div>
      </div>

      <div class="hx-card bg-white rounded-xl col-span-12 md:col-span-6 xl:col-span-6">
        <!--begin::Body-->
        <div class="hx-card__body flex justify-between flex-col overflow-hidden">
          <!--begin::Hidden-->
          <div class="flex justify-between items-center flex-wrap flex-grow px-9 pt-9 pb-3">
            <div class="flex flex-col">
              <span class="text-gray-800 block">دسته بندی های پرفروش</span>

              <span class="text-gray-400 fw-bold">8 فرودین تا 18 آذر</span>
            </div>

          </div>
          <!--end::Hidden-->

          <!--begin::Chart-->
          <HxChart :options="chartOptionsPie" :height="300" :series="seriesPie" type="donut" />
          <!--end::Chart-->
        </div>
      </div>
    </div>
  </section>

  <section class="my-4">


    <div class="w-full grid grid-cols-12 gap-6">
      <div class="hx-card bg-white rounded-xl col-span-12 md:col-span-6 xl:col-span-6">
        <!--begin::Body-->
        <div class="card-body p-0 flex justify-between flex-col">
          <!--begin::Hidden-->
          <div class="flex justify-between items-center flex-wrap flex-grow px-9 pt-9 pb-3">
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

          <HxChart :options="area_options" :height="300" :series="area_series" type="area" />
          <!--end::Chart-->
        </div>
      </div>

      <div class="hx-card bg-white rounded-xl col-span-12 md:col-span-6 xl:col-span-6">
        <!--begin::Body-->
        <div class="card-body p-0 flex justify-between flex-col overflow-hidden">
          <!--begin::Hidden-->
          <div class="flex justify-between items-center flex-wrap flex-grow px-9 pt-9 pb-3">
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
          <HxChart :options="chartOptions" :height="250" :series="series" type="bar" />
          <!--end::Chart-->
        </div>
      </div>
    </div>


  </section>



  <section class="my-4">
    <div class=" hx-card">
      <div class="hx-card__header border-0">
        <!--begin::Card title-->
        <div class="hx-card__title flex items-center justify-between">
          <!--begin::Search-->
          <div>
            <h4>آخرین سفارشات</h4>
          </div>
          <div class="flex items-center position-relative my-1">
            <hx-input v-model="search" @input="searchItems()" placeholder="جستجو  در سفارشات"></hx-input>
          </div>
          <!--end::Search-->
        </div>
        <!--begin::Card title-->
        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <!--begin::Toolbar-->
          <!-- <div
            v-if="checkedCustomers.length === 0"
            class="d-flex justify-content-end"
          ></div>

          <div
            v-else
            class="d-flex justify-content-end align-items-center"
            data-kt-customer-table-toolbar="selected"
          >
            <div class="fw-bolder me-5">
              <span class="me-2">{{ checkedCustomers.length }}</span
              >Selected
            </div>
            <button type="button" class="btn btn-danger">
              Delete Selected
            </button>
          </div> -->

          <!-- <div class="d-flex justify-content-end align-items-center d-none">
            <div class="fw-bolder me-5"><span class="me-2"></span>Selected</div>
            <button type="button" class="btn btn-danger">
              Delete Selected
            </button>
          </div> -->
          <!--end::Group actions-->
        </div>
        <!--end::Card toolbar-->
      </div>
      <HxDataTable :rows-per-page="5" :table-data="tableData" :table-header="tableHeader"
        :enable-items-per-page-dropdown="false">
        <template v-slot:cell-checkbox="{ row: customer }">
          <div class="form-check form-check-sm form-check-custom form-check-solid">
            <input class="form-check-input" type="checkbox" :value="customer.id" v-model="checkedCustomers" />
          </div>
        </template>
        <template v-slot:cell-name="{ row: customer }">
          {{ customer.name }}
        </template>
        <template v-slot:cell-email="{ row: customer }">
          <a href="#" class="text-gray-600 text-hover-primary mb-1">
            {{ customer.email }}
          </a>
        </template>
        <template v-slot:cell-company="{ row: customer }">
          {{ customer.company }}
        </template>
        <template v-slot:cell-paymentMethod="{ row: customer }">
          <img :src="customer.payment.icon" class="w-35px me-3" alt="" />{{
              customer.payment.ccnumber
          }}
        </template>
        <template v-slot:cell-date="{ row: customer }">
          {{ customer.date }}
        </template>
        <template v-slot:cell-actions="{ row: customer }">
          <a href="#" class="btn btn-sm btn-light btn-active-light-primary">Actions
            <span class="svg-icon svg-icon-5 m-0">
              <inline-svg src="media/icons/duotune/arrows/arr072.svg" />
            </span>
          </a>
        </template>
      </HxDataTable>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import HxChart from "@/components/common/widgets/charts/Chart.vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import customers from "@/core/data/customers";
import { ICustomer } from "@/core/data/customers";
import StaticArea from "@/components/common/widgets/statistics/Area.vue";
import StaticCard from "@/components/common/widgets/statistics/Card.vue";

const selected = ref(null);


onMounted(() => {
  initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
});

const checkedCustomers = ref([]);

const tableHeader = ref([
  {
    key: "checkbox",
    sortable: false,
  },
  {
    name: "Customer Name",
    key: "name",
    sortable: true,
  },
  {
    name: "Email",
    key: "email",
    sortable: true,
  },
  {
    name: "Company",
    key: "company",
    sortable: true,
  },
  {
    name: "Payment Method",
    key: "paymentMethod",
    sortingField: "payment.label",
    sortable: true,
  },
  {
    name: "Created Date",
    key: "date",
    sortable: true,
  },
  {
    name: "Actions",
    key: "actions",
  },
]);
const tableData = ref<Array<ICustomer>>(customers);
const initCustomers = ref<Array<ICustomer>>([]);

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

const chartOptionsHorizontal = {
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
      horizontal: true,
      borderRadius: 50,
    },
    bar: {
      borderRadius: 5,
      horizontal: true,
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
    categories: ["کالای دیجیتال", "لوزام خانگی", "لوزام جانبی خودرو", "پوشاک", "بهداشت و درمان", "مواد خوراکی"],

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



const chartOptionsPie = {
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
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }],
  labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد"],
}


const seriesPie = [44, 55, 41, 17, 15]

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

const seriesHorizontal = [
  {
    name: "Net Profit",
    data: [50, 60, 70, 200, 60, 50],
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

const search = ref<string>("");
const searchItems = () => {
  tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
  if (search.value !== "") {
    let results: Array<ICustomer> = [];
    for (let j = 0; j < tableData.value.length; j++) {
      if (searchingFunc(tableData.value[j], search.value)) {
        results.push(tableData.value[j]);
      }
    }
    tableData.value.splice(0, tableData.value.length, ...results);
  }
};

const searchingFunc = (obj: any, value: any): boolean => {
  for (let key in obj) {
    if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
      if (obj[key].indexOf(value) != -1) {
        return true;
      }
    }
  }
  return false;
};
</script>
<style>
</style>
