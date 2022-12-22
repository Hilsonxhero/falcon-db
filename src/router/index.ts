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

const routes: Array<RouteRecordRaw> = [
  auth, article, category,
  brand, warranty, shipment, user,
  role, dashboard, product,
  state, setting, payment, order
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
