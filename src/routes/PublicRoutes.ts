import { RouteRecordRaw } from "vue-router";
import NotFound from "../components/NotFound/index.vue";
import Login from "../components/Login/index.vue";

export const PublicRoutes: Array<RouteRecordRaw> = [
    {
        path: '/:catchAll(.*)',
        redirect: {
            name: "error"
        }
    },
    {
        path: '/error',
        component: NotFound,
        name: 'error'
    },
    {
        path: '/',
        redirect: {
            name: "Login"
        }
    },{
        path: '/login',
        component: Login,
        name: 'Login'
    }
]

