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

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-6">
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

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-6">
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

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-12">
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
            <hx-button type="submit" :loading="loading"> ذخیره</hx-button>
            <hx-button variant="light" :to="{ name: 'setting pages index' }">
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
import TiptapEditor from "@/components/common/tiptap/tiptap-editor.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
const categories = ref<any>([]);
const loading = ref(false);
const router = useRouter();

const form = ref({
  title: "",
  title_en: "",
  content: "",
});

const handleCreate = async (values, { resetForm }) => {
  let formData = {
    title: form.value.title,
    title_en: form.value.title_en,
    content: form.value.content,
  };

  loading.value = true;
  try {
    const { data } = await ApiService.post("pages", formData);
    resetForm();
    HxNotification.success({
      title: "عملیات موفقیت آمیز",
      message: "  صفحه جدید با موفقیت ایجاد شد",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });

    loading.value = false;
    router.push({ name: "setting pages index" });
  } catch (e) {
    loading.value = false;
  }
};

onMounted(async () => {});
</script>

<style scoped></style>
