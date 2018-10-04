const userMap =
[
  {
    'name': '首页',
    'svg': 'home',
    'url': '/home',
    'childs': null
  },
  {
    'name': '系统设置',
    'svg': 'set',
    'url': '/system',
    'childs': [
      {
        'name': '菜单管理',
        'svg': 'menu',
        'url': '/system/menu',
        'childs': null
      },
      {
        'name': '人员管理',
        'svg': 'user',
        'url': '/system/user',
        'childs': null
      },
      {
        'name': '角色管理',
        'svg': 'role',
        'url': '/system/role',
        'childs': null
      },
      {
        'name': '部门管理',
        'svg': 'department',
        'url': '/system/department',
        'childs': null
      },
      {
        'name': '模块管理',
        'svg': 'department',
        'url': '/system/module',
        'childs': null
      }
    ]
  }

]

export default {
  fetch: config => {
    // const navList = JSON.parse(config.body)
    console.log(userMap)
    return userMap
  },
  logout: () => 'success'
}
