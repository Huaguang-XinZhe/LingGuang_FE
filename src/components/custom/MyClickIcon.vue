<template>
  <!--  <img :src="`/src/assets/icons/${icon}`" :style="styleObj" alt="click-icon" />-->
  <!-- 只有下边这个能正常显示，其他的都不行！ -->
  <!--  <img :src="../../assets/icons/delete.svg" :style="styleObj" alt="click-icon" />-->
  <!--  <img :src="`../../assets/icons/${icon}`" :style="styleObj" alt="click-icon" />-->
  <!--  <img :src="src" :style="styleObj" alt="click-icon" />-->
  <img :src="icons[icon]" :style="styleObj" :alt="icon" />
</template>

<script setup lang="ts">
// 导入图标
import deleteIcon from "@/assets/icons/delete.svg";
import moreIcon from "@/assets/icons/more.svg";
import translateIcon from "@/assets/icons/translation.svg";

// 将图标放入一个对象中
const icons = {
  delete: deleteIcon,
  more: moreIcon,
  translate: translateIcon,
};

const props = defineProps({
  size: {
    type: Number,
    default: 24,
  },
  // 枚举类型，只能是 icons 对象中的键
  icon: {
    type: String as () => keyof typeof icons,
    required: true,
  },
});

const styleObj = computed(() => {
  const length = props.size + "px";
  return {
    width: length,
    height: length,
  };
});
</script>

<style scoped>
img {
  transition: filter 0.3s ease;
}
img:hover {
  cursor: pointer;
}
img:active {
  filter: invert(0.8);
}
</style>
