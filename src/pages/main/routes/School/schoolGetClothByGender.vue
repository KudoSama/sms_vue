<template>
    <div>
        <h1 align="center">查询衣物（无输入则为查询全部衣物）</h1>
      <div style="width: 80%; text-align: center; margin: auto">
        <el-input style="width: 200px" v-model="input"  placeholder="请输入性别（男/女）"></el-input>
      <el-button type="primary" @click="clothList">查询</el-button>
        <el-table
            border
            stripe
            :data="clotlist"
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
            </el-table-column> <el-table-column
                    prop="gender"
                    label="性别"
            >
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
      </div>
    </div>
</template>

<script>
export default {
  name: 'schoolGetClothByGender',
  created () {
    this.clothList()
  },
  data () {
    return {
      clotlist: [],
      radio: '1',
      input: '',
      pageList: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      flag: ''
    }
  },
  methods: {

    clothList () {
      if (this.flag !== this.input) {
        this.flag = this.input
        this.pageList = {pageNo: 1, pageSize: 10, total: 0}
      }
      let data = {gender: this.input, pageList: this.pageList}
      this.$axios.post('/api/cloth/schoolGetClothByGender', data).then(res => {
        // console.info(res)
        this.clotlist = res.data.data.records
        this.pageList.total = res.data.data.total
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

<style scoped>

</style>
