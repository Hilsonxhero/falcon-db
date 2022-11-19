export default {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/app.vue"),
    children: [
        {
            path: "/states",
            name: "states index",
            component: () => import("@/modules/state/views/states/index.vue"),
        },

        {
            path: "/states/create",
            name: "states create",
            component: () => import("@/modules/state/views/states/create.vue"),
        },
        {
            path: "/states/edit/:id",
            name: "states edit",
            component: () => import("@/modules/state/views/states/edit.vue"),
        },

        {
            path: "/states/:id/cities",
            name: "states cities",
            component: () => import("@/modules/state/views/states/cities/index.vue"),
        },
        {
            path: "/states/:id/cities/:value/edit",
            name: "states city edit",
            component: () => import("@/modules/state/views/states/cities/edit.vue"),
        },

        // cities

        {
            path: "/cities",
            name: "cities index",
            component: () => import("@/modules/state/views/cities/index.vue"),
        },



    ],
};
