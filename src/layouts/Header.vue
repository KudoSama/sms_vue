<template>
  <div class="header">
    <div class="header-left">
      <span class="header-title text-center">当前批次为：{{curBatch}} </span>
    </div>
      <div class="header-right">
        <el-badge :value=noticeNum class="item">
          <el-button icon="el-icon-message-solid" type="primary" size="medium" @click="notice">查看通知</el-button>
        </el-badge>
        <span class="header-title text-center">欢迎您，{{userName}}</span>
      <a
        href="javascript:"
        class="header-logout"
        @click="logout"
        role="button"
      >
        <s-tooltip effect="dark" content="退出" placement="bottom">
          <s-icon
            icon="wmj-quit"
          />
        </s-tooltip>
      </a>
    </div>
    <notice-list ref="noticeList"></notice-list>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import {Tooltip} from 'element-ui'
import {mapGetters} from 'vuex'
import NoticeList from '../pages/main/components/notice/noticeList'

export default {
  name: 's-header',
  data: function () {
    return {
      curBatch: null,
      noticeNum: 0
    }
  },
  components: {
    NoticeList,
    's-icon': Icon,
    's-tooltip': Tooltip
  },
  computed: {
    ...mapGetters({
      userType: 'user/getUserType',
      userName: 'user/getUserName',
      getRoleName: 'role/getRoleName',
      getSidebarTheme: 'sidebar/getSidebarTheme'
    }),
    roleName () {
      // console.info(this.getRoleName(this.userType))
      return this.getRoleName(this.userType)
    },
    sidebarBackgroundColor () {
      return this.getSidebarTheme(this.theme).background
    },
    sidebarTextColor () {
      return this.getSidebarTheme(this.theme).text
    },
    sidebarActiveTextColor () {
      return this.getSidebarTheme(this.theme).activeText
    }
  },
  created () {
    this.getCurBatch()
    this.$forceUpdate()
    this.getNoticeNunber()
    // console.info(this.userName)
  },
  methods: {
    getNoticeNunber () {
      this.$axios.post('/api/notice/getCurNotice').then(res => {
        // console.log(res.data.data)
        if (res.data.data !== null) {
          for (let index in res.data.data) {
            this.noticeNum = Number(index) + 1
          }
        } else {
          this.noticeNum = 0
        }
      })
    },
    logout () {
      this.$confirm('即将退出登录, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        // this.$store
        this.$axios.post('/api/user/refresh')
        this.$router.push('/login').then(() => {
          window.location.reload()
        })
      }).catch(() => {
      })
    },
    getCurBatch () {
      this.$axios.post('/api/batch/getCurBatch').then(res => {
        // console.info(res.data)
        if (res.data !== null && res.data.status === true) {
          this.curBatch = String(res.data.data.batchId) + '批次'
        } else {
          this.curBatch = res.data.message
        }
      })
    },
    notice () {
      this.$refs.noticeList.show()
    }
  }
}

</script>

<style lang="less" scoped>
  @import "../assets/styles/var";
  .item {
    margin-top: 9px;
    margin-right: 20px;
  }
  .header {
    width: 100%;
    height: 60px;
    padding: 0 23px;
    line-height: 59px;
    box-sizing: border-box;
    background: #ffffff;
    border-bottom: 1px solid @borderBottomColor;
    overflow: hidden;
    > span {
      vertical-align: middle;
    }
  }
  .header-left {
    display: inline-block;
  }
  .header-right {
    font-size: 14px;
    float: right;
    display: inline-block;
  }
.header-title {
  font-size: 14px;
  margin-left: 10px;
}
  .header-icon {
    font-size: 22px;
    color: inherit;
    outline: none;
    display: inline-block;
    text-decoration: none;
    vertical-align: top;
    &:hover {
      color: @dch;
    }
  }
  .header-logout {
    .header-icon;
    .text-center;
    font-size: 14px;
    margin-left: 10px;
    line-height: normal;
    &:hover {
      color: red;
    }
  }
  .text-center{
    vertical-align: middle;
  }
</style>
