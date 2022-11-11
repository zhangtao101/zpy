<template>
  <el-dropdown trigger="hover">
    <div class="userinfo">
        <template>
          <i class="el-icon-user" />
          admin
        </template>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useApp } from '@/pinia/modules/app'

export default defineComponent({
  name: "Userinfo",
  setup(){
    const router = useRouter()

    const logout = () => {
      useApp().clearToken()
      router.push('/login')
    }

    return {
      logout
    }
  }
})
</script>

<style lang="scss" scoped>
.userinfo {
  padding: 0 16px;
  line-height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background: #f5f5f5;
  }
  .el-icon-user {
    font-size: 20px;
    margin-right: 8px;
  }
  .avatar {
    margin-right: 8px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
</style>
