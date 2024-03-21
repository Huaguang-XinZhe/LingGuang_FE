<!-- @format -->
<script setup lang="ts">
import type { Tree } from "@/types";
import Node from "element-plus/es/components/tree/src/model/node";
import { useListStore } from "@/stores/listStore";
import { unclassified } from "@/globals";
import type { PropType } from "vue";

const props = defineProps({
  node: {
    type: Object as PropType<Node>,
    required: true,
  },
  data: {
    type: Object as PropType<Tree>,
    required: true,
  },
});

const listStore = useListStore();

// 根据类属名获取其记录数
const count = computed(() => {
  return listStore.getCountByName(props.node.label);
});
const buttonsDisplay = computed(() => {
  return props.node?.label !== unclassified;
});

// function confirmDelete(data: Tree) {
//   // data 打印出来其实是 Proxy（Object）类型，但声明为其 Target 对象的类型也没问题
//   // console.log(data);
//   // 也能直接访问 Target 对象的属性
//   // console.log(data.id);
//   catTreeRef.value?.remove(data);
// }

const handleClick = (ev: MouseEvent) => {
  ev.stopPropagation();
};
</script>

<template>
  <el-text
    :class="node.level === 1 ? 'parent-node' : null"
    class="cat-name"
    :title="node.label.length > 9 ? node.label : null"
  >
    {{ node.label }} {{ count }}
  </el-text>
  <!--        <el-popconfirm-->
  <!--          width="200"-->
  <!--          title="这将会删除该类属下的所有数据，并且无法恢复，您确认删除吗？"-->
  <!--          icon-color="rgb(245, 108, 108)"-->
  <!--          @confirm="confirmDelete(data)"-->
  <!--        >-->
  <!--        <template #reference>-->
  <el-row
    class="hover-display-buttons"
    justify="space-evenly"
    v-show="buttonsDisplay"
  >
    <el-dropdown trigger="click">
      <MyClickIcon icon="more" :size="18" @click="handleClick" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>重命名</el-dropdown-item>
          <el-dropdown-item>默认加载</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <MyClickIcon icon="delete" :size="16" @click="handleClick" />
  </el-row>
  <!--        </template>-->
  <!--        </el-popconfirm>-->
</template>

<style scoped>
.hover-display-buttons {
  width: 60px;
  position: absolute;
  right: 0;
  opacity: 0;
  /*transition: opacity 0.8s ease;*/
}
.cat-name {
  max-width: 120px;
  /*这个 padding-right 很重要，当限制最大宽度的时候，文本多余的部分会溢出到 padding 部分，可见！模糊也是算上了 padding 部分的！*/
  padding-right: 30px;
  /*加上这个之后它就不会溢出父容器了，它的总宽度会在父容器的内 padding 的限制下*/
  /*它自己本身会保 padding（也就是 30px），而压内容（以前是内容干到最大 120px，再加 padding 30 px）*/
  overflow: hidden;
  font-size: 16px;
  /* 定义遮罩效果，让文本末端模糊起来 */
  mask-image: linear-gradient(to right, black 80%, transparent 100%);
}
.parent-node {
  font-weight: bold;
}
</style>
