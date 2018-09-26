const userMap = {
  admin: {
    token: 'admin',
    name: 'Super Admin',
    navList: [
      {
        name: '首页',
        path: '/123'
      },
      {
        name: '系统设置',
        path: '/321',
        child: [
          {
            name: '菜单管理',
            path: '/menuMessage'
          },
          {
            name: '角色管理',
            path: '/groupMessage'
          },
          {
            name: '模块管理',
            path: '/moduleMessage'
          },
          {
            name: '部门管理',
            path: '/sectionMessage'
          },
          {
            name: '用户管理',
            path: '/userMessage'
          }
        ]
      }
    ]
  }
}

export default {
  fetch: config => {
    const { name } = JSON.parse(config.body)
    return userMap[name]
  },
  logout: () => 'success'
}
