<template>
    <div>
        <h1 align="center">添加衣物尺码</h1>
        <el-form ref="form" :model="form" label-width="100px">
            <el-col :span="10">
                <el-form-item label="衣物id" >
                    <el-input v-model="form.clothId"></el-input>
                <h3>
                    可选尺码
                </h3>
                <el-switch
                        v-model="value1"
                        inactive-text="S">
                </el-switch>
                <el-switch
                        v-model="value2"
                        inactive-text="M">
                </el-switch>
                <el-switch
                        v-model="value3"
                        inactive-text="L">
                </el-switch>
                <el-switch
                        v-model="value4"
                        inactive-text="XL">
                </el-switch>
              <el-switch
                  v-model="value5"
                  inactive-text="XXL ">
              </el-switch>
                </el-form-item>
            </el-col>
            <br><br><br><br><br><br><br><br><br><br>
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
        clothSize: ''
      },
      value1: false,
      value2: false,
      value3: false,
      value4: false,
      value5: false
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    addClothByid () {
      if (this.value1 === true) {
        let clthsize = {
          clothId: this.form.clothId,
          clothSize: 'S'
        }
        this.$axios.post('/api/clothSize/add', clthsize).then(res => {
          // console.info(clthsize)
          // console.info(res.data)
          if (res.data !== null && res.data.status === true) {
            Vue.prototype.$message.success(res.data.message)
          } else {
            Vue.prototype.$message.error(res.data.message)
          }
        })
      }
      if (this.value2 === true) {
        let clthsize = {
          clothId: this.form.clothId,
          clothSize: 'M'
        }
        this.$axios.post('/api/clothSize/add', clthsize).then(res => {
          // console.info(clthsize)
          // console.info(res.data)
          if (res.data !== null && res.data.status === true) {
            Vue.prototype.$message.success(res.data.message)
          } else {
            Vue.prototype.$message.error(res.data.message)
          }
        })
      }
      if (this.value3 === true) {
        let clthsize = {
          clothId: this.form.clothId,
          clothSize: 'L'
        }
        this.$axios.post('/api/clothSize/add', clthsize).then(res => {
          // console.info(clthsize)
          // console.info(res.data)
          if (res.data !== null && res.data.status === true) {
            Vue.prototype.$message.success(res.data.message)
          } else {
            Vue.prototype.$message.error(res.data.message)
          }
        })
      }
      if (this.value4 === true) {
        let clthsize = {
          clothId: this.form.clothId,
          clothSize: 'XL'
        }
        this.$axios.post('/api/clothSize/add', clthsize).then(res => {
          // console.info(clthsize)
          // console.info(res.data)
          if (res.data !== null && res.data.status === true) {
            Vue.prototype.$message.success(res.data.message)
          } else {
            Vue.prototype.$message.error(res.data.message)
          }
        })
      }
      if (this.value5 === true) {
        let clthsize = {
          clothId: this.form.clothId,
          clothSize: 'XXL'
        }
        this.$axios.post('/api/clothSize/add', clthsize).then(res => {
          // console.info(clthsize)
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
}
</script>

<style scoped>

</style>
