<template>
  <div id="app">
    <keep-alive :include="keepAliveComponents">
      <router-view />
    </keep-alive>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'

export default {
  name: 'App',
  created () {
    window.addEventListener(
      'mousewheel',
      function (event) {
        if (event.ctrlKey === true || event.metaKey) {
          event.preventDefault()
        }
      },
      { passive: false }
    )
    // firefox
    window.addEventListener(
      'DOMMouseScroll',
      function (event) {
        if (event.ctrlKey === true || event.metaKey) {
          event.preventDefault()
        }
      },
      { passive: false }
    )
  },
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
    Vue.config.productionTip = false
  },
  methods: {
  }
}
</script>
