<template>

  <div>
    <el-dialog
        title="学生申请"
        :visible.sync="dialogVisible"
        width="30%">
      <el-form ref="form" :model="applyRecord" label-width="80px">
        <el-form-item label="批次号">
          <el-input v-model="applyRecord.batchId" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="衣物id">
          <el-input v-model="applyRecord.clothId" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="衣物尺码">
          <el-select v-model="applyRecord.clothSize" placeholder="请选择">
            <el-option
                v-for="item in clothSizeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请理由">
          <el-input v-model="appReason"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="appCloth">立即申请</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </el-form-item>
      <span slot="footer" class="dialog-footer"></span>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'stuApply',
  data () {
    return {
      dialogVisible: false,
      applyRecord: {
        batchId: '',
        clothId: '',
        clothSize: ''
      },
      value: '',
      clothSizeList: [],
      appReason: ''
    }
  },
  methods: {
    appCloth () {
      let std = {
        batchId: this.applyRecord.batchId,
        clothId: this.applyRecord.clothId,
        clothSize: this.applyRecord.clothSize,
        appReason: this.appReason
      }
      this.$axios.post('/api/stuApply/apply', std).then(res => {
        // console.info(res.data)
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message.success(res.data.message)
          this.dialogVisible = false
          this.applyRecord = {}
          this.appReason = ''
        } else {
          Vue.prototype.$message.error(res.data.message)
        }
      })
    },
    show (clothRecord) {
      this.clothSizeList = []
      this.dialogVisible = true
      for (let i = 0; i < clothRecord.clothSize.length; i++) {
        let val = {value: clothRecord.clothSize[i], label: clothRecord.clothSize[i]}
        this.clothSizeList.push(val)
      }
      // console.log(this.clothSizeList)
      clothRecord.clothSize = ''
      clothRecord.appReason = ''
      this.applyRecord = clothRecord
      // console.log(clothRecord)
    },
    closeDialog () {
      this.dialogVisible = false
      this.applyRecord = {}
      this.appReason = ''
    }
  }
}
</script>

<style scoped>

</style>
