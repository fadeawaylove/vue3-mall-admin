import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '~/pages/index.vue'
import About from '~/pages/about.vue'
import NotFound from '~/pages/404.vue'
import Login from '~/pages/login.vue'
import Admin from '~/layouts/admin.vue';
import GoodList from '~/pages/goods/list.vue'
import CategoryList from '~/pages/category/list.vue'


// 默认路由，所有用户共享
const routes = [
    {
        path: "/",
        name: "admin",
        component: Admin,
        children: []

    },
    {
        path: "/login",
        component: Login,
        meta: {
            title: "登录"
        }
    },
    {
        path: "/about",
        component: About,
        meta: {
            title: "关于"
        }
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
        meta: {
            title: "未知页面"
        }
    }
]

// 定义动态路由
const dynamicRoute = [
    {
        path: "/",
        name: "/",
        component: Index,
        meta: {
            title: "后台首页"
        }
    },
    {
        path: "/goods/list",
        name: "/goods/list",
        component: GoodList,
        meta: {
            title: "商品管理"
        }
    },
    {
        path: "/category/list",
        name: "/category/list",
        component: CategoryList,
        meta: {
            title: "分类列表"
        }
    }
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes

})

// 动态添加路由的方法
export function addRoutes(menus) {
    // 是否有新的路由
    let hasNewRoutes = false
    const find = (arr) => {
        arr.forEach(element => {
            let item = dynamicRoute.find(o => o.path == element.frontpath)
            if (item && !router.hasRoute(item.path)) {
                router.addRoute("admin", item)
                hasNewRoutes = true
            }
            if (element.child && element.child.length > 0) {
                find(element.child)
            }
        });
    }
    find(menus)
    // console.log(router.getRoutes())
    return hasNewRoutes
}