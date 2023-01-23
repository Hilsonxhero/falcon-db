<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-8">
        <HxDataTable
          @refresh="refresh = false"
          :refresh="refresh"
          :url="`products/${id}/features`"
          :single-item-index="index"
          search-placeholder="جستجوی مقدار ویژگی"
          :table-header="tableHeader"
          :enable-items-per-page-dropdown="false"
          :on-current-change="true"
        >
          <template v-slot:cell-checkbox="{ row: feature }">
            <div
              class="form-check form-check-sm form-check-custom form-check-solid"
            >
              <input
                class="form-check-input"
                type="checkbox"
                :value="feature.id"
                v-model="checkedData"
              />
            </div>
          </template>

          <template v-slot:cell-feature="{ row: feature }">
            <div class="flex space-x-2 space-x-reverse">
              <div class="flex flex-col space-y-1">
                <span class="">{{ feature?.feature.title }}</span>
              </div>
            </div>
          </template>

          <template v-slot:cell-value="{ row: feature }">
            <div
              class="overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[10rem]"
            >
              {{ feature.quantity }}
            </div>
          </template>

          <template v-slot:cell-actions="{ row: feature, index: index }">
            <hx-button
              variant="gray"
              size="sm"
              icon
              :to="{
                name: 'products feature edit',
                params: { id: id, value: feature.id },
              }"
            >
              <hx-icon icon="edit-alt"></hx-icon>
            </hx-button>
            <hx-button
              variant="gray"
              size="sm"
              icon
              @click="handleDelete(feature, index)"
            >
              <hx-icon icon="trash"></hx-icon>
            </hx-button>
          </template>
        </HxDataTable>
      </div>
      <div class="col-span-12 lg:col-span-4">
        <Form @submit="handleCreate" class="w-full">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">ایجاد ویژگی جدید</h4>
            </div>
            <div class="hx-card__body">
              <hx-form-group>
                <Field
                  name="feature"
                  rules="required"
                  v-slot="{ field }"
                  label="ویژگی"
                >
                  <hx-select
                    v-bind="field"
                    remote
                    :remote-method="handleSearch"
                    @change="handleSelectFeature"
                    value-key="id"
                    label="title"
                    v-model="form.feature"
                    filterable
                    :options="features"
                    placeholder="انتخاب  ویژگی"
                  />
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="feature" />
                </div>
              </hx-form-group>

              <hx-form-group class="my-4">
                <hx-switch
                  :label="form.custom ? 'سفارشی' : 'مقدار پیش فرض'"
                  name="staus"
                  v-model="form.custom"
                >
                </hx-switch>
              </hx-form-group>

              <hx-form-group v-if="form.custom">
                <Field
                  name="quantity"
                  :rules="{ required: form.custom }"
                  v-slot="{ field }"
                  label="مقدار سفارشی"
                >
                  <hx-textarea
                    v-bind="field"
                    v-model="form.quantity"
                    placeholder="مقدار سفارشی"
                  >
                  </hx-textarea>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="quantity" />
                </div>
              </hx-form-group>

              <hx-form-group v-else>
                <Field
                  name="value"
                  :rules="{ required: !form.custom }"
                  v-slot="{ field }"
                  label="مقدار پیش فرض"
                >
                  <hx-select
                    v-bind="field"
                    value-key="id"
                    label="title"
                    v-model="form.value"
                    filterable
                    :options="values"
                    placeholder="انتخاب  مقدار ویژگی"
                  />
                </Field>
                <div class="invalid-feedback d-block">
                  <ErrorMessage name="value" />
                </div>
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-end my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
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
    name: " ویژگی",
    key: "feature",
    sortable: false,
  },

  {
    name: "مقدار",
    key: "value",
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

const handleSearch = (query) => {
  ApiService.query(`feature/select`, {
    params: { q: query, doesnt_have_parent: 1 },
  }).then(({ data }) => {
    features.value = data.data?.data;
  });
};

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
    .catch(() => {});
};

const handleSelectFeature = (val) => {
  ApiService.get(`features/${val}/values`).then(({ data }) => {
    values.value = data.data;
  });
};

onMounted(() => {
  ApiService.query(`feature/select`, {
    params: { doesnt_have_parent: 1 },
  }).then(({ data }) => {
    features.value = data.data;
  });
});
</script>
<style></style>
