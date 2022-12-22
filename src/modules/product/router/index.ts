export default {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/app.vue"),
    children: [
        //products
        {
            path: "/products",
            name: "products index",
            component: () => import("@/modules/product/views/products/index.vue"),
        },
        {
            path: "/products/create",
            name: "products create",
            component: () => import("@/modules/product/views/products/create.vue"),
        },
        {
            path: "/products/edit/:id",
            name: "products edit",
            component: () => import("@/modules/product/views/products/edit.vue"),
        },

        //products incredibles
        {
            path: "/products/incredibles",
            name: "products incredibles index",
            component: () => import("@/modules/product/views/products/incredibles/index.vue"),
        },

        {
            path: "/products/incredibles/create",
            name: "products incredibles create",
            component: () => import("@/modules/product/views/products/incredibles/create.vue"),
        },
        {
            path: "/products/incredibles/edit/:id",
            name: "products incredibles edit",
            component: () => import("@/modules/product/views/products/incredibles/edit.vue"),
        },
        //products features
        {
            path: "/products/:id/features",
            name: "products features",
            component: () => import("@/modules/product/views/products/features/index.vue"),
        },

        {
            path: "/products/:id/features/:value/edit",
            name: "products feature edit",
            component: () => import("@/modules/product/views/products/features/edit.vue"),
        },

        //products variants
        {
            path: "/products/:id/variants",
            name: "products variants",
            component: () => import("@/modules/product/views/products/variants/index.vue"),
        },

        {
            path: "/products/:id/variants/create",
            name: "products variants create",
            component: () => import("@/modules/product/views/products/variants/create.vue"),
        },

        {
            path: "/products/:id/variants/:value/edit",
            name: "products variant edit",
            component: () => import("@/modules/product/views/products/variants/edit.vue"),
        },


        //features

        {
            path: "/features",
            name: "features index",
            component: () => import("@/modules/product/views/features/index.vue"),
        },

        {
            path: "/features/create",
            name: "features create",
            component: () => import("@/modules/product/views/features/create.vue"),
        },
        {
            path: "/features/edit/:id",
            name: "features edit",
            component: () => import("@/modules/product/views/features/edit.vue"),
        },
        {
            path: "/features/:id/values",
            name: "features values",
            component: () => import("@/modules/product/views/features/values/index.vue"),
        },
        {
            path: "/features/:id/values/:value/edit",
            name: "features value edit",
            component: () => import("@/modules/product/views/features/values/edit.vue"),
        },

        // variants

        {
            path: "/variants",
            name: "variants index",
            component: () => import("@/modules/product/views/variants/index.vue"),
        },

        {
            path: "/variants/create",
            name: "variants create",
            component: () => import("@/modules/product/views/variants/create.vue"),
        },
        {
            path: "/variants/edit/:id",
            name: "variants edit",
            component: () => import("@/modules/product/views/variants/edit.vue"),
        },
        {
            path: "/variants/:id/values",
            name: "variants values",
            component: () => import("@/modules/product/views/variants/values/index.vue"),
        },
        {
            path: "/variants/:id/values/:value/edit",
            name: "variants value edit",
            component: () => import("@/modules/product/views/variants/values/edit.vue"),
        },

    ],
};