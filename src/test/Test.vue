<template>
  <h1>切换上位置</h1>
  <div class="drag-box">
    <Draggable
      :list="list"
      :animation="100"
      class="list-group"
      group="componentsGroup"
      item-key="id"
    >
      <template #item="{ element }">
        <div class="items">
          <div class="title">{{ element.label }}</div>
          <img :src="element.img" height="100" alt="111" />
        </div>
      </template>
    </Draggable>
  </div>
  <h1>切换下位置111</h1>
  <div class="drag-box">
    <Draggable
      :list="cloneList"
      :animation="100"
      class="list-group"
      group="componentsGroup"
    >
      <template #item="{ element }">
        <div class="items">
          <div class="title">{{ element.label }}</div>
          <img :src="element.img" height="100" alt="111" />
        </div>
      </template>
    </Draggable>
  </div>
</template>

<script setup>
import { reactive } from "vue";
// 引入vuedraggable拖拽组件
import Draggable from "vuedraggable";
// 引入图片
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.jpg";

const testObj = {
  tag: "div",
  style: "width: 200%;",
};

const list = reactive([
  {
    img: img1,
    label: "图片1",
    id: 1,
  },
  {
    img: img2,
    label: "图片2",
    id: 2,
  },
  {
    img: img3,
    label: "图片3",
    id: 3,
  },
]);
// 拉取存放位置的数组
const cloneList = reactive([]);
</script>

<style scoped>
.drag-box .items {
  display: flex;
  justify-content: space-between;
  width: 30%;
  padding: 20px;
  margin-bottom: 20px;
  background: #e3e3e3;
  border-radius: 8px;
  text-align: center;
}
/*
选中只是 chose，移动才有 ghost；
给 ghost 加样式和给 chose 加样式是不一样的，尽管它们近乎同时出现；
给 ghost 加样式，样式就是自己的，不会影响到 chose（默认拖拽样式），但给 chose 加样式就会影响到 ghost。
*/
/*.ghost {
  opacity: 0.5;
  background: #c8ebfb;
  border: 3px solid red !important;
}*/
.chosen {
  opacity: 0.5;
  background: #c8ebfb;
  border: 3px solid red !important;
}
/*.items {
  opacity: 0.5;
  background: #c8ebfb;
  border: 3px solid red !important;
}*/
</style>
