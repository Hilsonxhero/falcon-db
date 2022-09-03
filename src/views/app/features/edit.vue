<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6 xl:col-span-4">
        <Form @submit="handleUpdate" class="w-full" ref="formRef">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">
                ویرایش ویژگی {{ form.title && form.title }}
              </h4>
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
                <hx-select
                  nmae="categories"
                  value-key="id"
                  label="title"
                  v-model="form.category"
                  filterable
                  :options="categories"
                  placeholder="انتخاب دسته بندی"
                />
              </hx-form-group>

              <hx-form-group>
                <hx-select
                  nmae="categories"
                  value-key="id"
                  label="title"
                  v-model="form.parent"
                  filterable
                  :options="features"
                  placeholder="انتخاب  والد"
                />
              </hx-form-group>

              <hx-form-group>
                <hx-select
                  nmae="categories"
                  value-key="key"
                  label="title"
                  v-model="selectedStatus"
                  filterable
                  :options="statuses"
                  placeholder="انتخاب  وضعیت"
                />
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-start my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
              <hx-button variant="light" :to="{ name: 'features index' }">
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
import { ref, onMounted, watch } from "vue";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";

const router = useRouter();
const route = useRoute();
const formRef = ref<any>(null);
const loader = ref(false);
const form = ref({
  parent: null,
  category: null,
  title: "",
  status: null,
});
const categories = ref([]);
const features = ref([]);
const id = ref(null);
const statuses = ref([
  { title: "فعال", key: "enable" },
  { title: "غیرفعال", key: "disable" },
  { title: "درحال انتظار", key: "pending" },
  { title: "رد شده", key: "rejected" },
]);
const selectedStatus = ref({ title: "فعال", key: "enable" });

const fetchData = () => {
  ApiService.get(`features/${id.value}`).then(({ data }) => {
    form.value = data.data;
    selectedStatus.value = statuses.value.find(
      (item) => item.key == form.value.status
    ).key;
    form.value.category = form.value.category.id;
    if (form.value.parent) form.value.parent = form.value.parent.id;

    console.log("data.data", data.data);

    formRef.value.setValues({
      ...data.data,
    });
  });
};

const handleUpdate = async (values, { resetForm }) => {
  let formData = {
    title: form.value.title,
    parent_id: form.value.parent ?? null,
    category_id: form.value.category ?? null,
    status: selectedStatus.value,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.put(`features/${id.value}`, formData);
    resetForm();
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "features index" });
  } catch (e) {}
};

onMounted(async () => {
  id.value = route.params.id;
  const { data: categoriesData } = await ApiService.get(`categories`);
  const { data: featuresData } = await ApiService.get(
    `feature/select/${id.value}`
  );
  categories.value = categoriesData.data;
  features.value = featuresData.data;
  fetchData();
});
</script>
<style></style>
