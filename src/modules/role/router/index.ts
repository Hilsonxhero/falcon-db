export default {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/app.vue"),
    children: [

        //permissions

        {
            path: "/permissions",
            name: "permissions index",
            component: () => import("@/modules/role/views/permissions/index.vue"),
        },

        {
            path: "/permissions/create",
            name: "permissions create",
            component: () => import("@/modules/role/views/permissions/create.vue"),
        },
        {
            path: "/permissions/edit/:id",
            name: "permissions edit",
            component: () => import("@/modules/role/views/permissions/edit.vue"),
        },

        //roles

        {
            path: "/roles",
            name: "roles index",
            component: () => import("@/modules/role/views/roles/index.vue"),
        },

        {
            path: "/roles/create",
            name: "roles create",
            component: () => import("@/modules/role/views/roles/create.vue"),
        },
        {
            path: "/roles/edit/:id",
            name: "roles edit",
            component: () => import("@/modules/role/views/roles/edit.vue"),
        },

    ],
};
