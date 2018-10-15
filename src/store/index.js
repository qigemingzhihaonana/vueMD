import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import role from './modules/role'
import module from './modules/module'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    role,
    module
  },
  getters,
  plugins: [createPersistedState()]
})

export default store
