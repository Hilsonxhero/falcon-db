<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6 xl:col-span-4">
        <Form @submit="handleUpdate" class="w-full" ref="formRef">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">
                ویرایش مقدار {{ form.feature && form.feature.title }}
              </h4>
            </div>
            <div class="hx-card__body">
              <hx-form-group>
                <Field
                  name="feature"
                  rules="required"
                  v-slot="{ field }"
                  label="ویژگی"
                >
                  <hx-select
                    v-bind="field"
                    @change="handleSelectFeature"
                    value-key="id"
                    label="title"
                    v-model="form.feature"
                    filterable
                    :options="features"
                    placeholder="انتخاب  ویژگی"
                  />
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="feature" />
                </div>
              </hx-form-group>

              <hx-form-group class="my-4">
                <hx-switch
                  :label="form.custom ? 'سفارشی' : 'مقدار پیش فرض'"
                  name="staus"
                  v-model="form.custom"
                >
                </hx-switch>
              </hx-form-group>

              <hx-form-group v-if="form.custom">
                <Field
                  name="quantity"
                  :rules="{ required: form.custom }"
                  v-slot="{ field }"
                  label="مقدار سفارشی"
                >
                  <hx-textarea
                    v-bind="field"
                    v-model="form.quantity"
                    placeholder="مقدار سفارشی"
                  >
                  </hx-textarea>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="quantity" />
                </div>
              </hx-form-group>

              <hx-form-group v-else>
                <Field
                  name="value"
                  :rules="{ required: !form.custom }"
                  v-slot="{ field }"
                  label="مقدار پیش فرض"
                >
                  <hx-select
                    v-bind="field"
                    value-key="id"
                    label="title"
                    v-model="form.value"
                    filterable
                    :options="values"
                    placeholder="انتخاب  مقدار ویژگی"
                  />
                </Field>
                <div class="invalid-feedback d-block">
                  <ErrorMessage name="value" />
                </div>
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-start my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
              <hx-button
                variant="light"
                :to="{ name: 'products features', params: { id: id } }"
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
import { ref, onMounted, watch } from "vue";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";
import { tryOnUnmounted } from "@vueuse/core";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const formRef = ref<any>(null);
const form = ref({
  feature: null,
  value: null,
  quantity: null,
  custom: false,
});
const id = ref(null);
const loader = ref(false);
const feature = ref(null);

const features = ref<Array<any>>([]);
const values = ref<Array<any>>([]);

const fetchData = async () => {
  try {
    const { data } = await ApiService.get(
      `products/${id.value}/features/${feature.value}`
    );
    form.value = data.data;
    if (form.value.quantity) form.value.custom = true;
    handleSelectFeature(form.value.feature);
    // selectedStatus.value = statuses.value.find(item => item.key == form.value.status).key
    formRef.value.setValues({
      ...data.data,
    });
  } catch (e) {}
};

onMounted(() => {
  id.value = route.params.id;
  feature.value = route.params.value;
  ApiService.get(`features`).then(({ data }) => {
    features.value = data.data;
  });
  fetchData();
});

const handleUpdate = async (values, { resetForm }) => {
  let formData = {
    product_id: id.value,
    feature_id: form.value.feature,
    feature_value_id: form.value.value,
    value: form.value.quantity,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.put(
      `products/${id.value}/features/${feature.value}`,
      formData
    );
    resetForm();
    loader.value = false;
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    router.push({ name: "products features", params: { id: id.value } });
  } catch (e) {}
};

const handleSelectFeature = (val) => {
  ApiService.get(`features/${val}/values`).then(({ data }) => {
    values.value = data.data;
  });
};
</script>
<style></style>
