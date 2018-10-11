import axios from '@/utils/fetch'

/**
 * 获取到模块
 * @param {*} query
 */
export function fetchRoleModule () {
  return axios({
    url: '/selectModule',
    method: 'get'
  })
}

/**
 * 删除角色与模块的关联
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
 * 添加模块与角色的关联
 * @param {*} data
 */
export function addRoleModule (id, data) {
  return axios({
    url: '/insertModuleRole/' + id,
    method: 'post',
    data
  })
}

/**
 * 获取模块对应的角色
 * @param {*} data
 */
export function ModuleRole (data) {
  return axios({
    url: '/fetchModuleRole',
    method: 'post',
    data
  })
}

/**
 * 添加模块与菜单的关联
 * @param {*} data
 */
export function addMenuModule (data) {
  return axios({
    url: '/addMenuModule',
    method: 'post',
    data
  })
}

/**
 * 删除模块与菜单的关联
 * @param {*} data
 */
export function delMenuModule (data) {
  return axios({
    url: '/delMenuModule',
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
    url: '/insertModule',
    method: 'post',
    data
  })
}

/**
 * 获取模块详细信息
 * @param {*} data
 */
export function fetchModule (id) {
  return axios({
    url: '/selectModuleInformation/' + id,
    method: 'get'

  })
}

/**
 * 获取模块关联的菜单
 * @param {*} data
 */
export function getMenu (data) {
  return axios({
    url: '/getMenu',
    method: 'post',
    data
  })
}
/**
 * 删除模块
 * @param {*} data
 */
export function delModule (id) {
  return axios({
    url: '/deleteModule/' + id,
    method: 'get'
  })
}
