<template>
  <section class="mb-6">
    <HxDataTable
      :url="`shipment/dates/${shipment_date}/intervals`"
      :single-item-index="index"
      search-placeholder="جستجوی  تاریخ"
      :table-header="tableHeader"
      :enable-items-per-page-dropdown="false"
      :on-current-change="true"
    >
      <template #left>
        <hx-button
          :to="{
            name: 'shipment date intervals create',
            params: { id: shipment_date },
          }"
        >
          بازه زمانی جدید
        </hx-button>
      </template>
      <template v-slot:cell-checkbox="{ row: shipment }">
        <div
          class="form-check form-check-sm form-check-custom form-check-solid"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="shipment.id"
            v-model="checkedData"
          />
        </div>
      </template>

      <template v-slot:cell-shipment_date="{ row: shipment }">
        <span class="">{{ shipment?.shipment_date?.date }}</span>
      </template>

      <template v-slot:cell-start_at="{ row: shipment }">
        <span class="">{{ shipment?.start_at }}</span>
      </template>

      <template v-slot:cell-end_at="{ row: shipment }">
        <span class="">{{ shipment?.end_at }}</span>
      </template>

      <template v-slot:cell-shipping_cost="{ row: shipment }">
        <span class=""> {{ $filters.separate(shipment?.shipping_cost) }}</span>
      </template>

      <template v-slot:cell-order_capacity="{ row: shipment }">
        <span class="">{{ shipment?.order_capacity }}</span>
      </template>

      <template v-slot:cell-actions="{ row: shipment, index: index }">
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{
            name: 'shipment date intervals edit',
            params: { id: shipment_date, interval: shipment.id },
          }"
        >
          <hx-icon icon="edit-alt"></hx-icon>
        </hx-button>
        <hx-button
          variant="gray"
          size="sm"
          icon
          @click="handleDelete(shipment, index)"
        >
          <hx-icon icon="trash"></hx-icon>
        </hx-button>
      </template>
    </HxDataTable>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";

const checkedData = ref([]);

const shipment_date = ref<any>(null);

const route = useRoute();

const tableHeader = ref([
  {
    key: "checkbox",
    sortable: false,
  },

  {
    name: "تاریخ",
    key: "shipment_date",
    sortable: false,
  },

  {
    name: "ساعت شروع",
    key: "start_at",
    sortable: true,
  },

  {
    name: " ساعت پایان",
    key: "end_at",
    sortable: true,
  },

  {
    name: "ظرفیت",
    key: "order_capacity",
    sortable: true,
  },
  {
    name: "هزینه ارسال",
    key: "shipping_cost",
    sortable: true,
  },

  {
    name: "عملیات",
    key: "actions",
  },
]);

const index = ref(null);

const handleDelete = (item: any, i: any) => {
  HxMessageBox.confirm(
    `آیا از حذف نوع ارسال ${item?.shipment?.title} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(
        `shipment/dates/${shipment_date.value}/intervals/${item.id}`
      ).then(() => {
        index.value = item.id;
        HxNotification.success({
          title: "عملیات موفقیت آمیز",
          message: "روش ارسال موردنظر حذف شد",
          showClose: true,
          duration: 4000,
          position: "bottom-right",
        });
      });
    })
    .catch(() => {});
};
shipment_date.value = route.params.id;
// onMounted(() => {
//   shipment.value = route.params.id;
// });
</script>
<style></style>
