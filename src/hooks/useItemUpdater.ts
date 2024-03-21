// 请求后端更新数据库
import axios from "axios";
import { ElMessage } from "element-plus";
import type { Result } from "@/types";

export function requestUpdateItem(id: number, content: string) {
  axios
    .patch(`/api/inputs/${id}`, content, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
    .then((response) => {
      console.log(response.data);
      const result: Result = response.data;
      if (result.code === 1) {
        ElMessage.success("更新成功");
        // todo: 如果有新类属的话也要更新类属
      } else {
        ElMessage.error(`更新失败：${result.msg}`);
      }
    })
    .catch((reason) => {
      console.log(reason.message);
      ElMessage.error(`更新失败：${reason.message}`);
    });
}
