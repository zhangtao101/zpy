import { defineStore } from 'pinia'

export const useAccount = defineStore('account', {
    state: () => ({
        userinfo: null,
        permissionList: [],
    }),
    actions:{
        // 清除用户信息
        clearUserinfo() {
            this.userinfo = null
        },
        //设置用户
        setUserinfo(data) {
            this.userinfo = data
        },
        //设置权限列表
        setPermissionList(data){
            this.permissionList = data
        }
    }
})
