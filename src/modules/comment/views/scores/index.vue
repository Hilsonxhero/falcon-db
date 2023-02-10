<template>
  <section class="mb-6">
    <HxDataTable url="score/models" :single-item-index="index" search-placeholder="جستجوی عنوان و .."
      :table-header="tableHeader" :enable-items-per-page-dropdown="false" :on-current-change="true">
      <template #left>
        <hx-button :to="{ name: 'score models create' }">ایجاد امتیاز </hx-button>
      </template>
      <template v-slot:cell-checkbox="{ row: score }">
        <div class="form-check form-check-sm form-check-custom form-check-solid">
          <input class="form-check-input" type="checkbox" :value="score.id" v-model="checkedData" />
        </div>
      </template>

      <template v-slot:cell-title="{ row: score }">
        <span class="">{{ score?.title }}</span>
      </template>

      <template v-slot:cell-category="{ row: score }">
        <span class="">{{ score?.category?.title }}</span>
      </template>



      <template v-slot:cell-status="{ row: score }">
        <template v-if="score?.status == 'active'">
          <hx-button outlined variant="success" size="sm">فعال</hx-button>
        </template>
        <template v-if="score?.status == 'inactive'">
          <hx-button outlined variant="light" size="sm">غیر فعال</hx-button>
        </template>

      </template>

      <template v-slot:cell-actions="{ row: score }">

        <hx-button variant="gray" size="sm" icon :to="{ name: 'score models edit', params: { id: score.id } }">
          <hx-icon icon="edit-alt"></hx-icon>
        </hx-button>
        <hx-button variant="gray" size="sm" icon @click="handleDelete(score)">
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
    key: "title",
    sortable: true,
  },
  {
    name: "دسته بندی",
    key: "category",
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
    `آیا از حذف امتیاز ${item.title} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`score/models/${item.id}`).then(() => {
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
    .catch(() => { });
};
</script>
<style>

</style>
