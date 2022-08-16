<template>
  <section>
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <div class="hx-card">
          <div class="hx-card__header">
            <h4 class="text-gray-600 text-xl">اطلاعات کلی</h4>
          </div>
          <div class="hx-card__body">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                <hx-form-group>
                  <Field
                    mode="passive"
                    name="title_fa"
                    v-slot="{ field }"
                    rules="required"
                    label="عنوان"
                  >
                    <hx-input
                      v-bind="field"
                      v-model="form.title_fa"
                      placeholder="عنوان"
                    >
                    </hx-input>
                  </Field>
                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="title_fa" />
                  </div>
                </hx-form-group>
              </div>
              <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                <hx-form-group>
                  <Field
                    name="title_en"
                    rules="required"
                    v-slot="{ field }"
                    label="عنوان انگلیسی"
                  >
                    <hx-input
                      v-bind="field"
                      v-model="form.title_en"
                      placeholder="عنوان انگلیسی"
                    >
                    </hx-input>
                  </Field>
                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="title_en" />
                  </div>
                </hx-form-group>
              </div>
              <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                <hx-form-group>
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
              </div>
              <div class="col-span-12 sm:col-span-6 lg:col-span-4">
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
              </div>

              <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                <hx-form-group>
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
              </div>
              <div class="col-span-12">
                <hx-form-group>
                  <Field
                    mode="passive"
                    name="review"
                    v-slot="{ field }"
                    rules="required"
                    label=" توضیحات"
                  >
                    <TiptapEditor
                      v-bind="field"
                      v-model="form.review"
                      :content="form.review"
                      ref="tiptap"
                    >
                    </TiptapEditor>
                  </Field>

                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="review" />
                  </div>
                </hx-form-group>
              </div>
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
            <!-- <Field
              mode="passive"
              name="media"
              v-slot="{ field }"
              rules="required"
              label=" تصویر"
            > -->
            <hx-upload
              :max="1"
              v-model="form.image"
              :sources="form.media?.main"
              @delete="handleDeleteThumb"
            ></hx-upload>
            <!-- </Field>

            <div class="invalid-feedback d-block">
              <ErrorMessage name="media" />
            </div> -->
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
  title_fa: "",
  title_en: "",
  category: null,
  brand: null,
  warranty: null,
  review: "",
  status: "enable",
  image: null,
});
const tiptap = ref(null);
const categories = ref<any>([]);

const brands = ref<any>([]);
const statuses = ref([
  { title: "فعال", key: "enable" },
  { title: "غیرفعال", key: "disable" },
  { title: "درحال انتظار", key: "pending" },
  { title: "رد شده", key: "rejected" },
]);
const selectedStatus = ref({ title: "فعال", key: "enable" });

const handleDeleteThumb = (id) => {
  if (id) ApiService.delete(`/media/delete/${id}`).then(() => {});
};

watch(
  () => form.value,
  (val, oldVal) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);

// watch(
//   () => props.data,
//   (val: any, oldVal) => {
//     form.value = val;
//   },
//   { deep: true }
// );

watchEffect(() => {
  if (props.data) form.value = props.data;
});

onMounted(() => {
  ApiService.get("brands")
    .then(({ data }) => {
      brands.value = data.data;
    })
    .catch(() => {});

  ApiService.get("categories")
    .then(({ data }) => {
      categories.value = data.data;
    })
    .catch(() => {});
});
</script>

<style scoped></style>
