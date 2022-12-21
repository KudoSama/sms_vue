<template>
    <div class="mainPageBody">
        <div>
            <h1 align="center">欢迎使用寒衣补助综合管理系统</h1>
        </div>
        <br><br><br><br>
        <template>
            <el-carousel trigger="click" :interval="3000" type="card" height="300px" >
                <el-carousel-item v-for="item in imgs" :key="item">
                    <el-image style="width: auto; height: auto"
                              :src="item"
                              :preview-src-list="imgs">
                    </el-image>
                </el-carousel-item>
            </el-carousel>
        </template>
    </div>
</template>
<script>
export default {
  name: 'mainPage',
  data () {
    return {
      imgs: [
        require('../../../../assets/images/pic1.jpg'),
        require('../../../../assets/images/pic2.jpg'),
        require('../../../../assets/images/pic3.jpg') // 尽可能上传横向图片，竖向图片显示效果不好
      ]
    }
  }
}
</script>

<style>

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
</style>
