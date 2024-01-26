<!-- @format -->

<template>
  <!-- 套了个 container 就不会影响外边的 main 区域了（不会让 main 区域出现滚动条） -->
  <div class="container">
    <el-empty description="暂无数据" v-show="!hasData" />
    <!--   使用 v-show 的话就会加载 DOM，但用 display: none 控制其显示 -->
    <!--    别在下边两个元素的外边再套一层，会让最外层出现滚动条，而 List 容器的滚动条消失，影响滚动-->
    <h2 contenteditable v-show="hasData">{{ listStore.title }}</h2>
    <el-scrollbar
      class="scroll-container"
      ref="scrollContainer"
      v-show="hasData"
    >
      <MainItem v-for="input in listStore.list" :key="input.id" :item="input" />
      <!--      <Test />-->
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import MainItem from "./MainItem.vue";
import { useListStore } from "@/stores/listStore";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import type { ScrollIns } from "@/types";
import { useScrollStore } from "@/stores/scrollStore";

// 定义非响应式的数据（数组，里边是一个个对象）
const listStore = useListStore();
const scrollContainer = ref<ScrollIns>();
const scrollStore = useScrollStore();
// 有无数据的计算属性
const hasData = computed(() => listStore.list.length > 0);

// 监听 listStore 中的 list，如果有数据，就滚动到底部
watch(
  () => listStore.list,
  (newValue) => {
    if (newValue.length > 0) {
      console.log("监视到 list 变化，且有数据");
      // 滚动到底部
      nextTick(() => {
        scrollStore.scrollToBottom();
      });
    }
  },
);

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
/*.el-empty {
  margin-top: 90px;
}*/
h2 {
  padding: 20px;
  border-bottom: 0.1px solid #efebeb;
}
h2:focus {
  outline: none;
}
.scroll-container {
  flex: 1;
  margin-bottom: 20px;
}
</style>
