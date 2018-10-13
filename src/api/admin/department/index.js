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
export function insertDepartment (data, id1) {
  return axios({
    url: '/insertDepartment/' + id1,
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
export function updataDepartment (id, id1, ids, sysDepartment) {
  const data = {
    id,
    id1,
    ids,
    sysDepartment
  }
  return axios({
    url: '/updateDepartment2',
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
