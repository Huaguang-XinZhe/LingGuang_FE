<!-- @format -->

<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <!--        tag: draggable 的标签名，默认是 div-->
        <draggable
          v-model="list"
          tag="ul"
          item-key="id"
          group="group"
          ghost-class="ghost"
          :animation="300"
        >
          <template #item="{ element }">
            <el-menu-item :index="`1-${element.id}`" class="group-item">
              <!--              <el-icon><element.icon /></el-icon>-->
              <span>{{ element.label }}</span>
            </el-menu-item>
          </template>
        </draggable>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <!--        当设置为同一个组时就能互相拖放了，除了数据源，里边的东西都是一样的-->
        <draggable v-model="list2" group="group" item-key="id">
          <template #item="{ element }">
            <el-menu-item :index="`1-${element.id}`" class="group-item">
              <span>{{ element.label }}</span>
            </el-menu-item>
          </template>
        </draggable>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Document,
  Location,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";
import draggable from "vuedraggable";

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

// 如果 list 是响应式的，那么拖入 list2 的 item 就也是响应式的，反之亦然；
// 这就会导致响应式里包着响应式！！！toRaw 就失去效果了！
// 如果 list 不是响应式的，那么拖动到 list2 后，它的 item 不会减少，而 list 2 的 item 会不断的增加！！！
const list = ref([
  {
    icon: Document,
    label: "文档",
    id: 1,
  },
  {
    icon: IconMenu,
    label: "菜单",
    id: 2,
  },
  {
    icon: Location,
    label: "位置",
    id: 3,
  },
  {
    icon: Setting,
    label: "设置",
    id: 4,
  },
]);
// 这里使用 reactive 为什么就看不到拖入 Group Two 里边的 Item 了呢？
// 用 ref 就可以！但为什么 list1 却不受影响？
// 这里不用响应式也不行，也看不到 Item！
const list2 = ref([]);

// watch(list2, () => {
//   // toRaw: 有点奇怪，为什么直接对 list2 toRaw 没什么影响？对 list2.value toRaw 就变成这样了呢？[Proxy(Object)]
//   console.log("@", list2.value);
//   const jsonStr = JSON.stringify(list2.value, null, 2);
//   console.log("@", jsonStr);
// });

// watch(list2, (newValue, oldValue) => {
//   // 虽然监视的是 ref，但 newValue 和 oldValue 已经褪去了 value 的外壳，直接就是 Proxy 对象
//   console.log("@", newValue, oldValue);
//   const rawNewValue = toRaw(newValue);
//   console.log("@", rawNewValue);
//   // 从 list 拖动到 list2，item 的数据会发生些许改变，比如 icon 字段就加了一个 `__name` 属性，还有一个 setup 方法
//   const jsonStr = JSON.stringify(rawNewValue, null, 2);
//   console.log(jsonStr);
// });
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  user-select: none;
}
.ghost {
  border: 1px solid red;
}
</style>
