import axios from '@/utils/fetch'

/**
 * 登录
 * @param {*} query
 */
export function login (uid, pwd) {
  const data = {
    uid,
    pwd
  }
  return axios({
    url: '/selectUserMenuList',
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
