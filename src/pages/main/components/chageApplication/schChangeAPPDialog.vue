<template>
    <div>

        <el-dialog
                append-to-body
                title="修改申请"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="批次号">
                    <el-input v-model="applyrecords.id" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="衣物id">
                    <el-input v-model="applyrecords.clothId"></el-input>
                </el-form-item>
                <el-form-item label="衣物尺码">
                    <el-input v-model="applyrecords.clothSize"></el-input>
                </el-form-item>
              <el-form-item label="审核状态">
                <el-input v-model="applyrecords.state"
                          v-on:mouseover.native="showMsg(item, index)"
                          v-on:mouseleave.native="clearMsg(item)"></el-input>
              </el-form-item>
              <div class="item-msg" v-if="nowIndex === index">{{ item.msg }}</div>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="agreeSingle">提交</el-button>
    <el-button @click="dialogVisible = false">取消</el-button>
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
      applyrecords: {},
      nowIndex: -1,
      item: {msg: '1为学校审核通过 || 2为学院审核通过 || 3为辅导员审核通过 || 4为未审核 || 0为审核不通过'},
      fun: ''
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
  },
  methods: {
    agreeSingle () {
      this.$confirm('是否修改该申请记录？', '提示', {type: 'warning'})
        .then(_ => {
          let val = {
            id: this.applyrecords.id,
            batchId: this.applyrecords.batchId,
            clothId: this.applyrecords.clothId,
            clothSize: this.applyrecords.clothSize,
            state: this.applyrecords.state
          }
          this.$axios.post('/api/stuApply/schoolModify', val).then(res => {
            // console.info(res)
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.message)
              this.dialogVisible = false
              this.fun()
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        })
        .catch(_ => {})
    },
    show (applyrecords, fun) {
      // console.info(applyrecords)
      this.dialogVisible = true
      this.applyrecords = applyrecords
      this.fun = fun
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
      // console.log(row, column)
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      // 这里的格式根据需求修改
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },

    // 鼠标悬浮
    showMsg (item, index) {
      if (item.msg && item.msg !== '') {
        this.nowIndex = index
      }
    },
    // 鼠标离开
    clearMsg (item) {
      if (item.msg) {
        this.nowIndex = -1
      }
    }
  }
}
</script>

<style scoped>

</style>
