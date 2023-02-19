<template>
    <div>
        后台首页
        {{ $store.state.user.username }}

        <el-button @click="handleLogout">退出</el-button>
    </div>
</template>


<script setup>
import { showModal, toast } from '~/utils/notify'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

function handleLogout() {
    showModal("是否退出登录").then(res => {
        store.dispatch("logout")
        router.push("/login")
        toast("退出登录成功")
    }).catch(() => { })
}

</script>