<template>
  <button
    class="hx-button"
    @click="clickHandler"
    :disabled="disabled || loading"
    :type="type"
    :class="[
      `hx-button__${size}`,
      `hx-button__${vc}`,
      outlined && 'hx-button__outlined',
      disabled && `hx-button__disabled`,
      loading && `hx-button__loading`,
      pill && `rounded-full`,
      icon && `hx-button__icon`,
      icon && `hx-button__round`,
      block && `w-full`,
    ]"
  >
    <template v-if="loading">
      <span class="hx-button__content">
        <svg
          class="svg-loader__circular"
          viewBox="-10, -10, 50, 50"
          data-v-46801470=""
        >
          <path
            class="svg-loader__path"
            d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
          "
            style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
            data-v-46801470=""
          ></path>
        </svg>
      </span>
    </template>
    <template v-else>
      <span class="hx-button__content" v-if="$slots.default">
        <slot></slot>
      </span>
    </template>
    <!-- <i class="el-icon-loading" v-if="loading"></i> -->
  </button>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed, PropType } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  size: {
    type: String,
    default: "normal",
  },
  variant: {
    type: String,
    default: "primary",
  },
  type: {
    type: [String] as PropType<"button" | "reset" | "submit">,
    default: "button",
  },
  loading: {
    type: Boolean,
    default: () => false,
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
  pill: {
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
  text: {
    type: Boolean,
    default: () => false,
  },
  icon: {
    type: Boolean,
    default: () => false,
  },
  to: {
    type: [String, Object],
  },
});

defineOptions({
  name: "HxButton",
});

const router = useRouter();

const clickHandler = () => {
  if (!props.to) {
    return;
  }

  typeof props.to === "object" ? router.push(props.to) : router.go(+props.to);
};

const vc = computed(() => {
  return props.icon || props.outlined
    ? `color-${props.variant}`
    : `${props.variant}`;
});
</script>

<style lang="scss" scoped>
// @import '@/assets/sass/core/components/button.scss'
</style>
