<template>
  <div class="w-full">
    <section>
      <Form @submit="handleCreate">
        <hx-tabs v-model="activeName">
          <hx-tab-pane label="تنظیمات اولیه" name="setting">
            <Setting v-model="data" />
          </hx-tab-pane>
          <hx-tab-pane label="ترکیبات" name="variants">
            <Variants v-model="selectedVariants" />
          </hx-tab-pane>
          <!-- <hx-tab-pane label="ارسال" name="shipment">
            <Shipment v-model="shipment" />
          </hx-tab-pane>
          <hx-tab-pane label="سئو" name="seo">سئو</hx-tab-pane> -->
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
import { ref } from "vue";

import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
import { HxNotification } from "@/components/base/notification";
import { Form } from "vee-validate";
import Variants from "@/components/app/product/create/variants.vue";
import Setting from "@/components/app/product/create/setting.vue";

const data = ref({});
const activeName = ref("setting");
const shipment = ref(null);
const selectedVariants = ref([]);
const router = useRouter();

const handleCreate = async (values, { resetForm }) => {
  let formData = new FormData();
  formData.append("title_fa", data.value.title_fa);
  formData.append("title_en", data.value.title_en);
  formData.append("review", data.value.review);
  formData.append("category_id", data.value.category);
  formData.append("brand_id", data.value.brand);
  formData.append("status", data.value.status);
  formData.append("image", JSON.stringify(data.value.image));
  formData.append("variants", JSON.stringify(selectedVariants.value));
  try {
    const { data } = await ApiService.post("products", formData);
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
</script>
