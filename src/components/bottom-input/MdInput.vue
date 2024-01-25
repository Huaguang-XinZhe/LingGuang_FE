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
        @keydown.ctrl.enter="handleInput"
        v-loading
        ref="myInput"
      />
    </el-col>
    <el-col :span="2" class="right-col">
      <el-button @click="handleInput">发送</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import axios from "axios";
import { ElInput, ElMessage } from "element-plus";
import { useListStore } from "@/stores/listStore";
import { useScrollStore } from "@/stores/scrollStore";
import { useItemStore } from "@/stores/itemStore";
import { requestUpdateItem } from "@/useItemUpdater";

type ClassifierType = "TRIE" | "REGEX" | "AI";

interface ClassificationResult {
  category: string;
  matchResult: string;
  classifier: ClassifierType;
}

const textarea = ref("");
const myInput = ref<InstanceType<typeof ElInput>>();
const listStore = useListStore();
const scrollStore = useScrollStore();
const itemStore = useItemStore();

// 监听 itemStore 中的 item，如果不为 null（已经被设置），就填充到输入框中
watch(
  () => itemStore.item,
  (newValue) => {
    console.log("监视到 item 变化");
    if (!newValue) return; // 为 null 直接返回
    textarea.value = newValue.content;
    // 输入框聚焦
    nextTick(() => {
      myInput.value?.focus();
    });
  },
);

/**
 * 请求新增项（与后端交互，插入数据）
 */
function requestAddItem() {
  axios
    .post("http://localhost:8080/inputs", textarea.value, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
    .then((response) => {
      // 成功回调
      console.log("axios then 响应", response.data);
      // data 拿到的是 Result，data.data 才是 ClassificationResult
      const result: ClassificationResult | null = response.data.data;
      console.log("result", result);
      if (result == null) {
        ElMessage.info("未能类属");
      } else {
        ElMessage.success(`类属于：${result.category}`);
      }
    })
    .catch((reason) => {
      // 失败回调
      // console.log("axios catch 问题：", reason.message);
      ElMessage.error(reason.message);
    });
}

function addItem() {
  // 数据库新增项
  requestAddItem();
  // 列表新增项
  listStore.addToList({
    id: 5,
    content: textarea.value,
  });
}

function updateItem() {
  // 数据库更新项
  requestUpdateItem(itemStore.item.id, textarea.value);
  // 列表更新项
  listStore.updateItem(itemStore.item, textarea.value);
}

function handleInput() {
  // 不为 null 就说明点击了填充到输入框的按钮（默认为 null，以此来区分是新增项还是更新项）
  if (itemStore.item) {
    updateItem();
  } else {
    addItem();
    // 下次模板重新渲染的时候再执行滚动，要不然只会到当前列表的底部，而不会到新增项后的列表的底部
    nextTick(() => {
      // 滚动到列表底部
      scrollStore.scrollToBottom();
    });
  }
  // 清空输入框
  textarea.value = "";
  // 重置，清为 null
  itemStore.reset();
}
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
