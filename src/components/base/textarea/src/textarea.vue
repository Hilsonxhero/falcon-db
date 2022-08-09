<template>
  <div class="rounded-xl overflow-hidden relative">
    <textarea rows="5" class="form-input rounded-inherit border-2  " @input="input" :disabled="disabled"
      :placeholder="placeholder">{{ modelValue }}</textarea>
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
  emits("update:modelValue", e.target?.value);
};
</script>

<style scoped lang="scss">
.rounded-inherit {
  border-radius: inherit;
}

.form-input {
  @apply block w-full h-full outline-none text-right transition-all ease-out duration-200 shadow-md px-3 pt-2 text-sm;
  // background: #F5F8FA;
}
</style>
