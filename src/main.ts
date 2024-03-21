/** @format */

import "@/assets/base.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
// import router from './router'
// // 全局引入 Element Plus
// import ElementPlus from "element-plus";
// // 千万别往了样式
// import "element-plus/dist/index.css";
// 全局引入 Element Plus 图标
// import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 引入 axios 全局拦截器
import setupAxiosInterceptors from "./axios-setup";

// 在创建 app 之前创建 axios 拦截器
setupAxiosInterceptors();

const app = createApp(App).use(createPinia());
// .use(ElementPlus);

// 注册 Element Plus 图标
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component);
// }

app.mount("#app");
