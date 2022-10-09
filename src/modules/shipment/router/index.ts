export default {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/app.vue"),
    children: [

        //shipments

        {
            path: "/shipments",
            name: "shipments index",
            component: () => import("@/modules/shipment/views/shipments/index.vue"),
        },

        {
            path: "/shipments/create",
            name: "shipments create",
            component: () => import("@/modules/shipment/views/shipments/create.vue"),
        },
        {
            path: "/shipments/edit/:id",
            name: "shipments edit",
            component: () => import("@/modules/shipment/views/shipments/edit.vue"),
        },

        //shipment types

        {
            path: "/shipment/types",
            name: "shipment types index",
            component: () => import("@/modules/shipment/views/shipments/types/index.vue"),
        },

        {
            path: "/shipment/types/create",
            name: "shipment types create",
            component: () => import("@/modules/shipment/views/shipments/types/create.vue"),
        },

        {
            path: "/shipment/types/edit/:id",
            name: "shipment types edit",
            component: () => import("@/modules/shipment/views/shipments/types/edit.vue"),
        },

        //delivery types

        {
            path: "delivery/types",
            name: "delivery types index",
            component: () => import("@/modules/shipment/views/delivery/types/index.vue"),
        },

        {
            path: "delivery/types/create",
            name: "delivery types create",
            component: () => import("@/modules/shipment/views/delivery/types/create.vue"),
        },

        {
            path: "delivery/types/edit/:id",
            name: "delivery types edit",
            component: () => import("@/modules/shipment/views/delivery/types/edit.vue"),
        },


        //shipment type dates

        {
            path: "shipment/cities/:id/dates",
            name: "shipment dates index",
            component: () => import("@/modules/shipment/views/shipments/dates/index.vue"),
        },

        {
            path: "shipment/cities/:id/dates/create",
            name: "shipment dates create",
            component: () => import("@/modules/shipment/views/shipments/dates/create.vue"),
        },

        {
            path: "shipment/cities/:id/dates/edit/:date",
            name: "shipment dates edit",
            component: () => import("@/modules/shipment/views/shipments/dates/edit.vue"),
        },

    ],
};
