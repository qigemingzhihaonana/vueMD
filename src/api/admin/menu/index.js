import axios from '@/utils/fetch'

/**
 * 查询菜单
 * @param {*} query
 */
export function fetchMenu () {
  return axios({
    url: '/selectAllMenu',
    method: 'get'
  })
}

/**
 * 添加菜单
 * @param {*} data
 */
export function addMenu (data) {
  console.log(data)
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
    url: '/deleteMenu2/' + data,
    method: 'get'
  })
}

/**
 * 更新菜单
 * @param {*} data
 */
export function updateMenu (data) {
  return axios({
    url: '/updateMenu',
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
    url: '/selectMenuDetail/' + data,
    method: 'post'
  })
}
