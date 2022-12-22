<template>
  <div class="header">
    <div class="header-left">
      <span class="header-title text-center">当前批次为：{{curBatch}} </span>
    </div>
      <div class="header-right">
        <span class="header-title text-center">欢迎您，{{userName}}</span>
      <a
        href="javascript:"
        class="header-logout"
        @click="logout"
        role="button"
      >
        <s-tooltip effect="dark" content="退出" placement="bottom">
          <s-icon
            icon="suncaper-quit"
          />
        </s-tooltip>
      </a>
  </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import {Tooltip} from 'element-ui'
import {mapGetters} from 'vuex'

export default {
  name: 's-header',
  data: function () {
    return {
      curBatch: null
    }
  },
  components: {
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
      console.info(this.getRoleName(this.userType))
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
    // console.info(this.userName)
  },
  methods: {
    logout () {
      this.$confirm('即将退出登录, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.post('/api/user/refresh')
        this.$router.push('/login')
        this.$router.replace({path: '/login'})
        location.reload()
      }).catch(() => {
      })
    },
    getCurBatch () {
      this.$axios.post('/api/batch/getCurBatch').then(res => {
        // console.info(res.data)
        if (res.data !== null && res.data.status === true) {
          // Vue.prototype.$message.success(res.data.batchId)
          // Vue.prototype.$message.success('当前批次：' + String(res.data.data.batchId))
          this.curBatch = String(res.data.data.batchId) + '批次'
        } else {
          this.curBatch = res.data.message
          // Vue.prototype.$message.error(res.data.message)
        }
      })
    }

  }
}

</script>

<style lang="less" scoped>
  @import "../assets/styles/var";
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
