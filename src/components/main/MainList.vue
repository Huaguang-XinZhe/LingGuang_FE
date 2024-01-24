<!-- @format -->

<template>
  <!-- 套了个 container 就不会影响外边的 main 区域了（不会让 main 区域出现滚动条） -->
  <div class="container">
    <h2 contenteditable>{{ title }}</h2>
    <el-scrollbar class="scroll-container" ref="scrollContainer">
      <MainItem
        v-for="input in inputs"
        :key="input.id"
        :content="input.content"
      />
      <!--      <Test />-->
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import MainItem from "./MainItem.vue";
import { useListStore } from "@/stores/listStore";
import { onMounted, ref } from "vue";
import type { ScrollIns } from "@/types";
import { useScrollStore } from "@/stores/scrollStore";

// 宏定义，接收父组件传来的标题
defineProps({
  title: String,
});

// 定义非响应式的数据（数组，里边是一个个对象）
const listStore = useListStore();
const inputs = listStore.list;
const scrollContainer = ref<ScrollIns>();
const scrollStore = useScrollStore();

onMounted(() => {
  // 挂在的时候 scrollContainer.value 是有值的
  // console.log("挂载", scrollContainer.value);
  // 下边的设置方法不能放在外边（setup 里），那时的 scrollContainer.value 还是 undefined
  scrollStore.setScrollIns(scrollContainer.value);
});
</script>

<style scoped>
.container {
  height: 100%; /* 必须指定高度，否则 scroll-container 还是会溢出 */
  display: flex;
  flex-direction: column;
}
h2 {
  margin: 20px;
}
h2:focus {
  outline: none;
}
.scroll-container {
  flex: 1;
  margin-bottom: 20px;
}
</style>
