<template>
  <section class="mb-6">
    <HxDataTable
      url="states"
      :single-item-index="index"
      search-placeholder="جستجوی استان"
      :table-header="tableHeader"
      :enable-items-per-page-dropdown="false"
      :on-current-change="true"
    >
      <template #left>
        <hx-button :to="{ name: 'states create' }"> استان جدید </hx-button>
      </template>
      <template v-slot:cell-checkbox="{ row: state }">
        <div
          class="form-check form-check-sm form-check-custom form-check-solid"
        >
          <hx-checkbox v-model="checkedData"></hx-checkbox>
        </div>
      </template>

      <template v-slot:cell-name="{ row: state }">
        <div class="flex space-x-2 space-x-reverse">
          <div class="flex flex-col space-y-1">
            <span class="">{{ state?.name }}</span>
          </div>
        </div>
      </template>

      <template v-slot:cell-status="{ row: state }">
        <template v-if="state?.status == 'enable'">
          <hx-button outlined variant="success" size="sm">فعال</hx-button>
        </template>
        <template v-if="state?.status == 'disable'">
          <hx-button outlined variant="light" size="sm">غیر فعال</hx-button>
        </template>
        <template v-if="state?.status == 'pending'">
          <hx-button outlined variant="warning" size="sm"
            >در حال انتظار</hx-button
          >
        </template>
        <template v-if="state?.status == 'rejected'">
          <hx-button outlined variant="danger" size="sm">رد شده</hx-button>
        </template>
      </template>

      <template v-slot:cell-actions="{ row: state }">
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{ name: 'states cities', params: { id: state.id } }"
        >
          <hx-icon icon="buildings"></hx-icon>
        </hx-button>
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{ name: 'states edit', params: { id: state.id } }"
        >
          <hx-icon icon="edit-alt"></hx-icon>
        </hx-button>
        <hx-button variant="gray" size="sm" icon @click="handleDelete(state)">
          <hx-icon icon="trash"></hx-icon>
        </hx-button>
      </template>
    </HxDataTable>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";

const checkedData = ref([]);

const index = ref(null);

const tableHeader = ref([
  {
    key: "checkbox",
    sortable: false,
  },
  {
    name: "عنوان",
    key: "name",
    sortable: true,
  },
  {
    name: "وضعیت ",
    key: "status",
    sortable: false,
  },
  {
    name: "عملیات",
    key: "actions",
  },
]);

const handleDelete = (item: any) => {
  HxMessageBox.confirm(
    `آیا از حذف تنوع ${item.name} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`states/${item.id}`).then(() => {
        index.value = item.id;
        HxNotification.success({
          title: "عملیات موفقیت آمیز",
          message: "تنوع موردنظر حذف شد",
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
