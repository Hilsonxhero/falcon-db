<template>
  <section></section>
  <section class="mb-6">
    <HxDataTable
      url="orders"
      :single-item-index="index"
      search-placeholder="جستجوی سفارش"
      :table-header="tableHeader"
      :enable-items-per-page-dropdown="false"
      :on-current-change="true"
    >
      <template #left>
        <!-- <div></div> -->
      </template>
      <template v-slot:cell-checkbox="{ row: order }">
        <div
          class="form-check form-check-sm form-check-custom form-check-solid"
        >
          <hx-checkbox v-model="checkedData"></hx-checkbox>
        </div>
      </template>

      <template v-slot:cell-user="{ row: order }">
        <span> {{ order?.user?.username }}</span>
      </template>

      <template v-slot:cell-payment_method="{ row: order }">
        {{ order.payment_method?.title }}
      </template>

      <template v-slot:cell-reference_code="{ row: order }">
        {{ order.reference_code }}
      </template>

      <template v-slot:cell-payable_price="{ row: order }">
        {{ order.payable_price }}
      </template>

      <template v-slot:cell-status_fa="{ row: order }">
        <div>{{ order.status_fa }}</div>
      </template>

      <template v-slot:cell-actions="{ row: order, index: index }">
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{ name: 'orders edit', params: { id: order.id } }"
        >
          <hx-icon icon="slider-alt"></hx-icon>
        </hx-button>
        <hx-button
          variant="gray"
          size="sm"
          icon
          @click="handleDelete(order, index)"
        >
          <hx-icon icon="trash"></hx-icon>
        </hx-button>
      </template>
    </HxDataTable>
  </section>
</template>

<script setup lang="ts">
// @ts-nocheck
// @ts-ignore
import { ref } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
const index = ref(null);
const checkedData = ref([]);
const tableHeader = ref([
  {
    key: "checkbox",
    sortable: false,
  },

  {
    name: "کاربر",
    key: "user",
    sortable: true,
  },
  {
    name: "روش پرداخت",
    key: "payment_method",
    sortable: true,
  },
  {
    name: "شماره سفارش ",
    key: "reference_code",
    sortable: false,
  },

  {
    name: "قابل پرداهت",
    key: "payable_price",
    sortable: false,
  },
  {
    name: "وضعیت",
    key: "status_fa",
    sortable: false,
  },
  {
    name: "عملیات",
    key: "actions",
  },
]);
const handleDelete = (item: any, i: any) => {
  HxMessageBox.confirm(
    `آیا از حذف کاربر ${item.reference_code} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`orders/${item.id}`).then(() => {
        index.value = item.id;
        HxNotification.success({
          title: "عملیات موفقیت آمیز",
          message: "کاربر موردنظر حذف شد",
          showClose: true,
          duration: 4000,
          position: "bottom-right",
        });
      });
    })
    .catch(() => {});
};
</script>
