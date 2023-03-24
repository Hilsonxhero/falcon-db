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
                    placeholder="نام شهر"
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
                    placeholder="کد منطقه "
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="zone_code" />
                </div>
              </hx-form-group>

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-4">
                <hx-form-group>
                  <hx-select
                    value-key="key"
                    label="title"
                    v-model="form.status"
                    filterable
                    :options="statuses"
                    placeholder="انتخاب  وضعیت"
                  />
                </hx-form-group>
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-start my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
              <hx-button variant="light" :to="{ name: 'cities index' }">
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
  zone_code: null,
  name: "",
  status: null,
});

const statuses = ref([
  { title: "فعال", key: "enable" },
  { title: "غیرفعال", key: "disable" },
  { title: "درحال انتظار", key: "pending" },
  { title: "رد شده", key: "rejected" },
]);

const id = ref(null);
const types = ref(["checkbox", "color", "select", "size"]);

const fetchData = async () => {
  try {
    loading.value = true;
    const { data } = await ApiService.get(`cities/${id.value}`);
    form.value = data.data;
    // form.value.type = types.value.find(d => d.value == form.value.type)
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
    status: form.value.status,
    zone_code: form.value.zone_code,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.put(`cities/${id.value}`, formData);
    resetForm();
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "cities index" });
  } catch (e) {}
};

onMounted(async () => {
  id.value = route.params.id;
  fetchData();
});
</script>
<style></style>
