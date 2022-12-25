<template>
    <div>
        <h1 align="center">上传衣物图片</h1>
        <div>
          <h3>请输入要插入图片的衣物id：</h3>
          <el-input v-model="clothId"
                    style="width: 200px"
                    placeholder="请输入衣物id">
          </el-input>
          <br><br>
          <el-upload
            class="avatar-uploader"
            action="url"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="beforeAvatarUpload">
            <el-button  type="primary" class="el-icon-plus avatar-uploader-icon">在此上传图片</el-button>
          </el-upload>
          <br>
          <div v-if="imageViewUrl" style="color: red">上传图片结束请点击提交以上传</div><br>
          <el-button type="primary" @click="uploadimg"> 提交 </el-button>
          <br><br>
          <h3 v-if="imageViewUrl">预览</h3>
          <el-image v-if="imageViewUrl"
                    :src="imageViewUrl"
                    class="avatar"
                    style="width: 30%; height: 30%">
          </el-image>
        </div>

    </div>
</template>
<script>
import Vue from 'vue'

export default {
  name: 'addimg',
  data () {
    return {
      imageViewUrl: '',
      clothId: '',
      url: '',
      files: ''
    }
  },
  methods: {
    uploadimg () {
      let clothIdForDatat = new FormData()
      clothIdForDatat.append('clothId', this.clothId)
      this.$axios.post('/api/cloth/getClothByClothId', clothIdForDatat).then(res => {
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
              let climg = {
                clothId: this.clothId,
                clothImg: imageUrl
              }
              this.$axios.post('/api/clothImg/upload', climg).then(res => {
                if (res.status === 200) {
                  Vue.prototype.$message.success(res.data.message)
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
    // 获取选中图片的预览路径，并赋值给本地img路径，在前端展示
    imgSaveToUrl (file) {
      this.imageViewUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.raw.type === 'image/jpg'
      const isJPEG = file.raw.type === 'image/jpeg'
      const isPNG = file.raw.type === 'image/png'
      const jsGIF = file.raw.type === 'image/gif'
      const isLt5M = file.raw.size / 1024 / 1024 < 5
      // console.log(file.raw.type)
      if (!isJPEG && !isJPG && !isPNG && !jsGIF) {
        this.$message.error('上传图片只能是 jpg/png/jpeg/gif 格式!')
        return
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
        return
      }
      // 格式无误后，预览文件处理
      this.imgSaveToUrl(file)
      // 复刻文件信息
      this.files = file.raw
    }
  }

}

</script>

<style scoped>

</style>
