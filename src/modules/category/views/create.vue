<template>
  <div class="w-full">
    <Form @submit="handleCreate" class="grid grid-cols-12 gap-6">
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
                    mode="passive"
                    name="title"
                    v-slot="{ field }"
                    rules="required"
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
          <div class="hx-card__body">
            <hx-upload :max="1" v-model="form.image"></hx-upload>
          </div>
        </div>
      </div>

      <div class="col-span-12">
        <div class="w-full flex items-center justify-between my-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <hx-button type="submit" :loading="loading"> ذخیره </hx-button>
            <hx-button variant="light" :to="{ name: 'categories index' }">
              لغو
            </hx-button>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
//@ts-nocheck
import { onMounted, ref } from "vue";

import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
import { HxNotification } from "@/components/base/notification";
import { ErrorMessage, Field, Form } from "vee-validate";

const categories = ref<any>([]);
const loading = ref(false);
const router = useRouter();

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
    const { data } = await ApiService.get("categories");
    categories.value = data.data;
  } catch (e) {}
};

const handleCreate = async (values, { resetForm }) => {
  let formData = new FormData();
  formData.append("title", form.value.title);
  formData.append("title_en", form.value.title_en);
  formData.append("description", form.value.description);
  formData.append("parent", form.value.parent ?? "");
  formData.append("status", "enable");
  formData.append("image", form.value.image?.base64);
  loading.value = true;
  try {
    const { data } = await ApiService.post("categories", formData);
    resetForm();
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loading.value = false;
    router.push({ name: "categories index" });
  } catch (e) {}
};

fetchData();

onMounted(() => {});
</script>

<style scoped></style>
