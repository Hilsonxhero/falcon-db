<template>
  <section class="mb-6">
    <HxDataTable
      url="articles"
      :single-item-index="index"
      search-placeholder="جستجوی مقاله"
      :table-header="tableHeader"
      :enable-items-per-page-dropdown="false"
      :on-current-change="true"
    >
      <template #left>
        <hx-button :to="{ name: 'articles create' }"> مقاله جدید</hx-button>
      </template>
      <template v-slot:cell-checkbox="{ row: article }">
        <div
          class="form-check form-check-sm form-check-custom form-check-solid"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="article.id"
            v-model="checkedData"
          />
        </div>
      </template>

      <template v-slot:cell-thumb="{ row: article }">
        <div class="flex space-x-2 space-x-reverse">
          <img
            class="w-24 h-16 object-cover rounded-lg"
            :src="article?.media?.thumb"
            alt=""
          />
        </div>
      </template>

      <template v-slot:cell-title="{ row: article }">
        <span class="">{{ article?.title }}</span>
      </template>

      <template v-slot:cell-category="{ row: article }">
        {{ article.category.title }}
      </template>
      <template v-slot:cell-status="{ row: article }">
        <template v-if="article?.status == 'enable'">
          <hx-button outlined variant="success" size="sm">فعال</hx-button>
        </template>
        <template v-if="article?.status == 'disable'">
          <hx-button outlined variant="light" size="sm">غیر فعال</hx-button>
        </template>
        <template v-if="article?.status == 'pending'">
          <hx-button outlined variant="warning" size="sm"
            >در حال انتظار
          </hx-button>
        </template>
        <template v-if="article?.status == 'rejected'">
          <hx-button outlined variant="danger" size="sm">رد شده</hx-button>
        </template>
      </template>
      <template v-slot:cell-actions="{ row: article, index: index }">
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{ name: 'articles edit', params: { id: article.id } }"
        >
          <hx-icon icon="edit-alt"></hx-icon>
        </hx-button>
        <hx-button
          variant="gray"
          size="sm"
          icon
          @click="handleDelete(article, index)"
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
    name: "تصویر",
    key: "thumb",
    sortable: false,
  },

  {
    name: "عنوان",
    key: "title",
    sortable: true,
  },
  {
    name: "دسته بندی",
    key: "category",
    sortable: false,
  },
  {
    name: "وضعیت",
    key: "status",
    sortable: false,
  },
  {
    name: "عملیات",
    key: "actions",
  },
]);

const index = ref(null);

const handleDelete = (item: any, i: any) => {
  HxMessageBox.confirm(
    `آیا از حذف مقاله ${item.title} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`articles/${item.id}`).then(() => {
        index.value = item.id;
        HxNotification.success({
          title: "عملیات موفقیت آمیز",
          message: "مقاله موردنظر حذف شد",
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
