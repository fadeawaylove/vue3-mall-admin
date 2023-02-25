import { ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'

export function useTabList() {

    const cookies = useCookies()
    const route = useRoute()
    const router = useRouter()

    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '后台首页',
            path: '/',
        }
    ])

    // 添加标签导航
    function addTab(tab) {
        let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
        if (noTab) {
            tabList.value.push(tab)
        }
        cookies.set("tabList", tabList.value)
    }

    // 初始化标签导航
    function initTabList() {
        let tabs = cookies.get("tabList")
        if (tabs) {
            tabList.value = tabs
        }
    }

    initTabList()

    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path
        })
    })

    const changeTab = (t) => {
        activeTab.value = t
        router.push(t)
    }

    const removeTab = (t) => {
        let tabs = tabList.value
        let a = activeTab.value
        if (a == t) {
            tabs.forEach((tab, index) => {
                if (tab.path == t) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        a = nextTab.path
                    }
                }
            })
        }
        activeTab.value = a
        tabList.value = tabList.value.filter(tab => tab.path != t)
        cookies.set("tabList", tabList.value)
    }

    const handleClose = (e) => {
        if (e == "clearAll") {
            activeTab.value = "/"
            tabList.value = [{
                title: '后台首页',
                path: '/',
            }]
        }
        if (e == "clearOther") {
            tabList.value = tabList.value.filter(tab => tab.path == "/" || tab.path == activeTab.value)

        }
        cookies.set("tabList", tabList.value)

    }

    return {
        handleClose,
        removeTab,
        changeTab,
        initTabList,
        activeTab,
        tabList
    }
}
