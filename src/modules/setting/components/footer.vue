<template>
  <section>
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <div class="hx-card">
          <div class="hx-card__header">
            <h4 class="text-gray-600 text-xl">لینک های فوتر</h4>
          </div>
          <div class="hx-card__body">
            <div class="">
              <div
                class="border-2 rounded-xl p-4 mb-3"
                v-for="(link, index) in links"
              >
                <hx-form-group label=" عنوان">
                  <hx-input
                    v-bind="field"
                    v-model="link.title"
                    placeholder=" عنوان لینک را وارد کنید"
                  >
                  </hx-input>
                </hx-form-group>

                <div>
                  <div
                    class="grid grid-cols-12 gap-4"
                    v-for="(item, i) in link.values"
                    :key="i"
                  >
                    <hx-form-group label=" عنوان" class="col-span-5">
                      <hx-input
                        v-bind="field"
                        v-model="item.title"
                        placeholder=" عنوان  را وارد کنید"
                      >
                      </hx-input>
                    </hx-form-group>
                    <hx-form-group label=" لینک" class="col-span-5">
                      <hx-input
                        v-bind="field"
                        v-model="item.url"
                        placeholder=" لینک  را وارد کنید"
                      >
                      </hx-input>
                    </hx-form-group>
                    <hx-form-group label=" عملیات" class="col-span-2">
                      <hx-button
                        class="mt-2"
                        variant="danger"
                        icon
                        @click="handleDeleteLink(link, i)"
                      >
                        <hx-icon icon="trash" class="w-7 h-7"></hx-icon>
                      </hx-button>
                    </hx-form-group>
                  </div>
                  <div class="mt-4">
                    <hx-button
                      @click="handleNewLink(link)"
                      outlined
                      variant="success"
                      >اضافه کردن لینک</hx-button
                    >
                  </div>
                </div>
              </div>

              <div class="mt-4 flex justify-center">
                <hx-button @click="handleNewRow" outlined variant="light"
                  >اضافه کردن ردیف</hx-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
//@ts-nocheck
import { onMounted, ref, watch, reactive, watchEffect } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import ApiService from "@/core/services/ApiService";
const emit = defineEmits(["update:modelValue", "media"]);
const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
});
const links = ref([
  {
    title: "",
    values: [
      { title: "", url: "" },
      { title: "", url: "" },
    ],
  },
]);

const handleNewLink = (item) => {
  item.values.push({ title: "", url: "#" });
};
const handleNewRow = () => {
  links.value.push({
    title: "",
    values: [{ title: "", url: "#" }],
  });
};
const handleDeleteLink = (item, index) => {
  item.values.splice(index, 1);
};

watch(
  () => links.value,
  (val, oldVal) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);

watchEffect(() => {
  if (props.data) links.value = props.data;
});

// onMounted(() => {
//   ApiService.get("brands")
//     .then(({ data }) => {
//       brands.value = data.data;
//     })
//     .catch(() => {});

//   ApiService.get("categories")
//     .then(({ data }) => {
//       categories.value = data.data;
//     })
//     .catch(() => {});
// });
</script>

<style scoped></style>
