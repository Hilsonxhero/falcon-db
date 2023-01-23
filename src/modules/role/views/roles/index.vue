<template>
  <section class="mb-6">
    <HxDataTable
      url="roles"
      :single-item-index="index"
      search-placeholder="جستجوی نقش کاربری"
      :table-header="tableHeader"
      :enable-items-per-page-dropdown="false"
      :on-current-change="true"
    >
      <template #left>
        <hx-button :to="{ name: 'roles create' }"> ایجاد نقش کاربری </hx-button>
      </template>
      <template v-slot:cell-checkbox="{ row: permission }">
        <div
          class="form-check form-check-sm form-check-custom form-check-solid"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="permission.id"
            v-model="checkedData"
          />
        </div>
      </template>

      <template v-slot:cell-name="{ row: permission }">
        <span class="">{{ permission?.name }}</span>
      </template>

      <template v-slot:cell-actions="{ row: permission }">
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{ name: 'roles edit', params: { id: permission.id } }"
        >
          <hx-icon icon="edit-alt"></hx-icon>
        </hx-button>
        <hx-button
          variant="gray"
          size="sm"
          icon
          @click="handleDelete(permission)"
        >
          <hx-icon icon="trash"></hx-icon>
        </hx-button>
      </template>
    </HxDataTable>
  </section>
</template>

<script setup lang="ts">
//@ts-nocheck
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
    name: "عملیات",
    key: "actions",
  },
]);

const handleDelete = (item: any) => {
  HxMessageBox.confirm(
    `آیا از حذف نقش کاربری ${item.name} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`roles/${item.id}`).then(() => {
        index.value = item.id;
        HxNotification.success({
          title: "عملیات موفقیت آمیز",
          message: "نقش کاربری موردنظر حذف شد",
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
