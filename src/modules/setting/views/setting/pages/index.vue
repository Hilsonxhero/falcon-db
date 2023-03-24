<template>
  <section class="mb-6">
    <HxDataTable
      url="pages"
      :single-item-index="index"
      search-placeholder="جستجوی  عنوان"
      :table-header="fields"
      :enable-items-per-page-dropdown="false"
      :on-current-change="true"
    >
      <template #left>
        <hx-button :to="{ name: 'setting pages create' }">
          صفحه جدید
        </hx-button>
      </template>
      <template v-slot:cell-checkbox="{ row: page }">
        <hx-checkbox v-model="checkedData"></hx-checkbox>
      </template>

      <template v-slot:cell-banner="{ row: page }">
        <img
          class="rounded-md w-20 h-16 h-full object-cover"
          :src="page.banner"
          alt=""
        />
      </template>

      <template v-slot:cell-title="{ row: page }">
        {{ page?.title }}
      </template>

      <template v-slot:cell-title_en="{ row: page }">
        {{ page?.title_en }}
      </template>

      <template v-slot:cell-actions="{ row: page, index: index }">
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{ name: 'setting pages edit', params: { id: page.id } }"
        >
          <hx-icon icon="edit-alt"></hx-icon>
        </hx-button>
        <hx-button
          variant="gray"
          size="sm"
          icon
          @click="handleDelete(page, index)"
        >
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

const fields = ref([
  {
    key: "checkbox",
    sortable: false,
  },

  {
    name: "عنوان",
    key: "title",
  },
  {
    name: "عنوان لاتین",
    key: "title_en",
  },
  {
    name: "عملیات",
    key: "actions",
  },
]);

const index = ref(null);

const handleDelete = (item: any, i: any) => {
  HxMessageBox.confirm(
    `آیا از حذف صفحه ${item.title} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`pages/${item.id}`).then(() => {
        index.value = item.id;
        HxNotification.success({
          title: "عملیات موفقیت آمیز",
          message: "صفحه موردنظر حذف شد",
          showClose: true,
          duration: 4000,
          position: "bottom-right",
        });
      });
    })
    .catch(() => {});
};
</script>
