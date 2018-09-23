import { login, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    token: getToken(),
    roles: [],
    name: ''
  },
  mutations: {
    
  }
}
export default user
