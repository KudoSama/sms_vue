<template>
<div>
    <h1 align="center">申请记录审核</h1>
  <div style="width: 80%; text-align: center; margin: auto">
    <el-button type="success" @click="agreeByBatch" v-if="ids.length > 0">批量通过</el-button>
    <el-table
            :data="applistNot"
            border
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange">
        <el-table-column
                type="selection"
                width="55">
        </el-table-column>
        <el-table-column
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
                label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
                <el-button @click="agreeSingle(scope.row)" type="success" size="mini">同意</el-button>
                <el-button type="danger" size="mini" @click="refuseSingle(scope.row)">拒绝</el-button>
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
    <application-record-dialog ref="stuApplyNot"></application-record-dialog>
    <ref-reason-dialog ref="refReasondialog"></ref-reason-dialog>
</div>
</template>

<script>
import applicationRecordDialog from '../../components/application/applicationRecordDialog'
import refReasonDialog from '../../components/refReason/refReasonDialog'
import moment from 'moment'
import Vue from 'vue'
export default {
  name: 'manApprove',
  components: {
    applicationRecordDialog,
    refReasonDialog
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
          this.findNotExamineStuApply()
        } else {
          Vue.prototype.$message.error(res.data.data)
        }
      })
    },
    handleSelectionChange (checkedrecords) {
      this.ids = checkedrecords.map(applyRecords => applyRecords.id)
    },
    agreeSingle (row) {
      let val = [row.id]
      this.$axios.post('/api/stuApply/agreeBatch', val).then(res => {
        // console.info(res)
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message.success(res.data.data)
          this.findNotExamineStuApply()
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
      this.$axios.post('/api/stuApply/selectNotExamineStuApply', this.pageList).then(res => {
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
      this.$refs.stuApplyNot.show(applyrecords)
    },
    refuseSingle (applyrecords) {
      this.$refs.refReasondialog.show(applyrecords)
    }

  }
}
</script>

<style scoped>

</style>
