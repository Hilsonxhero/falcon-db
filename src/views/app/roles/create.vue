<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6 xl:col-span-4">
        <Form @submit="handleCreate" class="w-full" ref="formRef">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">ایجاد مجوز</h4>
            </div>
            <div class="hx-card__body">
              <hx-form-group>
                <Field
                  mode="passive"
                  name="name"
                  v-slot="{ field }"
                  rules="required"
                  label="عنوان"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.name"
                    placeholder="عنوان"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="name" />
                </div>
              </hx-form-group>
              <hx-form-group>
                <hx-checkbox-group v-model="selectedPermissions">
                  <hx-checkbox
                    v-for="(permission, index) in permissions"
                    :value="permission.id"
                    :key="index"
                    :label="permission.name"
                  >
                  </hx-checkbox>
                </hx-checkbox-group>
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-start my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
              <hx-button variant="light" :to="{ name: 'roles index' }">
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
import { ref, onMounted } from "vue";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";
const router = useRouter();
const route = useRoute();
const formRef = ref<any>(null);
const loader = ref(false);
const selectedPermissions = ref<Arrray<any>>([]);
const permissions = ref<Arrray<any>>([]);
const form = ref({
  name: "",
});

const handleCreate = async (values, { resetForm }) => {
  let formData = {
    name: form.value.name,
    permissions: selectedPermissions.value,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.post(`roles`, formData);
    resetForm();
    HxNotification.success({
      title: "عملیات موفقیت آمیز",
      message: "مجوز با موفقیت ایجاد شد",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "roles index" });
  } catch (e) {}
};

onMounted(() => {
  ApiService.get("permissions")
    .then(({ data }) => {
      permissions.value = data.data;
      console.log("data", data);
    })
    .catch(() => {});
});
</script>
<style></style>
