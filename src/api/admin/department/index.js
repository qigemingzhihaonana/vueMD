import axios from '@/utils/fectch'

/**
 * 获取所有的部门信息
 * @param {query}
 */
export function getAll (query) {
  return axios({
    url: '/selectDepartmentAllld',
    method: 'get',
    params: query
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
    url: '/delectDepartment',
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
