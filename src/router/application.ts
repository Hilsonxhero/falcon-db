export default {
  path: "/",
  redirect: "/dashboard",
  component: () => import("@/layouts/app.vue"),
  children: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/views/app/dashboard.vue"),
    },

    {
      path: "/categories",
      name: "categories index",
      component: () =>
        import(/* webpackChunkName: "categories" */ "@/views/app/categories/index.vue"),
    },

    {
      path: "/categories/create",
      name: "categories create",
      component: () =>
        import("@/views/app/categories/create.vue"),
    },
  ],
};
