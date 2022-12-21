<template>
    <div>
        <h1>申请学生信息填写</h1>
        <el-form ref="form" :model="form" label-width="100px">
            <el-col :span="10">
                <el-form-item label="批次号" >
                    <el-input v-model="form.batchId"></el-input>
                </el-form-item>
                <el-form-item label="衣物id">
                    <el-input v-model="form.clothId"></el-input>
                </el-form-item>
                <el-form-item label="衣物尺码">
                    <el-input v-model="form.clothSize"></el-input>
                </el-form-item>
                <el-form-item label="申请理由">
                    <el-input v-model="form.appReason"></el-input>
                </el-form-item>
            </el-col>
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br>
            <el-form-item>
                <el-button type="primary" @click="appCloth">立即申请</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'book',
  data () {
    return {
      form: {
        batchId: '',
        clothId: '',
        clothSize: '',
        appReason: ''
        // type: [],

      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    appCloth () {
      let std = {
        batchId: this.form.batchId,
        clothId: this.form.clothId,
        clothSize: this.form.clothSize,
        appReason: this.form.appReason
      }

      this.$axios.post('/api/stuApply/apply', std).then(res => {
        console.info(res.data)
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
