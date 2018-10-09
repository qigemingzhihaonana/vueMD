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
 * @param {*} query
 */
export function fetchUser () {
  return axios({
    url: '/selectUserNameId',
    method: 'get'
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
/**
 * 批量导入
 * @param {*} data
 */
export function up (data) {
  return axios({
    url: '/MangImportUser',
    method: 'post',
    data
  })
}
