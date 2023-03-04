<template>
    <div>
        <h1 align="center">当前批次衣物</h1>
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
                  <el-carousel-item v-for="item in clothimglist.get(scope.row.clothId)" :key='item'>
                    <el-image :src="item"
                              :preview-src-list="clothimglist.get(scope.row.clothId)"></el-image>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              width="auto">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="showDetail(scope.row)">添加尺码</el-button>
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
      <add-cloth-size-dialog ref="addClothSizeDialog"></add-cloth-size-dialog>
    </div>
</template>

<script>
import AddClothSizeDialog from '../../components/addClothSize/addClothSizeDialog'
export default {
  name: 'schoolGetClothByBatchId',
  components: {AddClothSizeDialog},
  created () {
    this.clothList()
  },
  data () {
    return {
      clothlist: [],
      radio: '1',
      input: '',
      pageList: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      clothsizelist: [],
      clothimglist: [],
      clothImg: ''
    }
  },
  methods: {
    clothList () {
      let val = {}
      this.$axios.post('/api/cloth/getClothByBatchId', this.pageList).then(res => {
        // console.info(res)
        this.clothlist = res.data.data.records
        this.clothimglist = new Map(Object.entries(res.data.otherData))
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
      this.$refs.addClothSizeDialog.show(clothRecord)
    }
  }
}

</script>

<style scoped>

</style>
