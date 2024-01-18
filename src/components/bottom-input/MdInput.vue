<script setup lang="ts">
import { ref } from "vue";

const textarea = ref("");
</script>

<template>
  <el-input
    v-model="textarea"
    :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"
    placeholder="Please input"
  />
</template>
<style scoped></style>
