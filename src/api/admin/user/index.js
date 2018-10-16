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
 * 删除用户
 * @param {*} data
 */
export function deleteUser (data) {
  return axios({
    url: '/deleteUser' ,
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

/**
 * 通过名字或账户查询用户具体信息
 * @param {*} data
 */
export function select (data) {
  return axios({
    url: '/selectUserByRealUsername',
    method: 'post',
    data
  })
}

/**
 * 修改用户
 * @param {*} data
 */
export function upd (data) {
  return axios({
    url: '/updateUser',
    method: 'post',
    data
  })
}
