<template>
    <div>
        <h1 align="center">添加学院账户</h1>
        <el-form ref="form" :model="form" label-width="100px">
            <el-col :span="10">
                <el-form-item label="学院id" >
                    <el-input v-model="form.colId"></el-input>
                </el-form-item>
                <el-form-item label="学院名">
                    <el-input v-model="form.colName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.colPassword"></el-input>
                </el-form-item>
            </el-col>

            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

            <el-form-item>
                <el-button type="primary" @click="addCollegeAccount">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'addCollegeAccount',
  data () {
    return {
      form: {
        colId: '',
        colName: '',
        colPassword: ''
      }
    }
  },
  methods: {
    addCollegeAccount () {
      let std = {
        colId: this.form.colId,
        colName: this.form.colName,
        colPassword: this.$md5(this.form.colPassword)
        //
      }

      this.$axios.post('api/college/add', std).then(res => {
        // console.info(res.data)
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message.success(res.data.message)
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
