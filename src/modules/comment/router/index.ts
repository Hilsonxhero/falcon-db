export default {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/app.vue"),
    children: [
        {
            path: "/scores/models",
            name: "score models index",
            component: () => import("@/modules/comment/views/scores/index.vue"),
        },

        {
            path: "/scores/models/create",
            name: "score models create",
            component: () => import("@/modules/comment/views/scores/create.vue"),
        },
        {
            path: "/scores/models/edit/:id",
            name: "score models edit",
            component: () => import("@/modules/comment/views/scores/edit.vue"),
        },

        {
            path: "/comments",
            name: "comments index",
            component: () => import("@/modules/comment/views/comments/index.vue"),
        },

        {
            path: "/comments/edit/:id",
            name: "comments edit",
            component: () => import("@/modules/comment/views/comments/edit.vue"),
        },

    ],
};
