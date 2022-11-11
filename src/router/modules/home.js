const Layout = () => import('@/layout/index.vue')
const Home = () => import('@/views/home/index.vue')

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
                    title: '菜单主页',
                    affix: true,
                },
            },
        ]
    }
]
