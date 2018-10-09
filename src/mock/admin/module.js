import Mock from 'mockjs'

const treeData = [
  {
    'id': 1,
    'module_code': 'USR_XT',
    'module_name': '系统管理业务',
    'default_query_scope': '1',
    'default_auth_type': 0,
    'create_time': '2018-09-23T05:33:46.000+0000',
    'update_time': null,
    'create_oper': null,
    'update_oper': null
  }
]

const menu = {
  fromData: [
    {
      'id': '1',
      'label': '494',
      'children': [
        {
          'id': '1-1',
          'label': '4565'
        },
        {
          'id': '1-2',
          'label': '4987'
        }
      ]
    },
    {
      'id': '2',
      'label': '494',
      'children': []
    }
  ],
  toData: [
    {
      'id': '1',
      'label': '4gfg4',
      'children': []
    }
  ]
}

const message = []
message.push(Mock.mock({
  'code': '@id',
  'name': '@ctitle(4)',
  'menu': '@csentence(5)',
  'area': ':::[po',
  'role': '管理'
}))

export default {
  getModule: function () {
    return treeData
  },
  getData: function () {
    return message
  },
  getMenu: function () {
    console.log(menu)
    return menu
  }
}
