export default {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/app.vue"),
    children: [
        // orders
        {
            path: "/orders",
            name: "orders index",
            component: () => import("@/modules/order/views/orders/index.vue"),
        },
        {
            path: "/orders/detail/:id",
            name: "orders detail",
            component: () => import("@/modules/order/views/orders/detail.vue"),
        },
        {
            path: "/orders/edit/:id",
            name: "orders edit",
            component: () => import("@/modules/order/views/orders/edit.vue"),
        },
    ],
};
