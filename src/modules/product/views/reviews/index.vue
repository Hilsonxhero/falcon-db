<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-12">
        <HxDataTable
          @refresh="refresh = false"
          :refresh="refresh"
          :url="`products/${product_id}/reviews`"
          :single-item-index="index"
          search-placeholder="جستجوی  عنوان و .."
          :table-header="tableHeader"
          :enable-items-per-page-dropdown="false"
          :on-current-change="true"
        >
          <template #left>
            <hx-button :to="{ name: 'products reviews create' }"
              >ایجاد توضیحات</hx-button
            >
          </template>
          <template v-slot:cell-checkbox="{ row: review }">
            <hx-checkbox v-model="checkedData"></hx-checkbox>
          </template>

          <template v-slot:cell-title="{ row: review }">
            <span class="">{{ review?.title }}</span>
          </template>

          <template v-slot:cell-actions="{ row: review, index: index }">
            <hx-button
              variant="gray"
              size="sm"
              icon
              :to="{
                name: 'products reviews edit',
                params: { product: product_id, id: review.id },
              }"
            >
              <hx-icon icon="edit-alt"></hx-icon>
            </hx-button>
            <hx-button
              variant="gray"
              size="sm"
              icon
              @click="handleDelete(review, index)"
            >
              <hx-icon icon="trash"></hx-icon>
            </hx-button>
          </template>
        </HxDataTable>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// @ts-nocheck
import { provide, ref, onMounted, watch } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute } from "vue-router";

const route = useRoute();
const checkedData = ref([]);
const product_id = ref<any>(null);
const loader = ref(false);
const index = ref(null);
const refresh = ref(false);

const tableHeader = ref([
  {
    key: "checkbox",
    sortable: false,
  },
  {
    name: " عنوان",
    key: "title",
    sortable: false,
  },

  {
    name: "عملیات",
    key: "actions",
  },
]);

const handleDelete = (item: any, i: any) => {
  HxMessageBox.confirm(
    `آیا از حذف آیتم ${item.title} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`products/${product_id.value}/reviews/${item.id}`).then(
        () => {
          index.value = item.id;
          HxNotification.success({
            title: "عملیات موفقیت آمیز",
            message: "آیتم موردنظر حذف شد",
            showClose: true,
            duration: 4000,
            position: "bottom-right",
          });
        }
      );
    })
    .catch(() => {});
};

onMounted(() => {
  product_id.value = route.params.id;
});
</script>
<style></style>
