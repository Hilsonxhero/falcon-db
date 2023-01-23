<template>
  <section>
    <div class="grid grid-cols-12 gap-6">
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
  thb: null,
});

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
