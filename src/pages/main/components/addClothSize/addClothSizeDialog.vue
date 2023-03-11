<template>
  <div>
    <el-dialog title="添加尺码"
               append-to-body
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <el-form ref="clothRecord" :model="clothRecord" label-width="100px">
          <el-form-item label="衣物号" >
            <el-input v-model="clothRecord.clothId"
                      :disabled="true"></el-input>
          </el-form-item>
        <el-form-item>
            <el-switch
                v-model="value0"
                inactive-text="XS">
            </el-switch>
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
        <el-form-item>
          <el-button type="primary" @click="addClothSize">添 加</el-button>
          <el-button @click="close">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'addClothSizeDialog',
  data () {
    return {
      dialogVisible: false,
      clothRecord: {},
      form: {
        clothId: '',
        clothSize: ''
      },
      value0: false,
      value1: false,
      value2: false,
      value3: false,
      value4: false,
      value5: false
    }
  },
  methods: {
    addClothSize () {
      if (this.value0 === true) {
        let clothSize = {
          clothId: this.clothRecord.clothId,
          clothSize: 'XS'
        }
        this.$axios.post('/api/clothSize/add', clothSize).then(res => {
          if (res.data !== null && res.data.status === true) {
            Vue.prototype.$message.success(res.data.message)
          } else {
            Vue.prototype.$message.error(res.data.message)
          }
        })
      }
      if (this.value1 === true) {
        let clothSize = {
          clothId: this.clothRecord.clothId,
          clothSize: 'S'
        }
        this.$axios.post('/api/clothSize/add', clothSize).then(res => {
          if (res.data !== null && res.data.status === true) {
            Vue.prototype.$message.success(res.data.message)
          } else {
            Vue.prototype.$message.error(res.data.message)
          }
        })
      }
      if (this.value2 === true) {
        let clothSize = {
          clothId: this.clothRecord.clothId,
          clothSize: 'M'
        }
        this.$axios.post('/api/clothSize/add', clothSize).then(res => {
          if (res.data !== null && res.data.status === true) {
            Vue.prototype.$message.success(res.data.message)
          } else {
            Vue.prototype.$message.error(res.data.message)
          }
        })
      }
      if (this.value3 === true) {
        let clothSize = {
          clothId: this.clothRecord.clothId,
          clothSize: 'L'
        }
        this.$axios.post('/api/clothSize/add', clothSize).then(res => {
          if (res.data !== null && res.data.status === true) {
            Vue.prototype.$message.success(res.data.message)
          } else {
            Vue.prototype.$message.error(res.data.message)
          }
        })
      }
      if (this.value4 === true) {
        let clothSize = {
          clothId: this.clothRecord.clothId,
          clothSize: 'XL'
        }
        this.$axios.post('/api/clothSize/add', clothSize).then(res => {
          if (res.data !== null && res.data.status === true) {
            Vue.prototype.$message.success(res.data.message)
          } else {
            Vue.prototype.$message.error(res.data.message)
          }
        })
      }
      if (this.value5 === true) {
        let clothSize = {
          clothId: this.clothRecord.clothId,
          clothSize: 'XXL'
        }
        this.$axios.post('/api/clothSize/add', clothSize).then(res => {
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
      this.dialogVisible = false
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.value0 = this.value1 = this.value2 = this.value3 = this.value4 = this.value5 = false
          done()
        })
        .catch(_ => {
        })
    },
    close () {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.value0 = this.value1 = this.value2 = this.value3 = this.value4 = this.value5 = false
          this.dialogVisible = false
        })
        .catch(_ => {
        })
    },
    show (clothRecord) {
      this.dialogVisible = true
      this.clothRecord = clothRecord
    }
  }
}
</script>

<style scoped>

</style>
