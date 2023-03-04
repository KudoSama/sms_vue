<template>
  <div>
    <h1 align="center">修改账户信息</h1>
    <el-form ref="student" :model="student" label-width="auto">
      <el-form-item label="账号" prop="stuId">
        <el-input style="width: 300px" :disabled="true" v-model="student.stuId"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="stuName">
        <el-input style="width: 300px" v-model="student.stuName"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="stuPassword" autocomplete="off">
        <el-input style="width: 300px"
                  placeholder="如果无需修改密码请不要输入"
                  show-password
                  v-model="student.stuPassword"></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码"  prop="enPassword">
        <el-input style="width: 300px"
                  placeholder="如果无需修改密码请不要输入"
                  show-password
                  v-model="enPassword"></el-input>
        <el-button @click="modifyInfo" style="width: auto" type="primary">提 交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import {Base64} from 'js-base64'
export default {
  name: 'modifyInfo',
  created () {
    this.getStudentInfo()
  },
  data () {
    return {
      student: {stuId: '', stuName: '', stuPassword: ''},
      enPassword: ''
    }
  },
  methods: {
    getStudentInfo () {
      this.$axios.post('/api/student/getStudent').then(res => {
        console.info(res)
        if (res.data !== null && res.data.status === true) {
          this.student = res.data.data
        } else {
          Vue.prototype.$message.error(res.data.message)
        }
      })
    },
    modifyInfo () {
      this.$confirm('是否修改该账号信息？', '提示', {type: 'warning'})
        .then(_ => {
          // 如果输入框先输入再删除则会将null变为空串，这里无需针对密码修改
          if ((this.student.stuPassword === null || this.student.stuPassword === '') &&
                (this.enPassword === '' || this.enPassword === null)) {
            this.student.stuPassword = null // 这一步是交给后端校验是否输入密码用
            let val = this.student
            this.$axios.post('/api/student/modify', val).then(res => {
              if (res.data !== null && res.data.status === true) {
                Vue.prototype.$message.success(res.data.message)
                this.student.stuPassword = null
                this.enPassword = null
              } else {
                Vue.prototype.$message.error(res.data.message)
                this.student.stuPassword = ''
                this.enPassword = ''
              }
            })
          } else if (this.student.stuPassword !== this.enPassword) {
            // 前后输入不一致
            Vue.prototype.$message.error('前后两次输入的密码不一致，请检查后重新填写')
          } else if (this.student.stuPassword === this.enPassword &&
                this.student.stuPassword !== null &&
                this.student.stuPassword !== '') {
            // 当前置密码不为空也不为空串时，两者相等执行这里
            this.student.stuPassword = Base64.encode(this.$md5(this.student.stuPassword))
            let val = this.student
            this.$axios.post('/api/student/modify', val).then(res => {
              // console.info(res)
              if (res.data !== null && res.data.status === true) {
                Vue.prototype.$message.success(res.data.message)
                this.student.stuPassword = ''
                this.enPassword = ''
              } else {
                Vue.prototype.$message.error(res.data.message)
              }
            })
          } else {
            let val = this.student
            this.$axios.post('/api/student/modify', val).then(res => {
              if (res.data !== null && res.data.status === true) {
                Vue.prototype.$message.success(res.data.message)
                this.student.stuPassword = ''
                this.enPassword = ''
              } else {
                Vue.prototype.$message.error(res.data.message)
                this.student.stuPassword = ''
                this.enPassword = ''
              }
            })
          }
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>

</style>
