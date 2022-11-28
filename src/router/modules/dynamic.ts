const Layout = () => import('@/layout/index.vue')
const dynamic = () => import('@/views/dynamic/index.vue')

export default [
    {
        path: '/dynamic',
        component: Layout,
        name: 'dynamic',
        meta: {
            title: '动态菜单'
        },
        icon: 'Location',
        children: [
            {
                path: '',
                name: 'dynamic',
                component: dynamic,
                meta: {
                    title: '动态菜单'
                },
            }
        ]
    }
]
