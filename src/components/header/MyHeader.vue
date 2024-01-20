<template>
  <el-row justify="space-between" align="middle" class="container">
    <a href="#">
      <img src="@/assets/element-plus-logo.svg" alt="Logo" class="logo" />
    </a>
    <el-row class="right-container" justify="space-around" align="middle">
      <el-button :icon="Search" round>Search</el-button>
      <el-switch
        v-model="value"
        :active-action-icon="MoonNight"
        :inactive-action-icon="Sunny"
      />
      <MyClickIcon
        icon="translation.svg"
        @click="handleTranslation"
        size="20"
      />
      <MyLinkIcon link="https://github.com/Huaguang-XinZhe" icon="github.svg" />
    </el-row>
  </el-row>
</template>

<script setup lang="ts">
import { MoonNight, Search, Sunny } from "@element-plus/icons-vue";
import MyLinkIcon from "@/components/custom/MyLinkIcon.vue";
import MyClickIcon from "@/components/custom/MyClickIcon.vue";
import { ref } from "vue";

const value = ref(false);

function handleTranslation() {
  console.log("translation");
}
</script>

<style scoped>
.container {
  height: 100%;
}
.logo {
  width: 130px;
}
.right-container {
  /* 1/3 的视口宽度*/
  width: 30vw;
}
.el-switch {
  --el-switch-on-color: rgb(44, 44, 44);
}
</style>
