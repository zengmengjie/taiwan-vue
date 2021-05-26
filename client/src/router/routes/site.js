export default [
  {
    path: '/id/:id?',
    name: 'default-goods',
    meta: {
      title: '商品',
      routeAuth: false
    },
    component: resolve => require(['@/views/goods'], resolve)
  }, {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
      routeAuth: false
    },
    component: resolve => require(['@/views/home'], resolve)
  }, {
    path: '/goods/:id?',
    name: 'goods',
    meta: {
      title: '商品详情',
      routeAuth: false
    },
    component: resolve => require(['@/views/goods'], resolve)
  }, {
    path: '/cart/:id?',
    name: 'cart',
    meta: {
      title: '购物车',
      routeAuth: false
    },
    component: resolve => require(['@/views/mobile/goods/cart'], resolve)
  }, {
    path: '/ladderOrder/:id?',
    name: 'template',
    meta: {
      title: '确认订单',
      routeAuth: false
    },
    component: resolve => require(['@/views/mobile/goods/cartTemplate'], resolve)
  }, {
    path: '/mobile/about/:type?',
    name: 'mobile-about',
    meta: {
      title: '关于我们',
      routeAuth: false
    },
    component: resolve => require(['@/views/mobile/home/about'], resolve)
  }, {
    path: '/about/:type?',
    name: 'about',
    meta: {
      title: '关于我们',
      routeAuth: false
    },
    component: resolve => require(['@/views/web/home/about'], resolve)
  }, {
    path: '/success',
    name: 'success',
    meta: {
      title: '訂單提交成功',
      routeAuth: false
    },
    component: resolve => require(['@/views/mobile/order/success'], resolve)
  }, {
    path: '/search',
    name: 'search',
    meta: {
      title: '订单查询',
      routeAuth: false
    },
    component: resolve => require(['@/views/web/home/search'], resolve)
  }
]
