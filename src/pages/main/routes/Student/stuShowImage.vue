<template>
    <div>
        <h1>当前可申请的衣物</h1>
        <el-table
                :data="clotlist"
                style="width: 100%"
                border
                ref="multipleTable"
                tooltip-effect="dark">

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

                    prop="clothImg"
                    label="图片"
            >
                <template slot-scope="scope">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-carousel trigger="click" :interval="3000" type="card" height="150px">
                            <el-carousel-item v-for="item in clothimglist.get(scope.row.clothId)" :key='item'>
                                <el-image :src="item"
                                          style="width: auto; height: auto"
                                          :preview-src-list="clothimglist.get(scope.row.clothId)"></el-image>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
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
        <cloth-edit ref="cloEdit"></cloth-edit>

    </div>
</template>

<script>
import clothEdit from '../../components/cloth/clothEditDialog'
import Vue from 'vue'
export default {
  name: 'stuShowImage',
  components: {
    clothEdit
  },
  data: function () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      clotlist: [],
      clotsizelist: [],
      clothimglist: [],
      input1: '',
      radio: '1',
      clothImg: '',
      clothId: '',
      gender: '',
      sclothname: '',
      pageList: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created () {
    this.clothList()
  },
  methods: {
    showDetail (cloth) {
      this.$refs.cloEdit.show(cloth)
    },
    recordDeleteEvent (id) {
      console.info(id)
    },
    onSubmit () {
      console.log('submit!')
    },
    clothList () {
      this.$axios.post('/api/cloth/getClothByGender', this.pageList).then(res => {
        // Vue.prototype.$message.success(res.data.message)
        console.log(res)
        this.pageList.total = res.data.data.total
        this.clotlist = res.data.data.records
        this.clothimglist = new Map(Object.entries(res.data.otherData))
      })
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

<style  scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }
    .el-carousel__item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .carousel-image {
            max-width: 100%;
            max-height: 100%;
        }
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
