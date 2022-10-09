export default {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/app.vue"),
    children: [
        {
            path: "/dashboard",
            name: "dashboard",
            component: () =>
                import(/* webpackChunkName: "dashboard" */ "@/modules/dashboard/views/dashboard.vue"),
        },

    ],
};
