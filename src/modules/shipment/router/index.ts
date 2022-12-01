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


        //deliveries

        {
            path: "deliveries",
            name: "deliveries index",
            component: () => import("@/modules/shipment/views/deliveries/index.vue"),
        },

        {
            path: "deliveries/create",
            name: "deliveries create",
            component: () => import("@/modules/shipment/views/deliveries/create.vue"),
        },

        {
            path: "deliveries/edit/:id",
            name: "deliveries edit",
            component: () => import("@/modules/shipment/views/deliveries/edit.vue"),
        },

        //shipment type cities

        {
            path: "shipment/cities/:city",
            name: "shipment cities index",
            component: () => import("@/modules/shipment/views/shipments/cities/index.vue"),
        },

        {
            path: "shipment/cities/:city/create",
            name: "shipment cities create",
            component: () => import("@/modules/shipment/views/shipments/cities/create.vue"),
        },

        {
            path: "shipment/cities/:city/edit/:id",
            name: "shipment cities edit",
            component: () => import("@/modules/shipment/views/shipments/cities/edit.vue"),
        },


        //shipment type dates

        {
            path: "shipment/:shipment/cities/:id/dates",
            name: "shipment dates index",
            component: () => import("@/modules/shipment/views/shipments/dates/index.vue"),
        },

        {
            path: "shipment/:shipment/cities/:id/dates/create",
            name: "shipment dates create",
            component: () => import("@/modules/shipment/views/shipments/dates/create.vue"),
        },

        {
            path: "shipment/cities/:id/dates/edit/:date",
            name: "shipment dates edit",
            component: () => import("@/modules/shipment/views/shipments/dates/edit.vue"),
        },

        //shipment date intervals

        {
            path: "shipment/date/:id/intervals",
            name: "shipment date intervals index",
            component: () => import("@/modules/shipment/views/shipments/intervals/index.vue"),
        },

        {
            path: "shipment/date/:id/intervals/create",
            name: "shipment date intervals create",
            component: () => import("@/modules/shipment/views/shipments/intervals/create.vue"),
        },

        {
            path: "shipment/date/:id/intervals/edit/:interval",
            name: "shipment date intervals edit",
            component: () => import("@/modules/shipment/views/shipments/intervals/edit.vue"),
        },

    ],
};
