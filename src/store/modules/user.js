import { login, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resolve } from 'url';
import { rejects } from 'assert';

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
    }
  },
  action: {
    getUserInfo({commit,state}) {
      return new Promise(resolve,rejects)
    }
  }
}
export default user
