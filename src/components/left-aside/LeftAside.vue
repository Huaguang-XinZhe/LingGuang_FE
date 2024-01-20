<template>
  <div class="container">
    <CatSearchItem />
    <CatTree />
    <UserItem />
  </div>
  <ProfileDialog />
</template>

<script setup lang="ts">
import ProfileDialog from "@/components/left-aside/ProfileDialog.vue";
import UserItem from "@/components/left-aside/UserItem.vue";
import CatSearchItem from "@/components/left-aside/CatSearchItem.vue";
import CatTree from "@/components/left-aside/CatTree.vue";
</script>

<style scoped>
.container {
  text-align: center; /* text-align 是在父容器中对子元素而言的！不能在子元素中应用。 */
  /*padding: 20px 0;*/
  display: flex;
  flex-direction: column;
  height: 100%; /* 指定高度为父容器的高度就必须去除 padding 和 margin，否则会有滚动条（要加得在父容器那里加） */
}
</style>
