/*
 * 通用路由配置，需要放在配置项数组的末端
 */
import NotFound from '@/views/common/404'
export default [
  {
    path: '/404',
    meta: {
      title: '页面未找到'
    },
    component: NotFound
  }
]
