<template>
    <div>

        <el-dialog
                title="修改申请"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="批次号">
                    <el-input v-model="applyRecords.id" :readonly="0"></el-input>
                </el-form-item>
                <el-form-item label="衣物id">
                    <el-input v-model="applyRecords.clothId"></el-input>
                </el-form-item>
                <el-form-item label="衣物尺码">
                    <el-input v-model="applyRecords.clothSize"></el-input>
                </el-form-item>
                <el-form-item label="申请理由">
                    <el-input v-model="applyRecords.appReason"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="success" @click="agreeSingle">提交</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
export default {
  name: 'chanegAppdialog',
  data () {
    return {
      dialogVisible: false,
      applyRecords: {}
    }
  },
  methods: {
    agreeSingle () {
      this.$confirm('请问修改该批次信息吗？', '提示', {type: 'warning'})
        .then(_ => {
          let val = {
            id: this.applyRecords.id,
            batchId: this.applyRecords.batchId,
            clothId: this.applyRecords.clothId,
            clothSize: this.applyRecords.clothSize,
            appReason: this.applyRecords.appReason
          }
          this.$axios.post('/api/stuApply/studentModify', val).then(res => {
            console.info(res)
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.message)
              this.dialogVisible = false
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        })
        .catch(_ => {
          this.dialogVisible = false
        })
    },
    show (applyRecords) {
      this.dialogVisible = true
      this.applyRecords = applyRecords
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    props: ['value'],
    dateFormat: function (row, column) {
      console.log(row, column)
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      // 这里的格式根据需求修改
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style scoped>

</style>
