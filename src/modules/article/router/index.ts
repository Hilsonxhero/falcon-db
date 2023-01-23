export default {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/app.vue"),
    children: [
        {
            path: "/articles",
            name: "articles index",
            component: () => import("@/modules/article/views/articles/index.vue"),
        },

        {
            path: "/articles/create",
            name: "articles create",
            component: () => import("@/modules/article/views/articles/create.vue"),
        },
        {
            path: "/articles/edit/:id",
            name: "articles edit",
            component: () => import("@/modules/article/views/articles/edit.vue"),
        },

    ],
};
