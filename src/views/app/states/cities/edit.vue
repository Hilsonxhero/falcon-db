<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6 xl:col-span-4">
        <Form @submit="handleUpdate" class="w-full" ref="formRef">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">
                ویرایش شهر {{ form.name && form.name }}
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
                  name="zone_code"
                  v-slot="{ field }"
                  rules="required"
                  label="کد منطقه"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.zone_code"
                    placeholder="کد منطقه"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="zone_code" />
                </div>
              </hx-form-group>

              <hx-form-group>
                <Field
                  mode="passive"
                  name="latitude"
                  v-slot="{ field }"
                  rules="required"
                  label="عرض جغرافیایی"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.latitude"
                    placeholder="عرض جغرافیایی"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="latitude" />
                </div>
              </hx-form-group>

              <hx-form-group>
                <Field
                  mode="passive"
                  name="longitude"
                  v-slot="{ field }"
                  rules="required"
                  label="طول جغرافیایی"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.longitude"
                    placeholder="طول جغرافیایی"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="longitude" />
                </div>
              </hx-form-group>

              <hx-form-group>
                <hx-select
                  nmae="categories"
                  value-key="key"
                  label="title"
                  v-model="form.status"
                  filterable
                  :options="statuses"
                  placeholder="انتخاب  وضعیت"
                />
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-start my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit"> ذخیره </hx-button>
              <hx-button
                variant="light"
                :to="{ name: 'states cities', params: { id: id } }"
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
import { ref, onMounted, watch } from "vue";
import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const formRef = ref<any>(null);
const form = ref({
  name: "",
  zone_code: "",
  latitude: "",
  longitude: "",
  city_fast_sending: 0,
  pay_at_place: 0,
  status: "enable",
});

const statuses = ref([
  { title: "فعال", key: "enable" },
  { title: "غیرفعال", key: "disable" },
  { title: "درحال انتظار", key: "pending" },
  { title: "رد شده", key: "rejected" },
]);

const id = ref(null);
const city = ref(null);
const fetchData = async () => {
  try {
    loading.value = true;
    const { data } = await ApiService.get(`cities/${city.value}`);
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
  city.value = route.params.value;
  fetchData();
});

const handleUpdate = async (values, { resetForm }) => {
  let formData = {
    name: form.value.name,
    state: id.value,
    zone_code: form.value.zone_code,
    latitude: form.value.latitude,
    longitude: form.value.longitude,
    city_fast_sending: form.value.city_fast_sending,
    pay_at_place: form.value.pay_at_place,
    status: form.value.status,
  };

  try {
    const { data } = await ApiService.put(`cities/${city.value}`, formData);
    resetForm();
    HxNotification.success({
      title: "عملیات موفقیت آمیز",
      message: "ویرایش شهر موفقیت آمیز بود",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    router.push({ name: "states cities", params: { id: id.value } });
  } catch (e) {}
};
</script>
<style></style>
