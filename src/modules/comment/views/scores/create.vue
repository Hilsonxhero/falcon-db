<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6 xl:col-span-4">
        <Form @submit="handleCreate" class="w-full">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">
                ایجاد امتیاز
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
                  <hx-select v-bind="field" name="category" value-key="id" label="title" v-model="form.category"
                    filterable :options="categories" placeholder="انتخاب  دسته بندی" />
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="category" />
                </div>

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


onMounted(() => {

  ApiService.get(`category/select`).then(({ data }) => {
    categories.value = data.data;
  });


});

const handleCreate = async (values, { resetForm }) => {
  let formData = {
    title: form.value.title,
    category_id: form.value.category,
    status: form.value.status,
  };
  console.log("formData", formData);

  loader.value = true;

  try {

    const { data } = await ApiService.post(`score/models`, formData);

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
