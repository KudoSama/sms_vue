<template>
  <div>
    <h1 align="center">修改通知</h1>
    <el-table
        :data="noticeList"
        border
        style="width: 100%">
      <el-table-column
          prop="id"
          label="通知id"
          width="auto">
      </el-table-column>
      <el-table-column
          prop="notice"
          label="通知"
          width="auto">
      </el-table-column>
      <el-table-column
          prop="startDate"
          label="开始时间"
          width="auto"
          :formatter="dateFormat">
      </el-table-column>
      <el-table-column
          prop="endDate"
          label="结束时间"
          width="auto"
          :formatter="dateFormat">
      </el-table-column>
      <el-table-column
          label="操作"
          width="auto">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showDetail(scope.row)">修 改</el-button>
          <el-button type="danger" size="mini" @click="deleteNotice(scope.row)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <modify-notice-dialog ref="modifyNoticeDialog"></modify-notice-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import ModifyNoticeDialog from '../../components/notice/modifyNoticeDialog'

export default {
  name: 'modifyNotice',
  components: {ModifyNoticeDialog},
  data () {
    return {
      form: {
        id: '',
        startDate: '',
        endDate: ''
      },
      noticeList: []
    }
  },
  created () {
    this.getNoticeList()
  },
  methods: {
    getNoticeList () {
      this.$axios.post('/api/notice/getNoticeList').then(res => {
        if (res.data.data !== null) {
          this.noticeList = res.data.data
          // console.log(this.noticeList)
          // Vue.prototype.$message.success(res.data.message)
        } else {
          Vue.prototype.$message.error(res.data.message)
        }
      })
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
    showDetail (noticeRecord) {
      // console.info(noticeRecord)
      this.$refs.modifyNoticeDialog.show(noticeRecord)
    },
    deleteNotice (noticeRecord) {
      this.$confirm('是否删除该通知？', '提示', {type: 'warning'})
        .then(_ => {
          let val = {
            id: noticeRecord.id
          }
          this.$axios.post('/api/notice/delete', val).then(res => {
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
    }
  }
}
</script>

<style scoped>

</style>
