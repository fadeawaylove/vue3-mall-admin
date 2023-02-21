<template>
    <div class="f-menu">
        <el-menu default-active="2" class=" border-0" @select="handleSelect">


            <template v-for="(item, index) in asidemenus" :key="index">

                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name" :key="index">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>

                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
                        <template #title>
                            <el-icon>
                                <component :is="item2.icon"></component>
                            </el-icon>
                            <span>{{ item2.name }}</span>
                        </template>
                    </el-menu-item>

                </el-sub-menu>

                <el-menu-item v-else :index="item.frontpath">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>

                </el-menu-item>

            </template>

        </el-menu>


    </div>
</template>



<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const asidemenus = [
    { name: "后台面板", 'icon': "help", child: [{ name: "主控台", icon: "home-filled", frontpath: '/' }] },
    { name: "商城管理", 'icon': "shopping-bag", child: [{ name: "商品管理", icon: "shopping-cart-full", frontpath: '/goods/list' }] }
]


const handleSelect = (e) => {
    router.push(e)
}
</script>


<style>
.f-menu {
    top: 64px;
    bottom: 0px;
    left: 0px;
    width: 250px;
    overflow: auto;
    @apply shadow-md fixed bg-light-50;
}
</style>