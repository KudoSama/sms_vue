<template>
    <div>
        <h1 align="center"> 添加辅导员</h1>
        <el-form ref="form" :model="form"
                 label-width="100px">
            <el-col :span="10">
                <el-form-item label="工号" >
                    <el-input v-model="form.manId"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.manName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.manPassword"></el-input>
                </el-form-item>
            </el-col>
            <br><br><br><br><br><br><br><br><br><br><br><br>
            <el-form-item>
                <el-button type="primary" @click="addManager">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'addManager',
  data () {
    return {
      form: {
        manId: '',
        manName: '',
        manPassword: ''
        // type: [],

      }
    }
  },
  methods: {
    addManager () {
      let std = {
        manId: this.form.manId,
        manName: this.form.manName,
        manPassword: this.$md5(this.form.manPassword)
      }
      // console.info(std.manPassword)
      this.$axios.post('api/manager/add', std).then(res => {
        // console.info(res.data)
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message({
            message: res.data.message,
            type: 'success',
            duration: 1500,
            onClose: () => {
              window.location.reload()
            }
          })
        } else {
          Vue.prototype.$message.error(res.data.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
