<template>
    <div>
        <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form ref="form" :model="cloth" label-width="80px">
                <el-form-item label="服装id">
                    <el-input v-model="cloth.clothId" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="服装名称">
                    <el-input v-model="cloth.clothName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="modifyCloth">确 定</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script>
import Vue from 'vue'

export default {
  name: 'clothEditdialog',
  data () {
    return {
      dialogVisible: false,
      cloth: {}
    }
  },
  methods: {
    show (cloth) {
      this.dialogVisible = true
      this.cloth = cloth
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    modifyCloth () {
      this.$confirm('是否修改该衣服信息？', '提示', {type: 'warning'})
        .then(_ => {
          this.$axios.post('/api/cloth/modify', this.cloth).then(res => {
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
    }
  }
}
</script>

<style scoped>

</style>
