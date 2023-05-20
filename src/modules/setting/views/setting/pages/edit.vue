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
                  <hx-form-group
                    class="col-span-12 sm:col-span-6 lg:col-span-6"
                  >
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

                  <hx-form-group
                    class="col-span-12 sm:col-span-6 lg:col-span-6"
                  >
                    <Field
                      mode="passive"
                      name="title_en"
                      v-slot="{ field }"
                      rules="required"
                      label="عنوان لاتین"
                    >
                      <hx-input
                        v-bind="field"
                        v-model="form.title_en"
                        placeholder="عنوان لاتین"
                      ></hx-input>
                    </Field>

                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="title_en" />
                    </div>
                  </hx-form-group>

                  <hx-form-group
                    class="col-span-12 sm:col-span-6 lg:col-span-12"
                  >
                    <Field
                      mode="passive"
                      name="title_en"
                      v-slot="{ field }"
                      rules="required"
                      label="عنوان"
                    >
                      <TiptapEditor
                        v-bind="field"
                        v-model="form.content"
                        :content="form.content"
                        placeholder="متن صفحه"
                        ref="tiptap"
                      >
                      </TiptapEditor>
                    </Field>

                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="title_en" />
                    </div>
                  </hx-form-group>
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-12">
            <div class="w-full flex items-center justify-between my-4">
              <div class="flex items-center space-x-3 space-x-reverse">
                <hx-button type="submit" :loading="loader"> ذخیره</hx-button>
                <hx-button
                  variant="light"
                  :to="{ name: 'setting pages index' }"
                >
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
// @ts-nocheck
// @ts-ignore
import { onMounted, ref, watchEffect } from "vue";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { HxNotification } from "@/components/base/notification";
import TiptapEditor from "@/components/common/tiptap/tiptap-editor.vue";
import { ErrorMessage, Field, Form } from "vee-validate";

const id = ref<any>(null);
const loader = ref(false);
const formRef = ref<any>(null);
const router = useRouter();
const route = useRoute();
const loading = ref<any>(true);
const form = ref({
  title: "",
  title_en: "",
  content: "",
});

watchEffect(() => {
  if (formRef.value) {
    formRef.value.setValues({
      ...form.value,
    });
  }
});

const handleUpdate = async (values, { resetForm }) => {
  let formData = {
    title: form.value.title,
    title_en: form.value.title_en,
    content: form.value.content,
  };
  try {
    loader.value = true;
    const { data } = await ApiService.put(`pages/${id.value}`, formData);
    HxNotification.success({
      title: "عملیات موفقیت آمیز",
      message: "اپدیت صفحه با موفقیت انجام شد",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "setting pages index" });
  } catch (e) {}
};

onMounted(async () => {
  id.value = route.params.id;
  try {
    const { data } = await ApiService.get(`pages/${id.value}`);
    form.value = data.data;
    loading.value = false;
  } catch (e) {}
});
</script>

<style scoped></style>
