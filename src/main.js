// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuebar from 'vuebar'
import ElementUI from 'element-ui'
import 'element-ui/lib/index'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'
import 'nprogress/nprogress.css'
import '@/assets/styles/index.less'
import '@/assets/styles/element-ui.less'
import App from './App'
import '@/assets/iconfont-default'
import router from './router/'
import store from './store/'
import MD5 from 'js-md5'

Vue.prototype.$md5 = MD5
let Base64 = require('js-base64').Base64;

Vue.use(Vuebar)
Vue.use(ElementUI)
Vue.config.productionTip = false
var axios = require('axios')
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
