<template>
  <label class="relative overflow-hidden flex">
    <span class="ml-2 mt-1">
      <input
        ref="radioRef"
        v-model="model"
        type="checkbox"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
        :disabled="isDisabled"
        :tabindex="tabindex"
        :name="name"
      />
      <span></span>
    </span>
    <span
      class="w-full text-right"
      :style="isChecked ? activeStyle : undefined"
      @keydown.stop
    >
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
// @ts-nocheck
// @ts-ignore
import { computed, nextTick, useSlots } from "vue";
import { useNamespace } from "@/core/hooks";
import {
  checkboxEmits,
  checkboxProps,
  useCheckbox,
  useCheckboxGroup,
} from "./checkbox";
import type { CSSProperties } from "vue";
// const props = defineProps({
//   modelValue: [String, Number, Object, Array],
//   value: [String, Number, Object, Array],
//   disabled: {
//     type: Boolean,
//     default: () => false,
//   },
//   name: {
//     type: String,
//   },

//   label: {
//     type: String,
//   },
// });
// const emits = defineEmits(["update:modelValue", "change"]);

const props = defineProps(checkboxProps);
defineEmits(checkboxEmits);

// function handleChange(e: any) {
//   nextTick(() => emits("update:modelValue", e.target?.value));
// }

const { checkboxGroup } = useCheckboxGroup();

const slots = useSlots();

const { focus, isChecked, isDisabled, size, model, handleChange } = useCheckbox(
  props,
  slots
);

const ns = useNamespace("checkbox");

const activeStyle = computed<CSSProperties>(() => {
  const fillValue = checkboxGroup?.fill?.value ?? "";
  return {
    backgroundColor: fillValue,
    borderColor: fillValue,
    color: checkboxGroup?.textColor?.value ?? "",
    boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : undefined,
  };
});
</script>

<style scoped lang="scss"></style>
