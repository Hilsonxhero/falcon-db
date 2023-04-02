<template>
  <div>
    <h1 class="flex justify-start mb-6 text-typo text-xl">ورود</h1>
    <div class="w-full">
      <Form ref="form" class="h-full space-y-6" @submit="handleSubmit">
        <div class="block mb-4">
          <hx-form-group label="شماره موبایل">
            <Field
              mode="passive"
              name="username"
              v-slot="{ field }"
              rules="required"
              label="شماره موبایل"
            >
              <hx-input
                autofocus
                ref="inputRef"
                v-bind="field"
                type="text"
                v-model="username"
              ></hx-input>
            </Field>
            <div class="invalid-feedback d-block">
              <ErrorMessage name="username" />
            </div>
          </hx-form-group>
        </div>
        <span class="text-justify lg:text-xs text-typo-400">
          با ورود به ،
          <a class="cursor-pointer"><span class="text-link"> شرایط </span></a>
          و

          <a class="cursor-pointer"
            ><span class="text-link"> قوانین حریم ‌خصوصی </span></a
          >

          آن را می‌پذیرید.
        </span>

        <div
          class="border-gray-300 border lg:auth-content-reverse-padding"
        ></div>
        <div class="flex flex-col justify-between lg:items-center">
          <div class="w-full">
            <hx-button :loading="loader" type="submit" variant="primary" block
              >ورود</hx-button
            >
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect, onMounted } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import ApiService from "@/core/services/ApiService";
import { UPDATE_MODEL_EVENT } from "@/core/constants";
import { useAuthStore } from "@/modules/auth";

const store = useAuthStore();
const emit = defineEmits([UPDATE_MODEL_EVENT, "change"]);
const username = ref("");
const otp = ref(false);
const loader = ref(false);
const form = ref<any>();
const end = ref<any>(null);
const inputRef = ref(null);
watch(username, (val, oldVal) => {
  emit(UPDATE_MODEL_EVENT, val);
});

watchEffect(() => {
  if (form.value) {
    form.value.setValues({
      username: username.value,
    });
  }
});

const handleSubmit = async (e: any) => {
  loader.value = true;
  const form = {
    phone: username.value,
  };
  const { data } = await store.authenticate(form);
  end.value = data.ttl * 1000;
  otp.value = true;
  emit("change", end.value);
  loader.value = false;
};

onMounted(() => {});
</script>

<style scoped></style>
