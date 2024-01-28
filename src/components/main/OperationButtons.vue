<template>
  <el-button-group size="small">
    <el-tooltip content="添加指导" effect="light">
      <el-button type="primary" :icon="Plus" color="#626aef" plain
        >Guidance</el-button
      >
    </el-tooltip>
    <el-tooltip content="填充到输入框" effect="light">
      <el-button
        type="primary"
        :icon="Position"
        plain
        @click="triggerFillInput"
      />
    </el-tooltip>
    <el-button
      :icon="CopyDocument"
      type="primary"
      plain
      color="#858585"
    ></el-button>
    <el-button type="danger" :icon="Delete" plain />
  </el-button-group>
</template>

<script setup lang="ts">
import { CopyDocument, Delete, Plus, Position } from "@element-plus/icons-vue";

const emits = defineEmits(["trigger-fill-input"]);

function triggerFillInput() {
  emits("trigger-fill-input");
}
</script>

<style scoped></style>
