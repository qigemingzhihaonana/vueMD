import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import role from './modules/role'
import module from './modules/module'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    role,
    module,
    tagsView,
  },
  getters,
  plugins: [createPersistedState()]
})

export default store
