<template>
  <div class="w-full">
    <Form ref="formRef" @submit="handleUpdate" class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <div class="hx-card">
          <div class="hx-card__header">
            <h4 class="text-gray-600 text-xl">اطلاعات کلی</h4>
          </div>
          <div class="hx-card__body">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 sm:col-span-6 lg:col-span-3">
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
              </div>

              <div class="col-span-12 sm:col-span-6 lg:col-span-3">
                <hx-form-group>
                  <Field
                    name="slug"
                    rules="required"
                    v-slot="{ field }"
                    label="عنوان انگلیسی"
                  >
                    <hx-input
                      v-bind="field"
                      v-model="form.slug"
                      placeholder="عنوان انگلیسی"
                    >
                    </hx-input>
                  </Field>
                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="slug" />
                  </div>
                </hx-form-group>
              </div>

              <div class="col-span-12 sm:col-span-6 lg:col-span-3">
                <hx-form-group>
                  <hx-select
                    value-key="key"
                    label="title"
                    v-model="form.status"
                    filterable
                    :options="statuses"
                    placeholder="وضعیت  "
                  />
                </hx-form-group>
              </div>

              <div class="col-span-12 sm:col-span-6 lg:col-span-3">
                <hx-form-group>
                  <hx-select
                    value-key="key"
                    label="title"
                    v-model="form.type"
                    filterable
                    :options="types"
                    placeholder="نوع روش پرداخت  "
                  />
                </hx-form-group>
              </div>

              <div class="col-span-12">
                <hx-form-group>
                  <Field
                    name="description"
                    rules="required"
                    v-slot="{ field }"
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
              </div>

              <div class="col-span-3">
                <hx-form-group label="حالت پیش فرض پرداخت">
                  <hx-switch
                    :label="form.is_default ? 'پیش فرض' : 'غیرپیش فرض'"
                    v-model="form.is_default"
                  >
                  </hx-switch>
                </hx-form-group>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-12">
        <div class="w-full flex items-center justify-between my-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <hx-button type="submit" :loading="loading"> ذخیره </hx-button>
            <hx-button variant="light" :to="{ name: 'payment-methods-index' }">
              لغو
            </hx-button>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
// @ts-ignore
import { onMounted, ref } from "vue";

import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { HxNotification } from "@/components/base/notification";
import { ErrorMessage, Field, Form } from "vee-validate";

const loading = ref(false);
const router = useRouter();
const route = useRoute();
const formRef = ref(null);
const form = ref({
  title: "",
  slug: "",
  description: "",
  status: "",
  type: "",
  is_default: true,
});

const payment_method_id = ref(null);

const statuses = ref([
  { title: "فعال", key: "enable" },
  { title: "غیرفعال", key: "disable" },
  { title: "درحال انتظار", key: "pending" },
  { title: "رد شده", key: "rejected" },
]);
const types = ref([
  { title: "پرداخت آنلاین", key: "online" },
  { title: "کیف پول", key: "wallet" },
]);

const handleUpdate = async (values, { resetForm }) => {
  let formData = {
    title: form.value.title,
    slug: form.value.slug,
    description: form.value.description,
    status: form.value.status,
    type: form.value.type,
    is_default: form.value.is_default,
  };

  loading.value = true;
  try {
    const { data } = await ApiService.put(
      `payment/methods/${payment_method_id.value}`,
      formData
    );
    resetForm();
    HxNotification.success({
      title: "ساخت روش پرداخت",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loading.value = false;
    router.push({ name: "payment-methods-index" });
  } catch (e) {}
};

const fetchData = async () => {
  try {
    const { data } = await ApiService.get(
      `payment/methods/${payment_method_id.value}`
    );
    form.value = data.data;
    if (form.value.is_default) {
      form.value.is_default = true;
    } else {
      form.value.is_default = false;
    }

    formRef.value.setValues({
      ...data.data,
    });
  } catch (e) {}
};

onMounted(() => {
  payment_method_id.value = route.params.id;
  fetchData();
});
</script>

<style scoped></style>
