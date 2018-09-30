import axios from '@/utils/fetch'

/**
 * 查询菜单
 * @param {*} query
 */
export function fetchMenu (query) {
  return axios({
    url: '/',
    method: 'get',
    params: query
  })
}

/**
 * 添加菜单
 * @param {*} data
 */
export function addMenu (data) {
  return axios({
    url: '/insertMenu',
    method: 'post',
    data
  })
}

/**
 * 删除菜单
 * @param {*} data
 */
export function delMenu (data) {
  return axios({
    url: '/delectMenu',
    method: 'post',
    data
  })
}

/**
 * 更新菜单
 * @param {*} data
 */
export function updateMenu (data) {
  return axios({
    url: '/ss',
    method: 'post',
    data
  })
}

/**
 * 得到菜单详细信息
 * @param {*} data
 */
export function getMenuMessage (data) {
  return axios({
    url: '/selectAllMenu',
    method: 'post',
    data
  })
}
