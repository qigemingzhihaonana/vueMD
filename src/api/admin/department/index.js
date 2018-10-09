import axios from '@/utils/fetch'

/**
 * 获取所有的部门信息
 * @param {query}
 */
export function getAll () {
  return axios({
    url: '/selectDepartmentAllId',
    method: 'get'
  })
}

/**
 * 获取部门详细信息
 * @param {*} data
 */
export function fetchMessage (data) {
  return axios({
    url: '/selectDepartmentInformation',
    method: 'post',
    data
  })
}

/**
 * 添加部门（必须添加部门级别的字段）
 * @param {data} data
 */
export function insertDepartment (data) {
  return axios({
    url: '/insertDepartment',
    method: 'post',
    data
  })
}
/**
 * 删除部门(支持批量删除)
 * @param {id} data
 */
export function delectDepartment (data) {
  return axios({
    url: '/deleteDepart',
    method: 'post',
    data
  })
}

/**
 * 修改部门信息
 * @param {id,message} data
 */
export function updataDepartment (data) {
  return axios({
    url: '/',
    method: 'post',
    data
  })
}

export function getMessage (data) {
  return axios({
    url: '/getmeMessage',
    method: 'post',
    data
  })
}
