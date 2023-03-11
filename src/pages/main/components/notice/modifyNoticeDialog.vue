<template>
  <div>
    <el-dialog title="修改通知"
               append-to-body
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <el-form ref="batchRecord" :model="noticeRecord" label-width="100px">
        <el-col :span="100">
          <el-form-item label="通知id">
            <el-input v-model="noticeRecord.id"
                      :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <br><br><br><br><br>
        <el-form-item label="通知">
          <el-input v-model="noticeRecord.notice"></el-input>
        </el-form-item>
        <el-form-item label="通知时间">
          <div>开始时间：
            <el-date-picker type="datetime"
                            v-model="noticeRecord.startDate">
            </el-date-picker>
          </div>
          <div>结束时间：
            <el-date-picker v-model="noticeRecord.endDate"
                            type="datetime">
            </el-date-picker>
          </div>
          <br><br>
          <el-form-item>
            <el-button type="primary" @click="modifyNotice">修 改</el-button>
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
  name: 'modifyNoticeDialog',
  data () {
    return {
      dialogVisible: false,
      noticeRecord: {}
    }
  },
  methods: {
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
    show (noticeRecord) {
      this.dialogVisible = true
      this.noticeRecord = noticeRecord
    },
    modifyNotice () {
      this.$confirm('是否修改该通知？', '提示', {type: 'warning'})
        .then(_ => {
          let val = {
            id: this.noticeRecord.id,
            notice: this.noticeRecord.notice,
            startDate: this.noticeRecord.startDate,
            endDate: this.noticeRecord.endDate
          }
          this.$axios.post('/api/notice/modify', val).then(res => {
            // console.info(res)
            if (res.data.status === true) {
              this.dialogVisible = false
              Vue.prototype.$message({
                message: res.data.message,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  window.location.reload()
                }
              })
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
