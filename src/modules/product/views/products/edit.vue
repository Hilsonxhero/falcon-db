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
        <section>
          <Form ref="formRef" @submit="handleUpdate">
            <hx-tabs v-model="activeName">
              <hx-tab-pane label="تنظیمات اولیه" name="setting">
                <Setting v-model="data" :data="data" />
              </hx-tab-pane>
              <!-- <hx-tab-pane label="ترکیبات" name="variants">
                <Variants v-model="selectedVariants" />
              </hx-tab-pane> -->

              <!-- <hx-tab-pane label="سئو" name="seo">سئو</hx-tab-pane> -->
            </hx-tabs>
            <div class="w-full">
              <div class="w-full flex items-center justify-between my-4">
                <div class="flex items-center space-x-3 space-x-reverse">
                  <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
                  <hx-button variant="light" :to="{ name: 'products index' }">
                    لغو
                  </hx-button>
                </div>
              </div>
            </div>
          </Form>
        </section>
      </div>
    </template>
  </hx-skeleton>
</template>

<script setup lang="ts">
// @ts-nocheck
// @ts-ignore
import { ref, onMounted, watchEffect } from "vue";
import ApiService from "@/core/services/ApiService";
import { useRouter, useRoute } from "vue-router";
import { HxNotification } from "@/components/base/notification";
import { Form } from "vee-validate";
import Variants from "@/modules/product/components/create/variants.vue";
import Shipment from "@/modules/product/components/create/shipment.vue";
import Setting from "@/modules/product/components/create/setting.vue";

const data = ref({});
const id = ref(null);
const activeName = ref("setting");
const loader = ref(false);
const loading = ref(true);
const selectedVariants = ref([]);
const router = useRouter();
const route = useRoute();
const formRef = ref(null);
const handleUpdate = async (values, { resetForm }) => {
  const form_data = new FormData();

  form_data.append("title_fa", data.value.title_fa);
  form_data.append("title_en", data.value.title_en);
  form_data.append("review", data.value.review.content);
  form_data.append("delivery", data.value.delivery);
  form_data.append("brand_id", data.value.brand);
  form_data.append("category_id", data.value.category);
  form_data.append("status", data.value.status);

  if (data.value.image && data.value.image.file) {
    form_data.append("image", data.value.image?.file);
  }

  // let formData = {
  //   title_fa: data.value.title_fa,
  //   title_en: data.value.title_en,
  //   review: data.value.review.content,
  //   category_id: data.value.category,
  //   delivery: data.value.delivery,
  //   brand_id: data.value.brand,
  //   warranty_id: data.value.warranty,
  //   status: data.value.status,
  //   image: JSON.stringify(data.value.image?.base64),
  //   variants: JSON.stringify(selectedVariants.value),
  // };

  try {
    loader.value = true;
    const { data } = await ApiService.put(`products/${id.value}`, form_data);
    resetForm();
    HxNotification.success({
      title: "عملیات موفقیت آمیز",
      message: "ایجاد محصول با موفقیت انجام شد",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "products index" });
  } catch (e) {
    loader.value = false;
  }
};

watchEffect(() => {
  if (formRef.value) {
    formRef.value.setValues({
      ...data.value,
    });
  }
});

const fetchData = async () => {
  try {
    const { data: product } = await ApiService.get(`products/${id.value}`);
    data.value = product.data;
    selectedVariants.value = product.data.variants;
    loading.value = false;
  } catch (e) {}
};

onMounted(() => {
  id.value = route.params.id;
  fetchData();
  // ApiService.get(`products/${id.value}`).then(({ data: product }) => {
  //   data.value = product.data;
  //   selectedVariants.value = product.data.variants;
  //   loading.value = false;
  // });
});
</script>
