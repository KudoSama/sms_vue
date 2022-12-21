<template>
    <div>
        <h1>添加贫困生</h1>
        <el-form ref="form" :model="form" label-width="100px">
            <el-col :span="10">
                <el-form-item label="学号" >
                    <el-input v-model="form.stuId"></el-input>
                </el-form-item>
            </el-col>

            <br><br><br><br><br><br><br>
            <el-form-item>
                <el-button type="primary" @click="addPoverty">立即添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'addPoverty',
  data () {
    return {
      form: {
        stuId: ''

      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    addPoverty () {
      let std = {
        stuId: this.form.stuId
      }

      this.$axios.post('api/enable/add', std).then(res => {
        console.info(res.data)
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message.success(res.data.data)
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
