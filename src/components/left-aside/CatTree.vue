<template>
  <!-- :props="{ class: customNodeClass }"，怎么设置这个没用呢？ -->
  <el-tree
    :data="data"
    node-key="id"
    draggable
    default-expand-all
    render-after-expand
    class="container"
    :icon="IconExpand"
    @nodeContextmenu="handleContextMenu"
    :props="defaultProps"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-end="handleDragEnd"
  >
    <template #default="{ node, data }">
      <span :class="node.level === 1 ? 'parent-node' : null">
        {{ node.label }}
      </span>
    </template>
  </el-tree>
</template>

<script setup lang="ts">
import IconExpand from "@/assets/icons/IconExpand.vue";
import type Node from "element-plus/es/components/tree/src/model/node";
import type { DragEvents } from "element-plus/es/components/tree/src/model/useDragNode";
import type { NodeDropType } from "element-plus/es/components/tree/src/tree.type";

interface Tree {
  id: number;
  label: string;
  children: Tree[];
}

// 自定义节点类名
/*const customNodeClass = (data: Tree, node: Node) => {
  return data.children.length > 0 ? "parent" : "child";
};*/

function handleContextMenu(e: MouseEvent, data: Tree) {
  console.log("context menu:", e, data);
}

const defaultProps = {
  children: "children",
  label: "label",
};

let innerDiv: HTMLDivElement | null = null;

function handleDragEnter(draggingNode: Node, dropNode: Node, ev: DragEvents) {
  // 为 dropNode 添加自定义样式类
  // 使用querySelector选择具有特定data-key的div元素内的第一个div元素
  innerDiv = document.querySelector(`div[data-key="${dropNode.key}"] > div`);
  // 如果找到了元素，则添加自定义类
  if (innerDiv) {
    innerDiv.classList.add("drag-over-node");
  }
}

function handleDragLeave(draggingNode: Node, dropNode: Node, ev: DragEvents) {
  // 为 dropNode 移除自定义样式类（还有可能没移除，因为拖的距离不够，根本就没有触发）
  if (innerDiv) {
    innerDiv.classList.remove("drag-over-node");
  }
}

function handleDragEnd(
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType, // 可能为空
  ev: DragEvents,
) {
  // 拖动结束的时候再移除一次，应对拖动距离不够，没有触发 handleDragLeave 的情况
  if (innerDiv) {
    innerDiv.classList.remove("drag-over-node");
  }
}

const data: Tree[] = [
  {
    id: 1,
    label: "待办",
    children: [],
  },
  {
    id: 2,
    label: "疑问",
    children: [
      {
        id: 3,
        label: "编程",
        children: [],
      },
      {
        id: 4,
        label: "生活",
        children: [],
      },
      {
        id: 5,
        label: "其他",
        children: [],
      },
    ],
  },
  {
    id: 6,
    label: "已办",
    children: [],
  },
];
</script>

<style scoped>
.container {
  flex-grow: 1;
  --el-tree-node-content-height: 40px;
}
:deep(.el-tree-node__content) {
  /*padding: 5px !important;*/
  /*这里不能指定 !important，否则通过 js 添加的缩进就失效了*/
  padding: 5px;
}
.parent-node {
  font-weight: bold;
}
:deep(.el-tree-node__expand-icon) {
  margin-left: 20px;
}
:deep(.drag-over-node) {
  border: 2px solid #3574f0;
  border-radius: 5px;
  background-color: rgba(53, 116, 240, 0.1);
  margin: 0 1px;
}
</style>
