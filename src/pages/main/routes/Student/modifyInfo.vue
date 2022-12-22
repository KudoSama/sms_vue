<template>
  <div>
    <h1 align="center">修改账户信息</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input :disabled="true" v-model="schoolInfo.schId"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="schoolInfo.schName"></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input v-model="schoolInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码">
        <el-input v-model="schoolInfo.enPassword"></el-input>
      </el-form-item>
      <el-form-item label="绑定邮箱">
        <el-input v-model="schoolInfo.schEmail"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue/types/index'

export default {
  name: 'modifyInfo',
  data () {
    return {
      schoolInfo: {}
    }
  },
  getSchoolInfo () {
    this.$axios.post('/api/school/getSchool').then(res => {
      // console.info(res)
      if (res.data !== null && res.data.status === true) {
        this.schoolInfo = res.data.data
      } else {
        Vue.prototype.$message.error(res.data.message)
      }
    })
  }
}
</script>

<style scoped>

</style>
