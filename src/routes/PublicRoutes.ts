import { RouteRecordRaw } from "vue-router";
import NotFound from "../components/NotFound/index.vue";
import Login from "../components/Login/index.vue";
import Dashboard from "../views/Dashboard/index.vue";
import FolderDetail from "../components/Folder/Detail/index.vue";
import SubmitFormFolder from "../components/SubmitFormFolder/index.vue";

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
    },
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'Dashboard'
    },
    {
        path: '/folders/:folderId',
        component: FolderDetail,
        name: 'FolderDetail'
    },
    {
        path: '/folder/add',
        component: SubmitFormFolder,
        name: 'SubmitFormFolder'
    }
    
]

