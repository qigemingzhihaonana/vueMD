import Mock from 'mockjs'

const user = []

for (let index = 0; index < 2000; index++) {
  user.push(Mock.mock({
    'user_name': '@cname',
    'user_password': '@title',
    'real_name': '@cname',
    'user_code': '@title',
    'user_level': '0',
    'user_position': 'sdsdf',
    'dep_id': 'efe',
    'is_company_leader': '0',
    'order_number': '@character("number")',
    'user_email': '@email'
  }))
}

export default {
  fetchUser: function () {
    return user
  },
  addUser: () => {
    return {'code': '200'}
  }
}
