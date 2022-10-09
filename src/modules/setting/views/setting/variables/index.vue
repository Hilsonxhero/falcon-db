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
          <Form ref="formRef" @submit="handleCreate">
            <hx-tabs v-model="active">
              <hx-tab-pane label="تنظیمات اولیه" name="init">
                <Init v-model="form" :data="form" />
              </hx-tab-pane>
              <hx-tab-pane label="لینک ها" name="links">
                <Footer v-model="links" :data="links" />
              </hx-tab-pane>
              <!-- <hx-tab-pane label="بنر های تبلیغاتی (PADB)" name="banners">
                <Banners v-model="banners" />
              </hx-tab-pane> -->
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
//@ts-nocheck
import { ref, onMounted, watchEffect } from "vue";

import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
import { HxNotification } from "@/components/base/notification";
import { Form } from "vee-validate";
import Init from "@/modules/setting/components/init.vue";
import Footer from "@/modules/setting/components/footer.vue";
import Banners from "@/modules/setting/components/banners.vue";
const loader = ref(false);
const loading = ref(true);
const active = ref("init");
const formRef = ref(null);
const form = ref({});
const links = ref<Array<any>>([]);
const banners = ref<Array<any>>([]);
const router = useRouter();

const handleCreate = async (values, { resetForm }) => {
  let formData = new FormData();
  formData.append("site_name", form.value.site_name);
  formData.append("site_description", form.value.site_description);
  formData.append("support_text", form.value.support_text);
  formData.append("email", form.value.email);
  formData.append("phone", form.value.phone);
  formData.append("address", form.value.address);
  formData.append("copyright", form.value.copyright);
  formData.append("logo", form.value.logo);
  formData.append("thb", form.value.thb);
  formData.append("links", JSON.stringify(links.value));

  try {
    loader.value = true;
    const { data } = await ApiService.post("setting/variables", formData);
    resetForm();
    HxNotification.success({
      title: "عملیات موفقیت آمیز",
      message: "ایجاد محصول با موفقیت انجام شد",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "setting variables index" });
  } catch (e) {
    loader.value = false;
  }
};

watchEffect(() => {
  if (formRef.value) {
    formRef.value.setValues({
      ...form.value,
    });
  }
});

onMounted(() => {
  ApiService.get("setting/variables")
    .then(({ data }) => {
      loading.value = false;
      form.value = data.data;
      links.value = form.value.links;
    })
    .catch(() => {});
});
</script>
