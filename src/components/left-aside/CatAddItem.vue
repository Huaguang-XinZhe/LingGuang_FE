<template>
  <!-- 这里用 container 可能和外部的 container 冲突，虽然有 data 属性作用域，但内部也有外部的 data 属性，容易被外部覆盖-->
  <div class="container">
    <el-input
      placeholder="新增类属"
      v-model="input"
      :prefix-icon="Plus"
      clearable
      @keydown.enter="addCategory"
    />
  </div>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import { useInputValidation } from "@/hooks/useInputValidation";
import type { Tree } from "@/types";
import type { PropType } from "vue";

const props = defineProps({
  dataSource: {
    type: Array as PropType<Tree[]>,
    required: true,
  },
});

const { validateInput } = useInputValidation();
const input = ref<string>("");
// 必须放在外边，否则就都是一样的了
let baseId = 100;

function addCategory() {
  const dataSource = props.dataSource;
  if (!validateInput(input, dataSource)) return;
  dataSource.unshift({
    id: baseId++,
    label: input.value.trim(),
  });
  // 清空
  input.value = "";
}
</script>

<style scoped>
.container {
  padding: 5px !important;
}
</style>
