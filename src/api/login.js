import request from '@/utils/request'

// 登录接口
export const Login = data => {
    return request({
        url: '/trail/uaa/login',
        method: 'post',
        data,
    })
}
