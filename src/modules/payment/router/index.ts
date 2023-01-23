export default {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/app.vue"),
    children: [
        {
            path: "payment/methods",
            name: "payment-methods-index",
            component: () => import("@/modules/payment/views/index.vue"),
        },

        {
            path: "/payment/methods/create",
            name: "payment-methods-create",
            component: () => import("@/modules/payment/views/create.vue"),
        },
        {
            path: "/payment/methods/edit/:id",
            name: "payment-methods-edit",
            component: () => import("@/modules/payment/views/edit.vue"),
        },

    ],
};
