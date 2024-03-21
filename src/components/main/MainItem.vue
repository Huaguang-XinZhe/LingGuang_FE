<!-- @format -->

<template>
  <el-card class="card">
    <template #header>
      <PreviewImages />
    </template>
    <el-text
      class="text"
      contenteditable
      @blur="handleBlur"
      @keydown.ctrl.enter="handleCtrlEnter"
    >
      {{ item.content }}
    </el-text>
    <template #footer>
      <el-row justify="space-between" align="middle">
        <el-tag
          class="tag"
          round
          size="large"
          effect="dark"
          contenteditable
          :style="{ visibility: 'hidden' }"
          >这里放类属呀</el-tag
        >
        <OperationButtons @trigger-fill-input="setItemToPinia" />
      </el-row>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import type { SampleInput } from "@/types";
import type { PropType } from "vue";
import { useListStore } from "@/stores/listStore";
import { useItemStore } from "@/stores/itemStore";
import { requestUpdateItem } from "@/hooks/useItemUpdater";

// defineProps({
//   item: Object as PropType<SampleInput>, // 这种写法在模板中应用的时候，item 有可能是 undefined
// });

const props = defineProps({
  item: {
    type: Object as PropType<SampleInput>,
    required: true, // 加个 required 就不会是 undefined 了
  },
});

const listStore = useListStore();
const itemStore = useItemStore();

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

function handleCtrlEnter(e: KeyboardEvent) {
  // console.log(e);
  const span = e.target as HTMLSpanElement;
  // 让这个 span 失去焦点
  span.blur();
  // updateItem(span.innerText); // 这里无需再处理了，blur 事件会处理
}

function handleBlur(e: FocusEvent) {
  // lastContent 不会发生变化
  // console.log(lastContent);
  const target = e.target as HTMLSpanElement;
  const text = target.innerText;
  // console.log(e, target, text);
  // 相同就返回，不同就更新列表中的数据
  const item = props.item;
  if (item.content === text) return;
  listStore.updateItem(item, text);
  // console.log(listStore.list);
  requestUpdateItem(item.id, text);
}

// 点击按钮组的填充按钮会触发这个方法，进而将当前数据设置到 Pinia
function setItemToPinia() {
  itemStore.setItem(props.item);
}
</script>

<style scoped>
.card {
  margin: 15px 20px;
  border-radius: 10px;
  user-select: none;
  min-width: 500px;
}
.tag:focus {
  outline: none;
}
.text:focus {
  outline: none;
}
</style>
