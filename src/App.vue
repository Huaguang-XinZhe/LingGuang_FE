<!-- @format -->

<template>
  <!--  如果外部容器的高度占满全屏，则内容的高度会自动延伸-->
  <el-container style="height: 100vh">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <!-- 注意，千万不要忘记了 `-`，虽然它不会报错！ -->
        <!-- 会自动填充所有可用空间-->
        <el-main>
          <Test />
        </el-main>
        <el-footer height="100px">
          <!-- <MdInput /> -->
          <MdInput2 />
          <!-- <ExpandableInput /> -->
        </el-footer>
      </el-container>
      <el-aside width="100px">Recycle Bin</el-aside>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import MdInput2 from "@/components/MdInput2.vue";
import Test from "./components/Test.vue";
import ExpandableInput from "./components/ExpandableInput.vue";
</script>

<style scoped>
.el-header {
  background-color: skyblue;
}
.el-aside {
  background-color: #d3dce6;
}
.el-main {
  background-color: #e9eef3;
}
</style>
