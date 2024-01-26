import { ElMessage } from "element-plus";
import type { Tree } from "@/types";
import type { Ref } from "vue";

export function useInputValidation() {
  function validateInput(input: Ref<string>, data: Tree[]) {
    const trimmedValue = input.value.trim();

    // 检查名称是否为空（包括全是空格的情况）
    if (!trimmedValue) {
      ElMessage({
        message: "名称不能为空哦😊",
        type: "warning",
      });
      input.value = ""; // 清除可能的空格输入
      return false;
    }

    // 检查名称是否存在
    // 这里用 some 比 flatMap 更高效，因为只需要通过判断拿到一个布尔值
    const catExist = data.some((item) => item.label === trimmedValue);
    if (catExist) {
      ElMessage({
        message: "名称存在了哦🙃",
        type: "warning",
      });
      input.value = ""; // 清除输入
      return false;
    }

    // 验证通过
    return true;
  }
  return { validateInput };
}
