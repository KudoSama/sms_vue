<template>
    <div>
        <h1 align="center">当前批次衣物</h1>
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
</template>

<script>
export default {
  name: 'schoolGetClothByBatchId',
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
      }
    }
  },
  methods: {

    clothList () {
      this.$axios.post('/api/cloth/getClothByBatchId', this.pageList).then(res => {
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
