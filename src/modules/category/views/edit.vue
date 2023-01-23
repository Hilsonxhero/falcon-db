<template>
  <hx-skeleton animated :loading="loading">
    <template #template>
      <hx-skeleton-item variant="card"></hx-skeleton-item>
      <hx-skeleton-item variant="card"></hx-skeleton-item>
      <div class="space-x-reverse space-x-2">
        <hx-skeleton-item variant="button"></hx-skeleton-item>
        <hx-skeleton-item variant="button"></hx-skeleton-item>
      </div>
    </template>
    <template #default>
      <div class="w-full">
        <Form
          @submit="handleUpdate"
          class="grid grid-cols-12 gap-6"
          ref="formRef"
        >
          <div class="col-span-12">
            <div class="hx-card">
              <div class="hx-card__header">
                <h4 class="text-gray-600 text-xl">اطلاعات کلی</h4>
              </div>
              <div class="hx-card__body">
                <div class="grid grid-cols-12 gap-4">
                  <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                    <hx-form-group>
                      <Field
                        name="title"
                        rules="required"
                        v-slot="{ field }"
                        label="عنوان"
                      >
                        <hx-input
                          v-bind="field"
                          v-model="form.title"
                          placeholder="عنوان"
                        ></hx-input>
                      </Field>

                      <div class="invalid-feedback d-block">
                        <ErrorMessage name="title" />
                      </div>
                    </hx-form-group>
                  </div>

                  <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                    <hx-form-group>
                      <Field
                        name="title_en"
                        rules="required"
                        v-slot="{ field }"
                        label="عنوان انگلیسی"
                      >
                        <hx-input
                          v-bind="field"
                          v-model="form.title_en"
                          placeholder="عنوان انگلیسی"
                        >
                        </hx-input>
                      </Field>
                      <div class="invalid-feedback d-block">
                        <ErrorMessage name="title_en" />
                      </div>
                    </hx-form-group>
                  </div>

                  <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                    <hx-form-group>
                      <hx-select
                        nmae="categories"
                        value-key="id"
                        label="title"
                        v-model="form.parent"
                        filterable
                        :options="categories"
                        placeholder="انتخاب دسته بندی"
                      />
                    </hx-form-group>
                  </div>

                  <div class="col-span-12">
                    <hx-form-group>
                      <Field
                        name="description"
                        rules="required"
                        v-slot="{ field }"
                        label="توضیحات"
                      >
                        <hx-textarea
                          v-bind="field"
                          v-model="form.description"
                          placeholder="توضیحات"
                        >
                        </hx-textarea>
                      </Field>
                      <div class="invalid-feedback d-block">
                        <ErrorMessage name="description" />
                      </div>
                    </hx-form-group>
                  </div>

                  <div class="col-span-3">
                    <hx-form-group>
                      <hx-switch
                        :label="form.status ? 'فعال' : 'غیرفعال'"
                        name="staus"
                        v-model="form.status"
                      >
                      </hx-switch>
                    </hx-form-group>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 space-y-4">
            <div class="hx-card">
              <div class="hx-card__header">
                <h4 class="text-gray-600 text-xl">تصویر</h4>
              </div>
              <div class="hx-card__body" v-if="form.media">
                <hx-upload
                  :max="1"
                  v-model="form.image"
                  :sources="form.media.main"
                ></hx-upload>
              </div>
            </div>
          </div>

          <div class="col-span-12">
            <div class="w-full flex items-center justify-between my-4">
              <div class="flex items-center space-x-3 space-x-reverse">
                <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
                <hx-button variant="light" :to="{ name: 'categories index' }">
                  لغو
                </hx-button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </template>
  </hx-skeleton>
</template>

<script setup lang="ts">
//@ts-nocheck
import { onMounted, ref, watchEffect } from "vue";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { HxNotification } from "@/components/base/notification";
import { ErrorMessage, Field, Form } from "vee-validate";

const categories = ref<any>([]);
const id = ref<any>(null);
const loader = ref(false);
const formRef = ref<any>(null);
const router = useRouter();
const route = useRoute();
const loading = ref<any>(true);
const form = ref({
  title: "",
  title_en: "",
  parent: null,
  description: "",
  status: true,
  image: [],
});

const fetchData = async () => {
  try {
    const { data } = await ApiService.get(`categories`);
    categories.value = data.data;
    loading.value = false;
  } catch (e) {}
};

const fetchCategory = async () => {
  try {
    const { data } = await ApiService.get(`categories/${id.value}`);
    form.value = data.data;

    formRef.value.setValues({
      ...data.data,
    });
  } catch (e) {}
};

const handleUpdate = async (values, { resetForm }) => {
  const formData = {
    title: form.value.title,
    title_en: form.value.title_en,
    description: form.value.description,
    parent: form.value.parent?.id,
    status: form.value.status,
    image: form.value.image,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.put(`categories/${id.value}`, formData);
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "categories index" });
  } catch (e) {}
};

watchEffect(() => {
  if (formRef.value) {
    formRef.value.setValues({
      ...form.value,
    });
  }
});

onMounted(() => {
  id.value = route.params.id;
  fetchData();
  fetchCategory();
});
</script>

<style scoped></style>
