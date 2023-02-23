<template>
    <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
        <el-tabs v-model="activeTab" type="card" class="flex-1" closable @tab-remove="removeTab"
            style="min-width: 100px;">
            <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path">
            </el-tab-pane>
        </el-tabs>


        <span class="tag-btn">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon class="">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>

    </div>
</template>


<script setup>
import { ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

const activeTab = ref('2')
const tabList = ref([
    {
        title: '后台首页',
        path: '/',
    },
    {
        title: '商城管理',
        path: '/goods/list',
    }
])

const removeTab = (targetName) => {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
        tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                    activeName = nextTab.name
                }
            }
        })
    }
    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
}

</script>


<style scoped>
.f-tag-list {
    @apply fixed bg-gray-100 flex items-center px-2;
    top: 64px;
    right: 0px;
    height: 44px;
    z-index: 100;
}

:deep(.el-tabs__header) {
    @apply mb-0;
}

:deep(.el-tabs__nav) {
    border: 0 !important;
}

:deep(.el-tabs__item) {
    @apply bg-white mx-1 rounded;
    border: 0 !important;
    height: 32px;
    line-height: 32px;
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
    line-height: 32px;
    height: 32px;
}

:deep(.is-disabled) {
    cursor: not-allowed;
    @apply text-gray-100;
}

.tag-btn {
    @apply bg-white rounded ml-auto items-center justify-center px-2;
    height: 32px;
}
</style>