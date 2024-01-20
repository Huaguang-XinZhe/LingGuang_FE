<template>
  <img :src="`/src/assets/${icon}`" :style="styleObj" alt="click-icon" />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  size: {
    type: Number,
    default: 24,
  },
  icon: {
    type: String,
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
