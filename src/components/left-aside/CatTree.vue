<template>
  <!-- :props="{ class: customNodeClass }"，怎么设置这个没用呢？ -->
  <div class="cat-add-item">
    <el-input
      placeholder="新增类属"
      v-model="input"
      :prefix-icon="Plus"
      clearable
      @keydown.enter="addCategory"
    />
  </div>
  <!--    这个 data 可以是响应式数据！-->
  <el-scrollbar class="container">
    <el-tree
      :data="dataSource"
      node-key="id"
      draggable
      default-expand-all
      render-after-expand
      :icon="IconExpand"
      :props="defaultProps"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-end="handleDragEnd"
      @node-click="handleClick"
      ref="catTreeRef"
    >
      <template #default="{ node, data }">
        <el-text
          :class="node.level === 1 ? 'parent-node' : null"
          class="cat-name"
          truncated
          :title="node.label.length > 9 ? node.label : null"
        >
          {{ node.label }} {{ data.count > 0 ? `(${data.count})` : null }}
        </el-text>
        <el-popconfirm
          width="200"
          title="这将会删除该类属下的所有数据，并且无法恢复，您确认删除吗？"
          icon-color="rgb(245, 108, 108)"
          @confirm="confirmDelete(data)"
        >
          <template #reference>
            <MyClickIcon
              icon="delete.svg"
              :size="16"
              class="delete-button"
              @click="deleteButtonClick($event)"
            />
          </template>
        </el-popconfirm>
      </template>
    </el-tree>
  </el-scrollbar>
  <!--    <el-button :icon="Plus" round class="add-category" @click="addCategory"-->
  <!--      >新增类属</el-button-->
  <!--    >-->
</template>

<script setup lang="ts">
import IconExpand from "@/assets/icons/IconExpand.vue";
import type Node from "element-plus/es/components/tree/src/model/node";
import type { DragEvents } from "element-plus/es/components/tree/src/model/useDragNode";
import type { NodeDropType } from "element-plus/es/components/tree/src/tree.type";
import { Plus } from "@element-plus/icons-vue";
import { reactive, type Ref, ref } from "vue";
import { ElMessage, ElTree } from "element-plus";
import type { TreeKey } from "element-plus/es/components/tree-v2/src/types";
import MyClickIcon from "@/components/custom/MyClickIcon.vue";

interface Tree {
  id: number;
  label: string;
  count?: number;
  children?: Tree[];
}

const defaultProps = {
  children: "children",
  label: "label",
};

let innerDiv: HTMLDivElement | null = null;
// 定义同名 ref，引用 el-tree 组件（可指定构造函数的实例类型）
const catTreeRef = ref<InstanceType<typeof ElTree>>();

function handleDragStart(draggingNode: Node, ev: DragEvents) {
  // 如果拖动节点是一个父节点，就调用它的收起方法
  if (!draggingNode.isLeaf) {
    draggingNode.collapse();
  }
}

function handleDragEnter(draggingNode: Node, dropNode: Node, ev: DragEvents) {
  // 如果拖动节点和放置节点一致，那就别加样式了
  if (draggingNode.key === dropNode.key) return;
  // 为 dropNode 添加自定义样式类
  // 使用querySelector选择具有特定data-key的div元素内的第一个div元素
  innerDiv = getInnerDiv(dropNode.key as number);
  // 如果找到了元素，则添加自定义类
  innerDiv?.classList.add("drag-over-node");
}

function handleDragLeave(draggingNode: Node, dropNode: Node, ev: DragEvents) {
  // 为 dropNode 移除自定义样式类（还有可能没移除，因为拖的距离不够，根本就没有触发）

  innerDiv?.classList.remove("drag-over-node");
}

function handleDragEnd(
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType, // 可能为空
  ev: DragEvents,
) {
  // 拖动结束的时候再移除一次，应对拖动距离不够，没有触发 handleDragLeave 的情况
  innerDiv?.classList.remove("drag-over-node");
}

