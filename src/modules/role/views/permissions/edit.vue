<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6 xl:col-span-4">
        <Form @submit="handleUpdate" class="w-full" ref="formRef">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">
                ویرایش مجوز {{ form.name && form.name }}
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
            </div>
          </div>

          <div class="w-full flex items-center justify-start my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
              <hx-button variant="light" :to="{ name: 'permissions index' }">
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
//@ts-nocheck
import { ref, onMounted, watch } from "vue";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const formRef = ref<any>(null);
const loader = ref(false);
const form = ref({
  name: "",
});

const id = ref(null);

const fetchData = async () => {
  try {
    loading.value = true;
    const { data } = await ApiService.get(`permissions/${id.value}`);
    form.value = data.data;
    formRef.value.setValues({
      ...data.data,
    });
    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
};

const handleUpdate = async (values, { resetForm }) => {
  let formData = {
    name: form.value.name,
    type: form.value.type,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.put(`permissions/${id.value}`, formData);
    resetForm();
    HxNotification.success({
      title: "عملیات موفقیت آمیز",
      message: "ویرایش مجوز با موفقیت انجام شد",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "permissions index" });
  } catch (e) {}
};

onMounted(async () => {
  id.value = route.params.id;
  fetchData();
});
</script>
<style></style>
