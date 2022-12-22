<template>
<div>
    <h1 align="center">学生查询界面</h1>
  <el-form>
    <el-input v-model="gender" style="width: 150px" clearable placeholder="请输入性别"></el-input>
    <el-button type="primary" @click="getStuByGender">查询</el-button>
    <el-input v-model="user.id" style="width: 300px" clearable placeholder="请输入学号"></el-input>
    <el-button type="primary" @click="getStuById">查询</el-button>
  </el-form>
    <el-table
            :data="list"
            style="width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
            border>
        <el-table-column
                prop="stuId"
                label="学号">
        </el-table-column>
        <el-table-column
                prop="stuName"
                label="姓名">
        </el-table-column>
      <el-table-column
          prop="gender"
          label="性别">
      </el-table-column>
        <el-table-column
                prop="enDate"
                label="入学日期"
                :formatter="dateFormat">
        </el-table-column>
      <el-table-column
          prop="enable"
          label="是否为贫困生">
        <template slot-scope="scope">
          <div v-if="enableList.includes(scope.row.stuId)">
            是
          </div>
          <div v-else>否</div>
        </template>
      </el-table-column>
      <el-table-column
          label="贫困生操作"
          width="auto">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="setEnable(scope.row)">添加</el-button>
          <el-button type="danger" size="mini" @click="removeEnable(scope.row)">移出</el-button>
        </template>
      </el-table-column>
      <el-table-column
          label="账号操作"
          width="200px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="resetPassword(scope.row)">重置密码</el-button>
          <el-button type="danger" size="mini" @click="deleteStudent(scope.row)">删除学生</el-button>
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
import moment from 'moment'
import Vue from 'vue'
export default {
  data () {
    return {
      name: 'getStudentByid',
      list: [],
      student: {},
      pageList: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      gender: '',
      user: {
        id: null
      },
      enableList: []
    }
  },
  created () {
    this.stuList()
  },
  methods: {
    props: ['value'],
    dateFormat: function (row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      // 这里的格式根据需求修改
      return moment(date).format('YYYY-MM-DD')
    },
    resetPassword (data) {
      this.$confirm('是否重置该学生账号的登录密码？', '提示', {type: 'warning'})
        .then(_ => {
          let student = {stuId: data.stuId, stuName: data.stuName}
          this.$axios.post('/api/student/resetPassword', student).then(res => {
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
    deleteStudent (data) {
      this.$confirm('是否删除该学生账号？', '提示', {type: 'warning'})
        .then(_ => {
          this.$confirm('该操作将清空该学生的贫困生资格与申请记录，是否继续？', '提示', {type: 'warning'})
            .then(_ => {
              this.$axios.post('api/student/delete', data).then(res => {
                // console.info(res)
                if (res.data !== null && res.data.status === true) {
                  Vue.prototype.$message.success(res.data.message)
                  this.stuList()
                } else {
                  Vue.prototype.$message.error(res.data.message)
                }
              })
            })
            .catch(_ => {})
        })
        .catch(_ => {})
    },
    setEnable (data) {
      this.$confirm('是否将该学生设置为贫困生？', '提示', {type: 'warning'})
        .then(_ => {
          this.$axios.post('api/enable/add', data).then(res => {
            // console.info(res.data)
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.data)
              this.stuList()
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        })
        .catch(_ => {})
    },
    removeEnable (data) {
      this.$confirm('是否将该学生移出贫困生？', '提示', {type: 'warning'})
        .then(_ => {
          this.$confirm('该操作将清空该学生的申请记录，是否继续？', '提示', {type: 'warning'})
            .then(_ => {
              this.$axios.post('api/enable/delete', data).then(res => {
                // console.info(res)
                if (res.data !== null && res.data.status === true) {
                  Vue.prototype.$message.success(res.data.message)
                  this.stuList()
                } else {
                  Vue.prototype.$message.error(res.data.message)
                }
              })
            })
            .catch(_ => {})
        })
        .catch(_ => {})
    },
    stuList () {
      this.$axios.post('/api/student/getByManagerId', this.pageList).then(res => {
        // console.info(res)
        this.list = res.data.data.records
        this.pageList.total = res.data.data.total
      })
      this.getEnableList()
    },
    getEnableList () {
      this.$axios.post('/api/enable/getEnableList').then(res => {
        let originList = res.data.data
        let list = []
        for (let i = 0; i < originList.length; i++) {
          list.push(originList[i]['stuId'])
        }
        this.enableList = list
      })
    },
    getStuById () {
      this.$axios.post('/api/student/getByStuId', this.user).then(res => {
        // console.log(res)
        this.student = res.data.data
        this.list = [this.student]
      })
    },
    getStuByGender () {
      let data = {pageList: this.pageList, gender: this.gender}
      this.$axios.post('/api/student/getByGender', data).then(res => {
        // console.info(res)
        this.list = res.data.data.records
        this.pageList.total = res.data.data.total
      })
    },
    pageSizeChange (val) {
      this.pageList.pageSize = val
      this.stuList()
    },
    pageNoChange (val) {
      this.pageList.pageNo = val
      this.stuList()
    }
  }
}
</script>

<style scoped>

</style>
