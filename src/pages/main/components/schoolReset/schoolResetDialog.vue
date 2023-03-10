<template>
  <div>
    <el-dialog
        title="重置密码"
        append-to-body
        :visible.sync="dialogVisible"
        width="30%"
        :modal-append-to-body='false'
        :before-close="handleClose">
      <el-form ref="form" label-width="auto">
        <el-form-item label="账号">
          <el-input v-model.number="schId"
                    ref="input"
                    placeholder="请输入账号"
                    oninput="value=value.replace(/[^0-9]/g,'')"
                    style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱验证码">
          <el-input v-model.number="inNum"
                    ref="input"
                    placeholder="请输入6位纯数字"
                    oninput="value=value.replace(/[^0-9]/g,'')"
                    maxlength="6"
                    style="width: 200px"></el-input>
          <el-button @click="setEmail"
                     type="success"
                     style="width:125px;"
                     :disabled="disabled=!button_show">
            <span v-show="button_show">获取验证码</span>
            <span v-show="!button_show" class="count">{{count}} s</span>
          </el-button>
        </el-form-item>
      </el-form>
      <h3 align="center">如邮箱已更换，请联系数据库管理员重置邮箱</h3>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="resetPassword">重 置</el-button>
        <el-button @click="handleClose">取 消</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'schoolResetDialog',
  data () {
    return {
      dialogVisible: false,
      inNum: null,
      schId: '',
      button_show: true,
      count: '', // 初始化次数
      timer: null
    }
  },
  methods: {
    show () {
      this.schId = ''
      this.dialogVisible = true
    },
    setEmail () {
      if (this.schId === '' || this.schId === null) {
        Vue.prototype.$message.error('请输入账号')
      } else {
        let val = {schId: this.schId}
        this.$axios.post('/api/school/getSchoolById', val).then(res => {
          if (res.data.status === true) {
            Vue.prototype.$message.warning('稍有延迟，请耐心等待发送成功提示出现')
            const TIME_COUNT = 60 // 更改倒计时时间
            if (!this.timer) {
              this.count = TIME_COUNT
              this.button_show = false
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--
                } else {
                  this.button_show = true
                  clearInterval(this.timer) // 清除定时器
                  this.timer = null
                }
              }, 1000)
            }
            this.$axios.post('/api/school/setEmail').then(res => {
              Vue.prototype.$message.success('发送成功，请注意查收')
            })
          } else {
            Vue.prototype.$message.error('账号输入错误，请重新输入')
          }
        })
      }
    },
    resetPassword () {
      this.$confirm('确认重置密码？')
        .then(_ => {
          if (this.inNum === null || this.inNum === '') {
            Vue.prototype.$message.error('请输入验证码')
          } else {
            let val = {inNum: this.inNum}
            this.$axios.post('/api/school/resetPassword', val).then(res => {
              // console.info(res)
              if (res.data !== null && res.data.status === true) {
                Vue.prototype.$message.success(res.data.message)
                this.dialogVisible = false
                this.$refs.input.clear()
              } else {
                Vue.prototype.$message.error(res.data.message)
              }
            })
          }
        })
        .catch(_ => {})
    },
    handleClose () {
      this.$refs.input.clear()
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
