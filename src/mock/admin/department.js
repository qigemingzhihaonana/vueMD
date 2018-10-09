import Mock from 'mockjs'

const department = []
const tree = [
  {
    'display': '1',
    'name': '主任部门',
    'id': '1'
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
