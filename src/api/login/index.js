import axios from '@/utils/fetch'

/**
 * 登录
 * @param {*} query
 */
export function login (username, password) {
  const data = {
    username,
    password
  }
  return axios({
    url: '/login',
    method: 'post',
    params: data
  })
}

// /**
//  * 获取用户详细信息，生成导航
//  * @param {id} data
//  */
// export function getUserInfo (data) {
//   return axios({
//     url: '/',
//     method: 'post',
//     data
//   })
// }
