<template>
  <el-tree
    :data="data"
    draggable
    default-expand-all
    render-after-expand
    class="container"
  >
    <template #default="{ node, data }">
      <el-row align="middle">
        <!--        data 是当前 item 的对象-->
        <!--        这里不能直接用 node，会报错！-->
        <el-icon><ChatRound /></el-icon>
        <el-text size="large" class="name">{{ node.label }}</el-text>
      </el-row>
    </template>
  </el-tree>
</template>

<script setup lang="ts">
import { ChatRound } from "@element-plus/icons-vue";

const data = [
  {
    label: "待办",
    children: [],
  },
  {
    label: "疑问",
    children: [
      {
        label: "编程",
        children: [],
      },
      {
        label: "生活",
        children: [],
      },
      {
        label: "其他",
        children: [],
      },
    ],
  },
  {
    label: "已办",
    children: [],
  },
];
</script>

<style scoped>
.container {
  flex-grow: 1;
  --el-tree-node-content-height: 40px;
}
.name {
  margin-left: 5px;
  margin-right: 20px;
}
</style>
