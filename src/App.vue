<template>
  <div id="app">
    <keep-alive :include="keepAliveComponents">
      <router-view />
    </keep-alive>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      keepAliveComponents: state => state.routecache.keepAliveComponents
    })
  },
  mounted: function () {
    window.onpopstate = () => {
      if (!this.allowBack) { //    这个allowBack 是存在vuex里面的变量
        history.go(1)
      }
    }
  }

}
</script>
