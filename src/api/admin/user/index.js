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
    utl: '',
    method: 'get',
    params: query
  })
}

/**
 * 删除用户
 * @param {id} data
 */
export function deleUser (data) {
  return axios({
    url: '/deleteUser',
    method: 'post',
    data
  })
}
