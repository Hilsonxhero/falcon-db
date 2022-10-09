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
        <section>
          <Form ref="formRef" @submit="handleUpdate">
            <section>
              <div class="grid grid-cols-12 gap-6">
                <div class="col-span-12">
                  <div class="hx-card">
                    <div class="hx-card__header">
                      <h4 class="text-gray-600 text-xl">اطلاعات کلی</h4>
                    </div>
                    <div class="hx-card__body">
                      <div class="grid grid-cols-12 gap-4">
                        <hx-form-group
                          class="col-span-12 sm:col-span-6 lg:col-span-4"
                        >
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
                            >
                            </hx-input>
                          </Field>
                          <div class="invalid-feedback d-block">
                            <ErrorMessage name="title" />
                          </div>
                        </hx-form-group>

                        <hx-form-group
                          class="col-span-12 sm:col-span-6 lg:col-span-4"
                        >
                          <Field
                            mode="passive"
                            name="category"
                            v-slot="{ field }"
                            rules="required"
                            label="دسته بندی"
                          >
                            <hx-select
                              v-bind="field"
                              value-key="id"
                              label="title"
                              v-model="form.category"
                              filterable
                              :options="categories"
                              placeholder="انتخاب دسته بندی"
                            />
                          </Field>
                          <div class="invalid-feedback d-block">
                            <ErrorMessage name="category" />
                          </div>
                        </hx-form-group>

                        <hx-form-group
                          class="col-span-12 sm:col-span-6 lg:col-span-4"
                        >
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

                        <hx-form-group class="col-span-12">
                          <Field
                            mode="passive"
                            name="content"
                            v-slot="{ field }"
                            rules="required"
                            label=" متن .."
                          >
                            <TiptapEditor
                              v-bind="field"
                              v-model="form.content"
                              :content="form.content"
                              placeholder="متن"
                              ref="tiptap"
                            >
                            </TiptapEditor>
                          </Field>

                          <div class="invalid-feedback d-block">
                            <ErrorMessage name="content" />
                          </div>
                        </hx-form-group>
                        <hx-form-group class="col-span-12">
                          <Field
                            mode="passive"
                            name="description"
                            v-slot="{ field }"
                            rules="required"
                            label=" خلاصه توضیحات .."
                          >
                            <hx-textarea
                              v-bind="field"
                              v-model="form.description"
                              placeholder="خلاصه توضیحات"
                            >
                            </hx-textarea>
                          </Field>

                          <div class="invalid-feedback d-block">
                            <ErrorMessage name="description" />
                          </div>
                        </hx-form-group>
                      </div>
                    </div>
                  </div>
                </div>

                <section class="col-span-12 space-y-4">
                  <div class="hx-card">
                    <div class="hx-card__header">
                      <h4 class="text-gray-600 text-xl">تصویر اصلی</h4>
                    </div>
                    <div class="hx-card__body">
                      <hx-upload
                        :max="1"
                        v-model="form.image"
                        :sources="form.media?.main"
                      ></hx-upload>
                    </div>
                  </div>
                </section>
              </div>
            </section>

            <div class="w-full">
              <div class="w-full flex items-center justify-between my-4">
                <div class="flex items-center space-x-3 space-x-reverse">
                  <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
                  <hx-button variant="light" :to="{ name: 'articles index' }">
                    لغو
                  </hx-button>
                </div>
              </div>
            </div>
          </Form>
        </section>
      </div>
    </template>
  </hx-skeleton>
</template>

<script setup lang="ts">
//@ts-nocheck
import { ref, onMounted, watchEffect } from "vue";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { HxNotification } from "@/components/base/notification";
import { ErrorMessage, Field, Form } from "vee-validate";
import TiptapEditor from "@/components/common/tiptap/tiptap-editor.vue";

const form = ref({
  title: "",
  content: "",
  description: null,
  category: null,
  status: "enable",
  image: null,
});
const formRef = ref<any>(null);
const tiptap = ref(null);
const article = ref(null);
const categories = ref<any>([]);

const statuses = ref([
  { title: "فعال", key: "enable" },
  { title: "غیرفعال", key: "disable" },
  { title: "درحال انتظار", key: "pending" },
  { title: "رد شده", key: "rejected" },
]);

const router = useRouter();
const route = useRoute();
const loader = ref(false);
const loading = ref(true);

const handleUpdate = async (values, { resetForm }) => {
  // let formData = new FormData();
  // formData.append("title", form.value.title);
  // formData.append("content", form.value.content);
  // formData.append("description", form.value.description);
  // formData.append("category_id", form.value.category);
  // formData.append("status", form.value.status);
  // formData.append("image", form.value.image);

  let formData = {
    title: form.value.title,
    content: form.value.content,
    description: form.value.description,
    category_id: form.value.category,
    status: form.value.status,
    image: form.value.image,
  };
  try {
    loader.value = true;
    const { data } = await ApiService.put(
      `articles/${article.value}`,
      formData
    );
    resetForm();
    HxNotification.success({
      title: "عملیات موفقیت آمیز",
      message: "ایجاد محصول با موفقیت انجام شد",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "articles index" });
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

onMounted(() => {
  article.value = route.params.id;
  ApiService.get("categories")
    .then(({ data }) => {
      categories.value = data.data;
    })
    .catch(() => {});
  ApiService.get(`articles/${article.value}`)
    .then(({ data }) => {
      form.value = data.data;
      loading.value = false;
    })
    .catch(() => {});
});
</script>
