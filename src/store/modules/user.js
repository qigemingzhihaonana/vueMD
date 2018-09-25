import { login, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    token: getToken(),
    roles: [],
    name: '',
    navList: []
  },
  mutations: {
    SET_NAVLIST: (state, navList) => {
      state.navList = navList
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  action: {
    /**
     * 登录
     * @param {*} param0
     * @param {username,password} userInfo
     */
    loginBy ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
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
    getUserInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) {
            reject(new Error('error'))
          }
          const data = response.data
          commit('SET_NAME', data.name)
          commit('SET_NAVLIST', data.menu)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * 正常退出
     * @param {} param0
     */
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
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
