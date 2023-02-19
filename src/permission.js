import router from '~/router/index'
import { getToken } from '~/utils/auth'
import { toast } from '~/utils/notify'
import store from './store'


router.beforeEach(async (to, from, next) => {
    const token = getToken()
    console.log(to, from, token)

    if (!token && to.path != "/login") {
        toast("请先登录", "error")
        return next({ path: "/login" })
    }
    if (token && to.path == "/login") {
        toast("请勿重复登录", "error")
        return next({ path: from.path ? from.path : "/" })
    }

    if (token) {
        await store.dispatch('getinfo')
    }

    next();
})
