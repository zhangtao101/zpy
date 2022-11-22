<template>
  <div class="login">
    <el-form class="form" :model="loginVO" :rules="rules" ref="loginForm">
      <h1 class="title">轨迹微云系统</h1>
      <el-form-item prop="username">
        <el-input
            class="text"
            prefix-icon="User"
            v-model="loginVO.username"
            clearable
            placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            class="text"
            prefix-icon="Lock"
            v-model="loginVO.password"
            clearable
            show-password
            placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button
            :loading="loading"
            class="btn"
            type="primary"
            size="large"
            @click="submit"
        >
          {{ btnText }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  toRefs,
  ref,
  computed
} from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { Login } from '@/api/login'
import { useApp } from '@/pinia/modules/app'
import { useAccount } from '@/pinia/modules/account'

export default defineComponent({
  name: 'login',
  setup(){
    const { proxy: ctx } = getCurrentInstance()
    const router = useRouter()

    const getRules = () =>({
      username: [
        {
          required: true,
          message: "用户名不能为空",
          trigger: 'blur'
        },
      ],
      password: [
        {
          required: true,
          message: "用户名不能为空",
          trigger: 'blur'
        },
        {
          min: 6,
          max: 20,
          message: "密码长度在6-20之间",
          trigger: 'blur'
        }
      ]
    })

    const state = reactive({
      loginVO: {
        username: 'admin',
        password: '123456'
      },
      rules: getRules(),
      loading: false,
      btnText: computed(() =>
          state.loading ? '登录中' : '登录'
      ),
      loginForm: ref(null),
      submit: () => {
        if (state.loading){
          return
        }
        state.loginForm.validate(
            async valid => {
              if (valid) {
                state.loading = true

                //请求登录
                const { data , respCode } = await Login(state.loginVO)
                if (respCode === '200'){

                  ElMessage({
                    message:'登录成功',
                    type: 'success',
                    duration: 1000
                  })

                  //登录成功跳转到主页
                  router.push("/")

                  //重置token
                  useApp().initToken(data.accessToken,data.roleList,data.permissionList)
                }

                state.loading = false
              }
            }
        )
      }
    })

    return {
      ...toRefs(state),
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  transition: transform 1s;
  transform: scale(1);
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #2d3a4b;
  .form {
    width: 520px;
    max-width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
    margin: 160px auto 0;
    :deep {
      .el-input__wrapper {
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        background: rgba(0, 0, 0, 0.1);
      }
      .el-input-group--append > .el-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .el-input-group--prepend > .el-input__wrapper {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    .title {
      color: #fff;
      text-align: center;
      font-size: 24px;
      margin: 0 0 24px;
    }
    .text {
      font-size: 16px;
      :deep(.el-input__inner) {
        color: #fff;
        height: 48px;
        line-height: 48px;
        &::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>
