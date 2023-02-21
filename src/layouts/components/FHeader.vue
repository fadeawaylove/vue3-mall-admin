<template>
    <div class="f-header">

        <span class="logo">
            <el-icon class="mr-1">
                <Goods />
            </el-icon>
            顶呱呱
        </span>

        <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
            <Fold v-if="$store.state.asideWidth == '250px'" />
            <Expand v-else />
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

    <FormDrawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
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

        </el-form>
    </FormDrawer>
</template>


<script setup>
import FormDrawer from '~/components/FormDrawer.vue'
import { useFullscreen } from '@vueuse/core'
import { userRepassword, userLogout } from '~/utils/userManager'

const { isFullscreen, toggle } = useFullscreen()
const {
    formDrawerRef,
    form,
    formRef,
    rules,
    onSubmit,
    openRepasswordForm
} = userRepassword()

const {
    handleLogout
} = userLogout()

const handleCommand = (c) => {
    switch (c) {
        case "logout":
            handleLogout()
            break;
        case "rePassword":
            openRepasswordForm()
            break;
        default:
            break;
    }
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