<template>
  <div :class="[ns.e('item'), ns.e(variant)]">
    <!-- <picture-filled v-if="variant === 'image'" /> -->
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from "@/core/hooks";
import { skeletonItemProps } from "./skeleton-item";

defineOptions({
  name: "HxSkeletonItem",
});
defineProps(skeletonItemProps);
const ns = useNamespace("skeleton");
</script>
