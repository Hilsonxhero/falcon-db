import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// @ts-ignore

import auth from "@/modules/auth/router";
import article from "@/modules/article/router";
import category from "@/modules/category/router";
import brand from "@/modules/brand/router";
import warranty from "@/modules/warranty/router";
import shipment from "@/modules/shipment/router";
import user from "@/modules/user/router";
import role from "@/modules/role/router";
import dashboard from "@/modules/dashboard/router";
import product from "@/modules/product/router";
import state from "@/modules/state/router";
import setting from "@/modules/setting/router";
import payment from "@/modules/payment/router";
import order from "@/modules/order/router";
import comment from "@/modules/comment/router";
import { useAuthStore } from "@/modules/auth";


const routes: Array<RouteRecordRaw> = [
  auth, article, category,
  brand, warranty, shipment, user,
  role, dashboard, product,
  state, setting, payment, order, comment
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach(async (to, from, next) => {
  const store = useAuthStore();

  if (to.name !== "auth") {
    await store.init();
  }

  if (
    !store.loggedIn && to.name !== "auth"
  ) {
    next({ name: "auth" });
  }

  if (to.meta.guest && store.loggedIn) {
    next({ name: "dashboard" });
  }

  next();
});

export default router;
