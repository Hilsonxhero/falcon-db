<template>
  <section class="mb-6">
    <HxDataTable
      :url="`shipment/cities/${shipment_city}/dates`"
      :single-item-index="index"
      search-placeholder="جستجوی  تاریخ"
      :table-header="tableHeader"
      :enable-items-per-page-dropdown="false"
      :on-current-change="true"
    >
      <template #left>
        <hx-button
          :to="{
            name: 'shipment dates create',
            params: { shipment: shipment, id: shipment_city },
          }"
        >
          نوع ارسال جدید
        </hx-button>
      </template>
      <template v-slot:cell-checkbox="{ row: shipment }">
        <div
          class="form-check form-check-sm form-check-custom form-check-solid"
        >
          <hx-checkbox v-model="checkedData"></hx-checkbox>
        </div>
      </template>

      <template v-slot:cell-type="{ row: shipment }">
        <span class="">{{ shipment?.type?.title }}</span>
      </template>

      <template v-slot:cell-date="{ row: shipment }">
        <span class="">{{ shipment?.date }}</span>
      </template>

      <template v-slot:cell-weekday_name="{ row: shipment }">
        <span class="">{{ shipment?.weekday_name }}</span>
      </template>

      <template v-slot:cell-actions="{ row: shipment, index: index }">
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{
            name: 'shipment date intervals index',
            params: { id: shipment.id },
          }"
        >
          <hx-icon icon="time"></hx-icon>
        </hx-button>
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{
            name: 'shipment dates edit',
            params: { id: shipment_city, date: shipment.id },
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
// @ts-nocheck
// @ts-ignore
import { ref, onMounted, watch } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";

const checkedData = ref([]);

const shipment_city = ref<any>(null);
const shipment = ref<any>(null);

const route = useRoute();

const tableHeader = ref([
  {
    key: "checkbox",
    sortable: false,
  },

  {
    name: "نوع ارسال",
    key: "type",
    sortable: false,
  },

  {
    name: "تاریخ",
    key: "date",
    sortable: true,
  },

  {
    name: "روز هفته",
    key: "weekday_name",
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
        `shipment/cities/${shipment_city.value}/dates/${item.id}`
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
shipment_city.value = route.params.id;
shipment.value = route.params.shipment;
// onMounted(() => {
//   shipment.value = route.params.id;
// });
</script>
<style></style>
