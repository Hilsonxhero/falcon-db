<template>
  <div class="header items-stretch">
    <div class="container flex items-center justify-between">
      <div>
        <!--begin::Aside mobile toggle-->
        <div class="flex items-center lg:hidden ml-3" @click="handleShowNav">
          <div class="btn btn-icon btn-active-light-primary">
            <span class="svg-icon svg-icon-2x mt-1">
              <hx-icon icon="menu" class="w-7 h-7 text-gray-500" />
            </span>
          </div>
        </div>
        <!--end::Aside mobile toggle-->
      </div>
      <div>ss</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const active = ref(false);

const emits = defineEmits(["show-nav"]);

const handleShowNav = () => {
  active.value = true;
  emits("show-nav", active.value);
};

// const hide = () => {
//   active.value = false;
//   emits("show-nav", active.value);
// };
</script>

<style scoped></style>
