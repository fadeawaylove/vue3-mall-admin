<script setup>
</script>

<template>
  <button class="btn">按钮</button>
<!-- <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row> --></template>

<style scoped>
.btn {
  @apply bg-purple-500 text-indigo-50 px-4 py-2 rounded-full transition-all duration-500 hover: (bg-purple-900) focus:(ring-8 ring-purple-900);
}
</style>
