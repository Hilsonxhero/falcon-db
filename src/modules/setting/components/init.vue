<template>
  <section>
    <div class="grid grid-cols-12 gap-6">
      <section class="col-span-12">
        <div class="hx-card">
          <div class="hx-card__header">
            <h4 class="text-gray-600 text-xl">اطلاعات کلی</h4>
          </div>
          <div class="hx-card__body">
            <div class="grid grid-cols-12 gap-4">
              <hx-form-group label="نام سایت" class="col-span-12">
                <Field
                  mode="passive"
                  name="site_name"
                  v-slot="{ field }"
                  rules="required"
                  label="نام سایت"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.site_name"
                    placeholder="نام سایت"
                  >
                  </hx-input>
                </Field>
                <div class="invalid-feedback d-block">
                  <ErrorMessage name="site_name" />
                </div>
              </hx-form-group>

              <hx-form-group label=" ایمیل" class="col-span-12">
                <Field
                  mode="passive"
                  name="email"
                  v-slot="{ field }"
                  rules="required"
                  label=" ایمیل"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.email"
                    placeholder=" ایمیل"
                  >
                  </hx-input>
                </Field>
                <div class="invalid-feedback d-block">
                  <ErrorMessage name="email" />
                </div>
              </hx-form-group>

              <hx-form-group label=" شماره تماس" class="col-span-12">
                <Field
                  mode="passive"
                  name="phone"
                  v-slot="{ field }"
                  rules="required"
                  label=" شماره تماس"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.phone"
                    placeholder=" شماره تماس"
                  >
                  </hx-input>
                </Field>
                <div class="invalid-feedback d-block">
                  <ErrorMessage name="phone" />
                </div>
              </hx-form-group>

              <hx-form-group label="  متن کپی رایت" class="col-span-12">
                <Field
                  mode="passive"
                  name="copyright"
                  v-slot="{ field }"
                  rules="required"
                  label="  متن کپی رایت"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.copyright"
                    placeholder="  متن کپی رایت"
                  >
                  </hx-input>
                </Field>
                <div class="invalid-feedback d-block">
                  <ErrorMessage name="copyright" />
                </div>
              </hx-form-group>

              <hx-form-group label="متن پشتیبانی" class="col-span-12">
                <Field
                  mode="passive"
                  name="support_text"
                  v-slot="{ field }"
                  rules="required"
                  label="متن پشتیبانی"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.support_text"
                    placeholder="متن پشتیبانی"
                  >
                  </hx-input>
                </Field>
                <div class="invalid-feedback d-block">
                  <ErrorMessage name="support_text" />
                </div>
              </hx-form-group>

              <!-- <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                <hx-form-group>
                  <Field
                    mode="passive"
                    name="brand"
                    v-slot="{ field }"
                    rules="required"
                    label=" برند"
                  >
                    <hx-select
                      v-bind="field"
                      value-key="id"
                      label="title"
                      v-model="form.brand"
                      filterable
                      :options="brands"
                      placeholder="انتخاب  برند"
                    />
                  </Field>
                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="brand" />
                  </div>
                </hx-form-group>
              </div> -->

              <hx-form-group label="آدرس" class="col-span-12">
                <Field
                  mode="passive"
                  name="address"
                  v-slot="{ field }"
                  rules="required"
                  label=" آدرس"
                >
                  <TiptapEditor
                    v-bind="field"
                    v-model="form.address"
                    :content="form.address"
                    placeholder="آدرس"
                    ref="tiptap"
                  >
                  </TiptapEditor>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="address" />
                </div>
              </hx-form-group>

              <hx-form-group label="درباره سایت" class="col-span-12">
                <Field
                  mode="passive"
                  name="site_description"
                  v-slot="{ field }"
                  rules="required"
                  label=" درباره سایت"
                >
                  <TiptapEditor
                    v-bind="field"
                    v-model="form.site_description"
                    :content="form.site_description"
                    placeholder="درباره سایت"
                    ref="tiptap"
                  >
                  </TiptapEditor>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="site_description" />
                </div>
              </hx-form-group>
            </div>
          </div>
        </div>
      </section>

      <section class="col-span-12 space-y-4">
        <div class="hx-card">
          <div class="hx-card__header">
            <h4 class="text-gray-600 text-xl">لوگوی سایت</h4>
          </div>
          <div class="hx-card__body">
            <hx-upload
              :max="1"
              v-model="form.logo"
              :sources="form.logo"
            ></hx-upload>
          </div>
        </div>
      </section>

      <section class="col-span-12 space-y-4">
        <div class="hx-card">
          <div class="hx-card__header">
            <h4 class="text-gray-600 text-xl">بنر THB (بنر بالای منو)</h4>
          </div>
          <div class="hx-card__body">
            <hx-upload
              :max="1"
              v-model="form.thb"
              :sources="form.thb"
            ></hx-upload>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
//@ts-nocheck
import { onMounted, ref, watch, reactive, watchEffect } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import TiptapEditor from "@/components/common/tiptap/tiptap-editor.vue";
import ApiService from "@/core/services/ApiService";
const emit = defineEmits(["update:modelValue", "media"]);
const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
});
const form = ref({
  site_name: "",
  site_description: "",
  support_text: "",
  email: null,
  phone: null,
  address: null,
  copyright: "",
  logo: null,
  thb: null,
});
const tiptap = ref(null);

watch(
  () => form.value,
  (val, oldVal) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);


watchEffect(() => {
  if (props.data) form.value = props.data;
});

onMounted(() => {});
</script>

<style scoped></style>
