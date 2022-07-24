<template>

  <div :tabindex="-1" :class="[ns.b(), ns.is('disabled', disabled)]">
    <div @click="handleVisibilty">
      <slot />
    </div>


    <transition name="fade">
      <ul v-if="visiable" ref="dropdownRef" v-click-outside="hideDropDown"
        class="absolute normal-case font-normal xs:left-0 left-0 overflow-hidden  w-48 border mt-2  lg:z-[130]" :class="[
          dropdownKls,
          visiable && 'active'
        ]">
        <slot name="dropdown" />
      </ul>
    </transition>

    <!-- <hx-overlay :active="visiable"></hx-overlay> -->
  </div>



</template>

<script setup lang="ts">
import { provide, ref, computed, nextTick, onMounted } from "vue";
import { useId, useLocale, useNamespace, useSize } from "@/core/hooks";
import type { ButtonType } from "@/core/components/button";
import { definePropType } from "@/core/utils";
import useClickOutside from "@/core/hooks/useClickOutside";
import { useDropdown } from "./useDropdown";
import { ClickOutside } from '@/core/directives'
const props = defineProps({
  type: {
    type: definePropType<ButtonType>(String),
  },
  placement: {
    type: String,
    default: "bottom",
  },
  id: String,
  size: {
    type: String,
    default: "",
  },
  splitButton: Boolean,
  hideOnClick: {
    type: Boolean,
    default: true,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  showTimeout: {
    type: Number,
    default: 150,
  },
  hideTimeout: {
    type: Number,
    default: 150,
  },
  tabindex: {
    type: definePropType<number | string>([Number, String]),
    default: 0,
  },
  maxHeight: {
    type: definePropType<number | string>([Number, String]),
    default: "",
  },
  popperClass: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "menu",
  },
  // buttonProps: {
  //   type: definePropType<ButtonProps>(Object),
  // },
} as const);




const { _elDropdownSize } = useDropdown();
const size = _elDropdownSize.value;

const dropdownRef = ref(null)

const ns = useNamespace("dropdown");
const { t } = useLocale();

const dropdownKls = computed(() => {
  return [ns.b("menu"), ns.bm("menu", size?.value)];
});

const visiable = ref(false)
const handleVisibilty = () => {
  visiable.value = !visiable.value
}

const hideDropDown = () => {
  visiable.value = false
}

// provide('elDropdown', visiable)




</script>

<style scoped>
.translate-fade-down-enter-active,
.translate-fade-down-leave-active {
  transition: all 250ms;
  transition-timing-function: cubic-bezier(.53, 2, .36, .85);
}

.translate-fade-down-enter,
.translate-fade-down-leave-active {
  opacity: 0;
}

.translate-fade-down-enter,
.translate-fade-down-leave-to {
  position: absolute;
}

.translate-fade-down-enter {
  transform: translateY(-10px);
}

.translate-fade-down-leave-active {
  transform: translateY(10px);
}
</style>
