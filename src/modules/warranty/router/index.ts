export default {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/app.vue"),
    children: [
        {
            path: "/warranties",
            name: "warranties index",
            component: () => import("@/modules/warranty/views/warranties/index.vue"),
        },

        {
            path: "/warranties/create",
            name: "warranties create",
            component: () => import("@/modules/warranty/views/warranties/create.vue"),
        },
        {
            path: "/warranties/edit/:id",
            name: "warranties edit",
            component: () => import("@/modules/warranty/views/warranties/edit.vue"),
        },

    ],
};
