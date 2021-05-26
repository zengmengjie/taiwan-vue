/*
 * 路由跳转权限控制
 */
import Vue from 'vue'
import store from '../store'
import common from '../libs/common'

export default {

  // Check page permissions
  checkPageAuth({
    meta,
    path,
    params
  }, from, next) {
    if (!store.state.common.site) {
      Vue.prototype.request('Site').then((res) => {
        if (res.code === 200) {
          store.commit('SITE', res.data)
          if (params && params.hasOwnProperty('id')) {
            next({
              path: path,
              params: params
            })
          } else {
              next({
                name: 'home'
              })
          }
        } else {
          store.commit('SITE', {
            content: '非法站点访问'
          })
        }
      })
    } else {
      next()
    }
  }
}
