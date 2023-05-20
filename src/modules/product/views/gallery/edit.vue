<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6 xl:col-span-4">
        <Form @submit="handleUpdate" class="w-full" ref="formRef">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">گالری محصول</h4>
            </div>
            <div class="hx-card__body">
              <hx-form-group label="عنوان">
                <Field
                  name="title"
                  rules="required"
                  v-slot="{ field }"
                  label="عنوان"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.title"
                    placeholder="عنوان"
                  >
                  </hx-input>
                </Field>
                <div class="invalid-feedback d-block">
                  <ErrorMessage name="title" />
                </div>
              </hx-form-group>

              <hx-form-group label="فایل">
                <hx-upload
                  ref="uploader"
                  :max="1"
                  v-model="form.media"
                  :sources="form.media.thumb"
                ></hx-upload>
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-start my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
              <hx-button
                variant="light"
                :to="{
                  name: 'products gallery index',
                  params: { id: product_id },
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
import { ref, onMounted, watch } from "vue";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const formRef = ref<any>(null);
const uploader = ref(null);

const form = ref({
  title: null,
  media: {},
});
const gallery_id = ref<any>(null);
const product_id = ref(null);
const loader = ref(false);

const fetchData = async () => {
  try {
    const { data } = await ApiService.get(
      `products/${product_id.value}/gallery/${gallery_id.value}`
    );

    form.value = data.data;

    formRef.value.setValues({
      ...data.data,
    });
  } catch (e) {}
};

onMounted(() => {
  product_id.value = route.params.product;
  gallery_id.value = route.params.id;

  fetchData();
});

const handleUpdate = async (values, { resetForm }) => {
  let formData = new FormData();

  formData.append("product_id", product_id.value);
  formData.append("title", form.value.title);
  if (form.value.media.file) {
    formData.append("media", form.value.media?.file);
  }

  try {
    loader.value = true;
    const { data } = await ApiService.put(
      `products/${product_id.value}/gallery/${gallery_id.value}`,
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
    router.push({
      name: "products gallery index",
      params: { id: product_id.value },
    });
  } catch (e) {}
};
</script>
<style></style>
