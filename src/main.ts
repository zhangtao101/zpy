import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/style/element-variables.scss'

// 引入路由
import router from './router'

// 引入pinia
import pinia from './pinia'

// 引入svg图标注册脚本
import 'virtual:svg-icons-register'

// 注册全局组件
import SvgIcon from './components/SvgIcon/index.vue'

app
    .component("SvgIcon",SvgIcon)
    .use(ElementPlus)
    .use(router)
    .use(pinia)
    .mount('#app')
