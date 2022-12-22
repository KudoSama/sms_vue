<template>

  <div>
    <h1 align="center">重置辅导员用户密码</h1>
    <el-table
        :data="managerList"
        border
        style="width: 100%">
      <el-table-column
          prop="manId"
          label="辅导员账号"
          width="auto">
      </el-table-column>
      <el-table-column
          prop="manName"
          label="辅导员姓名"
          width="auto">
      </el-table-column>
      <el-table-column
          label="操作"
          width="auto">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="resetPassword(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        @size-change="pageSizeChange"
        @current-change="pageNoChange"
        :current-page="pageList.pageNo"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageList.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageList.total">
    </el-pagination>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'resetCollegePassword',
  created () {
    this.getManagerList()
  },
  data () {
    return {
      pageList: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      managerList: []
    }
  },
  methods: {
    getManagerList () {
      this.$axios.post('/api/manager/getManagerList', this.pageList).then(res => {
        if (res.data.data !== null) {
          this.managerList = res.data.data.records
          this.pageList.total = res.data.data.total
        } else {
          Vue.prototype.$message.error(res.data.message)
        }
      })
    },
    resetPassword (data) {
      this.$confirm('是否重置该辅导员账号的登录密码？', '提示', {type: 'warning'})
        .then(_ => {
          let manager = {manId: data.manId, manName: data.manName}
          this.$axios.post('/api/manager/resetPassword', manager).then(res => {
            // console.log(res)
            if (res.data.status) {
              Vue.prototype.$message.success(res.data.message)
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        })
        .catch(_ => {})
    },
    pageSizeChange (val) {
      this.pageList.pageSize = val
      this.getManagerList()
    },
    pageNoChange (val) {
      this.pageList.pageNo = val
      this.getManagerList()
    }
  }
}
</script>

<style scoped>

</style>
