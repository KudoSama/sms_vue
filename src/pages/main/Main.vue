<template>
  <div>
    <layout
            theme="dark"
            :logo="logo"
            :sidebar-list="sidebarList"
            :logout="logout"
    />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Layout from '@/layouts/Layout'
import logo from '@/assets/images/cloth.png'
export default {
  name: 'Main',
  data () {
    return {
      logo: {
        src: logo,
        alt: '',
        firstDes: '下北泽工业大学',
        secondDes: '寒衣补助管理系统'
      }
    }
  },
  computed: {
    ...mapGetters({
      userType: 'user/getUserType',
      getSidebarList: 'sidebar/getSidebarList'
    }),
    sidebarList () {
      // 权限表
      return this.getSidebarList(this.userType).main
    }
  },
  methods: {
    logout () {
    }
  },
  components: {
    'layout': Layout
  }
}
</script>
