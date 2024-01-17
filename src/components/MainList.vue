<!-- @format -->

<template>
  <!-- 套了个 container 就不会影响外边的 main 区域了（不会让 main 区域出现滚动条） -->
  <div class="container">
    <h2 contenteditable>{{ title }}</h2>
    <el-scrollbar class="scroll-container">
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
// 宏定义，接收父组件传来的标题
defineProps({
  title: String,
});
// 定义非响应式的数据（数组，里边是一个个对象）
const inputs = [
  {
    id: 1,
    content:
      "待办1的<br />sdfjdkfjd sfkd<br />jkfwo c监控疯狂反<br />倒发到付三分扫地k待办1的<br />sdfjdkfjd sfkd<br />jkfwo c监控疯狂反<br />倒发到付三分扫地k",
  },
  {
    id: 2,
    content: "待办2的内容",
  },
  {
    id: 3,
    content: "待办3的内容",
  },
  {
    id: 4,
    content: "待办4的内容",
  },
  {
    id: 5,
    content: "待办5的内容",
  },
];
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
