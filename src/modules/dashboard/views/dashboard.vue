<template>
  <div>
    <hx-skeleton animated :loading="loading">
      <template #template>
        <hx-skeleton-item variant="card"></hx-skeleton-item>
        <hx-skeleton-item variant="card"></hx-skeleton-item>
        <div class="space-x-reverse space-x-2">
          <hx-skeleton-item variant="button"></hx-skeleton-item>
          <hx-skeleton-item variant="button"></hx-skeleton-item>
        </div>
      </template>
      <template #default>
        <section class="my-4">
          <!-- <div class="grid grid-cols-12 gap-6">
            <div
              class="col-span-12 md:col-span-6 lg:col-span-4"
              v-for="(item, index) in 3"
            >
              <StaticArea
                description="  لورم ایپسوم متن ساختگی با تولید"
                title="فروش هفتگی"
                :change="150"
                color="succcess"
                :height="100"
              />
            </div>
          </div> -->
        </section>

        <section class="my-4">
          <!-- <div class="grid grid-cols-12 gap-6">
            <div
              class="col-span-12 md:col-span-6 lg:col-span-4"
              v-for="(item, index) in 3"
            >
              <StaticCard
                icon="ecc"
                description="  لورم ایپسوم متن ساختگی با تولید"
                title="فروش هفتگی"
                :change="150"
                color="dark"
                :height="100"
              />
            </div>
          </div> -->
        </section>

        <section class="my-4">
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 md:col-span-6 lg:col-span-3">
              <static-card icon="static" color="primary">
                <template #title>
                  {{ $filters.separate(stats?.total_sales) }}
                </template>
                <template #description> فروش کل </template>
              </static-card>
            </div>
            <div class="col-span-12 md:col-span-6 lg:col-span-3">
              <static-card icon="static" color="primary">
                <template #title>
                  {{ $filters.separate(stats?.yearly_sales) }}
                </template>
                <template #description> فروش سالانه </template>
              </static-card>
            </div>
            <div class="col-span-12 md:col-span-6 lg:col-span-3">
              <static-card icon="static" color="primary">
                <template #title>
                  {{ $filters.separate(stats?.monthly_sales) }}
                </template>
                <template #description> فروش ماهانه </template>
              </static-card>
            </div>
            <div class="col-span-12 md:col-span-6 lg:col-span-3">
              <static-card icon="static" color="primary">
                <template #title>
                  {{ $filters.separate(stats?.daily_sales) }}
                </template>
                <template #description> فروش روزانه </template>
              </static-card>
            </div>
          </div>
        </section>

        <section class="my-4">
          <div class="w-full grid grid-cols-12 gap-6">
            <div
              class="hx-card bg-white rounded-xl col-span-12 md:col-span-6 xl:col-span-12"
            >
              <div
                class="hx-card__body flex justify-between flex-col overflow-hidden"
              >
                <div
                  class="flex justify-between items-center flex-wrap flex-grow px-9 pt-9 pb-3"
                >
                  <div class="flex flex-col">
                    <span class="text-gray-800 block"
                      >دسته بندی های پرفروش</span
                    >
                    <div
                      class="flex items-center space-x-reverse space-x-2 mt-2"
                    >
                      <span class="text-gray-500 font-bold">
                        {{ stats?.several_months_categories?.start_at }}
                      </span>
                      <span class="text-gray-400 font-light"> تا </span>
                      <span class="text-gray-500 font-bold">
                        {{ stats?.several_months_categories?.end_at }}
                      </span>
                    </div>
                  </div>
                </div>

                <HxChartBar
                  :height="300"
                  :horizontal="false"
                  :categories="stats?.several_months_categories?.labels"
                  :series="[
                    {
                      name: 'سفارش',
                      data: stats?.several_months_categories?.values,
                    },
                  ]"
                />
              </div>
            </div>

            <div
              class="hx-card bg-white rounded-xl col-span-12 md:col-span-6 xl:col-span-6"
            >
              <div
                class="hx-card__body flex justify-between flex-col overflow-hidden"
              >
                <div
                  class="flex justify-between items-center flex-wrap flex-grow px-9 pt-9 pb-3"
                >
                  <div class="flex flex-col">
                    <span class="text-gray-800 block">
                      میزان فروش بازه ماهانه
                    </span>

                    <div
                      class="flex items-center space-x-reverse space-x-2 mt-2"
                    >
                      <span class="text-gray-500 font-bold">
                        {{ stats?.several_months_sales?.start_at }}
                      </span>
                      <span class="text-gray-400 font-light"> تا </span>
                      <span class="text-gray-500 font-bold">
                        {{ stats?.several_months_sales?.end_at }}
                      </span>
                    </div>
                  </div>
                </div>

                <HxChartDonut
                  :labels="stats?.several_months_sales?.labels"
                  :series="stats?.several_months_sales?.values"
                  color="primary"
                  :height="300"
                />
              </div>
            </div>
            <div
              class="hx-card bg-white rounded-xl col-span-12 md:col-span-6 xl:col-span-6"
            >
              <div
                class="card-body p-0 flex justify-between flex-col overflow-hidden"
              >
                <div
                  class="flex justify-between items-center flex-wrap flex-grow px-9 pt-9 pb-3"
                >
                  <div class="flex flex-col">
                    <span class="text-gray-800 block"
                      >تعداد کل سفارشات بازه ماهانه</span
                    >

                    <div
                      class="flex items-center space-x-reverse space-x-2 mt-2"
                    >
                      <span class="text-gray-500 font-bold">
                        {{ stats?.several_months_orders?.start_at }}
                      </span>
                      <span class="text-gray-400 font-light"> تا </span>
                      <span class="text-gray-500 font-bold">
                        {{ stats?.several_months_orders?.end_at }}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span class="text-blue-500 mx-1">{{
                      stats?.several_months_orders?.total
                    }}</span>
                    <span class="text-blue-500">سفارش</span>
                  </div>
                </div>

                <HxChartBar
                  :height="300"
                  :categories="stats?.several_months_orders?.labels"
                  :series="[
                    {
                      name: 'سفارشات',
                      data: stats?.several_months_orders?.values,
                    },
                  ]"
                />
              </div>
            </div>
          </div>
        </section>

        <section class="my-4">
          <div class="w-full grid grid-cols-12 gap-6">
            <!-- <div
              class="hx-card bg-white rounded-xl col-span-12 md:col-span-6 xl:col-span-6"
            >
              <div class="card-body p-0 flex justify-between flex-col">
                <div
                  class="flex justify-between items-center flex-wrap flex-grow px-9 pt-9 pb-3"
                >
                  <div class="flex flex-col">
                    <span class="text-gray-800 block">فروش</span>

                    <span class="text-gray-400 fw-bold"
                      >8 فرودین تا 18 آذر</span
                    >
                  </div>
                  <div>
                    <span class="text-blue-500 mx-1">120000000</span>
                    <span class="text-blue-500">تومان</span>
                  </div>
                </div>

                <HxAreaChart
                  :height="300"
                  :categories="[' Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']"
                  :series="[
                    {
                      name: 'Net Profit',
                      data: [30, 30, 50, 50, 35, 35],
                    },
                    {
                      name: 'Revenue',
                      data: [55, 20, 20, 20, 70, 70],
                    },
                    {
                      name: 'Expenses',
                      data: [60, 60, 40, 40, 30, 30],
                    },
                  ]"
                />
              </div>
            </div> -->
          </div>
        </section>

        <section class="my-4">
          <!-- <HxDataTable
            url="orders"
            search-placeholder="جستجوی سفارش"
            :table-header="fields"
            :enable-items-per-page-dropdown="false"
          >
            <template v-slot:cell-checkbox="{ row: customer }">
              <div
                class="form-check form-check-sm form-check-custom form-check-solid"
              >
      <hx-checkbox v-model="checkedData"></hx-checkbox>
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
              <a href="#" class="btn btn-sm btn-light btn-active-light-primary"
                >Actions
                <span class="svg-icon svg-icon-5 m-0">
                  <inline-svg src="media/icons/duotune/arrows/arr072.svg" />
                </span>
              </a>
            </template>
          </HxDataTable> -->
        </section>
      </template>
    </hx-skeleton>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, onMounted } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import StaticArea from "@/components/common/widgets/statistics/Area.vue";
import StaticCard from "@/components/common/widgets/statistics/Card.vue";
import HxChartDonut from "@/components/common/widgets/charts/Donut.vue";
import HxChartBar from "@/components/common/widgets/charts/Bar.vue";
import HxAreaChart from "@/components/common/widgets/charts/Area.vue";
import ApiService from "@/core/services/ApiService";

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

const stats = ref({});

const loading = ref(true);

onMounted(() => {
  ApiService.get("dashboard")
    .then(({ data }) => {
      stats.value = data.data;
      loading.value = false;
    })
    .catch(() => {});
});
</script>
<style></style>
