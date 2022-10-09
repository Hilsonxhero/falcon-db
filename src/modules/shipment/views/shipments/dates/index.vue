<template>
  <section class="mb-6">
    <HxDataTable
      :url="`shipment/cities/${shipment}/dates`"
      :single-item-index="index"
      search-placeholder="جستجوی  تاریخ"
      :table-header="tableHeader"
      :enable-items-per-page-dropdown="false"
      :on-current-change="true"
    >
      <template #left>
        <hx-button :to="{ name: 'shipment types create' }">
          نوع ارسال جدید
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

      <template v-slot:cell-shipment="{ row: shipment }">
        <span class="">{{ shipment?.shipment?.title }}</span>
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
          :to="{ name: 'shipment types edit', params: { id: shipment.id } }"
        >
          <hx-icon icon="calendar"></hx-icon>
        </hx-button>
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{ name: 'shipment types edit', params: { id: shipment.id } }"
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

const shipment = ref<any>(null);

const route = useRoute();

const tableHeader = ref([
  {
    key: "checkbox",
    sortable: false,
  },

  {
    name: "نوع ارسال",
    key: "shipment",
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
    `آیا از حذف نوع ارسال ${item.title} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`shipment/types/${item.id}`).then(() => {
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
shipment.value = route.params.id;
// onMounted(() => {
//   shipment.value = route.params.id;
// });
</script>
<style></style>
