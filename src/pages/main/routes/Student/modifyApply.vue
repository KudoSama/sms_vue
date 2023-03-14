<template>
    <div>
        <h1 align="center">修改申请</h1>
      <div style="width: 80%; text-align: center; margin: auto">
        <el-table
                :data="appListNot"
                border
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="记录编号"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="stuId"
                    label="学号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="batchId"
                    label="批次"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="clothId"
                    label="衣物id"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="clothSize"
                    label="衣物尺码"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="appReason"
                    label="申请理由"
                    width="120">
            </el-table-column>
          <el-table-column
              prop="state"
              label="审核状态"
              width="120">
          </el-table-column>
          <el-table-column
              prop="refReason"
              label="拒绝理由"
              width="120">
          </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="medium" @click="showDetail(scope.row)">修 改</el-button>
                  <el-button type="danger" size="medium" @click="deleteApply(scope.row.id)">删 除</el-button>
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
        <stu-change-appdialog ref="stuChangeAppdialog"></stu-change-appdialog>

    </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import stuChangeAppdialog from '../../components/chageApplication/stuChangeAppdialog'
export default {
  name: 'stApprove',
  components: {
    stuChangeAppdialog
  },
  data: function () {
    return {
      pageList: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      appListNot: [],
      // 要通过的id集合
      ids: []
    }
  },
  created () {
    this.findNotExamineStuModify()
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
    findNotExamineStuModify () {
      this.$axios.post('/api/stuApply/studentSelect', this.pageList).then(res => {
        if (res.data.data !== null) {
          this.appListNot = res.data.data.records
          this.pageList.total = res.data.data.total
          console.log(this.appListNot)
          // Vue.prototype.$message.success(res.data.message)
        } else {
          Vue.prototype.$message.error(res.data.message)
        }
      })
    },
    deleteApply (id) {
      this.$confirm('是否删除该条申请记录？', '提示', {type: 'warning'})
        .then(_ => {
          let val = {id: id}
          this.$axios.post('/api/stuApply/deleteApply', val).then(res => {
            // console.info(res)
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.data)
              this.findNotExamineStuModify()
            } else {
              Vue.prototype.$message.error(res.data.data)
            }
          })
        })
        .catch(_ => {})
    },
    showDetail (applyRecords) {
      this.$refs.stuChangeAppdialog.show(applyRecords, this.findNotExamineStuModify)
    },
    pageSizeChange (val) {
      this.pageList.pageSize = val
      this.findNotExamineStuModify()
    },
    pageNoChange (val) {
      this.pageList.pageNo = val
      this.findNotExamineStuModify()
    }
  }
}
</script>

<style scoped>

</style>
