<template>
  <section class="mb-6">
    <HxDataTable
      url="comments"
      :single-item-index="index"
      search-placeholder="جستجوی عنوان"
      :table-header="tableHeader"
      :enable-items-per-page-dropdown="false"
      :on-current-change="true"
    >
      <template #left> </template>
      <template v-slot:cell-checkbox="{ row: comment }">
        <div
          class="form-check form-check-sm form-check-custom form-check-solid"
        >
          <hx-checkbox v-model="checkedData"></hx-checkbox>
        </div>
      </template>

      <template v-slot:cell-title="{ row: comment }">
        <span class="">{{ comment?.title }}</span>
      </template>

      <template v-slot:cell-commentable_title="{ row: comment }">
        <span class="">{{ comment?.commentable_title }}</span>
      </template>

      <template v-slot:cell-username="{ row: comment }">
        <span class="">{{ comment?.username }}</span>
      </template>

      <template v-slot:cell-created_at="{ row: comment }">
        <span class="">{{ comment?.created_at }}</span>
      </template>

      <template v-slot:cell-status="{ row: comment }">
        <template v-if="comment?.status == 'approved'">
          <hx-button outlined variant="success" size="sm">فعال</hx-button>
        </template>
        <template v-if="comment?.status == 'pending'">
          <hx-button outlined variant="warning" size="sm"
            >در حال انتظار</hx-button
          >
        </template>
        <template v-if="comment?.status == 'rejected'">
          <hx-button outlined variant="danger" size="sm">رد شده</hx-button>
        </template>
      </template>

      <template v-slot:cell-actions="{ row: comment }">
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{ name: 'comments edit', params: { id: comment.id } }"
        >
          <hx-icon icon="edit-alt"></hx-icon>
        </hx-button>
        <hx-button variant="gray" size="sm" icon @click="handleDelete(comment)">
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
    name: "عنوان",
    key: "title",
    sortable: true,
  },
  {
    name: "محصول",
    key: "commentable_title",
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
    `آیا از حذف نظر ${item.title} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`comments/${item.id}`).then(() => {
        index.value = item.id;
        HxNotification.success({
          title: "عملیات موفقیت آمیز",
          message: "نظر موردنظر حذف شد",
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
