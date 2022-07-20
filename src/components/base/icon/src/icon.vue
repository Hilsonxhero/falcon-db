<template>
  <inline-svg
    class="hx-icon"
    fill="currentColor"
    :src="`/media/icons/${icon}.svg`"
    :class="[right && 'hx-icon__right', left && 'hx-icon__left']"
  ></inline-svg>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
  },
  right: {
    type: Boolean,
    default: () => false,
  },
  left: {
    type: Boolean,
    default: () => false,
  },
});
</script>

<style scoped></style>
