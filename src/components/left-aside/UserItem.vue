<template>
  <el-dropdown placement="top">
    <el-row justify="center" class="user-row">
      <el-avatar
        :size="32"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <el-text class="text" truncated>HuaguangHuaguangHuaguangHuaguang</el-text>
    </el-row>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="EditPen" @click="modifyProfile"
          >修改头像、昵称</el-dropdown-item
        >
        <el-dropdown-item divided :icon="SwitchButton" @click="logout"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { EditPen, SwitchButton } from "@element-plus/icons-vue";
import { useDialogStore } from "@/stores/dialogStore";

const dialogStore = useDialogStore();

function modifyProfile() {
  dialogStore.showDialog();
  console.log("modify profile");
}

function logout() {
  console.log("logout");
  // todo: 跳转到登录页面
}
</script>

<style scoped>
.user-row {
  border-radius: 10px;
  padding: 5px 10px;
  margin: 10px;
}
.user-row:focus {
  outline: none;
}
.user-row:hover {
  background-color: rgb(232, 235, 239);
  cursor: pointer;
}
.text {
  width: 100px;
  /*max-width: 100px;*/ /* 当昵称过长，就会被挤到下一行，这时设置 max-width 没用，得直接设置 width */
  margin-left: 10px;
  font-weight: bold;
  user-select: none;
}
</style>
