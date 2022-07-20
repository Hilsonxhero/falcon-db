<template>
  <label>
    <span class="mt-1">
      <input
        class="switch"
        ref="radioRef"
        :value="modelValue"
        :name="name"
        :disabled="disabled"
        type="checkbox"
        @change="handleChange"
      />
      <span></span>
    </span>
    <span class="w-full" @keydown.stop>
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, nextTick } from "vue";

const props = defineProps({
  modelValue: [String, Number, Object, Array],
  value: [String, Number, Object, Array],
  disabled: {
    type: Boolean,
    default: () => false,
  },
  name: {
    type: String,
  },

  label: {
    type: String,
  },
});
const emits = defineEmits(["update:modelValue", "change"]);

function handleChange(e: any) {
  console.log("e.target?.value", e.target?.value);
  nextTick(() => emits("update:modelValue", e.target?.value));
}
</script>

<style scoped lang="scss"></style>
