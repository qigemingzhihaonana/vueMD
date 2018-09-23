import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '系统配置',
      component: Layout,
      children: [
        {
          path: '',
          name: '菜单配置',
          component: () => import('@/views/admin/menu/index')
        }
      ]
    }
  ]
})
