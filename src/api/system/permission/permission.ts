import request from '@/utils/request'

// 登录接口
export const page = data => {
    return request({
        url: '/trail/system/page',
        method: 'get',
        data,
    })
}
