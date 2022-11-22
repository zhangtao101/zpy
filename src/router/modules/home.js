const Layout = () => import('@/layout/index.vue')
const Home = () => import('@/views/home/index.vue')
const User = () => import('@/views/system/user/index.vue')
const Role = () => import('@/views/system/role/index.vue')
const Permission = () => import('@/views/system/permission/index.vue')

export default [
    {
        path: '/home',
        component: Layout,
        name: 'dashboard',
        meta: {
            title: '主页'
        },
        icon: 'icon-home',
        children: [
            {
                path: '',
                name: 'home',
                component: Home,
                meta: {
                    title: '主页',
                },
            },
        ]
    },
    {
        path: '/user',
        component: Layout,
        meta: {
            title: '系统管理'
        },
        icon: 'icon-home',
        children: [
            {
                path: '/user',
                name: 'user',
                component: User,
                meta: {
                    title: '用户管理',
                },
            },
            {
                path: '/role',
                name: 'role',
                component: Role,
                meta: {
                    title: '角色管理',
                },
            },
            {
                path: '/permission',
                name: 'permission',
                component: Permission,
                meta: {
                    title: '权限管理',
                },
            },
        ]
    }
]
