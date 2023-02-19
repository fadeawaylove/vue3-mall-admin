<template>
    <div>
        后台首页
        <el-button @click="set">设置</el-button>
        <el-button @click="get">读取</el-button>
        <el-button @click="remove">删除</el-button>
    </div>
</template>


<script setup>
import { useCookies } from '@vueuse/integrations/useCookies'

const cookies = useCookies(['locale'])


function set() {
    cookies.set("admin-token", "1231")
}

function get() {
    cookies.get("admin-token")
}

function remove() {
    cookies.remove("admin-token")
}
</script>