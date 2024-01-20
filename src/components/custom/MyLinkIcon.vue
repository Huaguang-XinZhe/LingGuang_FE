<template>
  <a :href="link" target="_blank">
    <img :src="`/src/assets/${icon}`" :style="styleObj" alt="link-icon" />
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  size: {
    type: Number,
    default: 24,
  },
  link: {
    type: String,
    // 注意，后边有个 d，不是 require！
    required: true,
  },
  // 这里的 icon 只需要填 assets 目录下的名称即可，不需要填路径！
  icon: {
    type: String,
    required: true,
  },
});

// 计算属性，根据 size 返回一个 style 对象
const styleObj = computed(() => {
  const length = props.size + "px";
  return {
    width: length,
    height: length,
  };
});
</script>

<style scoped></style>
