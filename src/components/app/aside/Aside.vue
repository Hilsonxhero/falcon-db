<template>
  <!--begin::Aside-->
  <div ref="asideRef" class="hx-aside aside aside-hoverable drawer-end" :class="[
    asideTheme === 'light' && 'aside-light',
    asideTheme === 'dark' && 'aside-dark',
    show && 'drawer-on',
  ]">
    <!--begin::Brand-->
    <div class="aside-logo flex-column-auto py-6">
      <!--begin::Logo-->
      <a class="mx-auto flex justify-center" href="#" v-if="asideTheme === 'dark'">
        <!-- <img alt="Logo" :src="darkLogo" class="h-25px logo" /> -->
        <hx-icon icon="logo" class=""></hx-icon>
      </a>
      <a class="mx-auto flex justify-center" href="#" v-if="asideTheme === 'light'">
        <!-- <img alt="Logo" :src="lightLogo" class="h-25px logo" /> -->
        <hx-icon icon="logo" class=""></hx-icon>
      </a>
      <!--end::Logo-->

      <!--begin::Aside toggler-->
      <div class="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle">
        <span class="svg-icon svg-icon-1 rotate-180">
          <inline-svg src="media/icons/duotune/arrows/arr080.svg" />
        </span>
      </div>
      <!--end::Aside toggler-->
    </div>
    <!--end::Brand-->

    <!--begin::Aside menu-->
    <div class="aside-menu flex-column-fluid">
      <HXMenu></HXMenu>
    </div>
    <!--end::Aside menu-->

    <!--begin::Footer-->
    <div class="aside-footer flex-column-auto pt-5 pb-7 px-5">
      <a href="" class="btn btn-custom btn-primary w-100"
        title="Check out the complete documentation with over 100 components">
        <span class="btn-label">
          {{ t("docsAndComponents") }}
        </span>
        <span class="svg-icon btn-icon svg-icon-2">
          <inline-svg src="media/icons/duotune/general/gen005.svg" />
        </span>
      </a>
    </div>
    <hx-overlay :active="show"></hx-overlay>
    <!--end::Footer-->
  </div>
  <!--end::Aside-->
</template>

<script setup lang="ts">
import HXMenu from "@/components/app/aside/Menu.vue";
import { asideTheme } from "@/core/helpers/config";
import { ref, inject } from "vue";
import { useI18n } from "vue-i18n/index";
import useClickOutside from "@/core/hooks/useClickOutside";

const props = defineProps({
  lightLogo: {
    type: String,
  },
  darkLogo: {
    type: String,
  },
  // show: {
  //   type: Boolean,
  // },
});
const asideRef = ref(null);

const show = inject("show", false);

const { onClickOutside } = useClickOutside();

onClickOutside(asideRef, () => {
  if (show.value === true) {
    show.value = false;
  }
});

// const handleShowNav = (value: boolean) => {
//   active.value = value;
// };

const { t } = useI18n();
</script>

<style scoped>
</style>
