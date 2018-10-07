import Mock from 'mockjs'

const department = []
const tree = [
  {
    'id': '4654',
    'label': '湖北信通通信',
    'children': [
      {
        'id': '1',
        'label': 'jsjd',
        'children': []
      },
      {
        'id': '456',
        'label': 'dgfg',
        'children': []
      },
      {
        'id': '7465',
        'label': 'tjsdysyts',
        'children': []
      }
    ]
  }
]

const messagemm = []

messagemm.push(Mock.mock({
  'cName': '@cname',
  'zName': '@name',
  'area': 'HB',
  'ocName': '@ctitle(4)',
  'oaName': '@title',
  'sort': '24',
  // 'upLeader': [
  //   {
  //     'id': '@id',
  //     'label': '@ctitle',
  //     'children': [
  //       {
  //         'id': '@id',
  //         'label': '@ctitle',
  //         'children': []
  //       },
  //       {
  //         'id': '@id',
  //         'label': '@ctitle',
  //         'children': []
  //       },
  //       {
  //         'id': '@id',
  //         'label': '@ctitle',
  //         'children': []
  //       }
  //     ]
  //   }
  // ],
  'positionZ': '@cname',
  'positionF': '@cname',
  'show': '0',
  'state': '0',
  'isshow': '0',
  'level': '0',
  'province': 'grger',
  'department': 'gregr',
  'departmentNumber': '@id',
  'transceiver': 'fds',
  'together': '0'
}))

department.push(Mock.mock({
  'name': '@title(4)',
  'id': '@id',
  'province': '@id',
  'pz': '@cname',
  'pf': '@cname',
  'desc': '@ctitle',
  'state': 'fht'
}))

export default {
  fetchDepartment: function () {
    console.log(department)
    return department
  },
  getTree: function () {
    console.log(tree)
    return tree
  },
  getMessage: () => messagemm
}
