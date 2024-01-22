<template>
  <div class="custom-tree-container">
    <p>Using render-content</p>
    <el-tree
      :data="dataSource"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent"
    />
    <p>Using scoped slot</p>
    <el-tree
      :data="dataSource"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <a @click="append(data)"> Append </a>
            <a style="margin-left: 8px" @click="remove(node, data)"> Delete </a>
          </span>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type Node from "element-plus/es/components/tree/src/model/node";

interface Tree {
  id: number;
  label: string;
  children?: Tree[];
}
let id = 1000;

const append = (data: Tree) => {
  // 在调用 append 方法的时候，data 中就已经添加了新节点
  console.log("append", data);
  // 右加加是先读后加，而左加加是先加后读，在同一个对象中用到还是需要注意的！
  const newChild: Tree = { id: ++id, label: "test " + id };
  if (!data.children) {
    console.log("data.children is undefined");
    data.children = [];
  }
  data.children.push(newChild);
  // 这里的 children 是一个响应式对象（Proxy）
  console.log(data.children);
  // 不需要下边的代码也能正常工作，因为上边的代码已经修改了 data.children（data 是子组件中的数据，作用域插槽提供）
  // dataSource.value = [...dataSource.value];
  // console.log(dataSource.value);
  // 下边的展开有点问题，这会让 dataSource 里边的每一个对象都变成响应式的（带 Proxy）
  // const arr = [...dataSource.value];
  // console.log(arr);
};

const remove = (node: Node, data: Tree) => {
  const parent = node.parent;
  const children: Tree[] = parent.data.children || parent.data;
  const index = children.findIndex((d) => d.id === data.id);
  children.splice(index, 1);
  // 下面的代码把整个数组展开，然后再重新赋值给 dataSource，这是在触发视图更新
  // `[...Array]` 这会重新创建一个数组实例
  dataSource.value = [...dataSource.value];
};

const renderContent = (
  h,
  {
    node,
    data,
    store,
  }: {
    node: Node;
    data: Tree;
    store: Node["store"];
  },
) => {
  return h(
    "span",
    {
      class: "custom-tree-node",
    },
    h("span", null, node.label),
    h(
      "span",
      null,
      h(
        "a",
        {
          onClick: () => append(data),
        },
        "Append ",
      ),
      h(
        "a",
        {
          style: "margin-left: 8px",
          onClick: () => remove(node, data),
        },
        "Delete",
      ),
    ),
  );
};

const dataSource = ref<Tree[]>([
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 4,
        label: "Level two 1-1",
        children: [
          {
            id: 9,
            label: "Level three 1-1-1",
          },
          {
            id: 10,
            label: "Level three 1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
      },
      {
        id: 6,
        label: "Level two 2-2",
      },
    ],
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
      },
      {
        id: 8,
        label: "Level two 3-2",
      },
    ],
  },
]);
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
