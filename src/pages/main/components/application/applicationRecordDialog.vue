<template>
    <div>

    <el-dialog
            title="学生申请"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="编号">
                <el-input v-model="applyRecords.id"></el-input>
            </el-form-item>
            <el-form-item label="学号">
                <el-input v-model="applyRecords.stuId"></el-input>
            </el-form-item>
            <el-form-item label="服装id">
                <el-input v-model="applyRecords.clothId"></el-input>
            </el-form-item>
            <el-form-item label="服装尺寸">
                <el-input v-model="applyRecords.clothSize"></el-input>
            </el-form-item>
            <el-form-item label="提交日期">
                <el-date-picker type="datetime" v-model="applyRecords.scDate"></el-date-picker>
            </el-form-item>
            <el-form-item label="批次号">
                <el-input v-model="applyRecords.batchId"></el-input>
            </el-form-item>
            <el-form-item label="申请理由">
                <el-input v-model="applyRecords.appReason"></el-input>
            </el-form-item>
            <el-form-item label="审核状态">
                <el-input v-model="applyRecords.state"></el-input>
            </el-form-item>
            <el-form-item label="拒绝理由">
                <el-input type="textarea" v-model="applyRecords.refReason"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="success" @click="saggreeSingle">同 意</el-button>
    <el-button type="danger" @click="srefuseSingle">拒 绝</el-button>
  </span>
    </el-dialog>
    </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
export default {
  name: 'applicationRecordDialog',
  data () {
    return {
      dialogVisible: false,
      applyRecords: {}
    }
  },
  methods: {
    saggreeSingle () {
      let val = [this.applyRecords.id]
      this.$axios.post('/api/stuApply/agreeBatch', val).then(res => {
        // console.info(res)
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message.success(res.data.data)
        } else {
          Vue.prototype.$message.error(res.data.data)
        }
      })
    },
    srefuseSingle () {
      let val = [this.applyRecords]
      this.$axios.post('/api/stuApply/disagreeBatch', val).then(res => {
        // console.info(res)
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message.success(res.data.data)
        } else {
          Vue.prototype.$message.error(res.data.data)
        }
      })
    },
    show (applyrecords) {
      this.dialogVisible = true
      this.applyRecords = applyrecords
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
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
    }
  }
}

</script>

<style scoped>

</style>
