import Mock from 'mockjs'
import loginAPI from './login'

// 登录相关
Mock.mock(/\/123/, 'post', loginAPI.fetch)

export default Mock
