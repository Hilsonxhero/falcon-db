<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6 xl:col-span-4">
        <Form @submit="handleCreate" class="w-full" ref="formRef">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">ایجاد گارانتی</h4>
            </div>
            <div class="hx-card__body">
              <hx-form-group>
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

              <hx-form-group>
                <Field
                  mode="passive"
                  name="description"
                  v-slot="{ field }"
                  rules="required"
                  label="توضیحات"
                >
                  <hx-textarea
                    v-bind="field"
                    v-model="form.description"
                    placeholder="توضیحات"
                  >
                  </hx-textarea>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="description" />
                </div>
              </hx-form-group>

              <hx-form-group>
                <hx-select
                  nmae="categories"
                  value-key="key"
                  label="title"
                  v-model="selectedStatus"
                  filterable
                  :options="statuses"
                  placeholder="انتخاب دسته بندی"
                />
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-start my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
              <hx-button variant="light" :to="{ name: 'warranties index' }">
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
  description: null,
  title: null,
  status: null,
});

const statuses = ref([
  { title: "فعال", key: "enable" },
  { title: "غیرفعال", key: "disable" },
  { title: "درحال انتظار", key: "pending" },
  { title: "رد شده", key: "rejected" },
]);
const selectedStatus = ref("enable");

const handleCreate = async (values, { resetForm }) => {
  let formData = {
    title: form.value.title,
    description: form.value.description,
    status: selectedStatus.value,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.post(`warranties`, formData);
    resetForm();
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "warranties index" });
  } catch (e) {}
};
</script>
<style></style>
