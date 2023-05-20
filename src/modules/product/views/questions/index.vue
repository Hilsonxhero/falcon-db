<template>
  <section class="mb-6">
    <HxDataTable
      url="questions"
      :single-item-index="index"
      search-placeholder="جستجوی عنوان"
      :table-header="tableHeader"
      :enable-items-per-page-dropdown="false"
      :on-current-change="true"
    >
      <template #left> </template>
      <template v-slot:cell-checkbox="{ row: question }">
        <div
          class="form-check form-check-sm form-check-custom form-check-solid"
        >
          <hx-checkbox v-model="checkedData"></hx-checkbox>
        </div>
      </template>

      <template v-slot:cell-product="{ row: question }">
        <span class="">{{ question?.product }}</span>
      </template>

      <template v-slot:cell-username="{ row: question }">
        <span class="">{{ question?.username }}</span>
      </template>

      <template v-slot:cell-created_at="{ row: question }">
        <span class="">{{ question?.created_at }}</span>
      </template>

      <template v-slot:cell-status="{ row: question }">
        <template v-if="question?.status == 'approved'">
          <hx-button outlined variant="success" size="sm">فعال</hx-button>
        </template>
        <template v-if="question?.status == 'pending'">
          <hx-button outlined variant="warning" size="sm"
            >در حال انتظار</hx-button
          >
        </template>
        <template v-if="question?.status == 'rejected'">
          <hx-button outlined variant="danger" size="sm">رد شده</hx-button>
        </template>
      </template>

      <template v-slot:cell-actions="{ row: question }">
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{ name: 'questions edit', params: { id: question.id } }"
        >
          <hx-icon icon="edit-alt"></hx-icon>
        </hx-button>
        <hx-button
          variant="gray"
          size="sm"
          icon
          @click="handleDelete(question)"
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

const checkedData = ref([]);

const index = ref(null);

const tableHeader = ref([
  {
    key: "checkbox",
    sortable: false,
  },

  {
    name: "محصول",
    key: "product",
    sortable: true,
  },
  {
    name: "کاربر",
    key: "username",
    sortable: true,
  },
  {
    name: "تاریخ ساخت",
    key: "created_at",
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
    `آیا از حذف پرسش ${item.title} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`questions/${item.id}`).then(() => {
        index.value = item.id;
        HxNotification.success({
          title: "عملیات موفقیت آمیز",
          message: "پرسش موردنظر حذف شد",
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
