import { router, addRoutes } from '~/router'
import { getToken } from '~/utils/auth'
import { toast, showFullLoading, hideFullLoading } from '~/utils/notify'
import store from './store'

let hasGetInfo = false
router.beforeEach(async (to, from, next) => {
    // 显示loading
    showFullLoading()

    const token = getToken()
    // console.log(to, from, token)

    if (!token && to.path != "/login") {
        toast("请先登录", "error")
        return next({ path: "/login" })
    }
    if (token && to.path == "/login") {
        toast("请勿重复登录", "error")
        return next({ path: from.path ? from.path : "/" })
    }
    let hasNewRoutes = false
    if (token && !hasGetInfo) {
        let { menus } = await store.dispatch('getinfo')
        // 动态添加路由
        hasNewRoutes = addRoutes(menus)
        hasGetInfo = true
    }

    let title = (to.meta.title ? to.meta.title : "") + "-呱呱呱"
    document.title = title
    hasNewRoutes ? next(to.fullPath) : next()
})


router.afterEach((to, from) => hideFullLoading())