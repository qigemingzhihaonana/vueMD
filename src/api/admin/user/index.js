import axios from '@/utils/fetch'

/**
 * 添加用户
 * @param {user} data
 */
export function addUser (data) {
  return axios({
    url: '/insertUser',
    method: 'post',
    data
  })
}

/**
 * 查询用户信息
 * @param {null} query
 */
export function fetchUser (query) {
  return axios({
    utl: '/selectAllUser',
    method: 'get',
    params: query
  })
}

/**
 * 更新用户
 * @param {*} data
 */
export function updateUser (data) {
  return axios({
    url: '/updateUser',
    method: 'post',
    data
  })
}
