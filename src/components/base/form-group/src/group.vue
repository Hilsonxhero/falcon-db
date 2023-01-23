<template>
  <div class="mb-2">
    <label class="mb-2 block text-sm text-gray-600" for="">{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: String,
});

defineOptions({
  name: "HxFormGroup",
});
</script>

<style scoped></style>
