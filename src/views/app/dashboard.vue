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
          <HxChartBar :horizontal="true" :categories="[' کالای دیجیتال', 'لوزام خانگی', 'لوزام جانبی خودرو', 'پوشاک', 'بهداشت و درمان'
          , 'مواد خوراکی']" :series="[{ name: 'Net Profit', data: [50, 60, 70, 200, 60, 50] }]" />
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
          <HxChartDonut :labels="['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد']" :series="[44, 55, 41, 17, 15]"
            color="primary" :height="300" />
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
          <HxAreaChart :height="300" :categories="[' Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']" :series="[{
            name: 'Net Profit', data: [30, 30, 50, 50, 35, 35],
          }, {
            name: 'Revenue', data: [55, 20, 20, 20, 70, 70],
          }, {
            name: 'Expenses', data: [60, 60, 40, 40, 30, 30],
          },]" />
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
          <HxChartBar :height="250" :categories="[' فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور']"
            :series="[{ name: 'Net Profit', data: [50, 60, 70, 200, 60, 50] }, { name: 'Revenue', data: [12, 40, 120, 80, 30, 20], }]" />
          <!--end::Chart-->
        </div>
      </div>
    </div>


  </section>

  <section class="my-4">

    <HxDataTable url="orders" search-placeholder="جستجوی سفارش" :table-header="fields"
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
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import StaticArea from "@/components/common/widgets/statistics/Area.vue";
import StaticCard from "@/components/common/widgets/statistics/Card.vue";
import HxChartDonut from "@/components/common/widgets/charts/Donut.vue";
import HxChartBar from "@/components/common/widgets/charts/Bar.vue";
import HxAreaChart from "@/components/common/widgets/charts/Area.vue";


const checkedCustomers = ref([]);

const fields = ref([
  {
    key: "checkbox",
    sortable: false,
  },
  {
    name: "کاربر",
    key: "name",
    sortable: true,
  },
  {
    name: "ایمیل",
    key: "email",
    sortable: true,
  },

  {
    name: "روش پرداخت",
    key: "paymentMethod",
    sortingField: "payment.label",
    sortable: true,
  },
  {
    name: "تاریخ ایجاد",
    key: "date",
    sortable: true,
  },
  {
    name: "عملیات",
    key: "actions",
  },
]);


</script>
<style>
</style>
