<!-- @format -->

<script setup lang="ts">
import type { TreeKey } from "element-plus/es/components/tree-v2/src/types";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import type { Tree } from "@/types";
import { useAppStore } from "@/stores/appStore";
import type Node from "element-plus/es/components/tree/src/model/node";
import type { AllowDropType } from "element-plus/es/components/tree/src/tree.type";
import { unclassified } from "@/globals";
import { ElTree } from "element-plus";
import IconExpand from "@/assets/icons/IconExpand.vue";

const defaultProps = {
  children: "children",
  label: "label",
};
// 定义同名 ref，引用 el-tree 组件（可指定构造函数的实例类型）
const catTreeRef = ref<InstanceType<typeof ElTree>>();
const {
  handleDragStart,
  handleDragEnter,
  handleDragLeave,
  handleDragEnd,
  getInnerDiv,
} = useDragAndDrop();
const appStore = useAppStore();

onMounted(() => {
  // 默认选中
  // 通过 appStore 中的 currentTitle 来获取当前选中的类属
  const defaultTitle = appStore.currentTitle;
  // 通过类属名称来获取对应的 Tree 对象
  const treeObj = dataSource.find((tree) => tree.label === defaultTitle);
  // 获取类属名对应的 key（也就是数据源中的 id）
  const defaultKey = treeObj?.id as number;
  // 添加点击样式
  getInnerDiv(defaultKey)?.classList.add("clicked");
  // 更新 lastClickKey
  lastClickKey = defaultKey;
});

// 记录上次点击 Item 的 key
let lastClickKey: TreeKey = -1;

function handleClick(data: Tree) {
  const currentClickKey = data.id;
  // 如果点击的是同一个 Item，就不用再处理了
  if (currentClickKey === lastClickKey) return;
  handleStyle(currentClickKey);
  // 更新全局状态 currentTitle
  appStore.setCurrentTitle(data.label);
  // 更新 lastClickKey
  lastClickKey = currentClickKey;
}

// 点击样式处理
function handleStyle(currentClickKey: number) {
  // 如果点击的是不同的 Item，就把上次点击的 Item 的样式去掉
  const lastClickedDiv = getInnerDiv(lastClickKey as number);
  lastClickedDiv?.classList.remove("clicked");
  // 然后再给这次点击的 Item 添加样式
  const clickedDiv = getInnerDiv(currentClickKey);
  // 找到里边的类名为 hover-display-buttons 的元素，让其背景色变成透明
  clickedDiv?.classList.add("clicked");
}

// 要给 reactive、ref 添加类型直接通过泛型指定
const dataSource = reactive<Tree[]>([
  {
    id: 0,
    label: "✨ 未分类",
    count: 0,
    children: [],
  },
  {
    id: 1,
    label: "待办",
    count: 3,
    children: [],
  },
  {
    id: 2,
    label: "疑问",
    count: 25, // 是子节点的总和
    children: [
      {
        id: 3,
        label: "编程",
        count: 2,
        children: [],
      },
      {
        id: 4,
        label: "生活",
        count: 21,
        children: [],
      },
      {
        id: 5,
        label: "其他",
        count: 2,
        children: [],
      },
    ],
  },
  {
    id: 6,
    label: "已办",
    count: 0,
    children: [],
  },
]);

// 是否允许拖拽
const allowDrag = (node: Node) => {
  return node.data.label !== unclassified;
};

// 是否允许放置
const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  // console.log(draggingNode, dropNode, type); // 日志打印速度非常快！
  // 这里的逻辑是不允许插入到 "未分类" 里边
  if (dropNode.data.label === unclassified) {
    return type !== "inner";
  } else {
    return true;
  }
};
</script>

<template>
  <CatAddItem :data-source="dataSource" />
  <el-scrollbar class="container">
    <!--    这个 data 可以是响应式数据！-->
    <el-tree
      :data="dataSource"
      node-key="id"
      draggable
      default-expand-all
      render-after-expand
      :icon="IconExpand"
      :props="defaultProps"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-end="handleDragEnd"
      @node-click="handleClick"
      ref="catTreeRef"
    >
      <template #default="{ node, data }">
        <CatTreeNode :node="node" :data="data" />
      </template>
    </el-tree>
  </el-scrollbar>
</template>

<style scoped>
.container {
  flex-grow: 1;
  padding: 10px 0;
  --el-tree-node-content-height: 40px;
  --hover-bg: rgb(235, 236, 239);
}
:deep(.el-tree-node__content) {
  /*padding: 5px !important;*/
  /*这里不能指定 !important，否则通过 js 添加的缩进就失效了*/
  padding: 5px 10px;
  background-color: rgb(246, 248, 250);
  position: relative;
}
:deep(.el-tree-node__content:hover) {
  background-color: var(--hover-bg);
}
/*这个放在这里才有效，不能放在子组件中*/
:deep(.el-tree-node__content:hover) .hover-display-buttons {
  opacity: 1;
}
:deep(.el-tree-node__content:hover) .cat-name {
  max-width: 80px;
}
:deep(.el-tree-node__expand-icon) {
  margin-left: 15px;
}
:deep(.drag-over-node) {
  border: 2px solid #3574f0;
  border-radius: 5px;
  background-color: rgba(53, 116, 240, 0.1);
  margin: 0 1px;
}
:deep(.clicked) {
  /*这里必须加 !important，否则有可能被 Item 的背景或 hover 的背景覆盖*/
  background-color: rgb(212, 226, 255) !important;
}
</style>
