<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6">
        <Form @submit="handleUpdate" class="w-full" ref="formRef">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">ویرایش نظر</h4>
            </div>
            <div class="hx-card__body">
              <hx-form-group>
                <Field
                  mode="passive"
                  name="content"
                  v-slot="{ field }"
                  rules="required"
                  label="متن"
                >
                  <hx-input
                    class="h-32"
                    type="textarea"
                    v-bind="field"
                    v-model="form.content"
                    placeholder="متن پرسش"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="content" />
                </div>
              </hx-form-group>

              <hx-form-group>
                <Field
                  mode="passive"
                  name="status"
                  v-slot="{ field }"
                  rules="required"
                  label="وضعیت پرسش"
                >
                  <hx-select
                    name="status"
                    value-key="key"
                    label="title"
                    v-model="form.status"
                    filterable
                    :options="statuses"
                    placeholder="انتخاب  وضعیت"
                  />
                </Field>
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-start my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
              <hx-button variant="light" :to="{ name: 'questions index' }">
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
const loader = ref(false);
const form = ref({
  content: null,
  status: null,
});

const statuses = ref([
  { title: "تایید شده", key: "approved" },
  { title: "در انتظار تایید", key: "pending" },
  { title: "رد شده", key: "rejected" },
]);

const id = ref(null);

const fetchData = async () => {
  try {
    loading.value = true;
    const { data } = await ApiService.get(`questions/${id.value}`);
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
    content: form.value.content,
    status: form.value.status,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.put(`questions/${id.value}`, formData);
    resetForm();
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "questions index" });
  } catch (e) {
    loader.value = false;
  }
};

onMounted(async () => {
  id.value = route.params.id;
  fetchData();
});
</script>
<style></style>
