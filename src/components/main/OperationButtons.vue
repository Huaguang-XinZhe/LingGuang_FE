<template>
  <el-button-group size="small">
    <el-tooltip content="添加指导" effect="light">
      <el-button type="primary" :icon="Plus" color="#626aef" plain
        >Guidance</el-button
      >
    </el-tooltip>
    <el-button
      :icon="CopyDocument"
      type="primary"
      plain
      class="copy-button"
    ></el-button>
    <el-button type="danger" :icon="Delete" plain />
  </el-button-group>
</template>

<script setup lang="ts">
import { CopyDocument, Delete, Plus } from "@element-plus/icons-vue";
</script>

<style scoped>
.copy-button {
  border: 1px solid lightgray !important;
  margin: 0 !important;
}
</style>
