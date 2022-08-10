<template>
  <div role="tablist" aria-multiselectable="true">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, provide } from "vue";
import { definePropType, isNumber, isString, mutable } from "@/core/utils";
import { ensureArray } from "@/core/utils";
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "@/core/constants";
import type { Arrayable } from "@/core/utils";
import { collapseContextKey } from "@/core/tokens";
import type { CollapseActiveName } from "./collapse";
import { collapseEmits } from "./collapse";
export type CollapseModelValue = Arrayable<CollapseActiveName>;
defineOptions({
  name: 'HxCollapse',
})
const props = defineProps({
  accordion: Boolean,
  menu: Boolean,
  modelValue: {
    type: definePropType<CollapseModelValue>([Array, String, Number]),
    default: () => mutable([] as const),
  },
});

const activeNames = ref(ensureArray(props.modelValue));

const setActiveNames = (_activeNames: CollapseActiveName[]) => {
  activeNames.value = _activeNames;
  const value = props.accordion ? activeNames.value[0] : activeNames.value;
  emits(UPDATE_MODEL_EVENT, value);
  emits(CHANGE_EVENT, value);
};

const emitChangeFn = (value: CollapseModelValue) =>
  typeof isNumber(value) || isString(value) || Array.isArray(value);

const emits = defineEmits(collapseEmits);

const handleItemClick = (name: CollapseActiveName) => {
  if (props.accordion) {
    setActiveNames([
      (activeNames.value[0] || activeNames.value[0] === 0) &&
        activeNames.value[0] === name
        ? ""
        : name,
    ]);
  } else {
    const _activeNames = [...activeNames.value];
    const index = _activeNames.indexOf(name);
    if (index > -1) {
      _activeNames.splice(index, 1);
    } else {
      _activeNames.push(name);
    }
    setActiveNames(_activeNames);
  }
};

watch(
  () => props.modelValue,
  () => (activeNames.value = ensureArray(props.modelValue)),
  { deep: true }
);

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});

defineExpose({
  /** @description active names */
  activeNames,
  /** @description set active names */
  setActiveNames,
});
</script>

<style scoped>
</style>
