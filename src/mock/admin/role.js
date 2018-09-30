import Mock from 'mockjs'

const role = []
const count = 20

for (let i = 0; i < count; i++) {
  role.push(Mock.mock({
    id: '@id',
    name: '@ctitle(4)',
    desc: '@csentence(5)',
    createTime: '@now()',
    createOper: '@cname',
    updateTime: '@now()',
    updateOper: '@cname'
  }))
}

export default {
  getRoleTable: () => role,
  addRole: () => {
    return { 'code': '200' }
  },
  delRole: () => { }
}
