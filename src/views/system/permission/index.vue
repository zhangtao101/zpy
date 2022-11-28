<template>
  <div class="app-container">
    <div class="search">
        <el-form>
          <el-form-item>
            <el-input />
          </el-form-item>
        </el-form>
    </div>

    <el-card>
        <template #header>
          <el-button
              type="primary"
              icon="Plus"
          >
            新增
          </el-button>

          <el-table>

          </el-table>
        </template>
    </el-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'permission',
  setup(){

  }
})
</script>

<style scoped>

</style>
