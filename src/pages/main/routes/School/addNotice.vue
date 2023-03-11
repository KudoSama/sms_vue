<template>
  <div>
    <h1 align="center">添加通知</h1>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="通知内容" >
        <el-col :span="10">
          <el-input type="textarea" v-model="form.notice"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="通知时间">
        <el-col :span="5">
          <el-date-picker type="datetime" placeholder="选择开始日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="0.1">—</el-col>
        <el-col :span="5">
          <el-date-picker type="datetime" placeholder="选择结束日期" v-model="form.endDate" style="width: 100%;"></el-date-picker>
        </el-col>
        <br><br>
        <el-form-item>
          <el-button type="primary" @click="addNotice">添 加</el-button>
          <el-button @click="clear">清 空</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'addNotice',
  data () {
    return {
      form: {
        startDate: '',
        endDate: ''
      }
    }
  },
  methods: {
    clear () {
      this.form = this.$options.data().form
    },
    addNotice () {
      let notice = {
        notice: this.form.notice,
        startDate: this.form.startDate,
        endDate: this.form.endDate
      }
      this.$axios.post('api/notice/add', notice).then(res => {
        // console.info(res.data)
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message({
            message: res.data.message,
            type: 'success',
            duration: 1500,
            onClose: () => {
              window.location.reload()
            }
          })
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
