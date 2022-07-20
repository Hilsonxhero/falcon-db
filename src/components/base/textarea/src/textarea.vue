<template>
  <div class="rounded-xl overflow-hidden relative">
    <textarea
      rows="5"
      class="form-input rounded-inherit border-2 border-transparent focus:bg-white focus:border-blue-500"
      @input="input"
      :disabled="disabled"
      :placeholder="placeholder"
      >{{ modelValue }}</textarea
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: [String, Number, Object, Array],
  value: [String, Number, Object, Array],
  disabled: {
    type: Boolean,
    default: () => false,
  },
  placeholder: String,
});
const emits = defineEmits(["update:modelValue"]);

const input = (e: any) => {
  console.log("e.target?.value", e.target?.value);
  emits("update:modelValue", e.target?.value);
};
</script>

<style scoped lang="scss">
.rounded-inherit {
  border-radius: inherit;
}

.form-input {
  @apply block w-full h-full outline-none text-right bg-gray-100 transition-all ease-out duration-200 shadow-md px-3 pt-2 text-sm;
}
</style>
