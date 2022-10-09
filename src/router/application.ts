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
    //categories
    {
      path: "/categories",
      name: "categories index",
      component: () => import("@/views/app/categories/index.vue"),
    },

    {
      path: "/categories/create",
      name: "categories create",
      component: () => import("@/views/app/categories/create.vue"),
    },
    {
      path: "/categories/edit/:id",
      name: "categories edit",
      component: () => import("@/views/app/categories/edit.vue"),
    },

    // categories slide
    {
      path: "/categories/slides",
      name: "categories slides index",
      component: () => import("@/views/app/categories/slides/index.vue"),
    },

    {
      path: "/categories/slides/create",
      name: "categories slides create",
      component: () => import("@/views/app/categories/slides/create.vue"),
    },
    {
      path: "/categories/slides/edit/:id",
      name: "categories slides edit",
      component: () => import("@/views/app/categories/slides/edit.vue"),
    },

    // categories banners
    {
      path: "/categories/banners",
      name: "categories banners index",
      component: () => import("@/views/app/categories/banners/index.vue"),
    },

    {
      path: "/categories/banners/create",
      name: "categories banners create",
      component: () => import("@/views/app/categories/banners/create.vue"),
    },
    {
      path: "/categories/banners/edit/:id",
      name: "categories banners edit",
      component: () => import("@/views/app/categories/banners/edit.vue"),
    },

    {
      path: "/brands",
      name: "brands index",
      component: () => import("@/views/app/brands/index.vue"),
    },

    {
      path: "/brands/create",
      name: "brands create",
      component: () => import("@/views/app/brands/create.vue"),
    },
    {
      path: "/brands/edit/:id",
      name: "brands edit",
      component: () => import("@/views/app/brands/edit.vue"),
    },

    {
      path: "/warranties",
      name: "warranties index",
      component: () => import("@/views/app/warranties/index.vue"),
    },

    {
      path: "/warranties/create",
      name: "warranties create",
      component: () => import("@/views/app/warranties/create.vue"),
    },
    {
      path: "/warranties/edit/:id",
      name: "warranties edit",
      component: () => import("@/views/app/warranties/edit.vue"),
    },

    //shipments

    {
      path: "/shipments",
      name: "shipments index",
      component: () => import("@/views/app/shipments/index.vue"),
    },

    {
      path: "/shipments/create",
      name: "shipments create",
      component: () => import("@/views/app/shipments/create.vue"),
    },
    {
      path: "/shipments/edit/:id",
      name: "shipments edit",
      component: () => import("@/views/app/shipments/edit.vue"),
    },

    //shipment types

    {
      path: "/shipment/types",
      name: "shipment types index",
      component: () => import("@/views/app/shipments/types/index.vue"),
    },

    {
      path: "/shipment/types/create",
      name: "shipment types create",
      component: () => import("@/views/app/shipments/types/create.vue"),
    },

    {
      path: "/shipment/types/edit/:id",
      name: "shipment types edit",
      component: () => import("@/views/app/shipments/types/edit.vue"),
    },

    //delivery types

    {
      path: "delivery/types",
      name: "delivery types index",
      component: () => import("@/views/app/delivery/types/index.vue"),
    },

    {
      path: "delivery/types/create",
      name: "delivery types create",
      component: () => import("@/views/app/delivery/types/create.vue"),
    },

    {
      path: "delivery/types/edit/:id",
      name: "delivery types edit",
      component: () => import("@/views/app/delivery/types/edit.vue"),
    },


    //shipment type dates

    {
      path: "shipment/cities/:id/dates",
      name: "shipment dates index",
      component: () => import("@/views/app/shipments/dates/index.vue"),
    },

    {
      path: "shipment/cities/:id/dates/create",
      name: "shipment dates create",
      component: () => import("@/views/app/shipments/dates/create.vue"),
    },

    {
      path: "shipment/cities/:id/dates/edit/:date",
      name: "shipment dates edit",
      component: () => import("@/views/app/shipments/dates/edit.vue"),
    },


    //users

    {
      path: "/users",
      name: "users index",
      component: () => import("@/views/app/users/index.vue"),
    },

    {
      path: "/users/create",
      name: "users create",
      component: () => import("@/views/app/users/create.vue"),
    },
    {
      path: "/users/edit/:id",
      name: "users edit",
      component: () => import("@/views/app/users/edit.vue"),
    },

    //permissions

    {
      path: "/permissions",
      name: "permissions index",
      component: () => import("@/views/app/permissions/index.vue"),
    },

    {
      path: "/permissions/create",
      name: "permissions create",
      component: () => import("@/views/app/permissions/create.vue"),
    },
    {
      path: "/permissions/edit/:id",
      name: "permissions edit",
      component: () => import("@/views/app/permissions/edit.vue"),
    },

    //roles

    {
      path: "/roles",
      name: "roles index",
      component: () => import("@/views/app/roles/index.vue"),
    },

    {
      path: "/roles/create",
      name: "roles create",
      component: () => import("@/views/app/roles/create.vue"),
    },
    {
      path: "/roles/edit/:id",
      name: "roles edit",
      component: () => import("@/views/app/roles/edit.vue"),
    },

    //products
    {
      path: "/products",
      name: "products index",
      component: () => import("@/views/app/products/index.vue"),
    },

    {
      path: "/products/create",
      name: "products create",
      component: () => import("@/views/app/products/create.vue"),
    },
    {
      path: "/products/edit/:id",
      name: "products edit",
      component: () => import("@/views/app/products/edit.vue"),
    },

    //products incredibles
    {
      path: "/products/incredibles",
      name: "products incredibles index",
      component: () => import("@/views/app/products/incredibles/index.vue"),
    },

    {
      path: "/products/incredibles/create",
      name: "products incredibles create",
      component: () => import("@/views/app/products/incredibles/create.vue"),
    },
    {
      path: "/products/incredibles/edit/:id",
      name: "products incredibles edit",
      component: () => import("@/views/app/products/incredibles/edit.vue"),
    },
    //products features
    {
      path: "/products/:id/features",
      name: "products features",
      component: () => import("@/views/app/products/features/index.vue"),
    },

    {
      path: "/products/:id/features/:value/edit",
      name: "products feature edit",
      component: () => import("@/views/app/products/features/edit.vue"),
    },

    //products variants
    {
      path: "/products/:id/variants",
      name: "products variants",
      component: () => import("@/views/app/products/variants/index.vue"),
    },

    {
      path: "/products/:id/variants/create",
      name: "products variants create",
      component: () => import("@/views/app/products/variants/create.vue"),
    },

    {
      path: "/products/:id/variants/:value/edit",
      name: "products variant edit",
      component: () => import("@/views/app/products/variants/edit.vue"),
    },

    //features

    {
      path: "/features",
      name: "features index",
      component: () => import("@/views/app/features/index.vue"),
    },

    {
      path: "/features/create",
      name: "features create",
      component: () => import("@/views/app/features/create.vue"),
    },
    {
      path: "/features/edit/:id",
      name: "features edit",
      component: () => import("@/views/app/features/edit.vue"),
    },
    {
      path: "/features/:id/values",
      name: "features values",
      component: () => import("@/views/app/features/values/index.vue"),
    },
    {
      path: "/features/:id/values/:value/edit",
      name: "features value edit",
      component: () => import("@/views/app/features/values/edit.vue"),
    },

    // variants

    {
      path: "/variants",
      name: "variants index",
      component: () => import("@/views/app/variants/index.vue"),
    },

    {
      path: "/variants/create",
      name: "variants create",
      component: () => import("@/views/app/variants/create.vue"),
    },
    {
      path: "/variants/edit/:id",
      name: "variants edit",
      component: () => import("@/views/app/variants/edit.vue"),
    },
    {
      path: "/variants/:id/values",
      name: "variants values",
      component: () => import("@/views/app/variants/values/index.vue"),
    },
    {
      path: "/variants/:id/values/:value/edit",
      name: "variants value edit",
      component: () => import("@/views/app/variants/values/edit.vue"),
    },

    {
      path: "/states",
      name: "states index",
      component: () => import("@/views/app/states/index.vue"),
    },

    {
      path: "/states/create",
      name: "states create",
      component: () => import("@/views/app/states/create.vue"),
    },
    {
      path: "/states/edit/:id",
      name: "states edit",
      component: () => import("@/views/app/states/edit.vue"),
    },

    {
      path: "/states/:id/cities",
      name: "states cities",
      component: () => import("@/views/app/states/cities/index.vue"),
    },
    {
      path: "/states/:id/cities/:value/edit",
      name: "states city edit",
      component: () => import("@/views/app/states/cities/edit.vue"),
    },

    // setting slide
    {
      path: "/setting/banners",
      name: "setting banners index",
      component: () => import("@/views/app/setting/banners/index.vue"),
    },

    {
      path: "/setting/banners/create",
      name: "setting banners create",
      component: () => import("@/views/app/setting/banners/create.vue"),
    },
    {
      path: "/setting/banners/edit/:id",
      name: "setting banners edit",
      component: () => import("@/views/app/setting/banners/edit.vue"),
    },

    // setting pages
    {
      path: "/setting/pages",
      name: "setting pages index",
      component: () => import("@/views/app/setting/pages/index.vue"),
    },

    {
      path: "/setting/pages/create",
      name: "setting pages create",
      component: () => import("@/views/app/setting/pages/create.vue"),
    },
    {
      path: "/setting/pages/edit/:id",
      name: "setting pages edit",
      component: () => import("@/views/app/setting/pages/edit.vue"),
    },

    // setting variables

    {
      path: "/setting/variables",
      name: "setting variables index",
      component: () => import("@/views/app/setting/variables/index.vue"),
    },

    //articles

    {
      path: "/articles",
      name: "articles index",
      component: () => import("@/views/app/articles/index.vue"),
    },

    {
      path: "/articles/create",
      name: "articles create",
      component: () => import("@/views/app/articles/create.vue"),
    },
    {
      path: "/articles/edit/:id",
      name: "articles edit",
      component: () => import("@/views/app/articles/edit.vue"),
    },
  ],
};
