<template>
  <div class="h-12 rounded-xl overflow-hidden relative">
    <input class="form-input rounded-inherit border-2 border-transparent focus:bg-gray-400  " :type="type"
      @input="input" :disabled="disabled" :value="modelValue" :placeholder="placeholder" />
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
  type: {
    type: String,
    default: "text",
  },
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
  @apply block w-full h-full outline-none text-right transition-all ease-out duration-200 shadow-md px-3 text-sm;
  background: #F5F8FA;
}
</style>
