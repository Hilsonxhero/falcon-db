<template>
  <div class="mb-2">
    <label class="mb-2 block" for="">{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: String,
});
</script>

<style scoped></style>
