import request from '@/utils/request'

// 登录接口
export function Login (data: any) {

    return request({
        url: '/trail/uaa/login',
        method: 'post',
        data,
    })
}
