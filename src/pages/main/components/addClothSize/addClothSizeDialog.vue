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
                inactive-text="XS"
                @change="modifySize('XS')">
            </el-switch><br>
            <el-switch
                v-model="value1"
                inactive-text="S"
                @change="modifySize('S')">
            </el-switch><br>
            <el-switch
                v-model="value2"
                inactive-text="M"
                @change="modifySize('M')">
            </el-switch><br>
            <el-switch
                v-model="value3"
                inactive-text="L"
                @change="modifySize('L')">
            </el-switch><br>
            <el-switch
                v-model="value4"
                inactive-text="XL"
                @change="modifySize('XL')">
            </el-switch><br>
            <el-switch
                v-model="value5"
                inactive-text="XXL"
                @change="modifySize('XXL')">
            </el-switch>
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
      value5: false,
      clothSizeList: ''
    }
  },
  methods: {
    modifySize (size) {
      if (size === 'XS') {
        if (this.value0) {
          let clothSize = {
            clothId: this.clothRecord.clothId,
            clothSize: size
          }
          this.$axios.post('/api/clothSize/add', clothSize).then(res => {
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.message)
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        } else {
          let clothSize = {
            clothId: this.clothRecord.clothId,
            clothSize: size
          }
          this.$axios.post('/api/clothSize/delete', clothSize).then(res => {
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.message)
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        }
      } else if (size === 'S') {
        if (this.value1) {
          let clothSize = {
            clothId: this.clothRecord.clothId,
            clothSize: size
          }
          this.$axios.post('/api/clothSize/add', clothSize).then(res => {
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.message)
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        } else {
          let clothSize = {
            clothId: this.clothRecord.clothId,
            clothSize: size
          }
          this.$axios.post('/api/clothSize/delete', clothSize).then(res => {
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.message)
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        }
      } else if (size === 'M') {
        if (this.value2) {
          let clothSize = {
            clothId: this.clothRecord.clothId,
            clothSize: size
          }
          this.$axios.post('/api/clothSize/add', clothSize).then(res => {
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.message)
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        } else {
          let clothSize = {
            clothId: this.clothRecord.clothId,
            clothSize: size
          }
          this.$axios.post('/api/clothSize/delete', clothSize).then(res => {
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.message)
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        }
      } else if (size === 'L') {
        if (this.value3) {
          let clothSize = {
            clothId: this.clothRecord.clothId,
            clothSize: size
          }
          this.$axios.post('/api/clothSize/add', clothSize).then(res => {
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.message)
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        } else {
          let clothSize = {
            clothId: this.clothRecord.clothId,
            clothSize: size
          }
          this.$axios.post('/api/clothSize/delete', clothSize).then(res => {
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.message)
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        }
      } else if (size === 'XL') {
        if (this.value4) {
          let clothSize = {
            clothId: this.clothRecord.clothId,
            clothSize: size
          }
          this.$axios.post('/api/clothSize/add', clothSize).then(res => {
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.message)
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        } else {
          let clothSize = {
            clothId: this.clothRecord.clothId,
            clothSize: size
          }
          this.$axios.post('/api/clothSize/delete', clothSize).then(res => {
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.message)
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        }
      } else if (size === 'XXL') {
        if (this.value5) {
          let clothSize = {
            clothId: this.clothRecord.clothId,
            clothSize: size
          }
          this.$axios.post('/api/clothSize/add', clothSize).then(res => {
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.message)
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        } else {
          let clothSize = {
            clothId: this.clothRecord.clothId,
            clothSize: size
          }
          this.$axios.post('/api/clothSize/delete', clothSize).then(res => {
            if (res.data !== null && res.data.status === true) {
              Vue.prototype.$message.success(res.data.message)
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        }
      }
    },
    getClothSizeList (clothId) {
      let val = {params: {clothId: clothId}}
      this.$axios.get('api/clothSize/getClothSizeByClothId', val).then(res => {
        this.clothSizeList = res.data.data
        for (let size of this.clothSizeList) {
          // console.log(size)
          switch (size.clothSize) {
            case 'XS':
              this.value0 = true
              break
            case 'S':
              this.value1 = true
              break
            case 'M':
              this.value2 = true
              break
            case 'L':
              this.value3 = true
              break
            case 'XL':
              this.value4 = true
              break
            case 'XXL':
              this.value5 = true
              break
          }
        }
      })
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
      this.getClothSizeList(this.clothRecord.clothId)
    }
  }
}
</script>

<style scoped>

</style>
