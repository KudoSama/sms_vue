<template>
  <div>
    <el-dialog
        title="重置密码"
        :visible.sync="dialogVisible"
        width="30%"
        :modal-append-to-body='false'
        :before-close="handleClose">
      <el-form ref="form" label-width="auto">
        <el-form-item label="邮箱验证码">
          <el-input v-model.number="inNum"
                    ref="input"
                    placeholder="请输入6位纯数字"
                    oninput="value=value.replace(/[^0-9]/g,'')"
                    maxlength="6"
                    style="width: 200px"></el-input>
          <el-button @click="setEmail">发送邮件</el-button>
        </el-form-item>
      </el-form>
      <h3 align="center">如邮箱已更换，请联系系统管理员重置邮箱</h3>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="resetPassword">确 定</el-button>
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
      inNum: null
    }
  },
  methods: {
    show () {
      this.dialogVisible = true
    },
    setEmail () {
      Vue.prototype.$message.warning('稍有延迟，请耐心等待发送成功提示出现，请勿连点发送按钮')
      this.$axios.post('/api/school/setEmail').then(res => {
        Vue.prototype.$message.success('发送成功，请注意查收')
      })
    },
    UpNumber (e) {
      e.target.value = e.target.value.replace(/[^\d]/g, '')
    },
    resetPassword () {
      this.$confirm('确认重置密码？')
        .then(_ => {
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
