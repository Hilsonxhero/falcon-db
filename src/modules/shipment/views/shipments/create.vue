<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6 xl:col-span-4">
        <Form @submit="handleCreate" class="w-full" ref="formRef">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">ایجاد روش ارسال</h4>
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
                  name="delivery_date"
                  v-slot="{ field }"
                  rules="required"
                  label="زمان تحویل"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.delivery_date"
                    placeholder="زمان تحویل"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="delivery_date" />
                </div>
              </hx-form-group>

              <hx-form-group>
                <Field
                  mode="passive"
                  name="delivery"
                  v-slot="{ field }"
                  rules="required"
                  label=" نوع ارسال کالا"
                >
                  <hx-select
                    v-bind="field"
                    value-key="id"
                    label="title"
                    v-model="form.delivery"
                    filterable
                    :options="deliveries"
                    placeholder="انتخاب  نوع ارسال کالا"
                  />
                </Field>
                <div class="invalid-feedback d-block">
                  <ErrorMessage name="delivery" />
                </div>
              </hx-form-group>

              <hx-form-group>
                <Field
                  mode="passive"
                  name="shipping_cost"
                  v-slot="{ field }"
                  rules="required"
                  label="هزینه ارسال"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.shipping_cost"
                    placeholder="هزینه ارسال"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="shipping_cost" />
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

              <hx-form-group label="ارسال پیش فرض">
                <hx-switch label="ارسال پیش فرض" v-model="form.is_default">
                </hx-switch>
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-start my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
              <hx-button variant="light" :to="{ name: 'shipments index' }">
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
import { ref, onMounted, watch, watchEffect } from "vue";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const loader = ref(false);
const formRef = ref<any>(null);
const deliveries = ref<any>([]);
const form = ref({
  description: null,
  title: null,
  delivery: null,
  shipping_cost: 0,
  is_default: false,
  delivery_date: null,
});

const handleCreate = async (values, { resetForm }) => {
  let formData = {
    title: form.value.title,
    description: form.value.description,
    shipping_cost: form.value.shipping_cost,
    is_default: form.value.is_default,
    delivery: form.value.delivery,
    delivery_date: form.value.delivery_date,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.post(`shipments`, formData);
    resetForm();
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "shipments index" });
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
  ApiService.get("deliveries/select/items")
    .then(({ data }) => {
      deliveries.value = data.data;
    })
    .catch(() => {});
});
</script>
<style></style>
