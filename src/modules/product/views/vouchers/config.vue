<template>
  <div class="w-full">
    <Form @submit="handleCreate" class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <div class="hx-card">
          <div class="hx-card__header">
            <h4 class="text-gray-600 text-xl">اطلاعات کلی</h4>
          </div>
          <div class="hx-card__body">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                <hx-form-group label="کاربر">
                  <Field
                    mode="passive"
                    name="user"
                    v-slot="{ field }"
                    rules=""
                    label="کاربر"
                  >
                    <hx-select
                      remote
                      :remote-method="handleSearchUser"
                      v-bind="field"
                      value-key="id"
                      label="username"
                      v-model="form.user"
                      filterable
                      :options="users"
                      placeholder="انتخاب  کاربر"
                    />
                  </Field>

                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="user" />
                  </div>
                </hx-form-group>
              </div>

              <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                <hx-form-group label="دسته بندی">
                  <Field
                    mode="passive"
                    name="category"
                    v-slot="{ field }"
                    rules=""
                    label="دسته بندی"
                  >
                    <hx-select
                      remote
                      :remote-method="handleSearchCategory"
                      v-bind="field"
                      value-key="id"
                      label="title"
                      v-model="form.category"
                      filterable
                      :options="categories"
                      placeholder="انتخاب  دسته بندی"
                    />
                  </Field>

                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="category" />
                  </div>
                </hx-form-group>
              </div>

              <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                <hx-form-group label="محصول">
                  <Field
                    mode="passive"
                    name="product"
                    v-slot="{ field }"
                    rules=""
                    label="محصول"
                  >
                    <hx-select
                      remote
                      :remote-method="handleSearchProduct"
                      v-bind="field"
                      value-key="id"
                      label="title_fa"
                      v-model="form.product"
                      filterable
                      :options="products"
                      placeholder="انتخاب  محصول"
                    />
                  </Field>

                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="product" />
                  </div>
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
            <hx-button
              variant="light"
              :to="{ name: 'vouchers voucherables index', params: { id: id } }"
            >
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
import DatePicker from "vue3-persian-datetime-picker";

const users = ref<Array<any>>([]);
const categories = ref<Array<any>>([]);
const products = ref<Array<any>>([]);
const loading = ref(false);
const route = useRoute();
const router = useRouter();
const id = ref(null);
const form = ref({
  user: null,
  category: null,
  product: null,
});

const handleCreate = async (values, { resetForm }) => {
  let formData = {
    voucher: id.value,
    category: form.value.category,
    user: form.value.user,
    product: form.value.product,
  };
  loading.value = true;
  try {
    const { data } = await ApiService.post("voucherables", formData);
    resetForm();
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loading.value = false;
    router.push({
      name: "vouchers voucherables index",
      params: { id: id.value },
    });
  } catch (e) {}
};

const fetchUsers = (query = "") => {
  ApiService.query(`user/select`, {
    params: { q: query },
  }).then(({ data }) => {
    users.value = data?.data;
  });
};
const fetchCategories = (query = "") => {
  ApiService.query(`category/select`, {
    params: { q: query },
  }).then(({ data }) => {
    categories.value = data?.data;
  });
};

const fetchProducts = (query = "") => {
  ApiService.query(`product/select`, {
    params: { q: query },
  }).then(({ data }) => {
    products.value = data?.data;
  });
};

const handleSearchUser = (query) => {
  fetchUsers(query);
};

const handleSearchCategory = (query) => {
  fetchCategories(query);
};

const handleSearchProduct = (query) => {
  fetchProducts(query);
};

onMounted(() => {
  id.value = route.params.id;
  fetchUsers();
  fetchCategories();
  fetchProducts();
});
</script>

<style scoped></style>
