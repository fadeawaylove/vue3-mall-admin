<template>
    <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
        <el-tabs v-model="activeTab" type="card" class="flex-1" @tab-remove="removeTab" @tab-change="changeTab"
            style="min-width: 100px;">
            <el-tab-pane :closable="item.path == '/' ? false : true" v-for="item in tabList" :key="item.path"
                :label="item.title" :name="item.path">
            </el-tab-pane>
        </el-tabs>


        <span class="tag-btn">
            <el-dropdown @command="handleClose">
                <span class="el-dropdown-link">
                    <el-icon class="">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>

                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>

    </div>

    <div style="height: 44px;"></div>
</template>


<script setup>
import { useTabList } from '~/utils/useTabList'
const { handleClose,
    removeTab,
    changeTab,
    initTabList,
    activeTab,
    tabList
} = useTabList()

initTabList()
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
    border: 0 !important;
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
    @apply bg-white rounded ml-auto items-center justify-center px-2 flex;
    height: 32px;
}
</style>