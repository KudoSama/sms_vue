<template>
    <div>
        <h1 align="center">添加衣物</h1>
        <el-form ref="form" :model="form" label-width="100px">
            <el-col :span="10">
                <el-form-item label="衣物id" >
                    <el-input v-model="form.clothId"></el-input>
                </el-form-item>
                <el-form-item label="衣物名">
                    <el-input v-model="form.clothName"></el-input>
                </el-form-item>

                <el-form-item label="批次号">
                    <el-input v-model="form.batchId"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="form.gender" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <br><br><br><br><br><br><br><br><br><br><br><br>
            <el-form-item>
                <el-button type="primary" @click="addClothByid">立即添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import Vue from 'vue'
export default {
  name: 'addclothByid',
  data () {
    return {
      form: {
        clothId: '',
        clothName: '',
        gender: '',
        batchId: ''

      }
    }
  },
  methods: {
    addClothByid () {
      let clth = {
        clothId: this.form.clothId,
        clothName: this.form.clothName,
        gender: this.form.gender,
        batchId: this.form.batchId

      }

      this.$axios.post('api/cloth/add', clth).then(res => {
        // console.info(clth)
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
