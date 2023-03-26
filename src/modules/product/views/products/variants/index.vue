<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-12">
        <HxDataTable
          @refresh="refresh = false"
          :refresh="refresh"
          :url="`products/${id}/variants`"
          :single-item-index="index"
          search-placeholder="جستجوی  عنوان"
          :table-header="tableHeader"
          :enable-items-per-page-dropdown="false"
          :on-current-change="true"
        >
          <template #left>
            <hx-button :to="{ name: 'products variants create' }">
              تنوع جدید</hx-button
            >
          </template>

          <template v-slot:cell-checkbox="{ row: feature }">
            <div
              class="form-check form-check-sm form-check-custom form-check-solid"
            >
              <hx-checkbox v-model="checkedData"></hx-checkbox>
            </div>
          </template>

          <template v-slot:cell-combinations="{ row: variant }">
            <div class="flex w-[150px]">
              <span
                class="ml-2"
                v-for="(combination, index) in variant?.combinations"
                :key="index"
                >{{ combination.label }}</span
              >
            </div>
          </template>

          <template v-slot:cell-warranty="{ row: product }">
            {{ product.warranty.title }}
          </template>

          <template v-slot:cell-shipment="{ row: product }">
            {{ product.shipment.title }}
          </template>

          <template v-slot:cell-price="{ row: product }">
            <div class="w-[100px]">
              {{ $filters.separate(product.price) }}
            </div>
          </template>

          <template v-slot:cell-stock="{ row: product }">
            {{ product.stock }}
          </template>

          <template v-slot:cell-discount="{ row: product }">
            {{ product.discount }}
          </template>

          <template v-slot:cell-discount_expire_at="{ row: product }">
            <div v-if="product.discount_expire_at">
              {{ product.discount_expire_at }}
            </div>
            <div v-else>ندارد</div>
          </template>

          <template v-slot:cell-order_limit="{ row: product }">
            {{ product.order_limit }}
          </template>

          <template v-slot:cell-actions="{ row: variant, index: index }">
            <div class="flex items-center w-[150px]">
              <hx-button
                variant="gray"
                size="sm"
                icon
                :to="{
                  name: 'products variant edit',
                  params: { id: id, value: variant.id },
                }"
              >
                <hx-icon icon="edit-alt"></hx-icon>
              </hx-button>
              <hx-button
                variant="gray"
                size="sm"
                icon
                @click="handleDelete(variant, index)"
              >
                <hx-icon icon="trash"></hx-icon>
              </hx-button>
            </div>
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

const route = useRoute();
const checkedData = ref([]);

const form = ref({
  feature: null,
  value: null,
  quantity: null,
  custom: false,
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
    name: " تنوع",
    key: "combinations",
    sortable: false,
  },

  {
    name: "گارانتی",
    key: "warranty",
    sortable: true,
  },

  {
    name: "روش ارسال",
    key: "shipment",
    sortable: true,
  },
  {
    name: "قیمت",
    key: "price",
    sortable: true,
  },
  {
    name: "تعداد",
    key: "stock",
    sortable: true,
  },
  {
    name: "درصد تخفیف",
    key: "discount",
    sortable: true,
  },
  {
    name: "پایان تخفیف",
    key: "discount_expire_at",
    sortable: false,
  },

  {
    name: "حداکثر تعداد خرید",
    key: "order_limit",
    sortable: true,
  },

  {
    name: "عملیات",
    key: "actions",
  },
]);

const features = ref<Array<any>>([]);
const values = ref<Array<any>>([]);

watch(
  () => form.value.custom,
  (val, oldVal) => {
    if (val) form.value.value = null;
    form.value.quantity = null;
  }
);

const handleCreate = async (values, { resetForm }) => {
  let formData = {
    product_id: id.value,
    feature_id: form.value.feature,
    feature_value_id: form.value.value,
    value: form.value.quantity,
  };
  loader.value = true;
  ApiService.post(`products/${id.value}/features`, formData).then(() => {
    form.value.feature = null;
    form.value.value = null;
    form.value.quantity = null;
    form.value.custom = false;
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
  HxMessageBox.confirm(`آیا از حذف این تنوع اطمینان دارید ؟!`, "پیام تایید", {
    confirmButtonText: "تایید",
    cancelButtonText: "لغو",
    type: "warning",
  })
    .then(() => {
      ApiService.delete(`products/${id.value}/variants/${item.id}`).then(() => {
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
    .catch(() => {});
};

// const handleSelectFeature = (val) => {
//   ApiService.get(`products/${val}/variants`).then(({data}) => {
//     values.value = data.data;
//   });
// };

onMounted(() => {
  ApiService.get(`features`).then(({ data }) => {
    features.value = data.data;
  });
});
</script>
<style></style>
