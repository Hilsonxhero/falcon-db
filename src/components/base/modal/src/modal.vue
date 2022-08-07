<template>
  <teleport to="body" v-if="showModal">
    <div :class="ns.e('container')" v-show="showModal">
      <div class="flex flex-col p-5" :class="[ns.e('content'), fs && ns.e('fs')]" role="dialog" ref="modal">
        <div class="flex items-center justify-between">
          <template v-if="!$slots.header">
            <div>
              <h5>{{ title }}</h5>
            </div>
            <hx-button icon variant="gray" @click="closeModal">
              <hx-icon icon="close" class="w-6 h-6"></hx-icon>
            </hx-button>
          </template>

          <template v-else>
            <slot name="header" :close="closeModal"></slot>
          </template>
        </div>

        <div class="mt-6" :class="ns.e('body')">
          <slot></slot>
        </div>

        <div class="pt-4" :class="ns.e('footer')">
          <slot name="footer" :close="closeModal"></slot>
        </div>
      </div>
    </div>
  </teleport>
  <hx-overlay :active="showModal"></hx-overlay>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { useNamespace } from "@/core/hooks";

import useClickOutside from "@/core/hooks/useClickOutside";

const ns = useNamespace("modal");

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
  },
  fs: {
    type: Boolean,
    default: false,
  },
});

const showModal = ref(false);
const modal = ref(null);
const { onClickOutside } = useClickOutside();

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

onClickOutside(modal, () => {
  console.log("here onClickOutside");

  if (showModal.value === true) {
    closeModal();
  }
});

watch(
  () => props.show,
  (show) => {
    showModal.value = show;
  }
);
</script>

<style scoped>
</style>
