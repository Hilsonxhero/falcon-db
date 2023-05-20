<template>
  <button
    type="button"
    class="btn-next"
    :disabled="internalDisabled"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
  >
    <span v-if="nextText">{{ nextText }}</span>
    <hx-icon v-else icon="arrow-left" class="w-6 h-6"></hx-icon>
  </button>
</template>

<script lang="ts" setup>
// @ts-nocheck
// @ts-ignore
import { computed } from "vue";
import { paginationNextProps } from "./next";

const props = defineProps(paginationNextProps);
defineEmits(["click"]);
const internalDisabled = computed(
  () =>
    props.disabled ||
    props.currentPage === props.pageCount ||
    props.pageCount === 0
);
</script>
