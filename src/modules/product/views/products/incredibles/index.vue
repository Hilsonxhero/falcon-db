<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-8">
        <HxDataTable @refresh="refresh = false" :refresh="refresh" :url="`product/incredibles`"
          :single-item-index="index" search-placeholder="جستجوی مقدار ویژگی" :table-header="tableHeader"
          :enable-items-per-page-dropdown="false" :on-current-change="true">
          <template v-slot:cell-checkbox="{ row: product }">
            <div class="form-check form-check-sm form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" :value="product.id" v-model="checkedData" />
            </div>
          </template>

          <template v-slot:cell-title_fa="{ row: product }">
            <span class="">{{ product?.title_fa }}</span>
          </template>

          <template v-slot:cell-discount="{ row: product }">
            <span class="">{{ product.default_variant.discount }} %</span>
          </template>

          <template v-slot:cell-discount_expire_at="{ row: product }">
            <span class="">{{
              product.default_variant.discount_expire_at
            }}</span>
          </template>

          <template v-slot:cell-variant="{ row: product }">
            <div class="flex items-center">
              <span class="ml-2" v-for="(combination, index) in product?.default_variant
              .combinations">{{ combination.label }}</span>
            </div>
          </template>

          <template v-slot:cell-actions="{ row: feature, index: index }">
            <hx-button variant="gray" size="sm" icon :to="{
              name: 'products feature edit',
              params: { id: id, value: feature.id },
            }">
              <hx-icon icon="edit-alt"></hx-icon>
            </hx-button>
            <hx-button variant="gray" size="sm" icon @click="handleDelete(feature, index)">
              <hx-icon icon="trash"></hx-icon>
            </hx-button>
          </template>
        </HxDataTable>
      </div>
      <div class="col-span-12 lg:col-span-4">
        <Form @submit="handleCreate" class="w-full">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">ایجاد محصول شگفت انگیز</h4>
            </div>
            <div class="hx-card__body">
              <hx-form-group label="محصول">
                <Field name="product" rules="required" v-slot="{ field }" label="محصول">
                  <hx-select v-bind="field" remote @change="handleSelectProduct" :remote-method="handleSearchProduct"
                    value-key="id" label="title_fa" v-model="form.product" filterable :options="products"
                    placeholder="انتخاب  محصول" />
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="product" />
                </div>
              </hx-form-group>

              <hx-form-group label="تنوع محصول">
                <Field name="variant" rules="required" v-slot="{ field }" label="تنوع محصول">
                  <hx-select v-bind="field" value-key="id" label="label" v-model="form.variant" filterable
                    :options="variants" placeholder="انتخاب  تنوع محصول" allow-create>
                  </hx-select>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="variant" />
                </div>
              </hx-form-group>

              <hx-form-group label="درصد تخفیف">
                <Field name="discount" rules="required" v-slot="{ field }" label="درصد تخفیف">
                  <hx-input v-bind="field" v-model="form.discount" placeholder="درصد تخفیف">
                  </hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="discount" />
                </div>
              </hx-form-group>

              <hx-form-group label="پایان تخفیف">
                <date-picker v-model="form.expire_at" type="datetime"></date-picker>
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-end my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره</hx-button>
              <hx-button variant="light" :to="{ name: 'products index' }">
                لغو
              </hx-button>
            </div>
          </div>
        </Form>
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
import DatePicker from "vue3-persian-datetime-picker";
import { join } from "lodash-unified";

const route = useRoute();
const checkedData = ref([]);

const form = ref({
  variant: null,
  product: null,
  discount: 0,
  expire_at: null,
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
    name: " عنوان",
    key: "title_fa",
    sortable: false,
  },
  {
    name: "درصد تخفیف",
    key: "discount",
    sortable: true,
  },

  {
    name: "پایان  تخفیف",
    key: "discount_expire_at",
    sortable: false,
  },
  {
    name: "تنوع محصول",
    key: "variant",
    sortable: false,
  },
  {
    name: "عملیات",
    key: "actions",
  },
]);

const variants = ref<Array<any>>([]);
const products = ref<Array<any>>([]);

const handleCreate = async (values, { resetForm }) => {
  let formData = {
    product: form.value.product,
    variant: form.value.variant,
    discount: form.value.discount,
    expire_at: form.value.expire_at,
  };
  loader.value = true;
  ApiService.post(`product/incredibles`, formData).then(() => {
    form.value.product = null;
    form.value.variant = null;
    form.value.discount = null;
    form.value.expire_at = null;
    products.value = [];
    variants.value = [];
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
    `آیا از حذف ویژگی ${item.feature} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`products/${id.value}/features/${item.id}`).then(() => {
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
    .catch(() => { });
};

const fetchProducts = (query = "") => {
  ApiService.query(`product/select`, {
    params: { q: query, doesnt_have_incredble: 1, doesnt_have_discount: 1 },
  }).then(({ data }) => {
    products.value = data.data;
  });
}


const handleSearchProduct = (query) => {
  fetchProducts(query)
};

const handleSelectProduct = (id) => {
  ApiService.get(`products/${id}/variants`).then(({ data }) => {
    data.data.map((variant) => {
      let combination = [];
      combination = [];
      variant.combinations.map((el) => {
        combination.push(el.label);
      });
      variants.value.push({ id: variant.id, label: join(combination, "-") });
    });
  });
};

onMounted(() => {
  fetchProducts()
});
</script>
<style>

</style>
