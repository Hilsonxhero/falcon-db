<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6 xl:col-span-4">
        <Form @submit="handleCreate" class="w-full" ref="formRef">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">ایجاد بازه زمانی</h4>
            </div>
            <div class="hx-card__body">
              <hx-form-group label="ساعت شروع">
                <Field
                  mode="passive"
                  name="start_at"
                  v-slot="{ field }"
                  rules="required"
                  label="ساعت شروع"
                >
                  <date-picker
                    v-bind="field"
                    v-model="form.start_at"
                    type="time"
                  ></date-picker>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="start_at" />
                </div>
              </hx-form-group>

              <hx-form-group label="ساعت پایان">
                <Field
                  mode="passive"
                  name="end_at"
                  v-slot="{ field }"
                  rules="required"
                  label="ساعت پایان"
                >
                  <date-picker
                    v-bind="field"
                    v-model="form.end_at"
                    type="time"
                  ></date-picker>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="end_at" />
                </div>
              </hx-form-group>

              <hx-form-group label=" هزینه ارسال">
                <Field
                  mode="passive"
                  name="shipping_cost"
                  v-slot="{ field }"
                  rules="required"
                  label=" هزینه ارسال"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.shipping_cost"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="shipping_cost" />
                </div>
              </hx-form-group>

              <hx-form-group label="ظرفیت">
                <Field
                  mode="passive"
                  name="order_capacity"
                  v-slot="{ field }"
                  rules="required"
                  label="ظرفیت"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.order_capacity"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="order_capacity" />
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
                  name: 'shipment date intervals index',
                  params: { id: shipment_date },
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
import { ref, onMounted, watch, watchEffect } from "vue";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";
import DatePicker from "vue3-persian-datetime-picker";
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const loader = ref(false);
const formRef = ref<any>(null);
const form = ref<any>({
  start_at: null,
  end_at: null,
  shipping_cost: 0,
  order_capacity: null,
});

const shipment_date = ref<any>(null);

shipment_date.value = route.params.id;

const handleCreate = async (values, { resetForm }) => {
  let formData = {
    shipment_date_id: shipment_date.value,
    start_at: form.value.start_at,
    end_at: form.value.end_at,
    shipping_cost: form.value.shipping_cost,
    order_capacity: form.value.order_capacity,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.post(
      `shipment/dates/${shipment_date.value}/intervals`,
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
      name: "shipment date intervals index",
      params: { id: shipment_date.value },
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
</script>
<style></style>
