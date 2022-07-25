<template>
  <teleport to="body" v-if="active">
    <div :tabindex="-1"
      class="hx-overlay h-screen w-screen bg-gray-400 fixed inset-0 z-[12] lg:z-[120] hidden is-active">
      <slot />
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { watch } from "vue";

const props = defineProps({
  active: Boolean,
});

watch(
  () => props.active,
  (selection, prevSelection) => {
    let bd = document.body.classList;
    if (!selection) {
      return bd.remove("overflow-hidden");
    }
    return bd.add("overflow-hidden");
  }
);
</script>

<style lang="scss" scoped>
.hx-overlay {
  opacity: 0;

  &.is-active {
    display: block !important;
    opacity: 0.6 !important;
  }
}
</style>
