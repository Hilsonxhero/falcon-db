<template>
  <div class="w-full">
    <section>
      <Form ref="formRef" @submit="handleUpdate">
        <hx-tabs v-model="activeName">
          <hx-tab-pane label="تنظیمات اولیه" name="setting">
            <Setting v-model="data" :data="data" />
          </hx-tab-pane>
          <hx-tab-pane label="ترکیبات" name="variants">
            <Variants v-model="selectedVariants" />
          </hx-tab-pane>

          <!-- <hx-tab-pane label="سئو" name="seo">سئو</hx-tab-pane> -->
        </hx-tabs>
        <div class="w-full">
          <div class="w-full flex items-center justify-between my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit"> ذخیره </hx-button>
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

<script setup lang="ts">
//@ts-nocheck
import { ref, onMounted } from "vue";
import ApiService from "@/core/services/ApiService";
import { useRouter, useRoute } from "vue-router";
import { HxNotification } from "@/components/base/notification";
import { Form } from "vee-validate";
import Variants from "@/components/app/product/create/variants.vue";
import Shipment from "@/components/app/product/create/shipment.vue";
import Setting from "@/components/app/product/create/setting.vue";

const data = ref({});
const id = ref(null);
const activeName = ref("setting");
const shipment = ref(null);
const selectedVariants = ref([]);
const router = useRouter();
const route = useRoute();
const formRef = ref(null);
const handleUpdate = async (values, { resetForm }) => {
  let formData = {
    title_fa: data.value.title_fa,
    title_en: data.value.title_en,
    review: data.value.review,
    category_id: data.value.category,
    brand_id: data.value.brand,
    warranty_id: data.value.warranty,
    status: data.value.status,
    image: JSON.stringify(data.value.image),
    variants: JSON.stringify(selectedVariants.value),
  };

  try {
    const { data } = await ApiService.put(`products/${id.value}`, formData);
    resetForm();
    HxNotification.success({
      title: "عملیات موفقیت آمیز",
      message: "ایجاد محصول با موفقیت انجام شد",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    router.push({ name: "products index" });
  } catch (e) {}
};

onMounted(() => {
  id.value = route.params.id;
  ApiService.get(`products/${id.value}`).then(({ data: product }) => {
    data.value = product.data;
    selectedVariants.value = product.data.variants;
    formRef.value.setValues({
      ...product.data,
    });
  });
});
</script>
