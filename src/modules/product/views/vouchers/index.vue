<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-12">
        <HxDataTable
          @refresh="refresh = false"
          :refresh="refresh"
          :url="`vouchers`"
          :single-item-index="index"
          search-placeholder="جستجوی  عنوان و.."
          :table-header="tableHeader"
          :enable-items-per-page-dropdown="false"
          :on-current-change="true"
        >
          <template #left>
            <hx-button :to="{ name: 'vouchers create' }">
              کد تخفیف جدید</hx-button
            >
          </template>

          <template v-slot:cell-checkbox="{ row: voucher }">
            <div
              class="form-check form-check-sm form-check-custom form-check-solid"
            >
              <hx-checkbox v-model="checkedData"></hx-checkbox>
            </div>
          </template>

          <template v-slot:cell-code="{ row: voucher }">
            <span class="">{{ voucher?.code }}</span>
          </template>

          <template v-slot:cell-value="{ row: voucher }">
            <span class="">{{ voucher?.value }}</span>
          </template>
          <template v-slot:cell-minimum_spend="{ row: voucher }">
            <span class="">{{ voucher?.minimum_spend }}</span>
          </template>
          <template v-slot:cell-maximum_spend="{ row: voucher }">
            <span class="">{{ voucher?.maximum_spend }}</span>
          </template>
          <template v-slot:cell-usage_limit_per_voucher="{ row: voucher }">
            <span class="">{{ voucher?.usage_limit_per_voucher }}</span>
          </template>
          <template v-slot:cell-usage_limit_per_customer="{ row: voucher }">
            <span class="">{{ voucher?.usage_limit_per_customer }}</span>
          </template>
          <template v-slot:cell-used="{ row: voucher }">
            <span class="">{{ voucher?.used }}</span>
          </template>
          <template v-slot:cell-is_active="{ row: voucher }">
            <template v-if="voucher.is_active">
              <hx-button outlined variant="success" size="sm">فعال</hx-button>
            </template>
            <template v-else>
              <hx-button outlined variant="light" size="sm">غیر فعال</hx-button>
            </template>
          </template>
          <template v-slot:cell-start_date="{ row: voucher }">
            <span class="">{{ voucher?.start_date }}</span>
          </template>
          <template v-slot:cell-end_date="{ row: voucher }">
            <span class="">{{ voucher?.end_date }}</span>
          </template>

          <template v-slot:cell-actions="{ row: voucher, index: index }">
            <hx-button
              variant="gray"
              size="sm"
              icon
              :to="{
                name: 'vouchers voucherables index',
                params: { id: voucher.id },
              }"
            >
              <hx-icon icon="filter-add"></hx-icon>
            </hx-button>
            <hx-button
              variant="gray"
              size="sm"
              icon
              :to="{
                name: 'vouchers edit',
                params: { id: voucher.id },
              }"
            >
              <hx-icon icon="edit-alt"></hx-icon>
            </hx-button>
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
    name: "کد",
    key: "code",
    sortable: false,
  },
  {
    name: "مقدار",
    key: "value",
    sortable: false,
  },
  {
    name: "حداقل هزیه",
    key: "minimum_spend",
    sortable: false,
  },
  {
    name: "حداکثر هزینه",
    key: "maximum_spend",
    sortable: false,
  },
  {
    name: "دفعات استفاده شده",
    key: "used",
    sortable: false,
  },
  {
    name: "وضعیت",
    key: "is_active",
    sortable: false,
  },
  {
    name: "شروع تخفیف",
    key: "start_date",
    sortable: false,
  },
  {
    name: "پایان تخفیف",
    key: "end_date",
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
    `آیا از حذف کد تخفیف ${item.code} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`vouchers/${item.id}`).then(() => {
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
