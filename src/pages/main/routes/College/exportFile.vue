<template>
    <div>
        <h1>导出文件</h1>
        <el-button type="success" @click="getCheckState">导出审核状态</el-button>
        <el-button type="success" @click="getresult">导出申请结果</el-button>
    </div>
</template>

<script>
export default {
  name: 'exportFile',
  methods: {
    getCheckState () {
      this.$axios.post('/api/stuApply/exportState', { responseType: 'blob' }, {
        // 定义类型
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'blob'
      }
      ).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'exportState.xls')
        document.body.appendChild(link)
        link.click()
      })
    },
    getresult () {
      this.$axios.post('/api/stuApply/exportResult', { responseType: 'blob' }, {
        // 定义类型
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'blob'
      }
      ).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'exportResult.xls')
        document.body.appendChild(link)
        link.click()
      })
    }
  }
}
</script>

<style scoped>

</style>
