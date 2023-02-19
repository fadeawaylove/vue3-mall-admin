<template>
    <div class="f-header">

        <span class="logo">
            <el-icon class="mr-1">
                <Goods />
            </el-icon>
            呆瓜编程
        </span>

        <el-icon class="icon-btn">
            <Fold />
        </el-icon>


        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <el-icon class="icon-btn" @click="handleRefresh">
                <Refresh />
            </el-icon>
        </el-tooltip>

        <div class="ml-auto flex items-center">

            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <el-icon class="icon-btn" @click="toggle">
                    <FullScreen v-if="!isFullscreen" />
                    <Aim v-else />
                </el-icon>
            </el-tooltip>

            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <el-avatar :size="25" class="mr-2" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>


<script setup>

import { showModal, toast } from '~/utils/notify'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()


const router = useRouter()
const store = useStore()

const handleCommand = (c) => {
    switch (c) {
        case "logout":
            handleLogout()
            break;
        case "rePassword":
            handleLogout()
            break;
        default:
            break;
    }
}

function handleLogout() {
    showModal("是否退出登录").then(res => {
        toast("退出登录成功")
        store.dispatch("logout")
        router.push("/login")
    }).catch(() => { })
}


const handleRefresh = () => location.reload()


</script>


<style>
.f-header {
    @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 right-0 left-0;
    height: 64px;
}

.logo {
    @apply flex items-center justify-center text-xl font-thin;
    width: 250px;

}

.icon-btn {
    @apply flex items-center justify-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-indigo-600;
}

.f-header .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5;
}
</style>