<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6">
        <Form ref="formRef" @submit="handleUpdate" class="w-full">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">ویرایش دسته بندی پیشنهادی</h4>
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
                  <hx-textarea
                    v-bind="field"
                    v-model="form.description"
                    placeholder=" توضیحات"
                  >
                  </hx-textarea>
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
              <hx-button
                variant="light"
                :to="{ name: 'recommendations index' }"
              >
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
// @ts-ignore
import { provide, ref, onMounted, watch } from "vue";

import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";
import { join } from "lodash-unified";

const route = useRoute();
const router = useRouter();

const form = ref({
  description: null,
  category: null,
});
const id = ref<any>(null);
const loader = ref(false);
const refresh = ref(false);
const formRef = ref<any>(null);
const categories = ref<Array<any>>([]);

const handleUpdate = async (values, { resetForm }) => {
  let formData = {
    category_id: form.value.category,
    description: form.value.description,
  };
  loader.value = true;
  ApiService.put(`recommendations/${id.value}`, formData).then(() => {
    form.value.category = null;
    form.value.description = "";
    categories.value = [];
    resetForm();
    refresh.value = true;
    loader.value = false;
    router.push({ name: "recommendations index" });

    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
  });
};

const fetchData = () => {
  ApiService.get(`recommendations/${id.value}`).then(({ data }) => {
    form.value = data.data;
    form.value.category = form.value.category.id;
    formRef.value.setValues({
      ...data.data,
    });
  });
};

const handleSearch = (query) => {
  ApiService.query(`category/select`, {
    params: { q: query },
  }).then(({ data }) => {
    categories.value = data?.data;
  });
};

const handleSelect = (id) => {};

onMounted(() => {
  id.value = route.params.id;
  fetchData();
  ApiService.query(`category/select`, {}).then(({ data }) => {
    categories.value = data?.data;
  });
});
</script>
<style></style>
