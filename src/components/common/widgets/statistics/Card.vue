<template>
  <div class="hx-card" :class="[`hx-bg__${color}`]">
    <div class="hx-card__body">
      <div class="flex flex-col">
        <div>
          <hx-icon :icon="icon" class="text-white"></hx-icon>
        </div>
        <div class="mt-3 text-white">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div class="text-gray-500 text-sm my-2 text-white">
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: [String, Number],
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
    default: "success",
  },
});
</script>

<style scoped></style>
