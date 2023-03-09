<template>
  <el-drawer
      title="通 知"
      :visible.sync="table"
      direction="rtl"
      size="50%">
    <el-table :data="gridData" border>
      <el-table-column property="date" label="日期" :formatter="dateFormat" width="150"></el-table-column>
      <el-table-column property="notice" label="通知"></el-table-column>
    </el-table>
  </el-drawer>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'

export default {
  name: 'noticeList',
  data () {
    return {
      table: false,
      gridData: []
    }
  },
  methods: {
    props: ['value'],
    dateFormat: function (row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      // 这里的格式根据需求修改
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    show () {
      this.gridData = []
      this.$axios.post('/api/notice/getCurNotice').then(res => {
        // console.log(res.data.data)
        if (res.data.data !== null) {
          for (let index in res.data.data) {
            let notice = res.data.data[index]
            let temp = {date: '', notice: ''}
            temp.date = notice.startDate
            temp.notice = notice.notice
            this.gridData.push(temp)
          }
        }
        if (this.gridData.length === 0) {
          Vue.prototype.$message.error('暂未通知')
        } else {
          this.table = true
        }
      })
    },
    showFromMain () {
      this.gridData = []
      this.$axios.post('/api/notice/getCurNotice').then(res => {
        // console.log(res.data.data)
        if (res.data.data !== null) {
          for (let index in res.data.data) {
            let notice = res.data.data[index]
            let temp = {date: '', notice: ''}
            temp.date = notice.startDate
            temp.notice = notice.notice
            this.gridData.push(temp)
          }
        }
        if (this.gridData.length !== 0) {
          this.table = true
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