/**
 * 根据 id 拿到指定 Item 内部的 div 元素
 * @param id 数据中的 key
 */
function getInnerDiv(id: number): HTMLDivElement | null {
  return document.querySelector(`div[data-key="${id}"] > div`);
}

const input = ref<string>("");
// 必须放在外边，否则就都是一样的了
let baseId = 100;

function addCategory() {
  if (!validateInput(input, dataSource)) {
    return;
  }
  dataSource.unshift({
    id: baseId++,
    label: input.value.trim(),
  });
  // 清空
  input.value = "";
}

function validateInput(input: Ref<string>, data: Tree[]) {
  const trimmedValue = input.value.trim();

  // 检查名称是否为空（包括全是空格的情况）
  if (!trimmedValue) {
    ElMessage({
      message: "名称不能为空哦😊",
      type: "warning",
    });
    input.value = ""; // 清除可能的空格输入
    return false;
  }

  // 检查名称是否存在
  // 这里用 some 比 flatMap 更高效，因为只需要通过判断拿到一个布尔值
  const catExist = data.some((item) => item.label === trimmedValue);
  if (catExist) {
    ElMessage({
      message: "名称存在了哦🙃",
      type: "warning",
    });
    input.value = ""; // 清除输入
    return false;
  }

  // 验证通过
  return true;
}

// 记录上次点击 Item 的 key
let lastClickKey: TreeKey = -1;
function handleClick(data: Tree) {
  // 如果点击的是同一个 Item，就不用再处理了
  if (data.id === lastClickKey) return;
  // 如果点击的是不同的 Item，就把上次点击的 Item 的样式去掉
  if (data.id !== lastClickKey) {
    const lastClickedDiv = getInnerDiv(lastClickKey as number);
    lastClickedDiv?.classList.remove("clicked");
  }
  // 然后再给这次点击的 Item 添加样式
  const clickedDiv = getInnerDiv(data.id);
  clickedDiv?.classList.add("clicked");
  // 更新 lastClickKey
  lastClickKey = data.id;
}

function deleteButtonClick(ev: MouseEvent) {
  // 阻止事件冒泡
  ev.stopPropagation();
}

function confirmDelete(data: Tree) {
  // data 打印出来其实是 Proxy（Object）类型，但声明为其 Target 对象的类型也没问题
  // console.log(data);
  // 也能直接访问 Target 对象的属性
  // console.log(data.id);
  catTreeRef.value?.remove(data);
}

// 要给 reactive、ref 添加类型直接通过泛型指定
const dataSource = reactive<Tree[]>([
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
</script>

<style scoped>
.container {
  flex-grow: 1;
  padding: 10px 0;
  --el-tree-node-content-height: 40px;
}
:deep(.el-tree-node__content) {
  /*padding: 5px !important;*/
  /*这里不能指定 !important，否则通过 js 添加的缩进就失效了*/
  padding: 5px 0;
  background-color: rgb(246, 248, 250);
  position: relative;
}
:deep(.el-tree-node__content:hover) {
  background-color: #ebecef;
}
.delete-button {
  position: absolute;
  right: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
:deep(.el-tree-node__content:hover) .delete-button {
  opacity: 1;
}
.parent-node {
  font-weight: bold;
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
.cat-add-item {
  padding: 5px;
}
.cat-name {
  padding-right: 20px;
}
/* 定义一个背景色动画 */
/*@keyframes backgroundChange {
  from {
    background-color: rgb(246, 248, 250);
  }
  to {
    background-color: rgb(212, 226, 255);
  }
}*/
:deep(.clicked) {
  /*这里必须加 !important，否则有可能被 Item 的背景或 hover 的背景覆盖*/
  background-color: rgb(212, 226, 255) !important;
  /*border-radius: 5px;*/
  /*animation-name: backgroundChange;
  animation-duration: 1s;
  animation-fill-mode: forwards;*/
}
</style>
