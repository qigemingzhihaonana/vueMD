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
export function fetchMessage (name) {
  return axios({
    url: '/selectDepartmentInformation/' + name,
    method: 'get'
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
export function delectDepartment (ids) {
  return axios({
    url: '/deleteDepart/' + ids,
    method: 'get'
  })
}

/**
 * 修改部门信息
 * @param {id,message} data
 */
export function updataDepartment (data) {
  return axios({
    url: '/updateDepartment',
    method: 'post',
    data
  })
}
/**
 * 获取信息
 * @param {*} data 
 */
export function getMessage (data) {
  return axios({
    url: '/getmeMessage',
    method: 'post',
    data
  })
}

/**
 * 查找部门副职人员
 * @param {*} id 
 */
export function getDepdeputy(id) {
  return axios({
    url: '/selectDeputy/' + id,
    method: 'get'
  })
}

/**
 * 查找部门正职人员
 * @param {*} id 
 */
export function getDepPrincipal(id) {
  return axios({
    url: '/selectPrincipal/' + id,
    method: 'get'
  })
}
