export default
    {
        path: '/auth',
        component: () => import("@/layouts/auth.vue"),
        children: [
            {
                path: '',
                name: 'auth',
                component: () => import(/* webpackChunkName: "auth" */ "@/views/auth/auth.vue"),
            },
        ]
    }