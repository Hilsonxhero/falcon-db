<template>
  <!--begin::Aside-->
  <div
    ref="asideRef"
    class="hx-aside aside aside-hoverable drawer-end"
    :class="[
      asideTheme === 'light' && 'aside-light',
      asideTheme === 'dark' && 'aside-dark',
      show && 'drawer-on',
    ]"
  >
    <!--begin::Brand-->
    <div class="aside-logo flex-column-auto py-6">
      <!--begin::Logo-->
      <a
        class="mx-auto flex justify-center"
        href="#"
        v-if="asideTheme === 'dark'"
      >
        <!-- <img alt="Logo" :src="darkLogo" class="h-25px logo" /> -->
        <hx-icon icon="logo" class=""></hx-icon>
      </a>
      <a
        class="mx-auto flex justify-center"
        href="#"
        v-if="asideTheme === 'light'"
      >
        <!-- <img
          alt="Logo"
          src="http://127.0.0.1:9090/storage/3c4c94626f4e752ab7ef83b413ac9670/cXIenrTlcIEF2wUNLi52.svg"
          class="h-25px logo"
        /> -->
        <hx-icon icon="logo" class=""></hx-icon>
      </a>
      <!--end::Logo-->

      <!--begin::Aside toggler-->
      <div
        class="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle"
      >
        <span class="svg-icon svg-icon-1 rotate-180"> </span>
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
      <a
        href=""
        class="btn btn-custom btn-primary w-100"
        title="Check out the complete documentation with over 100 components"
      >
        <span class="btn-label">
          {{ t("docsAndComponents") }}
        </span>
        <span class="svg-icon btn-icon svg-icon-2"> </span>
      </a>
    </div>
    <hx-overlay :active="show"></hx-overlay>
    <!--end::Footer-->
  </div>
  <!--end::Aside-->
</template>

<script setup lang="ts">
//@ts-nocheck
import HXMenu from "@/modules/dashboard/components/aside/Menu.vue";
import { asideTheme } from "@/core/helpers/config";
import { ref, inject } from "vue";
// import { useI18n } from "vue-i18n/index";

import { useLocale } from "@/core/hooks";
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

const { t } = useLocale();
</script>

<style scoped></style>
