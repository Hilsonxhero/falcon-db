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
              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-3">
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

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-3">
                <Field
                  name="url"
                  rules="required"
                  v-slot="{ field }"
                  label="لینک"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.url"
                    placeholder="لینک"
                  >
                  </hx-input>
                </Field>
                <div class="invalid-feedback d-block">
                  <ErrorMessage name="url" />
                </div>
              </hx-form-group>

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-3">
                <hx-select
                  nmae="pages"
                  value-key="key"
                  label="title"
                  v-model="form.type"
                  filterable
                  :options="types"
                  placeholder="انتخاب  نوع"
                />
              </hx-form-group>

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-3">
                <hx-select
                  nmae="pages"
                  value-key="key"
                  label="title"
                  v-model="form.status"
                  filterable
                  :options="statuses"
                  placeholder="انتخاب  وضعیت"
                />
              </hx-form-group>

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-3">
                <hx-select
                  nmae="pages"
                  value-key="id"
                  label="title"
                  v-model="form.page"
                  filterable
                  :options="pages"
                  placeholder="انتخاب   صفحه"
                />
              </hx-form-group>
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
            <hx-button type="submit" :loading="loading"> ذخیره</hx-button>
            <hx-button variant="light" :to="{ name: 'setting banners index' }">
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

const pages = ref<any>([]);
const loading = ref(false);
const router = useRouter();

const form = ref({
  title: "",
  url: "",
  type: "hero",
  page: null,
  status: "enable",
  image: [],
});

const statuses = ref([
  { title: "فعال", key: "enable" },
  { title: "غیرفعال", key: "disable" },
  { title: "درحال انتظار", key: "pending" },
  { title: "رد شده", key: "rejected" },
]);

const types = ref([
  { title: "بخش زیر منو", key: "hero" },
  { title: "بخش بالا", key: "top" },
  { title: "بخش میانی", key: "middle" },
  { title: "بخش پایین", key: "bottom" },
]);

const handleCreate = async (values, { resetForm }) => {
  let formData = {
    title: form.value.title,
    url: form.value.url,
    type: form.value.type,
    position: form.value.position,
    status: form.value.status,
    banner: form.value.image,
    page: form.value.page,
  };

  loading.value = true;
  try {
    const { data } = await ApiService.post("setting/banners", formData);
    resetForm();
    HxNotification.success({
      title: "عملیات موفقیت آمیز",
      message: "اسلاید   با موفقیت ایجاد شد",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });

    loading.value = false;
    router.push({ name: "setting banners index" });
  } catch (e) {
    loading.value = false;
  }
};

onMounted(async () => {
  try {
    const { data } = await ApiService.get("pages");
    pages.value = data.data;
  } catch (e) {}
});
</script>

<style scoped></style>
