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
        import("@/views/app/categories/index.vue"),
    },

    {
      path: "/categories/create",
      name: "categories create",
      component: () =>
        import("@/views/app/categories/create.vue"),
    },
    {
      path: "/categories/edit/:id",
      name: "categories edit",
      component: () =>
        import("@/views/app/categories/edit.vue"),
    },

    {
      path: "/brands",
      name: "brands index",
      component: () =>
        import("@/views/app/brands/index.vue"),
    },

    {
      path: "/brands/create",
      name: "brands create",
      component: () =>
        import("@/views/app/brands/create.vue"),
    },
    {
      path: "/brands/edit/:id",
      name: "brands edit",
      component: () =>
        import("@/views/app/brands/edit.vue"),
    },

    {
      path: "/features",
      name: "features index",
      component: () =>
        import("@/views/app/features/index.vue"),
    },

    {
      path: "/features/create",
      name: "features create",
      component: () =>
        import("@/views/app/features/create.vue"),
    },
    {
      path: "/features/edit/:id",
      name: "features edit",
      component: () =>
        import("@/views/app/features/edit.vue"),
    },
    {
      path: "/features/:id/values",
      name: "features values",
      component: () =>
        import("@/views/app/features/values/index.vue"),
    },
    {
      path: "/features/:id/values/:value/edit",
      name: "features value edit",
      component: () =>
        import("@/views/app/features/values/edit.vue"),
    },
  ],
};
