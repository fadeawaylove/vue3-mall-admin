<template>
    <div>
        后台首页 <el-button @click="addCount">{{ count }}</el-button>
        <el-button type="primary" @click="addCount2">{{ form.count }}</el-button>
        <!-- <hello-world /> -->
    </div>
</template>


<script setup>
import { ref, reactive } from "vue";
// import HelloWorld from "~/components/HelloWorld.vue";

let count = ref(1);
function addCount() {
    console.log("addCount");
    count.value++
}

const form = reactive(
    {
        count: 2
    }
)

function addCount2() {
    console.log("addCount");
    form.count++
}
</script>