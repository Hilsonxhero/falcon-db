export default {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/app.vue"),
    children: [
        {
            path: "/brands",
            name: "brands index",
            component: () => import("@/modules/brand/views/brands/index.vue"),
        },

        {
            path: "/brands/create",
            name: "brands create",
            component: () => import("@/modules/brand/views/brands/create.vue"),
        },
        {
            path: "/brands/edit/:id",
            name: "brands edit",
            component: () => import("@/modules/brand/views/brands/edit.vue"),
        },

    ],
};
