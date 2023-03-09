<template>
    <div>
        <h1 align="center">添加申请批次</h1>
        <el-form ref="form" :model="form" label-width="100px">
            <el-col :span="10">
                <el-form-item label="批次号" >
                    <el-input v-model="form.batchId"></el-input>
                </el-form-item>
            </el-col>
            <br><br><br><br><br>
            <el-form-item label="批次时间">
                <el-col :span="5">
                    <el-date-picker type="date" placeholder="选择开始日期" v-model="form.batchDatestart" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="0.1">—</el-col>
                <el-col :span="5">
                    <el-date-picker placeholder="选择结束日期" v-model="form.batchDateend" style="width: 100%;"></el-date-picker>
                </el-col>
                <br><br>
                <el-form-item>
                    <el-button type="primary" @click="addBatch">添 加</el-button>
                    <el-button @click="clear">清 空</el-button>
                </el-form-item>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'addBatch',
  data () {
    return {
      form: {
        batchId: '',
        batchDatestart: '',
        batchDateend: ''
      }
    }
  },
  methods: {
    clear () {
      this.form = this.$options.data().form
    },
    addBatch () {
      let std = {
        batchId: this.form.batchId,
        batchDatestart: this.form.batchDatestart,
        batchDateend: this.form.batchDateend
      }
      this.$axios.post('api/batch/add', std).then(res => {
        // console.info(res.data)
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message.success(res.data.message)
        } else {
          Vue.prototype.$message.error(res.data.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
