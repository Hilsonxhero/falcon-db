<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-8">
        <HxDataTable
          @refresh="refresh = false"
          :refresh="refresh"
          :url="`recommendations`"
          :single-item-index="index"
          search-placeholder="جستجوی  عنوان و.."
          :table-header="tableHeader"
          :enable-items-per-page-dropdown="false"
          :on-current-change="true"
        >
          <template v-slot:cell-checkbox="{ row: recommendation }">
            <div
              class="form-check form-check-sm form-check-custom form-check-solid"
            >
              <hx-checkbox v-model="checkedData"></hx-checkbox>
            </div>
          </template>

          <template v-slot:cell-title="{ row: recommendation }">
            <span class="">{{ recommendation?.title }}</span>
          </template>

          <template v-slot:cell-description="{ row: recommendation }">
            <span class="">{{ recommendation?.description }}</span>
          </template>

          <template v-slot:cell-actions="{ row: recommendation, index: index }">
            <hx-button
              variant="gray"
              size="sm"
              icon
              :to="{
                name: 'recommendation products index',
                params: { id: recommendation.id },
              }"
            >
              <hx-icon icon="cog"></hx-icon>
            </hx-button>
            <hx-button
              variant="gray"
              size="sm"
              icon
              :to="{
                name: 'recommendations edit',
                params: { id: recommendation.id },
              }"
            >
              <hx-icon icon="edit-alt"></hx-icon>
            </hx-button>
            <hx-button
              variant="gray"
              size="sm"
              icon
              @click="handleDelete(recommendation, index)"
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
              <h4 class="text-gray-600 text-xl">ایجاد دسته بندی پیشنهادی</h4>
            </div>
            <div class="hx-card__body">
              <hx-form-group label="دسته بندی">
                <Field
                  name="product"
                  rules="required"
                  v-slot="{ field }"
                  label="دسته بندی"
                >
                  <hx-select
                    v-bind="field"
                    remote
                    @change="handleSelect"
                    :remote-method="handleSearch"
                    value-key="id"
                    label="title"
                    v-model="form.category"
                    filterable
                    :options="categories"
                    placeholder="انتخاب  دسته بندی"
                  />
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="product" />
                </div>
              </hx-form-group>

              <hx-form-group label=" توضیحات">
                <Field
                  name="description"
                  rules="required"
                  v-slot="{ field }"
                  label=" توضیحات"
                >
                  <hx-input
                    type="textarea"
                    v-bind="field"
                    v-model="form.description"
                    placeholder=" توضیحات"
                  >
                  </hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="description" />
                </div>
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-end my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره</hx-button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// @ts-nocheck
// @ts-ignore
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
    name: " دسته بندی",
    key: "title",
    sortable: false,
  },
  {
    name: "توضیحات",
    key: "description",
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
  ApiService.post(`recommendations`, formData).then(() => {
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
    `آیا از حذف ویژگی ${item.title} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`recommendations/${item.id}`).then(() => {
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

const fetchCategories = (query = "") => {
  ApiService.query(`category/select`, {
    params: { q: query },
  }).then(({ data }) => {
    categories.value = data?.data;
  });
};

const handleSearch = (query) => {
  fetchCategories(query);
};

const handleSelect = (id) => {};

onMounted(() => {
  fetchCategories();
});
</script>
<style></style>
