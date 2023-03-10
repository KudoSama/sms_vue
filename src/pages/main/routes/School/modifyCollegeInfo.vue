<template>

  <div>
    <h1 align="center">重置学院用户密码</h1>
    <div style="width: 80%; text-align: center; margin: auto">
    <el-table
        :data="collegeList"
        border
        style="width: 100%">
      <el-table-column
          prop="colId"
          label="学院账号"
          width="auto">
      </el-table-column>
      <el-table-column
          prop="colName"
          label="学院名"
          width="auto">
      </el-table-column>
      <el-table-column
          label="操作"
          width="auto">
        <template slot-scope="scope">
          <el-button type="primary" size="medium" @click="resetPassword(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'resetCollegePassword',
  created () {
    this.getCollegeList()
  },
  data () {
    return {
      collegeList: {}
    }
  },
  methods: {
    getCollegeList () {
      this.$axios.post('/api/college/getCollegeList').then(res => {
        if (res.data.data !== null) {
          this.collegeList = res.data.data
        } else {
          Vue.prototype.$message.error(res.data.message)
        }
      })
    },
    resetPassword (data) {
      this.$confirm('是否重置该学院账号的登录密码？', '提示', {type: 'warning'})
        .then(_ => {
          let college = {colId: data.colId, colName: data.colName}
          this.$axios.post('/api/college/resetPassword', college).then(res => {
            // console.log(res)
            if (res.data.status) {
              Vue.prototype.$message.success(res.data.message)
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>

</style>
