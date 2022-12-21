<template>
    <div>
        <h1 align="center">查询衣物</h1>
        <h2>选择查询方式</h2>
        <el-radio v-model="radio" @input="change()" label="1" border size="medium">根据批次号查询</el-radio>
        <el-radio v-model="radio" @input="change()" label="2" border size="medium">根据用户性别查询</el-radio>
        <el-input style="width: 310px" v-model="input1" placeholder="请输入（如果选择性别查询则无需输入）"></el-input>
        <el-button type="primary" size="large" icon="el-icon-search"  @click="clothList">查询</el-button>
      <br>
      <br>
        <el-table
                :data="clotlist"
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
                    prop="batchId"
                    label="批次号">
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

      <br>
      <br>
        <h2>查询衣物尺码</h2>
      <el-form>
        <h3>请输入要查询的衣物id：</h3>
        <el-input style="width: 150px" v-model="input2" placeholder="请输入衣物id"></el-input>
        <el-button type="primary" size="large" icon="el-icon-search"  @click="clothSizeList">查询</el-button>
      </el-form>
        <el-table
                :data="clotsizelist"
                border
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="序号">
            </el-table-column>
            <el-table-column
                    prop="clothId"
                    label="服装id">
            </el-table-column>
            <el-table-column
                prop="clothSize"
                label="可选尺寸">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'stugetCloth',
  data () {
    return {
      pageList: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      clotlist: [],
      clotsizelist: [],
      sclothname: '',
      radio: '1',
      input1: '',
      input2: ''
    }
  },
  methods: {
    clothList () {
      if (this.radio === '1') {
        let data = {batchId: this.input1, pageList: this.pageList}
        this.$axios.post('/api/cloth/getClothByBatchId', data).then(res => {
          // console.info(res)
          // Vue.prototype.$message.success(res.data.message)
          this.clotlist = res.data.data.records
          this.pageList.total = res.data.data.total
        })
      }
      if (this.radio === '2') {
        let data = {pageList: this.pageList}
        this.$axios.post('/api/cloth/getClothByGender', data).then(res => {
          // console.info(res)
          // Vue.prototype.$message.success(res.data.message)
          this.clotlist = res.data.data.records
          this.pageList.total = res.data.data.total
        })
      }
    },
    clothSizeList () {
      let data = {params: {clothId: this.input2}}
      this.$axios.get('/api/clothSize/getClothSizeByClothId', data).then(res => {
        Vue.prototype.$message.success(res.data.message)
        this.clotsizelist = res.data.data
      })
    },
    pageSizeChange (val) {
      this.pageList.pageSize = val
      this.clothList()
    },
    pageNoChange (val) {
      this.pageList.pageNo = val
      this.clothList()
    },
    change () {
      this.input1 = ''
      this.pageList = {pageNo: 1, pageSize: 10, total: 0}
    }
  }
}

</script>

<style scoped>

</style>
