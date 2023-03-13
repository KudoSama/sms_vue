<template>
    <div>
        <h1 align="center">当前批次衣物</h1>
      <div style="width: 80%; text-align: center; margin: auto">
        <el-table
            border
            stripe
            :data="clothlist"
            style="width: 100%">
            <el-table-column
                    prop="clothId"
                    label="服装id"
            >
            </el-table-column>
            <el-table-column
                    prop="clothName"
                    label="服装名"
            >
            </el-table-column>
          <el-table-column
                    prop="gender"
                    label="性别"
            >
            </el-table-column>
          <el-table-column
              prop="clothSize"
              label="可选尺寸">
            <template slot-scope="scope">
              <div v-for="clothSize in clothsizelist[scope.row.clothId]" :key="clothSize">
                {{clothSize}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="clothImg"
              label="展示（点击可放大）">
            <template slot-scope="scope">
              <div class="block">
                <span class="demonstration"></span>
                <el-carousel indicator-position="outside" trigger="click" :interval="3000"  height="100px">
                  <el-carousel-item v-for="item in clothImgList.get(scope.row.clothId)" :key='item'>
                    <el-image :src="item"
                              :preview-src-list="clothImgList.get(scope.row.clothId)"></el-image>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              width="300px">
            <template slot-scope="scope">
              <el-button type="success" size="medium" @click="showDetail(scope.row)">修改尺码</el-button>
              <el-button type="primary" size="medium" @click="showImageEdit(scope.row.clothId, clothImgList.get(scope.row.clothId))">修改图片</el-button><br>
              <el-button type="warning" size="medium" @click="showDetailEdit(scope.row)">修改信息</el-button>
              <el-button type="danger" size="medium" @click="deleteCloth(scope.row.clothId)">删除衣物</el-button>
            </template>
          </el-table-column>
        </el-table>
      <el-pagination
          background
          @size-change="pageSizeChange"
          @current-change="pageNoChange"
          :current-page="pageList.pageNo"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageList.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageList.total">
      </el-pagination>
      </div>
      <add-cloth-size-dialog ref="addClothSizeDialog"></add-cloth-size-dialog>
      <cloth-edit-dialog ref="clothEditDialog"></cloth-edit-dialog>
      <modify-image-dialog ref="modifyImageDialog"></modify-image-dialog>
    </div>
</template>

<script>
import AddClothSizeDialog from '../../components/addClothSize/addClothSizeDialog'
import clothEditDialog from '../../components/cloth/clothEditDialog'
import Vue from 'vue'
import ModifyImageDialog from '../../components/ClothImage/modifyImageDialog'
export default {
  name: 'schoolGetClothByBatchId',
  components: {ModifyImageDialog, clothEditDialog, AddClothSizeDialog},
  created () {
    this.clothList()
  },
  data () {
    return {
      clothlist: [],
      pageList: {pageNo: 1, pageSize: 10, total: 0},
      clothsizelist: [],
      clothImgList: [],
      clothImg: ''
    }
  },
  methods: {
    clothList () {
      let val = {}
      this.$axios.post('/api/cloth/getClothByBatchId', this.pageList).then(res => {
        // console.info(res)
        this.clothlist = res.data.data.records
        this.clothImgList = new Map(Object.entries(res.data.otherData))
        for (let i = 0; i < this.clothlist.length; i++) {
          val[this.clothlist[i].clothId] = this.clothSizeList(this.clothlist[i].clothId)
        }
        this.clothsizelist = val
        this.pageList.total = res.data.data.total
      })
    },
    clothSizeList (clothId) {
      let list = []
      let data = {params: {clothId: clothId}}
      this.$axios.get('/api/clothSize/getClothSizeByClothId', data).then(res => {
      // Vue.prototype.$message.success(res.data.message)
        let data = res.data.data
        for (let i = 0; i < data.length; i++) {
          let clothSize = data[i]
          list.push(clothSize.clothSize)
        }
      })
      return list
    },
    pageSizeChange (val) {
      this.pageList.pageSize = val
      this.clothList()
    },
    pageNoChange (val) {
      this.pageList.pageNo = val
      this.clothList()
    },
    showDetail (clothRecord) {
      clothRecord = JSON.parse(JSON.stringify(clothRecord))
      this.$refs.addClothSizeDialog.show(clothRecord)
    },
    showDetailEdit (clothRecord) {
      this.$refs.clothEditDialog.show(clothRecord)
    },
    showImageEdit (clothId, clothImgList) {
      this.$refs.modifyImageDialog.show(clothId, clothImgList)
    },
    deleteCloth (clothId) {
      this.$confirm('该操作将删除衣物以及学生申请该衣服记录。是否删除该衣物？', '提示', {type: 'warning'})
        .then(_ => {
          this.$confirm('再次确认是否删除该衣物？', '提示', {type: 'warning'})
            .then(_ => {
              let val = {
                clothId: clothId
              }
              this.$axios.post('/api/cloth/delete', val).then(res => {
                // console.info(res)
                if (res.data.status === true) {
                  this.dialogVisible = false
                  Vue.prototype.$message.success(res.data.message)
                } else {
                  Vue.prototype.$message.error(res.data.message)
                }
              })
            })
            .catch(_ => {
            })
        })
        .catch(_ => {
        })
    }
  }
}

</script>

<style scoped>

</style>
