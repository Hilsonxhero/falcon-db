export default {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/app.vue"),
    children: [
        //products
        {
            path: "/orders",
            name: "orders index",
            component: () => import("@/modules/order/views/orders/index.vue"),
        },


    ],
};
