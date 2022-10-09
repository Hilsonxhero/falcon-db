<template>
  <div class="w-full">
    <Form @submit="handleCreate" class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <div class="hx-card">
          <div class="hx-card__header">
            <h4 class="text-gray-600 text-xl">اطلاعات کاربری</h4>
          </div>
          <div class="hx-card__body">
            <div class="grid grid-cols-12 gap-4">
              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-3">
                <Field
                  mode="passive"
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

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-3">
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

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-3">
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

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-3">
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

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-3">
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

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-3">
                <hx-select
                  value-key="key"
                  label="title"
                  v-model="form.status"
                  filterable
                  :options="statuses"
                  placeholder="وضعیت حساب"
                />
              </hx-form-group>

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-3">
                <Field
                  name="password"
                  rules="required"
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

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-3">
                <Field
                  name="password_confirmation"
                  rules="required"
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

              <hx-form-group class="col-span-12 sm:col-span-6 lg:col-span-3">
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
            <hx-upload :max="1" v-model="form.profile"></hx-upload>
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

<script setup lang="ts">
//@ts-nocheck
import { onMounted, ref } from "vue";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
import { HxNotification } from "@/components/base/notification";
import { ErrorMessage, Field, Form } from "vee-validate";

const users = ref<any>([]);

const router = useRouter();

const form = ref({
  username: "",
  role: null,
  email: "",
  phone: "",
  national_identity_number: "",
  status: "enable",
});
const loader = ref(false);
const statuses = ref([
  { title: "فعال", key: "enable" },
  { title: "غیرفعال", key: "disable" },
  { title: "درحال انتظار", key: "pending" },
  { title: "رد شده", key: "rejected" },
]);

const selectedStatus = ref(null);
const roles = ref<Array<any>>([]);

const fetchData = async () => {
  try {
    const { data } = await ApiService.get("categories");
    users.value = data.data;
  } catch (e) {}
};

const handleCreate = async (values, { resetForm }) => {
  let formData = new FormData();
  formData.append("username", form.value.username);
  formData.append("email", form.value.email);
  formData.append("phone", form.value.phone);
  formData.append("role", form.value.role);
  formData.append("cart_number", form.value.cart_number);
  formData.append("password", form.value.password);
  formData.append("password_confirmation", form.value.password_confirmation);
  formData.append(
    "national_identity_number",
    form.value.national_identity_number
  );
  formData.append("status", form.value.status);
  formData.append("profile", JSON.stringify(form.value.profile));

  try {
    loader.value = true;
    const { data } = await ApiService.post("users", formData);
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

fetchData();

onMounted(() => {
  ApiService.get("roles")
    .then(({ data }) => {
      roles.value = data.data;
    })
    .catch(() => {});
});
</script>

<style scoped></style>
