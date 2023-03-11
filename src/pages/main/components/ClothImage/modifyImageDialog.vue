<template>
  <div>
    <el-dialog
        append-to-body
        title="上传/删除衣服图片"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-table border :data="clothImgList">
          <el-table-column prop="url" label="图片">
            <template slot-scope="scope">
              <el-image :src="scope.row.url"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button icon="el-icon-delete" type="danger" @click="handleRemove(scope.row.url)">删除该图片</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="beforeAvatarUpload">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
        <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'modifyImageDialog',
  data () {
    return {
      dialogImageUrl: '',
      disabled: false,
      dialogVisible: false,
      clothId: '',
      clothImgList: [],
      files: '',
      imageViewUrl: ''
    }
  },
  methods: {
    show (clothId, clothImgList) {
      this.clothImgList = []
      this.clothId = clothId
      for (let url of clothImgList) {
        this.clothImgList.push({url: url})
      }
      this.dialogVisible = true
    },
    beforeAvatarUpload (file) {
      const isJPG = file.raw.type === 'image/jpg'
      const isJPEG = file.raw.type === 'image/jpeg'
      const isPNG = file.raw.type === 'image/png'
      const jsGIF = file.raw.type === 'image/gif'
      const isLt20M = file.raw.size / 1024 / 1024 < 20
      // console.log(file.raw.type)
      if (!isJPEG && !isJPG && !isPNG && !jsGIF) {
        this.$message.error('上传图片只能是 jpg/png/jpeg/gif 格式!')
        return
      }
      if (!isLt20M) {
        this.$message.error('上传图片大小不能超过 20MB!')
        return
      }
      // 复刻文件信息
      this.files = file.raw
      this.uploadImg()
    },
    uploadImg () {
      let clothIdForData = new FormData()
      clothIdForData.append('clothId', this.clothId)
      this.$axios.post('/api/cloth/getClothByClothId', clothIdForData).then(res => {
        if (res.data.status) {
          // 上传文件
          let formData = new FormData()
          let imageUrl
          if (this.files.length === 0) {
            Vue.prototype.$message.error('请上传图片')
            return
          }
          formData.append('file', this.files)
          this.$axios.post('/api/file/upload', formData).then(res => {
            if (res.status === 200) {
              imageUrl = res.data.url
              // 写入记录
              let clImg = {
                clothId: this.clothId,
                clothImg: imageUrl
              }
              this.$axios.post('/api/clothImg/upload', clImg).then(res => {
                if (res.status === 200) {
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
            } else {
              Vue.prototype.$message.error(res.data.message)
            }
          })
        } else {
          Vue.prototype.$message.error(res.data.message)
        }
      })
    },
    handleRemove (file) {
      this.$confirm('是否删除本张图片？', '提示', {type: 'warning'})
        .then(_ => {
          let clothImg = {clothId: this.clothId, clothImg: file}
          this.$axios.post('/api/clothImg/delete', clothImg).then(res => {
            if (res.status === 200) {
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
        })
        .catch(_ => {
        })
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
