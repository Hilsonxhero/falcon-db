<template>
  <transition name="dropdown-fade">
    <ul v-if="visiable" ref="dropdownRef"
      class="absolute normal-case font-normal xs:left-0 lg:left-0 bg-white shadow overflow-hidden rounded w-48 border mt-2 py-1 px-2 lg:z-20"
      :class="dropdownKls" :tabindex="-1">
      <slot />
    </ul>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref, inject } from "vue";
import { useNamespace } from "@/core/hooks";
import { DROPDOWN_INJECTION_KEY } from "./tokens";
import useClickOutside from "@/core/hooks/useClickOutside";
import { useDropdown } from "./useDropdown";
const ns = useNamespace("dropdown");
const { _elDropdownSize } = useDropdown();
const size = _elDropdownSize.value;

const dropdownRef = ref(null)


const { onClickOutside } = useClickOutside();

onClickOutside(dropdownRef, () => {
  if (visiable.value === true) {
    console.log("here clickoutside");
    visiable.value = false;
  }
});


const dropdownKls = computed(() => {
  return [ns.b("menu"), ns.bm("menu", size?.value)];
});

// const isVisible = ref(false)

// const toggleVisibility = () {
//   isVisible.value = isVisible.value
// }

const visiable = inject("elDropdown", false)
</script>

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.1s ease-in-out;
}

.dropdown-fade-enter,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
