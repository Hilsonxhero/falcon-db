<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6 xl:col-span-4">
        <Form @submit="handleUpdate" class="w-full" ref="formRef">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">
                ویرایش امتیاز {{ form.title && form.title }}
              </h4>
            </div>
            <div class="hx-card__body">
              <hx-form-group>
                <Field mode="passive" name="title" v-slot="{ field }" rules="required" label="عنوان">
                  <hx-input v-bind="field" v-model="form.title" placeholder="عنوان"></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="title" />
                </div>
              </hx-form-group>
              <hx-form-group>
                <Field mode="passive" name="category" v-slot="{ field }" rules="required" label="دسته بندی">
                  <hx-select name="category" value-key="id" label="title" v-model="form.category" filterable
                    :options="categories" placeholder="انتخاب  دسته بندی" />
                </Field>

              </hx-form-group>

              <hx-form-group>
                <hx-select name="status" value-key="key" label="title" v-model="form.status" filterable
                  :options="statuses" placeholder="انتخاب  وضعیت" />
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-start my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
              <hx-button variant="light" :to="{ name: 'score models index' }">
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
import { HxMessageBox } from "@/components/base/message-box";
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
  title: "",
  category: "",
  status: "active",
});
const categories = ref<any>([]);

const statuses = ref([
  { title: "فعال", key: "active" },
  { title: "غیرفعال", key: "inactive" },

]);

const id = ref(null);
const score_id = ref(null);
const fetchData = async () => {
  try {
    loading.value = true;
    const { data } = await ApiService.get(`score/models/${score_id.value}`);
    form.value = data.data;
    form.value.category = form.value.category.id
    formRef.value.setValues({
      ...data.data,
    });
    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
};

onMounted(() => {
  score_id.value = route.params.id;

  ApiService.get(`category/select`).then(({ data }) => {
    categories.value = data.data;
  });

  fetchData();
});

const handleUpdate = async (values, { resetForm }) => {
  let formData = {
    title: form.value.title,
    category_id: form.value.category,
    status: form.value.status,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.put(`score/models/${score_id.value}`, formData);
    resetForm();
    HxNotification.success({
      title: "عملیات موفقیت آمیز",
      message: "ویرایش امتیاز موفقیت آمیز بود",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "score models index" });
  } catch (e) { }
};
</script>
<style>

</style>
