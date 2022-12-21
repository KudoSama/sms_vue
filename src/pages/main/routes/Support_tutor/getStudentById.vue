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
                prop="enDate"
                label="入学时间"
                :formatter="dateFormat">
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
      }
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
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    stuList () {
      this.$axios.post('/api/student/getByManagerId', this.pageList).then(res => {
        // console.info(res)
        this.list = res.data.data.records
        this.pageList.total = res.data.data.total
      })
    },
    getStuById () {
      this.$axios.post('/api/student/getByStuId', this.user).then(res => {
        console.log(res)
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
