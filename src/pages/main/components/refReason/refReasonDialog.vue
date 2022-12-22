<template>
    <div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="记录编号">
                    <el-input :disabled="true" v-model="applyrecords.id"></el-input>
                </el-form-item>
                <el-form-item label="拒绝理由">
                    <el-input type="textarea" v-model="applyrecords.refReason"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="danger" @click="srefuseSingle">拒 绝</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'refReasonDialog',
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
    srefuseSingle () {
      let val = [this.applyrecords]
      this.$axios.post('/api/stuApply/disagreeBatch', val).then(res => {
        // console.info(res)
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message.success(res.data.data)
        } else {
          Vue.prototype.$message.error(res.data.data)
        }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>

</style>
