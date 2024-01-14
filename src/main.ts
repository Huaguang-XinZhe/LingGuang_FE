import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
// 完整引入 Element Plus
import ElementPlus from 'element-plus'

import App from './App.vue'
// import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
// app.use(router)

app.mount('#app')
