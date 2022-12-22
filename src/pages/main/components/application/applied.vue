<template>
    <div>

        <el-dialog
                title="学生申请"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="编号">
                    <el-input v-model="applyrecords.id"></el-input>
                </el-form-item>
                <el-form-item label="学号">
                    <el-input v-model="applyrecords.stuId"></el-input>
                </el-form-item>
                <el-form-item label="服装id">
                    <el-input v-model="applyrecords.clothId"></el-input>
                </el-form-item>
                <el-form-item label="服装尺寸">
                    <el-input v-model="applyrecords.clothSize"></el-input>
                </el-form-item>
                <el-form-item label="提交日期">
                    <el-date-picker type="datetime" v-model="applyrecords.scDate"></el-date-picker>
                </el-form-item>
                <el-form-item label="批次号">
                    <el-input v-model="applyrecords.batchId"></el-input>
                </el-form-item>
                <el-form-item label="申请理由">
                    <el-input v-model="applyrecords.appReason"></el-input>
                </el-form-item>
                <el-form-item label="审核状态">
                    <el-input v-model="applyrecords.state"></el-input>
                </el-form-item>
                <el-form-item label="拒绝理由">
                    <el-input type="textarea" v-model="applyrecords.refReason"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button type="success" @click="dialogVisible = false">关 闭</el-button>

  </span>
        </el-dialog>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'applicationRecordDialog',
  data () {
    return {
      dialogVisible: false,
      applyrecords: {}
    }
  },
  methods: {
    show (applyrecords) {
      this.dialogVisible = true
      this.applyrecords = applyrecords
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
