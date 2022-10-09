export default {
  path: "/",
  redirect: "/dashboard",
  component: () => import("@/layouts/app.vue"),
  children: [

  ],
};
