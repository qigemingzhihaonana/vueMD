import Mock from 'mockjs'

const role = []
const count = 20
const user = []
const userRole = []

for (let i = 0; i < count; i++) {
  role.push(Mock.mock({
    'id': '@id',
    'name': '@ctitle(4)',
    'desc': '@csentence(5)',
    'createTime': '@now()',
    'createOper': '@cname',
    'updateTime': '@now()',
    'updateOper': '@cname'
  }))
}

for (let i = 0; i < count; i++) {
  user.push(Mock.mock({
    'id': '@id',
    'name': '@ctitle(4)',
    'department': '@title(3)',
    'area': '@title(3)'
  }))
}

for (let i = 0; i < 10; i++) {
  userRole.push(Mock.mock({
    'code': '@id',
    'name': '@ctitle(4)',
    'position': '@title(3)'
  }))
}

const data = []

data.push(user, userRole)

export default {
  getRoleTable: () => role,
  addRole: () => {
    return { 'code': '200' }
  },
  getRoleUser: () => data,
  addRoleUser: () => {
    return {'code': '200'}
  },
  removeRoleUser: () => {
    return {'code': '200'}
  },
  delRole: () => { }
}
