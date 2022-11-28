<template>
  <div class="login">
    <el-form class="form" :model="loginVO" :rules="rules" ref="ruleFormRef">
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
        >
          {{ btnText }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'login'
  };
</script>

<script lang="ts" setup>
import {reactive, ref, computed, toRefs} from 'vue'
//import type { FormInstance, FormRules } from 'element-plus'

//const ruleFormRef = ref<FormInstance>()

/*const rules = reactive<FormRules>({
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
})*/

const state = reactive({
  loginVO: {
    username: 'admin',
    password: '123456'
  },
  loading: false,
  btnText: computed(() =>
      state.loading ? '登录中' : '登录'
  )
})

const {
  loginVO,
  loading,
  btnText
} = toRefs(state)

/*const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}*/
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
