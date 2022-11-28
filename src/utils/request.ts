import axios from 'axios'
import { useApp } from '@/pinia/modules/app'
import { ElMessage } from 'element-plus'

const service = axios.create({
    baseURL: '/',
    timeout: 10000,
    withCredentials:true
})

// 拦截请求
service.interceptors.request.use(
    config => {
        const { authorization } = useApp()
        if (authorization) {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${authorization}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 拦截响应
service.interceptors.response.use(
    // 响应成功进入第1个函数，该函数的参数是响应对象
    response => {
        return response.data
    },
    // 响应失败进入第2个函数，该函数的参数是错误对象
    async error => {
        //如果响应码是 403 则提示服务器未启动
        if (error.response.status === 503) {
            ElMessage({
                showClose: true,
                message: '服务器未启动，请等待几分钟，或者联系管理员',
                type: 'error'
            })
            return Promise.reject(error)
        }else if (error.response.status === 401){
            ElMessage({
                showClose: true,
                message: '用户未携带token或者携带错误的token',
                type: 'error'
            })
        }else if (error.response.status === 403){
            ElMessage({
                showClose: true,
                message: '用户携带token不具有这个权限',
                type: 'error'
            })
        }else if (error.response.status === 404){
            ElMessage({
                showClose: true,
                message: '请求地址不正确',
                type: 'error'
            })
        }

        return Promise.reject(error)
    }
)

export default service
