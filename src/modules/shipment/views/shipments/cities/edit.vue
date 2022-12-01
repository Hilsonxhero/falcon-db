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
      <section class="mb-6">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 lg:col-span-6 xl:col-span-4">
            <Form @submit="handleUpdate" class="w-full" ref="formRef">
              <div class="hx-card">
                <div class="hx-card__header">
                  <h4 class="text-gray-600 text-xl">ایجاد روش ارسال</h4>
                </div>
                <div class="hx-card__body">
                  <hx-form-group label="نوع کالا">
                    <Field
                      mode="passive"
                      name="type"
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
                      <ErrorMessage name="type" />
                    </div>
                  </hx-form-group>
                  <hx-form-group label="نوع ارسال">
                    <Field
                      mode="passive"
                      name="type"
                      v-slot="{ field }"
                      rules="required"
                      label="نوع ارسال"
                    >
                      <hx-select
                        v-bind="field"
                        value-key="id"
                        label="title"
                        v-model="form.type"
                        filterable
                        :options="types"
                        placeholder="نوع ارسال"
                      />
                    </Field>

                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="type" />
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
                      name: 'shipment dates index',
                      params: { id: form.city },
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
  </hx-skeleton>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from "vue";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const loader = ref(false);
const formRef = ref<any>(null);
const form = ref<any>({
  type: null,
  city: null,
  delivery: null,
});

const types = ref<Array<any>>([]);

const deliveries = ref<Array<any>>([]);

const handleUpdate = async (values, { resetForm }) => {
  let formData = <any>{
    shipment_id: form.value.type,
    city_id: form.value.city,
    delivery_id: form.value.delivery,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.put(
      `shipment/cities/${route.params.city}/types/${route.params.id}`,
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
  } catch (e) {}
};

watchEffect(() => {
  if (formRef.value) {
    formRef.value.setValues({
      ...form.value,
    });
  }
});

ApiService.get("shipment/types")
  .then(({ data }) => {
    types.value = data.data;
  })
  .catch(() => {});

ApiService.get("deliveries/select/items")
  .then(({ data }) => {
    deliveries.value = data.data;
  })
  .catch(() => {});

ApiService.get(
  `shipment/cities/${route.params.city}/types/${route.params.id}`
).then(({ data }) => {
  // form.value = data.data;
  form.value.type = data.data?.shipment.id;
  form.value.delivery = data.data?.delivery.id;
  form.value.city = route.params.city;
  loading.value = false;
});
</script>
<style></style>
