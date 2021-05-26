import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import Filters from './filters'
import store from './store/index'
import VueFacebookPixel from 'vue-analytics-facebook-pixel'
import i18n from './locales'
import Vant, {
  Lazyload
} from 'vant'

import _ from './libs/lodash'
import '@/utils/init'

import Toast from './libs/toast' // 定制吐司
import Http from './libs/http' //请求工具
import Api from './libs/api'
import './icons' // 引入图标文件

import {
  Button,
  Select,
  Input,
  Option,
  Icon,
  Card,
  Row,
  Form,
  FormItem,
  Col,
  Dialog,
  Message,
  Badge,
  Rate
} from 'element-ui'

Vue.use(require('vue-wechat-title'))
Vue.use(VueFacebookPixel)
Vue.use(Toast)
Vue.use(Http)
Vue.use(VueI18n)
Vue.use(Vant)
Vue.use(Lazyload, {
  lazyComponent: true
})

Vue.use(Input)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Card)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Badge)
Vue.use(Rate)



Vue.prototype.$_ = _
Vue.prototype.$message = Message


window.Api = Api
Vue.config.productionTip = false

for (let key in Filters) {
  Vue.filter(key, Filters[key])
}

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
