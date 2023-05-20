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
              <hx-form-group label="نوع کالا">
                <Field
                  mode="passive"
                  name="delivery"
                  v-slot="{ field }"
                  rules="required"
                  label="نوع کالا"
                >
                  <hx-select
                    v-bind="field"
                    value-key="id"
                    label="title"
                    v-model="form.delivery"
                    filterable
                    :options="deliveries"
                    placeholder="نوع ارسال"
                  />
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="delivery" />
                </div>
              </hx-form-group>

              <hx-form-group label="نوع ارسال">
                <Field
                  mode="passive"
                  name="shipment"
                  v-slot="{ field }"
                  rules="required"
                  label="نوع ارسال"
                >
                  <hx-select
                    v-bind="field"
                    value-key="id"
                    label="title"
                    v-model="form.shipment"
                    filterable
                    :options="shipments"
                    placeholder="نوع ارسال"
                  />
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="shipment" />
                </div>
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-start my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
              <hx-button
                variant="light"
                :to="{
                  name: 'shipment cities index',
                  params: { city: form.city },
                }"
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
const form = ref<any>({
  shipment: null,
  city: null,
  delivery: null,
});

const shipments = ref<Array<any>>([]);
const deliveries = ref<Array<any>>([]);

const handleCreate = async (values, { resetForm }) => {
  let formData = {
    shipment_id: form.value.shipment,
    city_id: form.value.city,
    delivery_id: form.value.delivery,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.post(
      `shipment/cities/${form.value.city}/types`,
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
    router.push({
      name: "shipment cities index",
      params: { city: form.value.city },
    });
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

form.value.city = route.params.city;

ApiService.get("shipments")
  .then(({ data }) => {
    shipments.value = data.data;
  })
  .catch(() => {});
ApiService.get("deliveries/select/items")
  .then(({ data }) => {
    deliveries.value = data.data;
  })
  .catch(() => {});
</script>
<style></style>
