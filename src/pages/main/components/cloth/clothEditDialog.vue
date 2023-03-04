<template>
    <div>
        <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="服装id">
                    <el-input v-model="cloth.clothId"></el-input>
                </el-form-item>
                <el-form-item label="服装名称">
                    <el-input v-model="cloth.clothName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script>
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
    }
  }
}
</script>

<style scoped>

</style>
