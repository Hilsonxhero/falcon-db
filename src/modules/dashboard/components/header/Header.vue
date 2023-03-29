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
      <div>
        <!-- <hx-dropdown>
          <hx-avatar src="/media/faces/2.jpg" fit="cover" shape="circle"></hx-avatar>
          <template #dropdown>
            <hx-dropdown-item v-for="(item, index) in 5" :key="index">
              آیتم شماره 1
            </hx-dropdown-item>
          </template>
        </hx-dropdown> -->

        <hx-avatar
          src="/media/faces/2.jpg"
          fit="cover"
          shape="circle"
          @click="ww"
        ></hx-avatar>

        <hx-modal :show="show" title="حساب کاربری" @close="handleFilterModal">
          <!-- {{ user.phone }} -->
          <div
            class="group t-flex-between-center border-b-gray-300 px-2 hover:bg-gray-100 border-b hover:border-transparent hover:rounded-lg transition-all"
          >
            <div class="flex items-center w-full cursor-pointer">
              <div
                class="w-[2.6rem] h-[2.6rem] flex items-center justify-center lg:w-[3.5rem] lg:h-[3.5rem] ml-3 rounded-full lg:bg-gray-100 lg:rounded-lg"
              >
                <!-- <i
                  color="#666"
                  name="t-icon-person-24px"
                  class="text-5xl transition-all material-icons t-icon-person-24px text-primary"
                ></i> -->
                <hx-icon
                  icon="user"
                  class="text-5xl transition-all material-icons t-icon-person-24px text-primary"
                ></hx-icon>
              </div>
              <div class="flex flex-col justify-between pb-3 pt-2 w-max">
                <div
                  class="leading-[1.5625rem] mb-2 text-sm font-bold lg:text-typo lg:font-extrabold"
                >
                  {{ user?.username }}
                </div>
                <div
                  class="text-typo-light text-xs leading-5 lg:font-bold text-right"
                >
                  {{ user?.phone }}
                </div>
              </div>
            </div>
            <i
              color="#666"
              name="t-icon-arrow_back_ios_new-24px"
              class="group-hover:block hidden ml-2 group-hover:text-primary text-sm transition-all material-icons t-icon-arrow_back_ios_new-24px"
            ></i>
          </div>

          <div class="mt-3">
            <div
              @click="handleLogout"
              class="group flex items-center py-2 px-2 hover:text-danger hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <!-- <hx-icon
                icon="logout"
                class="block ml-4 mr-3 text-gray-500 group-hover:text-danger text-3xl material-icons t-icon-logout-24px"
              ></hx-icon> -->
              <div
                class="flex items-center justify-center profile-item-container min-w-[2.75rem] h-11 rounded-2xl text-[rgb(188, 91, 204)] profile-item-container lg:transition lg:duration-500"
              >
                <hx-icon
                  icon="logout"
                  class="w-6 h-6 fill-current text-primary icon sprite-next text-blue-600"
                ></hx-icon>
              </div>
              <span
                class="block text-center group-hover:text-danger text-sm group-hover:font-bold font-bold mr-2"
                >خروج از حساب کاربری</span
              >
            </div>
          </div>
        </hx-modal>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from "vue";
import { useAuthStore } from "@/modules/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const store = useAuthStore();
const { user } = storeToRefs(store);

const active = ref(false);

const show = ref(false);

const router = useRouter();

const emits = defineEmits(["show-nav"]);

const ww = () => {
  show.value = !show.value;
};

const handleShowNav = () => {
  active.value = true;
  emits("show-nav", active.value);
};

const handleFilterModal = () => {
  show.value = !show.value;
};

const handleLogout = async () => {
  try {
    await store.logout();
    router.push({ name: "auth" });
  } catch (error) {}
};

// const hide = () => {
//   active.value = false;
//   emits("show-nav", active.value);
// };
</script>

<style scoped></style>
