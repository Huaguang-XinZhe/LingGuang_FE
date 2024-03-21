<template>
  <el-row justify="space-between" align="middle" class="container">
    <a href="#" target="_self" class="link">
      <img src="../../assets/element-plus-logo.svg" alt="Logo" class="logo" />
    </a>
    <el-row class="right-container" justify="space-between" align="middle">
      <el-button :icon="Search" round>Search</el-button>
      <el-switch
        v-model="value"
        :active-action-icon="MoonNight"
        :inactive-action-icon="Sunny"
      />
      <MyClickIcon icon="translate" @click="handleTranslation" :size="20" />
      <MyLinkIcon link="https://github.com/Huaguang-XinZhe" icon="github" />
    </el-row>
  </el-row>
</template>

<script setup lang="ts">
import { MoonNight, Search, Sunny } from "@element-plus/icons-vue";

const value = ref(false);

function handleTranslation() {
  console.log("translation");
}
</script>

<style scoped>
.container {
  height: 100%;
}
.link {
  width: 200px;
  text-align: center;
}
.logo {
  width: 125px;
}
.right-container {
  /* 1/3 的视口宽度*/
  /*width: 28vw;*/
  /*这里不能用视口宽度，得用固定宽度，要不然会被拉长*/
  width: 250px;
  margin-right: 30px;
}
.el-switch {
  --el-switch-on-color: rgb(44, 44, 44);
}
</style>
