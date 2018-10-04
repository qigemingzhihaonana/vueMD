import axios from '@/utils/fetch'

/**
 * 获取到模块的角色和菜单
 * @param {*} query
 */
export function fetchRoleModule (data) {
  return axios({
    url: '/',
    method: 'post',
    data
  })
}

/**
 * 删除角色与菜单的关联
 * @param {*} data
 */
export function delRoleModule (data) {
  return axios({
    url: '/',
    method: 'post',
    data
  })
}

/**
 * 添加模块与菜单的关联
 * @param {*} data
 */
export function addRoleModule (data) {
  return axios({
    url: '/',
    method: 'post',
    data
  })
}

/**
 * 添加模块与用户的关联
 * @param {*} data
 */
export function addUserModule (data) {
  return axios({
    url: '/',
    method: 'post',
    data
  })
}

/**
 * 删除模块与用户的关联
 * @param {*} data
 */
export function delUserModule (data) {
  return axios({
    url: '/',
    method: 'post',
    data
  })
}

/**
 * 添加新的模块
 * @param {*} data
 */
export function addModule (data) {
  return axios({
    url: '/',
    method: 'post',
    data
  })
}
