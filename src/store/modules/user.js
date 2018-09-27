import { login } from '@/api/login/index'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    menuData: []
  },
  mutations: {
    SET_NAVLIST: (state, data) => {
      state.menuData = data
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    /**
     * 登录
     * @param {*} param0
     * @param {username,password} userInfo
     */
    Login ({ commit }, userInfo) {
      const username = userInfo.name.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          console.log(response)
          const data = response
          // commit('SET_TOKEN', data.token)
          commit('SET_NAVLIST', data)
          // setToken(response.data.token)
          // console.log(response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * 获取用户信息
     * @param {name,navlist ....} param0
     */
    // getUserInfo ({commit, state}) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(state.token).then(response => {
    //       if (!response.data) {
    //         reject(new Error('error'))
    //       }
    //       const data = response.data
    //       commit('SET_NAME', data.name)
    //       commit('SET_NAVLIST', data.menu)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    /**
     * 正常退出
     * @param {} param0
     */
    // LogOut ({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 前端 登出,关闭浏览器
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
