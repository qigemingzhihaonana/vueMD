import { fetchRole} from '@/api/admin/module/index'

const module = {
  state: {
    tableDataRole: [],
    tableDataAddRole: []
  },
  mutations: {
    SET_ROLE: (state, role) => {
      state.tableDataRole = role
    },
    SET_NOROLE: (state, norole) => {
      state.tableDataAddRole = norole
    }
  },
  actions: {
    /**
     * 获取角色
     * @param {*} param0
     * 
     */
    GetRole ({ commit }, id) {
      console.log(id)
      return new Promise((resolve, reject) => {
        fetchRole(id).then(response => {
          console.log(response)
          const role = response.data.data.selectRole
          const norole = response.data.data.noselectRole
          commit('SET_ROLE',role)
          commit('SET_NOROLE',norole)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default module
