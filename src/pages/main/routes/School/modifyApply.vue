<template>
    <div>
        <h1 align="center">修改学生申请</h1>
        <el-table
                :data="applistNot"
                border
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="批次编号"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="stuId"
                    label="学号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="batchId"
                    label="批次"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="clothId"
                    label="衣物id"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="clothSize"
                    label="衣物尺码"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="appReason"
                    label="申请理由"
                    width="120">
            </el-table-column>
          <el-table-column
              prop="state"
              label="审核状态"
              width="120">
          </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showDetail(scope.row)">修改</el-button>
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
        <sch-change-a-p-p-dialog ref="schChangeAPPDialog"></sch-change-a-p-p-dialog>

    </div>
</template>

<script>
import schChangeAPPDialog from '../../components/chageApplication/schChangeAPPDialog'
import Vue from 'vue'
export default {
  name: 'stApprove',
  components: {
    schChangeAPPDialog
  },
  created () {
    this.findNotExamineStuModify()
  },
  data: function () {
    return {
      pageList: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      applistNot: [],
      // 要通过的id集合
      ids: []
    }
  },
  methods: {
    findNotExamineStuModify () {
      this.$axios.post('/api/stuApply/selectAllStuApply', this.pageList).then(res => {
        // console.log(res)
        if (res.data.data !== null) {
          this.applistNot = res.data.data.records
          this.pageList.total = res.data.data.total
        } else {
          Vue.prototype.$message.error(res.data.message)
        }
      })
    },
    pageSizeChange (val) {
      this.pageList.pageSize = val
      this.findNotExamineStuModify()
    },
    pageNoChange (val) {
      this.pageList.pageNo = val
      this.findNotExamineStuModify()
    },
    showDetail (applyrecords) {
      // console.info(applyrecords)
      this.$refs.schChangeAPPDialog.show(applyrecords, this.findNotExamineStuModify)
    }
  }
}
</script>

<style scoped>

</style>
