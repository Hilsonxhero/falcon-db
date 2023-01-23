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
        <Form @submit="handleUpdate" class="grid grid-cols-12 gap-6" ref="formRef">
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
                      <ErrorMessage name="title"/>
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
                      <ErrorMessage name="url"/>
                    </div>
                  </hx-form-group>

                  <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-3">
                    <hx-select
                        nmae="categories"
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
                        nmae="categories"
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
                        nmae="categories"
                        value-key="id"
                        label="title"
                        v-model="form.category"
                        filterable
                        :options="categories"
                        placeholder="انتخاب  دسته بندی"
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
                <hx-upload :max="1" v-model="form.image" :sources="form.banner"></hx-upload>
              </div>
            </div>
          </div>

          <div class="col-span-12">
            <div class="w-full flex items-center justify-between my-4">
              <div class="flex items-center space-x-3 space-x-reverse">
                <hx-button type="submit" :loading="loader"> ذخیره</hx-button>
                <hx-button variant="light" :to="{ name: 'categories banners index' }">
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
import {onMounted, ref, watchEffect} from "vue";
import ApiService from "@/core/services/ApiService";
import {useRoute, useRouter} from "vue-router";
import {HxNotification} from "@/components/base/notification";
import {ErrorMessage, Field, Form} from "vee-validate";

const categories = ref<any>([]);
const id = ref<any>(null);
const loader = ref(false);
const formRef = ref<any>(null);
const router = useRouter();
const route = useRoute();
const loading = ref<any>(true);
const form = ref({
  title: "",
  url: "",
  type: 'top',
  categgory: null,
  status: 'enable',
  image: [],
});


const statuses = ref([
  {title: "فعال", key: "enable"},
  {title: "غیرفعال", key: "disable"},
  {title: "درحال انتظار", key: "pending"},
  {title: "رد شده", key: "rejected"},
]);

const types = ref([
  {title: "بخش بالا", key: "top"},
]);


const fetchCategory = async () => {
  try {
    const {data} = await ApiService.get(`category/banners/${id.value}`);
    form.value = data.data;
    loading.value = false;
  } catch (e) {

  }
};

watchEffect(() => {
  if (formRef.value) {
    formRef.value.setValues({
      ...form.value,
    });
  }
})

const handleUpdate = async (values, {resetForm}) => {
  let formData = {
    title: form.value.title,
    url: form.value.url,
    type: form.value.type,
    position: form.value.position,
    status: form.value.status,
    banner: form.value.image,
    category: form.value.category,
  }
  try {
    loader.value = true;
    const {data} = await ApiService.put(`category/banners/${id.value}`, formData);
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({name: "categories banners index"});
  } catch (e) {
  }
};

onMounted(() => {
  id.value = route.params.id;

  ApiService.get(`categories`).then(({data}) => {
    categories.value = data.data;

  });


  fetchCategory();
});
</script>

<style scoped></style>
