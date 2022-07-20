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

<style lang="scss" scoped>
.hx-badge {
  // height: 1.75rem;
  // width: -webkit-max-content;
  // width: -moz-max-content;
  // width: max-content;
  // border-radius: 0.375rem;
  // border-width: 2px;
  // border-color: rgba(255, 255, 255, 1);
  // background-color: rgba(255, 106, 106, 1);
  // padding-left: 0.25rem;
  // padding-right: 0.5rem;
  // color: rgba(255, 255, 255, 1);
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // color: #fff;
}
</style>
