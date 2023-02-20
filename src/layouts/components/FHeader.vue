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

    <FormDrawer ref="formDrawerRef">
        alsdjlkajdlajd
        <div style="height: 1000px;"></div>
    </FormDrawer>
<!-- <el-drawer v-model="drawer" title="修改密码" size="40%" :close-on-click-modal="false">

        <el-form :model="form" :rules="rules" ref="formRef" label-width="80px" size="small">
        <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码">
        </el-input>
        </el-form-item>

        <el-form-item prop="password" label="新密码">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
        </el-input>
        </el-form-item>

        <el-form-item prop="repassword" label="确认密码">
        <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password>
        </el-input>
        </el-form-item>

        <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
        </el-form-item>

        </el-form>

        </el-drawer> --></template>


<script setup>
import FormDrawer from '~/components/FormDrawer.vue'
import { showModal, toast } from '~/utils/notify'
import { updatepassword } from '~/api/manager'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
import { ref, reactive } from 'vue'
const { isFullscreen, toggle } = useFullscreen()


const router = useRouter()
const store = useStore()
const drawer = ref(false)
const formDrawerRef = ref(null)


const handleCommand = (c) => {
    switch (c) {
        case "logout":
            handleLogout()
            break;
        case "rePassword":
            // drawer.value = true
            formDrawerRef.value.open()
            break;
        default:
            break;
    }
}

function handleLogout() {
    showModal("是否退出登录").then(res => {
        toast("退出登录成功")
        store.dispatch("logout").then(res => {
            router.push("/login")
        })
    }).catch(() => { })
}


const handleRefresh = () => location.reload()



// 修改密码表单
const form = reactive({
    oldpassword: '',
    password: '',
    repassword: ''
})

const formRef = ref(null)
const loading = ref(false)
const rules = {
    oldpassword: [
        { required: true, message: '旧密码不能为空', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '新密码不能为空', trigger: 'blur' },
    ],
    repassword: [
        { required: true, message: '确认密码不能为空', trigger: 'blur' },
    ]
}

const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        loading.value = true

        updatepassword(form).then(res => {
            toast("修改密码成功，请重新登录")
            store.dispatch("logout")
            router.push("/login")

        }).finally(() => {
            loading.value = false
        })

        // store.dispatch("login", form).then(res => {
        //     toast("登录成功")
        //     router.push("/")
        // }).finally(() => {
        //     loading.value = false
        // })
    })
}

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