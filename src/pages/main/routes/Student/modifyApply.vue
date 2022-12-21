<template>
    <div>
        <h1 align="center">修改申请</h1>
        <el-table
                :data="applistNot"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="记录编号"
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
                    fixed="right"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showDetail(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <stu-apply-not ref="stuApplyNot"></stu-apply-not>

    </div>
</template>

<script>
import stuApplyNot from '../../components/chageApplication/stuChangeAppdialog'
import moment from 'moment'
import Vue from 'vue'
export default {
  name: 'stApprove',
  components: {
    stuApplyNot
  },
  data: function () {
    return {
      Ppagelst: {
        pageNo: 1,
        pageSize: 10
      },
      applistNot: [],
      // 要通过的id集合
      ids: []
    }
  },
  created () {
    this.findNotExamineStuModify()
  },
  methods: {
    agreeByBatch () {
      this.$axios.post('/api/stuApply/studentModify', this.ids).then(res => {
        console.info(res)
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message.success(res.data.data)
        } else {
          Vue.prototype.$message.error(res.data.data)
        }
      })
    },
    agreeSingle (row) {
      let val = [row.id]
      this.$axios.post('/api/stuApply/agreeBatch', val).then(res => {
        console.info(res)
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message.success(res.data.data)
        } else {
          Vue.prototype.$message.error(res.data.data)
        }
      })
      console.log(val)
    },
    props: ['value'],
    dateFormat: function (row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      // 这里的格式根据需求修改
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },

    findNotExamineStuModify () {
      let pagelst = {
        pageNo: 1,
        pageSize: 10

      }
      this.$axios.post('/api/stuApply/studentSelect', pagelst).then(res => {
        if (res.data.data !== null) {
          this.applistNot = res.data.data.records
          Vue.prototype.$message.success(res.data.message)
        } else {
          Vue.prototype.$message.error(res.data.message)
        }
      })
    },
    showDetail (applyrecords) {
      console.info(applyrecords)
      this.$refs.stuApplyNot.show(applyrecords)
    },
    refuseSingle (row) {
      let val = [row]
      this.$axios.post('/api/stuApply/disagreeBatch', val).then(res => {
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message.success(res.data.data)
        } else {
          Vue.prototype.$message.error(res.data.data)
        }
      })
    }

  }
}
</script>

<style scoped>

</style>
