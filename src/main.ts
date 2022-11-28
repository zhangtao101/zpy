import {createApp} from 'vue'
import App from './App.vue'
import './assets/style/element-variables.scss'

// 引入路由
import router from './router'

// 引入pinia
import pinia from './pinia'

// 权限控制
import './permission'

//引入全局样式
import "./assets/style/index.scss"

//注册图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app
    .use(router)
    .use(pinia)
    .mount('#app')
