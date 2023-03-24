<template>
  <section class="mb-6">
    <HxDataTable
      url="shipments"
      :single-item-index="index"
      search-placeholder="جستجوی انواع ارسال"
      :table-header="tableHeader"
      :enable-items-per-page-dropdown="false"
      :on-current-change="true"
    >
      <template #left>
        <hx-button :to="{ name: 'shipments create' }">
          نوع ارسال جدید
        </hx-button>
      </template>
      <template v-slot:cell-checkbox="{ row: shipment }">
        <hx-checkbox v-model="checkedData"></hx-checkbox>
      </template>

      <template v-slot:cell-title="{ row: shipment }">
        <span class="">{{ shipment?.title }}</span>
      </template>

      <template v-slot:cell-actions="{ row: shipment, index: index }">
        <!-- <hx-button
            variant="gray"
            size="sm"
            icon
            :to="{ name: 'shipment dates index', params: { id: shipment.id } }"
          >
            <hx-icon icon="calendar"></hx-icon>
          </hx-button> -->
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{ name: 'shipments edit', params: { id: shipment.id } }"
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

const tableHeader = ref([
  {
    key: "checkbox",
    sortable: false,
  },

  {
    name: "عنوان",
    key: "title",
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
      ApiService.delete(`shipments/${item.id}`).then(() => {
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
</script>
<style></style>
