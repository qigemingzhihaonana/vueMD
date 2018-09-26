import Mock from 'mockjs'
import loginAPI from './login'

// 登录相关
Mock.mock(/\/login/, 'post', loginAPI.fetch)

export default Mock
