<template>
    <div>
        <h1 align="center">可申请衣物列表</h1>
      <div style="width: 80%; text-align: center; margin: auto">
        <el-table
                :data="clothlist"
                style="width: 100%"
                border>
            <el-table-column
                    prop="clothId"
                    label="服装id">
            </el-table-column>
            <el-table-column
                    prop="clothName"
                    label="服装名">
            </el-table-column>
            <el-table-column
                prop="gender"
                label="性别">
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
              label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="showDetail(scope.row)">申请该衣物</el-button>
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
      <stu-apply ref="StuApply"></stu-apply>
    </div>
</template>

<script>
import StuApply from '../../components/application/stuApply'
import Vue from 'vue'

export default {
  name: 'stugetCloth',
  components: {StuApply},
  created () {
    this.clothList()
  },
  data () {
    return {
      pageList: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      clothlist: [],
      clothsizelist: [],
      clothimglist: [],
      clothImg: ''
    }
  },
  methods: {
    clothList () {
      let val = {}
      this.$axios.post('/api/cloth/getClothByGender', this.pageList).then(res => {
        // console.log(res.data)
        // console.info(res)
        // Vue.prototype.$message.success(res.data.message)
        if (res.data.status === false) {
          Vue.prototype.$message.error(res.data.message)
        } else {
          this.clothlist = res.data.data.records
          this.clothimglist = new Map(Object.entries(res.data.otherData))
          for (let i = 0; i < this.clothlist.length; i++) {
            val[this.clothlist[i].clothId] = this.clothSizeList(this.clothlist[i].clothId)
          }
          this.clothsizelist = val
          this.pageList.total = res.data.data.total
        }
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
    showDetail (clothRecord) {
      if (this.clothsizelist[clothRecord.clothId].length === 0) {
        clothRecord['clothSize'] = []
      } else {
        clothRecord['clothSize'] = this.clothsizelist[clothRecord.clothId]
      }
      // console.log(clothRecord)
      this.$refs.StuApply.show(clothRecord)
    },
    pageSizeChange (val) {
      this.pageList.pageSize = val
      this.clothList()
    },
    pageNoChange (val) {
      this.pageList.pageNo = val
      this.clothList()
    }
  }
}

</script>

<style scoped>

</style>
