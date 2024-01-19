<!-- @format -->

<template>
  <!--  如果外部容器的高度占满全屏，则内容的高度会自动延伸-->
  <el-container>
    <el-header>Header</el-header>
    <el-container style="height: 94vh">
      <el-aside width="200px" class="left-aside">
        <LeftAside />
      </el-aside>
      <el-container>
        <!-- 注意，千万不要忘记了 `-`，虽然它不会报错！ -->
        <!-- 会自动填充所有可用空间-->
        <el-main>
          <!--          <MainList title="待办" />-->
          <!--          <Test />-->
          <!--          <TestDraggable />-->
          <!--          <TestBase />-->
          <TestTree />
          <!--          <TestTree2 />-->
          <!--          <TestTree3 />-->
        </el-main>
        <el-footer>
          <!-- <MdInput /> -->
          <MdInput2 />
          <!-- <ExpandableInput /> -->
        </el-footer>
      </el-container>
      <el-aside width="100px" class="right-aside">Recycle Bin</el-aside>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import MdInput2 from "@/components/bottom-input/MdInput2.vue";
import LeftAside from "@/components/left-aside/LeftAside.vue";
import TestTree from "@/components/test/TestTree.vue";
</script>

<style scoped>
.el-header {
  height: 6vh;
  background-color: rgb(242, 242, 242);
  border-bottom: 1px solid rgb(208, 215, 222);
}
.left-aside {
  padding: 10px 0;
  background-color: rgb(246, 248, 250);
  border-right: 1px solid rgb(208, 215, 222);
}
.right-aside {
  background-color: whitesmoke;
  border-left: 1px solid rgb(227, 230, 232);
}
.el-main {
  max-width: 800px;
  background-color: rgb(255, 255, 255);
  padding: 0;
  margin: 0 auto;
}
.el-footer {
  border-top: 1px solid rgb(208, 215, 222);
}
</style>
