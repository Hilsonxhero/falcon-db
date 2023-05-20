<template>
  <li
    class="py-2 px-3 transition-all duration-150 ease-out rounded-md"
    :class="[dropdownCls]"
  >
    <span class="text-gray-600">
      <slot />
    </span>
  </li>
</template>

<script setup lang="ts">
// @ts-nocheck
// @ts-ignore
import { provide, ref, computed } from "vue";
import { useId, useLocale, useNamespace, useSize } from "@/core/hooks";

defineOptions({
  name: "HxDropdownItem",
});

const ns = useNamespace("dropdown");
const { t } = useLocale();

const dropdownCls = computed(() => {
  return [ns.b("item")];
});
</script>

<style scoped></style>
