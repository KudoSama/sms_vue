import Vue from 'vue'
import Router from 'vue-router'
import permission from './permission'
import store from '../store/'
import { clearHttpRequestingList } from '@http/httpRequestList'
import routes from './routes'

Vue.$httpRequestList = []
Vue.use(Router)

// 获取原型对象上的push函数
const originalPush = Router.prototype.push
// 修改原型对象中的push方法
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

let router = new Router({
  routes // 本目录中的routes.js
})
router.beforeEach((to, from, next) => {
  let allowBack = true //    给个默认值true
  if (to.meta.allowBack !== undefined) {
    allowBack = to.meta.allowBack
  }
  if (!allowBack) {
    history.pushState(null, null, location.href)
  }
  store.dispatch('updateAppSetting', {
    allowBack: allowBack
  })

  if (to.meta.keepAlive) { // 是否有缓存？
    store.commit('routecache/keepAlive', to.name)
  }
  clearHttpRequestingList()
  const whiteList = store.getters['permission/getWhiteList'] // 白名单
  if (whiteList.indexOf(to.name) > -1 || whiteList.indexOf(to.path) > -1) { // 目的地是否在白名单里？
    next()
  } else if (!store.getters['user/getUserId']) { // 从缓存里拿userID
    console.info(store.getters['user/getUserId'])
    store.dispatch('user/fetchUserInfo').then(res => {
      if (res.status) {
        // 权限校验
        permission(store, routes, to, next)
      } else {
        switch (res.code) {
          case -500:
            next({ name: 'badGateway' })
            break
          case 70005:
            next({ name: 'login' })
            break
        }
      }
    })
  } else {
    // 权限校验
    permission(store, routes, to, next)
  }
})
router.afterEach(() => {
})
export default router
