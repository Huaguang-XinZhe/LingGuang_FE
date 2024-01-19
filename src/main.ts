/** @format */

import "@/assets/base.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
// import router from './router'
// 全局引入 Element Plus
import ElementPlus from "element-plus";
// 千万别往了样式
import "element-plus/dist/index.css";
// 全局引入 Element Plus 图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App).use(createPinia()).use(ElementPlus);

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
