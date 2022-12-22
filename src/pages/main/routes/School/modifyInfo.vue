<template>
  <div>
    <h1 align="center">修改账户信息</h1>
    <el-form ref="school" :model="school" label-width="auto">
      <el-form-item label="账号" prop="schId">
        <el-input style="width: 300px"  :disabled="true" v-model="school.schId"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="schName">
        <el-input style="width: 300px" v-model="school.schName"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="schPassword" autocomplete="off">
        <el-input style="width: 300px"
                  placeholder="如果无需修改密码请不要输入"
                  show-password
                  v-model="school.schPassword"></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码" prop="enPassword">
        <el-input style="width: 300px"
                  placeholder="如果无需修改密码请不要输入"
                  show-password
                  v-model="enPassword"></el-input>
      </el-form-item>
      <el-form-item label="绑定邮箱">
        <el-input style="width: 300px" v-model="school.schEmail"></el-input>
      </el-form-item>
      <el-form-item label="邮箱验证码">
        <el-input
            style="width: 300px"
            v-model="emailNum"
            placeholder="请输入6位纯数字"
            oninput="value=value.replace(/[^0-9]/g,'')"
            maxlength="6"></el-input>
        <el-button @click="setEmail" style="width: auto" type="primary">发送验证邮件</el-button>
        <el-button @click="modifyInfo" style="width: auto" type="primary">提 交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import {Base64} from 'js-base64'
import {Message} from 'element-ui'

export default {
  name: 'modifyInfo',
  created () {
    this.getSchoolInfo()
  },
  data () {
    return {
      school: {schId: '', schName: '', schPassword: ''},
      emailNum: null,
      enPassword: ''
    }
  },
  methods: {
    getSchoolInfo () {
      this.$axios.post('/api/school/getSchool').then(res => {
        // console.info(res)
        if (res.data !== null && res.data.status === true) {
          this.school = res.data.data
        } else {
          Vue.prototype.$message.error(res.data.message)
        }
      })
    },
    setEmail () {
      Vue.prototype.$message.warning('稍有延迟，请耐心等待发送成功提示出现，请勿连点发送按钮')
      this.$axios.post('/api/school/setEmail').then(res => {
        Vue.prototype.$message.success('发送成功，请注意查收')
      })
    },
    modifyInfo () {
      if (this.emailNum === null || this.emailNum === '') {
        Vue.prototype.$message.error('请输入邮箱验证码')
      } else {
        this.$confirm('请问修改该账号信息吗？', '提示', {type: 'warning'})
          .then(_ => {
            // 如果输入框先输入再删除则会将null变为空串，这里无需针对密码修改
            if ((this.school.schPassword === null || this.school.schPassword === '') &&
                (this.enPassword === '' || this.enPassword === null)) {
              this.school.schPassword = null // 这一步是交给后端校验是否输入密码用
              let val = {school: this.school, email: this.emailNum}
              this.$axios.post('/api/school/modify', val).then(res => {
                if (res.data !== null && res.data.status === true) {
                  Vue.prototype.$message.success(res.data.message)
                  this.school.schPassword = null
                  this.enPassword = null
                } else {
                  Vue.prototype.$message.error(res.data.message)
                  this.school.schPassword = ''
                  this.enPassword = ''
                }
              })
            } else if (this.school.schPassword !== this.enPassword) { // 前后输入不一致
              Vue.prototype.$message.error('前后两次输入的密码不一致，请检查后重新填写')
            } else if (this.school.schPassword === this.enPassword &&
                this.school.schPassword !== null &&
                this.school.schPassword !== '') {
              // 当前置密码不为空也不为空串时，两者相等执行这里
              this.school.schPassword = Base64.encode(this.$md5(this.school.schPassword))
              let val = {school: this.school, email: this.emailNum}
              this.$axios.post('/api/school/modify', val).then(res => {
                // console.info(res)
                if (res.data !== null && res.data.status === true) {
                  Vue.prototype.$message.success(res.data.message)
                  this.school.schPassword = ''
                  this.enPassword = ''
                } else {
                  Vue.prototype.$message.error(res.data.message)
                }
              })
            } else {
              let val = {school: this.school, email: this.emailNum}
              this.$axios.post('/api/school/modify', val).then(res => {
                if (res.data !== null && res.data.status === true) {
                  Vue.prototype.$message.success(res.data.message)
                  this.school.schPassword = ''
                  this.enPassword = ''
                } else {
                  Vue.prototype.$message.error(res.data.message)
                  this.school.schPassword = ''
                  this.enPassword = ''
                }
              })
            }
          })
          .catch(_ => {})
      }
    }
  }
}
</script>

<style scoped>

</style>