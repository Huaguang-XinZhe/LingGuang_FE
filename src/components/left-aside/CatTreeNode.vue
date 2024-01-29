<!-- @format -->
<script setup lang="ts">
import MyClickIcon from "@/components/custom/MyClickIcon.vue";
import type { PropType } from "vue";
import { computed } from "vue";
import type { Tree } from "@/types";
import Node from "element-plus/es/components/tree/src/model/node";
import { useListStore } from "@/stores/listStore";

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

function deleteButtonClick(ev: MouseEvent) {
  // 阻止事件冒泡
  ev.stopPropagation();
}

// function confirmDelete(data: Tree) {
//   // data 打印出来其实是 Proxy（Object）类型，但声明为其 Target 对象的类型也没问题
//   // console.log(data);
//   // 也能直接访问 Target 对象的属性
//   // console.log(data.id);
//   catTreeRef.value?.remove(data);
// }
</script>

<template>
  <el-text
    :class="node.level === 1 ? 'parent-node' : null"
    class="cat-name"
    truncated
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
  <MyClickIcon
    icon="delete.svg"
    :size="16"
    class="delete-button"
    @click="deleteButtonClick($event)"
  />
  <!--        </template>-->
  <!--        </el-popconfirm>-->
</template>

<style scoped>
.delete-button {
  position: absolute;
  right: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.cat-name {
  padding-right: 20px;
}
.parent-node {
  font-weight: bold;
}
</style>
