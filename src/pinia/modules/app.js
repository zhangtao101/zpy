import { defineStore } from 'pinia'
import { getItem, setItem, removeItem } from '@/utils/storage'
import { useAccount } from './account'
import { useTags } from './tags'
import { useMenus } from './menu'
export const TOKEN = 'VEA-TOKEN'
const COLLAPSE = 'VEA-COLLAPSE'

export const useApp = defineStore('app', {
    state: () => ({
        title: '轨迹微云系统',
        authorization: getItem(TOKEN),
        sidebar: {
            collapse: getItem(COLLAPSE) !== null,
        },
        device: 'desktop',
    }),
    actions:{
        setCollapse(data) {
            //转为boolean类型
            data = !!data;
            this.sidebar.collapse = data
            setItem(COLLAPSE, data)
        },
        setDevice(device) {
            this.device = device
        },
        clearToken() {
            // 清除token
            this.authorization = ''
            removeItem(TOKEN)
            // 清除用户信息
            useAccount().clearUserinfo()
            // 清除标签栏
            useTags().clearAllTags()
            // 清空menus
            useMenus().setMenus([])
        },
        setToken(data) {
            this.authorization = data
            // 保存到localStorage
            setItem(TOKEN, data)
        },
        initToken(data) {
            this.clearToken()
            this.setToken(data)
        },
    }
})
