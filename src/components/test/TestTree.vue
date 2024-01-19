<template>
  <!--
    提出来的属性：
    :allow-drag="allowDrag"
    :allow-drop="allowDrop"
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
  -->
  <!--
    1. 给 node-key 设置的 id 是从哪里来的？不写 `node-key="id"` 也能正常运行！
  -->
  <div class="container">
    <el-tree
      :data="data"
      draggable
      default-expand-all
      render-after-expand
      @node-drop="handleDrop"
    >
      <!--      加了插槽之后，拖入某个 item，那个 item 文本选中的样式就没了-->
      <!--      <template #default="{ node, data }">-->
      <!--        <el-row justify="space-between" align="middle">-->
      <!--          &lt;!&ndash;        data 是当前 item 的对象&ndash;&gt;-->
      <!--          &lt;!&ndash;        这里不能直接用 node，会报错！&ndash;&gt;-->
      <!--          <el-icon><ChatRound /></el-icon>-->
      <!--          <el-text size="large">{{ node.label }}</el-text>-->
      <!--        </el-row>-->
      <!--      </template>-->
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import type Node from "element-plus/es/components/tree/src/model/node";
import type { DragEvents } from "element-plus/es/components/tree/src/model/useDragNode";
import type {
  AllowDropType,
  NodeDropType,
} from "element-plus/es/components/tree/src/tree.type";

// 这个方法只会执行一次
const handleDragStart = (node: Node, ev: DragEvents) => {
  // console.log("drag start", node, ev);
};
// 这个方法会触发多次，当拖拽节点的上边快触碰到途径节点的上沿时会触发，下边快触碰到途径节点的下沿时会触发
const handleDragEnter = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvents,
) => {
  // console.log("tree drag enter:", dropNode.label);
};
// 这个方法也会触发多次，当拖拽节点的下边超过途径节点的上沿时会触发，上边超过途径节点的下沿时会触发
const handleDragLeave = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvents,
) => {
  // console.log("tree drag leave:", dropNode.label);
};
// 这个方法触发的相当频繁，而且是分段的，当拖拽节点的上边快触碰到途径节点的上沿时便在这个途径节点一直触发，直到遇到下一个节点的上沿或停止拖拽；
// 下边也是类似的，当拖拽节点的下边快触碰到途径节点的下沿时便在这个途径节点一直触发，直到遇到下一个节点的下沿或停止拖拽；
// 类似浏览器的 mouseover 事件
const handleDragOver = (draggingNode: Node, dropNode: Node, ev: DragEvents) => {
  // console.log("tree drag over:", dropNode.label);
};

// 这个方法在一个完整的拖放行动中只会执行一次
const handleDragEnd = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType, // 可能为空
  ev: DragEvents,
) => {
  // 中间的那个参数利用了短路运算符，如果 dropNode 为 null 或 undefined，那么就会返回 dropNode，不会继续访问 label 属性
  // console.log("tree drag end:", dropNode && dropNode.label, dropType);
};

// 这个方法和上面的有点像，也是只执行一次，但它只会在成功放置后执行，而上面的可能会放置不成功
const handleDrop = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType,
  ev: DragEvents,
) => {
  // console.log("tree drop:", dropNode.label, dropType);
};
// 这里的 draggingNode 应该是正在拖动的节点，而 dropNode 是放下的节点，type 是放下的类型——inner、prev、next（插入、前、后）
// 返回 true 就是允许放下，false 反之
const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  // console.log(draggingNode, dropNode, type); // 日志打印速度非常快！
  // 这里的逻辑是不允许插入到 Level two 3-1 里边
  if (dropNode.data.label === "Level two 3-1") {
    return type !== "inner";
  } else {
    return true;
  }
};
// const allowDrag = (draggingNode: Node) => {
//   // draggingNode 是个响应式对象（Proxy）
//   // console.log(draggingNode);
//   // 这里限制了 Level three 3-1-1 的拖拽
//   return !draggingNode.data.label.includes("Level three 3-1-1");
// };

// const data = [
//   {
//     label: "Level one 1",
//     children: [
//       {
//         label: "Level two 1-1",
//         children: [
//           {
//             label: "Level three 1-1-1",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     label: "Level one 2",
//     children: [
//       {
//         label: "Level two 2-1",
//         children: [
//           {
//             label: "Level three 2-1-1",
//           },
//         ],
//       },
//       {
//         label: "Level two 2-2",
//         children: [
//           {
//             label: "Level three 2-2-1",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     label: "Level one 3",
//     children: [
//       {
//         label: "Level two 3-1",
//         children: [
//           {
//             label: "Level three 3-1-1",
//           },
//         ],
//       },
//       {
//         label: "Level two 3-2",
//         children: [
//           {
//             label: "Level three 3-2-1",
//           },
//         ],
//       },
//     ],
//   },
// ];

// 来一个自定义数据
const data = [
  {
    label: "待办",
    children: [],
  },
  {
    label: "疑问",
    children: [
      {
        label: "编程",
        children: [],
      },
      {
        label: "生活",
        children: [],
      },
      {
        label: "其他",
        children: [],
      },
    ],
  },
  {
    label: "已办",
    children: [],
  },
];
</script>

<style scoped>
.container {
  width: 100px;
  /* 为什么这里的背景色没用呢？ */
  background-color: skyblue;
}
.el-tree {
  /*
  .item-container 的外部还套了一个 .el-tree-node__content，要想舒展 item 的高度，就必须修改它的高度，
  而它的高度又引用了一个 CSS 变量，所以要修改这个变量的值（有效果）
  */
  --el-tree-node-content-height: 40px;
}

/*.item-container {
  width: 100%;
  background-color: #9ab1bd;
  padding: 5px 20px;
  !* height: 40px;*!
  border-radius: 10px;
  margin: 10px;
}*/
/* scope 下的类似乎都会带有 Vue 生成的属性选择器，这有可能导致同类的样式失效 */
/*.el-tree-node__content {
  background-color: green;
  height: 80px !important;
}*/
</style>
