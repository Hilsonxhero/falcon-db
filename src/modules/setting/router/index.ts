export default {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/app.vue"),
    children: [
        // setting slide
        {
            path: "/setting/banners",
            name: "setting banners index",
            component: () => import("@/modules/setting/views/setting/banners/index.vue"),
        },

        {
            path: "/setting/banners/create",
            name: "setting banners create",
            component: () => import("@/modules/setting/views/setting/banners/create.vue"),
        },
        {
            path: "/setting/banners/edit/:id",
            name: "setting banners edit",
            component: () => import("@/modules/setting/views/setting/banners/edit.vue"),
        },

        // setting pages
        {
            path: "/setting/pages",
            name: "setting pages index",
            component: () => import("@/modules/setting/views/setting/pages/index.vue"),
        },

        {
            path: "/setting/pages/create",
            name: "setting pages create",
            component: () => import("@/modules/setting/views/setting/pages/create.vue"),
        },
        {
            path: "/setting/pages/edit/:id",
            name: "setting pages edit",
            component: () => import("@/modules/setting/views/setting/pages/edit.vue"),
        },

        // setting variables

        {
            path: "/setting/variables",
            name: "setting variables index",
            component: () => import("@/modules/setting/views/setting/variables/index.vue"),
        },

    ],
};
