<template>
  <teleport to="body">
    <!-- <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        class="hx-modal__content fixed z-[14] inset-0 overflow-y-auto"
        v-show="showModal"
      >
        <div
          class="hx-modal flex items-start justify-center min-h-screen pt-24 text-center"
        >
          <transition
            enter-active-class="transition ease-out duration-300 transform "
            enter-from-class="opacity-0 translate-y-10 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
          >
            <div
              class="relative bg-white overflow-hidden rounded-lg text-left shadow-xl p-8 w-1/2"
              role="dialog"
              ref="modal"
              aria-modal="true"
              v-show="showModal"
              aria-labelledby="modal-headline"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h5>{{ title }}</h5>
                </div>

                <hx-button icon variant="gray" @click="closeModal">
                  <hx-icon icon="close" class="w-6 h-6"></hx-icon>
                </hx-button>
              </div>

              <div class="overflow-y-auto p-5">
                <slot></slot>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition> -->

    <div class="modal__container" v-show="showModal">
      <div class="modal__content flex flex-col p-5" :class="[fs && 'modal__fs']" role="dialog" ref="modal">
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

        <div class="hx-modal__body mt-6">
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
  <hx-overlay :active="showModal"></hx-overlay>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import useClickOutside from "@/core/hooks/useClickOutside";

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
.modal {
  height: 100vh;
  display: grid;
  place-items: center;
}

.hx-modal__body {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;

  overflow-y: auto;
}

.modal__container {
  position: fixed;
  top: 0;
  left: 0;
  background-color: hsla(var(--hue), 18%, 75%, 0.8);
  width: 100%;
  height: 100%;
  display: grid;
  align-items: flex-end;
  overflow: hidden;
  transition: all 0.3s;
  z-index: 1005;
  /* visibility: hidden;
  opacity: 0; */

  /*=== Effect 3 ===*/
  /* perspective: 1000px; */
}

.modal__content {
  position: relative;
  background-color: #fff;
  text-align: center;
  border-radius: 1rem 1rem 0 0;
  transition: all 0.3s;
  transform: translateY(10%);
  /* height: 20rem; */
  height: calc(80vh - 3.5rem);
  max-height: calc(80vh - 3.5rem);
  overflow: hidden;
}

.modal__close {
  display: inline-flex;
  background-color: var(--first-color);
  border-radius: 0.25rem;
  color: #fff;
  font-size: 1.5rem;
  position: absolute;
  top: 2rem;
  right: 2rem;
  cursor: pointer;
}

.show-modal .modal__content {
  transform: translateY(0);
}

.modal__content.modal__fs {
  margin: auto;
  width: 100%;
  height: 100%;
  max-height: unset !important;
  transform: unset !important;
}

/*=============== BREAKPOINTS ===============*/
/* For small devices */
@media screen and (min-width: 991px) {
  .modal__content {
    margin: auto;
    width: 380px;
    border-radius: 1.25rem;
  }

  .modal__img {
    width: 170px;
  }
}
</style>
