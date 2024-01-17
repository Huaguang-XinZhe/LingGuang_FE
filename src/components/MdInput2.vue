<!-- @format -->

<template>
  <el-row class="container">
    <el-col :span="22" class="left-col">
      <el-input
        class="my-textarea"
        v-model="textarea"
        :autosize="{ minRows: 2, maxRows: 20 }"
        type="textarea"
        placeholder="Please input"
        resize="none"
      />
    </el-col>
    <el-col :span="2" class="right-col">
      <el-button>发送</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from "vue";

const textarea = ref("");
</script>

<style scoped>
/* 尽可能用自己的类吧，这样控制多些 */
.container {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
.left-col {
  position: relative;
}
.right-col {
  text-align: right; /* 水平居右 */
  margin: auto 0; /* 垂直居中 */
}
.my-textarea {
  width: 100%;
  position: absolute; /* 使用绝对定位固定底部 */
  bottom: 20px;
  box-sizing: border-box; /* 必须加这个，要不然左右 padding 无效，实际会维持宽度往右推 */
  padding: 0 20px;
}
/* 直接写 textarea 控制不了底层的样式 */
/* textarea {
  padding: 50px 0;
} */
</style>
