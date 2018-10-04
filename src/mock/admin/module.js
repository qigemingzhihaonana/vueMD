import Mock from 'mockjs'

const treeData = [
  {
    label: '模块1',
    id: 0
  },
  {
    label: '模块2',
    id: 1
  },
  {
    label: '模块3',
    id: 2
  },
  {
    label: '模块4',
    id: 3
  },
  {
    label: '模块5',
    id: 4
  },
  {
    label: '模块6',
    id: 5
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

for (let i = 0; i < 10; i++) {
  message.push(Mock.mock({
    'code': '@id',
    'name': '@ctitle(4)',
    'menu': '@csentence(5)',
    'area': ':::[po',
    'role': '管理'
  }))
}

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
