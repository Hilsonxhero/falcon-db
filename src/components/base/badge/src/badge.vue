<template>
  <div
    class="hx-badge"
    :class="[
      `hx-badge__${size}`,
      `hx-badge__${vc}`,
      outlined && 'hx-badge__outlined',
      disabled && `hx-badge__disabled`,
      block && `w-full`,
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "normal",
  },
  variant: {
    type: String,
    default: "primary",
  },

  disabled: {
    type: Boolean,
    default: () => false,
  },

  block: {
    type: Boolean,
    default: () => false,
  },
  squared: {
    type: Boolean,
    default: () => false,
  },
  outlined: {
    type: Boolean,
    default: () => false,
  },
});

const vc = computed(() => {
  return props.outlined ? `color-${props.variant}` : `${props.variant}`;
});
</script>
