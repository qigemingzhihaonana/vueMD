import axios from '@/utils/fetch'

/**
 * 查询所有角色信息
 * @param {query} query
 */
export function getRoleTable (query) {
  return axios({
    url: '/selectRoleConfigure1',
    method: 'get',
    params: query
  })
}

/**
 * 添加角色
 * @param {id,name,despriction,createTime,upDateTime,createOper,updateOper} data
 */
export function addRole (data) {
  return axios({
    url: '/insertRole',
    method: 'post',
    data
  })
}

/**
 * 删除角色
 * @param {id} data
 */
export function delRole (data) {
  return axios({
    url: '/deleteRole/' + data,
    method: 'get'
  })
}
/**
 * 查询角色详细信息(包括与其相关的用户信息，部门信息)
 * @param {id} data
 */
export function fetchAllRoleMesage (data) {
  return axios({
    url: '/selectRoleConfigure2',
    method: 'post',
    data
  })
}

/**
 * 修改角色信息
 * @param {id} data
 */
export function updateRole (data) {
  return axios({
    url: '/updateRole',
    method: 'post',
    data
  })
}

/**
 * 查询所有在职但是没有关联的用户
 * @param {id} data
 */
export function fetchUser (id) {
  return axios({
    url: '/selectAllUser/' + id,
    method: 'post'
  })
}

/**
 * 删除角色中的用户
 * @param {id,sysUser} data
 */
export function removeRoleUser (id, data) {
  return axios({
    url: '/delectRoleUser/' + id,
    method: 'post',
    data
  })
}

/**
 * 获取角色对应的用户
 * @param {*} query
 */
export function getRoleUser (id) {
  return axios({
    url: '/selectUserRole',
    method: 'post',
    id
  })
}

/**
 * 角色新增用户
 * @param {*} query
 */
export function addRoleUser (id, data) {
  return axios({
    url: '/insertRoleUser2/' + id,
    method: 'post',
    data
  })
}
