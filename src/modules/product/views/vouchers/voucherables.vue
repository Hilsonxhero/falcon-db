<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-12">
        <HxDataTable
          @refresh="refresh = false"
          :refresh="refresh"
          :url="`voucher/${id}/voucherables`"
          :single-item-index="index"
          search-placeholder="جستجوی  عنوان و.."
          :table-header="tableHeader"
          :enable-items-per-page-dropdown="false"
          :on-current-change="true"
        >
          <template #left>
            <hx-button :to="{ name: 'vouchers voucherables create' }">
              کد تخفیف جدید</hx-button
            >
          </template>

          <template v-slot:cell-checkbox="{ row: voucher }">
            <hx-checkbox v-model="checkedData"></hx-checkbox>
          </template>

          <template v-slot:cell-voucherable_title="{ row: voucher }">
            <span class="">{{ voucher?.voucherable_title }}</span>
          </template>

          <template v-slot:cell-type="{ row: voucher }">
            <span class="">{{ voucher?.type }}</span>
          </template>

          <template v-slot:cell-actions="{ row: voucher, index: index }">
            <hx-button
              variant="gray"
              size="sm"
              icon
              @click="handleDelete(voucher, index)"
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
import { ErrorMessage, Field, Form } from "vee-validate";
import { join } from "lodash-unified";

const route = useRoute();
const checkedData = ref([]);

const form = ref({
  description: null,
  category: null,
});
const id = ref<any>(null);
const loader = ref(false);
const index = ref(null);
const refresh = ref(false);

id.value = route.params.id;

const tableHeader = ref([
  {
    key: "checkbox",
    sortable: false,
  },
  {
    name: "عنوان",
    key: "voucherable_title",
    sortable: false,
  },
  {
    name: "نوع",
    key: "type",
    sortable: false,
  },
  {
    name: "عملیات",
    key: "actions",
  },
]);

const categories = ref<Array<any>>([]);
const products = ref<Array<any>>([]);

const handleCreate = async (values, { resetForm }) => {
  let formData = {
    category_id: form.value.category,
    description: form.value.description,
  };
  loader.value = true;
  ApiService.post(`vouchers`, formData).then(() => {
    form.value.category = null;
    form.value.description = "";
    categories.value = [];
    resetForm();
    refresh.value = true;
    loader.value = false;
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
  });
};

const handleDelete = (item: any, i: any) => {
  HxMessageBox.confirm(
    `آیا از حذف کد تخفیف ${item.voucherable_title} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`voucherables/${item.id}`).then(() => {
        index.value = item.id;
        HxNotification.success({
          title: "عملیات موفقیت آمیز",
          message: "ویژگی موردنظر حذف شد",
          showClose: true,
          duration: 4000,
          position: "bottom-right",
        });
      });
    })
    .catch(() => {});
};

const handleSearch = (query) => {
  ApiService.query(`category/select`, {
    params: { q: query },
  }).then(({ data }) => {
    categories.value = data?.data;
  });
};

const handleSelect = (id) => {};

onMounted(() => {});
</script>
<style></style>
