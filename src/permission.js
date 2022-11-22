import router from '@/router'
import { ElLoading } from 'element-plus'
import { TOKEN } from './pinia/modules/app'
import { nextTick } from 'vue'
import { useApp } from './pinia/modules/app'
import { useAccount } from '@/pinia/modules/account'
import { useMenus } from './pinia/modules/menu'

const getPageTitle = title => {
    const { title: appTitle } = useApp()
    if (title) {
        return `${title} - ${appTitle}`
    }
    return appTitle
}

//白名单
const WhiteList = ['login']

//加载实例
let loadingInstance = null

router.beforeEach(async to => {
    //赋值一个具有动画效果 和 背景效果的加载实例
    loadingInstance = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
    })

    //放行白名单 这里是无权目录
    if (WhiteList.includes(to.name)){
        return true
    }

    //读取本地浏览器存储中是否存在token 如果没有则返回到登录页面
    if (!window.localStorage[ TOKEN ]) {
        return {
            name: 'login',
            query: {
                redirect: to.fullPath, // redirect是指登录之后可以跳回到redirect指定的页面
            },
            replace: true,
        }
    }else {
        const { userinfo } = useAccount()

        // 生成菜单（如果你的项目有动态菜单，在此处会添加动态路由）
        const { menus, generateMenus } = useMenus()

        if (menus.length <= 0){
            await generateMenus()
            return to.fullPath
        }

        //获取用户角色信息，根据角色判断权限
        if (!userinfo){
            return true
        }else {
            return to.fullPath
        }
    }
})

router.afterEach(to =>{
    loadingInstance.close()
    if (router.currentRoute.value.name === to.name) {
        nextTick(() => {
            document.title = getPageTitle(!!to.meta && to.meta.truetitle)
        })
    }
})
