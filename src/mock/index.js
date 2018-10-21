import Mock from 'mockjs'
import loginAPI from './login'
// // import roleAPI from './admin/role'
// import departmentAPI from './admin/department'
// import moduleApi from './admin/module'
// // import userApi from './admin/user'

// // // 登录相关
Mock.mock(/\/selectUserMenuList/, 'post', loginAPI.fetch)

// // // 角色相关
// // Mock.mock(/\/selectRoleConfigure1/, 'get', roleAPI.getRoleTable)
// // Mock.mock(/\/addRole/, 'post', roleAPI.addRole)
// // Mock.mock(/\/delRole/, 'post', roleAPI.delRole)
// // Mock.mock(/\/uptRole/, 'post', roleAPI.uptRole)
// // Mock.mock(/\/selectUserRole/, 'post', roleAPI.getRoleUser)
// // Mock.mock(/\/updateUserRole/, 'post', roleAPI.addRoleUser)
// // Mock.mock(/\/removeRoleUser/, 'post', roleAPI.removeRoleUser)

// // // 部门相关
// Mock.mock(/\/selectDepartmentAllId/, 'get', departmentAPI.getTree)
// // Mock.mock(/\/getMessage/, 'post', departmentAPI.fetchDepartment)
// // Mock.mock(/\/getmeMessage/, 'post', departmentAPI.getMessage)
// // Mock.mock(/\/upDepartment/, 'post', departmentAPI.delD)

// // // 模块相关
// Mock.mock(/\/selectModule/, 'get', moduleApi.getModule)
// // Mock.mock(/\/fetchData/, 'post', moduleApi.getData)
// // Mock.mock(/\/getMenu/, 'post', moduleApi.getMenu)

// // // 用户相关
// // Mock.mock(/\/selectAllUser/, 'get', userApi.fetchUser)
// // Mock.mock(/\/addUser/, 'post', userApi.adduser)

// // export default Mock
