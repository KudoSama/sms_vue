<template>
  <div>
    <h1 align="center">修改申请批次</h1>
    <el-table
        :data="batchList"
        border
        style="width: 100%">
      <el-table-column
          prop="batchId"
          label="批次"
          width="auto">
      </el-table-column>
      <el-table-column
          prop="batchDatestart"
          label="开始时间"
          width="auto"
          :formatter="dateFormat">
      </el-table-column>
      <el-table-column
          prop="batchDateend"
          label="结束时间"
          width="auto"
          :formatter="dateFormat">
      </el-table-column>
      <el-table-column
          label="操作"
          width="auto">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showDetail(scope.row)">修 改</el-button>
          <el-button type="danger" size="mini" @click="deleteBatch(scope.row)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <modify-batch-dialog ref="modifyBatchDialog"></modify-batch-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import ModifyBatchDialog from '../../components/modifyBatch/modifyBatchDialog'

export default {
  name: 'modifyBatch',
  components: {ModifyBatchDialog},
  data () {
    return {
      form: {
        batchId: '',
        batchDatestart: '',
        batchDateend: ''
      },
      batchList: []
    }
  },
  created () {
    this.getBatchList()
  },
  methods: {
    getBatchList () {
      this.$axios.post('/api/batch/getBatchList').then(res => {
        if (res.data.data !== null) {
          this.batchList = res.data.data
          // console.log(this.batchList)
          // Vue.prototype.$message.success(res.data.message)
        } else {
          Vue.prototype.$message.error(res.data.message)
        }
      })
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
    showDetail (batchRecord) {
      console.info(batchRecord)
      this.$refs.modifyBatchDialog.show(batchRecord)
    },
    deleteBatch (batchRecord) {
      this.$confirm('该操作将清空衣物以及学生申请记录。确认删除该批次吗？', '提示', {type: 'warning'})
        .then(_ => {
          this.$confirm('再次确认删除该批次吗？', '提示', {type: 'warning'})
            .then(_ => {
              let val = {
                batchId: batchRecord.batchId,
                batchDatestart: batchRecord.batchDatestart,
                batchDateend: batchRecord.batchDateend
              }
              this.$axios.post('/api/batch/delete', val).then(res => {
                console.info(res)
                if (res.data.status === true) {
                  this.dialogVisible = false
                  Vue.prototype.$message.success(res.data.message)
                } else {
                  Vue.prototype.$message.error(res.data.message)
                }
              })
            })
            .catch(_ => {
            })
        })
        .catch(_ => {
        })
    }
  }
}
</script>

<style scoped>

</style>
