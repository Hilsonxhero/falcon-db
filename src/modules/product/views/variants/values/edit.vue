<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6 xl:col-span-4">
        <Form @submit="handleUpdate" class="w-full" ref="formRef">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">
                ویرایش مقدار {{ form.name && form.name }}
              </h4>
            </div>
            <div class="hx-card__body">
              <hx-form-group>
                <Field
                  mode="passive"
                  name="name"
                  v-slot="{ field }"
                  rules="required"
                  label="عنوان"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.name"
                    placeholder="عنوان"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="name" />
                </div>
              </hx-form-group>

              <hx-form-group>
                <Field
                  mode="passive"
                  name="value"
                  v-slot="{ field }"
                  rules="required"
                  label="مقدار"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.value"
                    placeholder="مقدار"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="value" />
                </div>
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-start my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
              <hx-button
                variant="light"
                :to="{ name: 'variants values', params: { id: id } }"
              >
                لغو
              </hx-button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// @ts-nocheck
// @ts-ignore
import { ref, onMounted, watch } from "vue";

import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const loader = ref(false);
const formRef = ref<any>(null);
const form = ref({
  name: "",
  value: "",
});
const id = ref(null);
const variant = ref(null);
const fetchData = async () => {
  try {
    loading.value = true;
    const { data } = await ApiService.get(`variants/${variant.value}`);
    form.value = data.data;
    formRef.value.setValues({
      ...data.data,
    });
    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
};

onMounted(() => {
  id.value = route.params.id;
  variant.value = route.params.value;
  fetchData();
});

const handleUpdate = async (values, { resetForm }) => {
  let formData = {
    name: form.value.name,
    value: form.value.value,
    variant_group_id: id.value,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.put(
      `variants/${variant.value}`,
      formData
    );
    resetForm();
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "variants values", params: { id: id.value } });
  } catch (e) {}
};
</script>
<style></style>
