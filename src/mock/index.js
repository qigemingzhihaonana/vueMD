import Mock from 'mockjs'
import loginAPI from './login'
import roleAPI from './admin/role'
import departmentAPI from './admin/department'

// 登录相关
Mock.mock(/\/login/, 'post', loginAPI.fetch)

// 角色相关
Mock.mock(/\/selectRoleConfigure1/, 'get', roleAPI.getRoleTable)
Mock.mock(/\/addRole/, 'post', roleAPI.addRole)
Mock.mock(/\/delRole/, 'post', roleAPI.delRole)
Mock.mock(/\/uptRole/, 'post', roleAPI.uptRole)

// 部门相关
Mock.mock(/\/getDepartment/, 'get', departmentAPI.getD)
Mock.mock(/\/addDepartment/, 'post', departmentAPI.addD)
Mock.mock(/\/delDepartment/, 'post', departmentAPI.delD)
Mock.mock(/\/upDepartment/, 'post', departmentAPI.delD)
export default Mock
