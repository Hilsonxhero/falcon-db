<template>
  <!--begin::Footer-->
  <div class="footer py-4 flex lg:flex-col">
    <!--begin::Container-->
    <div
      class="flex flex-col md:flex-row items-center justify-between"
      :class="{
        'container-fluid': footerWidthFluid,
        container: !footerWidthFluid,
      }"
    >
      <!--begin::Copyright-->
      <div class="text-dark order-2 md:order-1">
        <span class="text-gray-400 ml-1">2022&copy;</span>
        <a href="" target="_blank" class="text-gray-400 text-hover-primary"
          >hilsonxhero</a
        >
      </div>
      <!--end::Copyright-->

      <!--begin::Menu-->
      <ul class="flex items-center order-1">
        <li class="menu-item">
          <a href="#" target="_blank" class="text-gray-400 text-sm px-2"
            >پشتیبانی</a
          >
        </li>

        <li class="menu-item">
          <a href="#" target="_blank" class="text-gray-400 text-sm px-2"
            >درباره پروژه</a
          >
        </li>
      </ul>
      <!--end::Menu-->
    </div>
    <!--end::Container-->
  </div>
  <!--end::Footer-->
</template>

<script lang="ts" setup>
import { footerWidthFluid } from "@/core/helpers/config";
</script>
