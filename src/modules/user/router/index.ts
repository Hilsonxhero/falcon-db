export default {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/app.vue"),
    children: [

        //users

        {
            path: "/users",
            name: "users index",
            component: () => import("@/modules/user/views/users/index.vue"),
        },
        {
            path: "/users/create",
            name: "users create",
            component: () => import("@/modules/user/views/users/create.vue"),
        },
        {
            path: "/users/edit/:id",
            name: "users edit",
            component: () => import("@/modules/user/views/users/edit.vue"),
        },

    ],
};
