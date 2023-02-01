<template>
  <!--begin::Menu wrapper-->
  <div ref="scrollElRef" class="hover-scroll-overlay-y my-5 my-lg-5">
    <!--begin::Menu-->
    <div
      class="menu flex-col menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500">
      <template v-for="(item, i) in MainMenuConfig" :key="i">
        <div v-if="item.heading" class="menu-item">
          <div class="menu-content pt-8 pb-2">
            <span class="menu-section text-gray-400 text-uppercase text-sm">
              {{ translate(item.heading) }}
            </span>
          </div>
        </div>

        <template v-for="(menuItem, j) in item.pages" :key="j">
          <template v-if="menuItem.heading">
            <div class="menu-item">
              <router-link class="menu-link" active-class="active" :to="{ name: menuItem.route }">
                <span v-if="menuItem.svgIcon" class="menu-icon">
                  <span class="svg-icon svg-icon-2">
                    <!-- <inline-svg :src="menuItem.svgIcon" /> -->
                    <hx-icon :icon="menuItem.svgIcon" class="w-5 h-5"></hx-icon>
                  </span>
                </span>
                <span class="menu-title">{{
                  translate(menuItem.heading)
                }}</span>
              </router-link>
            </div>
          </template>

          <div v-if="menuItem.sectionTitle" :class="{ show: hasActiveChildren(menuItem.route) }" class="menu-item">
            <hx-collapse menu accordion>
              <hx-collapse-item menu class="menu-item">
                <template #title>
                  <span class="menu-link">
                    <span v-if="menuItem.svgIcon" class="menu-icon">
                      <span class="svg-icon svg-icon-2">
                        <!-- <inline-svg :src="menuItem.svgIcon" /> -->
                        <hx-icon :icon="menuItem.svgIcon" class="w-5 h-5"></hx-icon>
                      </span>
                    </span>
                    <span class="menu-title">{{
                      translate(menuItem.sectionTitle)
                    }}</span>
                    <span class="menu-arrow"></span>
                  </span>
                </template>

                <template v-for="(item2, k) in menuItem.sub" :key="k">
                  <div v-if="item2.heading" class="menu-item">
                    <router-link class="menu-link" active-class="active" :to="{ name: item2.route }">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{
                        translate(item2.heading)
                      }}</span>
                    </router-link>
                  </div>

                  <div v-if="item2.sectionTitle" :class="{ show: hasActiveChildren(item2.route) }" class="menu-item">
                    <hx-collapse menu accordion>
                      <hx-collapse-item menu>
                        <template #title>
                          <span class="menu-link">
                            <span class="menu-bullet">
                              <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">{{
                              translate(item2.sectionTitle)
                            }}</span>
                            <span class="menu-arrow"></span>
                          </span>
                        </template>

                        <div :class="{ show: hasActiveChildren(item2.route) }" class="">
                          <template v-for="(item3, k) in item2.sub" :key="k">
                            <div v-if="item3.heading" class="menu-item">
                              <router-link class="menu-link" active-class="active" :to="{ name: item3.route }">
                                <span class="menu-bullet">
                                  <span class="bullet bullet-dot"></span>
                                </span>
                                <span class="menu-title">{{
                                  translate(item3.heading)
                                }}</span>
                              </router-link>
                            </div>
                          </template>
                        </div>
                      </hx-collapse-item>
                    </hx-collapse>
                  </div>
                </template>
              </hx-collapse-item>
            </hx-collapse>
          </div>
        </template>
      </template>

      <div class="menu-item">
        <div class="menu-content">
          <div class="separator mx-1 my-4"></div>
        </div>
      </div>
    </div>
    <!--end::Menu-->
  </div>
  <!--end::Menu wrapper-->
</template>

<script lang="ts" setup>
//@ts-nocheck
import { defineComponent, onMounted, ref } from "vue";
// import { useI18n } from "vue-i18n/index";
import { useLocale } from "@/core/hooks";
import { useRoute } from "vue-router";
import MainMenuConfig from "@/core/config/MainMenuConfig";

const { t } = useLocale();
const route = useRoute();
const scrollElRef = ref<null | HTMLElement>(null);

onMounted(() => {
  if (scrollElRef.value) {
    scrollElRef.value.scrollTop = 0;
  }
});

const translate = (text) => {
  if (t(text)) {
    return t(text);
  } else {
    return text;
  }
};

const hasActiveChildren = (match) => {
  return route.path.indexOf(match) !== -1;
};
</script>
