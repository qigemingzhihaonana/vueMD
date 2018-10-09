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


const me =[
  {
      "children":[

      ],
      "display":1,
      "name":"首页",
      "icon":"home",
      "id":"1",
      "url":"dashboard"
  },
  {
      "children":[
          {
              "children":[

              ],
              "display":1,
              "name":"菜单",
              "icon":"menu",
              "id":"3",
              "url":"menuMessage"
          },
          {
              "children":[

              ],
              "display":1,
              "name":"角色管理",
              "icon":"role",
              "id":"4",
              "url":"groupMessage"
          },
          {
              "children":[

              ],
              "display":1,
              "name":"模块管理",
              "icon":"department",
              "id":"5",
              "url":"moduleMessage"
          },
          {
              "children":[

              ],
              "display":1,
              "name":"部门管理",
              "icon":"department",
              "id":"6",
              "url":"sectionMessage"
          },
          {
              "children":[

              ],
              "display":1,
              "name":"用户管理",
              "icon":"user",
              "id":"7",
              "url":"userMessage"
          }
      ],
      "display":1,
      "name":"系统设置",
      "icon":"set",
      "id":"2",
      "url":"sysmanager"
  }
]



export default {
  fetch: config => {
    // const navList = JSON.parse(config.body)
    console.log(userMap)
    return me
  },
  logout: () => 'success'
}
