<template>
  <section class="mb-6">
    <HxDataTable url="products" :single-item-index="index" search-placeholder="جستجوی محصول" :table-header="tableHeader"
      :enable-items-per-page-dropdown="false" :on-current-change="true">
      <template #left>
        <hx-button :to="{ name: 'products create' }"> محصول جدید</hx-button>
      </template>
      <template v-slot:cell-checkbox="{ row: product }">
        <div class="form-check form-check-sm form-check-custom form-check-solid">
          <input class="form-check-input" type="checkbox" :value="product.id" v-model="checkedData" />
        </div>
      </template>

      <template v-slot:cell-thumb="{ row: product }">
        <div class="flex space-x-2 space-x-reverse">
          <img class="w-14 h-14 object-cover rounded-lg" :src="product?.media?.thumb" alt="" />
        </div>
      </template>

      <template v-slot:cell-title_fa="{ row: product }">
        <span class="">{{ product?.title_fa }}</span>
      </template>

      <!-- <template v-slot:cell-title_en="{ row: product }">
        <a href="#" class="text-gray-600 text-hover-primary mb-1">
          {{ product?.title_en }}
        </a>
      </template> -->
      <template v-slot:cell-category="{ row: product }">
        {{ product.category.title }}
      </template>
      <template v-slot:cell-status="{ row: product }">
        <template v-if="product?.status == 'enable'">
          <hx-button outlined variant="success" size="sm">فعال</hx-button>
        </template>
        <template v-if="product?.status == 'disable'">
          <hx-button outlined variant="light" size="sm">غیر فعال</hx-button>
        </template>
        <template v-if="product?.status == 'pending'">
          <hx-button outlined variant="warning" size="sm">در حال انتظار
          </hx-button>
        </template>
        <template v-if="product?.status == 'rejected'">
          <hx-button outlined variant="danger" size="sm">رد شده</hx-button>
        </template>
      </template>
      <template v-slot:cell-actions="{ row: product, index: index }">
        <!-- <hx-button variant="gray" size="sm" icon :to="{ name: 'products variants', params: { id: product.id } }">
          <hx-icon icon="slider-alt"></hx-icon>
        </hx-button> -->

        <hx-button variant="gray" size="sm" icon :to="{ name: 'products gallery index', params: { id: product.id } }">
          <hx-icon icon="gallery"></hx-icon>
        </hx-button>

        <hx-button variant="gray" size="sm" icon :to="{ name: 'products features', params: { id: product.id } }">
          <hx-icon icon="slider-alt"></hx-icon>
        </hx-button>
        <hx-button variant="gray" size="sm" icon :to="{ name: 'products edit', params: { id: product.id } }">
          <hx-icon icon="edit-alt"></hx-icon>
        </hx-button>
        <hx-button variant="gray" size="sm" icon @click="handleDelete(product, index)">
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
    key: "title_fa",
    sortable: true,
  },
  // {
  //   name: "عنوان لاتین",
  //   key: "title_en",
  //   sortable: true,
  // },
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
    `آیا از حذف محصول ${item.title_fa} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`products/${item.id}`).then(() => {
        index.value = item.id;
        HxNotification.success({
          title: "عملیات موفقیت آمیز",
          message: "محصول موردنظر حذف شد",
          showClose: true,
          duration: 4000,
          position: "bottom-right",
        });
      });
    })
    .catch(() => {
    });
};
</script>
<style>

</style>
