import { createRouter, createWebHistory } from 'vue-router'

import home from './modules/home'
import dynamic from './modules/dynamic'
import login from './modules/login'

// 固定菜单
export const fixedRoutes = [...home]
// 动态菜单
export const asyncRoutes = [...dynamic]

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: 'home',
        },
        ...fixedRoutes,
        ...asyncRoutes,
        ...login
    ],
    //实现路由跳转之后滚动条滚到顶部
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { left: 0, top: 0 }
        }
    },
})

export default router
