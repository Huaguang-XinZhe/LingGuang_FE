import axios from "axios";
import { ElMessage } from "element-plus";

export default function setupAxiosInterceptors() {
  // 添加响应拦截器
  axios.interceptors.response.use(
    (response) => {
      // 已完成
      // 对响应数据做点什么
      return response;
    },
    (error) => {
      // 已拒绝
      // 对响应错误做点什么
      if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        // console.error("Error status", error.response.status);
        ElMessage.error("Error status：" + error.response.status);
        // 处理不同类型的错误
      } else if (error.request) {
        // console.log(error.request); // 这是个 XMLHttpRequest 对象
        // 请求已经发出，但没有收到响应
        // console.error("No response from server");
        ElMessage.error("No response from server");
      } else {
        console.log(error);
        // 发送请求时出了点问题
        // console.error("Error", error.message);
        ElMessage.error("Error：" + error.message);
      }
      return Promise.reject(error);
    },
  );

  // 现在，任何使用 axios 发出的请求都会通过这个拦截器
}
