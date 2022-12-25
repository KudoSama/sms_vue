<template>
    <div>
        <h1>导出文件</h1>
        <el-button type="success" @click="getCheckState">导出审核状态</el-button>
        <el-button type="success" @click="getresult">导出申请结果</el-button>
    </div>
</template>

<script>
import {exportCheckState, exportResult} from '@api/api'

export default {
  name: 'exportFile',
  methods: {
    getCheckState () {
      exportCheckState().then(res => {
        let blob = new Blob([res])
        let url = window.URL.createObjectURL(blob)
        let elink = document.createElement('a')
        elink.download = '审核状态.xls'
        elink.style.display = 'none'
        elink.href = url
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)
      })
    },
    getresult () {
      exportResult().then(res => {
        let blob = new Blob([res])
        let url = window.URL.createObjectURL(blob)
        let elink = document.createElement('a')
        elink.download = '统计结果.xls'
        elink.style.display = 'none'
        elink.href = url
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)
      })
    }
  }
}
</script>

<style scoped>

</style>
