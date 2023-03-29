<template>
  <div>
    <main>
      <div class="min-h-[100vh] flex flex-col">
        <div
          class="flex flex-col items-center justify-center mx-auto w-full h-full flex-1"
        >
          <div class="w-full isolate sm:w-3/5 h-[max-content] lg:w-[25.25rem]">
            <div
              class="flex flex-col justify-between h-full lg:min-w-[25.25rem]"
            >
              <router-link
                to="/"
                class="block mb-10 mx-auto w-36 h-10 nuxt-link-active"
              >
                <span class="lg:ml-5 pointer lg:min-w-[4.5rem] block">
                  <hx-icon class="w-full h-8" icon="logo"></hx-icon>
                </span>
              </router-link>

              <router-view />

              <div
                class="flex mx-auto w-max text-typo-lighter divide-x divide-x-reverse divide-x-typo-lighter my-5 leading-6"
              >
                <a
                  href="#"
                  class="px-4 text-center text-xs h-[min-content] nuxt-link-active"
                >
                  صفحه اصلی </a
                ><a href="#" class="px-4 text-center text-xs h-[min-content]">
                  حریم خصوصی </a
                ><a href="#" class="px-4 text-center text-xs h-[min-content]">
                  سوالات متداول
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss"></style>
