export default {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/app.vue"),
    children: [
        //categories
        {
            path: "/categories",
            name: "categories index",
            component: () => import("@/modules/category/views/index.vue"),
        },

        {
            path: "/categories/create",
            name: "categories create",
            component: () => import("@/modules/category/views/create.vue"),
        },
        {
            path: "/categories/edit/:id",
            name: "categories edit",
            component: () => import("@/modules/category/views/edit.vue"),
        },

        // categories slide
        {
            path: "/categories/slides",
            name: "categories slides index",
            component: () => import("@/modules/category/views/slides/index.vue"),
        },

        {
            path: "/categories/slides/create",
            name: "categories slides create",
            component: () => import("@/modules/category/views/slides/create.vue"),
        },
        {
            path: "/categories/slides/edit/:id",
            name: "categories slides edit",
            component: () => import("@/modules/category/views/slides/edit.vue"),
        },

        // categories banners
        {
            path: "/categories/banners",
            name: "categories banners index",
            component: () => import("@/modules/category/views/banners/index.vue"),
        },

        {
            path: "/categories/banners/create",
            name: "categories banners create",
            component: () => import("@/modules/category/views/banners/create.vue"),
        },
        {
            path: "/categories/banners/edit/:id",
            name: "categories banners edit",
            component: () => import("@/modules/category/views/banners/edit.vue"),
        },

    ],
};
