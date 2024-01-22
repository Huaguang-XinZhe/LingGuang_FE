<!-- @format -->

<template>
  <el-card class="card">
    <template #header>
      <PreviewImages />
    </template>
    <el-text class="text" contenteditable>
      {{ content }}
    </el-text>
    <template #footer>
      <el-row justify="space-between" align="middle">
        <el-tag class="tag" round size="large" effect="dark" contenteditable
          >这里放类属呀</el-tag
        >
        <OperationButtons />
      </el-row>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import PreviewImages from "@/components/main/PreviewImages.vue";
import OperationButtons from "@/components/main/OperationButtons.vue";
// 接收 content
defineProps({
  content: String,
});

function handleDragStart(e: DragEvent) {
  //   // console.log(e);
  //   const draggingElement = e.target as HTMLElement;
  //
  //   // 改变拖拽元素的大小（不能这样改，这会直接改变原拖拽元素的大小）
  //   // draggingElement.style.width = "100px";
  //   // draggingElement.style.height = "100px";
  //
  //   // 改变拖拽 ghost 的大小
  //   const ghostElement = draggingElement.cloneNode(true) as HTMLElement;
  //   ghostElement.style.width = "100px";
  //   ghostElement.style.height = "20px";
  //   document.body.appendChild(ghostElement);
  //   e.dataTransfer?.setDragImage(ghostElement, 0, 0);
}

function handleDragEnd(e: DragEvent) {
  // 相对于视口的位置
  const x = e.clientX;
  const y = e.clientY;
  // 根据位置获取对应的元素
  const element = document.elementFromPoint(x, y);
  console.log(element);
  // 这个返回的是 x, y 位置上的所有元素及其类名组成的数组
  // const elements = document.elementsFromPoint(x, y);
  // console.log(elements);
}
</script>

<style scoped>
.card {
  margin: 15px 20px;
  border-radius: 10px;
  user-select: none;
}
.tag:focus {
  outline: none;
}
.text:focus {
  outline: none;
}
</style>
