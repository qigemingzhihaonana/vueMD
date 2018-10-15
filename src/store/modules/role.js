import { fetchUser } from '@/api/admin/role/index'

const role = {
  state: {
    tableData: [],
    tableDataAdd: []
  },
  mutations: {
    SET_USER: (state, data) => {
      state.tableData = data
    },
    SET_NOUSER: (state, data) => {
      state.tableDataAdd = data
    }
  },
  actions: {
    /**
     * 获取人员
     * @param {*} param0
     * @param {username,password} userInfo
     */
    GetUser ({ commit }, id) {
      console.log(id)
      return new Promise((resolve, reject) => {
        fetchUser(id).then(response => {
          const user = response.data.data.selectUser
          const nouser = response.data.data.noselectUser
          console.log(response)
          console.log(nouser)
          commit('SET_USER',user)
          commit('SET_NOUSER',nouser)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default role
