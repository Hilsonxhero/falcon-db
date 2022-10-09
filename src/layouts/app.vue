<template>
  <!-- <HXLoader v-if="loaderEnabled" :logo="loaderLogo"></HXLoader> -->

  <!-- begin:: Body -->
  <div class="page flex flex-row flex-column-fluid">
    <!-- begin:: Aside Left -->
    <HXAside
      v-if="asideEnabled"
      :lightLogo="themeLightLogo"
      :darkLogo="themeDarkLogo"
    ></HXAside>
    <!-- end:: Aside Left -->

    <div class="flex flex-col flex-row-fluid wrapper">
      <HXHeader title="pageTitle" @show-nav="handleShowNav"></HXHeader>

      <!-- begin:: Content -->
      <div class="content flex flex-col flex-column-fluid">
        <!-- begin:: Content Head -->
        <HXToolbar
          v-if="subheaderDisplay"
          :breadcrumbs="[]"
          title="pageTitle"
        />
        <!-- end:: Content Head -->

        <!-- begin:: Content Body -->
        <div class="post flex flex-column-fluid">
          <div
            :class="{
              'container-fluid': contentWidthFluid,
              'container w-full': !contentWidthFluid,
            }"
          >
            <router-view />
          </div>
        </div>
        <!-- end:: Content Body -->
      </div>
      <!-- end:: Content -->
      <HXFooter></HXFooter>
    </div>
  </div>
  <!-- end:: Body -->
</template>

<script setup lang="ts">
import HXHeader from "@/modules/dashboard/components/header/Header.vue";
import HXFooter from "@/modules/dashboard/components/footer/Footer.vue";
import HXToolbar from "@/modules/dashboard/components/toolbar/Toolbar.vue";
import HXAside from "@/modules/dashboard/components/aside/Aside.vue";

import {
  toolbarDisplay,
  loaderEnabled,
  contentWidthFluid,
  loaderLogo,
  asideEnabled,
  subheaderDisplay,
  themeLightLogo,
  themeDarkLogo,
} from "@/core/helpers/config";

import HtmlClass from "@/core/services/LayoutService";
import { ref, provide } from "vue";

// import useClickOutside from "@/core/hooks/useClickOutside";

const active = ref(false);

// const { onClickOutside } = useClickOutside();

// onClickOutside(modal, () => {
//   if (showModal.value === true) {
//      active.value = false;
//   }
// });

const handleShowNav = (value: boolean) => {
  active.value = value;
};

provide("show", active);

// HtmlClass.init();
</script>

<style scoped></style>
