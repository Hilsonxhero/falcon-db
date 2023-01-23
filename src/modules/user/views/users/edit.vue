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
      <div class="w-full">
        <Form
          @submit="handleUpdate"
          class="grid grid-cols-12 gap-6"
          ref="formRef"
          v-if="!loading"
        >
          <div class="col-span-12">
            <div class="hx-card">
              <div class="hx-card__header">
                <h4 class="text-gray-600 text-xl">اطلاعات کاربری</h4>
              </div>
              <div class="hx-card__body">
                <div class="grid grid-cols-12 gap-4">
                  <hx-form-group
                    class="col-span-12 sm:col-span-6 lg:col-span-3"
                  >
                    <Field
                      name="username"
                      v-slot="{ field }"
                      rules="required"
                      label="نام کاربری"
                    >
                      <hx-input
                        v-bind="field"
                        v-model="form.username"
                        placeholder="نام کاربری"
                      ></hx-input>
                    </Field>

                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="username" />
                    </div>
                  </hx-form-group>

                  <hx-form-group
                    class="col-span-12 sm:col-span-6 lg:col-span-3"
                  >
                    <Field
                      name="phone"
                      rules="required"
                      v-slot="{ field }"
                      label=" شماره همراه"
                    >
                      <hx-input
                        v-bind="field"
                        v-model="form.phone"
                        placeholder=" شماره همراه"
                      >
                      </hx-input>
                    </Field>
                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="phone" />
                    </div>
                  </hx-form-group>

                  <hx-form-group
                    class="col-span-12 sm:col-span-6 lg:col-span-3"
                  >
                    <Field
                      name="email"
                      rules="required"
                      v-slot="{ field }"
                      label="  ایمیل"
                    >
                      <hx-input
                        v-bind="field"
                        v-model="form.email"
                        placeholder="  ایمیل"
                      >
                      </hx-input>
                    </Field>
                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="email" />
                    </div>
                  </hx-form-group>

                  <hx-form-group
                    class="col-span-12 sm:col-span-6 lg:col-span-3"
                  >
                    <Field
                      name="national_identity_number"
                      rules="required"
                      v-slot="{ field }"
                      label="  کد ملی"
                    >
                      <hx-input
                        v-bind="field"
                        v-model="form.national_identity_number"
                        placeholder="  کد ملی"
                      >
                      </hx-input>
                    </Field>
                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="national_identity_number" />
                    </div>
                  </hx-form-group>

                  <hx-form-group
                    class="col-span-12 sm:col-span-6 lg:col-span-3"
                  >
                    <Field
                      name="cart_number"
                      rules="required"
                      v-slot="{ field }"
                      label="شماره کارت"
                    >
                      <hx-input
                        v-bind="field"
                        v-model="form.cart_number"
                        placeholder="شماره کارت"
                      >
                      </hx-input>
                    </Field>
                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="cart_number" />
                    </div>
                  </hx-form-group>

                  <hx-form-group
                    class="col-span-12 sm:col-span-6 lg:col-span-3"
                  >
                    <hx-select
                      value-key="key"
                      label="title"
                      v-model="form.status"
                      filterable
                      :options="statuses"
                      placeholder="وضعیت حساب"
                    />
                  </hx-form-group>

                  <hx-form-group
                    class="col-span-12 sm:col-span-6 lg:col-span-3"
                  >
                    <Field
                      name="password"
                      :rules="{ required: false }"
                      v-slot="{ field }"
                      label="رمز عبور جدید"
                    >
                      <hx-input
                        v-bind="field"
                        v-model="form.password"
                        placeholder="رمز عبور جدید"
                      >
                      </hx-input>
                    </Field>

                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="password" />
                    </div>
                  </hx-form-group>

                  <hx-form-group
                    class="col-span-12 sm:col-span-6 lg:col-span-3"
                  >
                    <Field
                      name="password_confirmation"
                      :rules="{ required: false }"
                      v-slot="{ field }"
                      label="تکرار رمز عبور جدید"
                    >
                      <hx-input
                        v-bind="field"
                        v-model="form.password_confirmation"
                        placeholder="تکرار رمز عبور جدید"
                      >
                      </hx-input>
                    </Field>
                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="password_confirmation" />
                    </div>
                  </hx-form-group>

                  <hx-form-group
                    class="col-span-12 sm:col-span-6 lg:col-span-3"
                  >
                    <hx-select
                      value-key="name"
                      label="name"
                      v-model="form.role"
                      filterable
                      :options="roles"
                      placeholder="نقش کاربری"
                    />
                  </hx-form-group>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 space-y-4">
            <div class="hx-card">
              <div class="hx-card__header">
                <h4 class="text-gray-600 text-xl">پروفایل</h4>
              </div>
              <div class="hx-card__body">
                <hx-upload
                  :max="1"
                  v-model="form.profile"
                  :sources="form.avatar"
                ></hx-upload>
              </div>
            </div>
          </div>

          <div class="col-span-12">
            <div class="w-full flex items-center justify-between my-4">
              <div class="flex items-center space-x-3 space-x-reverse">
                <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
                <hx-button variant="light" :to="{ name: 'users index' }">
                  لغو
                </hx-button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </template>
  </hx-skeleton>
</template>

<script setup lang="ts">
//@ts-nocheck
import { onMounted, ref, watch, watchEffect } from "vue";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { HxNotification } from "@/components/base/notification";
import { ErrorMessage, Field, Form, useForm } from "vee-validate";
import { fromJSON } from "postcss";
const { setValues } = useForm();
const users = ref<any>([]);

const id = ref<any>(null);
const loading = ref<any>(true);
const loader = ref(false);
const router = useRouter();
const route = useRoute();

const form = ref({
  username: "",
  email: "",
  role: null,
  phone: "",
  national_identity_number: "",
  status: "enable",
});

const statuses = ref([
  { title: "فعال", key: "active" },
  { title: "غیرفعال", key: "inactive" },
  { title: "مسدود شده", key: "ban" },
]);

const formRef = ref<any>(null);

const roles = ref<Array<any>>([]);

const handleUpdate = async (values, { resetForm }) => {
  let formData = {
    username: form.value.username,
    email: form.value.email,
    phone: form.value.phone,
    role: form.value.role,
    cart_number: form.value.cart_number,
    password: form.value.password,
    password_confirmation: form.value.password_confirmation,
    national_identity_number: form.value.national_identity_number,
    status: form.value.status,
    profile: JSON.stringify(form.value.profile),
  };

  try {
    loader.value = true;
    const { data } = await ApiService.put(`users/${id.value}`, formData);
    resetForm();
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "users index" });
  } catch (e) {}
};

const fetchData = async () => {
  try {
    const { data } = await ApiService.get(`users/${id.value}`);
    form.value = data.data;
    loading.value = false;
  } catch (e) {}
};

watchEffect(() => {
  if (formRef.value) {
    formRef.value.setValues({
      ...form.value,
    });
  }
});

onMounted(() => {
  id.value = route.params.id;

  ApiService.get("roles")
    .then(({ data }) => {
      roles.value = data.data;
    })
    .catch(() => {});

  fetchData();

  // ApiService.get(`users/${id.value}`)
  //   .then(({ data }) => {
  //     form.value = data.data;

  //     formRef.value.setValues({
  //       ...data.data,
  //     });
  //     loading.value = false;
  //   })
  //   .catch(() => {});
});
</script>

<style scoped></style>
