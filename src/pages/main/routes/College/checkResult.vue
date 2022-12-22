<template>
    <div>
    <h1 align="center">申请记录审核历史</h1>
    <el-table
            :data="applistNot"
            border
            style="width: 100%">
        <el-table-column
                type="selection"
                width="55">
        </el-table-column>
        <el-table-column
                fixed
                prop="id"
                label="编号"
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
                prop="appReason"
                label="申请理由"
                width="120">
        </el-table-column>
        <el-table-column
                prop="scDate"
                label="提交日期"
                width="300"
                :formatter="dateFormat">
        </el-table-column>
        <el-table-column
                prop="state"
                label="审核状态"
                width="120">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
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
    <application-record-dialog ref="applied"></application-record-dialog>
    </div>
</template>

<script>
import applicationRecordDialog from '../../components/application/applied'
import moment from 'moment'
import Vue from 'vue'
export default {
  name: 'stApprove',
  components: {
    applicationRecordDialog
  },
  created () {
    this.findNotExamineStuApply()
  },
  data: function () {
    return {
      pageList: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      applistNot: [],
      // 要通过的id集合
      ids: []
    }
  },
  methods: {
    agreeByBatch () {
      this.$axios.post('/api/stuApply/agreeBatch', this.ids).then(res => {
        // console.info(res)
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message.success(res.data.data)
        } else {
          Vue.prototype.$message.error(res.data.data)
        }
      })
    },
    aggreeSingle (row) {
      let val = [row.id]
      this.$axios.post('/api/stuApply/agreeBatch', val).then(res => {
        // console.info(res)
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message.success(res.data.data)
        } else {
          Vue.prototype.$message.error(res.data.data)
        }
      })
      // console.log(val)
    },
    props: ['value'],
    dateFormat: function (row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      // 这里的格式根据需求修改
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    findNotExamineStuApply () {
      this.$axios.post('/api/stuApply/selectExaminedStuApply', this.pageList).then(res => {
        // console.info(res)
        this.applistNot = res.data.data.records
        this.pageList.total = res.data.data.total
      })
    },
    pageSizeChange (val) {
      this.pageList.pageSize = val
      this.findNotExamineStuApply()
    },
    pageNoChange (val) {
      this.pageList.pageNo = val
      this.findNotExamineStuApply()
    },
    showDetail (applyrecords) {
      // console.info(applyrecords)
      this.$refs.applied.show(applyrecords)
    }
  }
}

</script>

<style scoped>

</style>
