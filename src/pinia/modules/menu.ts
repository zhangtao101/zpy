import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAccount } from '@/pinia/modules/account'
import { fixedRoutes, asyncRoutes } from '@/router'
import router from '@/router'

export const useMenus = defineStore("menu",() =>{

    const generateUrl = (path, parentPath) => {
        return path.startsWith('/')
            ? path
            : path
            ? `${parentPath}/${path}`
            : parentPath
    }

    const getFilterRoutes = (targetRoutes, ajaxRoutes) => {
        const filterRoutes = []

        ajaxRoutes.forEach(item => {
            const target = targetRoutes.find(target => target.name === item.name)

            if (target) {
                const { children: targetChildren, ...rest } = target
                const route = {
                    ...rest,
                }

                if (item.children) {
                    route.children = getFilterRoutes(targetChildren, item.children)
                }

                // @ts-ignore
                filterRoutes.push(route)
            }
        })

        return filterRoutes
    }

    const getFilterMenus = (arr, parentPath = '') => {
        const menus = []

        arr.forEach(item => {
            if (!item.hidden) {
                const menu = {
                    url: generateUrl(item.path, parentPath),
                    title: item.meta.title,
                    icon: item.icon,
                    children: undefined
                }
                if (item.children) {
                    if (item.children.filter(child => !child.hidden).length <= 1) {
                        menu.url = generateUrl(item.children[0].path, menu.url)
                    } else {
                        // @ts-ignore
                        menu.children = getFilterMenus(item.children, menu.url)
                    }
                }
                // @ts-ignore
                menus.push(menu)
            }
        })

        return menus
    }

    const menus = ref([])
    const setMenus = data => {
        menus.value = data
    }

    const generateMenus = () => {
        const { permissionList } = useAccount()
        // 添加路由之前先删除所有动态路由
/*        asyncRoutes.forEach(item => {
            router.removeRoute(item.name)
        })*/

        // 过滤出需要添加的动态路由
        const filterRoutes = getFilterRoutes(asyncRoutes, permissionList)
        filterRoutes.forEach(route => router.addRoute(route))

        // 生成菜单
        const menus = getFilterMenus([...fixedRoutes, ...filterRoutes])
        setMenus(menus)
    }

    return {
        menus,
        setMenus,
        generateMenus
    }
})
