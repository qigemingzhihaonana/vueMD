import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/redirect',
      component: Layout,
      children: [
        {
          path: '/redirect/:path*',
          component: () => import('@/views/redirect/index')
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: () => import('@/views/login/login')
    },
    {
      path: '/',
      component: Layout,
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: '首页',
          component: () => import('@/views/dashboard/index')
        }
      ]
    },
    {
      path: '/system',
      component: Layout,
      redirect: '/system/department',
      children: [
        {
          path: '/system/department',
          name: '部门管理',
          component: () => import('@/views/admin/department/index'),
          meta: {title: 'deparement'}
        }
      ]
    },
    {
      path: '/system',
      component: Layout,
      redirect: '/system/user',
      children: [
        {
          path: '/system/user',
          name: '用户管理',
          component: () => import('@/views/admin/user/index')
        }
      ]
    },
    {
      path: '/system',
      component: Layout,
      redirect: '/system/role',
      children: [
        {
          path: '/system/role',
          name: '角色管理',
          component: () => import('@/views/admin/role/index')
        }
      ]
    },
    {
      path: '/system',
      component: Layout,
      redirect: '',
      children: [
        {
          path: '/system/menu',
          name: '菜单管理',
          component: () => import('@/views/admin/menu/index')
        }
      ]
    },
    {
      path: '/system',
      component: Layout,
      redirect: '',
      children: [
        {
          path: '/system/module',
          name: '模块配置',
          component: () => import('@/views/admin/module/index')
        }
      ]
    }
  ]
})
