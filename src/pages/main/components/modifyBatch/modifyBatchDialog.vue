<template>
  <div>
    <el-dialog title="学生申请"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="100px">
        <el-col :span="10">
          <el-form-item label="批次号">
            <el-input v-model="batchRecord.batchId"
                      :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <br><br><br><br><br>
        <el-form-item label="批次时间">
          <div>开始时间：
            <el-date-picker type="date"
                            v-model="batchRecord.batchDatestart">
            </el-date-picker>
          </div>
          <div>结束时间：
            <el-date-picker v-model="batchRecord.batchDateend"
                            type="date">
            </el-date-picker>
          </div>
          <br><br>
          <el-form-item>
            <el-button type="primary" @click="modifyBatch">修 改</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'

export default {
  name: 'modifyBatchDialog',
  data () {
    return {
      dialogVisible: false,
      batchRecord: {}
    }
  },
  methods: {
    modifyBatch () {
      this.$confirm('请问修改该批次信息吗？', '提示', {type: 'warning'})
        .then(_ => {
          let val = {
            batchId: this.batchRecord.batchId,
            batchDatestart: this.batchRecord.batchDatestart,
            batchDateend: this.batchRecord.batchDateend
          }
          this.$axios.post('/api/batch/modify', val).then(res => {
            // console.info(res)
            if (res.data.status === true) {
              this.dialogVisible = false
              Vue.prototype.$message.success(res.data.message)
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        })
        .catch(_ => {})
    },
    props: ['value'],
    dateFormat: function (row, column) {
      // console.log(row, column)
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      // 这里的格式根据需求修改
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    show (batchRecord) {
      this.dialogVisible = true
      this.batchRecord = batchRecord
    }
  }
}
</script>

<style scoped>

</style>
