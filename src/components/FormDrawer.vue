<template>
    <el-drawer v-model="showDrawer" title="修改密码" size="45%" :close-on-click-modal="false">
        <div class="formDrawer">
            <div class="body">
                <slot></slot>
            </div>
            <div class="actions">
                <el-button type="primary">提交</el-button>
                <el-button type="default" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>


<script setup>
import { ref } from 'vue'
const showDrawer = ref(false)
const open = () => showDrawer.value = true
const close = () => showDrawer.value = false

defineExpose({
    open,
    close
})

</script>


<style>
.formDrawer {
    width: 100%;
    height: 100%;
    position: relative;
    @apply flex flex-col;
}

.formDrawer .body {
    overflow-y: auto;
}

.formDrawer .actions {
    height: 50px;
    @apply mt-auto flex items-center;
}
</style>