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
      path: "/warranties",
      name: "warranties index",
      component: () =>
        import("@/views/app/warranties/index.vue"),
    },

    {
      path: "/warranties/create",
      name: "warranties create",
      component: () =>
        import("@/views/app/warranties/create.vue"),
    },
    {
      path: "/warranties/edit/:id",
      name: "warranties edit",
      component: () =>
        import("@/views/app/warranties/edit.vue"),
    },

    {
      path: "/shipments",
      name: "shipments index",
      component: () =>
        import("@/views/app/shipments/index.vue"),
    },

    {
      path: "/shipments/create",
      name: "shipments create",
      component: () =>
        import("@/views/app/shipments/create.vue"),
    },
    {
      path: "/shipments/edit/:id",
      name: "shipments edit",
      component: () =>
        import("@/views/app/shipments/edit.vue"),
    },

    //products 
    {
      path: "/products",
      name: "products index",
      component: () =>
        import("@/views/app/products/index.vue"),
    },

    {
      path: "/products/create",
      name: "products create",
      component: () =>
        import("@/views/app/products/create.vue"),
    },
    {
      path: "/products/edit/:id",
      name: "products edit",
      component: () =>
        import("@/views/app/products/edit.vue"),
    },

    {
      path: "/products/:id/features",
      name: "products features",
      component: () =>
        import("@/views/app/products/features/index.vue"),
    },
    {
      path: "/products/:id/features/:value/edit",
      name: "products feature edit",
      component: () =>
        import("@/views/app/products/features/edit.vue"),
    },

    //features

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

    // variants


    {
      path: "/variants",
      name: "variants index",
      component: () =>
        import("@/views/app/variants/index.vue"),
    },

    {
      path: "/variants/create",
      name: "variants create",
      component: () =>
        import("@/views/app/variants/create.vue"),
    },
    {
      path: "/variants/edit/:id",
      name: "variants edit",
      component: () =>
        import("@/views/app/variants/edit.vue"),
    },
    {
      path: "/variants/:id/values",
      name: "variants values",
      component: () =>
        import("@/views/app/variants/values/index.vue"),
    },
    {
      path: "/variants/:id/values/:value/edit",
      name: "variants value edit",
      component: () =>
        import("@/views/app/variants/values/edit.vue"),
    }
  ],
};
